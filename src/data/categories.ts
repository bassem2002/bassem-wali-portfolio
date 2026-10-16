import type { Localized, ProjectCategory } from '@/types/content';

export const categories: Record<ProjectCategory, Localized> = {
  'full-stack': { fr: 'Full-Stack', en: 'Full-Stack' },
  backend: { fr: 'Backend', en: 'Backend' },
  mobile: { fr: 'Mobile', en: 'Mobile' },
  'business-intelligence': { fr: 'Business Intelligence', en: 'Business Intelligence' },
  'machine-learning': { fr: 'Machine Learning', en: 'Machine Learning' },
  'deep-learning': { fr: 'Deep Learning', en: 'Deep Learning' },
  nlp: { fr: 'NLP', en: 'NLP' },
  'software-architecture': { fr: 'Architecture logicielle', en: 'Software Architecture' },
  networking: { fr: 'Réseaux', en: 'Networking' },
  'applied-ai': { fr: 'IA appliquée', en: 'Applied AI' },
  desktop: { fr: 'Desktop', en: 'Desktop' },
  'computer-vision': { fr: 'Vision par ordinateur', en: 'Computer Vision' },
};
