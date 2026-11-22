'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@opsfoundry/ui';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitPilotIntakeAction, type ActionResponse } from '../actions/inquiries';
import { TurnstileWidget } from './turnstile-widget';

type ServiceInterestValue = 'get-online' | 'get-visible' | 'get-customers' | 'not-sure';

interface PilotFormValues {
  fullName: string;
  email: string;
  organization: string;
  website: string;
  serviceInterest: ServiceInterestValue;
  businessProblem: string;
  preferredStartTiming: string;
  privacyConsent: boolean;
}

interface PilotFormErrors {
  fullName?: string;
  email?: string;
  organization?: string;
  website?: string;
  serviceInterest?: string;
  businessProblem?: string;
  privacyConsent?: string;
  turnstileToken?: string;
}

const SERVICE_OPTIONS: { value: ServiceInterestValue; label: string; description: string }[] = [
  {
    value: 'get-online',
    label: 'Get Online',
    description: 'Build and maintain a digital presence that works',
  },
  {
    value: 'get-visible',
    label: 'Get Visible',
    description: 'Plan, produce and publish consistent communications',
  },
  {
    value: 'get-customers',
    label: 'Get Customers',
    description: 'Organize prospecting, CRM hygiene and pipeline operations',
  },
  {
    value: 'not-sure',
    label: 'Not sure',
    description: 'We will explore your operational bottlenecks and propose a starting scope',
  },
];

const TIMING_OPTIONS = [
  'Immediate (within 2 weeks)',
  'Within 30 days',
  'Next quarter',
  'Flexible / Just exploring',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PilotIntakeForm() {
  const [values, setValues] = useState<PilotFormValues>({
    fullName: '',
    email: '',
    organization: '',
    website: '',
    serviceInterest: 'get-online',
    businessProblem: '',
    preferredStartTiming: '',
    privacyConsent: false,
  });

  const [idempotencyKey, setIdempotencyKey] = useState<string>('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [errors, setErrors] = useState<PilotFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ActionResponse | null>(null);

  useEffect(() => {
    setIdempotencyKey(crypto.randomUUID());
  }, []);

  function validate(current: PilotFormValues): PilotFormErrors {
    const nextErrors: PilotFormErrors = {};

    if (current.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!EMAIL_PATTERN.test(current.email.trim())) {
      nextErrors.email = 'Please enter a valid work email address.';
    }

    if (current.organization.trim().length < 2) {
      nextErrors.organization = 'Please enter your company or organization name.';
    }

    if (current.businessProblem.trim().length < 10) {
      nextErrors.businessProblem =
        'Please describe what you need help with (at least 10 characters).';
    }

    if (current.website && current.website.trim().length > 0) {
      try {
        new URL(current.website.trim());
      } catch {
        nextErrors.website = 'Please enter a valid website URL (including https://).';
      }
    }

    if (!current.privacyConsent) {
      nextErrors.privacyConsent = 'Consent is required to proceed.';
    }

    return nextErrors;
  }

  function handleChange<K extends keyof PilotFormValues>(
    field: K,
    value: PilotFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setSubmitResult(null);
    if (field in errors && errors[field as keyof PilotFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof PilotFormValues) {
    const validationErrors = validate(values);
    if (field in validationErrors) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field as keyof PilotFormErrors] }));
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
      const response = await submitPilotIntakeAction({
        fullName: values.fullName,
        email: values.email,
        organization: values.organization,
        website: values.website || undefined,
        serviceInterest: values.serviceInterest,
        businessProblem: values.businessProblem,
        preferredStartTiming: values.preferredStartTiming || undefined,
        privacyConsent: values.privacyConsent,
        turnstileToken,
        idempotencyKey: idempotencyKey || crypto.randomUUID(),
      });

      setSubmitResult(response);

      if (response.success) {
        setErrors({});
      } else if (response.errors) {
        setErrors((prev) => ({ ...prev, ...response.errors }));
      }
    } catch (err) {
      console.error('[CLIENT SUBMIT ERROR]', err);
      setSubmitResult({
        success: false,
        message: 'A network error occurred while submitting your request. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setValues({
      fullName: '',
      email: '',
      organization: '',
      website: '',
      serviceInterest: 'get-online',
      businessProblem: '',
      preferredStartTiming: '',
      privacyConsent: false,
    });
    setErrors({});
    setSubmitResult(null);
    setIdempotencyKey(crypto.randomUUID());
  }

  const hasErrors = Object.keys(errors).some(
    (k) => Boolean(errors[k as keyof PilotFormErrors])
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
              Pilot Consultation Request Received
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
              Request Another Consultation
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
                  {errors.fullName && <li>{errors.fullName}</li>}
                  {errors.email && <li>{errors.email}</li>}
                  {errors.organization && <li>{errors.organization}</li>}
                  {errors.website && <li>{errors.website}</li>}
                  {errors.businessProblem && <li>{errors.businessProblem}</li>}
                  {errors.privacyConsent && <li>{errors.privacyConsent}</li>}
                  {errors.turnstileToken && <li>{errors.turnstileToken}</li>}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="pilot-full-name"
                  className="block text-sm font-semibold text-foundry-dark mb-2"
                >
                  Full name <span className="text-foundry-dark font-bold">*</span>
                </label>
                <Input
                  id="pilot-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={values.fullName}
                  error={Boolean(errors.fullName)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'pilot-full-name-error' : undefined}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  disabled={isSubmitting}
                  required
                />
                {errors.fullName && (
                  <p id="pilot-full-name-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pilot-email"
                  className="block text-sm font-semibold text-foundry-dark mb-2"
                >
                  Work email <span className="text-foundry-dark font-bold">*</span>
                </label>
                <Input
                  id="pilot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={values.email}
                  error={Boolean(errors.email)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'pilot-email-error' : undefined}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  disabled={isSubmitting}
                  required
                />
                {errors.email && (
                  <p id="pilot-email-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="pilot-organization"
                  className="block text-sm font-semibold text-foundry-dark mb-2"
                >
                  Company or organization <span className="text-foundry-dark font-bold">*</span>
                </label>
                <Input
                  id="pilot-organization"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  placeholder="Organization name"
                  value={values.organization}
                  error={Boolean(errors.organization)}
                  aria-invalid={Boolean(errors.organization)}
                  aria-describedby={errors.organization ? 'pilot-organization-error' : undefined}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  onBlur={() => handleBlur('organization')}
                  disabled={isSubmitting}
                  required
                />
                {errors.organization && (
                  <p
                    id="pilot-organization-error"
                    className="mt-1.5 text-xs text-red-600 font-medium"
                  >
                    {errors.organization}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pilot-website"
                  className="block text-sm font-semibold text-foundry-dark mb-2"
                >
                  Website <span className="text-xs font-normal text-foundry-secondary">(Optional)</span>
                </label>
                <Input
                  id="pilot-website"
                  name="website"
                  type="url"
                  autoComplete="url"
                  placeholder="https://yourcompany.com"
                  value={values.website}
                  error={Boolean(errors.website)}
                  aria-invalid={Boolean(errors.website)}
                  aria-describedby={errors.website ? 'pilot-website-error' : undefined}
                  onChange={(e) => handleChange('website', e.target.value)}
                  onBlur={() => handleBlur('website')}
                  disabled={isSubmitting}
                />
                {errors.website && (
                  <p id="pilot-website-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.website}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="block text-sm font-semibold text-foundry-dark mb-3">
                Service interest <span className="text-foundry-dark font-bold">*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SERVICE_OPTIONS.map((option) => {
                  const isSelected = values.serviceInterest === option.value;
                  return (
                    <label
                      key={option.value}
                      htmlFor={`service-option-${option.value}`}
                      className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-foundry-dark bg-foundry-muted font-medium'
                          : 'border-foundry-border bg-white hover:border-gray-300'
                      }`}
                    >
                      <input
                        id={`service-option-${option.value}`}
                        type="radio"
                        name="serviceInterest"
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleChange('serviceInterest', option.value)}
                        disabled={isSubmitting}
                        className="mt-1 h-4 w-4 accent-[#0B0F24]"
                      />
                      <div>
                        <span className="block text-sm font-semibold text-foundry-dark">
                          {option.label}
                        </span>
                        <span className="block text-xs text-foundry-secondary mt-0.5 leading-relaxed">
                          {option.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="pilot-business-problem"
                className="block text-sm font-semibold text-foundry-dark mb-2"
              >
                What do you need help with? <span className="text-foundry-dark font-bold">*</span>
              </label>
              <p id="pilot-business-problem-hint" className="text-xs text-foundry-secondary mb-2">
                Tell us where your business needs operational support, backlog items to address, or the challenge you want to solve.
              </p>
              <Textarea
                id="pilot-business-problem"
                name="businessProblem"
                rows={4}
                placeholder="Describe what needs attention and what a useful starting point would look like for your business..."
                value={values.businessProblem}
                error={Boolean(errors.businessProblem)}
                aria-invalid={Boolean(errors.businessProblem)}
                aria-describedby={
                  errors.businessProblem
                    ? 'pilot-business-problem-hint pilot-business-problem-error'
                    : 'pilot-business-problem-hint'
                }
                onChange={(e) => handleChange('businessProblem', e.target.value)}
                onBlur={() => handleBlur('businessProblem')}
                disabled={isSubmitting}
                required
              />
              {errors.businessProblem && (
                <p
                  id="pilot-business-problem-error"
                  className="mt-1.5 text-xs text-red-600 font-medium"
                >
                  {errors.businessProblem}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pilot-timing"
                className="block text-sm font-semibold text-foundry-dark mb-2"
              >
                Preferred start timing <span className="text-xs font-normal text-foundry-secondary">(Optional)</span>
              </label>
              <select
                id="pilot-timing"
                name="preferredStartTiming"
                value={values.preferredStartTiming}
                onChange={(e) => handleChange('preferredStartTiming', e.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-foundry-border bg-white px-4 py-3 text-sm text-foundry-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-foundry-dark"
              >
                <option value="">Select preferred timing (optional)</option>
                {TIMING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
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
                  I consent to Ops Foundry processing my contact and organizational details to evaluate and discuss pilot scoping.
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
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    <span>Request a Pilot Conversation</span>
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
