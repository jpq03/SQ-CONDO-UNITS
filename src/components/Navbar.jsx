'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const savedTheme = localStorage.getItem('theme');
    const isDarkTheme =
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkTheme);
    if (isDarkTheme) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const textColor = scrolled ? 'text-black dark:text-white' : 'text-white';
  const borderColor = scrolled ? 'after:bg-black dark:after:bg-white border-black dark:border-white' : 'after:bg-white border-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm dark:bg-[#080808]/95 dark:border-neutral-900/80 py-4'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-12 items-center">
            
            {/* Left: Hamburger & Logo */}
            <div className="col-span-6 md:col-span-4 flex items-center gap-4">
              <button
                onClick={() => setMenuOpen(true)}
                className={`p-1.5 ${textColor} hover:opacity-75 transition-opacity cursor-pointer shrink-0 md:hidden`}
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link href="/" className="group flex items-center">
                <span
                  className={`text-xl md:text-2xl font-black tracking-wider ${textColor} uppercase transition-colors duration-300`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  SQ Condo Units
                </span>
              </Link>
            </div>

            {/* Center Links */}
            <div className="col-span-4 hidden md:flex justify-center items-center gap-10">
              {[
                { label: 'explore units', href: '#listings' },
                { label: 'how it works', href: '#how-it-works' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[10px] font-medium lowercase tracking-[0.25em] ${textColor} transition-all duration-300 hover:opacity-75 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] ${borderColor} after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Search, Theme & Sign In */}
            <div className="col-span-6 md:col-span-4 flex justify-end items-center gap-4">
              <button className={`p-1.5 ${textColor} hover:opacity-75 transition-opacity cursor-pointer hidden sm:flex`} aria-label="Search properties">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button
                onClick={toggleTheme}
                className={`p-1.5 ${textColor} hover:opacity-75 transition-transform duration-500 cursor-pointer flex items-center justify-center`}
                aria-label="Toggle dark mode theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.8 : 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {isDark ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </motion.div>
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#080808] flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-black tracking-wider text-black dark:text-white uppercase" style={{ fontFamily: "var(--font-playfair)" }}>
                SQ Condo Units
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-black dark:text-white p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-8 flex-1 justify-center items-center">
              <a href="#listings" onClick={() => setMenuOpen(false)} className="text-3xl font-black lowercase tracking-widest text-black dark:text-white hover:opacity-50 transition-opacity">
                explore units
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-3xl font-black lowercase tracking-widest text-black dark:text-white hover:opacity-50 transition-opacity">
                how it works
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
