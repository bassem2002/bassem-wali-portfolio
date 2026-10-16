import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve('dist');
async function htmlFiles(directory) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await htmlFiles(path));
    else if (entry.name.endsWith('.html')) results.push(path);
  }
  return results;
}
async function exists(path) {
  try { return await stat(path); } catch { return undefined; }
}
const failures = [];
const files = await htmlFiles(root);
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (!raw || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) continue;
    const currentPath = '/' + file.slice(root.length + 1).replaceAll('\\', '/').replace(/index\.html$/, '');
    const url = new URL(raw, `https://local.invalid${currentPath}`);
    const path = join(root, decodeURIComponent(url.pathname));
    const info = await exists(path);
    const target = info?.isDirectory() ? join(path, 'index.html') : path;
    if (!await exists(target)) {
      failures.push(`${file}: missing ${raw}`);
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = target === file ? html : await readFile(target, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      if (![...targetHtml.matchAll(/\bid="([^"]+)"/g)].some(match => match[1] === id)) {
        failures.push(`${file}: missing anchor ${raw}`);
      }
    }
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`Internal links and anchors valid in ${files.length} HTML pages.`);
