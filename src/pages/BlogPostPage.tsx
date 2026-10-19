import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import blogDataRaw from '../data/blog-posts.json';
import type { BlogPost } from '../types';

const blogPosts = blogDataRaw as BlogPost[];

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentIndex = blogPosts.findIndex(b => b.slug === slug);
  const post = blogPosts[currentIndex];

  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!post) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-text mb-4">Field Note Not Found</h1>
        <p className="font-mono text-sm text-muted mb-8">The requested article slug "{slug}" does not exist.</p>
        <button
          onClick={() => navigate('/blog')}
          className="px-5 py-2.5 rounded bg-accent text-bg font-mono font-bold text-xs uppercase"
        >
          &larr; Back to Field Notes
        </button>
      </main>
    );
  }

  // Simple Markdown Parser for headings, paragraphs, and code blocks
  const renderMarkdown = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, idx) => {
      if (block.startsWith('### ')) {
        const text = block.replace('### ', '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <h3 key={idx} id={id} className="font-serif text-2xl font-bold text-text mt-8 mb-4 border-b border-line pb-2 scroll-mt-24">
            {text}
          </h3>
        );
      }

      if (block.startsWith('```')) {
        const lines = block.split('\n');
        const language = lines[0].replace('```', '') || 'plaintext';
        const code = lines.slice(1, -1).join('\n');
        return (
          <div key={idx} className="my-6 rounded-lg overflow-hidden border border-line bg-surface shadow-drafting-sm">
            <div className="bg-bg px-4 py-2 border-b border-line flex items-center justify-between text-[11px] font-mono text-muted">
              <span>SOURCE / {language.toUpperCase()}</span>
              <span>READ-ONLY EMBED</span>
            </div>
            <pre className="p-4 text-xs font-mono text-text/90 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      if (block.startsWith('1. ') || block.startsWith('- ')) {
        const items = block.split('\n');
        return (
          <ul key={idx} className="my-4 space-y-2 pl-4">
            {items.map((item, i) => (
              <li key={i} className="text-sm font-mono text-text/90 flex items-start gap-2">
                <span className="text-accent">&bull;</span>
                <span>{item.replace(/^[0-9]+\.\s+/, '').replace(/^-\s+/, '')}</span>
              </li>
            ))}
          </ul>
        );
      }

      if (block === '---') {
        return <hr key={idx} className="my-8 border-line" />;
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-text/90 leading-relaxed my-4">
          {block}
        </p>
      );
    });
  };

  return (
    <>
      {/* Thin Reading-Progress Bar */}
      <div
        id="reading-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <main id="main-content" className="py-12 border-b border-line min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors min-h-[44px]"
            >
              <ArrowLeft size={16} />
              <span>&larr; Back to Field Notes Archive</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="border-b border-line pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags.map(t => (
                <span key={t} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-surface border border-line text-accent flex items-center gap-1">
                  <Tag size={10} />
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-accent" />
                <span>Published {post.date}</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-accent" />
                <span>{post.readTime}</span>
              </div>
              <span>&bull;</span>
              <span className="text-text font-semibold">Gaurang Upadhyay</span>
            </div>
          </header>

          {/* Article Body */}
          <article className="prose max-w-none text-text">
            {renderMarkdown(post.content)}
          </article>

          {/* Previous / Next Article Navigation */}
          <nav className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="flex items-center gap-3 p-3 rounded hover:bg-surface border border-line text-left text-xs font-mono text-muted hover:text-text transition-colors w-full sm:w-auto"
              >
                <ChevronLeft size={16} className="text-accent" />
                <div>
                  <span className="text-[10px] text-accent uppercase block">Previous Dispatch</span>
                  <span className="font-bold text-text truncate max-w-xs block">{prevPost.title}</span>
                </div>
              </Link>
            ) : <div />}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="flex items-center gap-3 p-3 rounded hover:bg-surface border border-line text-right text-xs font-mono text-muted hover:text-text transition-colors w-full sm:w-auto ml-auto"
              >
                <div>
                  <span className="text-[10px] text-accent uppercase block">Next Dispatch</span>
                  <span className="font-bold text-text truncate max-w-xs block">{nextPost.title}</span>
                </div>
                <ChevronRight size={16} className="text-accent" />
              </Link>
            )}
          </nav>

        </div>
      </main>
    </>
  );
};
