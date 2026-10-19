export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  tagline: string;
  repo: string;
  liveDemo?: string;
  tags: string[];
  stack: string[];
  summary: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  whatILearned: string;
  coverImage: string;
  screenshots: {
    url: string;
    caption: string;
  }[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export interface Institution {
  id: string;
  degree: string;
  institution: string;
  period: string;
  metricLabel: string;
  metricValue: string;
  highlight: string;
  description: string;
}

export interface ExamResult {
  exam: string;
  score: string;
  rank: string;
  year: string;
  badge: string;
}

export interface CourseGroup {
  group: string;
  courses: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
  placeholder?: boolean;
}

export interface AcademicData {
  institutions: Institution[];
  competitiveExams: ExamResult[];
  coursework: CourseGroup[];
  certificates: Certificate[];
}

export interface ActivityItem {
  id: string;
  commitHash: string;
  type: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
  details: string;
  links: { label: string; url: string }[];
  status: string;
  prPending?: boolean;
}

export interface HciLensItem {
  id: string;
  target: string;
  number: number;
  principle: string;
  theorist: string;
  definition: string;
  application: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  content: string;
}

export interface UsabilityTask {
  id: string;
  name: string;
  prompt: string;
  targetSection: string;
  expectedAction: string;
  benchmarkSeconds: number;
}
