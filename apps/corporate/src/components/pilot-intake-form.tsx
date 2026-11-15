'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea, Heading, Text } from '@opsfoundry/ui';

type ServiceInterestValue = 'get-online' | 'get-visible' | 'get-customers' | 'all';

interface PilotBriefValues {
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  serviceInterest: ServiceInterestValue;
  businessProblem: string;
  dependenciesAndTimeline: string;
}

interface PilotBriefErrors {
  fullName?: string;
  email?: string;
  organization?: string;
  serviceInterest?: string;
  businessProblem?: string;
}

const SERVICE_OPTIONS: { value: ServiceInterestValue; label: string; description: string }[] = [
  {
    value: 'get-online',
    label: 'Get Online',
    description: 'Website foundation, digital structure, and online credibility',
  },
  {
    value: 'get-visible',
    label: 'Get Visible',
    description: 'Content operations, communications cadence, and search discoverability',
  },
  {
    value: 'get-customers',
    label: 'Get Customers',
    description: 'Prospect research, inbound inquiry handling, and pipeline operations',
  },
  {
    value: 'all',
    label: 'Multi-Service / Partnership Discussion',
    description: 'Cross-pillar pilot scoping or institutional partnership discussion',
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PilotIntakeForm() {
  const [values, setValues] = useState<PilotBriefValues>({
    fullName: '',
    email: '',
    organization: '',
    phone: '',
    serviceInterest: 'get-online',
    businessProblem: '',
    dependenciesAndTimeline: '',
  });

  const [errors, setErrors] = useState<PilotBriefErrors>({});
  const [validatedSnapshot, setValidatedSnapshot] = useState<PilotBriefValues | null>(null);

  function validate(current: PilotBriefValues): PilotBriefErrors {
    const nextErrors: PilotBriefErrors = {};

    if (current.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!EMAIL_PATTERN.test(current.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }

    if (current.organization.trim().length < 2) {
      nextErrors.organization = 'Please enter your company or organization name.';
    }

    if (current.businessProblem.trim().length < 20) {
      nextErrors.businessProblem =
        'Please describe the operational problem and desired pilot scope (at least 20 characters).';
    }

    return nextErrors;
  }

  function handleChange<K extends keyof PilotBriefValues>(
    field: K,
    value: PilotBriefValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setValidatedSnapshot(null);
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setValidatedSnapshot(null);
      return;
    }

    setValidatedSnapshot({
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      organization: values.organization.trim(),
      phone: values.phone.trim(),
      businessProblem: values.businessProblem.trim(),
      dependenciesAndTimeline: values.dependenciesAndTimeline.trim(),
    });
  }

  function handleReset() {
    setValues({
      fullName: '',
      email: '',
      organization: '',
      phone: '',
      serviceInterest: 'get-online',
      businessProblem: '',
      dependenciesAndTimeline: '',
    });
    setErrors({});
    setValidatedSnapshot(null);
  }

  const hasErrors = Object.keys(errors).some(
    (k) => Boolean(errors[k as keyof PilotBriefErrors])
  );

  return (
    <div className="rounded-2xl bg-white p-7 sm:p-9 lg:p-11 border border-foundry-border shadow-xs">
      {/* Explicit Backend Persistence Status Banner */}
      <div
        role="status"
        aria-live="polite"
        className="mb-8 rounded-xl border border-amber-500/40 bg-amber-50/70 px-5 py-4 text-xs sm:text-sm text-foundry-dark leading-relaxed"
      >
        <p className="font-semibold text-foundry-dark mb-1">
          Frontend Scoping &amp; Client-Side Validation Mode (Phase 3B.2)
        </p>
        <p className="text-foundry-secondary">
          This interface validates your pilot brief structure locally in the browser. Live API
          submission, Cloudflare Turnstile verification, and durable PostgreSQL persistence
          with transactional outbox dispatch are scheduled for Phase 3D and are not yet active.
          No inquiry is transmitted or stored when validating this form.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {hasErrors && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-900"
          >
            <p className="font-semibold mb-1">
              Please review the highlighted fields before validating your pilot brief:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              {errors.fullName && <li>{errors.fullName}</li>}
              {errors.email && <li>{errors.email}</li>}
              {errors.organization && <li>{errors.organization}</li>}
              {errors.businessProblem && <li>{errors.businessProblem}</li>}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="pilot-full-name"
              className="block text-sm font-semibold text-foundry-dark mb-2"
            >
              Full Name <span className="text-foundry-orange">*</span>
            </label>
            <Input
              id="pilot-full-name"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g., Amara Okafor"
              value={values.fullName}
              error={Boolean(errors.fullName)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'pilot-full-name-error' : undefined}
              onChange={(e) => handleChange('fullName', e.target.value)}
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
              Business Email <span className="text-foundry-orange">*</span>
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
              Company or Organization <span className="text-foundry-orange">*</span>
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
              htmlFor="pilot-phone"
              className="block text-sm font-semibold text-foundry-dark mb-2"
            >
              Phone Number <span className="text-xs font-normal text-foundry-secondary">(Optional)</span>
            </label>
            <Input
              id="pilot-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234 or international format"
              value={values.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>

        <fieldset>
          <legend className="block text-sm font-semibold text-foundry-dark mb-3">
            Primary Service Line for Scoping <span className="text-foundry-orange">*</span>
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
                      ? 'border-foundry-orange bg-foundry-canvas'
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
                    className="mt-1 h-4 w-4 accent-[#FF5A1F]"
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
            Business Problem &amp; Proposed Pilot Scope <span className="text-foundry-orange">*</span>
          </label>
          <p id="pilot-business-problem-hint" className="text-xs text-foundry-secondary mb-2">
            Describe the specific operational bottleneck you want to solve and what deliverables
            you are considering for an initial pilot.
          </p>
          <Textarea
            id="pilot-business-problem"
            name="businessProblem"
            rows={4}
            placeholder="Describe the current operational backlog, what needs to be built or executed, and what a successful pilot outcome looks like for your team..."
            value={values.businessProblem}
            error={Boolean(errors.businessProblem)}
            aria-invalid={Boolean(errors.businessProblem)}
            aria-describedby={
              errors.businessProblem
                ? 'pilot-business-problem-hint pilot-business-problem-error'
                : 'pilot-business-problem-hint'
            }
            onChange={(e) => handleChange('businessProblem', e.target.value)}
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
            htmlFor="pilot-dependencies"
            className="block text-sm font-semibold text-foundry-dark mb-2"
          >
            Existing Systems, Dependencies &amp; Target Timeline{' '}
            <span className="text-xs font-normal text-foundry-secondary">(Optional)</span>
          </label>
          <Textarea
            id="pilot-dependencies"
            name="dependenciesAndTimeline"
            rows={3}
            placeholder="Optional: Note any existing tools (CMS, CRM, workspace), known exclusions, or target dates..."
            value={values.dependenciesAndTimeline}
            onChange={(e) => handleChange('dependenciesAndTimeline', e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-foundry-border">
          <p className="text-xs text-foundry-secondary">
            Fields marked with <span className="text-foundry-orange font-semibold">*</span> are
            required for client-side brief validation.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button type="button" variant="secondary" size="md" onClick={handleReset}>
              Clear Brief
            </Button>
            <Button type="submit" variant="primary" size="lg">
              Validate Pilot Brief
            </Button>
          </div>
        </div>
      </form>

      {/* Validated Local Brief Preview — Strictly Honest About Phase 3D Backend Status */}
      {validatedSnapshot && (
        <div
          role="region"
          aria-label="Client-side validation summary"
          className="mt-8 rounded-2xl border border-foundry-border bg-foundry-canvas p-6 sm:p-7"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-foundry-border">
            <Heading as="h3" size="sm" className="text-foundry-dark">
              Client-Side Validation Passed — Not Yet Submitted to Server
            </Heading>
            <span className="inline-flex items-center self-start rounded-full bg-white px-3 py-1 text-xs font-semibold text-foundry-dark border border-foundry-border">
              Local Preview Only (Phase 3D Pending)
            </span>
          </div>

          <Text size="sm" tone="secondary" className="mb-5 leading-relaxed">
            Your pilot brief meets all client-side schema requirements. Because backend database
            persistence and transactional outbox delivery are scheduled for Phase 3D,{' '}
            <strong className="font-semibold text-foundry-dark">
              this inquiry has not been sent or recorded
            </strong>
            . Below is the structured payload prepared in your browser:
          </Text>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-white rounded-xl p-5 border border-foundry-border">
            <div>
              <dt className="font-semibold text-foundry-dark">Contact</dt>
              <dd className="text-foundry-secondary mt-0.5">
                {validatedSnapshot.fullName} ({validatedSnapshot.email})
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foundry-dark">Organization</dt>
              <dd className="text-foundry-secondary mt-0.5">
                {validatedSnapshot.organization}
                {validatedSnapshot.phone ? ` · ${validatedSnapshot.phone}` : ''}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-foundry-dark">Selected Service Line</dt>
              <dd className="text-foundry-secondary mt-0.5">
                {
                  SERVICE_OPTIONS.find(
                    (opt) => opt.value === validatedSnapshot.serviceInterest
                  )?.label
                }
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-foundry-dark">
                Business Problem &amp; Proposed Scope
              </dt>
              <dd className="text-foundry-secondary mt-0.5 whitespace-pre-line">
                {validatedSnapshot.businessProblem}
              </dd>
            </div>
            {validatedSnapshot.dependenciesAndTimeline && (
              <div className="sm:col-span-2">
                <dt className="font-semibold text-foundry-dark">
                  Dependencies &amp; Timeline Notes
                </dt>
                <dd className="text-foundry-secondary mt-0.5 whitespace-pre-line">
                  {validatedSnapshot.dependenciesAndTimeline}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
