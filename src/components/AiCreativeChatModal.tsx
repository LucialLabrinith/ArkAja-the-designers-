import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Sparkles, Copy, Check, ArrowRight, Bot, RefreshCw } from 'lucide-react';
import { ArkAjaMonogram } from './ArkAjaMonogram';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  polishedList?: string;
  timestamp: string;
}

interface AiCreativeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRequirementsToBooking?: (requirements: string, category?: string) => void;
}

const SYSTEM_INSTRUCTION = `
You are the Creative Director AI for ArkAja Studio — a high-end creative agency specializing in social content, campaign creatives, and promotional visuals with AI-assisted production and human-led art direction.
The studio's flagship work includes:
- LUMIÈRE (Skin • Hair • Beauty luxury editorial, signature Hydrafacials, package offer cards, POV transformation reels)
- NOIR & BEAN (Coffee • Brunch • Slow mornings, weekend brunch club promos, craving triggers, high-retention reel covers)
- ÉLAN (Contemporary womenswear, autumn collection drop, 3 ways to style one blazer carousels, 9-5 high-fashion reels)
- MUSE BEAUTY LONDON (British minimalist luxury skincare, curated 9-grid Instagram feeds)
- KANKATALA • SAREE COLLECTIONS ("Live Royal, Wear Royal." Handloom heritage meets high-fashion runway restraint)

Your goal:
1. Greet the user warmly, conversationally, and with genuine creative excitement.
2. Ask 1-2 thoughtful, focused questions to understand their brand:
   - What kind of brand or product they have (Beauty, Fashion, Café/Hospitality, Lifestyle, etc.)
   - Their core campaign goal (launching a new product, seasonal drop, weekend footfall, educational carousels, rebranding)
   - Their preferred aesthetic or tone
3. When the user shares enough info (or asks for a list), synthesize their requirements into a crisp, high-converting "POLISHED CREATIVE REQUIREMENTS" section formatted with clear bullet points:
   🎯 Campaign Objective
   🎨 Visual Tone & Aesthetic
   📸 Recommended Creative Asset Deliverables (e.g. 1x Hero Launch Post, 2x Reel Covers, 1x Educational Carousel)
   ✍️ Key Messaging & Hook Concept
   📦 Suggested ArkAja Package (Starter vs Signature)

Keep your tone warm, friendly, executive, concise, and non-generic. Never use robotic phrases like "As an AI model".
`;

export const AiCreativeChatModal: React.FC<AiCreativeChatModalProps> = ({
  isOpen,
  onClose,
  onApplyRequirementsToBooking
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm your ArkAja Creative Director assistant. Whether you have a clear vision or just a rough idea for your brand's social content, tell me a little about your brand and what you'd like to create! I'll talk it through with you and turn it into a polished, production-ready deliverable list.",
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (userTextToSend?: string) => {
    const text = (userTextToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || '';
      let replyText = '';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const conversationHistory = messages.map((m) => ({
          role: m.sender === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }]
        }));

        conversationHistory.push({
          role: 'user',
          parts: [{ text }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: conversationHistory,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            maxOutputTokens: 800
          }
        });

        replyText = response.text || '';
      }

      // Elegant contextual fallback if API key is not yet set or network is offline
      if (!replyText) {
        const lower = text.toLowerCase();
        if (lower.includes('skincare') || lower.includes('beauty') || lower.includes('serum') || lower.includes('salon')) {
          replyText = `That sounds wonderful! Skincare and clinical beauty thrive on high-credibility tactile minimalism paired with dewy, luminous before-and-after moments — very much in the spirit of our **LUMIÈRE** and **MUSE BEAUTY LONDON** suites.

Here is your **POLISHED CREATIVE REQUIREMENTS & DELIVERABLES**:
• 🎯 **Objective**: Build prestige social presence and drive high-conversion treatment bookings or product sales.
• 🎨 **Aesthetic**: Dewy luminescence, warm ivory (#FAF7F2), frosted glass and apothecary amber tones.
• 📸 **Creative Assets Required**:
  1. *Hero Editorial Launch Post* — High-fashion close-up showcasing skin texture & luxury packaging.
  2. *Editorial Treatment Offer ("The Glow Edit")* — Split model/product layout with pricing anchor & booking CTA.
  3. *Transformation Hook Reel Cover* — High-retention 9:16 split before/after hook.
  4. *Educational Skincare Carousel* — 3-step ritual breakdown.
• 📦 **Recommended Package**: ArkAja Signature Brand Suite (72h turnaround).`;
        } else if (lower.includes('coffee') || lower.includes('cafe') || lower.includes('café') || lower.includes('food') || lower.includes('brunch')) {
          replyText = `Specialty hospitality is all about sensory craving triggers and high-energy weekend habits, just like our **NOIR & BEAN** suite!

Here is your **POLISHED CREATIVE REQUIREMENTS & DELIVERABLES**:
• 🎯 **Objective**: Drive weekend morning footfall and transform casual passersby into daily afternoon ritual visitors.
• 🎨 **Aesthetic**: Rich espresso crema tones, warm sunlit stone surfaces, and clean typography with playful microcopy.
• 📸 **Creative Assets Required**:
  1. *Afternoon Sensory Craving Trigger* — Condensation iced latte shot for the 4 PM craving peak.
  2. *Saturday Brunch Club Promotional Creative* — Generous pastry & table spread with bundled offer pricing (e.g. ₹499 combo).
  3. *"Don't Blink" Reveal Motion Hook Cover* — Espresso pour into vanilla cloud foam.
• 📦 **Recommended Package**: ArkAja Starter or Signature Suite.`;
        } else if (lower.includes('fashion') || lower.includes('clothing') || lower.includes('dress') || lower.includes('blazer') || lower.includes('saree')) {
          replyText = `Modern apparel and ethnic wear demand authoritative styling education and aspirational runway restraint, similar to our **ÉLAN** and **SAREE EDIT** systems!

Here is your **POLISHED CREATIVE REQUIREMENTS & DELIVERABLES**:
• 🎯 **Objective**: Position the collection as elevated, versatile staples while providing actionable wardrobe styling value.
• 🎨 **Aesthetic**: Monochromatic architectural backdrop, Parisian street tailoring, and restrained serif typography.
• 📸 **Creative Assets Required**:
  1. *Collection Drop Campaign Poster* — Editorial European street scene with collection number and retail CTA.
  2. *Educational Styling Carousel ("3 Ways to Style One Blazer")* — 01 Office • 02 Dinner • 03 Weekend.
  3. *OOTD "Stop & Reveal" Reel Cover* — High-retention movement shot with bold aspirational copy.
• 📦 **Recommended Package**: ArkAja Signature Suite.`;
        } else {
          replyText = `I love this direction! Let's shape this into a compelling social creative system for your brand.

Here is your **POLISHED CREATIVE REQUIREMENTS & DELIVERABLES**:
• 🎯 **Objective**: Launch elevated promotional creatives that stop thumbs in feed and convert followers into engaged customers.
• 🎨 **Aesthetic**: Warm ivory, refined typography, and high-fidelity product photography with human-led art direction.
• 📸 **Creative Assets Required**:
  1. *Hero Brand Advertisement* — Aspirational signature visual for primary feed showcase.
  2. *High-Conversion Offer Creative* — Value proposition layout with clear call to action.
  3. *High-Retention Vertical Reel Cover* — Problem/solution or POV video hook.
• 📦 **Recommended Package**: ArkAja Signature Suite.

Would you like me to tweak any specific deliverable or apply this directly to your project booking?`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: replyText,
          timestamp: 'Just now'
        }
      ]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'ai',
          text: "I'd love to help you build this! Could you let me know your primary business category (Beauty, Fashion, Hospitality, or Lifestyle) so I can draft your exact creative deliverable checklist?",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const samplePrompts = [
    "I'm launching a luxury skincare line like Lumière",
    "We have an artisan coffee café needing weekend brunch footfall",
    "Contemporary womenswear label needing editorial carousels",
    "I need an Instagram 9-grid campaign like Muse Beauty London"
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="ArkAja Creative AI Consultation"
    >
      <div className="relative w-full max-w-2xl bg-[#F7F5EF] rounded-2xl border border-[#E5E0D8] shadow-2xl flex flex-col h-[85vh] max-h-[720px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8] bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#141312] text-[#D4B98C]">
              <ArkAjaMonogram size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg font-bold text-[#141312]">
                  Studio Creative AI
                </h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8F6F3A]/10 text-[#8F6F3A] text-[10px] font-mono font-semibold">
                  <Sparkles size={11} />
                  <span>CONSULTANT</span>
                </span>
              </div>
              <p className="text-xs text-[#66605B] font-sans">
                Friendly requirements discovery &amp; polished brief generator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-[#E5E0D8] hover:bg-[#FAF8F5] text-[#141312] transition-colors"
            aria-label="Close AI consultation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            const hasList = msg.text.includes('POLISHED CREATIVE REQUIREMENTS');

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-full bg-[#141312] text-[#D4B98C] flex items-center justify-center shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 leading-relaxed ${
                    isAi
                      ? 'bg-white border border-[#E5E0D8] text-[#141312] shadow-2xs'
                      : 'bg-[#141312] text-[#F7F5EF] shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Actions for Polished Requirements List */}
                  {hasList && onApplyRequirementsToBooking && (
                    <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          onApplyRequirementsToBooking(msg.text);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#141312] text-[#D4B98C] hover:bg-[#2C2825] text-xs font-semibold tracking-wider uppercase transition-colors"
                      >
                        <span>Apply to Booking Form</span>
                        <ArrowRight size={13} />
                      </button>

                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E5E0D8] bg-[#FAF8F5] text-[#66605B] hover:text-[#141312] text-xs font-medium transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={13} className="text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy List</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isAi ? 'text-[#8C827A]' : 'text-white/60'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-[#141312] text-[#D4B98C] flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-[#E5E0D8] rounded-2xl px-5 py-3 text-xs text-[#66605B] flex items-center gap-2 shadow-2xs">
                <RefreshCw size={13} className="animate-spin text-[#8F6F3A]" />
                <span>Crafting your creative recommendations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Quick Chips */}
        {messages.length <= 2 && (
          <div className="px-6 py-2 bg-[#F3EFEA] border-t border-[#E5E0D8] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-[#8C827A] font-semibold shrink-0">Try:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-white hover:bg-[#EAE5DC] text-[#141312] px-3 py-1 rounded-full border border-[#E5E0D8] whitespace-nowrap shrink-0 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E5E0D8]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tell me about your brand, product, or campaign idea..."
              className="flex-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#141312] placeholder-[#8C827A] focus:outline-hidden focus:border-[#141312] focus:ring-1 focus:ring-[#141312]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl bg-[#141312] hover:bg-[#2C2825] disabled:opacity-40 text-[#D4B98C] transition-all shrink-0"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
