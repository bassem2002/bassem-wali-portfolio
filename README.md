# Bassem Wali Portfolio

## Overview

**V3 READY FOR PUBLICATION.** Final design approved by the owner. Publication preparation is documented in the [publication checklist](docs/publication-checklist.md) and [deployment guide](docs/deployment.md). The local Git repository is prepared for publication through GitHub Desktop. Remote repository creation, push and Netlify deployment remain manual; indexing remains disabled.

Bilingual software engineering portfolio: French at `/`, English at `/en/`. Static Astro output, shared components and typed content. Target hosting: Netlify. No live deployment is claimed.

## Features

- Homepage, searchable catalogue of 14 projects and five detailed case studies per language.
- Category/technology/search filters with shareable URLs and a complete catalogue without JavaScript.
- Contextual language switching, light/dark themes and progressive mobile navigation.
- Thirteen SVG diagrams per language with accompanying text; no unapproved project screenshots or demos.
- V3.2: integrated portrait and public contacts, product showcase bento, seven technology-to-project explorer mappings, uniform education cards, modern timeline/gallery and distinctive case study heroes in both languages.

The portfolio remains local until manual publication. See [design system](docs/design-system.md), [content sources](docs/project-content-sources.md) and [release readiness](docs/release-readiness.md). Browser checks use installed Chrome; override with `BROWSER_PATH`. QA output stays outside the public build.

## Tech Stack

Astro 7.3.8, TypeScript, native CSS and small browser scripts. No client framework, backend, analytics, runtime GitHub API or external fonts. npm installs dependencies from package-lock.json.

## Architecture

Routes select a locale and shared page component. Typed metadata and translated text feed cards, filters, studies and SEO. Build-time validation checks references, editorial safeguards and FR/EN structure. Markdown drafts remain unpublished.

Production generates **34 HTML pages**: 32 content pages and two 404 pages. With robots.txt and sitemap.xml: **36 output routes**. Three QA pages are available in development and isolated QA builds, excluded from normal production builds. See [architecture](docs/architecture.md) and [release readiness](docs/release-readiness.md).

## Project Structure

```text
.github/workflows/ci.yml   # Quality validation only
docs/                     # Maintenance and dated audits
public/favicon.svg        # Direct public assets
scripts/                  # Build wrapper and validators
src/
  assets/                 # Approved portrait
  components/pages/       # Shared FR/EN views
  config/                 # Public origin and indexing policy
  content/case-studies/   # FR/EN Markdown
  data/                   # Verified metadata and content
  i18n/                   # Labels and localized routes
  layouts/
  pages/                  # Production routes, robots and sitemap
  qa/                     # Locally injected QA pages
  styles/
  types/
  utils/
tests/
.nvmrc                    # Node 24.16.0
astro.config.mjs
netlify.toml
package.json
package-lock.json
```

## Local Development

Use **Node 24.16.0** (`.nvmrc`) and its npm. Supported engines: `^22.22.3 || ^24.16.0 || >=26.3.0`, matching the Astro ESLint plugin/parser. Node 24.14.1 passed earlier checks but lies outside that supported range. No global installation is performed by this project.

```sh
npm ci
npm run dev
```

Open the address printed by Astro. Development includes `/design-system/`, `/en/design-system/` and `/data-preview/`. npm caches remain in ignored `.npm-cache/`; the Astro wrapper disables telemetry.

In an automated agent terminal, `npm run dev -- --ignore-lock` keeps Astro in the foreground and bypasses its automatic background-server tracking. Normal interactive development uses the command above.

Production preview:

```sh
npm ci
npm run build
npm run preview
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Development, including QA pages |
| `npm run build` | Validate content, generate production dist/ |
| `npm run preview` | Preview the existing production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Astro/TypeScript diagnostics |
| `npm test` | Node test runner |
| `npm run check:data` | Content and reference validation |
| `npm run report:data` | Regenerate docs/content-audit.md |
| `npm run check:links` | Links/anchors in dist/ |
| `npm run check:release` | Output routes, privacy patterns and placeholders |
| `npm run check:seo` | Isolated canonical/hreflang fixture |
| `npm run build:qa` | 37-page QA build in .qa/qa-build/ |
| `npm run check:design-system` | Build isolated QA output and check it in a browser |

The browser dispatcher also accepts `-- --homepage`, `-- --projects`, `-- --case-studies` and `-- --i18n`; these inspect an existing production dist/. Use installed Chromium, optionally via BROWSER_PATH. Browser audits and Lighthouse are optional local tools, not build prerequisites.

## Projects

Metadata: src/data/projects.ts. Editorial text: project-details.fr.ts and project-details.en.ts. Profile, skills, education and experiences have dedicated data files. UI labels live in src/i18n/. See [content model](docs/content-model.md) and [case-study evidence](docs/case-study-audit.md).

Features do not establish individual authorship. Add myContributions only with evidence. Preserve the approved selection, technology mapping and study limitations; do not infer metrics, demos or responsibilities from repository ownership.

## Adding a Project

1. Add a unique ID/slug, verified repository and evidence to the shared data.
2. Reference valid category/technology IDs and add corresponding French/English entries.
3. If publishing a study, add Markdown in both languages with the shared reference and structural parity.
4. Run check:data, tests, typecheck, build, check:links and check:release. The sitemap and output-count validation derive from the project list.

## Internationalization

FR/EN share identity, categories, stacks, diagrams and route structure. The switch preserves matching pages, useful filters and stable anchors. Add every UI key in both languages. Structural checks complement human translation review. See [i18n maintenance](docs/i18n.md).

## Testing

CI validates pushes to main/master and pull requests: npm ci, lint, typecheck, tests, SEO fixture, production build, links and release-output checks. It uses .nvmrc, a lockfile-keyed npm cache, read-only repository permission and no deployment step. GitHub execution can only be confirmed after publication.

The current suite has **29 passing tests**. [Release readiness](docs/release-readiness.md) records final results and clean-copy verification. QA captures, logs and fixture domains remain local and ignored. No formatter was added.

## Accessibility

Designed toward WCAG 2.2 AA principles and tested with axe, keyboard navigation and responsive accessibility checks. Semantic landmarks, skip link, visible focus, contrast-tested themes, reduced-motion support and progressive enhancement. These checks do not certify full compliance; screen-reader, zoom and touch reviews remain useful.

## SEO

src/config/site-url.mjs reads **SITE_URL**, or Netlify **URL** only with **CONTEXT=production**. Use a real HTTPS origin without paths. Without it, no fictional canonical, hreflang or og:url is emitted. Metadata and JSON-LD follow the locale.

src/config/site.ts currently keeps **readyForIndexing: false**: noindex/nofollow, robots Disallow and empty sitemap. Keep indexing disabled before publication. QA/404 are excluded from indexable routes. Never use a temporary preview origin as canonical.

## Performance

Local Lighthouse audits on the production build measured **98–100 Performance and 100 Accessibility on the tested configurations** (V3.3, four configurations). Best Practices measured 100; SEO remains limited by deliberate noindex. These are laboratory measurements, not production guarantees. Mobile CLS and TBT were zero; field INP was not measured. See [final visual review](docs/v3-final-visual-review.md).

System fonts, WebP portrait variants, explicit dimensions and small native scripts keep the baseline modest. The Hero portrait loads eagerly. No third-party request is needed to render the site.

## Security

No runtime credentials required. Keep .env files, private PDFs, QA artefacts, dependencies and caches out of Git. Email, GitHub, LinkedIn and the owner-approved phone number are intentionally public. Local storage holds only the theme preference. No analytics or tracking is installed. Do not copy private documents into public/.

Netlify config sets nosniff, strict-origin referrer policy and restricted camera/microphone/geolocation permissions. Verify HTTP responses after deployment. No speculative CSP is installed: inline scripts need a validated hash-based policy. npm audit results are dated, not permanent guarantees.

## Deployment

Netlify: `npm run build`, publish `dist`, Node 24.16.0. Static output, no server adapter or SPA catch-all. English fallback is configured; root 404.html covers French. Do not set INCLUDE_QA_ROUTES on Netlify.

Publish GitHub manually, connect Netlify to **main**, deploy with noindex, then test the real URL. Set **SITE_URL** in the **Production context only**, rebuild and verify canonical/hreflang while indexing remains disabled. Only after public QA, change **readyForIndexing** in src/config/site.ts, rebuild/redeploy and verify the 32 public sitemap entries and robots Allow/Sitemap. Leave SITE_URL absent from previews and branch deploys. Follow the exact sequence in the [deployment guide](docs/deployment.md) and [checklist](docs/publication-checklist.md).

No repository, domain or deployment is created by CI. A public OG image is an optional post-publication improvement; none is generated here.

## CV status

**Public CV pending.** Download remains disabled and the portfolio works without a PDF. Later, place an approved public version without a phone number at public/cv/Bassem_Wali_CV.pdf and explicitly enable profile.cv.publicVersionApproved. Build-time existence checking prevents a broken link. Never reuse the original private PDF.

## License / Copyright

No project-wide code license has been selected or added. Public visibility does not grant a redistribution license. Personal content and assets retain their applicable rights. License choice is documented and does not block publication.
