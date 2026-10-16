import type { Localized, Project } from '../types/content.ts';
import { projectDetailsFr } from './project-details.fr.ts';
import { projectDetailsEn } from './project-details.en.ts';
import { projectNarratives } from './project-narratives.ts';
import { verifiedProjectVideos } from './project-videos.ts';
import { relatedProjects as rankRelatedProjects } from '../utils/related-projects.ts';

const text = (fr: string, en: string): Localized => ({ fr, en });
type Seed = Pick<Project, 'id' | 'slug' | 'title' | 'categories' | 'technologies' | 'featured' | 'projectType'> & {
  repo: string;
  architecture: Localized;
  tests?: Localized;
  scaffoldTests?: boolean;
};

const seeds: readonly Seed[] = [
  {
    id: 'rezouette', slug: 'rezouette', title: 'Rezouette', repo: 'rezouette-social-media-saas',
    featured: true, projectType: 'professional',
    categories: ['full-stack', 'backend', 'software-architecture'],
    technologies: ['nestjs', 'angular', 'typescript', 'postgresql', 'prisma', 'oauth', 'pkce', 'jest'],
    architecture: text('Architecture en couches inspirée des principes de Clean Architecture.', 'Layered architecture inspired by Clean Architecture principles.'),
    tests: text('Tests backend Jest avec mocks, notamment OAuth et publication.', 'Backend Jest tests with mocks, including OAuth and publishing.'),
  },
  {
    id: 'smartalumni', slug: 'smartalumni-iit', title: 'SmartAlumni IIT', repo: 'smartalumni-iit',
    featured: true, projectType: 'academic',
    categories: ['full-stack', 'backend', 'applied-ai'],
    technologies: ['java', 'spring-boot', 'spring-security', 'angular', 'typescript', 'postgresql', 'jwt', 'tika', 'deepseek', 'junit', 'mockito'],
    architecture: text('Backend en couches contrôleurs, services et repositories ; frontend Angular.', 'Controller, service and repository backend layers with an Angular frontend.'),
    tests: text('Tests JUnit/Mockito des services CV et recommandation.', 'JUnit/Mockito tests for CV and recommendation services.'),
  },
  {
    id: 'enterprise-bi-dashboard', slug: 'enterprise-bi-dashboard', title: 'Enterprise BI Dashboard', repo: 'enterprise-bi-dashboard',
    featured: true, projectType: 'academic', categories: ['business-intelligence'],
    technologies: ['csharp', 'aspnet-core', 'ssas', 'mdx', 'adomd', 'chartjs', 'bootstrap', 'sql-server'],
    architecture: text('Cube SSAS → requêtes MDX via ADOMD.NET → service → contrôleur MVC → graphiques.', 'SSAS cube → MDX through ADOMD.NET → service → MVC controller → charts.'),
  },
  {
    id: 'min-draw-fx', slug: 'mindrawfx', title: 'MinDrawFX', repo: 'MinDrawFX',
    featured: true, projectType: 'academic', categories: ['software-architecture', 'desktop'],
    technologies: ['java', 'javafx', 'fxml', 'sqlite', 'jdbc'],
    architecture: text('MVC avec services et repositories ; Command, Observer, Factory et Decorator.', 'MVC with services and repositories; Command, Observer, Factory and Decorator.'),
  },
  {
    id: 'waste-classification', slug: 'waste-classification', title: 'Waste Classification', repo: 'waste-classification-deep-learning',
    featured: true, projectType: 'academic', categories: ['deep-learning', 'computer-vision'],
    technologies: ['python', 'tensorflow', 'keras', 'resnet50', 'scikit-learn'],
    architecture: text('Expérimentations TensorFlow/Keras avec transfert d’apprentissage et blocs inspirés de DenseNet.', 'TensorFlow/Keras experiments with transfer learning and DenseNet-inspired blocks.'),
  },
  {
    id: 'housing-insurance', slug: 'housing-insurance', title: 'Housing Insurance Claim Prediction', repo: 'housing-insurance-claim-prediction',
    featured: false, projectType: 'academic', categories: ['machine-learning'],
    technologies: ['python', 'scikit-learn', 'pandas', 'imbalanced-learn', 'random-forest', 'gradient-boosting', 'smote'],
    architecture: text('Notebook, modules Python réutilisables et CLI.', 'Notebook, reusable Python modules and CLI.'),
  },
  {
    id: 'english-french-seq2seq', slug: 'english-french-seq2seq', title: 'English–French Seq2Seq', repo: 'pytorch-en-fr-seq2seq',
    featured: false, projectType: 'academic', categories: ['nlp', 'deep-learning'],
    technologies: ['python', 'pytorch', 'lstm', 'pandas', 'scikit-learn'],
    architecture: text('Notebook PyTorch Seq2Seq au niveau des mots, sans Transformer ni LLM.', 'Word-level PyTorch Seq2Seq notebook without Transformers or an LLM.'),
  },
  {
    id: 'smart-trade-manager', slug: 'smart-trade-manager', title: 'Smart Trade Manager', repo: 'smart_trade_manager',
    featured: false, projectType: 'academic', categories: ['mobile', 'applied-ai'],
    technologies: ['flutter', 'dart', 'firebase', 'ml-kit', 'shared-preferences'],
    architecture: text('Écrans Flutter, services Firebase et intégrations natives Google ML Kit.', 'Flutter screens, Firebase services and native Google ML Kit integrations.'),
  },
  {
    id: 'shopflow', slug: 'shopflow', title: 'ShopFlow', repo: 'ShopFlow-Full-Stack-E-Commerce-Platform',
    featured: false, projectType: 'unspecified', categories: ['full-stack', 'backend'],
    technologies: ['java', 'spring-boot', 'spring-security', 'angular', 'typescript', 'postgresql', 'h2', 'firebase', 'jwt'],
    architecture: text('Monolithe en couches ; commandes et stock traités dans une transaction Spring.', 'Layered monolith; orders and stock processed in a Spring transaction.'),
    scaffoldTests: true,
  },
  {
    id: 'jobconnect', slug: 'jobconnect', title: 'JobConnect', repo: 'JobConnect',
    featured: false, projectType: 'academic', categories: ['full-stack'],
    technologies: ['php', 'laravel', 'mysql', 'eloquent', 'blade', 'tailwind', 'alpine'],
    architecture: text('MVC Laravel avec middleware de rôles et Eloquent.', 'Laravel MVC with role middleware and Eloquent.'),
    tests: text('Tests Feature d’authentification et de profil issus de Laravel Breeze.', 'Authentication and profile feature tests generated around Laravel Breeze.'),
  },
  {
    id: 'restaurant-management', slug: 'restaurant-management', title: 'RestaurantManagementDotNet', repo: 'RestaurantManagementDotNet',
    featured: false, projectType: 'unspecified', categories: ['full-stack', 'backend'],
    technologies: ['csharp', 'aspnet-core', 'blazor', 'sql-server', 'ef-core', 'bootstrap', 'jwt'],
    architecture: text('API ASP.NET Core, repositories et EF Core ; client Blazor WebAssembly.', 'ASP.NET Core API, repositories and EF Core with a Blazor WebAssembly client.'),
  },
  {
    id: 'school-management', slug: 'school-management', title: 'SchoolManagementMERN', repo: 'SchoolManagementMERN',
    featured: false, projectType: 'professional', categories: ['full-stack', 'backend'],
    technologies: ['javascript', 'mongodb', 'mongoose', 'express', 'react', 'nodejs', 'redux', 'tailwind', 'jwt', 'bcrypt', 'multer'],
    architecture: text('API Express en contrôleurs/services et interface React avec Redux.', 'Express API with controllers/services and a React interface with Redux.'),
    tests: text('Tests Node sur JWT, mots de passe et autorisations.', 'Node tests for JWT, passwords and authorization.'),
  },
  {
    id: 'java-network-communication', slug: 'java-network-communication', title: 'Java Network Communication Suite', repo: 'JavaNetworkCommunicationSuite',
    featured: false, projectType: 'academic', categories: ['networking', 'desktop'],
    technologies: ['java', 'javafx', 'sockets'],
    architecture: text('Modules client/serveur distincts avec interfaces JavaFX.', 'Separate client/server modules with JavaFX interfaces.'),
  },
  {
    id: 'eventplanner', slug: 'eventplanner', title: 'EventPlanner', repo: 'EventPlanner',
    featured: false, projectType: 'academic', categories: ['full-stack'],
    technologies: ['php', 'laravel', 'mysql', 'eloquent', 'blade', 'bootstrap'],
    architecture: text('MVC Laravel ; logique métier principalement dans les contrôleurs.', 'Laravel MVC with business logic primarily in controllers.'),
    scaffoldTests: true,
  },
];

const records: readonly Project[] = seeds.map(seed => {
  const githubUrl = 'https://github.com/bassem2002/' + seed.repo;
  const details = projectDetailsFr[seed.id];
  const english = projectDetailsEn[seed.id];
  if (!details) throw new Error('Missing French content: ' + seed.slug);
  if (!english) throw new Error('Missing English content: ' + seed.slug);
  const narrative = projectNarratives[seed.id];
  if (!narrative) throw new Error('Missing V2 narrative: ' + seed.id);
  return {
    id: seed.id, slug: seed.slug, title: seed.title,
    ...(details.shortTitle ? { shortTitle: details.shortTitle } : {}),
    ...narrative,
    // Compatibility aliases share the same objects; existing filters/SEO remain stable.
    summary: narrative.shortDescription,
    mainFeatures: { fr: details.features, en: english.features },
    relatedProjects: [],
    problem: { fr: details.problem, en: english.problem },
    categories: seed.categories, technologies: seed.technologies,
    githubUrl, featured: seed.featured, projectType: seed.projectType,
    ...(verifiedProjectVideos[seed.id] ? { videoDemo: verifiedProjectVideos[seed.id] } : {}),
    ...(details.experienceReference ? { experienceReference: details.experienceReference } : {}),
    features: { fr: details.features, en: english.features },
    architecture: seed.architecture,
    limitations: { fr: details.limitations, en: english.limitations },
    relatedSkills: [...new Set([...seed.technologies, ...details.skills])],
    testing: {
      status: seed.tests ? 'present' : seed.scaffoldTests ? 'scaffold-only' : 'not-found',
      description: seed.tests ?? (seed.scaffoldTests
        ? text('Tests de squelette uniquement.', 'Scaffold tests only.')
        : text('Aucun test automatisé identifié pendant l’audit.', 'No automated tests identified during the audit.')),
      executedDuringAudit: false,
    },
    myContributions: [], demo: null, screenshots: [],
    evidence: [{ source: 'repository', reference: githubUrl },
      { source: 'user', reference: 'Phase 3 — précisions de contenu validées' }],
  };
});
export const projects: readonly Project[] = records.map(project => ({
  ...project, relatedProjects: rankRelatedProjects(project, records).map(relation => relation.project.id),
}));
