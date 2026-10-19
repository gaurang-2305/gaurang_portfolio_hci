import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Layers, CheckCircle2, AlertTriangle, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import projectsDataRaw from '../data/projects.json';
import type { Project } from '../types';
import { getAssetUrl } from '../utils/assets';

const projects = projectsDataRaw as Project[];

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const project = projects[currentIndex];

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || !project) return;

      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev! + 1) % project.screenshots.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev! - 1 + project.screenshots.length) % project.screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project]);

  if (!project) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-text mb-4">Project Specification Not Found</h1>
        <p className="font-mono text-sm text-muted mb-8">The requested project slug "{slug}" does not exist.</p>
        <button
          onClick={() => navigate('/#projects')}
          className="px-5 py-2.5 rounded bg-accent text-bg font-mono font-bold text-xs uppercase"
        >
          &larr; Return to Project Catalog
        </button>
      </main>
    );
  }

  const tocItems = [
    { id: 'overview', title: 'System Overview' },
    { id: 'problem', title: 'Problem & Engineering Challenge' },
    { id: 'solution', title: 'Architecture & Solution' },
    { id: 'features', title: 'Key Functional Capabilities' },
    { id: 'gallery', title: 'Schematic Screenshot Gallery' },
    { id: 'reflection', title: 'Engineering Reflection (What I Learned)' },
  ];

  return (
    <main id="main-content" className="py-12 border-b border-line min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} />
            <span>&larr; Back to Catalog</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span>{project.id}</span>
            <span>&bull;</span>
            <span className="text-accent">{project.year}</span>
          </div>
        </div>

        {/* Project Header Title Block */}
        <div className="border-b border-line pb-8 mb-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded text-xs font-mono bg-surface border border-line text-accent font-semibold">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-3">
            {project.title}
          </h1>

          <p className="font-mono text-base text-accent max-w-3xl mb-6">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-text transition-colors shadow-drafting-sm min-h-[44px]"
            >
              <GithubIcon size={16} className="text-accent" />
              <span>Inspect Source Repository</span>
              <ExternalLink size={12} className="text-muted" />
            </a>

            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-accent text-bg font-mono font-bold text-xs uppercase transition-opacity hover:opacity-95 shadow-drafting min-h-[44px]"
              >
                <span>Launch Live System</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <span className="px-3 py-2 rounded bg-bg border border-line text-xs font-mono text-muted">
                Demo Deployment: Local / Air-Gapped Prototype
              </span>
            )}
          </div>
        </div>

        {/* Two-Column Grid: Content + Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Specification Body */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section id="overview" className="scroll-mt-24 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-text border-b border-line pb-2">
                1. System Overview
              </h2>
              <p className="text-base text-text/90 leading-relaxed">
                {project.summary}
              </p>

              {/* Stack Details */}
              <div className="p-5 rounded-lg bg-surface border border-line space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
                  <Layers size={14} />
                  <span>Full Technology &amp; Tooling Architecture</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded bg-bg border border-line text-xs font-mono text-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Problem */}
            <section id="problem" className="scroll-mt-24 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-text border-b border-line pb-2">
                2. Problem &amp; Engineering Challenge
              </h2>
              <p className="text-sm sm:text-base text-text/90 leading-relaxed bg-bg/60 p-5 rounded border border-line">
                {project.problem}
              </p>
            </section>

            {/* Solution */}
            <section id="solution" className="scroll-mt-24 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-text border-b border-line pb-2">
                3. Architecture &amp; Solution
              </h2>
              <p className="text-sm sm:text-base text-text/90 leading-relaxed">
                {project.solution}
              </p>
            </section>

            {/* Key Features */}
            <section id="features" className="scroll-mt-24 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-text border-b border-line pb-2">
                4. Key Functional Capabilities
              </h2>
              <ul className="grid grid-cols-1 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="p-4 rounded bg-surface border border-line flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-text/90 leading-relaxed">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Screenshot Gallery with Lightbox Triggers */}
            <section id="gallery" className="scroll-mt-24 space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <h2 className="font-serif text-2xl font-bold text-text">
                  5. Schematic Screenshot Gallery
                </h2>
                <span className="text-xs font-mono text-muted">
                  Click to open accessible keyboard lightbox
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="draft-card overflow-hidden cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] bg-bg overflow-hidden border-b border-line">
                      <img
                        src={getAssetUrl(shot.url)}
                        alt={shot.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-bg font-mono font-bold text-xs">
                          <Eye size={14} />
                          Enlarge Lightbox
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-surface text-xs font-mono text-muted">
                      {shot.caption}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What I Learned (Pending Milestone B input) */}
            <section id="reflection" className="scroll-mt-24 space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <h2 className="font-serif text-2xl font-bold text-text">
                  6. Engineering Reflection
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent/20 text-accent font-bold border border-accent/30">
                  TODO: Milestone B
                </span>
              </div>
              <div className="p-5 rounded bg-surface border border-dashed border-accent/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold">
                  <AlertTriangle size={15} />
                  <span>WHAT I LEARNED &bull; REVIEW DRAFT</span>
                </div>
                <p className="text-xs sm:text-sm text-text/80 leading-relaxed font-mono">
                  {project.whatILearned}
                </p>
              </div>
            </section>

            {/* Previous / Next Project Navigation */}
            <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="flex items-center gap-3 p-3 rounded hover:bg-surface border border-line text-left text-xs font-mono text-muted hover:text-text transition-colors w-full sm:w-auto"
                >
                  <ChevronLeft size={16} className="text-accent" />
                  <div>
                    <span className="text-[10px] text-accent uppercase block">Previous Spec</span>
                    <span className="font-bold text-text">{prevProject.title}</span>
                  </div>
                </Link>
              ) : <div />}

              {nextProject && (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="flex items-center gap-3 p-3 rounded hover:bg-surface border border-line text-right text-xs font-mono text-muted hover:text-text transition-colors w-full sm:w-auto ml-auto"
                >
                  <div>
                    <span className="text-[10px] text-accent uppercase block">Next Spec</span>
                    <span className="font-bold text-text">{nextProject.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-accent" />
                </Link>
              )}
            </div>

          </div>

          {/* Sticky Desktop TOC Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            <div className="p-5 rounded-lg bg-surface border border-line shadow-drafting-sm space-y-4">
              <div className="font-mono text-xs text-accent uppercase font-bold tracking-wider border-b border-line pb-2">
                On This Page
              </div>
              <nav className="space-y-1.5" aria-label="Table of contents">
                {tocItems.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs font-mono text-muted hover:text-accent py-1 transition-colors"
                  >
                    &bull; {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="p-4 rounded-lg bg-bg border border-line text-xs font-mono text-muted space-y-2">
              <span className="text-accent font-bold uppercase block">SPEC SHEET DATA TRUTH:</span>
              <p>
                Parsed from verified resume records. Live demo URLs and high-res screenshots pending Milestone B.
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* Accessible Keyboard Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center"
          >
            {/* Top Bar Controls */}
            <div className="w-full flex items-center justify-between text-white font-mono text-xs mb-3 px-2">
              <span>
                Screenshot {lightboxIndex + 1} of {project.screenshots.length}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-muted text-[11px] hidden sm:inline">
                  Use [&larr; &rarr;] to navigate &bull; [Esc] to exit
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1 rounded hover:bg-white/10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close lightbox"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div className="relative w-full aspect-[16/10] bg-surface rounded-lg overflow-hidden border-2 border-line flex items-center justify-center">
              <img
                src={getAssetUrl(project.screenshots[lightboxIndex].url)}
                alt={project.screenshots[lightboxIndex].caption}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + project.screenshots.length) % project.screenshots.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-line min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % project.screenshots.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-line min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Caption */}
            <div className="w-full mt-3 p-3 rounded bg-surface/80 border border-line text-xs font-mono text-text text-center">
              {project.screenshots[lightboxIndex].caption}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
