import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { projects } from '../src/data/projects.ts';
import { localizedPath } from '../src/i18n/routes.ts';
// Separate fixture build: no production origin is configured or invented.
const root = '.qa/seo-build';
const origin = 'https://portfolio.example';
const build = spawnSync(process.execPath, ['scripts/astro.mjs', 'build', '--outDir', root], {
  encoding: 'utf8', env: { ...process.env, SITE_URL: origin, INCLUDE_QA_ROUTES: '1' },
});
assert.equal(build.status, 0, build.stderr || build.stdout);
const paths = ['/', '/projects/', ...projects.map(project => `/projects/${project.slug}/`)];
for (const path of paths) {
  for (const locale of ['fr', 'en']) {
    const route = localizedPath(locale, path);
    const html = await readFile(join(root, route, 'index.html'), 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, origin + route);
    const expected = { fr: origin + localizedPath('fr', path), en: origin + localizedPath('en', path), 'x-default': origin + localizedPath('fr', path) };
    for (const [lang, url] of Object.entries(expected)) {
      assert.ok(html.includes(`hreflang="${lang}" href="${url}"`), `${route}: ${lang}`);
      await readFile(join(root, new URL(url).pathname, 'index.html'), 'utf8');
    }
    assert.ok(html.includes(`property="og:locale" content="${locale === 'fr' ? 'fr_FR' : 'en_GB'}"`));
  }
}
for (const route of ['design-system/index.html', 'en/design-system/index.html', 'data-preview/index.html', '404.html', 'en/404/index.html']) {
  const html = await readFile(join(root, route), 'utf8');
  assert.ok(html.includes('name="robots" content="noindex, nofollow"'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('rel="alternate"'));
}
console.log('Configured-origin fixture passed: 32 locale routes, canonical, reciprocal FR/EN/x-default hreflang, existing targets and QA/404 exclusions.');
