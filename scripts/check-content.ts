import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { projects } from '../src/data/projects.ts';
import { skills } from '../src/data/skills.ts';
import { experiences } from '../src/data/experience.ts';
import { education } from '../src/data/education.ts';
import { profile } from '../src/data/profile.ts';
import { engineeringFocus } from '../src/data/engineering-focus.ts';
import { validateContent } from '../src/utils/validate-content.ts';
import { categories } from '../src/data/categories.ts';
import { localizedPath } from '../src/i18n/routes.ts';

const issues = [...validateContent({ projects, skills, experiences, education, profile, engineeringFocus })];
const studies: { slug: string; locale: string; draft: boolean }[] = [];
for (const locale of ['fr', 'en']) {
  const directory = resolve('src/content/case-studies', locale);
  for (const name of readdirSync(directory).filter(name => name.endsWith('.md'))) {
    const content = readFileSync(join(directory, name), 'utf8');
    const slug = content.match(/^projectSlug:\s*(.+)$/m)?.[1]?.trim() ?? '';
    const declaredLocale = content.match(/^locale:\s*(.+)$/m)?.[1]?.trim();
    const draft = content.match(/^draft:\s*(true|false)$/m)?.[1] !== 'false';
    if (/[A-Za-z]\?[A-Za-z]|\uFFFD/.test(content)) issues.push(`Case study ${name}: damaged text encoding`);
    if (!projects.some(project => project.slug === slug)) issues.push(`Case study ${name}: unknown project`);
    if (declaredLocale !== locale) issues.push(`Case study ${name}: locale/folder mismatch`);
    if (studies.some(study => study.slug === slug && study.locale === locale)) issues.push(`Duplicate case study ${slug}/${locale}`);
    studies.push({ slug, locale, draft });
  }
}
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
else {
  console.log(`Content validated: ${projects.length} projects, ${projects.filter(project => project.featured).length} featured, ${skills.length} skills, ${studies.length} editorial drafts/entries.`);
  if (process.argv.includes('--report')) {
    const clean = (value: string) => value.replaceAll('|', '\\|').replaceAll('\n', ' ');
    const rows = projects.map(project => {
      const projectStudies = studies.filter(study => study.slug === project.slug);
      const studyStatus = projectStudies.length ? projectStudies.map(study => `${study.draft ? 'Brouillon' : 'Publiée'} ${study.locale.toUpperCase()}`).join(', ') : 'Non prévue';
      return `| ${clean(project.title)} | ${project.featured ? 'Oui' : 'Non'} | ${project.categories.map(category => categories[category].fr).join(', ')} | ${project.technologies.map(id => skills.find(skill => skill.id === id)?.name ?? id).join(', ')} | [Dépôt](${project.githubUrl}) | ${studyStatus} | ${project.screenshots.length} | ${project.videoDemo ? `[Vidéo vérifiée](${project.videoDemo.url})` : project.demo ? 'Vérifiée' : 'Aucune'} |`;
    });
    const relationships = skills.filter(skill => skill.projectIds.length > 0).map(skill => `| ${clean(skill.name)} | ${skill.projectIds.map(id => projects.find(project => project.id === id)?.title).join(', ')} |`);
    const routes = projects.map(project => `| ${project.id} | ${localizedPath('fr', '/projects/' + project.slug)} | ${localizedPath('en', '/projects/' + project.slug)} |`);
    const report = '# Contrôle du contenu\n\nGénéré par `npm run report:data` depuis les données locales validées, études FR/EN incluses. Ce tableau décrit le contenu ; il ne prétend pas que les tests des dépôts sources ont été exécutés.\n\n' +
      '| Project | Featured | Categories | Technologies | GitHub | Case Study | Screenshot | Demo |\n|---|---|---|---|---|---|---|---|\n' + rows.join('\n') +
      '\n\n## Compétences et preuves\n\n| Compétence | Projets vérifiés |\n|---|---|\n' + relationships.join('\n') +
      '\n\nCompétences fondées sur le CV seul : ' + skills.filter(skill => !skill.projectIds.length).map(skill => skill.name).join(', ') + '.\n\n## Routes\n\n| ID | FR | EN |\n|---|---|---|\n' + routes.join('\n') + '\n';
    writeFileSync(resolve('docs/content-audit.md'), report);
    console.log('Report written: docs/content-audit.md');
  }
}
