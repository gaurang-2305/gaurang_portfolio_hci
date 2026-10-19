import React, { useState } from 'react';
import { GitCommit, GitPullRequest, ChevronDown, ChevronUp, ExternalLink, Tag } from 'lucide-react';
import activitiesDataRaw from '../data/activities.json';
import type { ActivityItem } from '../types';

const activitiesData = activitiesDataRaw as ActivityItem[];

export const ActivitiesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('act-01');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="activities" className="py-20 border-b border-line bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4 mb-12">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              § 03 / CHRONOLOGY &amp; CONTRIBUTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mt-1">
              Activities &amp; Open-Source Log
            </h2>
          </div>
          <p className="font-mono text-xs text-muted mt-2 sm:mt-0">
            GIT LOG FORMAT &bull; RIGOROUS RECORD (NO UNVERIFIED INTERNSHIPS)
          </p>
        </div>

        {/* Git-Log Style Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-line before:border-l before:border-dashed before:border-accent/40">
          {activitiesData.map((act) => {
            const isExpanded = expandedId === act.id;
            return (
              <div key={act.id} className="relative group">
                
                {/* Git Node Indicator */}
                <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-accent flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>

                {/* Git Commit Card */}
                <div className="draft-card overflow-hidden">
                  
                  {/* Commit Header Row */}
                  <div
                    onClick={() => toggleExpand(act.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none bg-surface hover:bg-bg/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-accent font-bold flex items-center gap-1">
                          <GitCommit size={14} />
                          commit {act.commitHash}
                        </span>
                        <span className="text-line">&bull;</span>
                        <span className="font-mono text-xs text-muted">
                          {act.date}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg border border-line text-text flex items-center gap-1">
                          <Tag size={10} className="text-accent" />
                          {act.type}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-text group-hover:text-accent transition-colors">
                        {act.title}
                      </h3>
                      <p className="text-xs text-muted max-w-2xl">
                        {act.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono px-2 py-1 rounded bg-accent/10 border border-accent/30 text-accent font-semibold">
                        {act.status}
                      </span>
                      <button
                        type="button"
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                        className="p-1 rounded text-muted hover:text-text hover:bg-bg"
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  {isExpanded && (
                    <div className="p-5 border-t border-line bg-bg/50 space-y-4 animate-in fade-in duration-150">
                      <div>
                        <span className="font-mono text-xs text-accent tracking-wider uppercase block mb-1">
                          Detailed Engineering Log:
                        </span>
                        <p className="text-xs sm:text-sm text-text/90 leading-relaxed font-mono">
                          {act.details}
                        </p>
                      </div>

                      {act.prPending && (
                        <div className="p-3 rounded bg-accent/10 border border-accent/30 text-xs font-mono text-accent flex items-center gap-2">
                          <GitPullRequest size={16} />
                          <span>PR Links: Marked as pending user submission at Milestone C.</span>
                        </div>
                      )}

                      {act.links && act.links.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-2">
                          {act.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-line hover:border-accent text-xs font-mono text-text hover:text-accent transition-colors"
                            >
                              <span>{link.label}</span>
                              <ExternalLink size={12} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
