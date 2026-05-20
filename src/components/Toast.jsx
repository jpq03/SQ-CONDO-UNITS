'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleShowToast = (e) => {
      const { message, type = 'info' } = e.detail || {};
      setToast({ message, type });
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 left-8 right-8 md:right-auto md:w-96 z-[2000] backdrop-blur-md bg-black/90 dark:bg-[#080808]/95 border border-neutral-200 dark:border-neutral-800 px-5 py-4 shadow-2xl flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <div>
              <div className="text-[8px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase">
                SYSTEM MESSAGE // {toast.type}
              </div>
              <p className="text-[11px] font-mono font-bold tracking-wide text-white mt-1">
                {toast.message}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setToast(null)}
            className="text-neutral-400 hover:text-white transition-colors text-sm font-bold p-1 cursor-pointer leading-none"
            aria-label="Dismiss toast"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
