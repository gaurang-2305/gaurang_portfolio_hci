import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Layers, Tag } from 'lucide-react';
import { GithubIcon } from './Icons';
import projectsDataRaw from '../data/projects.json';
import type { Project } from '../types';
import { HciMarker } from './HciMarker';
import { getAssetUrl } from '../utils/assets';

const projectsData = projectsDataRaw as Project[];

interface ProjectsSectionProps {
  initialFilter?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ initialFilter = 'All' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>(initialFilter);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach(p => p.tags.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === 'All' ||
        p.tags.includes(selectedTag) ||
        p.stack.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <section id="projects" className="py-20 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4 mb-10">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              § 04 / SYSTEM SPECIFICATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mt-1">
              Project Engineering Catalog
            </h2>
          </div>
          <p className="font-mono text-xs text-muted mt-2 sm:mt-0">
            SPEC SHEETS P-01 THROUGH P-03
          </p>
        </div>

        {/* Filter & Search Bar with Direct Manipulation HCI Marker */}
        <div className="mb-10 space-y-4 relative">
          <HciMarker id="lens-06" className="absolute -top-3 -left-3" />

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems by keyword or stack..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-surface border border-line text-xs font-mono text-text placeholder:text-muted/60 focus:border-accent focus:outline-none"
                aria-label="Search projects by keyword"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted hover:text-text"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Result Count Announcement for Accessibility */}
            <div
              aria-live="polite"
              className="text-xs font-mono text-muted px-3 py-2 rounded bg-surface border border-line self-start md:self-auto"
            >
              Showing <span className="text-accent font-bold">{filteredProjects.length}</span> of {projectsData.length} specifications
            </div>
          </div>

          {/* Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-muted mr-1 flex items-center gap-1">
              <Tag size={12} className="text-accent" />
              Filter:
            </span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              const count = tag === 'All' 
                ? projectsData.length 
                : projectsData.filter(p => p.tags.includes(tag) || p.stack.includes(tag)).length;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 min-h-[36px] ${
                    isSelected
                      ? 'bg-accent text-bg font-bold border border-accent shadow-drafting-sm'
                      : 'bg-surface border border-line text-muted hover:text-text hover:border-accent'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{tag}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-bg/30 text-bg' : 'bg-bg text-muted'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Spec Sheet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="draft-card overflow-hidden flex flex-col justify-between group crosshair-corner"
            >
              <div>
                {/* Blueprint Schematic Header Visual */}
                <div className="relative aspect-[16/10] bg-bg overflow-hidden border-b border-line">
                  <img
                    src={getAssetUrl(project.coverImage)}
                    alt={`${project.title} architectural blueprint`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-bg/90 backdrop-blur-xs border border-line text-[10px] font-mono font-bold text-accent">
                    {project.id} &bull; {project.year}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6">
                  
                  {/* Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg border border-line text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-text group-hover:text-accent transition-colors mb-2">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="font-mono text-xs text-accent/90 mb-3 line-clamp-1">
                    {project.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-text/80 leading-relaxed mb-6 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Stack Chips in JetBrains Mono */}
                  <div className="space-y-1.5 pt-3 border-t border-line/60">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted uppercase tracking-wider">
                      <Layers size={11} className="text-accent" />
                      <span>System Architecture Stack:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-line text-text/90"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 6 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-muted">
                          +{project.stack.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t border-line bg-bg/40 flex items-center justify-between">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-text transition-colors min-h-[44px]"
                  aria-label={`View ${project.title} GitHub repository`}
                >
                  <GithubIcon size={15} />
                  <span>Repository</span>
                </a>

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-accent-2 font-bold transition-colors min-h-[44px]"
                >
                  <span>Spec Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-lg bg-surface border border-line">
            <p className="font-serif text-lg font-bold text-text mb-2">No matching specifications found</p>
            <p className="font-mono text-xs text-muted mb-4">
              Try adjusting your query "{searchQuery}" or selecting the "All" tag.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
              }}
              className="px-4 py-2 rounded bg-accent text-bg font-mono font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
