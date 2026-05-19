'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactDrawer({ isOpen, onClose, condo }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on type
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const handleClose = () => {
    setErrors({});
    setSubmitted(false);
    onClose();
  };

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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#0c0c0c] border-l border-neutral-200 dark:border-neutral-900 z-[101] flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-black dark:border-neutral-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white font-mono">
                Concierge Services
              </span>
              <button
                onClick={handleClose}
                className="text-black dark:text-white hover:opacity-50 transition-opacity text-xl font-light cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <h2 className="text-3xl font-black uppercase text-black dark:text-white mb-2 leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                {condo?.title || "Property Name"}
              </h2>
              <p className="text-xs uppercase font-bold text-neutral-500 tracking-wider font-mono mb-8">
                {condo?.street || "Location Details"}
              </p>

              <div className="space-y-6 flex-1">
                <div className="border border-neutral-200 dark:border-neutral-800 p-6">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-4">Direct Contact</div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full shrink-0 flex items-center justify-center text-[10px] font-black text-neutral-500 dark:text-neutral-400">SQ</div>
                    <div>
                      <div className="text-sm font-bold text-black dark:text-white">Sheena Q.</div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Owner / Agent</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-6">
                    <button className="w-full py-3 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer border border-transparent flex items-center justify-center gap-2">
                      WhatsApp Message
                    </button>
                    <button className="w-full py-3 bg-transparent text-black dark:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-black dark:border-white cursor-pointer">
                      Send Email
                    </button>
                  </div>
                </div>

                {/* Tour Request Form with Validation */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-black dark:bg-white flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Request Sent</p>
                    <p className="text-xs text-neutral-500 mt-2">Sheena Q. will respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-2">Request Tour</div>
                    
                    {/* Name Field */}
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-black dark:border-neutral-800'} pb-2 text-sm text-black dark:text-white placeholder:text-neutral-500 focus:outline-none transition-colors`}
                      />
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-1.5 font-bold uppercase tracking-wider">
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-black dark:border-neutral-800'} pb-2 text-sm text-black dark:text-white placeholder:text-neutral-500 focus:outline-none transition-colors mt-2`}
                      />
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-1.5 font-bold uppercase tracking-wider">
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <textarea
                        placeholder="Message / Preferred Time"
                        rows="3"
                        value={formData.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-black dark:border-neutral-800'} pb-2 text-sm text-black dark:text-white placeholder:text-neutral-500 focus:outline-none transition-colors mt-2 resize-none`}
                      ></textarea>
                      {errors.message && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-1.5 font-bold uppercase tracking-wider">
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black mt-4 text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity cursor-pointer">
                      Submit Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
