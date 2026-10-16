import type { Education, Evidence } from '@/types/content';

const cv: Evidence = { source: 'cv', reference: 'CV local — formation' };
export const education: readonly Education[] = [
  {
    id: 'esigelec', institution: 'ESIGELEC',
    qualification: { fr: 'Semestre d’échange académique', en: 'Academic exchange semester' },
    period: { startYear: 2026, endYear: 2027 },
    location: { fr: 'Rouen, France', en: 'Rouen, France' }, evidence: [cv],
  },
  {
    id: 'iit', institution: 'Institut International de Technologie — IIT',
    qualification: { fr: 'Cycle ingénieur en génie informatique', en: 'Computer Engineering' },
    specialization: { fr: 'Génie Logiciel et Informatique Décisionnelle', en: 'Software Engineering and Business Intelligence' },
    period: { startYear: 2024, endYear: 2027 },
    location: { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' }, evidence: [cv],
  },
  {
    id: 'fss', institution: 'Faculté des Sciences de Sfax',
    qualification: { fr: 'Licence en sciences de l’informatique', en: 'Bachelor’s degree in Computer Science' },
    period: { startYear: 2021, endYear: 2024 },
    location: { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' }, evidence: [cv],
  },
  {
    id: 'baccalaureat', institution: 'Lycée Tayeb Mhiri',
    qualification: { fr: 'Baccalauréat Mathématiques', en: 'Baccalaureate in Mathematics' },
    period: { startYear: 2021, endYear: 2021 },
    location: { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' }, evidence: [cv],
  },
];
