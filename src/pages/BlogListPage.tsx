import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowRight, Tag, BookOpen } from 'lucide-react';
import blogDataRaw from '../data/blog-posts.json';
import type { BlogPost } from '../types';

const blogPosts = blogDataRaw as BlogPost[];

export const BlogListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach(b => b.tags.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(b => {
      const matchesSearch =
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === 'All' || b.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <main id="main-content" className="py-16 border-b border-line min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="border-b border-line pb-8 mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              FIELD NOTES &bull; TECHNICAL DISPATCHES
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg border border-line text-muted">
              ARCHIVE
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-3">
            Engineering Field Notes
          </h1>
          <p className="text-base text-muted max-w-2xl">
            Deep dives into AST validation, RAG precision on financial disclosures, and building deterministic full-stack AI interfaces.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-surface border border-line text-xs font-mono text-text placeholder:text-muted/60 focus:border-accent focus:outline-none"
                aria-label="Search articles"
              />
            </div>

            <div className="text-xs font-mono text-muted px-3 py-2 rounded bg-surface border border-line">
              Articles: <span className="text-accent font-bold">{filteredPosts.length}</span> published
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted mr-1 flex items-center gap-1">
              <Tag size={12} className="text-accent" />
              Topic:
            </span>
            {allTags.map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-all min-h-[36px] ${
                    isSelected
                      ? 'bg-accent text-bg font-bold border border-accent shadow-drafting-sm'
                      : 'bg-surface border border-line text-muted hover:text-text hover:border-accent'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.slug}
              className="draft-card p-6 flex flex-col justify-between group crosshair-corner"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-accent" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={13} className="text-accent" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg border border-line text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h2 className="font-serif text-2xl font-bold text-text group-hover:text-accent transition-colors mb-3">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-text/80 leading-relaxed mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs font-mono text-muted">Technical Brief</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent-2 font-bold transition-colors min-h-[44px]"
                >
                  <span>Read Field Note</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="p-12 text-center rounded-lg bg-surface border border-line space-y-3">
            <BookOpen size={32} className="mx-auto text-accent" />
            <h3 className="font-serif text-xl font-bold text-text">No Field Notes Found</h3>
            <p className="font-mono text-xs text-muted max-w-md mx-auto">
              No technical dispatches matched your query "{searchQuery}". Additional articles can be added in `portfolio-assets/blog/*.md`.
            </p>
          </div>
        )}

      </div>
    </main>
  );
};
