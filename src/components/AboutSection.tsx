import React from 'react';
import { ShieldCheck, CheckCircle, Users, ExternalLink, Cpu } from 'lucide-react';
import skillsDataRaw from '../data/skills.json';
import type { SkillCategory } from '../types';

const skillsData = skillsDataRaw as SkillCategory[];

interface AboutSectionProps {
  onSelectSkillFilter: (skill: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectSkillFilter }) => {
  const principles = [
    {
      id: 'p1',
      title: 'Validate before you trust',
      icon: <ShieldCheck size={20} className="text-accent" />,
      rule: 'Never permit untrusted LLM generation direct database execution.',
      evidence: 'FloatChat AST-based SQL Validator: Parses generated SQL queries into syntax trees to block injection vectors and forbid write operations.',
      link: '/projects/floatchat'
    },
    {
      id: 'p2',
      title: 'Test what you ship',
      icon: <CheckCircle size={20} className="text-accent" />,
      rule: 'Deterministic test suites guard stochastic AI behaviors.',
      evidence: 'FloatChat Pytest Suite: 49 comprehensive unit and integration tests maintaining a 100% pass rate across SQL template routing and vector retrieval fallbacks.',
      link: '/projects/floatchat'
    },
    {
      id: 'p3',
      title: 'Design for different users',
      icon: <Users size={20} className="text-accent" />,
      rule: 'Tailor interaction affordances to domain expertise.',
      evidence: 'Dual-persona interface in FloatChat (Explorer vs Researcher) and three-tier role-based access control (Student, Counselor, Admin) in Mental Health System.',
      link: '/projects/mental-health-system'
    }
  ];

  return (
    <section id="about" className="py-20 border-b border-line bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4 mb-12">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                § 01 / SPECIFICATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent/15 text-accent border border-accent/30 font-bold">
                DRAFT: review me
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mt-1">
              About &amp; Engineering Philosophy
            </h2>
          </div>
          <p className="font-mono text-xs text-muted mt-2 sm:mt-0">
            RECORD: ENG-BIO-V3.8
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-text">
              The Interface of Systems and Artificial Intelligence
            </h3>
            <p className="text-base text-text/90 leading-relaxed">
              Third-year Computer Engineering student at <strong className="text-text font-semibold">VJTI Mumbai</strong> building full-stack web applications where AI does the heavy lifting: RAG chatbots, NL2SQL engines, and ML prediction systems.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              My engineering focus centers on bridging statistical machine learning capabilities with deterministic, resilient web backends. Rather than treating AI as an unpredictable black box, I construct rigid validation boundaries, multi-engine data pipelines, and contextual retrieval architectures designed for production scrutiny.
            </p>
            <div className="p-4 rounded bg-bg/80 border border-line text-xs font-mono text-muted space-y-1">
              <div className="text-accent font-bold uppercase tracking-wider mb-1">
                Engineering Tenets:
              </div>
              <p>&bull; Zero hallucinated SQL execution via Abstract Syntax Tree validation.</p>
              <p>&bull; Multi-engine PDF stream decomposition for dense SEC EDGAR tables.</p>
              <p>&bull; Accessible Human-Computer Interaction grounded in Nielsen &amp; Norman principles.</p>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-lg bg-surface border border-line shadow-drafting-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Cpu size={18} className="text-accent" />
              <span className="font-mono text-xs tracking-wider text-accent uppercase font-bold">
                Student Engineering Profile
              </span>
            </div>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-line/40">
                <span className="text-muted">INSTITUTION</span>
                <span className="font-bold text-text">VJTI Mumbai</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/40">
                <span className="text-muted">DEGREE &amp; YEAR</span>
                <span className="font-bold text-text">B.Tech Comp Eng (Year 3)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/40">
                <span className="text-muted">ACADEMIC STANDING</span>
                <span className="font-bold text-accent">CGPA 8.65 / 10.0</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/40">
                <span className="text-muted">CORE CONCENTRATION</span>
                <span className="font-bold text-text">Full-Stack &amp; Applied AI</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted">STATE RANK (MHT-CET)</span>
                <span className="font-bold text-text">Rank 67 (99.98%ile)</span>
              </div>
            </div>
          </div>
        </div>

        {/* "How I Build" Evidence-Linked Cards */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              METHODOLOGICAL FRAMEWORK
            </span>
            <h3 className="font-serif text-2xl font-bold text-text mt-1">
              How I Build (Evidence-Linked)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, idx) => (
              <div key={p.id} className="draft-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-accent">
                      [0{idx + 1}]
                    </span>
                    <div className="p-2 rounded bg-bg border border-line">
                      {p.icon}
                    </div>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-text mb-2">
                    {p.title}
                  </h4>
                  <p className="font-mono text-xs text-accent/90 mb-3">
                    {p.rule}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {p.evidence}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-line">
                  <a
                    href={p.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text hover:text-accent font-semibold transition-colors min-h-[44px]"
                  >
                    <span>Inspect Evidence</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grouped Chips */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                TECHNICAL CAPABILITIES &bull; CLICK TO FILTER PROJECTS
              </span>
              <h3 className="font-serif text-2xl font-bold text-text mt-1">
                Verified Skill Taxonomy
              </h3>
            </div>
            <p className="font-mono text-xs text-muted">
              * Categorized inventory &bull; No unscientific percentage meters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((cat) => (
              <div key={cat.category} className="p-5 rounded-lg bg-surface border border-line">
                <h4 className="font-serif text-base font-bold text-text mb-1">
                  {cat.category}
                </h4>
                <p className="text-xs text-muted mb-4">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => onSelectSkillFilter(skill)}
                      className="px-2.5 py-1.5 rounded bg-bg border border-line hover:border-accent hover:text-accent text-xs font-mono text-text/90 transition-all min-h-[36px] flex items-center cursor-pointer shadow-xs active:scale-95"
                      title={`Filter projects built using ${skill}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
