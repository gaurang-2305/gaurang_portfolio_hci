import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { HciLensItem } from '../types';
import hciLensDataRaw from '../data/hci-lens.json';

const hciLensData = hciLensDataRaw as HciLensItem[];

interface HciLensContextType {
  isLensActive: boolean;
  toggleLens: () => void;
  activeMarker: HciLensItem | null;
  openMarker: (marker: HciLensItem, triggerEl?: HTMLElement) => void;
  closeMarker: () => void;
  allMarkers: HciLensItem[];
}

const HciLensContext = createContext<HciLensContextType | undefined>(undefined);

export const HciLensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLensActive, setIsLensActive] = useState<boolean>(() => {
    return localStorage.getItem('hci-lens-active') === 'true';
  });
  const [activeMarker, setActiveMarker] = useState<HciLensItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    localStorage.setItem('hci-lens-active', String(isLensActive));
  }, [isLensActive]);

  const toggleLens = () => {
    setIsLensActive(prev => !prev);
  };

  const openMarker = (marker: HciLensItem, triggerEl?: HTMLElement) => {
    if (triggerEl) triggerRef.current = triggerEl;
    setActiveMarker(marker);
  };

  const closeMarker = () => {
    setActiveMarker(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  };

  // Keyboard dismiss (Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMarker) {
        closeMarker();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMarker]);

  return (
    <HciLensContext.Provider
      value={{
        isLensActive,
        toggleLens,
        activeMarker,
        openMarker,
        closeMarker,
        allMarkers: hciLensData
      }}
    >
      {children}
    </HciLensContext.Provider>
  );
};

export const useHciLens = () => {
  const context = useContext(HciLensContext);
  if (!context) throw new Error('useHciLens must be used within HciLensProvider');
  return context;
};
