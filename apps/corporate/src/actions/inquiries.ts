'use server';

import crypto from 'node:crypto';
import { headers } from 'next/headers';
import { submitCorporateInquiry } from '@opsfoundry/db';
import {
  ContactEnquiryInputSchema,
  PilotIntakeInputSchema,
  type ContactEnquiryInput,
  type PilotIntakeInput,
} from '@opsfoundry/types';

export interface ActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  inquiryId?: string;
}

// In-memory sliding-window rate limiter per IP hash (5 requests per 10 minutes)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(ipHash: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();

  // Periodic cleanup of stale records
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ipHash);
  if (!record || record.resetAt < now) {
    rateLimitMap.set(ipHash, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

/**
 * Extracts client IP following verified proxy headers hierarchy.
 */
function getClientIp(headersList: Headers): string {
  const cfConnectingIp = headersList.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = headersList.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = headersList.get('x-forwarded-for');
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(',')[0];
    if (firstIp) return firstIp.trim();
  }

  return '127.0.0.1';
}

/**
 * Computes irreversible salted SHA-256 hash of client IP.
 */
function computeIpHash(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'fallback-dev-salt-do-not-use-in-production';
  return crypto.createHmac('sha256', salt).update(ip).digest('hex');
}

/**
 * Server-side Cloudflare Turnstile token validation.
 */
async function verifyTurnstileToken(
  token: string,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // In development/test environments without configured secret, allow testing
  if (!secretKey) {
    if (process.env.NODE_ENV === 'production') {
      return { success: false, error: 'Anti-spam protection is not configured on the server.' };
    }
    return { success: true };
  }

  // Allow dummy tokens in non-production test suites
  if (token === 'XXXX.DUMMY.TOKEN.XXXX' && process.env.NODE_ENV !== 'production') {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip && ip !== '127.0.0.1') {
      formData.append('remoteip', ip);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      signal: AbortSignal.timeout(6000),
    });

    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!data.success) {
      return { success: false, error: 'Security verification failed. Please try again.' };
    }
    return { success: true };
  } catch (err) {
    console.error('[SECURITY ERROR] Turnstile verification exception:', err);
    if (process.env.NODE_ENV !== 'production') {
      return { success: true };
    }
    return { success: false, error: 'Security verification timed out. Please try again.' };
  }
}

/**
 * Server Action for General Contact Enquiry Form.
 */
export async function submitContactEnquiryAction(
  input: unknown
): Promise<ActionResponse> {
  const parseResult = ContactEnquiryInputSchema.safeParse(input);
  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0];
      if (field && typeof field === 'string' && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: 'Please review and correct the highlighted fields.',
      errors: fieldErrors,
    };
  }

  const validData: ContactEnquiryInput = parseResult.data;
  const headersList = await headers();
  const clientIp = getClientIp(headersList);
  const ipHash = computeIpHash(clientIp);

  // Rate limiting check
  if (!checkRateLimit(ipHash)) {
    return {
      success: false,
      message: 'Too many submissions received from this connection. Please wait a few minutes before trying again.',
    };
  }

  // Turnstile security verification
  const turnstileCheck = await verifyTurnstileToken(validData.turnstileToken, clientIp);
  if (!turnstileCheck.success) {
    return {
      success: false,
      message: turnstileCheck.error || 'Anti-spam check failed.',
      errors: { turnstileToken: turnstileCheck.error || 'Verification failed' },
    };
  }

  try {
    const result = await submitCorporateInquiry({
      fullName: validData.fullName,
      email: validData.email,
      organization: validData.organization,
      phone: validData.phone || undefined,
      serviceInterest: 'all',
      message: validData.message,
      formType: 'contact',
      privacyConsent: validData.privacyConsent,
      privacyConsentAt: new Date(),
      idempotencyKey: validData.idempotencyKey,
      ipHash,
    });

    return {
      success: true,
      message: 'Thank you. Your enquiry has been received. Our team will review your message and respond shortly.',
      inquiryId: result.id,
    };
  } catch (err: unknown) {
    const pgError = err as { code?: string; message?: string };
    // PostgreSQL unique constraint violation (idempotency key)
    if (pgError.code === '23505') {
      return {
        success: false,
        message: 'This enquiry has already been submitted and is currently being processed.',
      };
    }

    console.error('[SUBMISSION ERROR] Contact inquiry failed:', err);
    return {
      success: false,
      message: 'An unexpected operational error occurred while submitting your message. Please try again shortly.',
    };
  }
}

/**
 * Server Action for Scoped Pilot Intake Form.
 */
export async function submitPilotIntakeAction(
  input: unknown
): Promise<ActionResponse> {
  const parseResult = PilotIntakeInputSchema.safeParse(input);
  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0];
      if (field && typeof field === 'string' && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: 'Please review and correct the highlighted fields.',
      errors: fieldErrors,
    };
  }

  const validData: PilotIntakeInput = parseResult.data;
  const headersList = await headers();
  const clientIp = getClientIp(headersList);
  const ipHash = computeIpHash(clientIp);

  // Rate limiting check
  if (!checkRateLimit(ipHash)) {
    return {
      success: false,
      message: 'Too many submissions received from this connection. Please wait a few minutes before trying again.',
    };
  }

  // Turnstile security verification
  const turnstileCheck = await verifyTurnstileToken(validData.turnstileToken, clientIp);
  if (!turnstileCheck.success) {
    return {
      success: false,
      message: turnstileCheck.error || 'Anti-spam check failed.',
      errors: { turnstileToken: turnstileCheck.error || 'Verification failed' },
    };
  }

  try {
    const result = await submitCorporateInquiry({
      fullName: validData.fullName,
      email: validData.email,
      organization: validData.organization,
      serviceInterest: validData.serviceInterest,
      message: validData.businessProblem,
      website: validData.website || undefined,
      preferredStartTiming: validData.preferredStartTiming || undefined,
      formType: 'pilot',
      privacyConsent: validData.privacyConsent,
      privacyConsentAt: new Date(),
      idempotencyKey: validData.idempotencyKey,
      ipHash,
    });

    return {
      success: true,
      message: 'Thank you. Your pilot consultation request has been received. We will review your requirements and reach out to schedule your scoping session.',
      inquiryId: result.id,
    };
  } catch (err: unknown) {
    const pgError = err as { code?: string; message?: string };
    // PostgreSQL unique constraint violation (idempotency key)
    if (pgError.code === '23505') {
      return {
        success: false,
        message: 'This pilot request has already been submitted and is currently being processed.',
      };
    }

    console.error('[SUBMISSION ERROR] Pilot intake failed:', err);
    return {
      success: false,
      message: 'An unexpected operational error occurred while submitting your pilot request. Please try again shortly.',
    };
  }
}
