import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, sep, extname } from 'node:path';
export async function serve(directory = 'dist') {
  const root = resolve(directory);
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' };
  const server = createServer(async (request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');
    try {
      let file = resolve(root, '.' + decodeURIComponent(url.pathname));
      if (file !== root && !file.startsWith(root + sep)) throw Error('Invalid path');
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Content-Length': body.length });
      response.end(body);
    } catch {
      const body = await readFile(join(root, url.pathname.startsWith('/en/') ? 'en/404/index.html' : '404.html'));
      response.writeHead(404, { 'Content-Type': types['.html'], 'Content-Length': body.length });
      response.end(body);
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}`, close: () => { server.closeAllConnections(); return new Promise(resolve => server.close(resolve)); } };
}
