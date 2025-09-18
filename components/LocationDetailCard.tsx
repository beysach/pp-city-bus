import React, { useState, useEffect } from 'react';
import type { Location } from '../types';
import { PhoneIcon, DirectionsIcon, ClipboardIcon, CloseIcon } from './Icons';

interface LocationDetailCardProps {
  location: Location | null;
  onClose: () => void;
}

export const LocationDetailCard: React.FC<LocationDetailCardProps> = ({ location, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!location) {
      setCopied(false);
    }
  }, [location]);

  const handleCopy = () => {
    if (location) {
      navigator.clipboard.writeText(location.google_map);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!location) return null;

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 z-20 p-4 transform transition-transform duration-500 ease-in-out ${
        location ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-md mx-auto bg-gray-800/80 backdrop-blur-md text-white rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-blue-300 mb-2">
              {location.location_title}
            </h2>
            <button onClick={onClose} className="p-1 -mt-1 -mr-2 text-gray-400 hover:text-white transition">
              <CloseIcon />
            </button>
          </div>
          
          <div className="mt-2 space-y-2">
             {location.contact.map((phone, index) => (
                <a key={index} href={`tel:${phone}`} className="flex items-center space-x-3 text-gray-300 hover:text-blue-300 transition-colors group">
                   <PhoneIcon />
                   <span className="text-lg group-hover:underline">{phone}</span>
                </a>
            ))}
          </div>

          <div className="mt-6 flex space-x-3">
            <a
              href={location.google_map}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition"
            >
              <DirectionsIcon />
              <span className="ml-2">Directions</span>
            </a>
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition"
            >
              <ClipboardIcon />
              <span className="ml-2">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};