'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNomadScore } from '@/utils/scoring';

export default function ContactDrawer({ isOpen, onClose, condo }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [nomadPriority, setNomadPriority] = useState('balanced');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', tourDate: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // June 2026 calendar data (June 1 is a Monday)
  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const calendarOffset = 1; // 1 empty slot for Sunday offset (June 1 starts on Monday)

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    if (!formData.tourDate) {
      newErrors.tourDate = 'Please select a tour date';
    }
    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectDate = (day) => {
    const dateStr = `June ${day}, 2026`;
    setFormData(prev => ({ ...prev, tourDate: dateStr }));
    if (errors.tourDate) {
      setErrors(prev => ({ ...prev, tourDate: '' }));
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      // Trigger a custom event for the Toast system
      const event = new CustomEvent('show-toast', {
        detail: { message: `Tour requested successfully for ${formData.tourDate}!`, type: 'success' }
      });
      window.dispatchEvent(event);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '', tourDate: '' });
        setActiveTab('overview');
        onClose();
      }, 2500);
    }
  };

  const handleClose = () => {
    setErrors({});
    setSubmitted(false);
    setActiveTab('overview');
    onClose();
  };

  const specItems = [
    { label: '📐 Area', value: condo?.area || '120 SQM' },
    { label: '🛏️ Bedrooms', value: `${condo?.beds || 3} Bed` },
    { label: '🛁 Bathrooms', value: `${condo?.baths || 2} Bath` },
    { label: '⚡ Wifi Speed', value: `${condo?.wifiSpeed || 350} Mbps` },
    { label: '🌉 CCLEX Dist.', value: condo?.cclexDist || '5 min' },
    { label: '🏖️ Beach Dist.', value: condo?.beachDist || '8 min' },
  ];

  const landmarks = [
    { name: 'CCLEX Bridge', dist: condo?.cclexDist || '5m', cat: 'Infrastructure' },
    { name: 'Mactan Beach', dist: condo?.beachDist || '8m', cat: 'Leisure' },
    { name: 'Mactan Airport', dist: '12m', cat: 'Transport' },
    { name: 'SM Seaside Mall', dist: '15m', cat: 'Shopping' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-[#0c0c0c] border-l border-neutral-200 dark:border-neutral-900 z-[101] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-[#0f0f0f]/50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                CONCIERGE PORTFOLIO // UNIT {condo?.id ? `0${condo.id}` : 'XX'}
              </span>
              <button
                onClick={handleClose}
                className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors text-xl font-light cursor-pointer p-1"
                aria-label="Close details"
              >
                &times;
              </button>
            </div>

            {/* Content Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
              {/* Cover Image */}
              <div className="relative w-full aspect-video md:aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-900">
                {condo?.images && condo.images.length > 0 ? (
                  <img
                    src={condo.images[0]}
                    alt={condo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 font-mono text-[10px] text-neutral-400">
                    NO SCHEMATIC PREVIEW AVAILABLE
                  </div>
                )}
                {condo?.tag && (
                  <div className="absolute top-4 left-4 bg-black/80 dark:bg-white/90 text-white dark:text-black text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 backdrop-blur">
                    {condo.tag.split('').join(' ')}
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur text-white px-4 py-2 font-serif text-lg font-bold">
                  {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(condo?.price || 0)}
                </div>
              </div>

              {/* Title & Street */}
              <div className="p-6 md:p-8 pb-4">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-black dark:text-white leading-tight font-serif">
                  {condo?.title || "Property Title"}
                </h2>
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] font-mono mt-2">
                  📍 {condo?.street || "Street Location"}
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="px-6 md:px-8 border-b border-neutral-200 dark:border-neutral-900 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'highlights', label: 'Specs & Location' },
                  { id: 'nomad', label: 'Nomad Score' },
                  { id: 'book', label: 'Book Tour / Contact' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`pb-2 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                      activeTab === t.id
                        ? 'border-black text-black dark:border-white dark:text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Panels */}
              <div className="p-6 md:p-8">
                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                      This meticulously curated residence represents the pinnacle of modern luxury living in Cebu Lapu-Lapu. Designed with clean brutalist lines, minimalist open-concept layouts, and tailored precisely for remote professionals and expats.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {specItems.map((spec, i) => (
                        <div 
                          key={i} 
                          className="border border-neutral-200/60 dark:border-neutral-800/80 p-4 bg-neutral-50/30 dark:bg-neutral-900/10 flex flex-col justify-center"
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
                            {spec.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-black dark:text-white">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. HIGHLIGHTS & LOCATION */}
                {activeTab === 'highlights' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                        NEIGHBORHOOD PROXIMITY //
                      </h4>
                      <div className="space-y-3">
                        {landmarks.map((l, i) => (
                          <div 
                            key={i} 
                            className="flex justify-between items-center py-2.5 border-b border-neutral-100 dark:border-neutral-900"
                          >
                            <div>
                              <div className="text-xs font-bold text-black dark:text-white uppercase tracking-wide">{l.name}</div>
                              <div className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 mt-0.5">{l.cat}</div>
                            </div>
                            <span className="text-[10px] font-mono font-bold bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white px-2.5 py-1">
                              {l.dist}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                        UNIT FEATURES & SERVICES //
                      </h4>
                      <ul className="text-xs text-neutral-500 dark:text-neutral-400 space-y-2 list-disc pl-4 leading-relaxed font-sans">
                        <li>High-speed fiber-optic network pre-installed</li>
                        <li>Dedicated indoor parking space with 24/7 security</li>
                        <li>Access to premium common amenities (sky pool, fitness center, sky lounge)</li>
                        <li>Responsive concierge and owner support via WhatsApp</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* 3. NOMAD SUITABILITY DASHBOARD */}
                {activeTab === 'nomad' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Dial and Metric Header */}
                    <div className="flex items-center gap-6 p-4 border border-neutral-200 dark:border-neutral-900 bg-neutral-50/30 dark:bg-neutral-950/10">
                      {/* SVG Score Circle */}
                      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          {/* Background Circle */}
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            className="stroke-neutral-200 dark:stroke-neutral-800"
                            strokeWidth="5"
                            fill="transparent"
                          />
                          {/* Foreground Progress */}
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="32"
                            className="stroke-[#22c55e] dark:stroke-[#25D366]"
                            strokeWidth="5"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 32}
                            initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 32 - (calculateNomadScore(condo, nomadPriority).total / 10) * (2 * Math.PI * 32) }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-lg font-bold font-mono text-black dark:text-white leading-none">
                            {calculateNomadScore(condo, nomadPriority).total.toFixed(1)}
                          </span>
                          <span className="text-[6px] font-bold text-neutral-400 dark:text-neutral-500 uppercase mt-0.5 tracking-wider">
                            index
                          </span>
                        </div>
                      </div>

                      {/* Header Text & Badge */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          {calculateNomadScore(condo, nomadPriority).total >= 9.0 ? (
                            <span className="text-[7px] font-extrabold uppercase tracking-widest px-2 py-0.5 border border-green-500/20 text-green-600 dark:text-[#25D366] bg-green-500/10 dark:bg-green-500/20 rounded-sm">
                              Elite Workspace
                            </span>
                          ) : calculateNomadScore(condo, nomadPriority).total >= 8.0 ? (
                            <span className="text-[7px] font-extrabold uppercase tracking-widest px-2 py-0.5 border border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 rounded-sm">
                              Strong Choice
                            </span>
                          ) : (
                            <span className="text-[7px] font-extrabold uppercase tracking-widest px-2 py-0.5 border border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 rounded-sm">
                              Suitable Stay
                            </span>
                          )}
                        </div>
                        <h4 className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider font-mono">
                          EXPAT SUITABILITY INDEX
                        </h4>
                        <p className="text-[9px] text-neutral-400 dark:text-neutral-500 leading-normal">
                          Calculated dynamically using localized travel times, fiber telemetry, and custom weights.
                        </p>
                      </div>
                    </div>

                    {/* Interactive Priority Toggle */}
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                        SELECT YOUR PRIORITY PROFILE //
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'balanced', label: 'Balanced', desc: 'Equal factor weights' },
                          { id: 'connectivity', label: 'Connectivity', desc: 'Prioritize fiber speed' },
                          { id: 'leisure', label: 'Leisure Access', desc: 'Prioritize beach distance' },
                          { id: 'focus', label: 'Quiet Focus', desc: 'Prioritize peace & quiet' }
                        ].map((p) => {
                          const isActive = nomadPriority === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setNomadPriority(p.id)}
                              className={`p-2.5 text-left border rounded-none transition-all duration-300 cursor-pointer ${
                                isActive
                                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm scale-[1.01]'
                                  : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-black dark:bg-[#111] dark:border-neutral-900 dark:text-neutral-400 dark:hover:border-white'
                              }`}
                            >
                              <div className="text-[9px] font-bold uppercase tracking-wider leading-none">
                                {p.label}
                              </div>
                              <div className="text-[7px] opacity-75 mt-1 leading-normal line-clamp-1">
                                {p.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Score Breakdown (HUD progress lines) */}
                    <div className="space-y-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                      <h5 className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                        SCORE BREAKDOWN //
                      </h5>
                      
                      <div className="space-y-3">
                        {/* WiFi & Connectivity */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider font-mono">
                              ⚡ connectivity ({condo?.wifiSpeed || 100} mbps)
                            </span>
                            <span className="text-[9px] font-mono font-bold text-black dark:text-white">
                              {calculateNomadScore(condo, nomadPriority).wifi.toFixed(1)}/10
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                            <motion.div
                              className="h-full bg-green-500 dark:bg-[#25D366]"
                              initial={{ width: 0 }}
                              animate={{ width: `${calculateNomadScore(condo, nomadPriority).wifi * 10}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Proximity to Beach */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider font-mono">
                              🏖️ beach proximity ({condo?.beachDist || '15m'})
                            </span>
                            <span className="text-[9px] font-mono font-bold text-black dark:text-white">
                              {calculateNomadScore(condo, nomadPriority).beach.toFixed(1)}/10
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                            <motion.div
                              className="h-full bg-blue-500 dark:bg-blue-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${calculateNomadScore(condo, nomadPriority).beach * 10}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Proximity to City Centre / CCLEX */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider font-mono">
                              🌉 city access via cclex ({condo?.cclexDist || '12m'})
                            </span>
                            <span className="text-[9px] font-mono font-bold text-black dark:text-white">
                              {calculateNomadScore(condo, nomadPriority).cclex.toFixed(1)}/10
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                            <motion.div
                              className="h-full bg-amber-500 dark:bg-amber-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${calculateNomadScore(condo, nomadPriority).cclex * 10}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Quiet & Environment */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold text-black dark:text-white uppercase tracking-wider font-mono">
                              🤫 quiet focus index
                            </span>
                            <span className="text-[9px] font-mono font-bold text-black dark:text-white">
                              {calculateNomadScore(condo, nomadPriority).quiet.toFixed(1)}/10
                            </span>
                          </div>
                          <div className="h-1 w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                            <motion.div
                              className="h-full bg-purple-500 dark:bg-purple-400"
                              initial={{ width: 0 }}
                              animate={{ width: `${calculateNomadScore(condo, nomadPriority).quiet * 10}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expat verdict summary card */}
                    <div className="border border-neutral-200 dark:border-neutral-900 p-4 bg-neutral-50/50 dark:bg-[#0c0c0c]/30 space-y-1.5 rounded-sm">
                      <div className="text-[8px] uppercase font-bold tracking-widest text-neutral-400 font-mono">
                        CONCIERGE VERDICT //
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {nomadPriority === 'connectivity' && (
                          `Featuring ultra-fast fiber connectivity clocking in at ${condo?.wifiSpeed || 100} Mbps, this unit is exceptionally suited for virtual workspace collaboration, video production, and high-frequency traders requiring zero-latency connections.`
                        )}
                        {nomadPriority === 'leisure' && (
                          `With Mactan beaches situated just ${condo?.beachDist || '8m'} from your doorstep, this property scores a stellar ${calculateNomadScore(condo, nomadPriority).beach}/10 for water recreation, offering expats a premium work-life balance.`
                        )}
                        {nomadPriority === 'focus' && (
                          `Constructed with architectural height and noise mitigation in mind, this specific layout scores a premium ${calculateNomadScore(condo, nomadPriority).quiet}/10 on the focus index, allowing you to run long quiet work blocks without neighborhood disturbance.`
                        )}
                        {nomadPriority === 'balanced' && (
                          `An exceptional hybrid retreat. Located exactly ${condo?.cclexDist || '5m'} from the high-speed CCLEX Bridge, it couples direct metro Cebu reachability with fast ${condo?.wifiSpeed || 100} Mbps connectivity and brief coastal beach access.`
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 4. BOOK TOUR & DIRECT CONTACT */}
                {activeTab === 'book' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Direct Contact Links */}
                    <div className="border border-neutral-200 dark:border-neutral-900 p-5 bg-neutral-50/50 dark:bg-[#0e0e0e]/50">
                      <div className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 font-mono">
                        DIRECT CONCIERGE CHANNELS //
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-black text-white dark:bg-white dark:text-black rounded-full shrink-0 flex items-center justify-center text-[10px] font-mono font-black">
                          SQ
                        </div>
                        <div>
                          <div className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">Sheena Q.</div>
                          <div className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">Property Manager</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <a
                          href={`https://wa.me/639171234567?text=Hi%20Sheena,%20I'm%20interested%20in%20${encodeURIComponent(condo?.title || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                          WhatsApp
                        </a>
                        <a
                          href={`mailto:owner@sqcondounits.com?subject=Inquiry:%20${encodeURIComponent(condo?.title || '')}`}
                          className="py-3 bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>

                    {/* Booking Form */}
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-10 text-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-black dark:text-white font-mono">REQUEST SUBMITTED</p>
                        <p className="text-xs text-neutral-500 mt-2">Sheena Q. will contact you shortly.</p>
                      </motion.div>
                    ) : (
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                            SELECT TOUR DATE (JUNE 2026) //
                          </h4>
                          
                          {/* Inline Minimal Calendar */}
                          <div className="border border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50/20 dark:bg-black/20">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white mb-3 text-center">
                              June 2026
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                              {['S','M','T','W','T','F','S'].map((d, i) => (
                                <span key={i} className="text-[8px] font-bold text-neutral-400">{d}</span>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {/* Offset slots */}
                              {Array.from({ length: calendarOffset }).map((_, i) => (
                                <div key={`offset-${i}`} />
                              ))}
                              {juneDays.map((day) => {
                                const dateStr = `June ${day}, 2026`;
                                const isSelected = formData.tourDate === dateStr;
                                return (
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => selectDate(day)}
                                    className={`w-7 h-7 rounded-none flex items-center justify-center text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-black text-white dark:bg-white dark:text-black font-extrabold scale-110'
                                        : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                                    }`}
                                  >
                                    {day}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          {formData.tourDate && (
                            <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono text-center">
                              Selected Date: {formData.tourDate}
                            </div>
                          )}
                          {errors.tourDate && (
                            <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">
                              {errors.tourDate}
                            </p>
                          )}
                        </div>

                        {/* Guest Details */}
                        <div className="space-y-4 pt-2">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                            YOUR INFORMATION //
                          </h4>

                          {/* Full Name */}
                          <div>
                            <input
                              type="text"
                              placeholder="Full Name"
                              value={formData.name}
                              onChange={(e) => handleFieldChange('name', e.target.value)}
                              className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'} pb-2 text-xs text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors`}
                            />
                            {errors.name && (
                              <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1.5">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          {/* Email Address */}
                          <div>
                            <input
                              type="email"
                              placeholder="Email Address"
                              value={formData.email}
                              onChange={(e) => handleFieldChange('email', e.target.value)}
                              className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'} pb-2 text-xs text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors`}
                            />
                            {errors.email && (
                              <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1.5">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          {/* Notes/Message */}
                          <div>
                            <textarea
                              placeholder="Any special notes or requirements?"
                              rows="3"
                              value={formData.message}
                              onChange={(e) => handleFieldChange('message', e.target.value)}
                              className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'} pb-2 text-xs text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none`}
                            ></textarea>
                            {errors.message && (
                              <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1.5">
                                {errors.message}
                              </p>
                            )}
                          </div>

                          <button 
                            type="submit" 
                            className="w-full py-4 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest hover:opacity-85 transition-opacity cursor-pointer font-mono"
                          >
                            SUBMIT CONCIERGE REQUEST
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
