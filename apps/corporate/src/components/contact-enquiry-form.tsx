'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@opsfoundry/ui';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactEnquiryAction, type ActionResponse } from '../actions/inquiries';
import { TurnstileWidget } from './turnstile-widget';

interface ContactFormValues {
  name: string;
  email: string;
  organization: string;
  message: string;
  privacyConsent: boolean;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  organization?: string;
  message?: string;
  privacyConsent?: string;
  turnstileToken?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactEnquiryForm() {
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    organization: '',
    message: '',
    privacyConsent: false,
  });

  const [idempotencyKey, setIdempotencyKey] = useState<string>('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ActionResponse | null>(null);

  useEffect(() => {
    setIdempotencyKey(crypto.randomUUID());
  }, []);

  function validate(current: ContactFormValues): ContactFormErrors {
    const nextErrors: ContactFormErrors = {};

    if (current.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }

    if (!EMAIL_PATTERN.test(current.email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }

    if (current.organization.trim().length < 2) {
      nextErrors.organization = 'Please enter your organization name.';
    }

    if (current.message.trim().length < 10) {
      nextErrors.message = 'Please enter your message (at least 10 characters).';
    }

    if (!current.privacyConsent) {
      nextErrors.privacyConsent = 'Consent is required to proceed.';
    }

    return nextErrors;
  }

  function handleChange<K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setSubmitResult(null);
    if (field in errors && errors[field as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof ContactFormValues) {
    const validationErrors = validate(values);
    if (field in validationErrors) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field as keyof ContactFormErrors] }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitResult(null);

    const clientValidationErrors = validate(values);
    if (!turnstileToken) {
      clientValidationErrors.turnstileToken = 'Please complete the anti-abuse verification.';
    }

    setErrors(clientValidationErrors);

    if (Object.keys(clientValidationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContactEnquiryAction({
        fullName: values.name,
        email: values.email,
        organization: values.organization,
        message: values.message,
        privacyConsent: values.privacyConsent,
        turnstileToken,
        idempotencyKey: idempotencyKey || crypto.randomUUID(),
      });

      setSubmitResult(response);

      if (response.success) {
        // Clear errors
        setErrors({});
      } else if (response.errors) {
        setErrors((prev) => ({ ...prev, ...response.errors }));
      }
    } catch (err) {
      console.error('[CLIENT SUBMIT ERROR]', err);
      setSubmitResult({
        success: false,
        message: 'A network error occurred while submitting. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setValues({
      name: '',
      email: '',
      organization: '',
      message: '',
      privacyConsent: false,
    });
    setErrors({});
    setSubmitResult(null);
    setIdempotencyKey(crypto.randomUUID());
  }

  const hasErrors = Object.keys(errors).some(
    (k) => Boolean(errors[k as keyof ContactFormErrors])
  );

  return (
    <div className="rounded-2xl bg-white p-7 sm:p-9 lg:p-11 border border-foundry-border shadow-xs">
      {/* Success State Confirmation */}
      {submitResult?.success ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-emerald-950">
              Enquiry Received Successfully
            </h3>
          </div>
          <p className="text-sm text-emerald-900 leading-relaxed">
            {submitResult.message}
          </p>
          {submitResult.inquiryId ? (
            <p className="text-xs font-mono text-emerald-800/80 bg-emerald-100/60 rounded px-2.5 py-1.5 inline-block">
              Reference ID: {submitResult.inquiryId}
            </p>
          ) : null}
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleReset}
              className="bg-white hover:bg-emerald-100/50"
            >
              Send Another Enquiry
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Submission Failure Alert */}
          {submitResult && !submitResult.success && (
            <div
              role="alert"
              className="mb-8 rounded-xl border border-red-300 bg-red-50 p-5 text-sm text-red-900 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold mb-0.5">Submission was not completed</p>
                <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                  {submitResult.message}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {hasErrors && (
              <div
                role="alert"
                className="rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-900"
              >
                <p className="font-semibold mb-1">
                  Please review the highlighted fields:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  {errors.name && <li>{errors.name}</li>}
                  {errors.email && <li>{errors.email}</li>}
                  {errors.organization && <li>{errors.organization}</li>}
                  {errors.message && <li>{errors.message}</li>}
                  {errors.privacyConsent && <li>{errors.privacyConsent}</li>}
                  {errors.turnstileToken && <li>{errors.turnstileToken}</li>}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-semibold text-foundry-dark mb-2"
                >
                  Name <span className="text-foundry-dark font-bold">*</span>
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.name}
                  error={Boolean(errors.name)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  disabled={isSubmitting}
                  required
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-semibold text-foundry-dark mb-2"
                >
                  Work email <span className="text-foundry-dark font-bold">*</span>
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={values.email}
                  error={Boolean(errors.email)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  disabled={isSubmitting}
                  required
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-organization"
                className="block text-sm font-semibold text-foundry-dark mb-2"
              >
                Organization <span className="text-foundry-dark font-bold">*</span>
              </label>
              <Input
                id="contact-organization"
                name="organization"
                type="text"
                autoComplete="organization"
                placeholder="Your company or organization name"
                value={values.organization}
                error={Boolean(errors.organization)}
                aria-invalid={Boolean(errors.organization)}
                aria-describedby={errors.organization ? 'contact-organization-error' : undefined}
                onChange={(e) => handleChange('organization', e.target.value)}
                onBlur={() => handleBlur('organization')}
                disabled={isSubmitting}
                required
              />
              {errors.organization && (
                <p id="contact-organization-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.organization}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-semibold text-foundry-dark mb-2"
              >
                Message <span className="text-foundry-dark font-bold">*</span>
              </label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell us a little about your business, the challenge you have, or how we can help..."
                value={values.message}
                error={Boolean(errors.message)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                disabled={isSubmitting}
                required
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Turnstile Anti-Abuse Container */}
            <div className="pt-1">
              <TurnstileWidget
                onVerify={(token) => {
                  setTurnstileToken(token);
                  if (errors.turnstileToken) {
                    setErrors((prev) => ({ ...prev, turnstileToken: undefined }));
                  }
                }}
                onError={() => {
                  setErrors((prev) => ({ ...prev, turnstileToken: 'Security verification failed.' }));
                }}
                onExpire={() => {
                  setTurnstileToken('');
                }}
              />
              {errors.turnstileToken && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.turnstileToken}
                </p>
              )}
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={values.privacyConsent}
                  onChange={(e) => handleChange('privacyConsent', e.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-foundry-dark focus:ring-foundry-dark"
                  required
                />
                <span className="text-xs sm:text-sm text-foundry-secondary leading-relaxed">
                  I consent to Ops Foundry processing my contact details to respond to this operational enquiry.
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.privacyConsent}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-foundry-border">
              <p className="text-xs text-foundry-secondary">
                Fields marked with <span className="text-foundry-dark font-bold">*</span> are required.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
