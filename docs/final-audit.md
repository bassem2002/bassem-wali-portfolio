# Phase 9 — Final SEO, Accessibility & Performance Audit

Note de maintenance Phase 10 : les mesures et nombres ci-dessous décrivent l'audit de Phase 9. Le build actuel exclut les trois pages QA (34 HTML / 36 routes) ; voir [release-readiness.md](release-readiness.md).

Audit local du 15 octobre 2026, sans déploiement, commit, push, changement global de Node ou modification du CV original. Les preuves volumineuses restent dans `.qa/final-audit/`, exclu de la publication. Ce rapport distingue mesures de laboratoire, contrôles automatiques et vérifications humaines restantes.

## Périmètre et méthode

Baseline enregistrée avant les corrections : lint, typecheck, 21 tests, build, liens internes et npm audit réussis. Inventaire et cinq rapports Lighthouse initiaux conservés dans `baseline.json`, `baseline-static.json` et `baseline/`. Les mesures finales utilisent le même serveur statique de `dist`, sur loopback, sans compression ni en-têtes de cache de production.

37 pages HTML : 32 pages de contenu (16 FR + 16 EN : accueil, catalogue, 14 projets), trois pages QA et deux 404. Avec robots.txt et sitemap.xml : 39 routes de sortie. Le build contient 46 fichiers, actifs compris. Les pages QA restent accessibles par leur URL et noindex ; noindex ne constitue pas un contrôle d'accès. Aucun document interne ou média de test n'est copié dans `dist`.

Outils : Astro 7.3.8, axe-core 4.14, Playwright Core 1.64, Chrome 155, Lighthouse 13.5.0. Lighthouse installé uniquement dans le cache npm pour cet audit, sans ajout à package.json ou au lockfile. Node local 24.14.1 ; les commandes réussissent, mais la plage déclarée du projet et d'ESLint exige `^22.22.3 || ^24.16.0 || >=26.3.0`. Utiliser Node 24.16+ en CI ; aucune mise à jour globale effectuée.

## Corrections appliquées

- Titres FR/EN de l'accueil et des cinq études raccourcis et localisés, sans changer les faits, H1 ou contributions. Aucun titre public ne dépasse 70 caractères, même dans le comptage HTML brut.
- Nom accessible du switch de langue incluant son code visible ; nom du lien de marque contenant le texte visible « BW Bassem Wali ». Le score Lighthouse d'accessibilité initial de 100 masquait ce diagnostic : le contrôle axe final active explicitement `label-content-name-mismatch`.
- Réservation avant chargement des modules de l'espace des contrôles de thème, menu et filtres. La navigation mobile utilise immédiatement sa disposition finale. Le comportement sans JavaScript reste disponible. Cette correction supprime les décalages mesurés, sans refonte visuelle.
- Politique robots/sitemap extraite dans un utilitaire commun avec un test du cas réellement indexable : 32 URL publiques uniquement, exclusions QA/404, protection sans origine ou tant que l'indexation est désactivée.
- Suppression du placeholder vide `public/cv/.gitkeep` qui était copié dans le build. Aucun PDF public ajouté.

## SEO et i18n

Les 32 pages publiques ont un seul H1 et aucune rupture de hiérarchie détectée. Métadonnées, descriptions, langues HTML, Open Graph et données structurées suivent la locale. Person et SoftwareSourceCode restent fondés sur les données existantes, sans téléphone, contribution, licence, date ou résultat inventé. Pas d'image sociale ou de compte Twitter fictif. Les noms officiels de neuf projets complémentaires restent identiques entre les langues ; leurs descriptions et contenus sont localisés.

`SITE_URL` attend une véritable origine HTTPS. Sans cette configuration, canonical, hreflang et og:url sont omis. `readyForIndexing` reste volontairement false : noindex/nofollow, robots Disallow et sitemap vide. Les scores SEO Lighthouse de 66/63 reflètent cette protection ; elle n'a pas été retirée pour augmenter le score.

`node scripts/check-i18n-seo.mjs` a validé dans une fixture isolée les canonical et alternates réciproques FR/EN/x-default ainsi que les 32 cibles existantes. Le domaine réservé portfolio.example n'appartient qu'à cette fixture. QA et 404 sans canonical/hreflang, toujours noindex. Le build normal a été régénéré sans origine de test. Le nouveau test de crawl couvre séparément l'activation future du sitemap et robots ; l'activation de publication n'est pas réalisée ici.

## Accessibilité et responsive

Matrice : 14 pages principales × 320, 375, 430, 768, 1024 et 1440 px × clair/sombre = 168 rendus. Contrôles de débordement, H1/hiérarchie, textes dans les viewBox des SVG, diagrammes non focusables, alt/dimensions/décodage des images. Les 13 diagrammes de chaque langue sont couverts par les cinq études.

Axe A/AA sur les 14 pages à 375 et 1440 px dans les deux thèmes, soit 56 scans, plus menu et filtres ouverts. Contrôles clavier FR/EN : skip link, menu Space/Escape et retour du focus, thème, relation technologies/projets, copie d'email simulée, ouverture des filtres, choix, recherche sans résultat, reset et focus, ancres et lien dépôt. Focus visible contrôlé ; reduced-motion désactive les transitions. Un parcours Tab supplémentaire n'a pas révélé de blocage, sans constituer un audit exhaustif avec lecteur d'écran.

Tests de contrastes des tokens : textes, texte secondaire, liens et tags au moins 4,5:1 sur les quatre fonds ; boutons principaux au moins 4,5:1 ; focus et bordures de contrôles au moins 3:1. Axe contrôle aussi le rendu. Bordures purement décoratives et états désactivés ne sont pas assimilés à du texte actif. Aucun changement de palette nécessaire.

Sans JS à 320 px : navigation visible, menu amélioré masqué, 14 projets disponibles, filtres améliorés masqués. Impression : contenu principal visible ; pas de feuille d'impression dédiée. Fallbacks 404 FR/EN testés sur le serveur local, avec statut 404 et langue adaptée. Le comportement de l'hébergeur reste à contrôler après déploiement.

## Lighthouse réellement mesuré

Un passage initial par configuration ; une première mesure après correction du CLS puis les cinq configurations remesurées sur le build final après correction du nom accessible. Chrome 155, Lighthouse 13.5.0, cache de navigation remis à zéro par Lighthouse. Profil mobile simulé par défaut et configuration desktop officielle. Les rapports HTML/JSON contiennent la configuration exacte et les captures. Aucun score de production ou percentile de trafic réel revendiqué.

| Page / profil | Performance avant → après | A11y après | Best Practices après | SEO après | LCP final | CLS avant → après | TBT final |
|---|---:|---:|---:|---:|---:|---:|---:|
| Accueil FR desktop | 100 → 100 | 100 | 100 | 66 | 390 ms | 0,0008 → 0 | 0 ms |
| Accueil FR mobile | 96 → 100 | 100 | 100 | 66 | 1 422 ms | 0,1130 → 0 | 0 ms |
| Accueil EN mobile | 96 → 100 | 100 | 100 | 66 | 1 419 ms | 0,1130 → 0 | 0 ms |
| Catalogue FR mobile | 93 → 100 | 100 | 100 | 63 | 1 427 ms | 0,1594 → 0 | 16,5 ms |
| Rezouette FR mobile | 97 → 100 | 100 | 100 | 63 | 1 056 ms | 0,1127 → 0 | 7,1 ms |

Le LCP est principalement du texte (résumé du Hero sur l'accueil), pas le portrait. La photo possède déjà dimensions et variantes WebP : aucun preload artificiel ajouté. TBT est une mesure de laboratoire ; INP terrain : **NOT MEASURED**. Les interactions ont été exercées mais ne donnent pas un percentile INP. Les diagnostics de compression/cache reflètent le serveur local, pas une mesure CDN. Le CSS commun présente du code inutilisé sur certaines pages, mais reste petit ; aucune séparation complexe ajoutée sans gain démontré.

Accessibilité et Best Practices étaient déjà à 100 dans la baseline ; SEO reste inchangé. Le dernier passage desktop signale aussi un reflow non attribué de 102 ms, avec TBT nul et CLS nul. Aucune lecture de géométrie DOM n'a été trouvée dans les sources applicatives. Le signal est conservé comme limite à examiner dans une trace en conditions de publication ; il ne justifie pas une correction spéculative du code. Les autres diagnostics concernent la chaîne de ressources et le CSS bloquant, notamment une économie simulée de 50 ms sur l'accueil EN mobile. Rezouette signale un Max Potential FID de 220 ms : métrique de laboratoire distincte d'INP, conservée avec le TBT mesuré de 7,1 ms. Un score de 100 ne signifie donc pas absence de diagnostics.

## Budget et réseau

| Ressource du build | Nombre | Octets bruts | Estimation gzip |
|---|---:|---:|---:|
| HTML | 37 | 709 237 | 194 394 |
| CSS | 1 | 18 728 | 4 124 |
| Modules JS externes | 3 | 4 175 | 1 728 |
| Portraits WebP | 2 | 9 482 | 9 528 |
| Favicon SVG | 1 | 246 | 204 |

Gzip calculé fichier par fichier, pas transfert HTTP observé. Les modules JS ne représentent pas tout le JS : l'accueil contient aussi environ 3,1 ko de scripts exécutables inline, séparés des payloads JSON et JSON-LD. Aucun îlot Astro hydraté, framework client, police externe ou script tiers. Portraits 160/320 px : 2 262/7 220 octets, dimensions explicites et décodage async ; chargement eager justifié dans le Hero.

Accueil FR mobile Lighthouse : six requêtes, 63 110 octets transférés sur le serveur local non compressé, en-têtes compris. Catalogue mobile : cinq requêtes, 62 632 octets ; Rezouette : trois, 44 930 octets. La plus grande page finale est la QA data-preview à 54 173 octets ; plus grande page publique : catalogue FR à 40 239 octets. Aucun PDF, source map, police ou application source dans le build. Le journal réseau indépendant de la homepage finale est conservé dans browser.json : zéro requête externe, six requêtes initiales et 57 221 octets de ressources utiles (hors en-têtes, portrait 160 px du contexte desktop sans DPR mobile). Sa liste brute inclut ensuite les navigations de contrôle des 404 ; les entrées resources/navigation correspondent à la homepage.

## Privacy, security et dépendances

Inventaire des 46 fichiers et scan du build : aucun chemin Windows utilisateur, nom de machine, localhost, .env, PDF, source map, affectation de secret, clé privée, JWT typique, token GitHub ou numéro au format international tunisien détecté. Les trois occurrences du mot token sur Rezouette EN décrivent la durée de vie et la protection OAuth ; elles ne contiennent aucun identifiant. Ce contrôle par motifs et relecture ciblée ne constitue pas une preuve mathématique d'absence de secret. L'email professionnel reste intentionnellement public ; aucun email envoyé pendant les tests. CV d'origine non modifié et non publié.

Pas d'analytics, cookie de suivi, backend de contact ou appel GitHub runtime. Préférence de thème locale uniquement. Les trois en-têtes Netlify configurés sont nosniff, strict-origin-when-cross-origin et Permissions-Policy limitant caméra/micro/géolocalisation. Leur présence HTTP en production n'est pas mesurée. Pas de CSP ajoutée au hasard : des scripts inline existent ; une CSP de publication devra être validée avec leurs hashes et les flux réels. Pas de secret requis côté client.

`npm audit --json` : zéro vulnérabilité à tous les niveaux, métadonnées 435 dépendances transitives (catégories avec recouvrements). Un seul package direct de production, Astro ; huit outils de développement justifiés par typage, lint et QA. Aucun package ajouté au projet pendant cette phase et aucun npm audit fix automatique. Ce résultat est daté et ne garantit pas les avis de sécurité futurs.

Liens internes et ancres : 37 HTML contrôlés. Les 14 dépôts GitHub existent, sont publics et correspondent aux URL attendues (API 200) ; profil GitHub 200. LinkedIn retourne 999 à la requête automatisée : contrôle humain requis, sans le déclarer cassé. Mailto vérifié syntaxiquement, sans envoi.

## Reproduction et résultats

Commandes : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:links`, `npm audit --json`, `node scripts/check-i18n-seo.mjs`, `node scripts/check-final-audit.mjs`. Les cinq mesures utilisent `node scripts/audit-lighthouse.mjs` après mise en cache de Lighthouse 13.5.0 (`npm exec --yes --package=lighthouse@13.5.0 -- lighthouse --version`). Le runner découvre cette installation dans le cache local ; Chrome est celui installé sous Windows. Il ferme ses processus et son serveur. Les mesures Lighthouse ne sont pas lancées en concurrence avec les scans navigateur.

Lint réussi ; typecheck 96 fichiers, zéro erreur/avertissement/hint ; 22 tests réussis ; build statique et liens réussis. Les résultats détaillés de la matrice sont dans browser.json ; les cinq rapports finaux dans final/, résumé lighthouse-summary.json. Les artefacts restent privés au workspace.

| Area | Status | Findings | Fixes | Remaining |
|---|---|---|---|---|
| SEO | PASS WITH NOTES | Indexation volontairement bloquée | Titres localisés, test crawl | Origine réelle et activation lors de la publication |
| Accessibility | PASS WITH NOTES | Labels et stabilité initiaux corrigés | Labels, réservation des contrôles | Lecture humaine et lecteur d'écran |
| Performance | PASS WITH NOTES | CLS initial 0,113–0,159 mobile | CLS final nul, performances 100 | Cache/compression CDN et INP terrain non mesurés |
| Responsive | PASS | 168 rendus ciblés | Initialisation du header | Appréciation tactile humaine |
| i18n | PASS WITH NOTES | 32 pages et relations FR/EN vérifiées | Titres et labels | Relecture éditoriale EN |
| Privacy | PASS | Aucun secret détecté, CV absent | Placeholder retiré | Scan limité aux motifs et contenus inspectés |
| Security | PASS WITH NOTES | Statique, en-têtes configurés | Pas de modification risquée | Vérification HTTP/CSP à la publication |
| Dependencies | PASS WITH NOTES | Audit zéro vulnérabilité | Aucun ajout au projet | Node 24.16+ à retenir pour CI |
| Build | PASS | 22 tests, 37 HTML, 39 routes | Test de crawl ajouté | Aucune action bloquante |
| Links | PASS WITH NOTES | Internes et GitHub valides | Aucune correction nécessaire | LinkedIn 999 : vérification humaine |

## Suite

Contrôle humain du confort de lecture, zoom, tactile et lecteur d'écran ; relecture EN ; ouverture de LinkedIn dans un navigateur personnel. Les tests automatiques et les scores ne prouvent pas une conformité WCAG globale.

Aucune décision bloquante. Phase suivante autorisable : **Phase 10 — Final Testing, CI & Repository Cleanup**. Arrêt après la Phase 9.
