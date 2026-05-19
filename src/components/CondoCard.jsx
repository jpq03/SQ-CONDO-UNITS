'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CondoCard({ condo, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Determine if this is the primary listing housing the user's Royal Oceancrest image
  const isPrimary = condo.id === 1;

  // Split badge label characters dynamically for high-end wide-tracking typography (e.g. P O P U L A R)
  const splitTag = condo.tag ? condo.tag.split('').join(' ') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      onClick={onClick}
      className="group relative flex flex-col bg-transparent dark:bg-transparent border border-neutral-200/50 dark:border-[#333333] p-3 hover:bg-neutral-50/20 dark:hover:bg-neutral-900/5 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Micro-Drafting Corner Tick Crosshairs on Card Corners */}
      <div className="absolute top-1.5 left-2 text-[10px] text-neutral-400 dark:text-[#555] select-none pointer-events-none z-30 font-light font-mono">+</div>
      <div className="absolute top-1.5 right-2 text-[10px] text-neutral-400 dark:text-[#555] select-none pointer-events-none z-30 font-light font-mono">+</div>
      <div className="absolute bottom-1.5 left-2 text-[10px] text-neutral-400 dark:text-[#555] select-none pointer-events-none z-30 font-light font-mono">+</div>
      <div className="absolute bottom-1.5 right-2 text-[10px] text-neutral-400 dark:text-[#555] select-none pointer-events-none z-30 font-light font-mono">+</div>

      {/* 
        The Inset Technique:
        The image container is surrounded by standard padding inside the 1px hairline border, 
        giving the photo a framed gallery feeling.
      */}
      <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0 border border-neutral-200/40 dark:border-[#333333]/50">
        
        {condo.images && condo.images.length > 0 ? (
          /* Render the photo in full, natural color always with smooth optical hover zoom */
          <img
            src={condo.images[0]}
            alt={`${condo.title} showcase`}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          /* Stark architectural scale outline drawing matching the high-fashion catalogue theme */
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F4F4F4] dark:bg-[#0c0c0c] relative overflow-hidden select-none">
            {/* Fine architectural scale gridlines */}
            <div className="absolute inset-0 border-t border-b border-neutral-200/30 dark:border-neutral-800/10 rotate-12 scale-150" />
            <div className="absolute inset-0 border-t border-b border-neutral-200/30 dark:border-neutral-800/10 -rotate-12 scale-150" />
            
            <span className="text-[9px] font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-600 uppercase z-10">
              SCHEMATIC // UNIT 0{condo.id}
            </span>
            <span className="text-[7px] font-bold tracking-[0.2em] text-neutral-300 dark:text-neutral-700 uppercase mt-1 z-10">
              IMAGE OMITTED / B&W MINIMAL
            </span>

            {/* Blueprint dimensions ruler overlay */}
            <div className="absolute inset-x-6 bottom-4 h-1 border-x border-t border-neutral-300 dark:border-[#333333] flex justify-between z-10">
              <span className="text-[6px] text-neutral-400 dark:text-neutral-600 -mt-3.5">0.0m</span>
              <span className="text-[6px] text-neutral-400 dark:text-neutral-600 -mt-3.5">SCALE 1:50</span>
              <span className="text-[6px] text-neutral-400 dark:text-neutral-600 -mt-3.5">12.5m</span>
            </div>
          </div>
        )}

        {/* Dynamic Badge Overlays without heavy solid white blocks */}
        {condo.tag && (
          <span className="absolute top-4 left-4 z-20 text-neutral-500 dark:text-neutral-400 text-[8px] font-extrabold uppercase tracking-[0.35em] pointer-events-none select-none">
            {splitTag}
          </span>
        )}

        {/* Hidden Details: Sleek HUD Console overlays only on hover to keep initial view clean */}
        <div
          className={`absolute inset-0 bg-black/75 z-20 flex flex-col items-center justify-center gap-2.5 transition-all duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="text-[8px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-1 border-b border-neutral-800 pb-1 w-24 text-center">
            UNIT SPECS //
          </div>
          <div className="text-[10px] font-mono tracking-widest text-neutral-200">
            📐 {condo.area}
          </div>
          <div className="text-[10px] font-mono tracking-widest text-neutral-200">
            🛁 {condo.baths} BATHS
          </div>
          <div className="text-[10px] font-mono tracking-widest text-neutral-200">
            🛏️ {condo.beds} BEDS
          </div>
        </div>

      </div>

      {/* 
        Rule-of-Thirds Alignment: 
        The descriptions below are nested directly inside the card container.
        This aligns the text perfectly with the left edge of the photo above it.
      */}
      <div className="mt-5 mb-2 px-1 flex flex-col justify-between flex-1">
        
        {/* Floor-Plan Key details block */}
        <div className="flex justify-between items-start gap-4">
          
          {/* Bottom Left: Title in high-contrast monospaced metadata style */}
          <div className="flex-1">
            <h3
              className="text-[10px] font-bold tracking-wider text-black dark:text-white uppercase leading-tight font-mono"
            >
              {condo.title}
            </h3>
            <p className="text-[8px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider mt-1.5 font-mono">
              {condo.street}
            </p>
          </div>
          
          {/* Bottom Right: Price in Bold Serif & Specs directly underneath in wide sans-serif */}
          <div className="text-right shrink-0">
            <span
              className="text-[14px] font-black text-black dark:text-white uppercase block leading-none font-serif mt-1"
            >
              {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(condo.price)}
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
