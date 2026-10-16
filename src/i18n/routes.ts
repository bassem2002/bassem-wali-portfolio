import type { Locale } from '../types/content.ts';

export function localizedPath(locale: Locale, path = '/') {
  const cleaned = path.replace(/^\/+|\/+$/g, '');
  return `${locale === 'en' ? '/en' : ''}/${cleaned ? `${cleaned}/` : ''}`;
}

export function alternatePath(pathname: string, locale: Locale) {
  if (/^\/(?:en\/)?404(?:\.html)?\/?$/.test(pathname)) return locale === 'en' ? '/en/404/' : '/404.html';
  const unprefixed = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localizedPath(locale, unprefixed);
}

export function switchLocation(pathname: string, locale: Locale, search = '', hash = '') {
  const path = alternatePath(pathname, locale);
  const params = new URLSearchParams();
  if (/\/(?:en\/)?projects\/$/.test(path)) {
    const original = new URLSearchParams(search);
    for (const key of ['category', 'technology', 'q']) {
      const value = original.get(key);
      if (value) params.set(key, value);
    }
  }
  const stableAnchors = new Set(['projects', 'skills', 'expertise', 'experience', 'education', 'about', 'contact', 'overview', 'features', 'architecture', 'complete-stack', 'demonstrates', 'related-projects', 'case-study-heading']);
  const anchor = stableAnchors.has(hash.slice(1)) ? hash : '';
  return path + (params.size ? `?${params}` : '') + anchor;
}
