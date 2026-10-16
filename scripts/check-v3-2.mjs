import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { serve } from './audit-server.mjs';
import { projects } from '../src/data/projects.ts';
import { education } from '../src/data/education.ts';
const output = '.qa/v3-2';
await mkdir(output, { recursive: true });
const host = await serve();
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = [];
try {
  for (const [name, path, width, theme, selector, fullPage] of [
    ['home-full-desktop-light', '/', 1920, 'light', null, true], ['home-full-desktop-dark', '/', 1920, 'dark', null, true],
    ['home-mobile-light', '/', 375, 'light', null, false], ['education-desktop', '/', 1920, 'light', '#education', false],
    ['education-mobile', '/', 375, 'light', '#education', false], ['skills-interaction', '/', 1920, 'light', '#skills', false],
    ['experience-desktop', '/', 1920, 'light', '#experience', false], ['projects-desktop', '/projects/', 1920, 'light', null, false],
    ['projects-mobile', '/projects/', 375, 'light', null, false], ['rezouette-case-study', '/projects/rezouette/', 1920, 'light', null, false],
    ['smartalumni-case-study', '/projects/smartalumni-iit/', 1920, 'light', null, false], ['contact-desktop', '/', 1920, 'light', '#contact', false],
  ]) {
    const page = await browser.newPage({ viewport: { width, height: 1100 }, colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto(host.base + path, { waitUntil: 'networkidle' });
    if (name === 'skills-interaction') await page.locator('[data-technology-select="spring-boot"]').click();
    if (selector) {
      // Isolated section captures omit the sticky global header, which otherwise
      // covers the top of a tall locator during Playwright's automatic scrolling.
      await page.addStyleTag({ content: '.site-header { visibility: hidden !important; }' });
      await page.locator(selector).screenshot({ path: `${output}/${name}.png` });
    }
    else await page.screenshot({ path: `${output}/${name}.png`, fullPage });
    await page.close();
  }
  if (!process.argv.includes('--capture-only')) {
    const expectedTechnologies = {
      'spring-boot': ['smartalumni', 'shopflow'], tensorflow: ['waste-classification'], pytorch: ['english-french-seq2seq'],
      ssas: ['enterprise-bi-dashboard'], javafx: ['min-draw-fx', 'java-network-communication'],
      laravel: ['jobconnect', 'eventplanner'], flutter: ['smart-trade-manager'],
    };
    for (const locale of ['fr', 'en']) for (const width of [375, 1920]) for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 1100 }, colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto(host.base + (locale === 'en' ? '/en/' : '/'), { waitUntil: 'networkidle' });
      const typography = await page.locator('.hero').evaluate(node => {
        const style = selector => getComputedStyle(node.querySelector(selector));
        return { student: parseFloat(style('.eyebrow').fontSize), fullStack: parseFloat(style('.hero__headline').fontSize), data: parseFloat(style('.hero__secondary').fontSize), weight: style('.hero__secondary').fontWeight, color: style('.hero__secondary').color, fullStackColor: getComputedStyle(node.querySelector('.hero__headline span')).color };
      });
      assert.ok(typography.student >= (width < 768 ? 14 : 16));
      assert.equal(typography.fullStack, typography.data);
      assert.equal(typography.fullStackColor, typography.color);
      assert.ok(Number(typography.weight) >= 600);
      assert.ok((await page.locator('.hero__secondary').textContent()).includes(locale === 'fr' ? 'Intelligence artificielle' : 'Artificial Intelligence'));
      assert.equal(await page.locator('.hero figcaption').textContent(), 'France');
      assert.equal(await page.locator('.portrait-contacts a[href="tel:+33751245531"]').count(), 1);
      const cards = await page.locator('.education-card').evaluateAll(nodes => nodes.map(node => {
        const r = node.getBoundingClientRect(), s = getComputedStyle(node);
        return { id: node.dataset.education, x: r.x, y: r.y, width: r.width, height: r.height, padding: s.padding, border: s.border, radius: s.borderRadius, titleSize: getComputedStyle(node.querySelector('h3')).fontSize };
      }));
      assert.deepEqual(cards.map(card => card.id), education.map(entry => entry.id));
      assert.ok(cards.every(card => card.padding === cards[0].padding && card.border === cards[0].border && card.radius === cards[0].radius && card.titleSize === cards[0].titleSize));
      if (width >= 768) { assert.equal(cards[0].y, cards[1].y); assert.equal(cards[2].y, cards[3].y); assert.ok(cards[2].y > cards[0].y); assert.ok(cards.every(card => Math.abs(card.width - cards[0].width) < 1 && Math.abs(card.height - cards[0].height) < 1)); }
      else assert.ok(cards.every(card => Math.abs(card.x - cards[0].x) < 1 && card.width > width - 60));
      for (const entry of education) assert.ok((await page.locator(`[data-education="${entry.id}"]`).textContent()).includes(entry.location[locale]));
      for (const [technology, ids] of Object.entries(expectedTechnologies)) {
        const button = page.locator(`[data-technology-select="${technology}"]`);
        await button.focus(); await page.keyboard.press('Space');
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.deepEqual(await page.locator('[data-technology-results] li:visible').evaluateAll(nodes => nodes.map(node => node.dataset.projectId)), ids);
        assert.deepEqual(await page.locator('#projects .showcase-card[data-relation="highlighted"]').evaluateAll(nodes => nodes.map(node => node.dataset.project)), projects.filter(project => project.featured && ids.includes(project.id)).map(project => project.id));
        await page.locator('[data-technology-reset]').click();
      }
      await page.locator('[data-technology-select="spring-boot"]').click();
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
      assert.deepEqual(violations, [], `${locale}/${width}/${theme}: selected technology axe`);
      report.push({ locale, width, theme, typography, education: cards, technologyMappings: 'passed', selectedStateAxe: 0 });
      await page.close();
    }
    for (const locale of ['fr', 'en']) {
      const prefix = locale === 'en' ? '/en' : '';
      const page = await browser.newPage({ viewport: { width: 375, height: 1100 } });
      await page.goto(host.base + prefix + '/projects/');
      assert.equal(await page.locator('#project-search').isVisible(), true);
      assert.equal(await page.locator('.showcase-card').count(), 5);
      assert.equal(await page.locator('.project-card:not(.showcase-card)').count(), 9);
      assert.equal(await page.locator('[data-video-demo]').count(), 4);
      for (const project of projects) {
        await page.goto(host.base + prefix + `/projects/${project.slug}/`);
        assert.equal(await page.locator('[data-video-demo]').count(), project.videoDemo ? 1 : 0);
        if (project.featured) assert.equal(await page.locator('.case-hero .showcase-art').count(), 1);
      }
      await page.close();
    }
    await writeFile(`${output}/component-report.json`, JSON.stringify({ cases: report, educationCards: 4, technologyMappings: 7, detailRoutes: 28, screenshots: 12 }, null, 2));
    console.log('V3.2 component checks passed: hero hierarchy, four equal education cards, seven technology mappings, video CTAs and 28 detail routes.');
  }
} finally { await browser.close(); await host.close(); }
if (!process.argv.includes('--capture-only')) {
  process.env.AUDIT_OUTPUT = output;
  process.env.AUDIT_WIDTHS = '320,375,430,768,1024,1440,1920';
  await import('./check-final-audit.mjs');
}
