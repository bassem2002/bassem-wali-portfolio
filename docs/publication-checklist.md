# Publication manuelle — V3 validée

Phase 11 : préparation locale uniquement. **V3 READY FOR PUBLICATION** ; le design et les contenus sont figés. Aucune action ci-dessous n’a été exécutée sur GitHub ou Netlify. Guide détaillé : [deployment.md](deployment.md). État technique : [release-readiness.md](release-readiness.md).

## Before GitHub

- [ ] Utiliser Node **24.16.0**, vérifier `node --version`, puis exécuter les commandes finales du guide.
- [ ] Inspecter la sélection de fichiers : sources, tests, scripts, docs, configurations et lockfile ; exclure dépendances, sorties, QA, caches, environnements, logs et documents privés selon `.gitignore`.
- [ ] Conserver le téléphone public approuvé **+33 7 51 24 55 31**, `tel:+33751245531`, l’email `welibassem079@gmail.com`, GitHub `https://github.com/bassem2002` et LinkedIn `https://www.linkedin.com/in/bassem-wali`.
- [ ] Conserver **Public CV pending** ; ne copier aucun ancien CV privé dans `public/`.
- [ ] Laisser `src/config/site.ts` à `readyForIndexing: false`. Ne définir ni `INCLUDE_QA_ROUTES` ni origine de fixture dans l’hébergement.

## GitHub Publication

- [ ] Créer manuellement un dépôt public vide **bassem-wali-portfolio** dans le compte souhaité, sans README, licence ou `.gitignore` générés par GitHub.
- [ ] Description : **Personal portfolio of Bassem Wali — Software Engineering, Full-Stack Development, Business Intelligence and Artificial Intelligence.**
- [ ] Initialiser localement Git sur `main`, examiner les fichiers avant staging et publier avec les commandes manuelles du guide.
- [ ] Premier commit, titre : **Initial portfolio release**. Corps : `Bilingual Astro portfolio showcasing software engineering, full-stack development, Business Intelligence and Artificial Intelligence projects, with case studies, accessibility, responsive design, SEO preparation and CI.`
- [ ] Laisser Website vide jusqu’au premier déploiement.
- [ ] Topics : `portfolio`, `astro`, `typescript`, `software-engineering`, `full-stack`, `business-intelligence`, `artificial-intelligence`, `machine-learning`, `computer-engineering`, `accessibility`, `i18n`, `netlify`.
- [ ] Vérifier le premier run **Quality checks** : installation, lint, typage, tests, SEO fixture, build, liens et release. Aucun déploiement dans ce workflow.

## First Netlify Deployment

- [ ] Dans Netlify, importer un projet existant depuis GitHub ; autoriser l’accès au dépôt puis sélectionner **bassem-wali-portfolio**.
- [ ] Branche production **main** ; base à la racine ; build **npm run build** ; publish **dist** ; Node **24.16.0**. Vérifier les valeurs lues depuis `netlify.toml`.
- [ ] Ne pas ajouter de redirection SPA `/* /index.html 200`, de tracking, de domaine personnalisé ou de routes QA.
- [ ] Déployer avec l’indexation encore désactivée et relever la vraie origine HTTPS **<NETLIFY_PRODUCTION_URL>**.
- [ ] Noms possibles : `bassem-wali`, `bassem-wali-portfolio`, `bassemwali-portfolio`. Vérifier leur disponibilité dans Netlify ; aucune disponibilité n’est présumée.
- [ ] Tester le site public avant toute activation SEO. Ne pas confondre URL de preview et URL principale.

## Production URL

- [ ] Définir **SITE_URL = <NETLIFY_PRODUCTION_URL>** dans Netlify, contexte **Production uniquement**, portée build ; valeur HTTPS réelle sans chemin, query ou fragment. Ne pas saisir littéralement le placeholder.
- [ ] Laisser SITE_URL absent des Deploy Previews et branch deploys. Netlify fournit `URL` et `CONTEXT` ; ne pas les redéfinir manuellement.
- [ ] Reconstruire avec `readyForIndexing: false` pour vérifier les métadonnées sur la véritable origine ; canonical, hreflang, og:url et Person.url doivent l’utiliser.
- [ ] Contrôler le sitemap et robots à ce stade : sitemap vide et robots `Disallow: /` restent attendus tant que le drapeau est faux.

## Post-Deploy QA

- [ ] Ouvrir accueil `/` et `/en/`, catalogue `/projects/` et `/en/projects/`.
- [ ] Ouvrir dans les deux langues les cinq études : `rezouette`, `smartalumni-iit`, `enterprise-bi-dashboard`, `mindrawfx`, `waste-classification` sous `/projects/` et `/en/projects/`.
- [ ] Tester thème, langue contextuelle, recherche, catégories, technologies, compteur, reset, explorateur Spring Boot → SmartAlumni/ShopFlow, menu mobile et navigation locale des études.
- [ ] Tester GitHub, LinkedIn, mailto et tel ; vérifier les vrais liens, et `target="_blank"` / `rel="noopener noreferrer"` pour les liens externes concernés.
- [ ] Depuis les cartes/fiches, ouvrir les quatre vidéos Rezouette, SmartAlumni IIT, SchoolManagementMERN et EventPlanner dans une session anonyme : bon projet et aucune demande d’autorisation. Les URL exactes sont dans `src/data/project-videos.ts`.
- [ ] Tester `/does-not-exist` et `/en/does-not-exist` : statut HTTP **404**, message FR/EN respectif, pas accueil renvoyé avec statut 200.
- [ ] Vérifier HTTPS et les vrais headers HTTP : `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Aucune CSP n’est actuellement configurée.
- [ ] Sur un vrai smartphone, tester Hero, portrait, contacts, navigation, Bento, filtres, Formation, Skills, vidéos, études et Contact ; vérifier aussi clavier et zoom sur desktop.
- [ ] Vérifier qu’aucun CV privé, fichier `.env`, secret, chemin Windows, dossier QA, cache ou document interne n’est distribué. Une route absente doit rester 404, même si une page d’erreur est affichée.
- [ ] Mesurer Lighthouse sur la véritable URL : accueil mobile, catalogue mobile, Rezouette mobile ; relever Performance, Accessibility, Best Practices et SEO sans présumer des scores locaux.

## SEO Activation

- [ ] 1. Confirmer que le premier déploiement était en noindex.
- [ ] 2. Terminer les tests de l’URL publique ci-dessus.
- [ ] 3. Confirmer SITE_URL avec la véritable origine production.
- [ ] 4. Vérifier un canonical propre pour chaque page, jamais un loopback ou domaine de fixture.
- [ ] 5. Vérifier les paires hreflang FR/EN de l’accueil, catalogue et cinq études, ainsi que x-default et les cibles existantes.
- [ ] 6. Vérifier le sitemap : vide avant activation ; le test `npm run check:seo` et les tests de crawl couvrent le comportement activé en isolation.
- [ ] 7. Vérifier robots : `Disallow: /` avant activation, puis `Allow: /` et `Sitemap: <NETLIFY_PRODUCTION_URL>/sitemap.xml` après.
- [ ] 8. Seulement après validation publique, modifier manuellement **readyForIndexing: true** dans `src/config/site.ts`, puis exécuter les contrôles et publier ce changement sur `main`.
- [ ] 9. Laisser Netlify reconstruire/redéployer depuis GitHub ; aucun besoin d’un déploiement CLI.
- [ ] 10. Revérifier le HTML public : retrait du noindex des 32 pages publiques, canonical/hreflang/OG/JSON-LD sur la vraie origine, sitemap de **32 URL**, robots autorisé. 404 toujours noindex et QA toujours absente.
- [ ] Contrôler une Deploy Preview : sans SITE_URL et hors CONTEXT production, elle reste noindex avec sitemap vide et robots bloqué.
- [ ] Refaire Lighthouse SEO après activation : vérifier surtout crawlabilité et métadonnées, sans objectif de score garanti.

## Post-Launch Tasks

- [ ] Renseigner Website dans GitHub About, puis le Website du profil GitHub ; éventuellement ajouter le portfolio au README du profil.
- [ ] Ajouter manuellement l’URL publique dans LinkedIn.
- [ ] Facultatif et recommandé : ajouter une propriété Google Search Console, vérifier sa propriété puis soumettre `<NETLIFY_PRODUCTION_URL>/sitemap.xml`. L’indexation n’est pas immédiate ni garantie.
- [ ] Conserver l’absence d’analytics. Domaine personnalisé reporté à plus tard ; si l’origine change, mettre à jour SITE_URL puis reconstruire et contrôler les métadonnées.
