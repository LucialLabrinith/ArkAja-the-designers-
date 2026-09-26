import React, { useState } from 'react';
import { PRICING_PLANS, CUSTOM_PARCEL_OPTIONS, CustomParcelItemOption } from '../data/pricingData';
import { ProjectInquiryData } from '../types';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  Sliders,
  DollarSign,
  Mail,
  Building,
  Sparkles,
  Info
} from 'lucide-react';

interface ProjectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: 'STARTER' | 'SIGNATURE' | 'CUSTOM';
  initialCategory?: string;
  initialDetails?: string;
}

export const ProjectBookingModal: React.FC<ProjectBookingModalProps> = ({
  isOpen,
  onClose,
  initialPackage = 'SIGNATURE',
  initialCategory = '',
  initialDetails = ''
}) => {
  const [step, setStep] = useState<'form' | 'summary' | 'confirmed'>('form');
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'INR'>('USD');
  const [selectedPackageId, setSelectedPackageId] = useState<'STARTER' | 'SIGNATURE' | 'CUSTOM'>(initialPackage);

  // Selected options for Custom Parcel
  const [selectedCustomOptions, setSelectedCustomOptions] = useState<string[]>(
    CUSTOM_PARCEL_OPTIONS.filter((opt) => opt.defaultSelected).map((opt) => opt.id)
  );

  const [formData, setFormData] = useState<ProjectInquiryData>({
    name: '',
    businessName: '',
    email: '',
    country: 'USA',
    businessCategory: initialCategory || 'Beauty & Skincare',
    need: 'Custom Visual Campaign & Content Suite',
    packageId: initialPackage,
    deadline: 'Within 2–3 business days',
    details: initialDetails || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquiryId, setEnquiryId] = useState('');

  React.useEffect(() => {
    if (initialPackage) {
      setSelectedPackageId(initialPackage);
      setFormData((prev) => ({ ...prev, packageId: initialPackage }));
    }
  }, [initialPackage]);

  React.useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({ ...prev, businessCategory: initialCategory }));
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialDetails) {
      setFormData((prev) => ({ ...prev, details: initialDetails }));
    }
  }, [initialDetails]);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPackageId) || PRICING_PLANS[1];

  // Helper to format item prices
  const getItemPrice = (opt: CustomParcelItemOption) => {
    if (currency === 'INR') return `₹${opt.priceINR.toLocaleString('en-IN')}`;
    if (currency === 'GBP') return `£${opt.priceGBP}`;
    return `$${opt.priceUSD}`;
  };

  // Calculate dynamic custom total
  const customTotal = selectedCustomOptions.reduce((acc, optId) => {
    const opt = CUSTOM_PARCEL_OPTIONS.find((o) => o.id === optId);
    if (!opt) return acc;
    if (currency === 'INR') return acc + opt.priceINR;
    if (currency === 'GBP') return acc + opt.priceGBP;
    return acc + opt.priceUSD;
  }, 0);

  const formatPlanPrice = () => {
    if (selectedPackageId === 'CUSTOM') {
      if (currency === 'INR') return `₹${customTotal.toLocaleString('en-IN')}`;
      if (currency === 'GBP') return `£${customTotal}`;
      return `$${customTotal}`;
    }
    if (currency === 'INR') return `₹${currentPlan.priceINR.toLocaleString('en-IN')}`;
    if (currency === 'GBP') return `£${currentPlan.priceGBP}`;
    return `$${currentPlan.priceUSD}`;
  };

  const toggleCustomOption = (optId: string) => {
    setSelectedCustomOptions((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    );
  };

  const handleNextToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.businessName) return;
    setStep('summary');
  };

  const handleSubmitEnquiry = async () => {
    setIsSubmitting(true);

    const customItemsData =
      selectedPackageId === 'CUSTOM'
        ? selectedCustomOptions.map((optId) => {
            const opt = CUSTOM_PARCEL_OPTIONS.find((o) => o.id === optId);
            return {
              id: optId,
              title: opt?.name || optId,
              price: opt ? getItemPrice(opt) : ''
            };
          })
        : [];

    const enquiryPayload = {
      name: formData.name,
      email: formData.email,
      businessName: formData.businessName,
      businessCategory: formData.businessCategory,
      country: formData.country,
      packageId: selectedPackageId,
      packageName: currentPlan.name,
      budgetEstimate: formatPlanPrice(),
      customParcelItems: customItemsData,
      details: formData.details,
      deadline: formData.deadline,
      submittedAt: new Date().toISOString()
    };

    try {
      // 1. Send to server backend
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryPayload)
      });
      const data = await res.json();
      setEnquiryId(data.enquiryId || 'enq_' + Date.now().toString(36).toUpperCase());
    } catch {
      // fallback ID
      setEnquiryId('enq_' + Date.now().toString(36).toUpperCase());
    }

    // 2. Persist in local storage so owner can view in Admin Inbox
    try {
      const prevLocal = JSON.parse(localStorage.getItem('arkaja_client_enquiries') || '[]');
      prevLocal.unshift({ ...enquiryPayload, id: enquiryId || 'enq_' + Date.now().toString(36) });
      localStorage.setItem('arkaja_client_enquiries', JSON.stringify(prevLocal));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl my-8 rounded-2xl bg-[#F7F5EF] border border-[#E5E0D8] shadow-2xl overflow-hidden flex flex-col text-[#141312] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E0D8] bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8F6F3A]" />
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#8F6F3A] font-bold">
                PROJECT CONSULTATION &amp; ENQUIRY
              </span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#141312] mt-0.5">
              {step === 'form' && 'Start Your Project Enquiry'}
              {step === 'summary' && 'Review Your Project Brief'}
              {step === 'confirmed' && 'Enquiry Received'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="hidden sm:inline-flex items-center p-0.5 rounded-md bg-[#FAF7F2] border border-[#E5E0D8] text-[11px]">
              {(['USD', 'GBP', 'INR'] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded font-semibold transition-all ${
                    currency === curr ? 'bg-[#141312] text-white' : 'text-[#66605B]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-[#E5E0D8] flex items-center justify-center text-[#66605B] hover:text-[#141312] hover:bg-[#EAE5DC] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* STEP 1: FORM & CUSTOM PARCEL SELECTOR */}
        {step === 'form' && (
          <form onSubmit={handleNextToSummary} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            {/* Package / Parcel Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#66605B] font-bold">
                  1. Select Your Creative Package / Parcel
                </label>
                <span className="text-xs text-[#8F6F3A] font-semibold">
                  No payment required to enquire
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRICING_PLANS.map((plan) => {
                  const isSelected = selectedPackageId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => {
                        setSelectedPackageId(plan.id as any);
                        setFormData((prev) => ({ ...prev, packageId: plan.id as any }));
                      }}
                      className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#8F6F3A] bg-[#FAF6EE] shadow-sm ring-1 ring-[#8F6F3A]'
                          : 'border-[#E5E0D8] bg-white hover:border-[#8F6F3A]/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-editorial text-sm font-bold text-[#141312]">{plan.name}</span>
                          {isSelected && <Check size={14} className="text-[#8F6F3A]" />}
                        </div>
                        <p className="text-[11px] text-[#66605B] line-clamp-2">{plan.turnaround}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-[#E5E0D8]/60">
                        <span className="text-xs font-bold text-[#8F6F3A]">
                          {plan.id === 'CUSTOM' ? 'Modular Pricing' : `From ${currency === 'INR' ? `₹${plan.priceINR}` : currency === 'GBP' ? `£${plan.priceGBP}` : `$${plan.priceUSD}`}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CUSTOM PARCEL BUILDER (If Custom is selected) */}
            {selectedPackageId === 'CUSTOM' && (
              <div className="p-5 rounded-2xl bg-white border border-[#8F6F3A]/40 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <div className="flex items-center gap-2">
                    <Sliders size={16} className="text-[#8F6F3A]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#141312] font-bold">
                      Build Your Custom Parcel (Select Deliverables)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#66605B] uppercase block">Estimated Subtotal</span>
                    <span className="text-sm font-mono font-bold text-[#8F6F3A]">{formatPlanPrice()}</span>
                  </div>
                </div>

                <p className="text-xs text-[#66605B]">
                  Select the exact creative deliverables you need. Each item has transparent individual pricing:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CUSTOM_PARCEL_OPTIONS.map((opt) => {
                    const isChecked = selectedCustomOptions.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleCustomOption(opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                          isChecked
                            ? 'bg-[#FAF6EE] border-[#8F6F3A] shadow-xs'
                            : 'bg-[#FAF8F5] border-[#E5E0D8] hover:border-[#D5CCA6]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded text-[#8F6F3A] focus:ring-[#8F6F3A]"
                          />
                          <div>
                            <span className="text-xs font-medium text-[#141312] block leading-tight">
                              {opt.name}
                            </span>
                            <span className="text-[10px] text-[#66605B] line-clamp-1 mt-0.5">
                              {opt.description}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-bold text-[#8F6F3A] shrink-0">
                          {getItemPrice(opt)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Client Information */}
            <div className="space-y-4">
              <label className="text-xs font-mono uppercase tracking-wider text-[#66605B] font-bold block">
                2. Your Contact &amp; Brand Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-sans font-medium text-[#332F2B] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans font-medium text-[#332F2B] block mb-1">
                    Business / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Lumina Apothecary"
                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans font-medium text-[#332F2B] block mb-1">
                    Email Address * (We will reply here)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@lumina.com"
                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-sans font-medium text-[#332F2B] block mb-1">
                    Business Category
                  </label>
                  <select
                    value={formData.businessCategory}
                    onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                    className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                  >
                    <option value="Beauty & Skincare">Beauty, Cosmetics &amp; Skincare</option>
                    <option value="Fashion & Apparel">Fashion, Apparel &amp; Sarees</option>
                    <option value="Hospitality & F&B">Artisanal Café, Brunch &amp; F&amp;B</option>
                    <option value="Luxury Lifestyle">Luxury Lifestyle &amp; Home</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-sans font-medium text-[#332F2B] block mb-1">
                  Project Notes &amp; Creative Needs
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe your upcoming campaign, target launch dates, or specific creative style you admire..."
                  className="w-full bg-white border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
              <div className="text-xs text-[#66605B]">
                <span className="font-semibold text-[#141312]">Consultation Only:</span> No payment or card required.
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#141312] hover:bg-[#2C2825] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <span>Review Brief</span>
                <ArrowRight size={14} className="text-[#D4B98C]" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: SUMMARY & ENQUIRY CONFIRMATION */}
        {step === 'summary' && (
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
            <div className="p-5 rounded-2xl bg-white border border-[#E5E0D8] shadow-xs space-y-4">
              <div className="flex items-start justify-between border-b border-[#E5E0D8] pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F6F3A] font-bold block">
                    PROJECT SUMMARY
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-[#141312]">
                    {formData.businessName} · {currentPlan.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#66605B] uppercase block">Estimated Investment</span>
                  <span className="text-base font-mono font-bold text-[#8F6F3A]">{formatPlanPrice()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-[#66605B]">
                <div>
                  <span className="text-[10px] uppercase font-mono block text-[#8C827A]">Client Contact</span>
                  <span className="font-medium text-[#141312]">{formData.name}</span>
                  <span className="block text-[11px]">{formData.email}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono block text-[#8C827A]">Industry</span>
                  <span className="font-medium text-[#141312]">{formData.businessCategory}</span>
                </div>
              </div>

              {/* Selected custom items breakdown */}
              {selectedPackageId === 'CUSTOM' && (
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E5E0D8]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F6F3A] font-bold block mb-2">
                    Selected Custom Deliverables ({selectedCustomOptions.length}):
                  </span>
                  <ul className="space-y-1.5">
                    {selectedCustomOptions.map((optId) => {
                      const opt = CUSTOM_PARCEL_OPTIONS.find((o) => o.id === optId);
                      if (!opt) return null;
                      return (
                        <li key={opt.id} className="flex items-center justify-between text-xs text-[#332F2B]">
                          <span>• {opt.name}</span>
                          <span className="font-mono text-[#8F6F3A] font-medium">{getItemPrice(opt)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {formData.details && (
                <div>
                  <span className="text-[10px] uppercase font-mono block text-[#8C827A] mb-1">Project Notes</span>
                  <p className="text-xs text-[#332F2B] bg-[#FAF8F5] p-3 rounded-lg border border-[#E5E0D8]">
                    {formData.details}
                  </p>
                </div>
              )}
            </div>

            {/* Explanatory Note */}
            <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#8F6F3A]/30 flex items-start gap-3">
              <Info size={16} className="text-[#8F6F3A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#4A402E]">
                Submitting this enquiry does <strong>not</strong> obligate you to purchase or enter payment details. ArkAja Studio will personally review your brief and reply with creative availability, timeline, and proposal details.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] text-xs font-semibold text-[#66605B] hover:text-[#141312] transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>Modify Scope</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitEnquiry}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-[#8F6F3A] hover:bg-[#A38045] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
              >
                <Send size={14} />
                <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry to Studio'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED */}
        {step === 'confirmed' && (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-xs font-mono text-[#8F6F3A] uppercase tracking-widest font-bold">
                ENQUIRY DISPATCHED • REF: {enquiryId}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141312] mt-1">
                Thank You, {formData.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#66605B] mt-2 max-w-md mx-auto">
                Your creative consultation brief for <strong>{formData.businessName}</strong> has been received by ArkAja Studio.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-white border border-[#E5E0D8] text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8C827A]">Package Selected:</span>
                <span className="font-bold text-[#141312]">{currentPlan.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C827A]">Estimated Investment:</span>
                <span className="font-mono font-bold text-[#8F6F3A]">{formatPlanPrice()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8C827A]">Next Step:</span>
                <span className="text-[#332F2B]">Direct reply via {formData.email} within 24h</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:divyaam2008@gmail.com?subject=ArkAja Studio Project Enquiry - ${formData.businessName}&body=Hi ArkAja Studio,%0D%0A%0D%0AI just submitted an enquiry for ${formData.businessName} (${formData.businessCategory}).%0D%0A%0D%0APackage: ${currentPlan.name}%0D%0AEstimate: ${formatPlanPrice()}%0D%0A%0D%0ANotes: ${encodeURIComponent(formData.details)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#8F6F3A] text-[#8F6F3A] hover:bg-[#8F6F3A] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Mail size={13} />
                <span>Send Copy via Email</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#141312] text-white hover:bg-[#2C2825] transition-all text-xs font-semibold uppercase tracking-wider"
              >
                Done &amp; Return to Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
