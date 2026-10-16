# V3.2 — modernisation complète et validation

16 octobre 2026. Travail local uniquement. V3.1 validée par le propriétaire ; Phase 11 toujours suspendue. Aucun commit, push, dépôt distant ou déploiement effectué.

## Hero et identité

Le statut étudiant est une ligne d'identité : 15 px en mobile, 16–19 px desktop, poids 650, point bleu et espacement dédié. Bassem Wali reste le display dominant. Les lignes Full-Stack et BI/Intelligence artificielle utilisent exactement la même taille, le même poids et le même accent dans chaque viewport. À 375 px, les axes sont répartis sur plusieurs lignes ; à 1920 px ils profitent de la colonne large. La composition mobile du portrait est légèrement réduite pour compenser les lignes fortes supplémentaires.

Les quatre axes sont explicites dans les deux langues : Software Engineering, Full-Stack Development, Business Intelligence, Artificial Intelligence. France reste la localisation personnelle. Le téléphone fourni, les liens GitHub/LinkedIn et les contacts sous portrait sont conservés. Le texte EN devient « I build full-stack applications and data-driven solutions, from software architecture to artificial intelligence. »

## Sections d'accueil

- Engineering Focus : quatre domaines vérifiés, une composition éditoriale asymétrique ; premier axe contrasté, Full-Stack sur surface claire, BI plus linéaire et IA sur surface secondaire. Descriptions courtes, technologies et liens vers les projets conservés.
- Skills : sept groupes compacts ; explorateur avec contrôles et résultats en colonnes desktop, sélection bleue, coche, état textuel et reset. Les autres projets gardent leur texte contrasté ; leur illustration est désaturée. Flutter rejoint la sélection signature.
- Relations vérifiées : Spring Boot → SmartAlumni/ShopFlow ; TensorFlow → Waste ; PyTorch → Seq2Seq ; SSAS → Enterprise BI ; JavaFX → MinDrawFX/Java Network ; Laravel → JobConnect/EventPlanner ; Flutter → Smart Trade Manager. Angular reste aussi disponible.
- Experience : timeline 2026, 2025, 2024, année sur environ un quart et contenu sur le reste ; organisation, rôle, projet, résumé et stack conservés. Aucun détail de contribution inventé.
- Education : les quatre établissements utilisent le même composant et les mêmes padding, bordure, rayon, titre, dates et localisation. Grille 2×2 desktop, une colonne mobile, hauteur uniforme par grille ; aucune formation réduite à une ligne. Dates et lieux historiques Rouen/Sfax conservés.
- About : deux paragraphes courts sur la compréhension du code, des données et la recherche d'un stage ; aucune nouvelle expérience ou qualification.
- Contact : conclusion navy à contraste dédié avec email, numéro public, copie d'email, LinkedIn et GitHub. Titre FR « Un projet, un stage ou une opportunité à discuter ? » et équivalent EN.

## Catalogue et études

Catalogue compact : titre, introduction courte, recherche visible immédiatement avec JavaScript puis filtres repliables et compteur. Le champ reste masqué sans JS pour éviter un contrôle inactif ; les 14 projets sont présents. Cinq ShowcaseCard illustrées, neuf ProjectCard complémentaires compactes. Ordre, recherche, filtres combinés, état d'URL partageable, historique, reset et état vide restent conservés.

Les cinq études utilisent une illustration de produit propre au projet dans un Hero large. Les diagrammes factuels restent dans le corps : leur topologie, texte et alternatives ne changent pas. Navigation locale active et sticky desktop, callouts techniques, surfaces et grille de fonctionnalités modernisés. Paragraphes longs limités autour de 60–75ch ; diagrammes et listes structurées utilisent davantage la largeur. Les neuf fiches complémentaires héritent de la palette et du système de lecture.

Les quatre vidéos vérifiées restent visibles tôt : Rezouette, SmartAlumni IIT, SchoolManagementMERN, EventPlanner. Lien externe Play, nom de projet accessible, nouvel onglet annoncé, `noopener noreferrer`, aucun iframe. Aucun nouveau contenu technique, résultat, métrique ou statut de production inventé.

## Fondations et interaction

Tokens sémantiques globaux alignés sur V3 : fond froid #f8fafc, texte navy, accent #2563eb ; dark #070b14 et surfaces #111827. La surface sélectionnée claire est ajustée à #edf2fc après détection d'un contraste insuffisant du bleu sur la teinte initiale. Tests des tokens corrigés en conservant le seuil AA.

Largeur maximale 1520 px, gutters fluides, textes de lecture limités. Police système sans téléchargement, pas de nouveau framework ou package. Focus visible, contrôles natifs et cibles confortables. Hover, sélection, menu, copie et navigation ont un feedback ; aucun mouvement permanent. Reduced motion et fallback sans JS conservés. Voir [design-system.md](design-system.md).

## Vérifications

Commandes : lint, typecheck, tests, build, liens, fixture SEO, garde de sortie et `npm run check:v3-2`.

- 29 tests unitaires : données, 14 projets, cinq études, FR/EN, filtres, relations, SEO, contrastes, téléphone et vidéos ; deux contrôles V3.2 supplémentaires couvrent les quatre domaines/relations signature et les dates/localisations des quatre formations.
- Typecheck : 116 fichiers, zéro erreur, avertissement ou hint.
- Production : 34 HTML / 36 routes ; aucun document privé, PDF non approuvé ou route QA dans le build.
- Composants : huit cas FR/EN × 375/1920 × clair/sombre vérifient tailles/couleurs des axes, statut étudiant, cartes Formation égales, lieux historiques, clavier des sept technologies et état sélectionné sous axe. Les CTA et routes sont contrôlés sur les 28 fiches FR/EN.
- Responsive : 14 pages principales × sept largeurs (320, 375, 430, 768, 1024, 1440, 1920) × deux thèmes, soit 196 rendus. Contrôles de débordement, hiérarchie des titres, images et labels SVG. 56 analyses axe à 375/1440, plus huit états technologiques et états menu/filtres.
- Parcours : skip link, menu clavier/Escape, thème, recherche/filtrage/reset/URL, copie d'email simulée, ancre architecture, reduced motion, sans JS, absence de requête externe au chargement, impression lisible et 404 FR/EN.

Artefacts : `.qa/v3-2/component-report.json` et `.qa/v3-2/browser.json`. Les anciens scripts de galerie ont été adaptés aux cartes Showcase et aux vidéos vérifiées sans retirer les assertions de routes, ordre, filtres ou médias non approuvés. La CI reste inchangée et n'est pas revendiquée comme exécutée à distance.

Résultat final : toutes les commandes et assertions ci-dessus passent. Aucun débordement ni erreur JS sur les 196 rendus ; zéro violation automatique détectée dans les 56 scans de pages et huit états technologiques, ainsi que les états menu/filtres. Les captures ont été inspectées en clair/sombre et en mobile, avec correction de la densité du catalogue et du placement des résultats de l'explorateur.

Poids statique : CSS 74 566 octets, 13 561 en gzip théorique ; modules JS externes 147 + 2 543 + 1 536 octets selon la page, hors petits scripts inline. Rapport local `asset-sizes.json`. Le CSS augmente avec la modernisation complète ; pas de nouvelle dépendance, police distante ou hydratation. Les mesures Lighthouse permettent d'évaluer l'effet réel dans ce contexte local, sans présenter le gzip théorique comme un transfert constaté.

## Performance mesurée

Lighthouse 13.5.0 / Chrome 155, rapports séparés dans `.qa/final-audit/v3-2/`. Mesures locales avec émulation/throttling de Lighthouse ; le viewport QA 1920 est testé séparément de son profil desktop standard.

| Configuration | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Accueil FR desktop | 100 | 100 | 100 | 66 | 0,43 s | 0,001 | 0 ms |
| Accueil FR mobile | 99 | 100 | 100 | 66 | 1,81 s | 0 | 0 ms |
| Accueil EN mobile | 99 | 100 | 100 | 66 | 1,81 s | 0 | 0 ms |
| Catalogue FR mobile | 99 | 100 | 100 | 63 | 1,81 s | 0 | 0 ms |
| Rezouette FR mobile | 100 | 100 | 100 | 63 | 1,51 s | 0 | 0 ms |

Performance proche de la baseline V2 (100) et V3 (98 mobile), sans grosse régression. La variation de 0–1 point face à V2 et le faible décalage desktop sont conservés tels que mesurés, sans chercher artificiellement le 100. Ces résultats ne prédisent pas un INP terrain et ne sont pas une garantie de production.

Les scores SEO 63/66 reflètent le noindex volontaire, conservé avant publication. Le serveur local ne simule ni compression ni cache CDN. Lighthouse relève du CSS inutilisé selon les pages, des requêtes CSS bloquant le rendu et la découverte de l'image LCP desktop ; leur coût reste compatible avec les scores mesurés. Aucun chargement tiers ou nouvelle bibliothèque. Une optimisation supplémentaire des feuilles mutualisées pourra être évaluée séparément si nécessaire.

## Captures

Douze captures minimales dans `.qa/v3-2/` :

- `home-full-desktop-light.png`
- `home-full-desktop-dark.png`
- `home-mobile-light.png`
- `education-desktop.png`
- `education-mobile.png`
- `skills-interaction.png`
- `experience-desktop.png`
- `projects-desktop.png`
- `projects-mobile.png`
- `rezouette-case-study.png`
- `smartalumni-case-study.png`
- `contact-desktop.png`

Les captures de sections isolées omettent le Header sticky pour éviter son recouvrement lors du scroll automatique de Playwright ; les captures de pages complètes conservent le Header réel. Les captures ne sont pas publiées dans dist. Relecture humaine demandée : équilibre du Hero, BI/IA, densité Formation, UX Skills, timeline, cartes, lecture des études, Contact, mobile et dark mode.

Les contrôles automatiques ne remplacent pas les essais tactiles/lecteur d'écran ; les mesures de performance restent des mesures locales de laboratoire. Aucune décision bloquante. Prochaine étape : **Final V3 visual review before Phase 11.**
