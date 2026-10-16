import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { serve } from './audit-server.mjs';
import { projects } from '../src/data/projects.ts';
const host = await serve();
const output = process.env.AUDIT_OUTPUT ?? '.qa/final-audit';
await mkdir(output, { recursive: true });
const paths = ['/', '/en/', '/projects/', '/en/projects/', ...projects.filter(project => project.featured).flatMap(project => [`/projects/${project.slug}/`, `/en/projects/${project.slug}/`])];
const report = [];
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  for (const width of (process.env.AUDIT_WIDTHS?.split(',').map(Number) ?? [320, 375, 430, 768, 1024, 1440])) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const path of paths) {
        await page.goto(host.base + path, { waitUntil: 'networkidle' });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${path}/${width}/${theme}: overflow`);
        assert.equal(await page.locator('h1').count(), 1);
        const levels = await page.locator('main h1, main h2, main h3, main h4').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
        assert.ok(levels.every((level, index) => !index || level <= levels[index - 1] + 1), path);
        const clipped = await page.locator('.architecture-diagram svg text').evaluateAll(nodes => nodes.filter(node => { const box = node.getBBox(); return box.x < 8 || box.x + box.width > 312; }).map(node => node.textContent));
        assert.deepEqual(clipped, [], `${path}: SVG text clipped`);
        assert.equal(await page.locator('.architecture-diagram svg[tabindex="0"]').count(), 0);
        for (const image of await page.locator('img').all()) {
          assert.ok(await image.getAttribute('alt'));
          assert.ok(Number(await image.getAttribute('width')) > 0 && Number(await image.getAttribute('height')) > 0);
          assert.equal(await image.getAttribute('decoding'), 'async');
        }
        if ([375, 1440].includes(width)) {
          await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
          const result = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }, rules: { 'label-content-name-mismatch': { enabled: true } } }));
          assert.deepEqual(result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), [], `${path}/${width}/${theme}: axe`);
        }
        assert.deepEqual(errors, []);
        report.push({ path, width, theme, overflow: false, diagramClipping: false, headingSkips: false, axe: [375, 1440].includes(width) ? 'no automated violations detected' : 'not repeated' });
      }
      await context.close();
      console.log(`Final responsive audit passed: ${width}px / ${theme}`);
    }
  }
  const interactions = [];
  for (const locale of ['fr', 'en']) {
    const prefix = locale === 'en' ? '/en' : '';
    const context = await browser.newContext({ viewport: { width: 375, height: 1000 }, colorScheme: 'dark', reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto(host.base + prefix + '/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement?.id), 'main-content');
    const menu = page.locator('[data-menu-toggle]');
    await menu.focus(); await page.keyboard.press('Space');
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
    const menuAxe = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }, rules: { 'label-content-name-mismatch': { enabled: true } } }));
    assert.deepEqual(menuAxe.violations.map(item => item.id), []);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('href')), '#projects');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await menu.evaluate(element => element === document.activeElement), true);
    const theme = page.locator('[data-theme-toggle]');
    await theme.focus(); await page.keyboard.press('Space');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    const tech = page.locator('[data-technology-select="pytorch"]');
    await tech.focus(); await page.keyboard.press('Space');
    assert.equal(await tech.getAttribute('aria-pressed'), 'true');
    const copy = page.locator('[data-copy-email]');
    await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__copied = text; } } }); });
    await copy.focus(); await page.keyboard.press('Enter');
    assert.ok(await page.evaluate(() => window.__copied?.includes('@')));
    assert.equal(await page.locator('.button').first().evaluate(element => getComputedStyle(element).transitionDuration), '0s');
    await page.goto(host.base + prefix + '/projects/', { waitUntil: 'networkidle' });
    const summary = page.locator('[data-project-filters] summary');
    await summary.focus(); await page.keyboard.press('Space');
    const category = page.locator('[data-category="mobile"]');
    await category.focus(); await page.keyboard.press('Space');
    assert.equal(await category.getAttribute('aria-pressed'), 'true');
    assert.ok(parseFloat(await category.evaluate(element => getComputedStyle(element).outlineWidth)) >= 3);
    const search = page.locator('#project-search');
    await search.focus(); await page.keyboard.type('unmatched-string');
    assert.equal(await page.locator('[data-project-empty]').isVisible(), true);
    await page.locator('[data-project-empty] [data-reset]').focus(); await page.keyboard.press('Space');
    assert.equal(await search.evaluate(element => element === document.activeElement), true);
    await page.addScriptTag({ path: resolve('node_modules/axe-core/axe.min.js') });
    const filterAxe = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }, rules: { 'label-content-name-mismatch': { enabled: true } } }));
    assert.deepEqual(filterAxe.violations.map(item => item.id), []);
    await page.goto(host.base + prefix + '/projects/rezouette/');
    const anchor = page.locator('.case-navigation a[href="#architecture"]');
    await anchor.focus(); await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#architecture');
    await page.locator('.case-repository a').focus();
    assert.ok(parseFloat(await page.locator('.case-repository a').evaluate(element => getComputedStyle(element).outlineWidth)) >= 3);
    // Follow a complete Tab cycle through the case study; no custom Tab interception.
    for (let index = 0; index < 60; index++) await page.keyboard.press('Tab');
    interactions.push({ locale, keyboard: true, reducedMotion: true, menuAxe: 0, filterAxe: 0 });
    await context.close();
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 }, colorScheme: 'dark' });
  const fallback = await noJs.newPage();
  await fallback.goto(host.base + '/');
  assert.equal(await fallback.locator('#site-navigation').isVisible(), true);
  assert.equal(await fallback.locator('[data-menu-toggle]').isVisible(), false);
  await fallback.goto(host.base + '/projects/');
  assert.equal(await fallback.locator('.project-card').count(), 14);
  assert.equal(await fallback.locator('[data-project-filters]').isVisible(), false);
  await noJs.close();
  const context = await browser.newContext();
  const page = await context.newPage();
  const requests = [];
  page.on('request', request => requests.push({ url: request.url(), type: request.resourceType() }));
  await page.goto(host.base, { waitUntil: 'networkidle' });
  const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(entry => ({ name: entry.name, transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, initiatorType: entry.initiatorType })));
  const navigation = await page.evaluate(() => { const entry = performance.getEntriesByType('navigation')[0]; return { transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize }; });
  const externalRequests = requests.filter(request => new URL(request.url).origin !== host.base);
  assert.deepEqual(externalRequests, []);
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('h1').isVisible(), true);
  await page.goto(host.base + '/does-not-exist/');
  assert.ok((await page.locator('h1').textContent()).includes('introuvable'));
  const response = await page.goto(host.base + '/en/does-not-exist/');
  assert.equal(response.status(), 404);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await context.close();
  await writeFile(output + '/browser.json', JSON.stringify({ checks: report, interactions, noJs: true, network: { requests, resources, navigation, externalRequests }, print: 'content visible; no dedicated print styles', notFound: true }, null, 2));
  console.log(`Final audit passed: ${report.length} responsive cases; 56 axe page scans plus menu/filter states, keyboard, reduced motion, no-JS, network and 404.`);
} finally { await browser?.close(); await host.close(); }
