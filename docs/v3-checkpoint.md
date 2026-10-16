# V3 — checkpoint visuel Header / Hero / Featured

Historique : direction partiellement validée, puis raffinée dans le [checkpoint V3.1](v3-1-checkpoint.md), qui documente la largeur 1520 px, les contacts publics et les démos vidéo.

16 octobre 2026. **En attente de validation visuelle du propriétaire.** Publication, commit et push interdits ; aucune Phase 11 engagée.

## Périmètre livré

Header sticky avec surface neutre translucide, navigation plus lisible, cibles confortables et indicateur de section active via IntersectionObserver. Menu natif avec retour clavier Escape, boutons de langue et thème conservés.

Hero : nom en display, positionnement principal puis accent bleu, proposition courte, CTA principal/secondaire et liens tertiaires. Portrait original recadré uniquement en CSS dans une composition organique, grille discrète et trois surfaces contextuelles. Aucun fichier photo retouché. Le statut étudiant reste explicite ; le CV public absent ne devient pas un CTA.

Featured : composants `ShowcaseCard` et `ShowcaseVisual` dédiés à l'accueil. Cinq compositions distinctes : publication sociale, document/profil/mentorat, analytics, canevas vectoriel, image/caractéristiques CNN. Chacune porte une mention visible « illustration, pas une capture ». Aucun KPI, score de matching ou résultat de classification chiffré inventé. Les diagrammes V2 restent disponibles dans les études et le catalogue.

Grille desktop 7/5 puis 4/5/3, première carte avec contenu réparti, autres cartes adaptées à leur contenu ; grille simplifiée en tablette puis séquence sur mobile. Deux preuves techniques et quatre technologies visibles par carte ; `+N` renvoie au nombre de technologies restantes sans les supprimer des données. Les CTA ouvrent les études existantes.

## Système visuel et IHM

Fond d'accueil froid `#F8FAFC`, texte `#0F172A`, bleu `#2563EB` ; surfaces blanches et touches cyan/violet/mint limitées aux visuels. Mode sombre `#070B14`, surfaces `#111827`, texte `#F8FAFC`, accent `#85B4FF`. Variables V3 isolées des tokens V2. Le Header utilise la nouvelle palette sur toutes les routes ; les autres gabarits conservent leur composition. La largeur du haut de page atteint 1320 px, les sections ultérieures gardent leur maximum précédent de 1216 px.

Rôles typographiques : display pour le nom, positionnement et titres éditoriaux, corps à interligne 1,6, labels secondaires discrets, mono réservé aux rares éléments techniques. Police système conservée sans requête de font.

Hiérarchie : identité → positionnement → action → meilleurs projets. Proximité : contenu et CTA de chaque projet sont regroupés. Divulgation progressive : description courte et deux preuves sur l'accueil, détails dans les études. Affordance : boutons de 44–48 px, focus visible, liens explicites. Feedback : sélection technologique avec bordure/texte, navigation active, hover carte et déplacement minime de ses éléments, flèche CTA, menu animé. Transitions de 180–220 ms ; `prefers-reduced-motion` les supprime. Aucun contenu ne dépend d'une animation pour devenir visible.

## Contrôles

Lint, typecheck, 24 tests et compilation statique passent. Production : 34 HTML / 36 routes ; liens et ancres valides, garde de sortie réussie. Aucun framework, paquet, tracking, font distante ou hydratation supplémentaire.

`npm run check:v3` : huit combinaisons FR/EN × 375/1440 × clair/sombre, douze scans axe (page et menu), skip link, clavier/Escape, visibilité du focus, thème et persistance, section active, relation Spring Boot → SmartAlumni/ShopFlow et feedback des cartes. Largeurs complémentaires 320/768/1024, absence de débordement, limites des labels SVG, absence d'erreur JS et de requête externe, fallback sans JS et reduced motion contrôlés. Les anneaux décoratifs ont été ajustés après détection de débordements à 375 et 768 px. Rapport : `.qa/v3/checkpoint-report.json`. La matrice complète de 168 cas n'est pas relancée à ce checkpoint.

Mesure Lighthouse ciblée de l'accueil FR mobile : performance 98, accessibilité 100, bonnes pratiques 100, SEO 66 avec noindex volontaire ; LCP 1,82 s, CLS 0, TBT 0 ms. Mesure locale sans simulation de compression/cache CDN, pas un résultat de production ni une garantie terrain. Rapports séparés dans `.qa/final-audit/v3-checkpoint/` ; les chiffres V2 restent historiques.

## Captures à valider

- `.qa/v3/home-v3-desktop-light.png`
- `.qa/v3/home-v3-desktop-dark.png`
- `.qa/v3/home-v3-mobile-light.png`
- `.qa/v3/home-v3-mobile-dark.png`
- `.qa/v3/featured-v3-desktop.png`

Les captures illustrent le rendu au repos. Les mouvements se vérifient dans le navigateur, avec et sans préférence de réduction des animations. L'analyse automatique ne remplace pas une vérification au lecteur d'écran et au toucher.

## Arrêt demandé

Skills, Experience, Education, About, Contact, catalogue et études ne reçoivent pas de refonte V3 à ce stade. Les 14 projets, filtres, routes, FR/EN, SEO, tests et CI sont conservés. Décision attendue : validation de cette direction visuelle avant toute extension V3. Aucun autre choix technique bloquant.
