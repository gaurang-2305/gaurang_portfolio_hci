import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Sparkles, Command, Menu, X, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useHciLens } from '../context/HciLensContext';
import { HciMarker } from './HciMarker';

interface NavbarProps {
  onOpenSus: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSus, onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme();
  const { isLensActive, toggleLens } = useHciLens();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Academic', href: '/#academic' },
    { label: 'Activities', href: '/#activities' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate(`/${targetId}`);
      }
    } else {
      navigate(href);
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:font-mono focus:font-bold focus:shadow-lg focus:rounded"
      >
        Skip to main content &rarr;
      </a>

      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-bg/90 border-b border-line transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Monogram Brand */}
          <Link
            to="/"
            onClick={handleBrandClick}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Gaurang Upadhyay Portfolio Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded border border-line bg-surface group-hover:border-accent transition-colors shadow-drafting-sm">
              <span className="font-serif text-xl font-bold text-accent">G.</span>
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-accent" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-accent" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-serif text-base font-bold text-text group-hover:text-accent transition-colors">
                Gaurang Upadhyay
              </span>
              <span className="block font-mono text-[11px] text-muted tracking-tight">
                VJTI &bull; Full-Stack &amp; AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 relative" aria-label="Primary Navigation">
            <HciMarker id="lens-04" className="absolute -left-6 top-1/2 -translate-y-1/2" />
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.replace('/', ''));
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    isActive
                      ? 'text-accent font-bold bg-surface border border-line'
                      : 'text-text/80 hover:text-accent hover:bg-surface/50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Rate Site SUS Button */}
            <button
              onClick={onOpenSus}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-dashed border-accent/70 hover:border-accent hover:bg-accent/10 text-xs font-mono text-accent transition-colors min-h-[44px]"
              aria-label="Rate this site using System Usability Scale questionnaire"
            >
              <Award size={15} />
              <span className="hidden md:inline font-bold">Rate Site (SUS)</span>
            </button>

            {/* HCI Lens Toggle */}
            <button
              onClick={toggleLens}
              aria-pressed={isLensActive}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-mono transition-colors min-h-[44px] ${
                isLensActive
                  ? 'bg-accent text-bg border-accent font-bold shadow-drafting-sm'
                  : 'bg-surface border-line text-muted hover:text-text hover:border-accent'
              }`}
              title="Toggle HCI Principles Lens (Architectural Annotations)"
              aria-label="Toggle HCI Principles Lens annotations"
            >
              <Sparkles size={15} />
              <span className="hidden sm:inline">HCI Lens</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-muted hover:text-text transition-colors min-h-[44px]"
              aria-label="Open Command Palette (Ctrl+K or Slash)"
              title="Quick Search & Navigation (Ctrl+K)"
            >
              <Command size={14} className="text-accent" />
              <span className="hidden xl:inline">Ctrl K</span>
            </button>

            {/* Theme Toggle */}
            <div className="relative inline-flex items-center">
              <HciMarker id="lens-05" className="absolute -top-2 -left-2" />
              <button
                onClick={toggleTheme}
                className="p-2 rounded bg-surface border border-line hover:border-accent text-text transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`Switch to ${theme === 'dark' ? 'Light "Paper"' : 'Dark "Midnight Ink"'} mode`}
                title={`Theme: currently ${theme}`}
              >
                {theme === 'dark' ? <Sun size={18} className="text-accent" /> : <Moon size={18} className="text-accent" />}
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded bg-surface border border-line text-text min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-b border-line px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-150">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="block px-3 py-2 rounded text-sm font-mono text-text hover:text-accent hover:bg-bg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-line/50 flex flex-col gap-2">
              <Link
                to="/usability"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-xs font-mono text-accent hover:bg-bg"
              >
                &bull; HCI Usability Suite &amp; Heuristics
              </Link>
              <Link
                to="/usability/test"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded text-xs font-mono text-accent hover:bg-bg"
              >
                &bull; Live Usability Testing Protocol (/usability/test)
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
