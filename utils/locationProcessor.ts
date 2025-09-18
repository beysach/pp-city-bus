
import type { Location, LocationData } from '../types';
import { rawLocations } from '../data/locations';

const shortUrlCoords: { [key: string]: { lat: number; lng: number } } = {
  'https://maps.app.goo.gl/as44dXnC14xsFxpCA': { lat: 11.5693, lng: 104.9181 }, // Near Central Market, PP
  'https://maps.app.goo.gl/hJyRppuB7rYR3dST8': { lat: 11.5448, lng: 104.9038 }, // Chak Angre Krom, PP
  'https://maps.app.goo.gl/fxRwFJJ1c6om5jhf8': { lat: 11.5549, lng: 104.8820 }, // Veng Sreng Blvd, PP
  'https://maps.app.goo.gl/XdMbLhoWJ9vMQiPw7': { lat: 11.562, lng: 102.969 }, // Koh Kong
  'https://maps.app.goo.gl/91Y4PLNYKkpPJK3NA': { lat: 12.871, lng: 102.583 }, // Pailin
  'https://maps.app.goo.gl/Kfu2SZhmtfQ8SZzQA': { lat: 12.716, lng: 104.978 }, // Kampong Thom
  'https://maps.app.goo.gl/EqeWeY4vFabpiYYm9': { lat: 14.095, lng: 103.522 }, // Samraong, Oddar Meanchey
  'https://maps.app.goo.gl/xeW3cXfEbDPEVnQh9': { lat: 13.784, lng: 104.978 }, // Preah Vihear City
  'https://maps.app.goo.gl/P3zMP4qycpPTgJyAA': { lat: 13.578, lng: 106.984 }, // Banlung, Ratanakiri
  'https://maps.app.goo.gl/ZQzBquAWTVnad6eq7': { lat: 12.483, lng: 107.194 }, // Sen Monorom, Mondulkiri
  'https://maps.app.goo.gl/FyHfWqk9KZJeJBWN6': { lat: 12.046, lng: 105.462 } // Kampong Cham
};


const parseCoordinatesFromUrl = (url: string): { lat: number; lng: number } | null => {
  if (shortUrlCoords[url]) {
    return shortUrlCoords[url];
  }

  // Regex for /@lat,lng,zoom/
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch && atMatch.length >= 3) {
    return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  }

  // Regex for ?q=lat,lng or &ll=lat,lng
  const qMatch = url.match(/[?&](q|ll)=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (qMatch && qMatch.length >= 4) {
    return { lat: parseFloat(qMatch[2]), lng: parseFloat(qMatch[3]) };
  }
  
  return null;
};

export const processLocations = (): Location[] => {
  return rawLocations.map((locationData: LocationData, index: number) => {
    const coords = parseCoordinatesFromUrl(locationData.google_map);
    return {
      ...locationData,
      id: `${index}-${locationData.location_title.replace(/\s/g, '')}`,
      lat: coords?.lat ?? null,
      lng: coords?.lng ?? null,
    };
  }).filter(location => location.lat !== null && location.lng !== null);
};
