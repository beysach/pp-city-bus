import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location } from './types';
import { processLocations } from './utils/locationProcessor';
import { LocationDetailCard } from './components/LocationDetailCard';

const App: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    const processedLocations = processLocations();
    setLocations(processedLocations);
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && locations.length > 0) {
      const map = L.map(mapContainerRef.current).setView([12.5657, 104.9910], 7); // Center of Cambodia
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      locations.forEach(location => {
        if (location.lat !== null && location.lng !== null) {
          const pulsingIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class='pulse-marker'></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });

          const marker = L.marker([location.lat, location.lng], { icon: pulsingIcon }).addTo(map);
          marker.on('click', () => {
            setSelectedLocation(location);
            map.flyTo([location.lat, location.lng], 12);
          });
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);


  const handleCloseDetail = () => {
    setSelectedLocation(null);
    if(mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([12.5657, 104.9910], 7);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-gray-900 text-white">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-gray-900/80 to-transparent">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white drop-shadow-lg">
          Free Phnom Penh City Bus
        </h1>
      </div>
      <div ref={mapContainerRef} className="absolute inset-0 z-0" id="map" />
      <LocationDetailCard location={selectedLocation} onClose={handleCloseDetail} />
    </div>
  );
};

export default App;
