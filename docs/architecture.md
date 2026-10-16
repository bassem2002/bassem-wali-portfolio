# Architecture

Évolution Phase 3 : voir `docs/content-model.md` pour le modèle actuel. Project utilise maintenant `title`, `githubUrl`, `featured`, `projectType` et `myContributions`. Les routes et le design system sont conservés.

Décisions validées : Astro + TypeScript + CSS, génération statique, FR/EN, direction Modern Product Engineer V3.2, cinq projets phares, hébergement futur Netlify. React absent. La refonte visuelle conserve les données, routes, filtres et la CI ; voir design-system.md et v3-2-validation.md. Aucune publication autorisée à ce stade.

## Flux

```text
src/data/*.ts ── types/content.ts
       │
       ├── utilitaires projets → vues partagées → routes FR / EN
       └── registre technologies → relation Technologies ↔ Projects

Markdown FR/EN → collection validée → filtre draft=false → layout projet

configuration d’origine → SEO commun → canonical / alternates / sitemap
```

## Responsabilités

- `types/content.ts` : Profile, Project, Experience, Education, Skill, ProjectCategory, preuves et traductions.
- `data/` : source locale unique. Aucun fetch GitHub au build ou au runtime.
- `i18n/` : français non préfixé, anglais `/en/`, slugs identiques et switch conservant le projet.
- `components/pages/` : présentation partagée ; `pages/` ne contient que routage et getStaticPaths.
- `BaseLayout` : lang, head SEO, thème initial, header, main, footer et lien d’évitement.
- `ProjectLayout` : titre, résumé, slot éditorial, repository. Les études de cas publiées sont optionnelles.
- `content.config.ts` : schema Markdown. Une étude nécessite un slug existant, une langue, des sources et une validation éditoriale avant de désactiver le brouillon.
- `utils/projects.ts` : sélection featured, catégories et technologies utilisées dérivées des données.

## Évolution sans modification UI

Ajouter un projet dans le tableau de données génère automatiquement ses routes dans les deux langues. Ajouter une technologie demande une entrée de registre puis son ID dans les projets concernés. Une étude de cas s’associe par `(projectSlug, locale)` ; aucune correspondance écrite dans un composant.

Les filtres utilisent les catégories réellement présentes et conservent une liste HTML complète sans JS. Technologies ↔ Projects partage le même modèle et fonctionne par boutons natifs au clavier/tactile. Ces interactions sont livrées dans les deux langues.

## Build, QA et CI — Phase 10

La homepage, le catalogue, les cinq études et les interactions sont disponibles en FR/EN. La production contient 34 HTML : 32 pages de contenu et deux 404 ; robots/sitemap portent le total à 36 routes. Les trois pages de `src/qa/` sont injectées par une intégration Astro locale en développement ou avec INCLUDE_QA_ROUTES=1. `build:qa` les construit dans `.qa/qa-build/` (37 HTML), sans modifier dist/. `check:design-system` prépare ce build isolé automatiquement ; ses modes homepage/projects/case-studies/i18n continuent à contrôler dist/.

La CI utilise npm ci, Node 24.16.0, lint, typecheck, tests, fixture SEO séparée, build, liens et contrôle de sortie. Aucun déploiement automatique par GitHub Actions. Netlify utilise la même version Node et publie uniquement dist/. Origine et activation de l'indexation restent explicites ; voir README et release-readiness.md. Aucun test des applications sources n'est revendiqué.
