# V3.3 — Final Visual Review & Polish

16 octobre 2026 — **V3 READY FOR PUBLICATION**.

La V3 peut être présentée à un recruteur : identité lisible, positionnement logiciel/Full-Stack explicite, BI et IA visibles, projets différenciés et accès direct aux preuves et contacts. Aucun problème visuel bloquant identifié après les deux corrections ci-dessous. Cette décision termine la revue locale ; elle ne déclenche aucune publication.

## Méthode et périmètre

Inspection directe des captures Chrome du build final, en complément des contrôles automatisés. Le jugement esthétique est celui de l’agent : il reste subjectif et ne constitue ni un panel humain ni une étude de recrutement. Aucun nouveau concept graphique, fonctionnalité, framework ou changement d’architecture.

- Hero : 1440, 1600, 1920, 375 et 320 px, clair et sombre ; contrôle complémentaire de la version anglaise.
- Homepage complète : 1920 et 375 px dans les deux thèmes ; captures rapprochées des projets, Focus, Skills, Experience, Education, About et Contact pour ne pas juger uniquement une longue image réduite.
- Catalogue desktop/mobile et cinq études comparées : Rezouette, SmartAlumni IIT, Enterprise BI Dashboard, MinDrawFX, Waste Classification. Inspection des introductions, illustrations et extraits techniques, dont MinDrawFX FR et SmartAlumni EN.
- Relecture ciblée FR/EN : Hero, titres, résumés, actions et distinctions techniques. Conservation des faits et limites documentés.

Les captures de sections isolées masquent le header fixe ; les extraits de prose masquent également la navigation sticky pour éviter son incrustation au milieu d’une capture longue. Ces masquages concernent uniquement la prise de vue. Les captures de pages/Hero et les contrôles de navigation utilisent l’interface réelle.

## Problèmes retenus — deux seulement

| Priorité | Constat avant correction | Action finale | Statut |
| --- | --- | --- | --- |
| P2 | Formation : padding et hauteur minimale donnaient trop de place vide aux fiches courtes, surtout sur mobile. | Réduction uniforme du padding, du gap et de la hauteur minimale ; même composant et mêmes dimensions pour les quatre fiches. À 375 px FR, hauteur finale de 234 px par fiche, contre environ 282 px avant cette passe. Grille 2 × 2 desktop et colonne mobile conservées. | Corrigé |
| P3 | Le Hero des études disait « Voir le repository GitHub », alors que la fin de page utilisait déjà un français plus direct. | Harmonisation sur « Voir le code sur GitHub ». Le terme technique Repository reste présent quand il désigne le pattern d’architecture. | Corrigé |

Aucun P1 identifié, aucun P2 restant et aucun arbitrage esthétique majeur à appliquer. Arrêt des modifications de l’interface après cette passe.

## Appréciation visuelle

Le statut étudiant reste visible et secondaire au nom : 15 px sur mobile, jusqu’à 19 px sur grand écran. Les quatre axes se lisent avant les CTA ; BI/IA conservent la taille et le poids du Full-Stack. À 320 px, le retour à la ligne du statut et des actions préserve la lecture. Le Hero mobile est plus long que sa version desktop, mais la présentation reste ordonnée, sans animation ni contenu parasite avant les actions.

Le portrait conserve la photo originale, son visage et son cadrage approuvé ; les étiquettes périphériques ne cachent pas les yeux ni les traits du visage. GitHub, LinkedIn et le téléphone public approuvé **+33 7 51 24 55 31** sont accessibles dessous, avec une ligne dédiée au numéro sur mobile.

Le titre **« Du code. Des idées. Des projets concrets. »** est naturel dans cette composition : conservé. « Code. Ideas. Things that work. » reste une adaptation anglaise idiomatique. Aucune alternative ni réécriture gratuite.

Rezouette domine la sélection, SmartAlumni vient ensuite, puis BI/MinDrawFX/Waste. Les scènes évoquent des produits et portent explicitement la mention d’illustration ; elles ne prétendent pas être des captures d’applications. La vidéo est l’action primaire lorsqu’elle existe, l’étude vient ensuite, puis GitHub. Les projets complémentaires restent plus compacts dans le catalogue.

Focus introduit les quatre domaines avec un rythme éditorial distinct. Skills organise les technologies en sept groupes courts et donne une preuve interactive immédiate : Spring Boot sélectionne SmartAlumni et ShopFlow ; « Tout afficher » rétablit les correspondances. La chronologie 2026 → 2025 → 2024 se scanne facilement. Les quatre formations gardent leurs dates et lieux historiques. About apporte la motivation et la manière de travailler ; Contact fournit une vraie conclusion avec email, téléphone, copie et réseaux.

Le bleu assure l’identité ; violet, cyan et vert restent des accents de projet. Les surfaces du mode sombre restent différenciées, les textes secondaires lisibles et les bordures discrètes. Les largeurs maximales évitent l’étirement à 1920 px. Les longs paragraphes techniques restent bornés autour de 72 ch ; la navigation des études permet une lecture par section.

## Cinq études : des angles reconnaissables

| Étude | Ce que le premier écran et le parcours communiquent | Décision |
| --- | --- | --- |
| Rezouette | Composition/publication sociale, OAuth/PKCE, programmation et fournisseurs ; vidéo visible avant les tags. | Conserver |
| SmartAlumni IIT | Extraction Tika, analyse DeepSeek et validation du profil ; classement pondéré des mentors traité séparément. Aucun matching présenté comme un modèle ML entraîné. | Conserver |
| Enterprise BI Dashboard | Illustration analytique et vocabulaire SSAS/MDX/OLAP ; consommation d’un cube existant, sans prétendre construire toute la chaîne décisionnelle. | Conserver |
| MinDrawFX | Éditeur JavaFX, Command/Undo/Redo, Decorator et persistance SQLite. Prose plus approfondie, mais organisée par problèmes, décisions et limites ; inutile de la raccourcir au prix des preuves. | Conserver |
| Waste Classification | Vision, ResNet50 et TensorFlow/Keras ; transfert et fusion de caractéristiques explicités, dépendances externes et absence de résultat reproduit conservées. | Conserver |

Les cinq illustrations et narrations se distinguent même avec les noms masqués mentalement. Le cadre commun sert la cohérence sans effacer leurs sujets.

## Parcours recruteur simulés

Ces parcours sont des walkthroughs heuristiques avec budgets de lecture indicatifs, pas des temps mesurés auprès de vrais recruteurs.

| Profil | Parcours et constat | Verdict de revue |
| --- | --- | --- |
| RH — 15 s | Nom, statut ingénieur, logiciel/Full-Stack et BI/IA visibles dans le Hero ; Projets, Expériences et Contact immédiatement identifiables dans la navigation. Sur mobile, les contacts suivent le portrait sans exiger de parcourir tout le site. | Les informations essentielles sont repérables. |
| Recruteur technique — 45 s | Featured expose NestJS/Angular, Spring Boot et SSAS/MDX. Skills rend visibles TensorFlow/PyTorch, Jest/JUnit/Mockito ; les liens mènent aux projets et architectures. | Stacks et preuves se trouvent sans lire les études intégralement. |
| Ingénieur — 2 min | Ouverture de SmartAlumni ou MinDrawFX, accès Architecture puis Décisions techniques et Limites actuelles par la navigation locale. Responsabilités, compromis et limites sont explicites. | Une décision et ses limites peuvent être comprises rapidement. |
| Catalogue — 20 s | Rezouette et SmartAlumni en premier ; BI et Waste dans la sélection suivante. Recherche toujours visible ; catégories pour IA/mobile, technologies et reset dans le panneau nommé. Le compteur et l’état sélectionné expliquent le résultat. | Les cinq cibles demandées sont accessibles sans explorer les 14 fiches une par une. |

## Visual scorecard

Scores subjectifs de cette revue, indépendants de Lighthouse ; 10 n’est pas une exigence de publication.

| Area | Score /10 | Main observation | Action |
| --- | --- | --- | --- |
| Hero | 9 | Nom dominant, statut visible, quatre axes lisibles ; retours à la ligne utiles sur petit écran. | Conserver |
| Navigation | 9 | Repères clairs, contrôles langue/thème et menu utilisables au clavier. | Conserver |
| Featured | 9 | Priorité Rezouette/SmartAlumni, scènes produit distinctes et actions hiérarchisées. | Conserver le titre et la composition |
| Projects | 8.5 | 14 projets explorables ; panneau de filtres explicite et recherche visible. | Conserver |
| Focus | 9 | Quatre domaines organisés sans répéter une grille de CV. | Conserver |
| Skills | 8.5 | Groupes courts et preuves interactives ; section nécessairement plus longue sur mobile. | Conserver |
| Experience | 9 | Années et entreprises se scannent, rôles et liens projet sont clairs. | Conserver |
| Education | 8.5 | Quatre fiches uniformes, densité améliorée sans ajout de contenu. | Padding/gap/hauteur réduits |
| About | 8.5 | Motivation et attention au code maintenable, sans refaire Skills. | Conserver les deux paragraphes |
| Contact | 9 | Conclusion contrastée, email/numéro et actions concrètes. | Conserver |
| Case Studies | 8.5 | Sujets distincts, profondeur et limites honnêtes ; lecture guidée malgré le volume technique. | Libellé GitHub FR harmonisé |
| Mobile | 8.5 | Colonne ordonnée, téléphone complet et absence de débordement ; longueur assumée des preuves. | Conserver les adaptations 320/375 |
| Dark Mode | 9 | Surfaces et accents distincts, contraste lisible. | Conserver |
| Typography | 9 | Hiérarchie stable, corps technique borné et noms de projets lisibles. | Conserver |
| Colors | 9 | Bleu identitaire avec teintes secondaires discrètes, sans surcoloration. | Conserver |
| Overall Identity | 9 | Portfolio de futur ingénieur logiciel avec projets concrets, BI et IA identifiables. | Valider V3, arrêter les modifications |

## Validation technique après corrections

| Contrôle réellement exécuté | Résultat |
| --- | --- |
| `npm run lint` | Réussi |
| `npm run typecheck` | 116 fichiers ; 0 erreur, warning ou hint |
| `npm test` | 29 tests réussis ; aucun test unitaire ajouté pour ces corrections |
| `npm run build` | 34 pages HTML ; validation des 14 projets et 5 featured réussie |
| `npm run check:links` | Liens internes et ancres valides dans les 34 pages |
| `npm run check:release` | 36 routes / 45 fichiers ; QA, PDF privé, placeholders et secrets exclus |
| `npm run check:seo` | Fixture d’origine configurée : 32 routes FR/EN, canonical/hreflang réciproques valides |
| `npm audit --fetch-retries=0 --fetch-timeout=15000` | 0 vulnérabilité connue au moment de l’exécution |
| `node .qa/v3-final/review.mjs` | 33 captures finales ; 38 scans axe sans violation détectée ; interactions et contrôles responsive réussis |
| `node .qa/v3-final/touch.mjs` | 23 contrôles du catalogue par langue et largeur 320/375 : hauteur minimale 44 px ; quatre formations de hauteur identique dans chaque configuration |

Les 38 scans couvrent l’accueil FR/EN, 375/1920 px, clair/sombre, menus mobiles ouverts, sélection Spring Boot, filtres du catalogue et les cinq études mobiles dans les deux thèmes. Recherche accentuée, compteur, reset, catégorie mobile dans l’URL, quatre liens vidéo et absence d’erreur JavaScript contrôlés. Toutes les ancres locales des cinq études sont activées dans les deux thèmes mobiles ; les titres restent sous le header. Absence de débordement horizontal contrôlée sur accueil, catalogue et MinDrawFX à 320/375/1440/1600/1920 px dans les deux thèmes. Les boutons principaux, langues, thème et contacts du Hero mesurés sont également au moins hauts de 44 px.

Ces contrôles ciblés complètent les 196 rendus et autres contrôles de V3.2 déjà approuvés ; ils ne sont pas présentés comme une nouvelle exécution complète de cette ancienne matrice. Axe sans violation détectée ne constitue pas une certification WCAG ni un test de lecteur d’écran.

## Lighthouse final — quatre configurations

Chrome local, Lighthouse 13.5.0, build statique, mobile simulé et throttling Lighthouse. Une mesure par configuration ; aucun score réel de production ni INP terrain annoncé.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Accueil FR desktop | 100 | 100 | 100 | 66 | 0.46 s | 0.00113 | 0 ms |
| Accueil FR mobile | 98 | 100 | 100 | 66 | 1.81 s | 0 | 0 ms |
| Catalogue FR mobile | 99 | 100 | 100 | 63 | 1.81 s | 0 | 0 ms |
| Rezouette FR mobile | 100 | 100 | 100 | 63 | 1.51 s | 0 | 0 ms |

L’accueil mobile varie de 99 en V3.2 à 98 ici : LCP reste autour de 1.81 s, CLS et TBT restent nuls ; Speed Index est à 2.84 s sur cette mesure. Un point de variation de laboratoire, sans nouveau script ni asset, ne justifie pas une reprise du design. Les diagnostics CSS partagé inutilisé par page et cache du serveur d’audit local restent documentés ; ils ne sont pas masqués par les scores de catégorie.

Les scores SEO 63–66 reflètent notamment la protection volontaire contre l’indexation (`noindex`, robots bloqués). Elle reste activée selon la consigne. Le test avec origine publique est une fixture séparée, pas une activation réelle. Les durées de cache et conditions réseau devront être vérifiées sur le futur hébergement.

## Captures et preuves locales

Les 13 captures obligatoires sont présentes dans [`.qa/v3-final/`](../.qa/v3-final/), avec les variantes Hero et captures complémentaires :

- [Accueil 1920 clair](../.qa/v3-final/home-1920-light.png) · [sombre](../.qa/v3-final/home-1920-dark.png)
- [Accueil 375 clair](../.qa/v3-final/home-375-light.png) · [sombre](../.qa/v3-final/home-375-dark.png)
- [Featured](../.qa/v3-final/featured-desktop.png) · [Education](../.qa/v3-final/education-desktop.png) · [Skills](../.qa/v3-final/skills-desktop.png) · [Experience](../.qa/v3-final/experience-desktop.png)
- [Catalogue desktop](../.qa/v3-final/projects-desktop.png) · [mobile](../.qa/v3-final/projects-mobile.png)
- [Rezouette](../.qa/v3-final/rezouette-case-study.png) · [Enterprise BI](../.qa/v3-final/enterprise-bi-case-study.png) · [Contact](../.qa/v3-final/contact-desktop.png)

Résultats bruts : [contrôles navigateur](../.qa/v3-final/review-checks.json), [dimensions tactiles](../.qa/v3-final/touch-checks.json), [Lighthouse JSON](../.qa/final-audit/v3-final/lighthouse-summary.json). Les quatre rapports Lighthouse HTML sont dans le même dossier. Les captures, helpers et profils Chrome restent ignorés dans `.qa/`, hors build public.

## Décision et suite

**V3 READY FOR PUBLICATION**

Aucune correction indispensable restante, aucun choix esthétique majeur à confirmer. La décision autorise à préparer la phase suivante séparément ; aucune commande git add/commit/push, publication GitHub, opération Netlify ni activation d’indexation effectuée pendant cette revue.

**PROCHAINE ÉTAPE**

Phase 11 — GitHub Publication & Netlify Deployment Preparation.
