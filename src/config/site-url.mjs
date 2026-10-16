// SITE_URL is the future public origin. Netlify URL is only used in production.
const configured = process.env.SITE_URL ||
  (process.env.CONTEXT === 'production' ? process.env.URL : undefined);

function parseOrigin(value) {
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL must be a public HTTPS origin without path, credentials or query.');
  }
  if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error('SITE_URL must not be a local development address.');
  }
  return url.origin;
}

export const siteUrl = parseOrigin(configured);
