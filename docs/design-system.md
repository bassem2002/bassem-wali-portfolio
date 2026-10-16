# Design system — V3.2 Modern Product Engineer

## Direction

Portfolio logiciel moderne : fond froid, accent bleu, hiérarchie affirmée, compositions de produit et interactions utiles. La V3.2 remplace la direction éditoriale des premières phases. Aucun framework client, moteur d’animation, tracking ou police distante ajouté.

## Palette

Les tokens sémantiques de `src/styles/tokens.css` suivent désormais la direction V3 sur toutes les pages. Les variables `--v3-*` servent les illustrations et compositions déjà validées ; les variantes de projet apportent seulement de légères touches cyan, indigo, violet ou mint.

| Usage | Clair | Sombre |
|---|---|---|
| Fond | #f8fafc | #070b14 |
| Surface | #ffffff | #111827 |
| Surface secondaire | #edf2fc | #17233b |
| Texte | #0f172a | #f8fafc |
| Texte secondaire | #475569 | #a6b4c8 |
| Accent | #2563eb | #85b4ff |
| Accent hover | #1d4ed8 | #b3d0ff |
| Texte sur accent | #ffffff | #071326 |
| Contrôle | #718096 | #8293ae |

La surface sélectionnée claire est #edf2fc : elle maintient le contraste du texte bleu. Les sélections importantes utilisent aussi une coche, un contour ou un libellé. Les projets atténués conservent un texte contrasté ; seule leur illustration est désaturée. Le bloc Contact utilise une palette locale navy avec texte clair dans les deux thèmes. Le premier Focus inverse volontairement la surface pour créer un contraste éditorial.

## Typographie et largeur

Police sans-serif système ; mono limité aux technologies et repères techniques. Nom en display fluide jusqu’à 7,5rem ; identité étudiante 16–19 px desktop, 15 px mobile. Les lignes Full-Stack et BI/Intelligence artificielle partagent taille, poids et accent ; elles se répartissent naturellement sur mobile.

Corps courant 16–17 px, interligne 1,6–1,75 ; textes secondaires généralement 14–15 px, métadonnées techniques plus petites si nécessaire. Paragraphes longs limités autour de 60–75ch. Les niveaux HTML restent indépendants des tailles visuelles ; ShowcaseCard accepte H2 pour le catalogue et H3 pour l’accueil.

Container maximum 1520 px ; gutters fluides de 24 à 40 px. Largeur consacrée aux visuels, grilles et timeline. Échelle d’espace : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Rayons : contrôles .65rem, cartes autour de 1–1.3rem, grandes compositions 1.5rem.

## Compositions

- Header sticky, navigation active et menu mobile progressif ; liens visibles sans JavaScript.
- Hero : identité, nom, quatre axes, description, CTA, portrait original recadré en CSS, France puis contacts. Pas de retouche du fichier personnel.
- Featured : Bento 7/5 puis 4/5/3, cinq illustrations explicitement distinctes de screenshots, deux preuves et quatre technologies visibles par carte.
- Focus : deux domaines dominants puis deux compositions horizontales, avec technologies et projets vérifiés ; pas quatre cartes carrées identiques.
- Skills : sept groupes courts puis explorateur à sélection immédiate, résultats et reset. Fallback textuel sans JS.
- Experience : année sur environ un quart de largeur, contenu sur le reste, ligne de temps discrète ; aucune grosse carte uniforme.
- Education : quatre occurrences identiques du composant EducationItem, grille 2×2 à partir de 768 px et une colonne en mobile. Aucun traitement secondaire par établissement.
- About : deux courts paragraphes humains, séparés des compétences et du cursus.
- Contact : conclusion navy, email, numéro public approuvé, copie d’email, LinkedIn et GitHub.
- Catalogue : introduction compacte, recherche immédiatement visible avec JS, filtres natifs repliables, état URL, reset et vide. Cinq cartes illustrées, neuf cartes complémentaires compactes ; ordre et liste complète préservés sans JS.
- Études : Hero illustratif propre au projet, navigation locale active/sticky desktop, décisions techniques en callouts et diagrammes dans le corps. Contenu et topologie des diagrammes préservés.

## Actions et médias

Boutons primaires bleus, secondaires neutres, liens tertiaires explicites. Cibles importantes de 44–48 px, outline de focus 3 px. Les quatre vidéos vérifiées restent des liens externes avec Play, nom du projet, nouvel onglet annoncé et noopener noreferrer ; aucun iframe ou chargement Drive au chargement du portfolio.

Les treize diagrammes par langue gardent titre, description, légende et alternative textuelle. Aucun screenshot, score, résultat ML, KPI ou contribution individuelle inventé. Les cinq illustrations produit sont étiquetées comme telles.

## Motion et vérification

Transitions utiles de 180–220 ms : hover, retour de sélection, boutons, navigation/menu. Aucun mouvement permanent, curseur personnalisé ou reveal obligatoire. Reduced motion supprime animations et transitions ; le contenu reste visible sans JS.

`npm run check:v3-2` produit les captures dans `.qa/v3-2/`, contrôle les composants puis reprend l’audit complet à sept largeurs 320–1920, deux thèmes et deux langues. Les unités vérifient les contrastes des tokens ; axe et les parcours clavier complètent les contrôles, sans constituer une certification universelle. Résultats datés dans `docs/v3-2-validation.md`.

La galerie QA FR/EN reste disponible en développement et dans `.qa/qa-build/`, exclue de production, noindex et hors sitemap. `npm run check:design-system` la construit de manière isolée. Production et Phase 11 restent suspendues à la review visuelle du propriétaire.