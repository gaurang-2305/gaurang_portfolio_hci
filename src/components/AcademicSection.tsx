import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import academicDataRaw from '../data/academic.json';
import type { AcademicData } from '../types';

const academicData = academicDataRaw as AcademicData;

export const AcademicSection: React.FC = () => {

  return (
    <section id="academic" className="py-20 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4 mb-12">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              § 02 / ACADEMIC RECORDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text mt-1">
              Education &amp; Scholastic Merit
            </h2>
          </div>
          <p className="font-mono text-xs text-muted mt-2 sm:mt-0">
            SOURCE OF TRUTH: OFFICIAL TRANSCRIPTS
          </p>
        </div>

        {/* Institution Records Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {academicData.institutions.map((inst) => (
            <div key={inst.id} className="draft-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-accent" />
                    <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                      {inst.id.toUpperCase()} &bull; {inst.period}
                    </span>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent text-bg font-bold">
                    {inst.metricLabel}: {inst.metricValue}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-text mb-1">
                  {inst.degree}
                </h3>
                <h4 className="font-mono text-xs text-muted mb-4">
                  {inst.institution}
                </h4>

                <p className="text-sm text-text/90 leading-relaxed mb-4">
                  {inst.description}
                </p>
              </div>

              <div className="p-3 rounded bg-bg border border-line text-xs font-mono text-text">
                <span className="text-accent font-bold">Achievement Highlight: </span>
                {inst.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Competitive Entrance Examination Results */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              STATE &amp; NATIONAL BENCHMARKS
            </span>
            <h3 className="font-serif text-2xl font-bold text-text mt-1">
              Competitive Entrance Standing
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {academicData.competitiveExams.map((exam) => (
              <div key={exam.exam} className="p-5 rounded-lg bg-surface border border-line flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-accent uppercase font-bold">
                      {exam.exam}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-bg border border-line text-muted">
                      {exam.year}
                    </span>
                  </div>
                  <div className="font-serif text-3xl font-bold text-text mb-1">
                    {exam.score}
                  </div>
                  <p className="font-mono text-xs text-muted mb-2">
                    {exam.rank}
                  </p>
                </div>
                <div className="pt-3 border-t border-line/60">
                  <span className="inline-block px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent font-mono text-[11px] font-semibold">
                    {exam.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grouped Coursework Grid */}
        <div>
          <div className="mb-6">
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              CURRICULAR SYLLABUS &bull; VJTI COMPUTER ENGINEERING
            </span>
            <h3 className="font-serif text-2xl font-bold text-text mt-1">
              Core Coursework
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicData.coursework.map((group) => (
              <div key={group.group} className="p-6 rounded-lg bg-surface border border-line">
                <div className="flex items-center gap-2 mb-4 border-b border-line pb-3">
                  <BookOpen size={18} className="text-accent" />
                  <h4 className="font-serif text-base font-bold text-text">
                    {group.group}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {group.courses.map((course) => (
                    <li key={course} className="flex items-start gap-2 text-xs font-mono text-text/90">
                      <span className="text-accent mt-0.5">&bull;</span>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
