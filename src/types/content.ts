export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T = string> = Record<Locale, T>;
// Public editorial content must be complete in both supported languages.
export type Editorial<T = string> = Localized<T>;

export const projectCategoryIds = [
  'full-stack', 'backend', 'mobile', 'business-intelligence',
  'machine-learning', 'deep-learning', 'nlp', 'software-architecture',
  'networking', 'applied-ai', 'desktop', 'computer-vision',
] as const;
export type ProjectCategory = (typeof projectCategoryIds)[number];
export type TechnologyId = string;

export interface Evidence {
  source: 'cv' | 'repository' | 'user';
  reference: string;
}

export interface Profile {
  name: string;
  headline: Localized;
  secondaryHeadline: Localized;
  status: Localized;
  location: Localized;
  summary: Localized;
  academicLine: Localized;
  about: Editorial<readonly string[]>;
  availability: Editorial;
  contactMessage: Editorial;
  internshipFocus: Localized<readonly string[]>;
  email: string;
  phone?: { display: string; e164: string; publicationApproved: true };
  links: { github: string; linkedin: string };
  languages: readonly Localized[];
  cv: { path: string; publicVersionApproved: boolean };
  // Assets are imported through Astro, not fetched from external hosts.
  portrait: { source: string; alt: Localized; approved: boolean };
}

export interface VideoDemo {
  url: string;
  provider: 'google-drive' | 'youtube' | 'other';
  label: Localized;
  source: { readmeUrl: string; linkLabel: string; verifiedOn: string };
  publicAccessVerified: true;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  summary: Localized;
  shortDescription: Localized;
  longDescription: Localized;
  angle: Localized;
  highlights: Localized<readonly string[]>;
  technicalHighlights: Localized<readonly string[]>;
  mainFeatures: Localized<readonly string[]>;
  cardNote?: Localized;
  authentication?: Localized;
  database?: Localized;
  aiOrDataComponents?: Localized;
  relatedProjects: readonly string[];
  problem: Editorial;
  categories: readonly ProjectCategory[];
  technologies: readonly TechnologyId[];
  githubUrl: string;
  videoDemo?: VideoDemo;
  featured: boolean;
  projectType: 'professional' | 'academic' | 'personal' | 'unspecified';
  experienceReference?: string;
  features: Localized<readonly string[]>;
  architecture?: Localized;
  limitations: Localized<readonly string[]>;
  relatedSkills: readonly TechnologyId[];
  testing: {
    status: 'present' | 'scaffold-only' | 'not-found';
    description: Localized;
    executedDuringAudit: false;
  };
  // Individual work must be supported separately from project capabilities.
  myContributions: readonly { description: Editorial; evidence: Evidence }[];
  demo: { url: string; kind: 'live' | 'video'; publicAccessVerified: true; republicationApproved: true } | null;
  screenshots: readonly { source: string; alt: Localized; republicationApproved: true; sensitiveContentReviewed: true }[];
  evidence: readonly Evidence[];
}

export interface Experience {
  id: string;
  organization: string;
  role: Localized;
  kind: 'internship' | 'degree-project';
  period: { start: string; end: string; label: Localized };
  location: Localized;
  projectName: string;
  projectSlug?: string;
  summary: Localized;
  technologies: readonly TechnologyId[];
  contributions: readonly { description: Localized; evidence: Evidence }[];
  evidence: readonly Evidence[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: Localized;
  specialization?: Localized;
  period: { startYear: number; endYear: number };
  location: Localized;
  evidence: readonly Evidence[];
}

export const skillCategoryIds = ['languages', 'backend', 'frontend-mobile', 'data', 'bi', 'machine-learning', 'deep-learning', 'nlp', 'applied-ai', 'api-security', 'architecture', 'testing-tools', 'networking'] as const;
export type SkillCategory = (typeof skillCategoryIds)[number];
export interface Skill {
  id: TechnologyId;
  name: string;
  category: SkillCategory;
  projectIds: readonly string[];
  // CV-only skills can legitimately have no public project.
  evidence: readonly Evidence[];
}
