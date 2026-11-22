'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading, Text, Button, Badge } from '@opsfoundry/ui';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  Calendar,
  Lock,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { academyApplicationConfig } from '../content/fellowship-application';

export interface ApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  preferredProgramme: string;
  motivation: string;
  weeklyCommitment: boolean;
  consent: boolean;
}

export interface ApplicationFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  preferredProgramme?: string;
  motivation?: string;
  weeklyCommitment?: string;
  consent?: string;
}

interface ApplicationFormProps {
  programmeParam?: string;
}

export function FellowshipApplicationForm({ programmeParam }: ApplicationFormProps) {
  const config = academyApplicationConfig;

  // Pre-select programme if matching slug passed
  const initialProgramme =
    config.launchProgrammes.find((p) => p.slug === programmeParam)?.slug ||
    config.launchProgrammes[0].slug;

  const [values, setValues] = useState<ApplicationFormValues>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    preferredProgramme: initialProgramme,
    motivation: '',
    weeklyCommitment: false,
    consent: false,
  });

  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validate = (): ApplicationFormErrors => {
    const errs: ApplicationFormErrors = {};

    if (!values.fullName.trim()) {
      errs.fullName = 'Full legal name is required.';
    } else if (values.fullName.trim().split(/\s+/).length < 2) {
      errs.fullName = 'Please provide both your first name and surname.';
    }

    if (!values.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!values.phone.trim()) {
      errs.phone = 'Telephone contact is required.';
    }

    if (!values.location.trim()) {
      errs.location = 'Geographic location (city, state/country) is required.';
    }

    if (!values.preferredProgramme) {
      errs.preferredProgramme = 'Please select your preferred programme track.';
    }

    if (!values.motivation.trim()) {
      errs.motivation = 'Please briefly outline your learning motivation and background.';
    }

    if (!values.weeklyCommitment) {
      errs.weeklyCommitment = 'You must confirm your availability for weekly study and practice.';
    }

    if (!values.consent) {
      errs.consent = 'You must acknowledge the admissions review and data handling notice.';
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setValues({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      preferredProgramme: config.launchProgrammes[0].slug,
      motivation: '',
      weeklyCommitment: false,
      consent: false,
    });
    setErrors({});
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Card & Approved Admissions Positioning */}
      <div className="rounded-3xl border border-foundry-border bg-white p-6 sm:p-9 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="brand" className="text-xs uppercase tracking-wider font-bold">
            {config.badge}
          </Badge>
          <div className="flex items-center gap-2 text-xs font-medium text-foundry-secondary">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            <span>Applications In Scoping Mode</span>
          </div>
        </div>

        <div className="space-y-3">
          <Heading as="h1" size="xl" className="text-foundry-slate tracking-tight">
            {config.title}
          </Heading>
          <Text size="base" tone="secondary" className="leading-relaxed max-w-3xl">
            {config.description}
          </Text>
        </div>

        {/* Operational Scoping Notice */}
        <div
          role="note"
          aria-label="Admissions publication notice"
          className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 flex items-start gap-3.5 text-xs text-amber-950 leading-relaxed"
        >
          <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-bold text-amber-950">
              Frontend Demonstration &amp; Intake Scoping
            </p>
            <p>
              In accordance with Section 11 of the Master Brief, cohort dates, schedules, capacity, and tuition fees are undergoing institutional sign-off. This application interface demonstrates the approved admissions evaluation fields; submissions are not stored in a database or transmitted to live mailboxes.
            </p>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        /* Demonstration Completed State */
        <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-8 sm:p-12 text-center space-y-5 shadow-xs">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 mx-auto">
            <Info className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <Heading as="h2" size="lg" className="text-foundry-slate">
              Demonstration Complete — No Information Transmitted
            </Heading>
            <Text size="sm" tone="secondary" className="max-w-xl mx-auto leading-relaxed">
              This is a frontend demonstration only. No application data was stored or transmitted. Cohort applications will open formally following official intake announcements and curriculum sign-off.
            </Text>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button type="button" variant="primary" size="md" onClick={handleReset}>
              Reset Demonstration Form
            </Button>
            <Button asChild variant="outline" size="md">
              <Link href="/admissions">Return to Admissions Guide</Link>
            </Button>
          </div>
        </div>
      ) : (
        /* Application Form */
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-foundry-border bg-white p-6 sm:p-10 shadow-xs space-y-8"
        >
          {/* Section 1: Candidate & Contact Details */}
          <div className="space-y-6">
            <div className="border-b border-foundry-border pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-academy-primary text-white text-xs font-bold font-display">
                  01
                </span>
                <Heading as="h2" size="sm" className="text-foundry-slate">
                  Candidate &amp; Contact Details
                </Heading>
              </div>
              <p className="text-xs text-foundry-secondary">
                Please provide your contact information as it appears on official identification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="appFullName" className="block text-xs font-bold text-foundry-slate">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="appFullName"
                  type="text"
                  value={values.fullName}
                  onChange={(e) => setValues({ ...values, fullName: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="appEmail" className="block text-xs font-bold text-foundry-slate">
                  Primary Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="appEmail"
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  placeholder="e.g. alex.morgan@example.com"
                  className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                />
                {errors.email && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Telephone */}
              <div className="space-y-1.5">
                <label htmlFor="appPhone" className="block text-xs font-bold text-foundry-slate">
                  Telephone Contact <span className="text-red-500">*</span>
                </label>
                <input
                  id="appPhone"
                  type="tel"
                  value={values.phone}
                  onChange={(e) => setValues({ ...values, phone: e.target.value })}
                  placeholder="e.g. +234 801 234 5678"
                  className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label htmlFor="appLocation" className="block text-xs font-bold text-foundry-slate">
                  Current Geographic Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="appLocation"
                  type="text"
                  value={values.location}
                  onChange={(e) => setValues({ ...values, location: e.target.value })}
                  placeholder="e.g. Lagos, Nigeria"
                  className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                />
                {errors.location && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Preferred Programme Track */}
          <div className="space-y-6">
            <div className="border-b border-foundry-border pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-academy-primary text-white text-xs font-bold font-display">
                  02
                </span>
                <Heading as="h2" size="sm" className="text-foundry-slate">
                  Preferred Launch Programme Track
                </Heading>
              </div>
              <p className="text-xs text-foundry-secondary">
                Select the training offer aligned with your career goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {config.launchProgrammes.map((prog) => {
                const isSelected = values.preferredProgramme === prog.slug;
                return (
                  <label
                    key={prog.slug}
                    className={`rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'border-academy-primary bg-academy-light-purple/40 shadow-xs ring-1 ring-academy-primary'
                        : 'border-foundry-border bg-foundry-canvas hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-foundry-border mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-academy-primary">
                          {prog.trackNumber}
                        </span>
                        <input
                          type="radio"
                          name="preferredProgramme"
                          value={prog.slug}
                          checked={isSelected}
                          onChange={(e) =>
                            setValues({ ...values, preferredProgramme: e.target.value })
                          }
                          className="h-4 w-4 text-academy-primary focus:ring-academy-primary"
                        />
                      </div>
                      <p className="font-display text-xs font-bold text-foundry-slate mb-1">
                        {prog.title}
                      </p>
                      <p className="text-[11px] text-foundry-secondary leading-relaxed">
                        {prog.summary}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 3: Background & Motivation */}
          <div className="space-y-6">
            <div className="border-b border-foundry-border pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-academy-primary text-white text-xs font-bold font-display">
                  03
                </span>
                <Heading as="h2" size="sm" className="text-foundry-slate">
                  Background &amp; Learning Motivation
                </Heading>
              </div>
              <p className="text-xs text-foundry-secondary">
                Tell us why you want to develop practical capabilities in digital business operations.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="appMotivation" className="block text-xs font-bold text-foundry-slate">
                Statement of Motivation <span className="text-red-500">*</span>
              </label>
              <textarea
                id="appMotivation"
                rows={4}
                value={values.motivation}
                onChange={(e) => setValues({ ...values, motivation: e.target.value })}
                placeholder="Briefly describe your previous experience and why you are interested in this operational pathway..."
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary leading-relaxed"
              />
              {errors.motivation && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.motivation}
                </p>
              )}
            </div>

            {/* Checkboxes: Weekly Commitment & Consent */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.weeklyCommitment}
                  onChange={(e) =>
                    setValues({ ...values, weeklyCommitment: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-academy-primary focus:ring-academy-primary mt-0.5"
                />
                <span className="text-xs text-foundry-secondary leading-relaxed">
                  <strong className="text-foundry-slate">Weekly Study Commitment:</strong> I confirm that I can dedicate the necessary weekly time for coursework, practical assignments, and collaborative project reviews.
                </span>
              </label>
              {errors.weeklyCommitment && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.weeklyCommitment}
                </p>
              )}

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) =>
                    setValues({ ...values, consent: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-academy-primary focus:ring-academy-primary mt-0.5"
                />
                <span className="text-xs text-foundry-secondary leading-relaxed">
                  <strong className="text-foundry-slate">Admissions Governance Acknowledgment:</strong> I acknowledge that training, certification, readiness, and hiring are separate decisions, and that admission to or completion of the Academy does not guarantee employment.
                </span>
              </label>
              {errors.consent && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.consent}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-foundry-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-foundry-secondary">
              Frontend demonstration • Submissions are not transmitted
            </span>
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              <span>Register Interest (Demonstration)</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
