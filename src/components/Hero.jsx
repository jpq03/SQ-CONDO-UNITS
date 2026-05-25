'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import Image from 'next/image';

const BACKGROUND_SLIDES = [
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&q=80', // Brutalist Concrete Tower
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80', // Modernist Steel Grid High-Rise
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80', // Luxury Minimalist Concrete Residence
];

export default function Hero({ onSearch }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const rect = searchRef.current.getBoundingClientRect();
        setIsSearchSticky(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-black"
        aria-label="Hero section"
      >
        {/* Background Architectural Slideshow */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            const threshold = 50;
            if (info.offset.x < -threshold) {
              setCurrentSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
            } else if (info.offset.x > threshold) {
              setCurrentSlide((prev) => (prev - 1 + BACKGROUND_SLIDES.length) % BACKGROUND_SLIDES.length);
            }
          }}
          className="absolute inset-0 z-0 select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          {BACKGROUND_SLIDES.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-70' : 'opacity-0'
                }`}
            >
              <Image
                src={slide}
                alt={`Architectural Slideshow background ${index + 1}`}
                fill
                className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50 pointer-events-none"
              />
            </div>
          ))}
          {/* Soft vignetted dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/75 z-10 pointer-events-none" />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-20 max-w-screen-xl mx-auto w-full px-6 lg:px-8 pt-32 pb-24 flex flex-col items-center justify-center text-center flex-1">

          {/* Lowercase accent: established label */}
          <p className="text-[10px] font-normal lowercase tracking-[0.35em] text-neutral-400 mb-6">
            established mcmxxiv
          </p>

          {/* Optical sizing: Main Silence in Structure Title */}
          <h1
            className="text-[clamp(2rem,7vw,4.5rem)] font-black text-white uppercase tracking-wider leading-[1.1] mb-10 max-w-4xl transition-all duration-300"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Grid<br />
            Residences
          </h1>

          {/* Removed Call to Action Buttons per user request */}

          {/* Dynamic Search Bar overlay */}
          <div ref={searchRef} className="w-full max-w-4xl mt-4">
            <SearchBar onSearch={onSearch} />
          </div>

        </div>

        {/* Slideshow Minimal Indicators (Thin horizontal lines bottom center) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {BACKGROUND_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-[2px] transition-all duration-500 cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
                }`}
              aria-label={`Go to background slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sticky Search Bar — appears when scrolled past hero */}
      <div
        className={`fixed top-[60px] left-0 right-0 z-40 transition-all duration-500 ${
          isSearchSticky
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-2">
          <div className="transform scale-[0.92] origin-top">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </>
  );
}
