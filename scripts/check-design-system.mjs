import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, join, sep, extname } from 'node:path';
import { chromium } from 'playwright-core';
import { spawnSync } from 'node:child_process';

if (process.argv.includes('--i18n')) {
  await import('./check-i18n.mjs');
} else if (process.argv.includes('--case-studies')) {
  await import('./check-case-studies.mjs');
} else if (process.argv.includes('--projects')) {
  await import('./check-projects.mjs');
} else if (process.argv.includes('--homepage')) {
  await import('./check-homepage.mjs');
} else {

// QA routes are generated separately and never added to the production output.
const qaBuild = spawnSync(process.execPath, ['scripts/astro.mjs', 'build', '--qa', '--outDir', '.qa/qa-build'], { stdio: 'inherit' });
assert.equal(qaBuild.status, 0, 'QA build failed.');

// Uses an already installed browser. Does not install or change system software.
const executable = process.env.BROWSER_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/chromium', '/usr/bin/google-chrome',
].find(path => existsSync(path));
assert.ok(executable, 'Set BROWSER_PATH to an installed Chromium browser.');
const root = resolve('.qa/qa-build');
const artifactRoot = resolve('.qa/design-system');
await mkdir(artifactRoot, { recursive: true });
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    let path = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (path !== root && !path.startsWith(root + sep)) throw new Error('Invalid path');
    if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
    response.setHeader('Content-Type', mime[extname(path)] ?? 'application/octet-stream');
    response.end(await readFile(path));
  } catch { response.writeHead(404).end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const base = `http://127.0.0.1:${address.port}`;
const report = [];
let browser;
try {
  browser = await chromium.launch({ executablePath: executable, headless: true });
  for (const width of [320, 375, 768, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}/design-system/`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `Overflow at ${width}/${theme}`);
      await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
      const accessibility = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }));
      assert.deepEqual(accessibility.violations.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) })), [], `Accessibility at ${width}/${theme}`);
      const controls = await page.locator('a.button, button:not([disabled]), .language-switcher, .tech-tag[href]').evaluateAll(elements => elements.filter(element => {
        const bounds = element.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return false;
        return bounds.height < 44 || bounds.width < 24;
      }).map(element => element.outerHTML));
      assert.deepEqual(controls, [], 'Control target size');
      // Keyboard entry: skip link then content; focus is visibly outlined.
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), true);
      const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineWidth);
      assert.ok(parseFloat(outline) >= 3);
      await page.keyboard.press('Enter');
      assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
      // Theme selection persists across a reload and keeps the action label correct.
      await page.locator('[data-theme-toggle]').click();
      const next = theme === 'light' ? 'dark' : 'light';
      assert.equal(await page.locator('html').getAttribute('data-theme'), next);
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('data-theme'), next);
      await page.locator('[data-theme-toggle]').click();
      if (width === 375 || width === 1440) {
        await page.locator('#hero').screenshot({ path: join(artifactRoot, `hero-${width}-${theme}.png`) });
        await page.locator('#cards').screenshot({ path: join(artifactRoot, `cards-${width}-${theme}.png`) });
      }
      assert.deepEqual(errors, []);
      report.push({ width, theme, overflow: false, axeViolations: accessibility.violations.length, themePersistence: true, skipLink: true });
      await context.close();
    }
  }
  const context = await browser.newContext({ viewport: { width: 375, height: 900 }, javaScriptEnabled: false, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto(`${base}/design-system/`);
  assert.equal(await page.locator('[data-theme-toggle]').isVisible(), false);
  assert.equal(await page.locator('.hero__portrait img').count(), 1);
  assert.equal(await page.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(17, 26, 38)');
  await page.goto(`${base}/en/design-system/`);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.ok(await page.locator('.static-matches a').count() > 0);
  await context.close();
  const motion = await browser.newContext({ reducedMotion: 'reduce' });
  const motionPage = await motion.newPage();
  await motionPage.goto(`${base}/design-system/`);
  assert.equal(await motionPage.locator('a.button').first().evaluate(element => getComputedStyle(element).transitionDuration), '0s');
  await motion.close();
  await writeFile(join(artifactRoot, 'report.json'), JSON.stringify({ cases: report, withoutJavaScript: true, reducedMotion: true }, null, 2));
  console.log(`Design system: ${report.length} viewport/theme cases passed, no automated WCAG violations. No-JS and reduced-motion checks passed. Artifacts: .qa/design-system/`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
}
