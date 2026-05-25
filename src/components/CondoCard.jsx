'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { calculateNomadScore } from '@/utils/scoring';

export default function CondoCard({ condo, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const nextImage = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (condo.images && condo.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % condo.images.length);
    }
  };

  const prevImage = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (condo.images && condo.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + condo.images.length) % condo.images.length);
    }
  };

  const handleCardClick = () => {
    if (isDragging) return;
    if (onClick) onClick();
  };

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
      onClick={handleCardClick}
      className="group relative flex flex-col bg-neutral-50/30 dark:bg-neutral-900/10 p-4 rounded-2xl border border-neutral-200/20 dark:border-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-950/40 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-neutral-200/10 dark:hover:shadow-black/20 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 
        The Inset Technique:
        The image container is surrounded by standard padding inside the card, 
        giving the photo a framed gallery feeling.
      */}
      <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0 rounded-xl group/image">
        
        {condo.images && condo.images.length > 0 ? (
          <div className="w-full h-full relative overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                const threshold = 40;
                if (info.offset.x < -threshold) {
                  nextImage(e);
                } else if (info.offset.x > threshold) {
                  prevImage(e);
                }
                setTimeout(() => setIsDragging(false), 50);
              }}
              className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
              style={{ touchAction: 'pan-y' }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <Image
                      src={condo.images[currentImageIndex]}
                      alt={`${condo.title} showcase`}
                      fill
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      priority={false}
                    />
              </AnimatePresence>
            </motion.div>

            {/* Slide Navigation Arrows (hidden on touch, visible on hover) */}
            {condo.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 dark:bg-black/60 dark:hover:bg-white/95 border border-white/10 dark:hover:border-white text-white dark:hover:text-black flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-30 shadow-md hover:scale-105 active:scale-95 cursor-pointer md:flex hidden"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 dark:bg-black/60 dark:hover:bg-white/95 border border-white/10 dark:hover:border-white text-white dark:hover:text-black flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-30 shadow-md hover:scale-105 active:scale-95 cursor-pointer md:flex hidden"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Elegant Dots Indicator */}
            {condo.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] px-2.5 py-1 rounded-full border border-white/5">
                {condo.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setCurrentImageIndex(i);
                    }}
                    className={`w-1 h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentImageIndex ? 'w-2.5 bg-white' : 'bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
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
          className={`absolute inset-0 bg-black/60 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-3 transition-all duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2 border-b border-[#ffffff]/10 pb-1.5 w-28 text-center">
            UNIT SPECS //
          </div>
          <div className="grid grid-cols-2 gap-3 w-full px-5">
            <div className="flex flex-col items-center justify-center py-2.5 bg-[#ffffff]/5 backdrop-blur-md rounded-lg border border-[#ffffff]/5">
              <span className="text-xs">📐</span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-300 mt-1">{condo.area}</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2.5 bg-[#ffffff]/5 backdrop-blur-md rounded-lg border border-[#ffffff]/5">
              <span className="text-xs">🛁</span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-300 mt-1">{condo.baths} BATHS</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2.5 bg-[#ffffff]/5 backdrop-blur-md rounded-lg border border-[#ffffff]/5">
              <span className="text-xs">🛏️</span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-300 mt-1">{condo.beds} BEDS</span>
            </div>
            <div className="flex flex-col items-center justify-center py-2.5 bg-[#25d366]/10 backdrop-blur-md rounded-lg border border-[#25d366]/20">
              <span className="text-xs">📊</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 mt-1">NOMAD: {calculateNomadScore(condo).total}</span>
            </div>
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
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                Nomad Score: {calculateNomadScore(condo).total}/10
              </span>
            </div>
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
