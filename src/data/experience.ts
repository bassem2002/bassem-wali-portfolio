import type { Evidence, Experience } from '../types/content.ts';

const cv: Evidence = { source: 'cv', reference: 'CV local — expériences professionnelles' };
export const experiences: readonly Experience[] = [
  {
    id: 'systeo-2026', organization: 'Systeo Digital', kind: 'internship',
    role: { fr: 'Stagiaire développeur Full-Stack', en: 'Full-Stack Developer Intern' },
    period: { start: '2026-06', end: '2026-07', label: { fr: 'Juin–juillet 2026', en: 'June–July 2026' } },
    location: { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' },
    projectName: 'Rezouette', projectSlug: 'rezouette',
    summary: { fr: 'Participation au développement d’une plateforme de gestion de réseaux sociaux.', en: 'Contributed to a social media management platform.' },
    technologies: ['nestjs', 'angular', 'typescript', 'postgresql', 'prisma', 'oauth', 'pkce'],
    contributions: [], evidence: [cv],
  },
  {
    id: 'systeo-2025', organization: 'Systeo Digital', kind: 'internship',
    role: { fr: 'Stagiaire développeur Full-Stack', en: 'Full-Stack Developer Intern' },
    period: { start: '2025-07', end: '2025-08', label: { fr: 'Juillet–août 2025', en: 'July–August 2025' } },
    location: { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' },
    projectName: 'SchoolManagementMERN', projectSlug: 'school-management',
    summary: { fr: 'Participation au développement d’une plateforme de gestion scolaire MERN.', en: 'Contributed to a MERN school management platform.' },
    technologies: ['mongodb', 'express', 'react', 'nodejs', 'redux', 'jwt', 'bcrypt', 'multer', 'tailwind'],
    contributions: [], evidence: [cv],
  },
  {
    id: 'clinisys-2024', organization: 'Clinisys', kind: 'degree-project',
    role: { fr: 'Projet de fin d’études de licence', en: 'Bachelor’s Final-Year Project' },
    period: { start: '2024-01', end: '2024-06', label: { fr: 'Janvier–juin 2024', en: 'January–June 2024' } },
    location: { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' },
    projectName: 'Application web de gestion de devis',
    summary: { fr: 'Application web de gestion de devis liés à un traitement de chimiothérapie.', en: 'Web application for managing quotations related to chemotherapy treatment.' },
    technologies: ['csharp', 'dotnet', 'sql', 'javascript', 'jquery', 'html', 'css'], contributions: [], evidence: [cv],
  },
];
