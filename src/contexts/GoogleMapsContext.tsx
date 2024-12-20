import React, { createContext, useContext, ReactNode } from 'react';
import { LoadScript, Libraries } from '@react-google-maps/api';

export const GOOGLE_MAPS_LIBRARIES: Libraries = ['places', 'geometry'];

interface GoogleMapsContextType {
  isLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({ isLoaded: false });

export const useGoogleMaps = () => useContext(GoogleMapsContext);

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <GoogleMapsContext.Provider value={{ isLoaded: true }}>
        {children}
      </GoogleMapsContext.Provider>
    </LoadScript>
  );
}
