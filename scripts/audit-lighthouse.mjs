import { readdir, readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import { serve } from './audit-server.mjs';
import { chromium } from 'playwright-core';
const output = '.qa/final-audit/' + (process.env.AUDIT_STAGE ?? 'final');
await mkdir(output, { recursive: true });
const cache = resolve('.npm-cache/_npx');
const entry = (await readdir(cache)).map(name => join(cache, name, 'node_modules')).find(path => existsSync(join(path, 'lighthouse/core/index.js')));
if (!entry) throw Error('Run npm exec --yes --package=lighthouse@13.5.0 -- lighthouse --version first.');
const { default: lighthouse } = await import(pathToFileURL(join(entry, 'lighthouse/core/index.js')));
const { default: desktopConfig } = await import(pathToFileURL(join(entry, 'lighthouse/core/config/desktop-config.js')));
const { launch } = await import(pathToFileURL(join(entry, 'chrome-launcher/dist/index.js')));
const host = await serve();
const results = process.env.AUDIT_CASE ? JSON.parse(await readFile(join(output, 'lighthouse-summary.json'), 'utf8')) : [];
try {
  for (const [name, path, desktop] of [
    ['home-fr-desktop', '/', true], ['home-fr-mobile', '/', false], ['home-en-mobile', '/en/', false],
    ['projects-fr-mobile', '/projects/', false], ['rezouette-fr-mobile', '/projects/rezouette/', false],
  ]) {
    if (process.env.AUDIT_CASE && process.env.AUDIT_CASE !== name) continue;
    const profile = await mkdtemp(resolve(output, `chrome-${name}-`));
    const chrome = await launch({ chromePath: process.env.BROWSER_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu-sandbox', '--disable-dev-shm-usage', '--no-first-run'], userDataDir: profile });
    try {
      const result = await lighthouse(host.base + path, { port: chrome.port, output: ['json', 'html'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], logLevel: 'error' }, desktop ? desktopConfig : undefined);
      const lhr = result.lhr;
      await writeFile(join(output, `${name}.json`), result.report[0]);
      await writeFile(join(output, `${name}.html`), result.report[1]);
      const row = {
        name, path, lighthouseVersion: lhr.lighthouseVersion, fetchTime: lhr.fetchTime, userAgent: lhr.userAgent,
        config: lhr.configSettings,
        scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, value.score * 100])),
        metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'speed-index', 'total-blocking-time', 'cumulative-layout-shift'].map(key => [key, { value: lhr.audits[key]?.numericValue, display: lhr.audits[key]?.displayValue }])),
        failures: Object.entries(lhr.audits).filter(([, audit]) => audit.score !== null && audit.score < 1).map(([key, audit]) => ({ key, title: audit.title, score: audit.score, display: audit.displayValue, explanation: audit.explanation })),
        lcpDetails: lhr.audits['lcp-breakdown-insight']?.details,
        requests: lhr.audits['network-requests']?.details?.items,
      };
      const existing = results.findIndex(item => item.name === name);
      if (existing >= 0) results[existing] = row; else results.push(row);
      await writeFile(join(output, 'lighthouse-summary.json'), JSON.stringify(results, null, 2));
      console.log(JSON.stringify({ name, scores: row.scores, metrics: row.metrics, failures: row.failures }));
    } finally {
      try { const connection = await chromium.connectOverCDP(`http://127.0.0.1:${chrome.port}`, { timeout: 3000 }); const session = await connection.newBrowserCDPSession(); await session.send('Browser.close'); await connection.close(); } catch { /* Browser may already have exited. */ }
      await chrome.kill();
    }
  }
} finally { await host.close(); }
