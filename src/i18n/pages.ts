import type { Locale } from '../types/content.ts';

const fr = {
  projectsDescription: 'Projets de développement logiciel, Full-Stack, BI, mobile et IA appliquée de Bassem Wali.',
  projectsIntro: '14 projets, du logiciel aux données. Explorez une stack, un domaine ou une démo.',
  backHome: 'Retour à l’accueil', filterProjects: 'Filtrer les projets', domain: 'Domaine', all: 'Tous', technology: 'Technologie',
  stackLabel: 'Toutes les technologies de la stack', allTechnologies: 'Toutes les technologies', searchLabel: 'Rechercher un projet', searchPlaceholder: 'Titre, technologie ou domaine…',
  filterHelp: 'Les critères se combinent. La recherche ignore les accents et les majuscules.', reset: 'Réinitialiser les filtres', noJs: 'Les 14 projets sont affichés ci-dessous. Activez JavaScript pour les filtrer.',
  countOne: '{count} projet sur {total}', countMany: '{count} projets sur {total}', initialCount: '14 projets',
  emptyTitle: 'Aucun projet ne correspond', emptyHint: 'Essayez un autre domaine, une autre technologie ou une recherche plus courte.', showAllProjects: 'Afficher tous les projets',
  breadcrumb: 'Fil d’Ariane', mainTechnologies: 'Technologies principales', repository: 'Voir le code sur GitHub', inStudy: 'Dans cette étude de cas',
  overview: 'Vue d’ensemble', problem: 'Le problème', features: 'Ce que fait le projet', featuresNav: 'Fonctionnalités', architecture: 'Architecture et flux', architectureNav: 'Architecture',
  stack: 'Stack technique', decisions: 'Décisions techniques', limitations: 'Limites actuelles', demonstrates: 'Ce que ce projet démontre', related: 'Projets liés',
  explore: 'Explorer le code', repositoryHint: 'Retrouvez l’implémentation et les instructions du projet dans son dépôt.', diagramText: 'Lecture textuelle du diagramme', caseLabel: 'Étude de cas',
};
type PageDictionary = Record<keyof typeof fr, string>;
const en: PageDictionary = {
  projectsDescription: 'Software, Full-Stack, Business Intelligence, mobile and applied AI projects by Bassem Wali.',
  projectsIntro: '14 projects, from software to data. Explore a technology stack, a domain or a demo.',
  backHome: 'Back to Home', filterProjects: 'Filter projects', domain: 'Domain', all: 'All', technology: 'Technology',
  stackLabel: 'Browse the full technology stack', allTechnologies: 'All technologies', searchLabel: 'Search projects', searchPlaceholder: 'Project name, technology or domain…',
  filterHelp: 'Filters work together. Search ignores accents and capitalisation.', reset: 'Reset filters', noJs: 'All 14 projects are listed below. Enable JavaScript to filter them.',
  countOne: '{count} project of {total}', countMany: '{count} projects of {total}', initialCount: '14 projects',
  emptyTitle: 'No projects match your filters.', emptyHint: 'Try another domain, a different technology or a shorter search.', showAllProjects: 'Show all projects',
  breadcrumb: 'Breadcrumb', mainTechnologies: 'Main technologies', repository: 'View on GitHub', inStudy: 'In this case study',
  overview: 'Overview', problem: 'The problem', features: 'Key Features', featuresNav: 'Features', architecture: 'Architecture and Data Flow', architectureNav: 'Architecture',
  stack: 'Technology Stack', decisions: 'Technical Decisions', limitations: 'Current Limitations', demonstrates: 'What This Project Demonstrates', related: 'Related Projects',
  explore: 'Explore the Code', repositoryHint: 'Find the implementation and setup instructions in the repository.', diagramText: 'Read the diagram as text', caseLabel: 'Case Study',
};
export const pageCopy: Record<Locale, PageDictionary> = { fr, en };
export function formatMessage(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    if (!(key in values)) throw new Error(`Missing message value: ${key}`);
    return String(values[key]);
  });
}
