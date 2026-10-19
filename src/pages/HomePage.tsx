import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { AcademicSection } from '../components/AcademicSection';
import { ActivitiesSection } from '../components/ActivitiesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { RightSectionIndex } from '../components/RightSectionIndex';

interface HomePageProps {
  onOpenSus: () => void;
  scrollTo?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSus, scrollTo }) => {
  const [projectFilter, setProjectFilter] = useState('All');

  useEffect(() => {
    if (scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [scrollTo]);

  const handleSelectSkillFilter = (skill: string) => {
    setProjectFilter(skill);
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content" className="min-h-screen">
      <RightSectionIndex />
      <Hero onOpenSus={onOpenSus} />
      <AboutSection onSelectSkillFilter={handleSelectSkillFilter} />
      <AcademicSection />
      <ActivitiesSection />
      <ProjectsSection initialFilter={projectFilter} />
      <ContactSection />
    </main>
  );
};
