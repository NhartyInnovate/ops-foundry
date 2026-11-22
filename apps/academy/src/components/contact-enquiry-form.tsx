'use client';

import React, { useState } from 'react';
import { Button, Heading, Text } from '@opsfoundry/ui';
import { AlertCircle, CheckCircle2, Send, Info } from 'lucide-react';

export function ContactEnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'Admissions' as 'Admissions' | 'Curriculum' | 'Tuition & Scholarships' | 'General',
    subject: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Please provide your message or question.';
    if (!formData.consent) {
      newErrors.consent = 'You must confirm consent before submitting.';
    }
    return newErrors;
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
  };

  return (
    <div className="rounded-3xl bg-white border border-foundry-border p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
      {/* Explicit Frontend Demo / Operational Notice */}
      <div
        role="status"
        aria-label="Contact form integration status"
        className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed"
      >
        <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-amber-950 mb-0.5">Frontend Demonstration Interface</p>
          <p>
            Official admissions support channels and direct email mailboxes are undergoing configuration prior to public cohort launch. This contact interface demonstrates the approved fields and category structure; enquiries are not stored in a database or delivered to live mailboxes.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-6 sm:p-8 text-center space-y-3">
          <Info className="h-8 w-8 text-amber-700 mx-auto" aria-hidden="true" />
          <Heading as="h3" size="sm" className="text-foundry-slate">
            Demonstration Complete — No Information Transmitted
          </Heading>
          <Text size="sm" tone="secondary" className="max-w-md mx-auto leading-relaxed">
            This is a frontend demonstration only. No message was submitted, stored, or transmitted. Official admissions and contact channels will open alongside the formal cohort announcement.
          </Text>
          <div className="pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  category: 'Admissions',
                  subject: '',
                  message: '',
                  consent: false,
                });
              }}
            >
              Reset Demonstration Form
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs font-bold text-foundry-slate">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="e.g. Alex Morgan"
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="contactEmail" className="block text-xs font-bold text-foundry-slate">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="contactEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="e.g. alex@example.com"
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Enquiry Category */}
            <div className="space-y-1.5">
              <label htmlFor="enquiryCategory" className="block text-xs font-bold text-foundry-slate">
                Enquiry Category
              </label>
              <select
                id="enquiryCategory"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as 'Admissions' | 'Curriculum' | 'Tuition & Scholarships' | 'General',
                  })
                }
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
              >
                <option value="Admissions">Admissions & Intake Schedules</option>
                <option value="Curriculum">Curriculum & Pathways</option>
                <option value="Tuition & Scholarships">Tuition & Funding Opportunities</option>
                <option value="General">General Inquiries</option>
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-xs font-bold text-foundry-slate">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="Brief summary of your question"
              />
              {errors.subject && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.subject}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="contactMessage" className="block text-xs font-bold text-foundry-slate">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contactMessage"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-xl border border-foundry-border bg-foundry-canvas p-3 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary leading-relaxed"
              placeholder="Please provide details regarding your inquiry."
            />
            {errors.message && (
              <p className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.message}
              </p>
            )}
          </div>

          {/* Consent */}
          <div className="space-y-1.5 pt-1 border-t border-gray-100">
            <label className="flex items-start gap-2.5 text-xs text-foundry-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded border-gray-300 text-academy-primary focus:ring-academy-primary"
              />
              <span>
                I consent to the Academy admissions and support team reviewing these details to respond to my enquiry. <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.consent}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              <span>Send Message</span>
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
