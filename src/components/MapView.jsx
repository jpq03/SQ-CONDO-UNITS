'use client';

import { useEffect, useState } from 'react';

// Condo coordinates in Lapu-Lapu City area
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
    <div className="w-full aspect-square md:aspect-[21/9] border border-neutral-800 mt-20 mb-12 overflow-hidden shadow-2xl relative">
      <MapContainer
        center={[10.3103, 123.9494]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        {/* Dark-themed map tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {visiblePins.map((pin) => (
          <CircleMarker
            key={pin.id}
            center={[pin.lat, pin.lng]}
            radius={8}
            fillColor="#ffffff"
            fillOpacity={0.9}
            stroke={true}
            color="#ffffff"
            weight={2}
            eventHandlers={{
              click: () => {
                const condo = filtered.find(c => c.id === pin.id);
                if (condo && onSelectCondo) onSelectCondo(condo);
              },
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -12]}
              className="leaflet-dark-tooltip"
            >
              <div style={{
                background: '#000',
                color: '#fff',
                padding: '6px 12px',
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid #333',
                fontFamily: 'monospace',
              }}>
                {pin.title}<br />
                <span style={{ fontWeight: 400, color: '#aaa' }}>
                  {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(pin.price)}
                </span>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Map Label Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-black/80 backdrop-blur border border-neutral-800 px-4 py-2">
        <span className="text-[9px] font-mono tracking-widest uppercase text-white">
          Lapu-Lapu City, Cebu
        </span>
      </div>

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
