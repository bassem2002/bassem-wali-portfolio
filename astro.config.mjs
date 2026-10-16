import { defineConfig } from 'astro/config';
import { siteUrl } from './src/config/site-url.mjs';

export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),
  output: 'static',
  trailingSlash: 'always',
  integrations: [{
    name: 'local-qa-pages',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev' && process.env.INCLUDE_QA_ROUTES !== '1') return;
        for (const [pattern, page] of [
          ['/design-system/', 'design-system.astro'],
          ['/en/design-system/', 'design-system.en.astro'],
          ['/data-preview/', 'data-preview.astro'],
        ]) injectRoute({ pattern, entrypoint: new URL(`./src/qa/${page}`, import.meta.url), prerender: true });
      },
    },
  }],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
