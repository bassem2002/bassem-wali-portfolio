import type { Project, Locale } from '../types/content.ts';
import { localizedPath } from '../i18n/routes.ts';
interface CrawlSettings { url: string | undefined; readyForIndexing: boolean }
export function publicPaths(projects: readonly Project[], locales: readonly Locale[]) {
  return locales.flatMap(locale => [localizedPath(locale), localizedPath(locale, '/projects/'), ...projects.map(project => localizedPath(locale, `/projects/${project.slug}`))]);
}
export function robotsText(settings: CrawlSettings) {
  return settings.readyForIndexing && settings.url ? `User-agent: *\nAllow: /\nSitemap: ${settings.url}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n';
}
const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[character] ?? character));
export function sitemapText(paths: readonly string[], settings: CrawlSettings) {
  const entries = settings.url && settings.readyForIndexing ? paths.map(path => `<url><loc>${escapeXml(new URL(path, settings.url).href)}</loc></url>`).join('') : '';
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
}
