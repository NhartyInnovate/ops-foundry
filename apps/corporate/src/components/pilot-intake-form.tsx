'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea } from '@opsfoundry/ui';

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
    if (field in errors && errors[field as keyof PilotBriefErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof PilotBriefValues) {
    const validationErrors = validate(values);
    if (field in validationErrors) {
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field as keyof PilotBriefErrors] }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
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
  }

  const hasErrors = Object.keys(errors).some(
    (k) => Boolean(errors[k as keyof PilotBriefErrors])
  );

  return (
    <div className="rounded-2xl bg-white p-7 sm:p-9 lg:p-11 border border-foundry-border shadow-xs">
      {/* Submissions Status Notice */}
      <div
        role="status"
        aria-live="polite"
        className="mb-8 rounded-xl border border-foundry-border bg-foundry-muted px-5 py-4 text-xs sm:text-sm text-foundry-dark leading-relaxed"
      >
        <p className="font-semibold text-foundry-dark mb-1">
          Consultation Submissions
        </p>
        <p className="text-foundry-secondary">
          Pilot consultation submissions are not yet open. Please check back soon.
        </p>
      </div>

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
              Full Name <span className="text-foundry-dark font-bold">*</span>
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
              onBlur={() => handleBlur('fullName')}
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
              Business Email <span className="text-foundry-dark font-bold">*</span>
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
              Company or Organization <span className="text-foundry-dark font-bold">*</span>
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
            Primary Service Line for Scoping <span className="text-foundry-dark font-bold">*</span>
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
            Business Problem &amp; Proposed Pilot Scope <span className="text-foundry-dark font-bold">*</span>
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
            onBlur={() => handleBlur('businessProblem')}
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-foundry-border">
          <p className="text-xs text-foundry-secondary">
            Fields marked with <span className="text-foundry-dark font-bold">*</span> are required.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button type="button" variant="outline" size="md" onClick={handleReset}>
              Clear Brief
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled
              aria-disabled="true"
              title="Pilot consultation submissions are not yet open"
              className="cursor-not-allowed opacity-50"
            >
              Submissions Not Open
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
