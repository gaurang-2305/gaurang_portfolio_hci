import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SusModal } from './components/SusModal';
import { CommandPalette } from './components/CommandPalette';
import { HciPopover } from './components/HciPopover';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { UsabilityPage } from './pages/UsabilityPage';
import { UsabilityTestModePage } from './pages/UsabilityTestModePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [susModalOpen, setSusModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const location = useLocation();

  // Handle smooth scroll when navigating to hash anchors (#about, #activities, etc.)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      let attempts = 0;
      const maxAttempts = 15;

      const attemptScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(attemptScroll, 60);
        }
      };

      const timer = setTimeout(attemptScroll, 40);
      return () => clearTimeout(timer);
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  // Global keyboard shortcuts: Ctrl+K, Cmd+K, '/', '?'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      } else if (e.key === '?' && !isInput) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text selection:bg-accent selection:text-bg">
      <Navbar
        onOpenSus={() => setSusModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenSus={() => setSusModalOpen(true)} />} />
          
          {/* Section route aliases so navigating to /activities or /about always routes correctly */}
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/academic" element={<Navigate to="/#academic" replace />} />
          <Route path="/activities" element={<Navigate to="/#activities" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />

          {/* Deep Pages */}
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/usability" element={<UsabilityPage />} />
          <Route path="/usability/test" element={<UsabilityTestModePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />

      {/* Overlays */}
      <SusModal
        isOpen={susModalOpen}
        onClose={() => setSusModalOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenSus={() => setSusModalOpen(true)}
      />

      <HciPopover />
    </div>
  );
};
