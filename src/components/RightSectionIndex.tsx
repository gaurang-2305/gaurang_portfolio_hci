import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const RightSectionIndex: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sections = [
    { id: 'hero', label: '00', title: 'PROFILE' },
    { id: 'about', label: '01', title: 'ABOUT' },
    { id: 'academic', label: '02', title: 'ACADEMIC' },
    { id: 'activities', label: '03', title: 'ACTIVITIES' },
    { id: 'projects', label: '04', title: 'PROJECTS' },
    { id: 'contact', label: '06', title: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Right-Edge Scroll-Spy Index */}
      <aside
        aria-label="Drawing Sheet Index"
        className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30 pointer-events-auto"
      >
        <div className="p-3 rounded-lg bg-surface/90 backdrop-blur-xs border border-line shadow-lg space-y-2">
          <div className="font-mono text-[9px] text-accent tracking-widest uppercase border-b border-line pb-1.5 px-1">
            SHEET INDEX
          </div>
          {sections.map(s => {
            const isActive = activeSection === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`group flex items-center gap-2 px-1.5 py-1 rounded text-xs font-mono transition-colors ${
                  isActive ? 'text-accent font-bold' : 'text-muted hover:text-text'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-transform ${
                    isActive ? 'bg-accent scale-125' : 'bg-line group-hover:bg-muted'
                  }`}
                />
                <span className="text-[10px]">§ {s.label}</span>
                <span className="hidden group-hover:inline text-[9px] tracking-wider uppercase opacity-80">
                  {s.title}
                </span>
              </a>
            );
          })}
        </div>
      </aside>

      {/* Floating Back to Top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-accent text-bg shadow-drafting hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          aria-label="Scroll back to top"
          title="Return to top of drafting sheet"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
};
