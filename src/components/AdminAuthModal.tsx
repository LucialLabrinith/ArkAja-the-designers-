import React, { useState, useEffect } from 'react';
import { Lock, Key, X, CheckCircle2, AlertCircle, Upload, Inbox, RefreshCw, Mail, Calendar, DollarSign } from 'lucide-react';
import { useImageStorage } from '../context/ImageStorageContext';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSlotId?: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  targetSlotId
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'posters' | 'enquiries'>('posters');
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  const { customImages, setImageForSlot, removeImageForSlot, clearAllCustomImages, setMultipleImages } = useImageStorage();

  const allSlots = PORTFOLIO_PROJECTS.flatMap((p) =>
    p.items.map((item) => ({
      ...item,
      projectName: p.name,
      category: p.category
    }))
  );

  // Check if session has previously authorized
  useEffect(() => {
    if (sessionStorage.getItem('arkaja_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'jamessu') {
      setIsAuthenticated(true);
      setError('');
      sessionStorage.setItem('arkaja_admin_auth', 'true');
      fetchEnquiries();
    } else {
      setError('Incorrect studio password. Access is restricted to studio admin only.');
    }
  };

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch('/api/enquiries', {
        headers: { 'x-admin-password': 'jamessu' }
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      } else {
        // Fallback to localStorage if server route not reached
        const local = localStorage.getItem('arkaja_client_enquiries');
        if (local) setEnquiries(JSON.parse(local));
      }
    } catch {
      const local = localStorage.getItem('arkaja_client_enquiries');
      if (local) setEnquiries(JSON.parse(local));
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleSingleUpload = async (slotId: string, file: File) => {
    setIsProcessingUpload(true);
    try {
      await setImageForSlot(slotId, file, 'jamessu');
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleBatchUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessingUpload(true);
    try {
      const fileArray = Array.from(files);
      const batch: Record<string, File> = {};
      fileArray.forEach((file, index) => {
        if (index < allSlots.length) {
          batch[allSlots[index].id] = file;
        }
      });
      await setMultipleImages(batch, 'jamessu');
    } finally {
      setIsProcessingUpload(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#141312] border border-[#2E2A25] rounded-2xl shadow-2xl text-[#FAF7F2] p-6 sm:p-8 my-8 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#2E2A25]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4B98C]/15 border border-[#D4B98C]/30 flex items-center justify-center text-[#D4B98C]">
              <Lock size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4B98C] font-semibold">
                  PRIVATE STUDIO PORTAL
                </span>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                    <CheckCircle2 size={10} /> Authenticated
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-white">
                ArkAja Studio Administration
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A7A19A] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. PASSWORD AUTH SCREEN */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="py-12 max-w-md mx-auto text-center w-full">
            <div className="w-16 h-16 rounded-full bg-[#1F1C19] border border-[#3A342E] flex items-center justify-center mx-auto mb-5 text-[#D4B98C]">
              <Key size={26} />
            </div>
            <h3 className="text-xl font-editorial font-bold text-white mb-2">
              Studio Owner Authorization
            </h3>
            <p className="text-xs text-[#A7A19A] font-sans mb-6">
              Enter your secret password to manage client enquiries and upload campaign artwork.
            </p>

            <div className="relative mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter studio password..."
                className="w-full bg-[#1C1A18] border border-[#3A342E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#66605B] focus:outline-hidden focus:border-[#D4B98C] transition-all text-center tracking-widest font-mono"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 mb-4 font-sans">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#D4B98C] hover:bg-[#E5CCA0] text-[#141312] font-semibold text-xs tracking-widest uppercase rounded-xl transition-all shadow-md"
            >
              Authorize &amp; Unlock Studio
            </button>
          </form>
        ) : (
          /* 2. AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden pt-4">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#2E2A25] pb-3 mb-4">
              <button
                onClick={() => setActiveTab('posters')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === 'posters'
                    ? 'bg-[#D4B98C] text-[#141312]'
                    : 'text-[#A7A19A] hover:text-white bg-white/5'
                }`}
              >
                <Upload size={14} />
                <span>Manage 11 Posters ({Object.keys(customImages).length}/11)</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('enquiries');
                  fetchEnquiries();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === 'enquiries'
                    ? 'bg-[#D4B98C] text-[#141312]'
                    : 'text-[#A7A19A] hover:text-white bg-white/5'
                }`}
              >
                <Inbox size={14} />
                <span>Client Enquiries ({enquiries.length})</span>
              </button>
            </div>

            {/* TAB A: POSTER MANAGER */}
            {activeTab === 'posters' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Batch Upload Bar */}
                <div className="p-4 rounded-xl bg-[#1C1A18] border border-[#3A342E] flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 shrink-0">
                  <div>
                    <p className="text-sm font-semibold text-white">Batch Upload Finished Posters</p>
                    <p className="text-xs text-[#A7A19A]">
                      Select all 11 files together to auto-fill every slot sequentially.
                    </p>
                  </div>
                  <label className="cursor-pointer px-4 py-2 bg-[#D4B98C] hover:bg-[#E5CCA0] text-[#141312] font-semibold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center gap-2 shrink-0">
                    <Upload size={14} />
                    <span>Select Files</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleBatchUpload(e.target.files)}
                    />
                  </label>
                </div>

                {/* 11 Slots Grid */}
                <div className="flex-1 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {allSlots.map((slot, idx) => {
                      const currentImage = customImages[slot.id];
                      return (
                        <div
                          key={slot.id}
                          className={`p-3 rounded-xl border flex flex-col justify-between ${
                            currentImage
                              ? 'bg-[#181614] border-[#D4B98C]/40'
                              : 'bg-[#141312] border-[#2E2A25]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#D4B98C] mb-1.5">
                            <span>SLOT {idx + 1} • {slot.projectName}</span>
                            {currentImage && (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 size={10} /> Active
                              </span>
                            )}
                          </div>

                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/60 border border-white/5 mb-2 relative flex items-center justify-center">
                            {currentImage ? (
                              <img
                                src={currentImage}
                                alt={slot.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[10px] text-[#66605B] font-mono text-center p-2">
                                No image assigned
                              </span>
                            )}
                          </div>

                          <div>
                            <p className="text-xs font-serif font-medium text-white line-clamp-1">{slot.title}</p>
                            <p className="text-[10px] text-[#A7A19A] line-clamp-1 mb-2">{slot.headline || slot.type}</p>

                            <div className="flex items-center gap-2">
                              <label className="flex-1 cursor-pointer py-1 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-mono text-center transition-colors flex items-center justify-center gap-1.5">
                                <Upload size={11} />
                                <span>{currentImage ? 'Replace' : 'Upload'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleSingleUpload(slot.id, file);
                                  }}
                                />
                              </label>
                              {currentImage && (
                                <button
                                  onClick={() => removeImageForSlot(slot.id)}
                                  className="p-1 text-[#A7A19A] hover:text-rose-400 bg-white/5 hover:bg-white/10 rounded transition-colors text-xs"
                                  title="Delete image"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-[#2E2A25] flex items-center justify-between text-xs">
                  <button
                    onClick={clearAllCustomImages}
                    className="text-[#A7A19A] hover:text-rose-400 transition-colors"
                  >
                    Clear All Uploaded Images
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-[#D4B98C] text-[#141312] font-semibold uppercase tracking-wider rounded-lg"
                  >
                    Save &amp; View Site
                  </button>
                </div>
              </div>
            )}

            {/* TAB B: CLIENT ENQUIRIES INBOX */}
            {activeTab === 'enquiries' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#A7A19A]">
                    Actual consultation enquiries submitted by potential clients.
                  </span>
                  <button
                    onClick={fetchEnquiries}
                    className="flex items-center gap-1 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md text-xs text-[#D4B98C] transition-colors"
                  >
                    <RefreshCw size={12} className={loadingEnquiries ? 'animate-spin' : ''} />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {enquiries.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-[#2E2A25] rounded-xl">
                      <Inbox size={28} className="mx-auto text-[#66605B] mb-2" />
                      <p className="text-sm font-medium text-white">No enquiries received yet.</p>
                      <p className="text-xs text-[#A7A19A] mt-1 max-w-sm mx-auto">
                        When clients submit project briefs or custom parcel requests, they will appear here in full detail.
                      </p>
                    </div>
                  ) : (
                    enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4 rounded-xl bg-[#1C1A18] border border-[#2E2A25] text-xs font-sans space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-[#D4B98C] tracking-wider block">
                              {enq.packageId === 'CUSTOM' ? 'CUSTOM PARCEL ENQUIRY' : `${enq.packageId} PACKAGE ENQUIRY`}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-0.5">
                              {enq.name} · <span className="text-[#D4B98C]">{enq.businessName}</span>
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono text-[#8C827A]">
                            {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-y border-[#2E2A25] text-[#A7A19A]">
                          <div>
                            <span className="text-[10px] text-[#66605B] uppercase block">Client Email</span>
                            <a href={`mailto:${enq.email}`} className="text-white hover:underline flex items-center gap-1">
                              <Mail size={11} /> {enq.email}
                            </a>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#66605B] uppercase block">Category / Country</span>
                            <span className="text-white">{enq.businessCategory} ({enq.country})</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#66605B] uppercase block">Budget / Estimate</span>
                            <span className="text-[#D4B98C] font-semibold">{enq.budgetEstimate || 'Bespoke Quote'}</span>
                          </div>
                        </div>

                        {/* Selected Custom Parcel Items */}
                        {enq.customParcelItems && enq.customParcelItems.length > 0 && (
                          <div className="bg-[#141312] p-2.5 rounded-lg border border-[#2E2A25]">
                            <span className="text-[10px] font-mono text-[#D4B98C] uppercase tracking-wider block mb-1">
                              Selected Custom Parcel Deliverables ({enq.customParcelItems.length}):
                            </span>
                            <ul className="space-y-1">
                              {enq.customParcelItems.map((item: any, i: number) => (
                                <li key={i} className="flex items-center justify-between text-[11px] text-white/90">
                                  <span>• {item.title}</span>
                                  <span className="font-mono text-[#D4B98C]">{item.price}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {enq.details && (
                          <div>
                            <span className="text-[10px] text-[#66605B] uppercase block">Project Brief</span>
                            <p className="text-[#FAF7F2] bg-[#141312] p-2.5 rounded-lg border border-[#2E2A25] mt-1 whitespace-pre-wrap">
                              {enq.details}
                            </p>
                          </div>
                        )}

                        <div className="pt-1 flex items-center justify-end gap-2">
                          <a
                            href={`mailto:${enq.email}?subject=ArkAja Studio - Regarding your enquiry for ${enq.businessName}`}
                            className="px-3 py-1 bg-[#D4B98C] hover:bg-[#E5CCA0] text-[#141312] font-semibold text-[11px] rounded transition-colors"
                          >
                            Reply to Client
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
