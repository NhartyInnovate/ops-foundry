'use client';

import React, { useState } from 'react';
import { Button, Heading, Text } from '@opsfoundry/ui';
import { AlertCircle, CheckCircle2, Send, Info } from 'lucide-react';

export function PartnershipEnquiryForm() {
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    workEmail: '',
    location: '',
    partnershipTypes: [] as string[],
    proposedContribution: '',
    approximateScale: '1-10',
    timing: 'Next 3-6 months',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availablePartnershipTypes = [
    'Sponsor Scholarships',
    'Provide Devices & Connectivity',
    'Support Curriculum or Industry Projects',
    'Offer Internships or Job Opportunities',
    'Co-Create a Programme or Cohort',
  ];

  const handleCheckboxChange = (type: string) => {
    setFormData((prev) => {
      const exists = prev.partnershipTypes.includes(type);
      return {
        ...prev,
        partnershipTypes: exists
          ? prev.partnershipTypes.filter((t) => t !== type)
          : [...prev.partnershipTypes, type],
      };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organization.trim()) newErrors.organization = 'Organisation name is required.';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required.';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid work email address.';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    if (formData.partnershipTypes.length === 0) {
      newErrors.partnershipTypes = 'Please select at least one partnership area.';
    }
    if (!formData.proposedContribution.trim()) {
      newErrors.proposedContribution = 'Please briefly outline your proposed contribution.';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must acknowledge the enquiry consent notice.';
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
      {/* Explicit Frontend Demo / Operational Limitation Notice */}
      <div
        role="status"
        aria-label="Form integration status"
        className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 flex items-start gap-3.5 text-xs text-amber-900 leading-relaxed"
      >
        <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-amber-950 mb-0.5">Frontend Demonstration Interface</p>
          <p>
            Official partnership enquiry intake channels and data storage are currently undergoing integration prior to cohort launch. This form demonstrates the approved partnership data fields and validation rules; submissions are not stored or transmitted to external mailboxes.
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
            This is a frontend demonstration only. No information was submitted, stored, or transmitted. Live partnership channels will be formally enabled alongside the opening of public cohort sponsorship agreements.
          </Text>
          <div className="pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  organization: '',
                  contactName: '',
                  workEmail: '',
                  location: '',
                  partnershipTypes: [],
                  proposedContribution: '',
                  approximateScale: '1-10',
                  timing: 'Next 3-6 months',
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
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Organisation */}
            <div className="space-y-1.5">
              <label htmlFor="organization" className="block text-xs font-bold text-foundry-slate">
                Organisation Name <span className="text-red-500">*</span>
              </label>
              <input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="e.g. Acme Foundation or Corporation"
              />
              {errors.organization && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.organization}
                </p>
              )}
            </div>

            {/* Contact Name */}
            <div className="space-y-1.5">
              <label htmlFor="contactName" className="block text-xs font-bold text-foundry-slate">
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contactName"
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="e.g. Jane Doe"
              />
              {errors.contactName && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.contactName}
                </p>
              )}
            </div>

            {/* Work Email */}
            <div className="space-y-1.5">
              <label htmlFor="workEmail" className="block text-xs font-bold text-foundry-slate">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="e.g. jane@organization.com"
              />
              {errors.workEmail && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.workEmail}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label htmlFor="location" className="block text-xs font-bold text-foundry-slate">
                Location / Country of Operation <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
                placeholder="e.g. London, UK / Lagos, Nigeria"
              />
              {errors.location && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Partnership Types (Multi-select) */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="block text-xs font-bold text-foundry-slate">
              Partnership Area(s) of Interest <span className="text-red-500">*</span>
            </span>
            <p className="text-[11px] text-foundry-secondary">Select all that apply to your proposed collaboration:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {availablePartnershipTypes.map((type) => {
                const checked = formData.partnershipTypes.includes(type);
                return (
                  <label
                    key={type}
                    className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'border-academy-primary bg-academy-light-purple/30 text-foundry-slate font-medium'
                        : 'border-foundry-border bg-foundry-canvas text-foundry-secondary hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheckboxChange(type)}
                      className="mt-0.5 rounded border-gray-300 text-academy-primary focus:ring-academy-primary"
                    />
                    <span>{type}</span>
                  </label>
                );
              })}
            </div>
            {errors.partnershipTypes && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 pt-1">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.partnershipTypes}
              </p>
            )}
          </div>

          {/* Proposed Contribution */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <label htmlFor="proposedContribution" className="block text-xs font-bold text-foundry-slate">
              Proposed Contribution Overview <span className="text-red-500">*</span>
            </label>
            <textarea
              id="proposedContribution"
              rows={3}
              value={formData.proposedContribution}
              onChange={(e) => setFormData({ ...formData, proposedContribution: e.target.value })}
              className="w-full rounded-xl border border-foundry-border bg-foundry-canvas p-3 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary leading-relaxed"
              placeholder="Briefly describe what your organization would like to support (e.g. 5 tuition scholarships, 10 refurbished laptops, guest project briefs)."
            />
            {errors.proposedContribution && (
              <p className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.proposedContribution}
              </p>
            )}
          </div>

          {/* Scale & Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="approximateScale" className="block text-xs font-bold text-foundry-slate">
                Approximate Scale / Capacity
              </label>
              <select
                id="approximateScale"
                value={formData.approximateScale}
                onChange={(e) => setFormData({ ...formData, approximateScale: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
              >
                <option value="1-10">1–10 learners or devices</option>
                <option value="10-50">10–50 learners or devices</option>
                <option value="50+">50+ learners or enterprise cohort</option>
                <option value="scoping">Under internal scoping</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="timing" className="block text-xs font-bold text-foundry-slate">
                Target Implementation Timing
              </label>
              <select
                id="timing"
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="w-full rounded-xl border border-foundry-border bg-foundry-canvas px-4 py-2.5 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary"
              >
                <option value="Immediate">Immediate / Next open intake</option>
                <option value="Next 3-6 months">Next 3–6 months</option>
                <option value="Next 6-12 months">Next 6–12 months</option>
                <option value="Exploring">Exploratory discussions only</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="message" className="block text-xs font-bold text-foundry-slate">
              Additional Context or Questions <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="message"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-xl border border-foundry-border bg-foundry-canvas p-3 text-xs text-foundry-slate focus:border-academy-primary focus:outline-none focus:ring-1 focus:ring-academy-primary leading-relaxed"
              placeholder="Any specific background, timing constraints, or questions for our team."
            />
          </div>

          {/* Consent */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <label className="flex items-start gap-2.5 text-xs text-foundry-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded border-gray-300 text-academy-primary focus:ring-academy-primary"
              />
              <span>
                I confirm that I represent this organisation and consent to the Academy admissions and partnerships team reviewing these details for exploratory discussions. <span className="text-red-500">*</span>
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
              <span>Submit Partnership Enquiry</span>
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
