import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Info,
  Calendar,
  Building,
  User,
  Plus,
  Minus,
  Layers
} from 'lucide-react';
import { AiHelpCentre } from './AiHelpCentre';

interface EnquirySectionProps {
  onSuccess?: (enquiryId: string) => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({ onSuccess }) => {
  // Customizable deliverable quantities
  const [socialPostsCount, setSocialPostsCount] = useState<number>(4);
  const [storyFramesCount, setStoryFramesCount] = useState<number>(2);
  const [promoCreativesCount, setPromoCreativesCount] = useState<number>(1);
  const [shortFormAssetsCount, setShortFormAssetsCount] = useState<number>(1);

  // Production Highlights & options
  const [priorityTurnaround, setPriorityTurnaround] = useState<boolean>(false);
  const [extraRevisions, setExtraRevisions] = useState<number>(1);

  // Client Details
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Beauty & Cosmetics');
  const [specificDetails, setSpecificDetails] = useState('');

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'INR'>('USD');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic estimate calculation based on customized quantities
  const calculateTotal = () => {
    // Rates per deliverable item
    const rateSocial = currency === 'INR' ? 800 : currency === 'GBP' ? 12 : 15;
    const rateStory = currency === 'INR' ? 600 : currency === 'GBP' ? 10 : 12;
    const ratePromo = currency === 'INR' ? 1200 : currency === 'GBP' ? 20 : 25;
    const rateShortForm = currency === 'INR' ? 1500 : currency === 'GBP' ? 24 : 29;
    const priorityFee = currency === 'INR' ? 1500 : currency === 'GBP' ? 25 : 30;

    let subtotal =
      socialPostsCount * rateSocial +
      storyFramesCount * rateStory +
      promoCreativesCount * ratePromo +
      shortFormAssetsCount * rateShortForm;

    if (priorityTurnaround) subtotal += priorityFee;
    return subtotal;
  };

  const formattedTotal = () => {
    const total = calculateTotal();
    if (currency === 'INR') return `₹${total.toLocaleString('en-IN')}`;
    if (currency === 'GBP') return `£${total}`;
    return `$${total}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('arkajastudio@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !businessName) return;

    setIsSubmitting(true);

    const enquiryPayload = {
      name,
      email,
      businessName,
      businessCategory: category,
      packageId: 'CUSTOMIZED_DELIVERABLES',
      packageName: 'Customized Studio Parcel',
      budgetEstimate: formattedTotal(),
      deliverablesCounts: {
        highImpactSocialPosts: socialPostsCount,
        editorialStoryFrames: storyFramesCount,
        promotionalCreatives: promoCreativesCount,
        shortFormVisualAssets: shortFormAssetsCount
      },
      productionHighlights: [
        'Curated art direction & color grading',
        'Exported in high-resolution ready for publish',
        priorityTurnaround ? 'Expedited 48-Hour Delivery' : 'Standard 3–4 business days delivery',
        `${extraRevisions} round(s) of revision included`
      ],
      personalSpecificDetails: specificDetails,
      details: `Custom parcel: ${socialPostsCount} social posts, ${storyFramesCount} story frames, ${promoCreativesCount} promo creatives, ${shortFormAssetsCount} short-form assets. Turnaround: ${priorityTurnaround ? '48h Priority' : 'Standard 3-4 days'}. Notes: ${specificDetails}`,
      submittedAt: new Date().toISOString()
    };

    let generatedId = 'enq_' + Date.now().toString(36).toUpperCase();

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryPayload)
      });
      const data = await res.json();
      if (data.enquiryId) generatedId = data.enquiryId;
    } catch {
      // offline / fallback
    }

    // Also persist to local storage for studio owner review
    try {
      const prev = JSON.parse(localStorage.getItem('arkaja_client_enquiries') || '[]');
      prev.unshift({ ...enquiryPayload, id: generatedId });
      localStorage.setItem('arkaja_client_enquiries', JSON.stringify(prev));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setSubmittedEnquiryId(generatedId);
    if (onSuccess) onSuccess(generatedId);
  };

  return (
    <section id="enquiry" className="py-20 lg:py-28 px-6 lg:px-8 bg-[#F7F5EF] border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8F6F3A]/10 text-[#8F6F3A] text-xs font-mono tracking-widest uppercase">
            <Sparkles size={12} />
            <span>STUDIO SERVICE ENQUIRY &amp; CONSULTATION</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141312]">
            Enquire Our Creative Services
          </h2>
          <p className="text-sm sm:text-base text-[#66605B] font-sans leading-relaxed">
            Customize the exact number of deliverables for your campaign, specify any bespoke personal requirements, and send your brief directly to our creative directors. Zero upfront commitment required.
          </p>

          {/* Prominent Direct Gmail Contact Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
              <Mail size={16} className="text-[#8F6F3A]" />
              <span className="text-xs text-[#8C827A] font-sans">Official Studio Gmail:</span>
              <a
                href="mailto:arkajastudio@gmail.com?subject=ArkAja%20Studio%20-%20Creative%20Services%20Enquiry"
                className="text-xs sm:text-sm font-mono font-bold text-[#141312] hover:text-[#8F6F3A] underline decoration-[#8F6F3A]/40 transition-colors"
                title="Click to compose an email directly to arkajastudio@gmail.com"
              >
                arkajastudio@gmail.com
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-1 hover:bg-[#FAF8F5] rounded text-[#66605B] transition-colors"
                title="Copy Gmail ID to clipboard"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>

            <a
              href="mailto:arkajastudio@gmail.com?subject=ArkAja%20Studio%20-%20Quick%20Project%20Question"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8F6F3A] hover:bg-[#A38045] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
            >
              <Mail size={13} />
              <span>Message Us on Gmail</span>
            </a>
          </div>
        </div>

        {/* Main Grid: Customizable Parcel & Enquiry Form */}
        {!submittedEnquiryId ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Customizable Deliverables & Production Highlights (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-[#8F6F3A]" />
                  <h3 className="font-editorial text-xl font-bold text-[#141312]">
                    1. Customize Your Deliverable Numbers
                  </h3>
                </div>

                {/* Currency Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-[11px] font-mono">
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
              </div>

              {/* 4 Interactive Deliverable Counters */}
              <div className="space-y-4">
                {/* 1. High-Impact Social Posts */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between gap-4">
                  <div>
                    <span className="font-medium text-sm text-[#141312] block">
                      High-impact social posts
                    </span>
                    <span className="text-[11px] text-[#66605B] block">
                      Curated art direction, color grading &amp; visual hierarchy
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSocialPostsCount(Math.max(1, socialPostsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Decrease social posts"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-[#141312]">
                      {socialPostsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSocialPostsCount(socialPostsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Increase social posts"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* 2. Editorial Story Frames */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between gap-4">
                  <div>
                    <span className="font-medium text-sm text-[#141312] block">
                      Editorial story frames
                    </span>
                    <span className="text-[11px] text-[#66605B] block">
                      9:16 vertical storytelling for Instagram stories &amp; teasers
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setStoryFramesCount(Math.max(0, storyFramesCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Decrease story frames"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-[#141312]">
                      {storyFramesCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setStoryFramesCount(storyFramesCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Increase story frames"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* 3. Promotional Creative with Offer */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between gap-4">
                  <div>
                    <span className="font-medium text-sm text-[#141312] block">
                      Promotional creative with offer
                    </span>
                    <span className="text-[11px] text-[#66605B] block">
                      Conversion-anchored seasonal drop, discount, or menu offer
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setPromoCreativesCount(Math.max(0, promoCreativesCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Decrease promo creatives"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-[#141312]">
                      {promoCreativesCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPromoCreativesCount(promoCreativesCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Increase promo creatives"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* 4. Short-Form Visual Asset */}
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between gap-4">
                  <div>
                    <span className="font-medium text-sm text-[#141312] block">
                      Short-form visual asset
                    </span>
                    <span className="text-[11px] text-[#66605B] block">
                      Vertical thumb-stopping reel cover or motion-ready hook frame
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShortFormAssetsCount(Math.max(0, shortFormAssetsCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Decrease short-form assets"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-[#141312]">
                      {shortFormAssetsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShortFormAssetsCount(shortFormAssetsCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#141312] flex items-center justify-center text-[#141312] transition-colors"
                      aria-label="Increase short-form assets"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* PRODUCTION HIGHLIGHTS (Exact brief requirements) */}
              <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-[#8F6F3A]/30 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#8F6F3A]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#8F6F3A] font-bold">
                    PRODUCTION HIGHLIGHTS
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-[#332F2B]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Curated art direction &amp; color grading</strong> — custom aesthetic tone suited to your brand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Exported in high-resolution ready for publish</strong> — full retina feed &amp; story assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Standard 3–4 business days delivery</strong> — meticulous layout execution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>1 round of revision</strong> — fine-tuning typography, crops, and copy placement</span>
                  </li>
                </ul>

                {/* Optional Speed / Revision Toggles */}
                <div className="pt-2 border-t border-[#8F6F3A]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#524C46]">
                    <input
                      type="checkbox"
                      checked={priorityTurnaround}
                      onChange={(e) => setPriorityTurnaround(e.target.checked)}
                      className="rounded text-[#8F6F3A] focus:ring-[#8F6F3A]"
                    />
                    <span>Priority 48-Hour Rush Delivery</span>
                  </label>

                  <div className="flex items-center gap-2 text-[#524C46]">
                    <span>Revision rounds:</span>
                    <button
                      type="button"
                      onClick={() => setExtraRevisions(Math.max(1, extraRevisions - 1))}
                      className="w-5 h-5 rounded bg-white border border-[#E5E0D8] text-[10px] flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-xs">{extraRevisions}</span>
                    <button
                      type="button"
                      onClick={() => setExtraRevisions(extraRevisions + 1)}
                      className="w-5 h-5 rounded bg-white border border-[#E5E0D8] text-[10px] flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Subtotal Bar */}
              <div className="p-4 rounded-xl bg-[#141312] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D4B98C] uppercase tracking-wider block">
                    ESTIMATED DELIVERABLES INVESTMENT
                  </span>
                  <span className="text-xs text-[#A7A19A]">
                    {socialPostsCount} posts • {storyFramesCount} stories • {promoCreativesCount} promo • {shortFormAssetsCount} short-form
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg sm:text-xl font-mono font-bold text-[#D4B98C]">
                    {formattedTotal()}
                  </span>
                  <span className="block text-[10px] text-[#A7A19A]">Quote estimate only</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Client Info, Personal Details & Submit (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 pb-4 border-b border-[#E5E0D8] mb-5">
                  <User size={18} className="text-[#8F6F3A]" />
                  <h3 className="font-editorial text-xl font-bold text-[#141312]">
                    2. Personal Details &amp; Specifics
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-sans font-semibold text-[#141312] block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans font-semibold text-[#141312] block mb-1">
                      Brand / Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Élan Atelier"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans font-semibold text-[#141312] block mb-1">
                      Email Address * (We will reply here)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maya@elan.com"
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans font-semibold text-[#141312] block mb-1">
                      Business Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                    >
                      <option value="Beauty & Cosmetics">Beauty, Skincare &amp; Cosmetics</option>
                      <option value="Fashion & Apparel">Fashion, Apparel &amp; Handloom Sarees</option>
                      <option value="Hospitality & F&B">Boutique Cafe, Brunch &amp; Dining</option>
                      <option value="Luxury Lifestyle">Luxury Lifestyle &amp; Home Decor</option>
                      <option value="Other">Other Category</option>
                    </select>
                  </div>

                  {/* Personal Details & Specific Needs Field */}
                  <div>
                    <label className="text-xs font-sans font-semibold text-[#141312] block mb-1">
                      Personal Details &amp; Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={specificDetails}
                      onChange={(e) => setSpecificDetails(e.target.value)}
                      placeholder="Tell us anything specific you want: color palette preferences, launch deadlines, Instagram handle, references, or special requests..."
                      className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3.5 py-2.5 text-xs text-[#141312] focus:border-[#141312] focus:outline-hidden transition-all"
                    />
                    <span className="text-[10px] text-[#8C827A] mt-1 block">
                      This information is transmitted directly and privately only to the studio deployer.
                    </span>
                  </div>

                  {/* Zero Obligation Notice */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-[11px] text-[#524C46] flex items-start gap-2">
                    <Info size={14} className="text-[#8F6F3A] shrink-0 mt-0.5" />
                    <span>
                      Submitting does <strong>not</strong> require upfront payment. You will receive a direct reply from our director within 24 hours.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#141312] hover:bg-[#2C2825] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send size={14} className="text-[#D4B98C]" />
                    <span>{isSubmitting ? 'Transmitting Brief...' : 'Send Enquiry to ArkAja Studio'}</span>
                  </button>
                </form>
              </div>

              {/* Direct Gmail fallback reminder */}
              <div className="pt-4 border-t border-[#E5E0D8] text-center">
                <span className="text-xs text-[#8C827A] block mb-1">Prefer instant email?</span>
                <a
                  href={`mailto:arkajastudio@gmail.com?subject=ArkAja%20Studio%20Enquiry%20from%20${encodeURIComponent(name || 'Client')}&body=Hi%20ArkAja%20Studio,%0D%0A%0D%0AI%20am%20enquiring%20about%20creative%20services%20for%20${encodeURIComponent(businessName || 'my brand')}.%0D%0A%0D%0ARequested%20Scope:%0D%0A-%20${socialPostsCount}%20Social%20Posts%0D%0A-%20${storyFramesCount}%20Story%20Frames%0D%0A-%20${promoCreativesCount}%20Promo%20Creatives%0D%0A-%20${shortFormAssetsCount}%20Short-Form%20Visual%20Assets%0D%0A%0D%0APersonal%20Details:%20${encodeURIComponent(specificDetails)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#8F6F3A] hover:underline"
                >
                  <Mail size={13} />
                  <span>Click to email directly: arkajastudio@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-xs font-mono text-[#8F6F3A] uppercase tracking-widest font-bold block">
                ENQUIRY RECEIVED • REFERENCE ID: {submittedEnquiryId}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#141312] mt-1">
                Thank You, {name}
              </h3>
              <p className="text-sm text-[#66605B] mt-2 leading-relaxed">
                Your customized deliverables enquiry for <strong>{businessName}</strong> has been transmitted directly to the studio director.
              </p>
            </div>

            {/* Scope Summary Card */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8C827A]">Custom Scope:</span>
                <span className="font-semibold text-[#141312]">
                  {socialPostsCount} posts, {storyFramesCount} stories, {promoCreativesCount} promo, {shortFormAssetsCount} short-form
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C827A]">Estimated Quote:</span>
                <span className="font-mono font-bold text-[#8F6F3A]">{formattedTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C827A]">Client Contact:</span>
                <span className="text-[#141312]">{email}</span>
              </div>
              {specificDetails && (
                <div className="pt-2 border-t border-[#E5E0D8]">
                  <span className="text-[#8C827A] block mb-1">Personal Specific Details:</span>
                  <p className="text-[#332F2B] italic bg-white p-2 rounded border border-[#E5E0D8]/60">
                    "{specificDetails}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`mailto:arkajastudio@gmail.com?subject=ArkAja%20Studio%20Enquiry%20Ref%20${submittedEnquiryId}&body=Hi%20ArkAja%20Studio,%0D%0A%0D%0AI%20submitted%20an%20enquiry%20for%20${encodeURIComponent(businessName)}.%0D%0AReference%20ID:%20${submittedEnquiryId}%0D%0AScope:%20${socialPostsCount}%20posts,%20${storyFramesCount}%20stories,%20${promoCreativesCount}%20promo,%20${shortFormAssetsCount}%20assets.%0D%0ANotes:%20${encodeURIComponent(specificDetails)}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#8F6F3A] hover:bg-[#A38045] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Mail size={13} />
                <span>Send Copy to arkajastudio@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedEnquiryId(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E5E0D8] hover:bg-[#FAF8F5] text-[#141312] text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Create Another Enquiry
              </button>
            </div>
          </div>
        )}

        {/* AI-GENERATED HELP CENTRE (Grounded & Interactive) */}
        <div className="pt-8">
          <AiHelpCentre />
        </div>
      </div>
    </section>
  );
};
