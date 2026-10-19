import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, FolderGit2, FileText, Moon, Sun, Award, Download, Sparkles, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useHciLens } from '../context/HciLensContext';
import projectsDataRaw from '../data/projects.json';
import blogDataRaw from '../data/blog-posts.json';
import type { Project, BlogPost } from '../types';
import { getAssetUrl } from '../utils/assets';

const projects = projectsDataRaw as Project[];
const blogPosts = blogDataRaw as BlogPost[];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSus: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Projects' | 'Field Notes' | 'System Controls';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenSus }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const { isLensActive, toggleLens } = useHciLens();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'Jump to Section § 01: About & Engineering Principles',
      subtitle: 'Bio, "How I build" framework, and categorized skills',
      category: 'Navigation',
      icon: <Compass size={16} className="text-accent" />,
      action: () => {
        navigate('/#about');
        onClose();
      }
    },
    {
      id: 'nav-academic',
      title: 'Jump to Section § 02: Academic Credentials',
      subtitle: 'VJTI B.Tech (CGPA 8.65), entrance percentiles (MHT-CET 99.98%ile), coursework',
      category: 'Navigation',
      icon: <Compass size={16} className="text-accent" />,
      action: () => {
        navigate('/#academic');
        onClose();
      }
    },
    {
      id: 'nav-activities',
      title: 'Jump to Section § 03: Activities & Open Source',
      subtitle: 'Hacktoberfest 2025 contributions and university technical initiatives',
      category: 'Navigation',
      icon: <Compass size={16} className="text-accent" />,
      action: () => {
        navigate('/#activities');
        onClose();
      }
    },
    {
      id: 'nav-projects',
      title: 'Jump to Section § 04: Project Engineering Catalog',
      subtitle: 'Interactive spec-sheet cards and multi-tag filtering',
      category: 'Navigation',
      icon: <FolderGit2 size={16} className="text-accent" />,
      action: () => {
        navigate('/#projects');
        onClose();
      }
    },
    {
      id: 'nav-contact',
      title: 'Jump to Section § 06: Contact Drafting Sheet',
      subtitle: 'Direct email, GitHub, and accessible validation form',
      category: 'Navigation',
      icon: <Compass size={16} className="text-accent" />,
      action: () => {
        navigate('/#contact');
        onClose();
      }
    },
    {
      id: 'nav-usability',
      title: 'Open HCI Usability Evaluation Hub',
      subtitle: 'Heuristic evaluation, metrics, and empirical data',
      category: 'Navigation',
      icon: <Award size={16} className="text-accent" />,
      action: () => {
        navigate('/usability');
        onClose();
      }
    },
    {
      id: 'nav-usability-test',
      title: 'Launch Live Usability Testing Mode (/usability/test)',
      subtitle: 'Interactive benchmark protocol with live stopwatch and CSV logging',
      category: 'Navigation',
      icon: <Award size={16} className="text-accent" />,
      action: () => {
        navigate('/usability/test');
        onClose();
      }
    },

    // Projects
    ...projects.map(p => ({
      id: `proj-${p.slug}`,
      title: `Project: ${p.title} (${p.year})`,
      subtitle: p.summary,
      category: 'Projects' as const,
      icon: <FolderGit2 size={16} className="text-accent" />,
      action: () => {
        navigate(`/projects/${p.slug}`);
        onClose();
      }
    })),

    // Field Notes / Blog
    ...blogPosts.map(b => ({
      id: `blog-${b.slug}`,
      title: `Article: ${b.title}`,
      subtitle: `${b.readTime} &bull; ${b.summary}`,
      category: 'Field Notes' as const,
      icon: <FileText size={16} className="text-accent" />,
      action: () => {
        navigate(`/blog/${b.slug}`);
        onClose();
      }
    })),

    // System controls
    {
      id: 'sys-theme',
      title: `Switch Theme to ${theme === 'dark' ? 'Light "Paper"' : 'Dark "Midnight Ink"'}`,
      subtitle: 'Toggle persistent high-contrast visual identity',
      category: 'System Controls',
      icon: theme === 'dark' ? <Sun size={16} className="text-accent" /> : <Moon size={16} className="text-accent" />,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'sys-lens',
      title: `${isLensActive ? 'Disable' : 'Enable'} HCI Lens Overlay`,
      subtitle: 'Toggle interactive architectural annotations of UX principles',
      category: 'System Controls',
      icon: <Sparkles size={16} className="text-accent" />,
      action: () => {
        toggleLens();
        onClose();
      }
    },
    {
      id: 'sys-sus',
      title: 'Rate Site (Standard System Usability Scale Questionnaire)',
      subtitle: 'Launch 10-statement psychometric benchmark modal',
      category: 'System Controls',
      icon: <Award size={16} className="text-accent" />,
      action: () => {
        onClose();
        onOpenSus();
      }
    },
    {
      id: 'sys-resume',
      title: 'Download Gaurang Upadhyay Resume (PDF)',
      subtitle: 'Directly access curriculum vitae document (~142 KB)',
      category: 'System Controls',
      icon: <Download size={16} className="text-accent" />,
      action: () => {
        const link = document.createElement('a');
        link.href = getAssetUrl('/assets/profile/Gaurang_Upadhyay_Resume.pdf');
        link.download = 'Gaurang_Upadhyay_Resume.pdf';
        link.click();
        onClose();
      }
    }
  ];

  const filteredItems = items.filter(item => {
    const term = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.subtitle.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/70 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-surface border-2 border-line rounded-lg shadow-2xl overflow-hidden flex flex-col text-text animate-in fade-in zoom-in-95 duration-100"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-line gap-3 bg-bg/50">
          <Search size={18} className="text-accent" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project name, or section..."
            className="w-full bg-transparent text-text placeholder:text-muted/60 text-sm focus:outline-none"
            role="combobox"
            aria-expanded={filteredItems.length > 0}
            aria-controls="command-listbox"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-muted hover:text-text hover:bg-surface text-xs font-mono"
            aria-label="Close command palette"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Listbox */}
        <div id="command-listbox" role="listbox" className="max-h-80 overflow-y-auto p-2 divide-y divide-line/40">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-muted">
              No matching commands or projects found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-start gap-3 p-2.5 rounded cursor-pointer transition-colors ${
                    isSelected ? 'bg-accent/15 text-text border-l-2 border-accent' : 'text-text/80 hover:bg-bg/40'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold truncate">{item.title}</span>
                      <span className="text-[10px] font-mono text-muted uppercase bg-bg px-1.5 py-0.5 rounded border border-line">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2 border-t border-line bg-bg/70 flex items-center justify-between text-[11px] font-mono text-muted">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
            <span>[Esc] Dismiss</span>
          </div>
          <span>Drafting Command Engine</span>
        </div>
      </div>
    </div>
  );
};
