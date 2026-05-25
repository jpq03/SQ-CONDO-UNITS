'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
const CONDO_PINS = [
  { id: 1, title: 'ROYAL OCEANCREST', price: 12450000, lat: 10.3103, lng: 123.9494 },
  { id: 2, title: 'THE OBSIDIAN', price: 8900000, lat: 10.3150, lng: 123.9550 },
  { id: 3, title: 'STUDIO OCEAN', price: 4200000, lat: 10.3070, lng: 123.9420 },
  { id: 4, title: 'PENTHOUSE OMEGA', price: 15800000, lat: 10.3200, lng: 123.9600 },
  { id: 5, title: 'THE SOLITUDE', price: 5100000, lat: 10.3020, lng: 123.9380 },
  { id: 6, title: 'BASAK VILLA', price: 3500000, lat: 10.3130, lng: 123.9460 },
];

export default function MapView({ filtered, onSelectCondo }) {
  const [MapContainer, setMapContainer] = useState(null);
  const [TileLayer, setTileLayer] = useState(null);
  const [CircleMarker, setCircleMarker] = useState(null);
  const [Tooltip, setTooltip] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [activeCondo, setActiveCondo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mapActive, setMapActive] = useState(true);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('react-leaflet').then((mod) => {
      setMapContainer(() => mod.MapContainer);
      setTileLayer(() => mod.TileLayer);
      setCircleMarker(() => mod.CircleMarker);
      setTooltip(() => mod.Tooltip);
    });
    import('leaflet/dist/leaflet.css');
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setMapActive(false);
      else setMapActive(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync active condo when filters change
  useEffect(() => {
    if (activeCondo && !filtered.some(c => c.id === activeCondo.id)) {
      setActiveCondo(null);
    }
  }, [filtered, activeCondo]);

  if (!mounted || !MapContainer || !TileLayer || !CircleMarker || !Tooltip) {
    return (
      <div className="w-full aspect-square md:aspect-[21/9] bg-[#0a0a0a] border border-neutral-800 mt-20 mb-12 flex items-center justify-center">
        <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 animate-pulse">
          Loading map...
        </div>
      </div>
    );
  }

  // Filter pins based on filtered condos
  const filteredIds = filtered.map(c => c.id);
  const visiblePins = CONDO_PINS.filter(p => filteredIds.includes(p.id));

  return (
    <div className="w-full aspect-square md:aspect-[21/9] border border-neutral-200 dark:border-neutral-800 mt-20 mb-12 overflow-hidden shadow-2xl relative">
      {/* Tap to Interact Overlay on Mobile */}
      {!mapActive && isMobile && (
        <div 
          onClick={() => setMapActive(true)}
          className="absolute inset-0 bg-black/40 dark:bg-black/65 backdrop-blur-[1.5px] z-[1001] flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 px-5 py-3.5 shadow-2xl flex flex-col items-center gap-1 rounded-xl max-w-[240px] text-center">
            <span className="text-xl">🗺️</span>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-900 dark:text-white">Tap to interact</span>
            <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-500 uppercase mt-0.5">Enables zooming and panning</span>
          </div>
        </div>
      )}

      {/* Lock Map Escape Button on Mobile */}
      {mapActive && isMobile && (
        <button
          type="button"
          onClick={() => setMapActive(false)}
          className="absolute top-4 right-4 z-[1002] bg-black/85 hover:bg-black text-white border border-neutral-800 px-3 py-1.5 text-[8px] font-mono tracking-widest uppercase rounded-lg shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          🔒 Lock Map
        </button>
      )}

      <MapContainer
        center={[10.3103, 123.9494]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        dragging={mapActive}
        touchZoom={mapActive}
        scrollWheelZoom={false}
      >
        {/* Dark-themed map tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {visiblePins.map((pin) => {
          const isSelected = activeCondo?.id === pin.id;
          return (
            <CircleMarker
              key={pin.id}
              center={[pin.lat, pin.lng]}
              radius={isSelected ? 10 : 7}
              fillColor={isSelected ? "#000000" : "#ffffff"}
              fillOpacity={0.9}
              stroke={true}
              color={isSelected ? "#ffffff" : "#000000"}
              weight={isSelected ? 3 : 2}
              eventHandlers={{
                click: () => {
                  const condo = filtered.find(c => c.id === pin.id);
                  if (condo) setActiveCondo(condo);
                },
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -12]}
                className="leaflet-dark-tooltip"
              >
                <div style={{
                  background: isSelected ? '#fff' : '#000',
                  color: isSelected ? '#000' : '#fff',
                  padding: '6px 12px',
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '1px solid #333',
                  fontFamily: 'monospace',
                  transition: 'all 0.2s ease',
                }}>
                  {pin.title}<br />
                  <span style={{ fontWeight: 400, color: isSelected ? '#444' : '#aaa' }}>
                    {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(pin.price)}
                  </span>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Map Label Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-black/80 backdrop-blur border border-neutral-800 px-4 py-2">
        <span className="text-[9px] font-mono tracking-widest uppercase text-white">
          Lapu-Lapu City, Cebu
        </span>
      </div>

      {/* Glassmorphic Property Preview Card Overlay */}
      <AnimatePresence>
        {activeCondo && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-80 z-[1000] backdrop-blur-md bg-black/85 dark:bg-[#0c0c0c]/90 border border-neutral-200 dark:border-neutral-800 p-4 shadow-2xl flex flex-col gap-3"
          >
            <div className="flex justify-between items-start gap-4">
              <span className="text-[8px] font-mono tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase">
                Unit Preview // 0{activeCondo.id}
              </span>
              <button
                onClick={() => setActiveCondo(null)}
                className="text-neutral-400 hover:text-white transition-colors text-sm leading-none cursor-pointer"
                aria-label="Dismiss preview"
              >
                &times;
              </button>
            </div>

            <div className="flex gap-4">
              <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 shrink-0 overflow-hidden relative">
                {activeCondo.images && activeCondo.images.length > 0 ? (
                  <Image
                    src={activeCondo.images[0]}
                    alt={activeCondo.title}
                    fill
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-[7px] text-neutral-600">
                    NO IMAGE
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold font-mono uppercase tracking-wider text-white line-clamp-1">
                    {activeCondo.title}
                  </h4>
                  <p className="text-[8px] text-neutral-400 font-mono mt-1 line-clamp-1">
                    {activeCondo.street}
                  </p>
                </div>
                <div className="text-xs font-serif font-bold text-white">
                  {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(activeCondo.price)}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-neutral-900 pt-3 mt-1">
              <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">
                📐 {activeCondo.area} · 🛏️ {activeCondo.beds} beds
              </span>
              <button
                onClick={() => {
                  if (onSelectCondo) onSelectCondo(activeCondo);
                }}
                className="bg-white hover:bg-neutral-200 text-black text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 transition-colors cursor-pointer"
              >
                Inquire Details
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .leaflet-dark-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-dark-tooltip::before {
          display: none !important;
        }
        .leaflet-container {
          background: #0a0a0a !important;
        }
      `}</style>
    </div>
  );
}
