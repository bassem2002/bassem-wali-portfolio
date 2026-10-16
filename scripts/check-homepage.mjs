import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, sep, extname } from 'node:path';
import { chromium } from 'playwright-core';
import { projects } from '../src/data/projects.ts';
import { profile } from '../src/data/profile.ts';

const executable = process.env.BROWSER_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/chromium', '/usr/bin/google-chrome',
].find(path => existsSync(path));
assert.ok(executable, 'Set BROWSER_PATH to an installed Chromium browser.');
const root = resolve('dist');
const artifacts = resolve('.qa/homepage');
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
const address = server.address();
const base = `http://127.0.0.1:${address.port}`;
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
      await page.goto(base, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').textContent(), profile.name);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}/${theme}: overflow`);
      assert.deepEqual(await page.locator('#projects .project-card__title').allTextContents(), projects.filter(project => project.featured).map(project => project.title));
      assert.equal(await page.locator('.home-skills .skill-group').count(), 7);
      assert.equal(await page.locator('#experience .experience-item').count(), 3);
      assert.equal(await page.locator('#education .education-item').count(), 4);
      assert.equal(await page.locator('a[href$=".pdf"]').count(), 0);
      assert.ok(await page.locator(`a[href="tel:${profile.phone.e164}"]`).count() > 0);
      assert.deepEqual(await page.locator('a[href^="tel:"]').evaluateAll(nodes => [...new Set(nodes.map(node => node.getAttribute('href')))]), [`tel:${profile.phone.e164}`]);
      assert.equal(await page.locator('.language-switcher').getAttribute('href'), '/en/');
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), true);
      assert.ok(parseFloat(await page.evaluate(() => getComputedStyle(document.activeElement).outlineWidth)) >= 3);
      await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
      if (width < 1200) {
        const menu = page.locator('[data-menu-toggle]');
        await menu.focus();
        await page.keyboard.press('Enter');
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#projects');
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.equal(await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle')), true);
        await menu.click();
        await page.locator('#site-navigation a[href="#skills"]').click();
        assert.equal(new URL(page.url()).hash, '#skills');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        await menu.click();
        await page.locator('h1').click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      } else assert.equal(await page.locator('#site-navigation').isVisible(), true);
      const payload = await page.locator('[data-technology-map]').textContent();
      const mapping = JSON.parse(payload);
      for (const [id, match] of Object.entries(mapping)) {
        const button = page.locator(`[data-technology-select="${id}"]`);
        await button.focus();
        await page.keyboard.press('Space');
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.ok(parseFloat(await button.evaluate(element => getComputedStyle(element).outlineWidth)) >= 3);
        const expected = projects.filter(project => project.technologies.includes(id));
        assert.deepEqual(match.projectIds, expected.map(project => project.id));
        assert.deepEqual(await page.locator('[data-technology-results] li:visible').evaluateAll(elements => elements.map(element => element.dataset.projectId)), match.projectIds);
        const highlighted = await page.locator('#projects .project-card[data-relation="highlighted"] .project-card__title').allTextContents();
        assert.deepEqual(highlighted, expected.filter(project => project.featured).map(project => project.title));
        assert.ok(await page.locator('[data-technology-status]').textContent());
        await page.locator('[data-technology-reset]').click();
        assert.equal(await page.locator('#projects .project-card[data-relation]').count(), 0);
      }
      await page.locator('[data-technology-select="pytorch"]').click();
      assert.deepEqual(await page.locator('[data-technology-results] li:visible').evaluateAll(elements => elements.map(element => element.dataset.projectId)), ['english-french-seq2seq']);
      await page.locator('[data-technology-select="pytorch"]').click();
      assert.equal(await page.locator('[data-technology-reset]').getAttribute('aria-pressed'), 'true');
      await page.locator('[data-theme-toggle]').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme === 'light' ? 'dark' : 'light');
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme === 'light' ? 'dark' : 'light');
      await page.locator('[data-theme-toggle]').click();
      await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
      for (const state of ['default', 'selected', 'menu']) {
        if (state === 'selected') await page.locator('[data-technology-select="ssas"]').click();
        if (state === 'menu' && width < 1200) await page.locator('[data-menu-toggle]').click();
        const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
        assert.deepEqual(result.violations.map(issue => ({ id: issue.id, nodes: issue.nodes.map(node => node.target) })), [], `${width}/${theme}/${state}: axe`);
      }
      if (width < 1200) await page.keyboard.press('Escape');
      await page.locator('[data-technology-reset]').click();
      await page.evaluate(() => {
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__qaEmail = text; } } });
      });
      await page.locator('[data-copy-email]').click();
      assert.equal(await page.evaluate(() => window.__qaEmail), profile.email);
      assert.equal(await page.locator('[data-copy-status]').textContent(), 'Adresse email copiée.');
      if (width === 375 || width === 1440) {
        const size = width === 375 ? 'mobile' : 'desktop';
        await page.evaluate(() => scrollTo(0, 0));
        await page.locator('[data-copy-status]').evaluate(element => { element.textContent = ''; });
        await page.screenshot({ path: join(artifacts, `${size}-${theme}.png`) });
        await page.screenshot({ path: join(artifacts, `${size}-${theme}-full.png`), fullPage: true });
        await page.locator('#projects').screenshot({ path: join(artifacts, `${size}-${theme}-projects.png`) });
        if (width === 1440) {
          await page.locator('#education').screenshot({ path: join(artifacts, `${size}-${theme}-education.png`) });
          await page.locator('#about').screenshot({ path: join(artifacts, `${size}-${theme}-about.png`) });
          await page.locator('#contact').screenshot({ path: join(artifacts, `${size}-${theme}-contact.png`) });
          await page.locator('body > footer').screenshot({ path: join(artifacts, `${size}-${theme}-footer.png`) });
        }
      }
      assert.deepEqual(errors, []);
      report.push({ width, theme, overflow: false, axeViolations: 0, menuKeyboard: true, technologySelection: true, themePersistence: true });
      await context.close();
    }
  }
  const noJs = await browser.newContext({ viewport: { width: 320, height: 900 }, javaScriptEnabled: false, colorScheme: 'dark' });
  const fallbackPage = await noJs.newPage();
  await fallbackPage.goto(base);
  assert.equal(await fallbackPage.locator('#site-navigation').isVisible(), true);
  assert.equal(await fallbackPage.locator('[data-menu-toggle]').isVisible(), false);
  assert.equal(await fallbackPage.locator('[data-technology-fallback]').isVisible(), true);
  assert.equal(await fallbackPage.locator('[data-technology-controls]').isVisible(), false);
  assert.equal(await fallbackPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await noJs.close();
  const reduced = await browser.newContext({ viewport: { width: 375, height: 900 }, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base);
  assert.equal(await reducedPage.locator('a.button').first().evaluate(element => getComputedStyle(element).transitionDuration), '0s');
  await reduced.close();
  await writeFile(join(artifacts, 'report.json'), JSON.stringify({ cases: report, noJavaScript: true, reducedMotion: true, clipboardStubbed: true }, null, 2));
  console.log(`Homepage: ${report.length} viewport/theme cases passed; default/selected/menu axe checks passed. No-JS, keyboard, clipboard action and reduced-motion verified. Captures: .qa/homepage/`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
