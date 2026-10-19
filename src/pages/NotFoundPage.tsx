import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main id="main-content" className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full draft-card p-8 space-y-6 crosshair-corner">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mx-auto">
          <Compass size={32} />
        </div>

        <div>
          <span className="font-mono text-xs text-accent uppercase tracking-widest block">
            ERROR 404 &bull; DISCONNECTED SPECIFICATION
          </span>
          <h1 className="font-serif text-3xl font-bold text-text mt-2">
            Sheet Not Found
          </h1>
          <p className="text-xs font-mono text-muted mt-2 leading-relaxed">
            The requested URI does not map to any active engineering section or project record.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-bg font-mono font-bold text-xs uppercase tracking-wider shadow-drafting min-h-[44px]"
          >
            <ArrowLeft size={16} />
            <span>Return to Drafting Sheet 01</span>
          </Link>
        </div>
      </div>
    </main>
  );
};
