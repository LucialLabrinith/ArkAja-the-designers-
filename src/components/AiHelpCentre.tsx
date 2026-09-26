import React, { useState } from 'react';
import { Sparkles, HelpCircle, Send, MessageSquare, ChevronDown, ChevronUp, Mail, Copy, Check } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const PRESET_FAQS: FaqItem[] = [
  {
    category: 'Deliverables & Custom Numbers',
    question: 'Can I customize the exact number of posts, stories, and reels in my parcel?',
    answer: 'Yes! On our Enquiry page, you can freely adjust the numbers for high-impact social posts, editorial story frames, promotional creatives, and short-form visual assets to match your exact campaign scope.'
  },
  {
    category: 'Turnaround & Revisions',
    question: 'What is the standard production timeline and revision policy?',
    answer: 'Standard delivery is 3–4 business days with curated art direction, color grading, and high-resolution publish-ready exports. Every project includes 1 comprehensive round of revisions, with expedited 48-hour delivery available on request.'
  },
  {
    category: 'Payment & Enquiry',
    question: 'Do I need to pay or enter payment details to submit an enquiry?',
    answer: 'No. Submitting an enquiry is 100% free with zero payment required upfront. The studio director personally reviews your brief and replies via email (arkajastudio@gmail.com) with exact timeline and proposal details.'
  },
  {
    category: 'Direct Communication',
    question: 'How do I speak directly with the ArkAja Studio director?',
    answer: 'You can email us directly at arkajastudio@gmail.com anytime. We review all incoming project briefs within 24 hours and can jump into a dedicated creative alignment session.'
  }
];

export const AiHelpCentre: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Welcome to the ArkAja Studio AI Help Centre. Ask me anything about our deliverables, customized parcel options, turnaround times, or creative direction.'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleAsk = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/help/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply || "Our team is available at arkajastudio@gmail.com to help with any custom questions."
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "ArkAja Studio provides bespoke editorial campaigns, social posts, story frames, and launch creatives. Contact us directly at arkajastudio@gmail.com."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('arkajastudio@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className={`rounded-2xl border border-[#E5E0D8] bg-white p-6 sm:p-8 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E0D8] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8F6F3A]/10 border border-[#8F6F3A]/30 flex items-center justify-center text-[#8F6F3A]">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F6F3A] font-bold">
                INTELLIGENT KNOWLEDGE BASE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[10px] font-mono">
                AI Help Centre
              </span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#141312]">
              ArkAja Studio Help &amp; FAQs
            </h3>
          </div>
        </div>

        {/* Studio Direct Email Badge */}
        <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-2 rounded-xl text-xs">
          <Mail size={14} className="text-[#8F6F3A]" />
          <a
            href="mailto:arkajastudio@gmail.com?subject=ArkAja%20Studio%20-%20Creative%20Inquiry"
            className="font-mono text-[#141312] font-semibold hover:text-[#8F6F3A] transition-colors"
            title="Click to email arkajastudio@gmail.com"
          >
            arkajastudio@gmail.com
          </a>
          <button
            onClick={copyEmail}
            className="ml-1 p-1 hover:bg-[#EAE5DC] rounded transition-colors text-[#66605B]"
            title="Copy email address"
          >
            {copiedEmail ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
          </button>
        </div>
      </div>

      {/* Preset Common Topics / Accordion */}
      <div className="py-6 border-b border-[#E5E0D8]">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#66605B] font-bold mb-3 flex items-center gap-1.5">
          <HelpCircle size={14} className="text-[#8F6F3A]" />
          <span>Frequently Answered Studio Questions</span>
        </h4>

        <div className="space-y-2.5">
          {PRESET_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5E0D8] rounded-xl overflow-hidden bg-[#FAF9F6] transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-white transition-colors"
                >
                  <span className="text-xs font-medium text-[#141312] font-sans">
                    {faq.question}
                  </span>
                  {isOpen ? <ChevronUp size={15} className="text-[#8F6F3A] shrink-0" /> : <ChevronDown size={15} className="text-[#8C827A] shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 text-xs text-[#524C46] leading-relaxed border-t border-[#E5E0D8]/60 bg-white pt-2.5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive AI Chat Assistant */}
      <div className="pt-6">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#66605B] font-bold mb-3 flex items-center gap-1.5">
          <MessageSquare size={14} className="text-[#8F6F3A]" />
          <span>Ask Our Studio AI Any Specific Question</span>
        </h4>

        {/* Chat message display */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4 bg-[#FAF9F6] p-4 rounded-xl border border-[#E5E0D8]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-[#8F6F3A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={11} />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#141312] text-white'
                    : 'bg-white border border-[#E5E0D8] text-[#332F2B]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#8C827A] pl-8">
              <div className="w-3.5 h-3.5 border-2 border-[#8F6F3A] border-t-transparent rounded-full animate-spin" />
              <span>Studio AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            'Can I order just vertical reel covers?',
            'What resolution do you export assets in?',
            'How fast can you deliver rush assets?'
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(chip)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#8F6F3A] text-[#66605B] hover:text-[#141312] transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question about ArkAja Studio services..."
            className="flex-1 bg-white border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#141312] placeholder-[#8C827A] focus:outline-hidden focus:border-[#8F6F3A] transition-all"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-[#8F6F3A] hover:bg-[#A38045] disabled:opacity-50 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>Ask</span>
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
};
