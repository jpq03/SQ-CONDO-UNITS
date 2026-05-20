'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'What is the minimum stay requirement?',
    answer: 'Our minimum stay is 30 days for all units. We cater exclusively to medium and long-term tenants, digital nomads, and expats looking for a stable living arrangement in Lapu-Lapu City.',
  },
  {
    question: 'Is parking included in the rental?',
    answer: 'Yes, each unit comes with one dedicated parking slot at no additional cost. Additional parking can be arranged for ₱3,000/month subject to availability.',
  },
  {
    question: 'What is the pet policy?',
    answer: 'Small pets (under 10kg) are welcome in select units with a refundable pet deposit of ₱5,000. Please inquire about pet-friendly units when booking.',
  },
  {
    question: 'What internet speed is available?',
    answer: 'All units are pre-installed with fiber optic internet ranging from 250 Mbps to 600 Mbps. Speed varies by unit and is included in the monthly rental fee.',
  },
  {
    question: 'How do I pay the monthly rent?',
    answer: 'We accept bank transfers (BDO, BPI, UnionBank), GCash, Maya, and international wire transfers. Rent is due on the 5th of each month.',
  },
  {
    question: 'Is there 24/7 security?',
    answer: 'Yes, the building has round-the-clock security personnel, CCTV surveillance on all floors, and a key-card access system for residents only.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white dark:bg-[#080808] border-t border-neutral-200 dark:border-neutral-900" aria-label="Frequently Asked Questions">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-20 md:py-28">

        {/* Header */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mb-20">
          <p className="text-[10px] font-normal lowercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1.5 inline-block">
            04 • information
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-neutral-950 dark:text-white mb-4 mt-2 uppercase tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Common Questions
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
            Everything you need to know before booking your stay.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
          {FAQS.map((faq, index) => (
            <div key={index} className="border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-7 px-6 text-left cursor-pointer group"
              >
                <span className="text-[13px] font-bold uppercase tracking-wider text-black dark:text-white group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-200 pr-8">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-light text-neutral-400 dark:text-neutral-500 shrink-0 w-8 h-8 flex items-center justify-center"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed pb-7 px-6 pr-16">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
