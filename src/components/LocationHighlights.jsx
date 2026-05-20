'use client';

import { motion } from 'framer-motion';

const LANDMARKS = [
  {
    name: 'CCLEX Bridge',
    distance: '5 min',
    category: 'Infrastructure',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    name: 'Mactan Beach',
    distance: '8 min',
    category: 'Beach',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    name: 'SM Seaside',
    distance: '15 min',
    category: 'Shopping',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    name: 'Mactan Airport',
    distance: '12 min',
    category: 'Transport',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    name: 'Island Hopping',
    distance: '20 min',
    category: 'Activity',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.852l-.39.13M12.75 3.031l.177.529" />
      </svg>
    ),
  },
  {
    name: 'Hospitals',
    distance: '10 min',
    category: 'Medical',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function LocationHighlights() {
  return (
    <section className="bg-white dark:bg-[#080808] border-t border-neutral-200 dark:border-neutral-900" aria-label="Location Highlights">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 py-20 md:py-28">

        {/* Header */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mb-16">
          <p className="text-[10px] font-bold lowercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mb-3 border-b border-neutral-200 dark:border-neutral-800 pb-1.5 inline-block">
            02 • neighborhood
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-neutral-950 dark:text-white mb-4 mt-2 uppercase tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Prime Location
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
            Everything you need is minutes away. Lapu-Lapu City offers the perfect balance of island tranquility and urban convenience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 md:gap-8 w-full max-w-6xl mx-auto justify-center justify-items-center">
          {LANDMARKS.map((landmark, index) => (
            <motion.div
              key={landmark.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center text-center p-6 bg-neutral-50/20 hover:bg-neutral-50 dark:bg-transparent dark:hover:bg-neutral-900/40 rounded-2xl transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/20 dark:hover:shadow-none"
            >
              {/* Icon Container with Round Background */}
              <div className="mb-4 flex items-center justify-center w-14 h-14 bg-neutral-100/80 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 rounded-full">
                {landmark.icon}
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600 mb-2 font-mono">
                {landmark.category}
              </span>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white mb-3 min-h-[32px] flex items-center justify-center">
                {landmark.name}
              </h3>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900/80 px-3.5 py-1 rounded-full border border-neutral-200/50 dark:border-neutral-800/40">
                {landmark.distance}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
