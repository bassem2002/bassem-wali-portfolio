import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { serve } from './audit-server.mjs';
const output = '.qa/v3';
await mkdir(output, { recursive: true });
const host = await serve();
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = [];
try {
  for (const width of [1440, 375]) for (const theme of ['light', 'dark']) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto(host.base, { waitUntil: 'networkidle' });
    const name = `home-v3-${width === 1440 ? 'desktop' : 'mobile'}-${theme}`;
    await page.screenshot({ path: `${output}/${name}.png` });
    if (width === 1440 && theme === 'light') await page.locator('#projects').screenshot({ path: `${output}/featured-v3-desktop.png` });
    await page.close();
  }
  if (process.argv.includes('--capture-only')) { console.log('Five V3 checkpoint captures generated.'); }
  else {
    for (const locale of ['fr', 'en']) for (const width of [375, 1440]) for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme: theme });
      const errors = [], external = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => { if (!request.url().startsWith(host.base)) external.push(request.url()); });
      await page.goto(host.base + (locale === 'en' ? '/en/' : '/'), { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').textContent(), 'Bassem Wali');
      assert.equal(await page.locator('#projects .showcase-card').count(), 5);
      assert.equal(await page.locator('#projects .project-visual').count(), 0);
      for (const card of await page.locator('#projects .showcase-card').all()) {
        assert.equal(await card.locator('.project-card__highlights li').count(), 2);
        assert.equal(await card.locator('.tech-tag').count(), 4);
        assert.ok(await card.locator('svg[role="img"]').getAttribute('aria-label'));
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${locale}/${width}/${theme}: overflow`);
      const clipped = await page.locator('.showcase-art svg text').evaluateAll(nodes => nodes.filter(node => { const b = node.getBBox(); return b.x < 0 || b.y < 0 || b.x + b.width > 480 || b.y + b.height > 250; }).map(node => node.textContent));
      assert.deepEqual(clipped, []);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('class'), 'skip-link');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'main-content');
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const scan = async state => {
        const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })));
        assert.deepEqual(violations, [], `${locale}/${width}/${theme}/${state}: axe`);
      };
      await scan('default');
      if (width === 375) {
        const menu = page.locator('[data-menu-toggle]');
        await menu.focus(); await page.keyboard.press('Space');
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await scan('menu');
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.equal(await page.locator(':focus').getAttribute('data-menu-toggle'), '');
      }
      await page.locator('[data-technology-select="spring-boot"]').click();
      assert.deepEqual(await page.locator('#projects .project-card[data-relation="highlighted"]').evaluateAll(cards => cards.map(card => card.dataset.project)), ['smartalumni']);
      assert.deepEqual(await page.locator('[data-technology-results] li:visible').evaluateAll(nodes => nodes.map(node => node.dataset.projectId)), ['smartalumni', 'shopflow']);
      assert.equal(await page.locator('#projects .project-card[data-relation="highlighted"]').evaluate(node => getComputedStyle(node).borderTopWidth), '2px');
      assert.equal(await page.locator('#projects .project-card[data-relation="muted"]').first().evaluate(node => getComputedStyle(node).borderTopStyle), 'dashed');
      await page.locator('[data-technology-reset]').click();
      await page.locator('#projects').scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      assert.equal(await page.locator('.site-nav a[href="#projects"]').getAttribute('aria-current'), 'location');
      await page.locator('.hero__actions a').first().focus();
      assert.ok(parseFloat(await page.locator(':focus').evaluate(node => getComputedStyle(node).outlineWidth)) >= 3);
      await page.locator('[data-theme-toggle]').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme === 'light' ? 'dark' : 'light');
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('data-theme'), theme === 'light' ? 'dark' : 'light');
      assert.deepEqual(errors, []); assert.deepEqual(external, []);
      report.push({ locale, width, theme, axe: 'passed', menu: width === 375, technologyRelation: true, activeNav: true, overflow: false, externalRequests: 0 });
      await page.close();
    }
    for (const width of [320, 768, 1024]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } }); await page.goto(host.base);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}: overflow`);
      await page.close();
    }
    for (const theme of ['light', 'dark']) {
      const noJs = await browser.newPage({ viewport: { width: 375, height: 1000 }, javaScriptEnabled: false, colorScheme: theme });
      await noJs.goto(host.base);
      assert.equal(await noJs.locator('#site-navigation').isVisible(), true);
      assert.equal(await noJs.locator('#projects .showcase-card').count(), 5);
      assert.equal(await noJs.locator('[data-technology-fallback]').isVisible(), true);
      assert.equal(await noJs.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await noJs.close();
    }
    const reduced = await browser.newPage({ reducedMotion: 'reduce' }); await reduced.goto(host.base);
    assert.equal(await reduced.locator('.showcase-card').first().evaluate(node => getComputedStyle(node).transitionDuration), '0s');
    await reduced.close();
    await writeFile(`${output}/checkpoint-report.json`, JSON.stringify({ cases: report, additionalWidths: [320, 768, 1024], noJavaScript: true, reducedMotion: true, screenshots: 5 }, null, 2));
    console.log('V3 checkpoint passed: 8 FR/EN/theme/viewport cases, 12 axe scans, keyboard/menu/theme/technology relation, active navigation, extra widths, no-JS and reduced motion. Five captures in .qa/v3/.');
  }
} finally { await browser.close(); await host.close(); }
