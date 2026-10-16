# Validation V2 — 16 octobre 2026

**Historique V2.** Le Header et le haut de l'accueil ont depuis reçu le [checkpoint visuel V3](v3-checkpoint.md). Les mesures ci-dessous restent celles de la V2 et ne décrivent pas le rendu V3.

Dernier état local : [V3.3 — revue visuelle finale](v3-final-visual-review.md), **V3 READY FOR PUBLICATION**. Publication, commit, push et activation de l’indexation toujours différés à une phase séparée.

Build local statique, Chrome 155 et Lighthouse 13.5.0 ; rapports bruts dans `.qa/final-audit/v2/`, captures et matrice navigateur dans `.qa/v2/`. Ces mesures de laboratoire ne décrivent pas un hébergement publié ni un INP réel.

| Configuration | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Accueil FR desktop | 100 | 100 | 100 | 66 | 0,43 s | 0 |
| Accueil FR mobile | 99 | 100 | 100 | 66 | 1,66 s | 0 |
| Accueil EN mobile | 99 | 100 | 100 | 66 | 1,66 s | 0 |
| Catalogue FR mobile | 99 | 100 | 100 | 63 | 1,60 s | 0 |
| Rezouette FR mobile | 100 | 100 | 100 | 63 | 1,21 s | 0 |

Baseline Phase 9 : 100 en performance sur cinq configurations. La variation V2 de 0–1 point reste faible ; aucune régression de CLS. TBT : 0 ms sur les accueils, 7,5 ms catalogue et 1 ms Rezouette. Les scores SEO restent limités par `noindex`, conservé volontairement. Le serveur de mesure ne simule ni compression ni cache CDN : les alertes sur ces points restent à recontrôler après une publication autorisée. Lighthouse signale aussi du CSS inutilisé et la découverte de l'image LCP desktop ; aucun score n'est présenté comme une garantie terrain.

CSS généré : 36 435 octets, 7 283 en gzip théorique. Modules JS externes : 147, 1 536 et 2 492 octets selon la page, hors petits scripts inline. Quatre variantes WebP de 4 506 à 19 530 octets ; aucun chargement de police ou service externe. Le rapport navigateur conserve les tailles effectivement transférées sans compression. Aucun ajout aux dépendances ni au lockfile.

Contrôles : lint ; typecheck 105 fichiers sans diagnostic ; 24 tests ; fixture SEO 32 routes de contenu ; build 34 HTML / 36 routes ; liens/ancres ; garde de sortie ; audit npm connecté réussi, zéro vulnérabilité.

Navigateur : 168 rendus sur 14 pages, six largeurs et deux thèmes ; 56 scans axe plus états interactifs. Clavier, skip link, menu, thèmes, filtres et URL, recherche/reset, technologies/projets, copie email simulée, reduced motion, sans JavaScript, absence de requêtes externes et 404 validés. Les contrôles V2 vérifient également le texte des 14 cartes FR/EN, les cinq visuels, la hiérarchie Bento et les limites des labels SVG.

Sept captures demandées produites, avec variantes longues de l'accueil et vue Bento. Inspection visuelle effectuée sur Hero clair/sombre/mobile, accueil complet, catalogue, Rezouette, Enterprise BI et MinDrawFX mobile. À relire par le propriétaire : wording, densité, portrait, confort tactile, dark mode et parcours au lecteur d'écran. Aucune conformité universelle n'est déduite d'axe.

Le contrôle historique `node scripts/check-homepage.mjs` passe également : 12 combinaisons largeur/thème, chaque technologie disponible et sa relation exacte aux projets, axe sur états normal/sélection/menu, clavier, persistance du thème, copie simulée, sans JS et reduced motion. Rapport et captures complémentaires dans `.qa/homepage/`.

Publication suspendue. Aucun dépôt, commit, push ou déploiement créé. Prochaine étape : review visuelle finale V2 avant Phase 11.
