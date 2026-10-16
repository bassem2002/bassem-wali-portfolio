import type { Locale } from '../types/content.ts';
export interface StudyForParity {
  data: {
    projectSlug: string; locale: Locale; draft: boolean; sources: readonly string[];
    heroTechnologies?: readonly string[] | undefined; demonstratedSkills?: readonly string[] | undefined;
    diagrams?: readonly { id: string; steps: readonly string[] }[] | undefined;
  };
  body?: string;
}
const sectionKeys: Readonly<Record<string, string>> = {
  'Transitions de publication': 'publication-state', 'Publication State Transitions': 'publication-state',
  'Du texte au classement': 'profile-ranking', 'From Text to Ranking': 'profile-ranking',
  'Quand un filtre vise la hiérarchie de l’axe': 'mdx-axis', 'When a Filter Targets the Axis Hierarchy': 'mdx-axis',
  'L’action comme objet': 'command-object', 'The Action as an Object': 'command-object',
  'Une fusion de branches, pas un DenseNet complet': 'cnn-fusion', 'Branch Fusion, Not a Complete DenseNet': 'cnn-fusion',
  'Décisions techniques': 'decisions', 'Technical Decisions': 'decisions',
  'Intégrations et analytics': 'integrations', 'Integration Status and Analytics': 'integrations',
  'Authentification et accès': 'access', 'Authentication and Access': 'access',
  'Lecture BI et dépendances': 'bi', 'BI Analysis and Dependencies': 'bi',
  'Design patterns en pratique': 'patterns', 'Design Patterns in Practice': 'patterns',
  'Tests et vérification': 'testing', 'Testing and Verification': 'testing',
  'Expérimentations et vérification': 'experiments', 'Experiments and Verification': 'experiments',
  'Limites actuelles': 'limitations', 'Current Limitations': 'limitations',
};
export function validateStudyParity(entries: readonly StudyForParity[], slugs: readonly string[]) {
  const issues: string[] = [];
  const published = entries.filter(entry => !entry.data.draft);
  const shape = (entry: StudyForParity) => {
    const headings = [...(entry.body ?? '').matchAll(/^## (.+)$/gm)].map(match => sectionKeys[match[1]!.trim()] ?? `unknown:${match[1]}`);
    if (!headings.includes('decisions') || !headings.includes('limitations') || !headings.some(key => ['testing', 'experiments'].includes(key))) issues.push(`Missing important section: ${entry.data.projectSlug}/${entry.data.locale}`);
    if (headings.some(key => key.startsWith('unknown:'))) issues.push(`Unmapped section: ${entry.data.projectSlug}/${entry.data.locale}`);
    return {
      headings, subheadings: [...(entry.body ?? '').matchAll(/^### /gm)].length,
      sources: entry.data.sources, hero: entry.data.heroTechnologies,
      skills: entry.data.demonstratedSkills,
      diagrams: entry.data.diagrams?.map(diagram => ({ id: diagram.id, stepCount: diagram.steps.length })),
      limitationCount: (entry.body ?? '').split(/^## (?:Limites actuelles|Current Limitations)$/m)[1]?.match(/^- /gm)?.length,
    };
  };
  for (const entry of published) if (!slugs.includes(entry.data.projectSlug)) issues.push(`Unexpected published study: ${entry.data.projectSlug}`);
  for (const slug of slugs) {
    const fr = published.filter(entry => entry.data.projectSlug === slug && entry.data.locale === 'fr');
    const en = published.filter(entry => entry.data.projectSlug === slug && entry.data.locale === 'en');
    if (fr.length !== 1 || en.length !== 1) { issues.push(`Expected one published study per locale: ${slug}`); continue; }
    if (JSON.stringify(shape(fr[0]!)) !== JSON.stringify(shape(en[0]!))) issues.push(`Case study parity mismatch: ${slug}`);
  }
  return issues;
}
