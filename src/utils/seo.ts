import { site } from '../config/site.ts';
import { alternatePath } from '../i18n/routes.ts';
import { profile } from '../data/profile.ts';
import type { Locale, Project } from '../types/content.ts';

export function absoluteUrl(path: string, origin = site.url) {
  return origin ? new URL(path, origin).href : undefined;
}

export function pageSeo(locale: Locale, pathname: string, title: string, description: string, origin = site.url) {
  return {
    locale, title: `${title} | ${site.name}`, description,
    canonical: absoluteUrl(pathname, origin),
    alternates: ['fr', 'en'].map(lang => ({
      lang, url: absoluteUrl(alternatePath(pathname, lang as Locale), origin),
    })),
    noindex: !site.readyForIndexing || !origin,
  };
}

export function personSchema(locale: Locale = 'fr') {
  return {
    '@context': 'https://schema.org', '@type': 'Person',
    name: profile.name,
    jobTitle: profile.status[locale],
    ...(site.url ? { url: site.url } : {}),
    sameAs: [profile.links.github, profile.links.linkedin],
  };
}

export function projectSchema(project: Project, locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'SoftwareSourceCode',
    name: project.title, description: project.summary[locale],
    codeRepository: project.githubUrl, inLanguage: locale,
    // No authorship or production claims are inferred from repository ownership.
  };
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
