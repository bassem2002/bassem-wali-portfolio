import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, sep, extname } from 'node:path';
import { chromium } from 'playwright-core';
import { projects } from '../src/data/projects.ts';
import { relatedProjects } from '../src/utils/related-projects.ts';

const executable = process.env.BROWSER_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/chromium', '/usr/bin/google-chrome'].find(path => existsSync(path));
assert.ok(executable, 'Set BROWSER_PATH to an installed Chromium browser.');
const root = resolve('dist');
const artifacts = resolve('.qa/case-studies');
await mkdir(artifacts, { recursive: true });
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname));
    if (file !== root && !file.startsWith(root + sep)) throw Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    response.setHeader('Content-Type', mime[extname(file)] ?? 'application/octet-stream');
    response.end(await readFile(file));
  } catch { response.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const featured = projects.filter(project => project.featured);
const names = { rezouette: 'rezouette', smartalumni: 'smartalumni', 'enterprise-bi-dashboard': 'bi-dashboard', 'min-draw-fx': 'mindrawfx', 'waste-classification': 'waste' };
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
      for (const project of featured) {
        const response = await page.goto(`${base}/projects/${project.slug}/`, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('h1').textContent(), project.title);
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), true);
        assert.equal(await page.locator('.skip-link').evaluate(element => getComputedStyle(element).clipPath), 'none');
        await page.keyboard.press('Enter');
        assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
        assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
        assert.ok((await page.title()).includes(project.title));
        assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
        assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), await page.title());
        assert.equal(await page.locator('.case-breadcrumb a[href="/"]').count(), 1);
        assert.equal(await page.locator('.case-breadcrumb a[href="/projects/"]').count(), 1);
        assert.equal(await page.locator('.case-breadcrumb [aria-current="page"]').textContent(), project.title);
        assert.equal(await page.locator(`.case-repository a[href="${project.githubUrl}"]`).count(), 1);
        assert.ok(await page.locator('[id="décisions-techniques"]').count());
        assert.ok(await page.locator('#limites-actuelles').count());
        const diagramCount = await page.locator('.architecture-diagram').count();
        assert.ok(diagramCount >= 1);
        assert.equal(await page.locator('.architecture-diagram svg[role="img"] title').count(), diagramCount);
        assert.equal(await page.locator('.architecture-diagram svg desc').count(), diagramCount);
        assert.equal(await page.locator('.architecture-diagram figcaption').count(), diagramCount);
        assert.equal(await page.locator('.case-hero .tech-tag').count() <= 6, true);
        const hierarchy = await page.locator('main h1, main h2, main h3, main h4').evaluateAll(elements => elements.map(element => Number(element.tagName.slice(1))));
        hierarchy.forEach((level, index) => { if (index) assert.ok(level <= hierarchy[index - 1] + 1, `${project.id}: heading hierarchy`); });
        const related = relatedProjects(project, projects);
        assert.deepEqual(await page.locator('.case-related a').evaluateAll(elements => elements.map(element => element.getAttribute('href'))), related.map(item => `/projects/${item.project.slug}/`));
        const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
        assert.equal(schema['@type'], 'SoftwareSourceCode');
        assert.equal(schema.codeRepository, project.githubUrl);
        assert.equal(schema.datePublished, undefined);
        assert.equal(schema.license, undefined);
        assert.equal(schema.author, undefined);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${project.id}/${width}/${theme}: overflow`);
        await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
        const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
        assert.deepEqual(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), [], `${project.id}/${width}/${theme}: axe`);
        const navigation = page.locator('.case-navigation a[href="#architecture"]');
        await navigation.focus();
        assert.ok(parseFloat(await navigation.evaluate(element => getComputedStyle(element).outlineWidth)) >= 3);
        await page.keyboard.press('Enter');
        assert.equal(new URL(page.url()).hash, '#architecture');
        const fallback = page.locator('.architecture-diagram summary').first();
        await fallback.focus();
        await page.keyboard.press('Space');
        assert.equal(await fallback.evaluate(element => element.parentElement.open), true);
        assert.ok(await page.locator('.architecture-diagram details').first().locator('li').count() >= 2);
        await page.keyboard.press('Space');
        const capture = width === 1440 || width === 375;
        if (capture) {
          const name = `${names[project.id]}-${width === 375 ? 'mobile' : 'desktop'}-${theme}`;
          await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0); });
          await page.screenshot({ path: join(artifacts, `${name}.png`), fullPage: true });
          await page.screenshot({ path: join(artifacts, `${name}-viewport.png`) });
          await page.locator('section[aria-labelledby="architecture"]').screenshot({ path: join(artifacts, `${name}-architecture.png`) });
        }
        assert.deepEqual(errors, []);
        report.push({ project: project.id, width, theme, overflow: false, axeViolations: 0, keyboard: true, metadata: true, related: true });
      }
      await context.close();
      console.log(`Case studies passed: ${width}px / ${theme}`);
    }
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 }, colorScheme: 'dark' });
  const page = await context.newPage();
  for (const project of featured) {
    await page.goto(`${base}/projects/${project.slug}/`);
    assert.equal(await page.locator('.case-study').count(), 1);
    await page.locator('.architecture-diagram summary').first().click();
    assert.equal(await page.locator('.architecture-diagram details').first().evaluate(element => element.open), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  }
  await context.close();
  const links = await browser.newPage();
  await links.goto(`${base}/projects/`);
  assert.equal(await links.locator('.project-card a[href*="#case-study-heading"]').count(), 5);
  await links.locator('[data-project-id="smartalumni"] a[href*="#case-study-heading"]').click();
  assert.equal(new URL(links.url()).pathname, '/projects/smartalumni-iit/');
  await links.goto(base);
  assert.equal(await links.locator('#projects .project-card').count(), 5);
  assert.equal(await links.locator('#projects a[href*="#case-study-heading"]').count(), 5);
  await links.goto(`${base}/en/projects/rezouette/`);
  assert.equal(await links.locator('.case-study').count(), 1);
  await links.close();
  await writeFile(join(artifacts, 'report.json'), JSON.stringify({ checks: report, noJavaScript: true, featuredCTAs: 5, englishCaseAvailable: true }, null, 2));
  console.log(`Case studies QA passed: ${report.length} page/viewport/theme combinations; no-JS, published CTAs and English case study passed.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
