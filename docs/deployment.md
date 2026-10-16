# Déploiement manuel — Bassem Wali Portfolio

V3 définitivement validée. Phase 11 prépare la publication ; **aucun dépôt, commit, push, déploiement ou changement d’indexation effectué par l’agent**. Exécuter les étapes suivantes soi-même, dans l’ordre. [Checklist](publication-checklist.md) et [résultats locaux](release-readiness.md).

## Réglages réels du projet

| Réglage | Valeur / source |
| --- | --- |
| Dépôt recommandé | `bassem-wali-portfolio` ; également `package.json.name`, aucune dépendance à un nom de dossier ou de dépôt distant |
| Branche production à sélectionner | `main` ; CI accepte main/master, Netlify utilisera la branche choisie dans son interface |
| Base directory | Racine du dépôt ; pas de sous-dossier à définir |
| Build command | `npm run build` — `netlify.toml` ; prebuild valide les données |
| Publish directory | `dist` — `netlify.toml` |
| Node | `24.16.0` dans `.nvmrc` et `netlify.toml` ; CI lit `.nvmrc` |
| Engines supportés | `^22.22.3 || ^24.16.0 || >=26.3.0` ; choisir exactement 24.16.0 pour ce lancement |
| Origine | `src/config/site-url.mjs` : `SITE_URL`, sinon `URL` uniquement si `CONTEXT=production` |
| Indexing | `src/config/site.ts` : `readyForIndexing: false` actuellement |
| QA | `src/qa/`, développement ou build QA isolé uniquement ; ne jamais définir `INCLUDE_QA_ROUTES` sur Netlify |
| Rendu | Astro statique, `trailingSlash: always`, sans adaptateur serveur ni fallback SPA |
| CV | **Public CV pending**, `profile.cv.publicVersionApproved: false` ; site fonctionnel sans PDF |

L’unique résolveur d’origine alimente `site.url`, puis canonical, hreflang/x-default, Open Graph, Person JSON-LD, robots et sitemap. Les URL de dépôts dans les schémas SoftwareSourceCode restent naturellement des URL GitHub. Ni origine réelle ni sous-domaine Netlify ne sont inventés ici : **<NETLIFY_PRODUCTION_URL>** est un placeholder documentaire à remplacer.

## 1. Contrôles locaux et fichiers

Depuis la racine du projet, avec Node 24.16.0 actif :

```sh
node --version
npm ci
npm run lint
npm run typecheck
npm test
npm run check:seo
npm run build
npm run check:links
npm run check:release
npm audit
```

Résultat attendu à cette livraison : 29 tests, 34 HTML, 36 routes et 45 fichiers de build ; aucun PDF privé ni page QA. `check:seo` utilise une origine de fixture en processus isolé : ne jamais reprendre cette origine sur Netlify. Aucun secret d’exécution requis, aucun `.env.example` requis ni présent.

Fermer normalement un serveur de développement utilisant les dépendances avant `npm ci` sous Windows : il peut verrouiller un module natif. Ne pas ignorer une erreur d’installation ; réessayer une fois le processus concerné fermé. Une copie propre isolée peut servir à valider l’installation sans arrêter une session de développement.

Conserver `.gitignore`, `.npmrc`, `.nvmrc`, `.github/`, README, docs, scripts, src, tests, public, configurations, package et lockfile. Exclure `node_modules`, `dist`, `.astro`, `.qa`, `.npm-cache`, environnements, logs, IDE, fichiers temporaires, clés et documents privés. Les références de captures dans les anciens rapports désignent des preuves locales ignorées ; elles ne sont pas distribuées. Le README ne doit pas intégrer ces images.

## 2. GitHub — publication à effectuer manuellement

Créer depuis GitHub un dépôt public vide **bassem-wali-portfolio**, sans générer README, licence ou ignore. La disponibilité du nom et l’accès au compte seront vérifiés par son propriétaire. Website reste vide jusqu’au déploiement.

Description :

```text
Personal portfolio of Bassem Wali — Software Engineering, Full-Stack Development, Business Intelligence and Artificial Intelligence.
```

Topics : `portfolio`, `astro`, `typescript`, `software-engineering`, `full-stack`, `business-intelligence`, `artificial-intelligence`, `machine-learning`, `computer-engineering`, `accessibility`, `i18n`, `netlify`.

Les commandes ci-dessous sont fournies pour votre exécution uniquement. Aucun dépôt Git local n’était présent lors de cette préparation. Dans le dossier du projet :

```sh
git init -b main
git status --short --untracked-files=all
```

Examiner les fichiers listés : aucun document privé ni sortie générée. Puis :

```sh
git add .
git diff --cached --stat
git diff --cached --name-only
```

Relire les fichiers sélectionnés avant le commit. Préparer le commit exactement ainsi :

```sh
git commit -m "Initial portfolio release" -m "Bilingual Astro portfolio showcasing software engineering, full-stack development, Business Intelligence and Artificial Intelligence projects, with case studies, accessibility, responsive design, SEO preparation and CI."
```

Ajouter comme remote **l’URL exacte affichée par GitHub pour le dépôt créé**. Remplacer le placeholder, sans le saisir littéralement :

```sh
git remote add origin <GITHUB_REPOSITORY_URL>
git push -u origin main
```

Se connecter à GitHub avec son mécanisme habituel ; ne jamais placer un token dans une URL ou dans les sources. La [procédure officielle GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github) décrit cette publication d’un projet local.

Dans Actions, vérifier le premier run **Quality checks**. `.github/workflows/ci.yml` exécute npm ci, lint, typecheck, test, check:seo, build, check:links, check:release sous Linux avec `.nvmrc` et permissions en lecture. Aucun secret ou étape de déploiement configuré. Un succès local ne prouve pas le premier run distant.

## 3. Premier Netlify — encore noindex

Importer dans Netlify un projet existant depuis GitHub, autoriser ce dépôt et sélectionner **bassem-wali-portfolio**. Choisir `main`, racine, build `npm run build`, publish `dist`, Node `24.16.0`. Le TOML fixe ces trois dernières valeurs. Vérifier le journal d’installation et de build du premier deploy.

Ne pas définir `SITE_URL` avec une URL supposée. Le premier build production peut utiliser le fallback Netlify `URL` ; le drapeau faux conserve noindex même si cette origine est déjà connue. Ne pas définir `INCLUDE_QA_ROUTES`, ajouter un catch-all SPA ou modifier le design. Aucun service d’analytics.

Déployer, relever la véritable URL principale HTTPS **<NETLIFY_PRODUCTION_URL>**, puis réaliser la checklist publique avant activation. Noms suggérés seulement : `bassem-wali`, `bassem-wali-portfolio`, `bassemwali-portfolio`, sous réserve de disponibilité. Utiliser d’abord le sous-domaine Netlify standard, sans domaine personnalisé. Vérifier HTTPS dans le navigateur ; aucun certificat manuel n’est à configurer pour le sous-domaine Netlify standard.

## 4. Fixer l’origine, vérifier puis activer SEO

Dans les variables Netlify, ajouter `SITE_URL` avec la vraie origine HTTPS en **Production uniquement**, portée build. Exemple de forme documentaire : `<NETLIFY_PRODUCTION_URL>` sans chemin. Laisser cette variable absente des previews/branch deploys. `URL` et `CONTEXT` sont fournis par Netlify ; ne pas détourner `DEPLOY_URL` ou `DEPLOY_PRIME_URL` en source canonical. Voir [variables Netlify](https://docs.netlify.com/build/configure-builds/environment-variables/) et [valeurs par contexte](https://docs.netlify.com/build/environment-variables/overview/).

Ordre exact :

1. Premier déploiement avec `readyForIndexing: false`.
2. Tester réellement l’URL publique avec [Post-Deploy QA](publication-checklist.md#post-deploy-qa).
3. Définir SITE_URL production puis reconstruire, toujours avec le drapeau faux : les variables de build ne modifient pas un site déjà généré.
4. Vérifier les canonical propres à chaque page sur la vraie origine.
5. Vérifier les hreflang FR/EN/x-default réciproques : accueil, catalogue et les cinq slugs d’étude de la checklist. Aucune cible 404.
6. Vérifier `/sitemap.xml` : actuellement vide, par conception ; les tests locaux contrôlent séparément les 32 URL lorsque l’indexation est autorisée.
7. Vérifier `/robots.txt` : actuellement `User-agent: *` et `Disallow: /`.
8. Une fois ces vérifications réussies, modifier **manuellement** `readyForIndexing: true` dans `src/config/site.ts`, lancer les contrôles locaux puis commit/push sur main. Pas effectué pendant cette phase.
9. Attendre le rebuild/redeploy Netlify lié à GitHub.
10. Revérifier le HTML public et les endpoints : pages publiques sans noindex, canonical/hreflang/og:url/Person.url corrects ; robots `Allow: /` et ligne Sitemap sur la vraie origine ; sitemap **32 URL** uniquement (16 FR + 16 EN), sans 404, QA ou docs. QA reste absente du build ; les 404 restent noindex.

Le sitemap vide et le robots bloqué **avant** l’étape 8 ne sont pas une panne. Sans origine, le site reste aussi noindex, même avec le drapeau vrai. Une preview sans SITE_URL, hors CONTEXT production, n’adopte pas le fallback URL ; vérifier qu’elle conserve robots bloqué, sitemap vide et absence de canonical temporaire. Ne jamais définir SITE_URL dans tous les contextes.

## 5. Réponses HTTP et vérification publique

Utiliser le navigateur et, si disponible, `curl.exe` depuis PowerShell. Remplacer l’URL documentaire :

```sh
curl.exe -I <NETLIFY_PRODUCTION_URL>/
curl.exe -I <NETLIFY_PRODUCTION_URL>/does-not-exist
curl.exe -I <NETLIFY_PRODUCTION_URL>/en/does-not-exist
curl.exe <NETLIFY_PRODUCTION_URL>/robots.txt
curl.exe <NETLIFY_PRODUCTION_URL>/sitemap.xml
```

Accueil 200 ; routes inexistantes 404 avec texte FR/EN. `netlify.toml` fournit un fallback 404 anglais `/en/*` → `/en/404/` sans `force`, les vrais fichiers existants restent prioritaires. `404.html` assure le fallback racine. Aucun `/* /index.html 200`.

Headers attendus depuis le vrai hébergement : `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. **CSP absente** du projet ; ne pas prétendre qu’elle est active. La présence du TOML ne remplace pas cette vérification HTTP.

Exécuter toute la checklist publique : FR/EN, cinq études par langue, interactions, liens, appareil mobile réel et absence de fichiers privés. Les quatre démos sont déjà référencées et validées localement ; leur accès anonyme et leur correspondance doivent être ouverts à nouveau depuis le site public. Aucun résultat public n’est revendiqué aujourd’hui.

Après activation, mesurer Lighthouse sur accueil/catalogue/Rezouette mobiles ; enregistrer les quatre catégories, puis vérifier crawlabilité, canonical, robots, sitemap et hreflang sans objectif de score garanti. Les mesures locales V3.3 de 98–100 Performance et 100 Accessibility restent des mesures de laboratoire.

## 6. Après lancement

Renseigner manuellement Website de GitHub About et du profil GitHub, éventuellement README du profil et lien LinkedIn. Google Search Console : ajouter une propriété de l’URL, vérifier sa propriété selon la méthode proposée, soumettre `/sitemap.xml` ; aucune garantie d’indexation immédiate. Garder analytics absent, domaine personnalisé pour plus tard et **Public CV pending** tant qu’aucune version publique approuvée n’existe.

Références de configuration : [Netlify TOML](https://docs.netlify.com/build/configure-builds/file-based-configuration/), [version Node](https://docs.netlify.com/build/configure-builds/manage-dependencies/). Les valeurs spécifiques ci-dessus ont été lues dans les fichiers locaux ; les résultats du futur hébergement restent à vérifier.
