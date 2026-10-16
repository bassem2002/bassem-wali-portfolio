import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { serve } from './audit-server.mjs';
import { projects } from '../src/data/projects.ts';
if (!process.argv.includes('--capture-only')) {
  process.env.AUDIT_OUTPUT = '.qa/v2';
  await import('./check-final-audit.mjs');
}
const output = '.qa/v2';
await mkdir(output, { recursive: true });
const host = await serve();
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = [];
try {
  for (const locale of ['fr', 'en']) {
    const prefix = locale === 'en' ? '/en' : '';
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(host.base + prefix + '/projects/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.project-card').count(), 14);
    assert.equal(await page.locator('.project-card--featured .project-visual, .project-card--featured .showcase-art').count(), 5);
    if (await page.locator('.showcase-card').count()) assert.deepEqual(await page.locator('.project-card:not(.showcase-card) .project-card__summary').allTextContents(), projects.filter(project => !project.featured).map(project => project.shortDescription[locale]));
    else assert.deepEqual(await page.locator('.project-card__summary').allTextContents(), projects.map(project => project.shortDescription[locale]));
    for (const card of await page.locator('.project-card--featured').all()) {
      assert.ok([2, 3].includes(await card.locator('.project-card__highlights li').count()));
      assert.ok([4, 5, 6].includes(await card.locator('.tech-tag').count()));
    }
    const clipped = await page.locator('.project-visual svg text').evaluateAll(nodes => nodes.filter(node => { const box = node.getBBox(); return box.x < 0 || box.x + box.width > 420 || box.y < 0 || box.y + box.height > 240; }).map(node => node.textContent));
    assert.deepEqual(clipped, [], `${locale}: explanatory SVG clipped`);
    await page.goto(host.base + prefix + '/');
    const widths = await page.locator('.featured-grid > li').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
    assert.ok(widths[0] > widths[1] * 1.2, `${locale}: bento hierarchy`);
    if (await page.locator('.showcase-card').count()) assert.ok(widths[3] > widths[2] && widths[2] > widths[4], `${locale}: V3 4/5/3 showcase row`);
    else assert.ok(Math.abs(widths[2] - widths[3]) < 1 && Math.abs(widths[3] - widths[4]) < 1);
    assert.equal(await page.locator('.hero a[download]').count(), 0);
    report.push({ locale, cards: 14, featuredVisuals: 5, bentoWidths: widths, clippedLabels: 0 });
    await page.close();
  }
  for (const [name, path, width, theme] of [
    ['home-desktop-light', '/', 1440, 'light'], ['home-desktop-dark', '/', 1440, 'dark'],
    ['home-mobile-light', '/', 375, 'light'], ['projects-desktop-light', '/projects/', 1440, 'light'],
    ['rezouette-desktop', '/projects/rezouette/', 1440, 'light'], ['enterprise-bi-desktop', '/projects/enterprise-bi-dashboard/', 1440, 'light'],
    ['mindrawfx-mobile', '/projects/mindrawfx/', 375, 'light'],
  ]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    assert.equal((await page.goto(host.base + path, { waitUntil: 'networkidle' })).status(), 200);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${name}: overflow`);
    await page.screenshot({ path: `${output}/${name}.png` });
    if (name.startsWith('home-')) await page.screenshot({ path: `${output}/${name}-full.png`, fullPage: true });
    if (name === 'home-desktop-light') await page.locator('#projects').screenshot({ path: `${output}/featured-desktop-light.png` });
    assert.deepEqual(errors, []);
    await page.close();
  }
  await writeFile(output + '/visual-report.json', JSON.stringify(report, null, 2));
  console.log('V2 content, bento hierarchy, SVG bounds and seven required screenshots passed in .qa/v2/.');
} finally { await browser.close(); await host.close(); }
