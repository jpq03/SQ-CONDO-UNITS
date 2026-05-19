'use client';

import { useState, useEffect } from 'react';
import CondoCard from './CondoCard';
import ContactDrawer from './ContactDrawer';
import SkeletonCard from './SkeletonCard';
import MapView from './MapView';

// Simulated luxury architectural portfolio database
const CONDOS = [
  {
    id: 1,
    title: 'ROYAL OCEANCREST // PENTHOUSE 01',
    location: 'Cebu Lapu-Lapu',
    price: 12450000,
    rating: 4.97,
    reviews: 128,
    area: '120 SQM',
    beds: 3,
    baths: 2,
    street: 'ROYAL OCEANCREST, BASAK',
    details: ['3 BED', '2 BATH', 'PRIVATE TERRACE'],
    tag: 'Popular',
    wifiSpeed: 350,
    cclexDist: '5m',
    beachDist: '8m',
    images: ['/condo-1.png'],
  },
  {
    id: 2,
    title: 'THE OBSIDIAN // RESIDENCE 02',
    location: 'Cebu Lapu-Lapu',
    price: 8900000,
    rating: 4.92,
    reviews: 84,
    area: '90 SQM',
    beds: 2,
    baths: 2,
    street: '88 GREENWICH STREET, NY',
    details: ['2 BED', '2 BATH', 'PRIVATE BALCONY'],
    tag: 'New',
    wifiSpeed: 500,
    cclexDist: '8m',
    beachDist: '12m',
    images: ['/condo-2.png'],
  },
  {
    id: 3,
    title: 'STUDIO OCEAN // SUITE 03',
    location: 'Cebu Lapu-Lapu',
    price: 4200000,
    rating: 4.85,
    reviews: 201,
    area: '60 SQM',
    beds: 1,
    baths: 1,
    street: 'STREET 09, OCEAN DRIVE',
    details: ['1 BED', '1 BATH', 'OCEAN FRONT'],
    tag: null,
    wifiSpeed: 250,
    cclexDist: '12m',
    beachDist: '15m',
    images: ['/condo-3.png'],
  },
  {
    id: 4,
    title: 'PENTHOUSE OMEGA // DUPLEX 04',
    location: 'Lapu-Lapu, Cebu',
    price: 15800000,
    rating: 4.99,
    reviews: 56,
    area: '180 SQM',
    beds: 4,
    baths: 3,
    street: 'STREET 04, UPPER EAST',
    details: ['4 BED', '3 BATH', 'SKY POOL'],
    tag: 'Featured',
    wifiSpeed: 600,
    cclexDist: '4m',
    beachDist: '9m',
    images: [],
  },
  {
    id: 5,
    title: 'THE SOLITUDE // LOFT 05',
    location: 'Cebu Lapu-Lapu',
    price: 5100000,
    rating: 4.88,
    reviews: 173,
    area: '80 SQM',
    beds: 2,
    baths: 1.5,
    street: 'STREET 12, MARINA PROMENADE',
    details: ['2 BED', '1.5 BATH', 'PRIVATE GYM'],
    tag: 'Popular',
    wifiSpeed: 300,
    cclexDist: '10m',
    beachDist: '2m',
    images: [],
  },
  {
    id: 6,
    title: 'BASAK VILLA // VOL. 06',
    location: 'Cebu Lapu-Lapu',
    price: 3500000,
    rating: 4.78,
    reviews: 99,
    area: '50 SQM',
    beds: 1,
    baths: 1,
    street: 'STREET 07, DOWNTOWN COAST',
    details: ['1 BED', '1 BATH', 'FIBER CONNECTED'],
    tag: 'New',
    wifiSpeed: 450,
    cclexDist: '6m',
    beachDist: '7m',
    images: [],
  },
];

const FILTERS = ['All', 'Studio', '1 Bed', '2+ Beds', 'With Pool', 'Pet Friendly'];

export default function CondoGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCondo, setSelectedCondo] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [loading, setLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic matching property variables
  const filtered = CONDOS.filter((c) => {
    // Price filter always applies
    if (c.price < priceRange[0] || c.price > priceRange[1]) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Studio') return c.beds === 1 && c.price < 5000000;
    if (activeFilter === '1 Bed') return c.beds === 1;
    if (activeFilter === '2+ Beds') return c.beds >= 2;
    if (activeFilter === 'With Pool') return c.details.some(d => d.includes('POOL')) || c.id === 1;
    if (activeFilter === 'Pet Friendly') return c.id % 2 === 0;
    return true;
  });

  return (
    <section id="listings" className="bg-white dark:bg-[#080808] border-t border-neutral-200 dark:border-neutral-900" aria-label="Featured Listings">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 border-x border-neutral-200 dark:border-neutral-900 py-20 md:py-28">

        {/* Stark Editorial Collection Header matching photo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black dark:border-neutral-800 pb-4 mb-8">
          <div className="flex flex-col items-start">
            <h2
              className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              FEATURED UNITS
            </h2>
          </div>

          <button className="mt-4 md:mt-0 text-[10px] font-normal lowercase tracking-[0.2em] text-black dark:text-white hover:opacity-75 transition-opacity cursor-pointer bg-transparent">
            view all residences
          </button>
        </div>

        {/* Filter pills and View Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f}
                id={`filter-${f.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${activeFilter === f
                  ? 'bg-black text-white border border-black dark:bg-white dark:text-black dark:border-white shadow-lg scale-[1.02]'
                  : 'bg-neutral-100 text-neutral-500 border border-neutral-100 hover:border-black hover:text-black hover:bg-white dark:bg-[#111] dark:text-neutral-500 dark:border-[#111] dark:hover:border-white dark:hover:text-white dark:hover:bg-transparent'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* List / Map Toggle */}
          <div className="flex items-center gap-1 border border-neutral-200 dark:border-neutral-800 p-1 shrink-0">
            <button onClick={() => setViewMode('list')} className={`px-8 py-2.5 text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${viewMode === 'list' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white'}`}>List</button>
            <button onClick={() => setViewMode('map')} className={`px-8 py-2.5 text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${viewMode === 'map' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white'}`}>Map</button>
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 py-4 px-6 border border-neutral-200 dark:border-neutral-800">
          <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 shrink-0">Price Range</span>
          <div className="flex-1 flex items-center gap-4 w-full">
            <span className="text-[10px] font-mono font-bold text-black dark:text-white shrink-0 w-24">
              {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0, notation: 'compact' }).format(priceRange[0])}
            </span>
            <div className="flex-1 relative h-8 flex items-center">
              <input
                type="range"
                min={0}
                max={20000000}
                step={500000}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 500000), priceRange[1]])}
                className="absolute w-full h-[2px] bg-neutral-300 dark:bg-neutral-700 appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:dark:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20"
              />
              <input
                type="range"
                min={0}
                max={20000000}
                step={500000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 500000)])}
                className="absolute w-full h-[2px] bg-transparent appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:dark:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-black dark:text-white shrink-0 w-24 text-right">
              {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0, notation: 'compact' }).format(priceRange[1])}
            </span>
          </div>
        </div>

        {/* Grid structured with stark horizontal negative space gutters */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-20 mb-12">
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          viewMode === 'map' ? (
            <MapView filtered={filtered} onSelectCondo={setSelectedCondo} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-20 mb-12">
              {filtered.slice(0, visibleCount).map((condo, index) => (
                <CondoCard
                  key={condo.id}
                  condo={condo}
                  index={index}
                  onClick={() => setSelectedCondo(condo)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 text-neutral-400 dark:text-neutral-600">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">No listings match this filter.</p>
          </div>
        )}

        {/* Load more */}
        {viewMode === 'list' && visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              id="load-more-btn"
              onClick={() => setVisibleCount((v) => v + 3)}
              className="px-8 py-3.5 border border-black text-black text-xs font-bold uppercase tracking-wider rounded-none hover:bg-black hover:text-white dark:border-white dark:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-pointer"
            >
              Load More Listings
            </button>
          </div>
        )}
      </div>

      {/* Render Contact Drawer */}
      <ContactDrawer
        isOpen={!!selectedCondo}
        onClose={() => setSelectedCondo(null)}
        condo={selectedCondo}
      />
    </section>
  );
}
