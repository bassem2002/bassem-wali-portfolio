import type { Locale } from '../types/content.ts';
const fr = {
  hero: { positioning: 'Ingénierie logicielle', fullStack: '& développement Full-Stack', projects: 'Explorer mes projets', contact: 'Me contacter', visual: 'L’ingénierie par les projets', engineering: 'Architecture logicielle', data: 'Données & intelligence', cv: 'CV public en préparation' },
  facts: { authentication: 'Accès & authentification', database: 'Données & persistance', aiOrDataComponents: 'IA & analyse de données', testing: 'Tests dans le dépôt' },
  catalogueEyebrow: 'Logiciel · données · systèmes',
  mechanism: 'Mécanisme représentatif',
  project: { features: 'Ce que fait le projet', mechanisms: 'Les mécanismes techniques', limitations: 'Périmètre et limites', related: 'À explorer aussi' },
};
type Copy = { [K in keyof typeof fr]: typeof fr[K] extends string ? string : { [P in keyof typeof fr[K]]: string } };
export const v2Copy = {
  fr,
  en: {
    hero: { positioning: 'Software Engineering', fullStack: '& Full-Stack Development', projects: 'Explore my projects', contact: 'Get in touch', visual: 'Engineering through projects', engineering: 'Software architecture', data: 'Data & intelligence', cv: 'Public CV pending' },
    facts: { authentication: 'Access & authentication', database: 'Data & persistence', aiOrDataComponents: 'AI & data processing', testing: 'Tests in the repository' },
    catalogueEyebrow: 'Software · data · systems',
    mechanism: 'Representative mechanism',
    project: { features: 'What the project does', mechanisms: 'Technical mechanisms', limitations: 'Scope and limitations', related: 'Explore next' },
  },
} satisfies Record<Locale, Copy>;
