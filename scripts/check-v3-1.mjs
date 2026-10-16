import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { serve } from './audit-server.mjs';
import { projects } from '../src/data/projects.ts';
import { profile } from '../src/data/profile.ts';
const output = '.qa/v3-1';
await mkdir(output, { recursive: true });
const host = await serve();
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const rows = [];
try {
  for (const [name, path, width, height, theme, selector] of [
    ['hero-wide-desktop', '/', 1920, 1100, 'light', null],
    ['hero-wide-dark', '/', 1920, 1100, 'dark', null],
    ['hero-contact-mobile', '/', 375, 1200, 'light', null],
    ['featured-wide-desktop', '/', 1920, 1100, 'light', '#projects'],
    ['project-with-video', '/projects/', 1440, 1100, 'light', '[data-project="school-management"]'],
    ['case-study-with-video', '/projects/rezouette/', 1920, 1100, 'light', null],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto(host.base + path, { waitUntil: 'networkidle' });
    if (selector) await page.locator(selector).screenshot({ path: `${output}/${name}.png` });
    else await page.screenshot({ path: `${output}/${name}.png` });
    await page.close();
  }
  if (!process.argv.includes('--capture-only')) {
    for (const locale of ['fr', 'en']) for (const width of [375, 1920]) for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 1100 }, colorScheme: theme, reducedMotion: 'reduce' });
      const errors = [], external = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => { if (!request.url().startsWith(host.base)) external.push(request.url()); });
      const prefix = locale === 'en' ? '/en' : '';
      for (const path of ['/', '/projects/', '/projects/rezouette/']) {
        await page.goto(host.base + prefix + path, { waitUntil: 'networkidle' });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${locale}/${width}/${theme}/${path}: overflow`);
        assert.equal(await page.locator('iframe').count(), 0);
        for (const link of await page.locator('[data-video-demo]').all()) {
          const id = await link.getAttribute('data-video-demo');
          const video = projects.find(project => project.id === id)?.videoDemo;
          assert.ok(video);
          assert.equal(await link.getAttribute('href'), video.url);
          assert.equal(await link.getAttribute('target'), '_blank');
          assert.equal(await link.getAttribute('rel'), 'noopener noreferrer');
          assert.ok((await link.textContent()).includes(video.label[locale]));
          await link.focus();
          assert.ok(parseFloat(await link.evaluate(node => getComputedStyle(node).outlineWidth)) >= 3);
        }
        if (path === '/') {
          assert.equal(await page.locator('.hero figcaption').textContent(), 'France');
          assert.ok((await page.locator('.engineering-float--ai').textContent()).includes(locale === 'fr' ? 'Intelligence artificielle' : 'Artificial Intelligence'));
          assert.equal(await page.locator('.hero a[href="' + profile.links.github + '"]').count(), 1);
          assert.equal(await page.locator('.hero a[href="' + profile.links.linkedin + '"]').count(), 1);
          const phone = page.locator('.portrait-contacts a[href^="tel:"]');
          assert.equal(await phone.getAttribute('href'), `tel:${profile.phone.e164}`);
          assert.ok((await phone.textContent()).includes(profile.phone.display));
          const contactBounds = await page.locator('.portrait-contacts').boundingBox();
          const portraitBounds = await page.locator('.portrait-stage').boundingBox();
          assert.ok(contactBounds.y >= portraitBounds.y + portraitBounds.height);
          for (const contact of await page.locator('.portrait-contacts a').all()) {
            assert.ok((await contact.boundingBox()).height >= 44);
            await contact.focus();
            assert.ok(parseFloat(await contact.evaluate(node => getComputedStyle(node).outlineWidth)) >= 3);
          }
          const header = await page.locator('.site-header').boundingBox();
          const hero = await page.locator('.hero').boundingBox();
          assert.ok(Math.abs(header.x - hero.x) < 1 && Math.abs(header.width - hero.width) < 1);
          if (width === 1920) assert.equal(Math.round(hero.width), 1520);
          assert.equal(await page.locator('#projects [data-video-demo]').count(), 2);
          if (width === 375) {
            const menu = page.locator('[data-menu-toggle]');
            await menu.focus(); await page.keyboard.press('Space');
            assert.equal(await menu.getAttribute('aria-expanded'), 'true');
            await page.keyboard.press('Escape');
            assert.equal(await menu.getAttribute('aria-expanded'), 'false');
          }
        }
        if (path === '/projects/') assert.equal(await page.locator('[data-video-demo]').count(), 4);
        if (path.includes('rezouette')) {
          assert.equal(await page.locator('.case-hero [data-video-demo]').count(), 1);
          await page.locator('.case-navigation a[href="#architecture"]').click();
          await page.waitForTimeout(150);
          assert.equal(await page.locator('.case-navigation a[href="#architecture"]').getAttribute('aria-current'), 'location');
          const heading = await page.locator('#architecture').boundingBox();
          const header = await page.locator('.site-header').boundingBox();
          assert.ok(heading.y >= header.y + header.height, 'case anchor obscured by header');
          const decisions = page.locator('.case-navigation a').nth(3);
          await decisions.click();
          await page.waitForTimeout(100);
          assert.equal(await decisions.getAttribute('aria-current'), 'location');
        }
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
        const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })));
        assert.deepEqual(violations, [], `${locale}/${width}/${theme}/${path}: axe`);
        rows.push({ locale, width, theme, path, axeViolations: 0, overflow: false });
      }
      assert.deepEqual(errors, []); assert.deepEqual(external, []);
      await page.close();
    }
    for (const locale of ['fr', 'en']) {
      const page = await browser.newPage({ viewport: { width: 375, height: 1000 } });
      for (const project of projects) {
        await page.goto(host.base + (locale === 'en' ? '/en' : '') + `/projects/${project.slug}/`);
        assert.equal(await page.locator('[data-video-demo]').count(), project.videoDemo ? 1 : 0, `${project.id}: conditional video CTA`);
        if (project.videoDemo) {
          const order = await page.locator('main').evaluate(node => { const link = node.querySelector('[data-video-demo]'); const detail = node.querySelector('.project-detail__intro, .case-body'); return Boolean(link.compareDocumentPosition(detail) & Node.DOCUMENT_POSITION_FOLLOWING); });
          assert.equal(order, true);
        }
      }
      await page.close();
    }
    for (const width of [320, 768, 1024, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 1100 } });
      for (const path of ['/', '/projects/', '/projects/rezouette/']) { await page.goto(host.base + path); assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}/${path}: overflow`); }
      await page.close();
    }
    const noJs = await browser.newPage({ viewport: { width: 375, height: 1100 }, javaScriptEnabled: false });
    await noJs.goto(host.base); assert.equal(await noJs.locator('.portrait-contacts a[href^="tel:"]').count(), 1); assert.equal(await noJs.locator('[data-video-demo]').count(), 2); await noJs.close();
    await writeFile(`${output}/checkpoint-report.json`, JSON.stringify({ cases: rows, detailRoutes: 28, additionalWidths: [320, 768, 1024, 1440], noJavaScriptContactsAndVideos: true, screenshotCount: 6 }, null, 2));
    console.log('V3.1 passed: 24 targeted axe/layout cases, 28 detail-route video conditions, public phone, hero contacts, external link security, FR/EN, case navigation, no-JS and six captures.');
  } else console.log('Six V3.1 captures generated.');
} finally { await browser.close(); await host.close(); }
