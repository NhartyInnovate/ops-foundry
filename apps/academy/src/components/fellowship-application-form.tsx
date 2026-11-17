'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading, Text, Button, Badge } from '@opsfoundry/ui';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  Sparkles,
  Info,
  MapPin,
  Phone,
  Mail,
  User,
  Lock,
} from 'lucide-react';
import {
  fellowshipCohortOneApplication,
  NIGERIAN_STATES,
  GENDER_OPTIONS,
  AGE_BRACKET_OPTIONS,
  HUB_PROXIMITY_OPTIONS,
  APPLICATION_STEPS,
} from '../content/fellowship-application';

export interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  ageBracket: string;
  stateOfResidence: string;
  hubProximity: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  ageBracket?: string;
  stateOfResidence?: string;
  hubProximity?: string;
}

interface FellowshipApplicationFormProps {
  programmeParam?: string;
}

export function FellowshipApplicationForm({ programmeParam }: FellowshipApplicationFormProps) {
  const config = fellowshipCohortOneApplication;
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    ageBracket: '',
    stateOfResidence: '',
    hubProximity: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof FormValues, val: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!val.trim()) return 'Full name is required as it appears on official identification.';
        if (val.trim().split(/\s+/).length < 2) {
          return 'Please provide at least your first name and surname.';
        }
        return undefined;

      case 'email':
        if (!val.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
          return 'Please enter a valid email address (e.g., name@example.com).';
        }
        return undefined;

      case 'phone':
        if (!val.trim()) return 'Phone number (WhatsApp active) is required.';
        // Accept Nigerian format (+234..., 080..., 234...) and international numbers
        const cleanPhone = val.replace(/[\s\-\(\)]/g, '');
        if (!/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
          return 'Please provide a valid phone number (e.g., +234 801 234 5678).';
        }
        return undefined;

      case 'gender':
        if (!val) return 'Please select your gender.';
        return undefined;

      case 'ageBracket':
        if (!val) return 'Please select your age bracket.';
        return undefined;

      case 'stateOfResidence':
        if (!val) return 'Please select your current state of residence.';
        return undefined;

      case 'hubProximity':
        if (!val) return 'Please select your regional hub proximity.';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasError = false;

    (Object.keys(values) as Array<keyof FormValues>).forEach((field) => {
      const err = validateField(field, values[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      gender: true,
      ageBracket: true,
      stateOfResidence: true,
      hubProximity: true,
    });

    if (!hasError) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToStepOne = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Card & Cohort Details */}
      <div className="rounded-3xl border border-foundry-border bg-white p-6 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="brand" className="text-xs uppercase tracking-wider font-bold">
            {config.badge}
          </Badge>
          <div className="flex items-center gap-2 text-xs font-medium text-foundry-secondary">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>Applications In Scoping Mode</span>
          </div>
        </div>

        <div className="space-y-3">
          <Heading as="h1" size="xl" className="text-foundry-slate tracking-tight">
            {config.title}
          </Heading>
          <Text size="base" tone="secondary" className="leading-relaxed">
            {config.description}
          </Text>
        </div>

        {/* Cohort Key Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-foundry-border">
          <div className="flex items-start gap-3 rounded-2xl bg-foundry-canvas p-4 border border-foundry-border">
            <Calendar className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary">
                Cohort 1 Launch
              </p>
              <p className="text-sm font-bold text-foundry-slate mt-0.5">
                {config.cohort.launchDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-foundry-canvas p-4 border border-foundry-border">
            <Clock className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foundry-secondary">
                Application Deadline
              </p>
              <p className="text-sm font-bold text-foundry-slate mt-0.5">
                {config.cohort.deadline}
              </p>
            </div>
          </div>
        </div>

        {/* Scholarship Opportunity Notice */}
        <div
          role="note"
          aria-label="Scholarship notice"
          className="rounded-2xl border border-academy-primary/30 bg-academy-light-purple p-4 sm:p-5 flex items-start gap-3"
        >
          <Award className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-academy-primary">
              Scholarship Notice
            </p>
            <p className="text-xs sm:text-sm text-foundry-slate leading-relaxed">
              {config.scholarshipNotice}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Structured Multi-Step Progress Indicator */}
      <div className="rounded-2xl border border-foundry-border bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-foundry-secondary">
          <span>
            {currentStep === 1
              ? 'Section 1 of 3: Personal & Demographic Information'
              : 'Section 1 Verified (Interim Preview)'}
          </span>
          <span className="text-academy-primary font-bold">
            {currentStep === 1 ? '1 Section Available • 2 Sections Locked' : 'Temporary Preview Mode'}
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div
          className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={currentStep === 1 ? 1 : 1}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Application completion progress"
        >
          <div
            className="bg-academy-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: '33.33%' }}
          />
        </div>

        {/* Three Application Sections Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {APPLICATION_STEPS.map((step) => {
            const isStepOneActive = step.id === 1 && currentStep === 1;
            const isStepOneVerified = step.id === 1 && currentStep === 2;
            const isLocked = step.isLocked;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border text-xs transition-colors flex flex-col justify-between ${
                  isStepOneActive
                    ? 'border-academy-primary bg-academy-light-purple/40 shadow-xs'
                    : isStepOneVerified
                    ? 'border-emerald-300 bg-emerald-50/50 text-emerald-900'
                    : 'border-gray-200 bg-gray-50/70 text-gray-500 cursor-not-allowed select-none opacity-85'
                }`}
                aria-disabled={isLocked ? 'true' : undefined}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${
                        isStepOneActive
                          ? 'bg-academy-primary text-white'
                          : isStepOneVerified
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isStepOneVerified ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        `0${step.id}`
                      )}
                    </span>

                    {isLocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span>Locked</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-academy-primary">
                        {isStepOneVerified ? 'Validated' : 'Available'}
                      </span>
                    )}
                  </div>

                  <p
                    className={`font-display text-xs font-bold leading-snug ${
                      isStepOneActive || isStepOneVerified ? 'text-foundry-slate' : 'text-gray-600'
                    }`}
                  >
                    Step {step.id} — {step.title}
                  </p>
                </div>

                <p className="text-[11px] text-foundry-secondary mt-2 leading-relaxed">
                  {step.supportingText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassuring Messaging Notice */}
        <div
          role="note"
          aria-label="Application preparation notice"
          className="rounded-xl border border-foundry-border bg-foundry-canvas p-3.5 sm:p-4 text-xs text-foundry-secondary flex items-start gap-2.5"
        >
          <Info className="h-4 w-4 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            The remaining application sections are being finalised. You can complete and review your personal information while we prepare the rest of the application.
          </p>
        </div>
      </div>

      {/* 3. Step 1: Confirmed Section Form */}
      {currentStep === 1 && (
        <form onSubmit={handleContinue} noValidate className="rounded-3xl border border-foundry-border bg-white p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-foundry-border pb-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-academy-primary text-white text-xs font-bold font-display">
                01
              </span>
              <Heading as="h2" size="lg" className="text-foundry-slate">
                {config.sectionOne.heading}
              </Heading>
            </div>
            <Text size="sm" tone="secondary">
              {config.sectionOne.intro}
            </Text>
          </div>

          <div className="space-y-7">
            {/* Field 1: Full Name */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="fullName" className="block text-sm font-bold text-foundry-slate">
                  Full Name <span className="text-academy-primary" aria-hidden="true">*</span>
                </label>
                <span className="text-xs text-foundry-secondary">Official ID name</span>
              </div>
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Amina Chidinma Ibrahim"
                  value={values.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : 'fullName-hint'}
                  className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-foundry-slate placeholder-gray-400 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academy-primary ${
                    errors.fullName
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : 'border-foundry-border hover:border-gray-400'
                  }`}
                />
              </div>
              <p id="fullName-hint" className="text-xs text-foundry-secondary">
                Please enter your first name, middle name, and surname in a single field.
              </p>
              {errors.fullName && (
                <p id="fullName-error" role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Field 2: Email Address */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-foundry-slate">
                Email Address <span className="text-academy-primary" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="e.g. amina.ibrahim@example.com"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                  className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-foundry-slate placeholder-gray-400 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academy-primary ${
                    errors.email
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : 'border-foundry-border hover:border-gray-400'
                  }`}
                />
              </div>
              <p id="email-hint" className="text-xs text-foundry-secondary">
                Admissions notifications and assessment invites will be sent to this address.
              </p>
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Field 3: Phone Number (WhatsApp Active) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="phone" className="block text-sm font-bold text-foundry-slate">
                  Phone Number (WhatsApp Active) <span className="text-academy-primary" aria-hidden="true">*</span>
                </label>
                <span className="text-xs text-foundry-secondary">Accepts intl. format</span>
              </div>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="+234 801 234 5678"
                  value={values.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                  className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-foundry-slate placeholder-gray-400 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academy-primary ${
                    errors.phone
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : 'border-foundry-border hover:border-gray-400'
                  }`}
                />
              </div>
              <p id="phone-hint" className="text-xs text-foundry-secondary">
                Example: +234 801 234 5678. Nigerian and international formats accepted.
              </p>
              {errors.phone && (
                <p id="phone-error" role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Field 4: Gender */}
            <fieldset className="space-y-3 pt-2">
              <legend className="text-sm font-bold text-foundry-slate">
                Gender <span className="text-academy-primary" aria-hidden="true">*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {GENDER_OPTIONS.map((option) => {
                  const isChecked = values.gender === option;
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 min-h-[48px] rounded-xl border px-4 py-3 cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'border-academy-primary bg-academy-light-purple/40 ring-1 ring-academy-primary font-semibold text-foundry-slate'
                          : 'border-foundry-border hover:border-gray-400 bg-white text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={isChecked}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="h-4 w-4 text-academy-primary focus:ring-academy-primary border-gray-300"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  );
                })}
              </div>
              {errors.gender && (
                <p role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.gender}</span>
                </p>
              )}
            </fieldset>

            {/* Field 5: Age Bracket */}
            <fieldset className="space-y-3 pt-2">
              <div className="flex justify-between items-baseline">
                <legend className="text-sm font-bold text-foundry-slate">
                  Age Bracket <span className="text-academy-primary" aria-hidden="true">*</span>
                </legend>
                <span className="text-xs text-foundry-secondary">Used for cohort demographic reporting</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {AGE_BRACKET_OPTIONS.map((bracket) => {
                  const isChecked = values.ageBracket === bracket;
                  return (
                    <label
                      key={bracket}
                      className={`flex items-center gap-3 min-h-[48px] rounded-xl border px-4 py-3 cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'border-academy-primary bg-academy-light-purple/40 ring-1 ring-academy-primary font-semibold text-foundry-slate'
                          : 'border-foundry-border hover:border-gray-400 bg-white text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ageBracket"
                        value={bracket}
                        checked={isChecked}
                        onChange={(e) => handleChange('ageBracket', e.target.value)}
                        className="h-4 w-4 text-academy-primary focus:ring-academy-primary border-gray-300"
                      />
                      <span className="text-sm">{bracket}</span>
                    </label>
                  );
                })}
              </div>
              {errors.ageBracket && (
                <p role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.ageBracket}</span>
                </p>
              )}
            </fieldset>

            {/* Field 6: Current State of Residence */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label htmlFor="stateOfResidence" className="block text-sm font-bold text-foundry-slate">
                  Current State of Residence <span className="text-academy-primary" aria-hidden="true">*</span>
                </label>
                <span className="text-xs text-foundry-secondary">All 36 states + FCT</span>
              </div>
              <div className="relative">
                <select
                  id="stateOfResidence"
                  name="stateOfResidence"
                  required
                  value={values.stateOfResidence}
                  onChange={(e) => handleChange('stateOfResidence', e.target.value)}
                  onBlur={() => handleBlur('stateOfResidence')}
                  aria-invalid={!!errors.stateOfResidence}
                  aria-describedby={errors.stateOfResidence ? 'state-error' : undefined}
                  className={`w-full min-h-[48px] rounded-xl border px-4 py-3 text-sm text-foundry-slate bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-academy-primary cursor-pointer ${
                    errors.stateOfResidence
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : 'border-foundry-border hover:border-gray-400'
                  }`}
                >
                  <option value="" disabled>
                    -- Select your state of residence --
                  </option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              {errors.stateOfResidence && (
                <p id="state-error" role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.stateOfResidence}</span>
                </p>
              )}
            </div>

            {/* Field 7: Physical Hub Touchpoint Proximity */}
            <fieldset className="space-y-3 pt-2">
              <div className="space-y-1">
                <legend className="text-sm font-bold text-foundry-slate">
                  Physical Hub Touchpoint Proximity <span className="text-academy-primary" aria-hidden="true">*</span>
                </legend>
                <p className="text-xs text-foundry-secondary leading-relaxed">
                  {config.sectionOne.hubProximityIntro}
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {HUB_PROXIMITY_OPTIONS.map((hub) => {
                  const isChecked = values.hubProximity === hub;
                  return (
                    <label
                      key={hub}
                      className={`flex items-start gap-3 min-h-[48px] rounded-xl border p-3.5 sm:p-4 cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'border-academy-primary bg-academy-light-purple/40 ring-1 ring-academy-primary text-foundry-slate'
                          : 'border-foundry-border hover:border-gray-400 bg-white text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="hubProximity"
                        value={hub}
                        checked={isChecked}
                        onChange={(e) => handleChange('hubProximity', e.target.value)}
                        className="mt-1 h-4 w-4 text-academy-primary focus:ring-academy-primary border-gray-300"
                      />
                      <span className={`text-sm leading-snug ${isChecked ? 'font-semibold' : ''}`}>
                        {hub}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.hubProximity && (
                <p role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.hubProximity}</span>
                </p>
              )}
            </fieldset>
          </div>

          {/* Form Navigation Bar */}
          <div className="pt-6 border-t border-foundry-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-xs text-foundry-secondary">
              All 7 fields in Section 1 are required before proceeding.
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              <span>Save &amp; Continue</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      )}

      {/* 4. Step 2 / Pending Specification Screen */}
      {currentStep === 2 && (
        <div className="rounded-3xl border border-foundry-border bg-white p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in-50 duration-200">
          <div className="border-b border-foundry-border pb-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-academy-primary text-white text-xs font-bold font-display">
                01
              </span>
              <Heading as="h2" size="lg" className="text-foundry-slate">
                Your Application Form Is Being Prepared
              </Heading>
            </div>
            <Text size="sm" tone="secondary">
              The remaining application sections are currently being finalised. You can review your personal information, but applications cannot yet be submitted.
            </Text>
          </div>

          {/* Temporary Section 1 Preview Notice */}
          <div
            role="note"
            aria-label="Temporary Section 1 preview notice"
            className="rounded-2xl border border-academy-primary/30 bg-academy-light-purple/40 p-4 sm:p-5 flex items-start gap-3"
          >
            <Info className="h-5 w-5 text-academy-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-academy-primary">
                Temporary Preview — Section 1 Only
              </p>
              <p className="text-xs sm:text-sm text-foundry-slate leading-relaxed">
                This is an interim review of your Personal &amp; Demographic Information. Step 2 (Additional Application Information) and Step 3 (Final Review) remain locked while the remaining questions are being prepared.
              </p>
            </div>
          </div>

          {/* Summary of Verified Section 1 Entries */}
          <div className="rounded-2xl bg-foundry-canvas border border-foundry-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-foundry-slate uppercase tracking-wider">
                Personal Information Review
              </h3>
              <button
                type="button"
                onClick={handleBackToStepOne}
                className="text-xs font-bold text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary cursor-pointer"
              >
                Edit Section 1
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-foundry-secondary">Full Name</span>
                <p className="font-semibold text-foundry-slate text-sm">{values.fullName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-foundry-secondary">Email Address</span>
                <p className="font-semibold text-foundry-slate text-sm">{values.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-foundry-secondary">WhatsApp Phone</span>
                <p className="font-semibold text-foundry-slate text-sm">{values.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-foundry-secondary">Gender &amp; Age Bracket</span>
                <p className="font-semibold text-foundry-slate text-sm">
                  {values.gender} • {values.ageBracket}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-foundry-secondary">State of Residence</span>
                <p className="font-semibold text-foundry-slate text-sm">{values.stateOfResidence}</p>
              </div>

              <div className="space-y-1">
                <span className="text-foundry-secondary">Hub Touchpoint Proximity</span>
                <p className="font-semibold text-foundry-slate text-sm leading-snug">{values.hubProximity}</p>
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-4 border-t border-foundry-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBackToStepOne}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Section 1</span>
            </Button>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="lg"
                disabled
                className="w-full sm:w-auto opacity-60 cursor-not-allowed"
                title="Applications are not yet open"
              >
                <span>Applications Not Yet Open</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Helpful Context & Navigation Links */}
      <div className="rounded-2xl border border-foundry-border bg-foundry-canvas p-6 text-xs text-foundry-secondary space-y-3">
        <p className="font-semibold text-foundry-slate">
          Need more information before completing your application?
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/programmes"
            className="font-medium text-foundry-slate hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
          >
            ← Explore Programme Catalogue
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            href="/admissions"
            className="font-medium text-foundry-slate hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
          >
            Review Admissions Guide
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            href="/how-we-learn"
            className="font-medium text-foundry-slate hover:text-academy-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-academy-primary"
          >
            How We Learn
          </Link>
        </div>
      </div>
    </div>
  );
}
