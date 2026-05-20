'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CondoGrid from '@/components/CondoGrid';
import HowItWorks from '@/components/HowItWorks';
import LocationHighlights from '@/components/LocationHighlights';
import FAQSection from '@/components/FAQ';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export default function Home() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Smooth scroll to listings grid
    const listingsElement = document.getElementById('listings');
    if (listingsElement) {
      listingsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Trigger toast notification
    const event = new CustomEvent('show-toast', {
      detail: { 
        message: `Listing parameters updated for: ${params.location || 'Anywhere'} · ${params.guests} Guest(s)`,
        type: 'info'
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#080808] dark:text-white transition-colors duration-300">
      <Navbar />
      <Hero onSearch={handleSearch} />
      <CondoGrid searchParams={searchParams} />
      
      {/* Editorial Catalog CTA Section */}
      <section className="w-full bg-white dark:bg-[#080808] my-12" aria-label="Call to action">
        <div className="w-full flex justify-center">
          <div 
            className="flex flex-col items-center justify-center text-center w-full relative overflow-hidden py-24 px-8 md:py-32 md:px-16 min-h-[450px] shadow-2xl"
            style={{ backgroundImage: "url('/pacific-grande.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Premium Light Overlay to ensure black text legibility against dark window frames */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none backdrop-blur-[2px]"
              style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
            ></div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <h2
                className="text-4xl md:text-7xl font-black mb-6 leading-none uppercase tracking-tight text-center"
                style={{ fontFamily: "var(--font-playfair)", color: '#000000' }}
              >
                Ready to find your<br />
                <span className="italic font-normal font-serif leading-tight block mt-2" style={{ color: '#000000' }}>Perfect Stay?</span>
              </h2>
              <p className="text-sm md:text-base max-w-lg mx-auto mb-12 leading-relaxed text-center font-medium" style={{ color: '#111111' }}>
                Explore the elite collections of structural properties and premium condominiums in Cebu Lapu-Lapu. Strictly curated for expats and nomads.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center max-w-md mx-auto w-full">
                <button
                  id="cta-browse-btn"
                  className="w-full py-4 border border-transparent text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-2xl hover:opacity-80"
                  style={{ backgroundColor: '#000000', color: '#ffffff' }}
                >
                  browse listings
                </button>
                <button
                  id="cta-list-btn"
                  className="w-full py-4 bg-transparent border hover:bg-black hover:text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer"
                  style={{ borderColor: '#000000', color: '#000000' }}
                >
                  list your property
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationHighlights />
      <HowItWorks />
      <FAQSection />
      <Footer />
      <BackToTop />
      <Toast />
    </main>
  );
}
