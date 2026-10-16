import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, sep, extname, relative } from 'node:path';
import { chromium } from 'playwright-core';
import { projects } from '../src/data/projects.ts';
import { profile } from '../src/data/profile.ts';
import { alternatePath } from '../src/i18n/routes.ts';
const root = resolve('dist');
const artifacts = resolve('.qa/i18n');
await mkdir(artifacts, { recursive: true });
async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? htmlFiles(join(directory, entry.name)) : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []))).flat();
}
const files = await htmlFiles(root);
for (const file of files) {
  const path = '/' + relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  const english = path.startsWith('/en/');
  const html = await readFile(file, 'utf8');
  assert.ok(html.includes(`lang="${english ? 'en' : 'fr'}"`), path);
  assert.doesNotMatch(html, /translation_missing|undefined<\/|>\s*undefined\s*</, path);
  if (/design-system|data-preview/.test(path)) continue;
  for (const match of html.matchAll(/<a\b[^>]*>/g)) {
    const tag = match[0];
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (!href?.startsWith('/') || tag.includes('data-language-switch')) continue;
    assert.equal(href.startsWith('/en/'), english, `${path}: cross-locale link ${href}`);
  }
  for (const match of html.matchAll(/<link\b[^>]*hreflang[^>]*>/g)) {
    const href = match[0].match(/href="([^"]+)"/)?.[1];
    if (!href) continue;
    const target = new URL(href).pathname;
    assert.ok(existsSync(join(root, '.' + target, 'index.html')), `Missing hreflang target: ${target}`);
  }
}
assert.equal(files.length, 2 * (projects.length + 2) + 2);
const featured = projects.filter(project => project.featured);
const cases = [
  { name: 'home', path: '/en/', type: 'home' },
  { name: 'projects', path: '/en/projects/', type: 'projects' },
  ...featured.map(project => ({ name: project.id === 'min-draw-fx' ? 'mindrawfx' : project.id, path: `/en/projects/${project.slug}/`, type: 'case', project })),
];
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  try {
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) throw Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(await readFile(join(root, url.pathname.startsWith('/en/') ? 'en/404/index.html' : '404.html')));
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const executable = process.env.BROWSER_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/chromium', '/usr/bin/google-chrome'].find(path => existsSync(path));
assert.ok(executable, 'Set BROWSER_PATH to an installed Chromium browser.');
const report = [];
let browser;
try {
  browser = await chromium.launch({ executablePath: executable, headless: true });
  for (const width of [375, 768, 1024, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const item of cases) {
        await page.goto(base + item.path, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('html').getAttribute('lang'), 'en');
        assert.equal(await page.locator('.current-language').textContent(), 'EN');
        assert.equal(await page.locator('.current-language').getAttribute('aria-current'), 'true');
        assert.equal(await page.locator('.language-switcher').getAttribute('href'), alternatePath(item.path, 'fr'));
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('meta[property="og:locale"]').getAttribute('content'), 'en_GB');
        assert.equal(await page.locator('meta[property="og:locale:alternate"]').getAttribute('content'), 'fr_FR');
        assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${item.name}/${width}/${theme}: overflow`);
        const text = await page.locator('body').innerText();
        assert.doesNotMatch(text, /Voir le|Voir tous|Projets phares|Compétences|Réinitialiser|Aucun projet|Vue d’ensemble|Limites actuelles|Tableaux de bord|Programmation orientée/);
        assert.equal(await page.locator('a[href$=".pdf"]').count(), 0);
        assert.ok((await page.locator('a[href^="tel:"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))).every(href => href === `tel:${profile.phone.e164}`));
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), true);
        assert.equal(await page.locator('.skip-link').textContent(), 'Skip to content');
        await page.keyboard.press('Enter');
        assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
        await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
        const axe = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
        assert.deepEqual(axe.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), [], `${item.name}/${width}/${theme}: axe`);
        if (item.type === 'home') {
          assert.equal(await page.locator('#projects .project-card').count(), 5);
          for (const id of ['expertise', 'skills', 'experience', 'education', 'about', 'contact']) assert.equal(await page.locator(`#${id}`).count(), 1);
          assert.equal(await page.locator('#experience .experience-item').count(), 3);
          assert.equal(await page.locator('#education .education-item').count(), 4);
          assert.equal(await page.locator('img[alt="Portrait of Bassem Wali"]').count(), 1);
          assert.match(await page.locator('.theme-toggle').getAttribute('aria-label'), /^Switch to (light|dark) mode$/);
          assert.ok((await page.locator('.about-languages').textContent()).includes('Arabic · French · English'));
          assert.equal(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent()).jobTitle, 'Computer Engineering Student');
          if (width < 1200) {
            await page.locator('[data-menu-toggle]').focus();
            await page.keyboard.press('Space');
            assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'true');
            await page.locator('#site-navigation a[href="#skills"]').click();
            assert.equal(new URL(page.url()).hash, '#skills');
            assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'false');
          }
          for (const technology of ['spring-boot', 'angular', 'ssas', 'tensorflow', 'pytorch', 'javafx', 'laravel']) {
            await page.locator(`[data-technology-select="${technology}"]`).click();
            assert.deepEqual(await page.locator('[data-technology-results] li:visible').evaluateAll(elements => elements.map(element => element.dataset.projectId)), projects.filter(project => project.technologies.includes(technology)).map(project => project.id));
            assert.match(await page.locator('[data-technology-status]').textContent(), /projects? uses? /);
          }
          await page.locator('[data-technology-reset]').click();
          assert.equal(await page.locator('[data-technology-status]').textContent(), 'All matching projects are shown.');
          await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__copied = text; } } }); });
          await page.locator('[data-copy-email]').click();
          assert.equal(await page.evaluate(() => window.__copied), profile.email);
          assert.equal(await page.locator('[data-copy-status]').textContent(), 'Email address copied.');
          await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('Clipboard unavailable'); } } }); });
          await page.locator('[data-copy-email]').click();
          assert.equal(await page.locator('[data-copy-status]').textContent(), 'Copy is unavailable. You can select the email address above.');
          await page.locator('.theme-toggle').click();
          const changed = await page.locator('html').getAttribute('data-theme');
          assert.equal(changed, theme === 'light' ? 'dark' : 'light');
          await page.reload({ waitUntil: 'networkidle' });
          assert.equal(await page.locator('html').getAttribute('data-theme'), changed);
          await page.locator('.theme-toggle').click();
          assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
        } else if (item.type === 'projects') {
          assert.equal(await page.locator('.project-card').count(), 14);
          await page.locator('[data-project-filters] summary').click();
          for (const category of ['', ...new Set(projects.flatMap(project => project.categories))]) {
            await page.locator(`[data-category="${category}"]`).click();
            assert.deepEqual(await page.locator('.project-grid > li:visible').evaluateAll(elements => elements.map(element => element.dataset.projectId)), projects.filter(project => !category || project.categories.includes(category)).map(project => project.id));
          }
          await page.locator('[data-project-filters] [data-reset]').click();
          await page.locator('[data-tech="pytorch"]').click();
          assert.equal(await page.locator('[data-project-count]').textContent(), '1 project of 14');
          await page.locator('[data-category="mobile"]').click();
          assert.equal(await page.locator('[data-project-count]').textContent(), '0 projects of 14');
          assert.equal(await page.locator('[data-project-empty] h2').textContent(), 'No projects match your filters.');
          await page.locator('[data-project-empty] [data-reset]').click();
          await page.locator('#project-search').fill('neural');
          assert.equal(await page.locator('.project-grid > li:visible').count(), 0);
          await page.locator('#project-search').fill('LSTM');
          assert.equal(await page.locator('[data-project-count]').textContent(), '1 project of 14');
          await page.locator('[data-project-filters] [data-reset]').click();
          await page.locator('[data-project-filters] summary').click();
        } else {
          assert.equal(await page.locator('h1').textContent(), item.project.title);
          assert.equal(await page.locator('.case-features li').count(), item.project.features.en.length);
          assert.equal(await page.locator('[id="technical-decisions"]').count(), 1);
          assert.equal(await page.locator('[id="current-limitations"]').count(), 1);
          assert.ok(await page.locator('.architecture-diagram').count());
          assert.equal(await page.locator('.architecture-diagram').count(), await page.locator('.architecture-diagram svg desc').count());
          await page.locator('.architecture-diagram summary').first().focus();
          await page.keyboard.press('Space');
          assert.equal(await page.locator('.architecture-diagram details').first().evaluate(element => element.open), true);
          await page.keyboard.press('Space');
          assert.ok(await page.locator(`.case-repository a[href="${item.project.githubUrl}"]`).count());
        }
        if ([375, 1440].includes(width)) {
          const name = `${item.name}-en-${width === 375 ? 'mobile' : 'desktop'}-${theme}`;
          await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0); });
          await page.screenshot({ path: join(artifacts, `${name}.png`), animations: 'disabled' });
          await page.screenshot({ path: join(artifacts, `${name}-full.png`), fullPage: true, animations: 'disabled' });
          if (item.type === 'case') await page.locator('section[aria-labelledby="architecture"]').screenshot({ path: join(artifacts, `${name}-architecture.png`), animations: 'disabled' });
        }
        assert.deepEqual(errors, []);
        report.push({ path: item.path, width, theme, overflow: false, axeViolations: 0, interactions: true });
      }
      await context.close();
      console.log(`English QA passed: ${width}px / ${theme}`);
    }
  }
  const context = await browser.newContext({ viewport: { width: 375, height: 900 } });
  const page = await context.newPage();
  for (const path of ['/', '/en/', '/projects/', '/projects/rezouette/', '/en/projects/mindrawfx/']) {
    await page.goto(base + path);
    const target = alternatePath(path, path.startsWith('/en/') ? 'fr' : 'en');
    await page.locator('.language-switcher').click();
    assert.equal(new URL(page.url()).pathname, target);
  }
  await page.goto(`${base}/projects/?technology=pytorch&category=nlp`);
  await page.locator('.language-switcher').click();
  assert.equal(new URL(page.url()).pathname, '/en/projects/');
  assert.equal(new URL(page.url()).searchParams.get('technology'), 'pytorch');
  assert.equal(await page.locator('.project-grid > li:visible').count(), 1);
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const item of cases) {
      await page.goto(base + alternatePath(item.path, 'fr'));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `FR regression ${item.name}/${width}`);
    }
  }
  await page.goto(`${base}/en/missing-page/`);
  assert.equal(await page.locator('h1').textContent(), 'Page not found');
  await context.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 }, colorScheme: 'dark' });
  const fallback = await noJs.newPage();
  await fallback.goto(`${base}/en/`);
  assert.equal(await fallback.locator('[data-technology-fallback]').isVisible(), true);
  assert.equal(await fallback.locator('#site-navigation').isVisible(), true);
  await fallback.goto(`${base}/en/projects/`);
  assert.equal(await fallback.locator('.project-card').count(), 14);
  assert.equal(await fallback.locator('[data-project-filters]').isVisible(), false);
  await fallback.goto(`${base}/en/projects/mindrawfx/`);
  await fallback.locator('.architecture-diagram summary').first().click();
  assert.equal(await fallback.locator('.architecture-diagram details').first().evaluate(element => element.open), true);
  await noJs.close();
  await writeFile(join(artifacts, 'report.json'), JSON.stringify({ htmlPages: files.length, englishChecks: report, frenchRegressionChecks: 14, contextualSwitch: true, preservedFilters: true, noJavaScript: true }, null, 2));
  console.log(`i18n QA passed: ${files.length} HTML pages checked; ${report.length} English page/viewport/theme cases, 14 French regressions, contextual switching, filtering and no-JS verified.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
