import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { locales } from '../src/types/content.ts';
import { publicPaths, robotsText, sitemapText } from '../src/utils/crawling.ts';
test('crawl policy protects previews and exposes exactly the public FR/EN routes when enabled', () => {
  const paths = publicPaths(projects, locales);
  assert.equal(paths.length, 32);
  assert.equal(new Set(paths).size, 32);
  assert.ok(paths.every(path => !/design-system|data-preview|404|\.qa|_astro/.test(path)));
  assert.equal(paths.filter(path => path.startsWith('/en/')).length, 16);
  const enabled = { url: 'https://portfolio.example', readyForIndexing: true };
  assert.equal(robotsText(enabled), 'User-agent: *\nAllow: /\nSitemap: https://portfolio.example/sitemap.xml\n');
  const sitemap = sitemapText(paths, enabled);
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 32);
  for (const path of paths) assert.ok(sitemap.includes(`<loc>https://portfolio.example${path}</loc>`));
  for (const settings of [{ ...enabled, readyForIndexing: false }, { ...enabled, url: undefined }]) {
    assert.equal(robotsText(settings), 'User-agent: *\nDisallow: /\n');
    assert.ok(!sitemapText(paths, settings).includes('<url>'));
  }
});
