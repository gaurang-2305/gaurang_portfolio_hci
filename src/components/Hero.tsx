import React from 'react';
import { ArrowRight, Download, Mail, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { HciMarker } from './HciMarker';
import profile from '../data/profile.json';

interface HeroProps {
  onOpenSus: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSus }) => {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Technical Profile Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent tracking-wider uppercase font-semibold">
                B.Tech Computer Engineering &bull; VJTI Mumbai
              </span>
              <span className="text-line">&bull;</span>
              <span className="font-mono text-xs text-muted">
                CGPA 8.65
              </span>
            </div>

            {/* Main Greeting with Crisp Modern Typography */}
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight">
                Hi, I'm{' '}
                <span className="text-accent underline decoration-accent/40 underline-offset-8">
                  Gaurang Upadhyay.
                </span>
              </h1>
            </div>

            {/* Subtitle & Focus */}
            <p className="text-lg sm:text-xl text-text font-medium leading-relaxed max-w-2xl">
              Building AI-powered full-stack systems, from RAG chatbots to ocean-data platforms.
            </p>

            <p className="text-base text-muted max-w-xl leading-relaxed">
              Third-year Computer Engineering undergraduate at <strong className="text-text font-semibold">Veermata Jijabai Technological Institute (VJTI)</strong>, Mumbai. 
              Engineering deterministic architectures where applied AI (RAG, AST-verified NL2SQL, and ML distress forecasting) meets clean, robust backends.
            </p>

            {/* Action CTA Cluster */}
            <div className="pt-4 flex flex-wrap items-center gap-3 relative">
              
              {/* Primary CTA */}
              <div className="relative">
                <HciMarker id="lens-01" className="absolute -top-3 -right-3" />
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-accent/90 transition-all shadow-md min-h-[44px]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Secondary CTA (Resume with explicit signifier) */}
              <div className="relative">
                <HciMarker id="lens-02" className="absolute -top-3 -right-3" />
                <a
                  href={profile.resumePdf}
                  download="Gaurang_Upadhyay_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface border border-line hover:border-accent text-xs font-mono text-text transition-colors shadow-xs min-h-[44px]"
                  title="Download Gaurang's Resume PDF (142 KB)"
                >
                  <Download size={15} className="text-accent" />
                  <span>Resume (PDF, 142 KB)</span>
                </a>
              </div>

              {/* Tertiary Contact CTA (Smooth scrolls and jumps to working form) */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface border border-line hover:border-accent text-xs font-mono text-muted hover:text-text transition-colors min-h-[44px]"
              >
                <Mail size={15} />
                <span>Contact Me</span>
              </a>

              {/* Rate Site CTA */}
              <button
                type="button"
                onClick={onOpenSus}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-dashed border-accent/70 hover:border-accent hover:bg-accent/10 text-xs font-mono text-accent transition-colors min-h-[44px]"
              >
                <Award size={15} />
                <span>Rate site (SUS)</span>
              </button>
            </div>

            {/* Social & Verification Icon Bar */}
            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-muted">
              <span className="tracking-wider uppercase text-[11px]">Direct Channels:</span>
              <div className="flex items-center gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-surface border border-line hover:border-accent text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                  aria-label={`GitHub Profile (${profile.github})`}
                  title={`GitHub: ${profile.github}`}
                >
                  <GithubIcon size={18} />
                </a>

                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-surface border border-line hover:border-accent text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                    aria-label={`LinkedIn Profile (${profile.linkedin})`}
                    title={`LinkedIn: ${profile.linkedin}`}
                  >
                    <LinkedinIcon size={18} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert("Configure your LinkedIn URL in src/data/profile.json")}
                    className="p-2.5 rounded-lg bg-surface border border-line hover:border-accent text-muted hover:text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="LinkedIn Profile (Pending)"
                    title="LinkedIn: Configure in src/data/profile.json"
                  >
                    <LinkedinIcon size={18} />
                  </button>
                )}

                <a
                  href={`mailto:${profile.email}`}
                  className="p-2.5 rounded-lg bg-surface border border-line hover:border-accent text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
                  aria-label={`Send Email to ${profile.email}`}
                  title={`Email: ${profile.email}`}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Executive Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer Glow & Micro-Border */}
              <div className="relative rounded-2xl bg-surface border-2 border-line/80 overflow-hidden shadow-2xl p-2.5 group hover:border-accent transition-colors">
                
                {/* Photo Viewport */}
                <div className="relative rounded-xl overflow-hidden bg-bg aspect-[4/5] flex items-center justify-center border border-line/50">
                  <img
                    src="/assets/profile/photo.jpg"
                    alt="Gaurang Upadhyay - VJTI Mumbai"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="eager"
                  />
                  
                  {/* Subtle Coordinate Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-bg/90 backdrop-blur-md border border-line text-[11px] font-mono text-muted flex items-center justify-between">
                    <span className="font-semibold text-text">Gaurang Upadhyay</span>
                    <span className="text-accent font-bold">VJTI_MUMBAI</span>
                  </div>
                </div>
              </div>

              {/* Scientific Caption */}
              <div className="mt-3 text-center">
                <p className="font-mono text-xs text-muted">
                  B.Tech Computer Engineering &bull; VJTI Mumbai &bull; Class of 2026
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
