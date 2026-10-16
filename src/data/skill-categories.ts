import type { Localized, SkillCategory } from '../types/content.ts';

export const skillCategories: Record<SkillCategory, Localized> = {
  languages: { fr: 'Langages', en: 'Languages' },
  backend: { fr: 'Backend', en: 'Backend' },
  'frontend-mobile': { fr: 'Frontend & mobile', en: 'Frontend & Mobile' },
  data: { fr: 'Données & persistance', en: 'Data & Persistence' },
  bi: { fr: 'Business Intelligence', en: 'Business Intelligence' },
  'machine-learning': { fr: 'Machine Learning', en: 'Machine Learning' },
  'deep-learning': { fr: 'Deep Learning', en: 'Deep Learning' },
  nlp: { fr: 'NLP', en: 'NLP' },
  'applied-ai': { fr: 'IA appliquée', en: 'Applied AI' },
  'api-security': { fr: 'APIs & sécurité', en: 'APIs & Security' },
  architecture: { fr: 'Architecture logicielle', en: 'Software Architecture' },
  'testing-tools': { fr: 'Tests & outils', en: 'Testing & Tools' },
  networking: { fr: 'Réseaux', en: 'Networking' },
};
