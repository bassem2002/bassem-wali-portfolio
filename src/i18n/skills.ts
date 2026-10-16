import { technologyNames } from '../data/skills.ts';
import type { Locale } from '../types/content.ts';
// Technology and pattern names retain their official spelling; concepts are localised.
export const englishConcepts: Readonly<Record<string, string>> = {
  rest: 'REST APIs', rbac: 'Role-based Access Control', oop: 'Object-oriented Programming',
  'layered-architecture': 'Layered Architecture', 'clean-architecture-principles': 'Clean Architecture Principles',
  'solid-principles': 'SOLID Principles', kpi: 'KPI Dashboards', 'transfer-learning': 'Transfer Learning',
  'data-augmentation': 'Data Augmentation', 'model-checkpointing': 'Model Checkpointing',
  'encoder-decoder': 'Encoder–Decoder', 'greedy-decoding': 'Greedy Decoding', eda: 'Exploratory Data Analysis',
  preprocessing: 'Preprocessing', 'binary-classification': 'Binary Classification', 'model-comparison': 'Model Comparison',
  'barcode-scanning': 'QR and Barcode Scanning', 'language-detection': 'Language Identification',
  'on-device-translation': 'On-device Translation', 'document-analysis': 'AI-assisted Document Analysis',
  'weighted-matching': 'Rule-based Weighted Matching', 'mock-testing': 'Testing with Mocks',
};
export function skillName(id: string, locale: Locale) {
  const name = technologyNames.get(id);
  if (!name) throw Error(`Unknown skill: ${id}`);
  return locale === 'en' ? englishConcepts[id] ?? name : name;
}
