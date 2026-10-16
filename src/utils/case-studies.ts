import { getCollection } from 'astro:content';
import type { Locale } from '@/types/content';
import { validateStudyParity } from './i18n-parity';
import { projects } from '@/data/projects';

export async function publishedCaseStudy(projectSlug: string, locale: Locale) {
  const entries = await getCollection('caseStudies', entry => !entry.data.draft);
  const issues = validateStudyParity(entries, projects.filter(project => project.featured).map(project => project.slug));
  if (issues.length) throw new Error(issues.join('\n'));
  const matches = entries.filter(entry => entry.data.projectSlug === projectSlug && entry.data.locale === locale);
  if (matches.length > 1) throw new Error(`Duplicate published case study: ${projectSlug}/${locale}`);
  return matches[0];
}
