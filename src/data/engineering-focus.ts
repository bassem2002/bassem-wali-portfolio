import type { Localized } from '../types/content.ts';

export interface EngineeringFocus {
  id: string; title: Localized; description: Localized; projectIds: readonly string[]; skillIds: readonly string[];
}
export const focusMechanisms: Readonly<Record<string, Localized<readonly string[]>>> = {
  software: { fr: ['Action', 'Commande', 'État'], en: ['Action', 'Command', 'State'] },
  'full-stack': { fr: ['Interface', 'API', 'Persistance'], en: ['Interface', 'API', 'Persistence'] },
  bi: { fr: ['Filtre', 'MDX', 'Mesure OLAP'], en: ['Filter', 'MDX', 'OLAP measure'] },
  ai: { fr: ['Données', 'Caractéristiques', 'Modèle'], en: ['Data', 'Features', 'Model'] },
};
export const engineeringFocus: readonly EngineeringFocus[] = [
  { id: 'software', title: { fr: 'Ingénierie logicielle', en: 'Software Engineering' },
    description: { fr: 'Organisation du code, responsabilités séparées et patterns objet, illustrés par un éditeur graphique JavaFX.', en: 'Code organisation, separated responsibilities and object-oriented patterns, illustrated through a JavaFX drawing editor.' }, projectIds: ['min-draw-fx'], skillIds: ['oop', 'mvc', 'command-pattern', 'repository-pattern'] },
  { id: 'full-stack', title: { fr: 'Développement Full-Stack', en: 'Full-Stack Development' },
    description: { fr: 'Interfaces web, APIs et persistance des données pour des workflows de publication, de mentorat et de commerce.', en: 'Web interfaces, APIs and data persistence for publishing, mentoring and commerce workflows.' }, projectIds: ['rezouette', 'smartalumni', 'shopflow'], skillIds: ['nestjs', 'angular', 'spring-boot', 'rest'] },
  { id: 'bi', title: { fr: 'Business Intelligence', en: 'Business Intelligence' },
    description: { fr: 'Mesures OLAP, requêtes MDX et indicateurs présentés dans un dashboard connecté à un cube SSAS.', en: 'OLAP measures, MDX queries and indicators presented in a dashboard connected to an SSAS cube.' }, projectIds: ['enterprise-bi-dashboard'], skillIds: ['ssas', 'mdx', 'olap', 'kpi'] },
  { id: 'ai', title: { fr: 'Intelligence artificielle', en: 'Artificial Intelligence' },
    description: { fr: 'Projets académiques de classification d’images, d’analyse de données tabulaires et de traduction neuronale.', en: 'Academic projects in image classification, tabular data analysis and neural machine translation.' }, projectIds: ['waste-classification', 'housing-insurance', 'english-french-seq2seq'], skillIds: ['tensorflow', 'pytorch', 'scikit-learn', 'cnn'] },
];
