import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, sep, extname } from 'node:path';
import { chromium } from 'playwright-core';
import { projects } from '../src/data/projects.ts';

const executable = process.env.BROWSER_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/chromium', '/usr/bin/google-chrome'].find(path => existsSync(path));
assert.ok(executable, 'Set BROWSER_PATH to an installed Chromium browser.');
const root = resolve('dist');
const artifacts = resolve('.qa/projects');
await mkdir(artifacts, { recursive: true });
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + sep)) throw Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
    response.end(await readFile(file));
  } catch { response.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const report = [];
let browser;
try {
  browser = await chromium.launch({ executablePath: executable, headless: true });
  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const visibleIds = () => page.locator('.project-grid > li:visible').evaluateAll(elements => elements.map(element => element.dataset.projectId));
      const reset = () => page.locator('[data-project-filters] [data-reset]').click();
      await page.goto(`${base}/projects/`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').textContent(), 'Tous les projets');
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      assert.equal(await page.title(), 'Tous les projets | Bassem Wali');
      assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), await page.title());
      assert.deepEqual(await visibleIds(), projects.map(project => project.id));
      assert.equal(await page.locator('.project-card--featured').count(), 5);
      for (const project of projects) {
        const card = page.locator(`[data-project-id="${project.id}"]`);
        assert.equal(await card.locator(`a[href="${project.githubUrl}"]`).count(), 1);
        assert.equal(await card.locator('a[href*="#case-study-heading"]').count(), project.featured ? 1 : 0, 'Only published featured case studies have a case study CTA');
        const tagCount = await card.locator('.tech-tag').count();
        assert.equal(tagCount, Math.min(4, project.technologies.length));
      }
      assert.equal(await page.locator('a[href$=".pdf"]').count(), 0);
      assert.equal(await page.locator('[data-video-demo]').count(), projects.filter(project => project.videoDemo).length);
      for (const project of projects) assert.equal(await page.locator(`[data-project-id="${project.id}"] [data-video-demo]`).count(), project.videoDemo ? 1 : 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}/${theme}: initial overflow`);
      if ([375, 1440].includes(width)) {
        await page.screenshot({ path: join(artifacts, `${width === 375 ? 'mobile' : 'desktop'}-${theme}.png`), fullPage: true });
        await page.screenshot({ path: join(artifacts, `${width === 375 ? 'mobile' : 'desktop'}-${theme}-viewport.png`) });
      }
      const checkAxe = async () => {
        await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
        const results = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
        assert.deepEqual(results.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), [], `${width}/${theme}: accessibility`);
      };
      await checkAxe();
      const disclosure = page.locator('[data-project-filters]');
      if (!await disclosure.evaluate(element => element.open)) await disclosure.locator('summary').click();
      if (width === 375) await page.screenshot({ path: join(artifacts, `mobile-filters-${theme}.png`), fullPage: false });
      for (const category of ['', ...new Set(projects.flatMap(project => project.categories))]) {
        const button = page.locator(`[data-category="${category}"]`);
        await button.focus();
        await page.keyboard.press('Space');
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.ok(parseFloat(await button.evaluate(element => getComputedStyle(element).outlineWidth)) >= 3);
        assert.deepEqual(await visibleIds(), projects.filter(project => !category || project.categories.includes(category)).map(project => project.id));
      }
      await reset();
      for (const technology of ['pytorch', 'tensorflow', 'ssas', 'javafx', 'laravel', 'flutter', 'spring-boot', 'angular']) {
        await page.locator(`[data-tech="${technology}"]`).click();
        assert.deepEqual(await visibleIds(), projects.filter(project => project.technologies.includes(technology)).map(project => project.id));
        assert.equal(new URL(page.url()).searchParams.get('technology'), technology);
      }
      await page.locator('#project-technology').selectOption('python');
      assert.deepEqual(await visibleIds(), projects.filter(project => project.technologies.includes('python')).map(project => project.id));
      await page.locator('[data-category="mobile"]').click();
      assert.deepEqual(await visibleIds(), []);
      assert.equal(await page.locator('[data-project-empty]').isVisible(), true);
      await checkAxe();
      await page.locator('[data-project-empty] [data-reset]').click();
      assert.equal((await visibleIds()).length, 14);
      assert.equal(new URL(page.url()).search, '');
      await page.locator('#project-search').fill('SPRING BOOT');
      assert.deepEqual(await visibleIds(), ['smartalumni', 'shopflow']);
      await page.locator('#project-search').fill('rézouette');
      assert.deepEqual(await visibleIds(), ['rezouette']);
      await reset();
      await page.locator('[data-category="machine-learning"]').click();
      if (width === 1440 && theme === 'light') {
        await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
        await page.screenshot({ path: join(artifacts, 'filtered-machine-learning.png'), fullPage: true });
      }
      await page.reload({ waitUntil: 'networkidle' });
      assert.deepEqual(await visibleIds(), projects.filter(project => project.categories.includes('machine-learning')).map(project => project.id));
      await page.locator('[data-category="mobile"]').click();
      await page.goBack();
      assert.equal(await page.locator('[data-category="machine-learning"]').getAttribute('aria-pressed'), 'true');
      await page.goForward();
      assert.equal(await page.locator('[data-category="mobile"]').getAttribute('aria-pressed'), 'true');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}/${theme}: filters overflow`);
      await checkAxe();
      await page.goto(`${base}/projects/?category=unknown&technology=unknown`, { waitUntil: 'networkidle' });
      assert.equal((await visibleIds()).length, 14);
      assert.equal(new URL(page.url()).search, '');
      await page.locator('.projects-page > a[href="/"]').click();
      assert.equal(await page.locator('#projects .project-card').count(), 5);
      assert.ok(await page.locator('a[href="/projects/"]').count());
      assert.deepEqual(errors, []);
      report.push({ width, theme, overflow: false, axeViolations: 0, filters: 'passed', links: 'passed', homepage: 'passed' });
      console.log(`Passed ${width}px / ${theme}`);
      await context.close();
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 }, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto(`${base}/projects/?category=mobile`);
  assert.equal(await page.locator('.project-grid > li:visible').count(), 14);
  assert.equal(await page.locator('[data-project-filters]').isVisible(), false);
  assert.equal(await page.locator('#site-navigation').isVisible(), true);
  await page.locator('[data-project-id="rezouette"] .project-card__title a').click();
  assert.equal(new URL(page.url()).pathname, '/projects/rezouette/');
  await context.close();
  await writeFile(join(artifacts, 'report.json'), JSON.stringify({ checks: report, noJavaScript: 'passed', screenshots: 'local only' }, null, 2));
  console.log(`Projects QA passed: ${report.length} viewport/theme combinations, filters, URLs, accessibility, links, homepage and no-JS fallback.`);
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
