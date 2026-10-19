import React, { useEffect, useRef } from 'react';
import { useHciLens } from '../context/HciLensContext';
import { X, BookOpen, Compass, CheckCircle } from 'lucide-react';

export const HciPopover: React.FC = () => {
  const { activeMarker, closeMarker } = useHciLens();
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeMarker) {
      closeBtnRef.current?.focus();
    }
  }, [activeMarker]);

  if (!activeMarker) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hci-popover-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={closeMarker}
    >
      <div
        ref={popoverRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface border-2 border-accent rounded-lg shadow-2xl p-6 text-text relative animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-bg font-mono font-bold text-sm">
              §{activeMarker.number}
            </span>
            <div>
              <span className="text-xs font-mono tracking-widest text-accent uppercase block">
                HCI Architectural Annotation
              </span>
              <h3 id="hci-popover-title" className="font-serif text-xl font-bold">
                {activeMarker.principle}
              </h3>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={closeMarker}
            className="p-1 rounded-md text-muted hover:text-text hover:bg-bg transition-colors"
            aria-label="Close HCI Principle details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
              <Compass size={14} className="text-accent" />
              <span>THEORETICAL ORIGIN & SCHOLAR</span>
            </div>
            <p className="font-medium text-text bg-bg/50 px-3 py-1.5 rounded-md border border-line">
              {activeMarker.theorist}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-1">
              <BookOpen size={14} className="text-accent" />
              <span>CORE HUMAN-COMPUTER INTERACTION PRINCIPLE</span>
            </div>
            <p className="text-text/90 italic leading-relaxed">
              "{activeMarker.definition}"
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent mb-1">
              <CheckCircle size={14} />
              <span className="font-bold">HOW THIS COMPONENT IMPLEMENTS IT</span>
            </div>
            <p className="text-text/90 leading-relaxed bg-accent/5 p-3 rounded-md border border-accent/20">
              {activeMarker.application}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-line flex items-center justify-between text-xs font-mono text-muted">
          <span>Press [Esc] or click outside to dismiss</span>
          <button
            onClick={closeMarker}
            className="px-3 py-1 rounded bg-bg border border-line hover:border-accent text-text text-xs transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
