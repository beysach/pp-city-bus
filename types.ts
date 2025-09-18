
export interface LocationData {
  google_map: string;
  location_title: string;
  contact: string[];
}

export interface Location extends LocationData {
  id: string;
  lat: number | null;
  lng: number | null;
}
