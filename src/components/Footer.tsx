import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, FileText, Heart } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = 'October 2026';

  return (
    <footer className="bg-surface border-t border-line text-text py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-line pb-8">
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-accent">G.</span>
              <span className="font-serif text-lg font-bold">Gaurang Upadhyay</span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              Third-year Computer Engineering undergraduate at Veermata Jijabai Technological Institute (VJTI), Mumbai. 
              Engineering deterministic systems and applied AI architectures.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <span>Status: VJTI B.Tech (CGPA 8.65)</span>
              <span>&bull;</span>
              <span className="text-accent font-semibold">Active Development</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h4 className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              HCI Documentation &amp; Research
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <Link to="/usability" className="hover:text-accent flex items-center gap-1.5 transition-colors">
                  <Award size={13} className="text-accent" />
                  <span>Usability Evaluation &amp; SUS Metrics (/usability)</span>
                </Link>
              </li>
              <li>
                <Link to="/usability/test" className="hover:text-accent flex items-center gap-1.5 transition-colors">
                  <Award size={13} className="text-accent" />
                  <span>Interactive Usability Test Mode (/usability/test)</span>
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-accent flex items-center gap-1.5 transition-colors">
                  <FileText size={13} className="text-accent" />
                  <span>Human-Computer Interaction Design Rationale</span>
                </a>
              </li>
              <li>
                <a href={getAssetUrl('/assets/profile/Gaurang_Upadhyay_Resume.pdf')} download className="hover:text-accent flex items-center gap-1.5 transition-colors">
                  <FileText size={13} className="text-accent" />
                  <span>Download Resume (PDF, 142 KB)</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              Privacy &amp; Telemetry Policy
            </h4>
            <div className="p-3 rounded bg-bg border border-line text-[11px] font-mono text-muted space-y-1">
              <div className="flex items-center gap-1.5 text-accent font-bold">
                <ShieldCheck size={14} />
                <span>Zero Tracking Policy</span>
              </div>
              <p>
                No third-party trackers, external tracking pixels, marketing cookies, or telemetry scripts are executed on this site.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            &copy; {currentYear} Gaurang Upadhyay &bull; Field Notes Technical Portfolio
          </div>
          <div className="flex items-center gap-2">
            <span>Last Compiled: {lastUpdated}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-accent">
              <span>Engineered with HCI Rigor</span>
              <Heart size={12} fill="currentColor" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
