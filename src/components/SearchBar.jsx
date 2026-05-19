'use client';

import { useState } from 'react';

const locations = ['Cebu Lapu-Lapu'];

export default function SearchBar() {
  const [location, setLocation] = useState('Cebu Lapu-Lapu');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [focused, setFocused] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showLocations, setShowLocations] = useState(false);
  const [showCheckInCal, setShowCheckInCal] = useState(false);
  const [showCheckOutCal, setShowCheckOutCal] = useState(false);

  // Mock calendar days for visual
  const mockDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching: ${location} · ${checkIn || 'Anytime'} → ${checkOut || 'Anytime'} · ${guests} guest(s)`);
  };

  const inputClass = () =>
    `w-full bg-transparent text-white text-xs font-bold focus:outline-none transition-all duration-200 border-0 p-0 mt-0.5 focus:ring-0 placeholder-neutral-300`;

  return (
    <form
      onSubmit={handleSearch}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl md:rounded-full w-full py-4 px-4 md:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0 shadow-2xl relative z-30"
      role="search"
      aria-label="Search condos"
    >
      {/* Location Selector */}
      <div className="relative flex-1 min-w-[150px] border-b border-white/10 md:border-b-0 md:border-r md:border-white/15 pb-3 md:pb-0 md:pr-5">
        <div
          className="flex flex-col cursor-pointer transition-opacity duration-200 hover:opacity-80 items-start text-left md:pl-5"
          onClick={() => { setFocused('location'); setShowLocations(true); }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block">Where</span>
          <input
            id="search-location"
            type="text"
            placeholder="Search destination"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setShowLocations(true); }}
            onFocus={() => { setFocused('location'); setShowLocations(true); }}
            onBlur={() => setTimeout(() => { setShowLocations(false); setFocused(null); }, 150)}
            className={inputClass()}
            aria-label="Location"
            autoComplete="off"
          />
        </div>

        {/* Location dropdown */}
        {showLocations && (
          <div className="absolute top-full mt-4 left-0 w-64 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 z-50 py-2 overflow-hidden">
            {locations
              .filter((l) => l.toLowerCase().includes(location.toLowerCase()))
              .map((l) => (
                <button
                  key={l}
                  type="button"
                  className="w-full text-left px-5 py-3 text-xs font-bold text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-150 flex items-center gap-3"
                  onMouseDown={() => { setLocation(l); setShowLocations(false); }}
                >
                  <svg className="w-4 h-4 shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {l}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Check-in Date Input */}
      <div
        className="flex flex-col flex-1 min-w-[120px] cursor-pointer transition-opacity duration-200 hover:opacity-80 border-b border-white/10 md:border-b-0 md:border-r md:border-white/15 pb-3 md:pb-0 md:px-5 items-start text-left relative"
        onClick={() => { setFocused('checkin'); setShowCheckInCal(true); setShowCheckOutCal(false); setShowLocations(false); }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block">Check-in</span>
        <div className={`mt-0.5 text-xs font-bold ${checkIn ? 'text-white' : 'text-neutral-400'}`}>
          {checkIn || 'Add dates'}
        </div>
        
        {showCheckInCal && (
          <div 
            className="absolute top-full mt-4 left-0 w-72 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 z-50 p-5 cursor-default"
            onMouseLeave={() => setShowCheckInCal(false)}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-black dark:text-white text-xs font-bold uppercase tracking-widest">October 2026</span>
              <div className="flex gap-2">
                <button type="button" className="text-neutral-400 hover:text-black dark:hover:text-white">&larr;</button>
                <button type="button" className="text-neutral-400 hover:text-black dark:hover:text-white">&rarr;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S','M','T','W','T','F','S'].map(d => <span key={d+Math.random()} className="text-[8px] font-bold text-neutral-400">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* Empty offset */}
              <div/><div/><div/><div/>
              {mockDays.map(d => (
                <button 
                  key={d} type="button"
                  onClick={(e) => { e.stopPropagation(); setCheckIn(`Oct ${d}, 2026`); setShowCheckInCal(false); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Check-out Date Input */}
      <div
        className="flex flex-col flex-1 min-w-[120px] cursor-pointer transition-opacity duration-200 hover:opacity-80 border-b border-white/10 md:border-b-0 md:border-r md:border-white/15 pb-3 md:pb-0 md:px-5 items-start text-left relative"
        onClick={() => { setFocused('checkout'); setShowCheckOutCal(true); setShowCheckInCal(false); setShowLocations(false); }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block">Check-out</span>
        <div className={`mt-0.5 text-xs font-bold ${checkOut ? 'text-white' : 'text-neutral-400'}`}>
          {checkOut || 'Add dates'}
        </div>

        {showCheckOutCal && (
          <div 
            className="absolute top-full mt-4 left-0 md:-left-32 w-72 bg-white dark:bg-[#0c0c0c] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 z-50 p-5 cursor-default"
            onMouseLeave={() => setShowCheckOutCal(false)}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-black dark:text-white text-xs font-bold uppercase tracking-widest">October 2026</span>
              <div className="flex gap-2">
                <button type="button" className="text-neutral-400 hover:text-black dark:hover:text-white">&larr;</button>
                <button type="button" className="text-neutral-400 hover:text-black dark:hover:text-white">&rarr;</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['S','M','T','W','T','F','S'].map(d => <span key={d+Math.random()} className="text-[8px] font-bold text-neutral-400">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* Empty offset */}
              <div/><div/><div/><div/>
              {mockDays.map(d => (
                <button 
                  key={d} type="button"
                  onClick={(e) => { e.stopPropagation(); setCheckOut(`Oct ${d}, 2026`); setShowCheckOutCal(false); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="flex flex-col flex-1 min-w-[120px] pb-3 md:pb-0 md:px-5 items-start text-left">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/70 block">Guests</span>
        <div className="flex items-center gap-4 mt-0.5 w-full">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
          >
            −
          </button>
          <span className="text-xs font-bold text-white w-2 text-center">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(16, g + 1))}
            className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-transparent hover:bg-white/10 text-white font-black uppercase tracking-widest text-[11px] px-5 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shrink-0 group ml-1"
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}
