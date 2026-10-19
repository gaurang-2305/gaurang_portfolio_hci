import React from 'react';
import { useHciLens } from '../context/HciLensContext';

interface HciMarkerProps {
  id: string; // matches id in hci-lens.json
  className?: string;
}

export const HciMarker: React.FC<HciMarkerProps> = ({ id, className = '' }) => {
  const { isLensActive, allMarkers, openMarker } = useHciLens();
  if (!isLensActive) return null;

  const marker = allMarkers.find(m => m.id === id);
  if (!marker) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openMarker(marker, e.currentTarget);
      }}
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-bg font-mono text-xs font-bold shadow-md hover:scale-110 focus:scale-110 transition-transform cursor-pointer z-30 select-none ${className}`}
      title={`HCI Principle #${marker.number}: ${marker.principle} (Click to inspect)`}
      aria-label={`Inspect HCI Principle #${marker.number}: ${marker.principle}`}
    >
      §{marker.number}
    </button>
  );
};
