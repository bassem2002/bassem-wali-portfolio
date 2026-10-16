import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { projects } from '../src/data/projects.ts';
import { locales } from '../src/types/content.ts';
import { publicPaths } from '../src/utils/crawling.ts';
import { profile } from '../src/data/profile.ts';

async function walk(directory) {
  return (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }))).flat();
}
const files = await walk('dist');
const paths = files.map(file => relative('dist', file).replaceAll('\\', '/'));
const expectedHtml = publicPaths(projects, locales).length + 2;
assert.equal(paths.filter(path => path.endsWith('.html')).length, expectedHtml, 'Unexpected HTML count.');
assert.ok(!paths.some(path => /(?:^|\/)(?:design-system|data-preview|\.qa|docs|node_modules)(?:\/|$)/.test(path)), 'Private/QA output found.');
assert.ok(!paths.some(path => /(?:\.map|\.pem|\.key|\.log|\.tmp|\.bak)$|(?:^|\/)\.env|credentials\.json/.test(path)), 'Unexpected technical output found.');
if (!profile.cv.publicVersionApproved) assert.ok(!paths.some(path => /\.pdf$/i.test(path)), 'Unapproved public CV/PDF found.');
const patterns = {
  localPath: /[A-Z]:[\\/]+Users[\\/]|file:\/\/|\bGMI\b/i,
  loopback: /localhost|127\.0\.0\.1/i,
  secretAssignment: /(?:API_KEY|CLIENT_SECRET|DATABASE_URL|PASSWORD|PRIVATE_KEY|SECRET|TOKEN)\s*[=:]\s*["'][^"']{8,}["']/i,
  privateKey: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  githubCredential: /\bgh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}/,
  jwt: /\beyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}/,
  privatePhone: /(?:tel:|\+(?:33|216)[ .-]?\d[\d .-]{6,}\d)/i,
};
const findings = [];
let tokenProseFiles = 0;
for (const file of files) {
  if (!/\.(?:html|js|css|svg|xml|txt)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');
  // The owner explicitly supplied this one public contact in V3.1. Keep the
  // detector for every other tel target or French/Tunisian phone occurrence.
  const phoneScan = profile.phone?.publicationApproved
    ? text.replaceAll(`"tel:${profile.phone.e164}"`, '""').replaceAll(profile.phone.display, '')
    : text;
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(type === 'privatePhone' ? phoneScan : text)) findings.push({ type, file: relative('dist', file), status: 'review required' });
  }
  if (/\b(?:API_KEY|SECRET|TOKEN|PASSWORD|PRIVATE_KEY|CLIENT_SECRET|DATABASE_URL)\b/i.test(text)) tokenProseFiles++;
  if (file.endsWith('.html')) {
    const visible = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
    if (/\b(?:TODO|FIXME|HACK|TBD|undefined|PLACEHOLDER)\b|Lorem ipsum|Coming soon|your-domain|example\.com/i.test(visible)) findings.push({ type: 'visiblePlaceholder', file: relative('dist', file), status: 'review required' });
  }
}
// Report only type/file/status, never matched values.
assert.deepEqual(findings, [], JSON.stringify(findings));
console.log(`Release output passed: ${expectedHtml} HTML, ${expectedHtml + 2} routes, ${files.length} files; no QA pages, source maps, local URLs, unapproved PDF, visible placeholders or credential patterns detected. ${tokenProseFiles} file(s) contain technical security vocabulary; prose reviewed in release-readiness.md.`);
