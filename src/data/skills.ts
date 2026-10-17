import type { Skill, SkillCategory } from '../types/content.ts';
import { projects } from './projects.ts';

// IDs are the common vocabulary used by projects, skills and future filters.
// Project relationships are derived from projects.ts, never duplicated here.
const entries: readonly [string, string, SkillCategory][] = [
  ['wlanguage', 'WLanguage', 'languages'], ['windev-mobile', 'WinDev Mobile', 'frontend-mobile'], ['hfsql', 'HFSQL', 'data'],
  ['java', 'Java', 'languages'], ['csharp', 'C#', 'languages'],
  ['typescript', 'TypeScript', 'languages'], ['javascript', 'JavaScript', 'languages'],
  ['php', 'PHP', 'languages'], ['python', 'Python', 'languages'], ['dart', 'Dart', 'languages'],
  ['nestjs', 'NestJS', 'backend'], ['spring-boot', 'Spring Boot', 'backend'],
  ['aspnet-core', 'ASP.NET Core', 'backend'], ['express', 'Express', 'backend'],
  ['nodejs', 'Node.js', 'backend'], ['laravel', 'Laravel', 'backend'],
  ['angular', 'Angular', 'frontend-mobile'], ['react', 'React', 'frontend-mobile'],
  ['redux', 'Redux', 'frontend-mobile'], ['flutter', 'Flutter', 'frontend-mobile'],
  ['javafx', 'JavaFX', 'frontend-mobile'], ['fxml', 'FXML', 'frontend-mobile'],
  ['blazor', 'Blazor', 'frontend-mobile'], ['blade', 'Blade', 'frontend-mobile'],
  ['tailwind', 'Tailwind CSS', 'frontend-mobile'], ['bootstrap', 'Bootstrap', 'frontend-mobile'],
  ['alpine', 'Alpine.js', 'frontend-mobile'],
  ['postgresql', 'PostgreSQL', 'data'], ['prisma', 'Prisma', 'data'],
  ['sql-server', 'SQL Server', 'data'], ['ef-core', 'Entity Framework Core', 'data'],
  ['mongodb', 'MongoDB', 'data'], ['mongoose', 'Mongoose', 'data'],
  ['sqlite', 'SQLite', 'data'], ['jdbc', 'JDBC', 'data'], ['mysql', 'MySQL', 'data'],
  ['eloquent', 'Eloquent', 'data'], ['h2', 'H2', 'data'],
  ['firebase', 'Firebase', 'data'], ['shared-preferences', 'SharedPreferences', 'data'],
  ['ssas', 'SSAS', 'bi'], ['mdx', 'MDX', 'bi'], ['adomd', 'ADOMD.NET', 'bi'],
  ['chartjs', 'Chart.js', 'bi'],
  ['tensorflow', 'TensorFlow', 'deep-learning'], ['keras', 'Keras', 'deep-learning'],
  ['resnet50', 'ResNet50', 'deep-learning'], ['pytorch', 'PyTorch', 'deep-learning'],
  ['lstm', 'LSTM', 'nlp'], ['scikit-learn', 'Scikit-learn', 'machine-learning'],
  ['pandas', 'Pandas', 'machine-learning'], ['imbalanced-learn', 'Imbalanced-learn', 'machine-learning'],
  ['random-forest', 'Random Forest', 'machine-learning'], ['gradient-boosting', 'Gradient Boosting', 'machine-learning'],
  ['smote', 'SMOTE / SMOTETomek', 'machine-learning'], ['ml-kit', 'Google ML Kit', 'applied-ai'],
  ['deepseek', 'DeepSeek API', 'applied-ai'], ['tika', 'Apache Tika', 'applied-ai'],
  ['oauth', 'OAuth 2.0', 'api-security'], ['pkce', 'PKCE', 'api-security'],
  ['jwt', 'JWT', 'api-security'], ['spring-security', 'Spring Security', 'api-security'],
  ['jest', 'Jest', 'testing-tools'], ['junit', 'JUnit', 'testing-tools'],
  ['mockito', 'Mockito', 'testing-tools'], ['bcrypt', 'bcrypt', 'api-security'],
  ['multer', 'Multer', 'api-security'], ['sockets', 'Sockets TCP / UDP / Multicast', 'networking'],

  ['dotnet', '.NET', 'backend'], ['sql', 'SQL', 'languages'],
  ['jquery', 'jQuery', 'frontend-mobile'], ['html', 'HTML', 'frontend-mobile'], ['css', 'CSS', 'frontend-mobile'],
  ['rest', 'API REST', 'api-security'], ['rbac', 'Contrôle d’accès par rôles', 'api-security'],
  ['oop', 'Programmation orientée objet', 'architecture'], ['mvc', 'MVC', 'architecture'],
  ['layered-architecture', 'Architecture en couches', 'architecture'],
  ['clean-architecture-principles', 'Principes de Clean Architecture', 'architecture'],
  ['repository-pattern', 'Repository', 'architecture'],
  ['command-pattern', 'Command', 'architecture'], ['decorator-pattern', 'Decorator', 'architecture'],
  ['observer-pattern', 'Observer', 'architecture'], ['factory-pattern', 'Factory', 'architecture'],
  ['solid-principles', 'Principes SOLID', 'architecture'], ['transactions', 'Transactions', 'data'],
  ['olap', 'OLAP', 'bi'], ['kpi', 'Tableaux de bord KPI', 'bi'],
  ['cnn', 'CNN', 'deep-learning'], ['transfer-learning', 'Transfert d’apprentissage', 'deep-learning'],
  ['fine-tuning', 'Fine-tuning', 'deep-learning'], ['data-augmentation', 'Augmentation des données', 'deep-learning'],
  ['early-stopping', 'Early Stopping', 'deep-learning'], ['model-checkpointing', 'Sauvegarde de checkpoints', 'deep-learning'],
  ['seq2seq', 'Seq2Seq', 'nlp'], ['encoder-decoder', 'Encodeur-décodeur', 'nlp'],
  ['teacher-forcing', 'Teacher forcing', 'nlp'], ['greedy-decoding', 'Décodage glouton', 'nlp'],
  ['eda', 'Analyse exploratoire', 'machine-learning'], ['preprocessing', 'Prétraitement', 'machine-learning'],
  ['binary-classification', 'Classification binaire', 'machine-learning'], ['model-comparison', 'Comparaison de modèles', 'machine-learning'],
  ['data-mining', 'Data Mining', 'machine-learning'],
  ['ocr', 'OCR', 'applied-ai'], ['barcode-scanning', 'Scan QR / codes-barres', 'applied-ai'],
  ['language-detection', 'Identification de langue', 'applied-ai'], ['on-device-translation', 'Traduction sur l’appareil', 'applied-ai'],
  ['document-analysis', 'Analyse documentaire assistée', 'applied-ai'], ['weighted-matching', 'Matching pondéré par règles', 'applied-ai'],
  ['tcp', 'TCP', 'networking'], ['udp', 'UDP', 'networking'], ['ipv4-multicast', 'Multicast IPv4', 'networking'],
  ['multithreading', 'Multithreading', 'networking'], ['mock-testing', 'Tests avec mocks', 'testing-tools'],
];

const a2softIds = new Set(['windev-mobile', 'wlanguage', 'hfsql']);
const cvOnlyIds = new Set(['dotnet', 'sql', 'jquery', 'html', 'css', ...a2softIds]);

export const skills: readonly Skill[] = entries.map(([id, name, category]) => {
  const demonstratedBy = projects.filter(project => project.relatedSkills.includes(id));
  if (!demonstratedBy.length && !cvOnlyIds.has(id)) throw new Error('Skill has no verified source: ' + id);
  return {
    id, name, category,
    projectIds: demonstratedBy.map(project => project.id),
    evidence: demonstratedBy.length > 0
      ? demonstratedBy.map(project => ({ source: 'repository' as const, reference: project.githubUrl }))
      : [{ source: 'cv' as const, reference: a2softIds.has(id) ? 'Extrait CV fourni par le propriétaire — stage A2soft, juillet–août 2022' : 'CV local — compétences et expérience Clinisys' }],
  };
});
export const technologyNames = new Map(skills.map(skill => [skill.id, skill.name]));
