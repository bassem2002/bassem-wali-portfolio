# Rapport de développement

## Phase 1

## TERMINÉ

- Initialisation manuelle propre d’Astro dans le dossier existant, sans écraser le CV ni la photo.
- Dépendances et lockfile, configuration statique et Netlify sans déploiement.
- Types stricts, données locales des 14 projets, cinq featured, formation, expériences et registre de technologies.
- Routes FR/EN, layouts partagés, détails structurels et brouillons Markdown non publiés.
- Stratégie thèmes système/explicite, SEO centralisé sans domaine inventé et protection contre indexation des pages de travail.
- Composants de CV conditionnel et portrait WebP prêts.
- Tests de données/routage et contrôleur de liens ; scripts réels documentés.

Contrôles exécutés : lint réussi ; Astro check sans erreur, warning ou hint ; trois tests réussis ; build de 33 pages HTML ; liens internes et ancres valides. Audit npm : zéro vulnérabilité connue. Vérification du HTML généré : langues correctes, noindex présent, aucun canonical inventé, brouillons exclus et aucun PDF distribué. Aucun test navigateur, audit WCAG complet ou Lighthouse effectué dans cette phase.

## À VÉRIFIER

- Responsive complet, navigation clavier dans le design final, contrastes finaux et audit automatisé d’accessibilité : phases ultérieures.
- L’origine publique réelle et l’indexation : avant publication.
- Exhaustivité GitHub hors index de recherche : les 14 projets retrouvés constituent la base actuelle.
- Installer Node 24.16+ (ou autre version du champ engines) pour respecter les exigences du linter. Node système actuel : 24.14.1 ; aucune modification système effectuée.

## À CONFIRMER

- **CV public sans téléphone absent** : téléchargement inactif, fichier privé préservé et non distribué.
- Périmètres individuels des projets d’équipe : champs de contributions détaillées laissés vides.
- Droits des captures/vidéos professionnelles : aucun média de projet intégré.
- Licence de redistribution du code avant publication du dépôt.

## PROCHAINE ÉTAPE

Phase 2 : design system Engineering Editorial, après validation de cette architecture.

## Phase 2 — Design system

### TERMINÉ

Tokens couleurs clair/sombre, typographie, espacement, motion et grilles mobile-first. Composants Button, TextLink, ExternalLink, Badge, TechTag, SectionHeading, ProjectCard, SkillGroup, ExperienceItem, EducationItem, EngineeringFocus, Hero et LanguageSwitcher ; ThemeToggle et navigation restylés. Variantes screenshot approuvé et sans screenshot préparées. Quatre technologies maximum sur les cartes ; projets phares et états de relation explicites. Galerie FR/EN `/design-system/`, noindex et exclue du sitemap. Documentation dans `docs/design-system.md`.

Contrôles : lint et TypeScript réussis ; cinq tests réussis (dont contrastes et cohérence du thème sombre), build de 35 pages HTML et contrôle des liens. Browser QA : huit combinaisons largeur/thème sans débordement ni violation axe ; clavier d’entrée, taille de contrôles, thème persistant, fallback sans JS et mouvement réduit vérifiés. Captures locales dans `.qa/design-system/`. Aucun déploiement et aucun média de projet importé.

### À VÉRIFIER

Validation visuelle humaine du Hero, du portrait secondaire, des cartes et du rythme éditorial. Lecteur d’écran, zoom et contenus finaux avant revendication d’une conformité globale. Variante screenshot à vérifier lorsqu’un asset sera approuvé. Node 24.14.1 actuel reste inférieur aux exigences supportées du linter, même si les contrôles ont passé.

### À CONFIRMER

Acceptation de la composition du Hero, de la palette clair/sombre et des cartes avant application aux pages finales.

### PROCHAINE ÉTAPE

Phase 3 — Data Model + contenu FR, après validation visuelle. Arrêt avant cette phase.

## Phase 3 — Data Model + contenu FR

### TERMINÉ

- Profil FR finalisé : Hero, ligne académique, trois paragraphes À propos, recherche de stage et contact. Langues sans niveau ; aucun téléphone.
- 14 projets structurés, cinq Featured Projects conservés. Résumés, problèmes, fonctionnalités, architectures, tests identifiés et limitations françaises ; titres courts utiles et IDs stables. Slugs existants préservés.
- 12 catégories de projets ; registre de 111 technologies/concepts dans 13 catégories de compétences. Les liens inverses `Skill.projectIds` sont calculés depuis les preuves des projets. Cinq entrées CV seules restent sans lien public artificiel.
- Expériences et formation consolidées. Références Systeo 2026/Rezouette et Systeo 2025/School Management MERN réciproques. Clinisys conservé avec sa stack CV complète, sans dépôt public.
- Cinq préparations Markdown FR en brouillon ; aucun rendu d’étude de cas finale. Contenus EN existants conservés, sans traduction complète nouvelle.
- 14 URLs revalidées via métadonnées GitHub publiques. Inventaire de contrôle local, validator exécuté avant build et tableau généré `docs/content-audit.md`.
- Vue de travail FR `/data-preview/`, non indexable et hors sitemap. Aucun changement des styles du design system, aucun screenshot ou média de projet ajouté, aucune démo, aucun déploiement.

Contrôles réussis : validation des données, lint, TypeScript sans erreur/warning/hint, sept tests et build de 36 pages HTML. Les tests vérifient aussi le rejet de données corrompues. Liens internes et ancres valides ; contrôle du build sans PDF distribué, sans brouillon d’étude publié et avec encodage des textes visible intact. Les captures et audits navigateur de Phase 2 n’ont pas été régénérés pour cette phase de contenu.

### À VÉRIFIER

Relecture humaine du Hero, de l’À propos, des résumés et des problèmes formulés. Contributions individuelles détaillées toujours non isolées : tableaux vides. Les médias professionnels restent non validés et non intégrés. Avant publication, fournir le CV public sans téléphone. Le changement mineur de Node documenté en Phase 2 reste recommandé pour l’environnement supporté.

### À CONFIRMER

Aucune décision technique nouvelle indispensable. La validation éditoriale du contenu FR permettra de passer à la homepage ; des précisions de contributions peuvent être ajoutées ultérieurement avec preuve.

### PROCHAINE ÉTAPE

Phase 4 — Homepage, après validation. Arrêt avant sa réalisation.

## Phase 4 — Homepage FR

### TERMINÉ

Homepage française dans l’ordre validé : navigation, Hero, cinq projets phares, quatre axes d’ingénierie, compétences, trois expériences, quatre formations, À propos, contact et footer. Textes et sélections dans `src/data/home.ts`. Sept groupes de compétences, cinq entrées maximum par groupe.

Rezouette ouvre la grille avec une carte large desktop, puis quatre cartes en deux colonnes/une sur mobile. Quatre à six technologies par carte, choisies parmi la stack vérifiée. GitHub et détails accessibles ; aucun CTA d’étude de cas sur un brouillon. Portrait secondaire 96 px mobile/160 px desktop. Full-Stack sans coupure. CV public absent : bouton désactivé, sans lien cassé. Header non sticky et compact.

Menu progressif avec aria-expanded, fermeture par lien/clic extérieur/Escape et retour du focus au bouton avec Escape, sans piège de focus. Sans JS : navigation visible. Technologies ↔ Projets : sept choix, relations calculées depuis les données, liens filtrés, aria-pressed, coche et annonce de résultat, cartes phares avec message de correspondance. Reset ou deuxième clic annule la sélection. Sans JS : liste statique. Les projets complémentaires sont des liens, sans deuxième grille complète.

Contact mailto/GitHub/LinkedIn et copie d’email accessible ; aucun formulaire/backend. Année du footer générée en Europe/Paris. Métadonnées FR et Person avec statut étudiant, canonical conditionnel à la véritable origine publique. Routes QA hors navigation/sitemap. Version anglaise complète, All Projects et études de cas non finalisés. Aucun déploiement, analytics, téléphone ou média professionnel ajouté.

### Vérifications

Lint, TypeScript, huit tests de données/contrastes et build statique réussis. Liens internes et ancres sur 36 pages HTML validés. Chrome sur 320, 375, 430, 768, 1024 et 1440 px, clair/sombre : aucun débordement ; axe WCAG A/AA contrôlé en état initial, sélection active et menu ouvert, sans violation détectée.

Clavier : lien d’évitement, menu, Escape, focus visible, sélection par Space. Thème persistant au rechargement, lien de langue, matching pour chaque technologie, reset et désélection vérifiés. PyTorch reste relié uniquement à Seq2Seq. Sans JS : navigation et preuves disponibles. Mouvement réduit : transitions désactivées. Copie testée avec API Clipboard simulée afin de préserver le presse-papiers de la machine.

```sh
npm run check:design-system -- --homepage
```

Le script existant ferme son serveur loopback et son navigateur. Captures dans `.qa/homepage/` : desktop/mobile clair/sombre, versions complètes, projets ; formation, À propos, contact et footer desktop. Artefacts ignorés par Git et hors public. Inspection visuelle effectuée sur Hero desktop/mobile clair, projets desktop sombre, formation claire, contact sombre et footer clair. Aucun score Lighthouse ni conformité WCAG globale revendiqué.

### À VÉRIFIER

Validation visuelle du Hero, de la carte principale et de la synthèse des compétences ; menu sur appareil tactile réel. Éventuelle relecture du message de contact. CV public et contributions détaillées restent dans leur état documenté, sans attribution inventée.

### À CONFIRMER

Aucune nouvelle décision technique bloquante.

### PROCHAINE ÉTAPE

Phase 5 — All Projects page. Arrêt avant sa finalisation.

## Phase 5 — All Projects page

### Réalisation

La page française `/projects/` présente les 14 projets validés, dans l’ordre éditorial des données : cinq projets phares puis neuf complémentaires. Cartes textuelles avec résumés Phase 3, catégories, quatre technologies au maximum (trois pour Java Network Suite, dont la stack vérifiée en contient trois), GitHub et détails. Les études de cas restent conditionnelles à leur publication ; les brouillons actuels ne produisent aucun CTA d’étude de cas. La homepage conserve ses cinq cartes.

Domaines et relations générés depuis les catégories et stacks réelles. Huit raccourcis technologiques et un select pour la stack complète. Recherche native dans titre, résumé, domaines et noms des technologies, insensible à la casse et aux accents, avec combinaison des mots. Les trois critères se combinent par intersection. Compteur annoncé poliment, état vide et reset. Coches et `aria-pressed` distinguent les choix sans dépendre uniquement de la couleur.

État partagé par `?category=…&technology=…&q=…`, restauration au chargement et avec précédent/suivant. Les paramètres invalides sont écartés. La saisie remplace l’entrée courante d’historique ; les choix créent une entrée. Sans JavaScript, les 14 cartes et leurs liens sont disponibles, les contrôles inactifs sont masqués. Les filtres sont repliés au départ via un élément `details` natif pour laisser les premières cartes visibles ; une URL filtrée les ouvre pour exposer les critères actifs.

La page reprend les tokens, composants et métadonnées existants : langue française, titre, description, Open Graph et canonical conditionnel à l’origine publique configurée. Aucun nouveau média, dépendance, déploiement ou contenu de projet ajouté.

### Vérifications

Lint, TypeScript (zéro erreur, avertissement ou indication), 12 tests et build statique réussis. Liens et ancres validés dans les 36 pages HTML générées. Les tests figent notamment les sept relations technologiques demandées et vérifient tous les domaines depuis les données.

Commande de QA dédiée dans le script existant : `npm run check:design-system -- --projects`. Les captures restent dans `.qa/projects/`, hors publication. Le contrôle couvre les six largeurs demandées en clair et sombre, les domaines, les technologies, la recherche, les intersections sans résultat, le reset, les URL, l’historique, le clavier, les liens, la homepage et le fallback sans JavaScript.

Chrome : 320, 375, 430, 768, 1024 et 1440 px en clair/sombre, sans débordement ni erreur JavaScript ; axe A/AA sans violation détectée dans les états contrôlés. Les captures desktop/mobile clair/sombre et Machine Learning sont produites localement. Inspection visuelle des cartes, des filtres mobiles et des thèmes effectuée ; aucun score Lighthouse ni conformité WCAG globale revendiqué. Le script ferme son serveur et son navigateur.

### À VÉRIFIER

Densité des cartes, ordre éditorial, filtres sur appareil mobile réel et formulation de l’introduction.

### À CONFIRMER

Aucune décision bloquante.

### PROCHAINE ÉTAPE

Phase 6 — Case Studies. Arrêt avant cette phase.

## Phase 6 — Case Studies FR

### Réalisation

Cinq études intégrées aux routes demandées : Rezouette, SmartAlumni IIT, Enterprise BI Dashboard, MinDrawFX et Waste Classification. Les slugs de SmartAlumni et MinDrawFX sont désormais `smartalumni-iit` et `mindrawfx` ; les IDs de données restent stables. Routes, listes, liens de langue et métadonnées suivent les slugs. Aucun alias supplémentaire, aucune étude pour les neuf autres projets, aucune traduction EN complète.

Chaque page propose fil d’Ariane, Hero court, stack principale, lien GitHub, navigation par ancres, aperçu/problème, fonctionnalités Phase 3, architecture, stack complète, trois décisions avec bénéfices et compromis, vérification et limites, compétences, projets liés et CTA final vers le code. Les contributions personnelles détaillées restent omises. Les liens d’études de cas sont activés dans les cinq cartes de la homepage et du catalogue ; le brouillon anglais demeure masqué.

Treize diagrammes SVG natifs couvrent les flux vérifiés : trois Rezouette, trois SmartAlumni, deux BI, deux MinDrawFX et trois Waste. Chacun comprend titre, description accessible, légende et liste textuelle dans un `details` natif. Aucun média externe, screenshot applicatif ou extrait de données n’est repris. Aucune bibliothèque de diagrammes ni dépendance UI ajoutée.

La collection exige les champs nécessaires aux études publiées et vérifie technologies/compétences et unicité des IDs des diagrammes. Les projets liés sont classés selon technologies et catégories partagées, avec conservation de l’ordre éditorial en cas d’égalité. Les technologies démontrées renvoient au filtre du catalogue ; les concepts restent des libellés vérifiés.

### Revue des affirmations

Les cinq dépôts publics ont été relus à des commits identifiés ; les références précises figurent dans `docs/case-study-audit.md`. Les sources téléchargées pour revue restent dans `.qa/source-audit/` (hors publication et hors lint du portfolio). Les motivations non documentées sont décrites comme bénéfices techniques généraux, sans attribution personnelle.

Rezouette : couches inspirées de Clean Architecture, OAuth externe distinct de l’authentification applicative, analytics locaux et niveaux de validation des fournisseurs explicités. SmartAlumni : Tika/DeepSeek/fallback distincts du matching pondéré. BI : consommation d’un cube existant, sans attribution de warehouse/ETL complet. MinDrawFX : rôles des patterns reliés aux classes ; Observer actualise historique/statut/journalisation. Waste : ResNet50 ImageNet, poids externes, fusion et blocs inspirés de DenseNet ; aucune métrique historique présentée comme reproduite.

Les suites des dépôts sources, les APIs sociales réelles, le cube SSAS, l’interface JavaFX et l’entraînement du notebook n’ont pas été exécutés. Les pages indiquent ces limites de vérification. Aucun résultat de test source, chiffre de couverture ou performance n’est annoncé.

### Vérifications

Lint, TypeScript, 16 tests, validation de contenu, build statique et contrôle des liens internes. Les quatre nouveaux tests couvrent les cinq publications FR/routes, métadonnées et sections, relations vérifiées et distinctions éditoriales sensibles. Les métadonnées propres à chaque étude et le schéma SoftwareSourceCode réutilisent le SEO existant ; canonical conditionnel à la véritable origine publique. Aucun auteur individuel, date, licence ou version supposé.

Commande : `npm run check:design-system -- --case-studies`. Chrome : cinq pages × quatre largeurs (375, 768, 1024, 1440) × clair/sombre = 40 combinaisons ; contrôle d’overflow, axe A/AA, hiérarchie, navigation, focus, fallback des diagrammes et métadonnées. Scénarios sans JS, CTA des cinq cartes, maintien des cinq cartes de homepage et brouillon EN masqué également contrôlés. Le lien d’évitement conserve le focus clavier et son masquage hors focus est renforcé pour les captures de sections longues.

Captures et rapport dans `.qa/case-studies/`, hors publication : cinq pages en desktop/mobile clair/sombre, vues de Hero et d’architecture. Les cinq captures demandées sont incluses. Inspection visuelle des diagrammes, de la lecture mobile et des deux thèmes ; aucun score Lighthouse ni conformité WCAG globale revendiqué. Le script ferme serveur et navigateur.

### À VÉRIFIER

Formulations techniques, diagrammes, périmètre des contributions personnelles et longueur de certaines sections, notamment les patterns de MinDrawFX. Le détail des points de relecture est dans `docs/case-study-audit.md`.

### À CONFIRMER

Aucun élément bloquant ; les contributions non confirmées restent omises.

### PROCHAINE ÉTAPE

Phase 8 — English Version recommandée : les relations Technologies ↔ Projets de la homepage, les filtres combinés du catalogue et les URL partageables couvrent déjà le besoin principal de la Phase 7. Un éventuel raffinement ultérieur pourra partir de retours d’usage. Arrêt avant la phase suivante.

## Phase 8 — English Version

La Phase 7 séparée est écartée selon la décision validée. La version anglaise complète est intégrée sous `/en/`, avec les mêmes composants que le français : homepage et ses dix parties, catalogue de 14 projets avec filtres/recherche/URL, cinq études de cas et 13 diagrammes, navigation, footer, CTA, messages et libellés accessibles. Les anciennes pages EN provisoires ont été remplacées. La composition spécifique française a été réunie dans `HomePage.astro`, pilotée par la locale.

### Contenu et parité

Rédaction anglaise naturelle, mêmes faits et limites. Noms officiels des institutions, projets et technologies conservés. Statut Computer Engineering Student, spécialisation Software Engineering & Business Intelligence, recherche de stage, trois expériences et quatre formations alignés. Aucun niveau CEFR, nouvelle contribution, métrique, responsabilité, résultat ou technologie ajouté. CV public toujours absent ; PDF original et médias inchangés.

Les 14 textes projets EN ont une source éditoriale dédiée. Les anciens résumés de départ ont été retirés des seeds. Identités, catégories, stacks, repos et relations restent communs. Les types éditoriaux exigent FR et EN ; le validator compare les nombres de fonctionnalités/limites et vérifie les textes du profil, des expériences et de la formation dans les deux langues.

Les cinq études EN conservent toutes les réserves : intégrations réelles distinctes des mocks, analytics locaux, matching pondéré distinct de l’analyse assistée, consommation d’un cube existant, rôles précis des patterns et notebook non réexécuté. Les mêmes SVG servent les deux langues à partir de textes localisés ; IDs et structure des 13 diagrammes restent alignés. `validateStudyParity()` bloque au build une langue publiée manquante, des sections importantes ou une structure divergente. Ce contrôle est structurel ; il ne remplace pas une relecture sémantique humaine.

### Navigation et SEO

Switch contextuel sur homepage, catalogue et projets, avec langue active affichée et `aria-current`. Conservation des filtres `category`, `technology`, `q` et des ancres partagées ; abandon des ancres de titres Markdown propres à une langue. Liens internes maintenus dans la locale courante. Recherche, compteurs singulier/pluriel, reset, état vide, menu, thème, copie d’email et leurs annonces sont localisés.

HTML lang, métadonnées, schémas et Open Graph suivent la locale. Canonical et hreflang FR/EN/x-default restent conditionnels à la véritable origine publique, sans domaine inventé dans le build normal. Une fixture isolée avec origine réservée teste les tags réellement générés et l’existence des 32 cibles publiques. QA/404 restent noindex, sans canonical/hreflang. 404 EN ajoutée et fallback Netlify préparé, sans déploiement.

### Vérifications

Lint réussi, TypeScript sans erreur/avertissement/indication, 21 tests réussis, validation de contenu et build statique réussis. Liens/ancres vérifiés sur 37 pages HTML. Le nombre passe de 36 à 37 car les routes EN principales existaient déjà comme pages provisoires : 32 pages publiques de contenu + trois QA + deux 404. Avec robots.txt et sitemap.xml : 39 routes de sortie.

QA Chrome : `npm run check:design-system -- --i18n`. Sept pages EN × 375/768/1024/1440 px × clair/sombre = 56 combinaisons, sans débordement ni erreur JS, axe A/AA sans violation détectée dans les états contrôlés. Quatorze vérifications FR à 320/375 px, switches contextuels demandés, conservation des filtres, recherche, tous les domaines, technologies/projets, menu, thème persistant, copie d’email réussie/indisponible et fallback sans JS contrôlés. Presse-papiers simulé pour préserver celui de la machine.

`node scripts/check-i18n-seo.mjs` construit une fixture séparée dans `.qa/seo-build/`, sans modifier l’origine du processus parent ni le build normal `dist/`. Contrôle du canonical, des alternates réciproques FR/EN/x-default, des cibles existantes et des exclusions QA/404 réussi. Le build normal a été régénéré sans origine de test.

Captures demandées et vues supplémentaires locales dans `.qa/i18n/`. Inspection visuelle du Hero EN desktop/mobile, catalogue, études et diagrammes en clair/sombre. Captures stabilisées hors transitions de thème. Aucun média QA publié, aucun score Lighthouse ni conformité WCAG globale revendiqué. Les scripts ferment leurs serveurs et navigateurs. Détails de maintenance dans `docs/i18n.md` ; README et audit des études actualisés.

### À VÉRIFIER

Relecture humaine de l’anglais, titres longs, formulations sensibles autour d’OAuth, du matching pondéré, du périmètre BI et de la reproductibilité ML.

### À CONFIRMER

Aucune décision bloquante.

### PROCHAINE ÉTAPE

Phase 9 — SEO + Accessibility + Performance Final Audit. Arrêt avant cette phase.

## Phase 9 — Final SEO, Accessibility & Performance Audit

Baseline enregistrée avant correction, puis audit ciblé SEO, accessibilité, responsive, performance, confidentialité, dépendances et liens. Rapport complet : `docs/final-audit.md`. Artefacts locaux exclus de la publication dans `.qa/final-audit/` : inventaires, rapports Lighthouse HTML/JSON avant/après et matrice navigateur.

Titres SEO de l'accueil et des cinq études FR/EN raccourcis ; switch de langue corrigé pour inclure le code visible dans le nom accessible ; lien de marque utilisant son texte visible avec espace explicite. Réservation de la place du menu, du thème et des filtres avant les modules pour supprimer les décalages initiaux, avec navigation sans JS conservée. Suppression du placeholder vide CV publié accidentellement. Politique robots/sitemap commune et test du cas indexable ajoutés. Aucun fait, contribution, CV, média de projet ou design global modifié.

Indexation toujours désactivée volontairement et aucune origine inventée dans le build normal. La fixture SEO valide les 32 canonical et alternates FR/EN/x-default avec cibles existantes, sans inclure QA/404. Le test de crawl vérifie séparément l'activation future de robots/sitemap. Aucun déploiement effectué.

Cinq configurations Lighthouse 13.5.0 / Chrome 155 mesurées sur build statique local, profils mobile et desktop simulés. Performance : accueil FR desktop 100→100, FR mobile 96→100, EN mobile 96→100, catalogue FR mobile 93→100, Rezouette FR mobile 97→100. Accessibilité et Best Practices : 100 ; SEO : 66 sur accueils, 63 sur catalogue/étude, dû au noindex conservé. CLS final nul ; LCP mobile de 1,06 à 1,43 s. INP terrain non mesuré. Pas de compression/cache CDN simulés ni de conformité WCAG globale revendiquée.

Matrice finale : 14 pages × six largeurs de 320 à 1440 px × clair/sombre = 168 rendus ; 56 scans axe A/AA avec règle label-content-name-mismatch explicitement activée, plus menu/filtres ouverts. Clavier FR/EN, focus, reduced-motion, diagrammes, mode sans JS, impression, réseau et 404 contrôlés. Les scores seuls ne détectaient pas tous les problèmes de nom accessible ; cette règle supplémentaire a permis leur correction.

Lint réussi, typecheck 96 fichiers sans erreur/avertissement/hint, 22 tests, build et liens sur 37 HTML réussis. 32 pages publiques de contenu, trois QA et deux 404 ; 39 routes avec robots/sitemap. CSS 18 728 octets (estimation gzip 4 124), modules JS externes 4 175 (gzip 1 728), scripts exécutables inline de l'accueil environ 3,1 ko supplémentaires. Deux WebP totalisant 9 482 octets ; aucune police externe ni hydratation framework. Réseau mobile de l'accueil environ 63 ko non compressés, six requêtes.

Scan du build sans secret, chemin local, PDF ou source map détecté ; les occurrences token de Rezouette sont de la prose OAuth. Npm audit : zéro vulnérabilité. Aucun ajout aux dépendances du projet. Node local 24.14.1 exécute les contrôles ; retenir 24.16+ pour la CI conformément aux engines. Quatorze dépôts GitHub publics vérifiés et profil GitHub 200 ; LinkedIn retourne 999 à l'automatisation. En-têtes de sécurité configurés, comportement HTTP réel à vérifier après publication.

### À VÉRIFIER

Confort visuel/tactile, lecteur d'écran et zoom par un humain ; relecture EN et ouverture personnelle du profil LinkedIn. Les mesures de laboratoire ne remplacent pas l'expérience réelle.

### À CONFIRMER

Aucune décision bloquante.

### PROCHAINE ÉTAPE

Phase 10 — Final Testing, CI & Repository Cleanup. Arrêt avant cette phase.

## Phase 10 — Final Testing, CI & Repository Cleanup

Baseline conforme à la Phase 9 : lint, typecheck 96 fichiers, 22 tests, build 37 HTML / 39 routes, liens valides et npm audit zéro vulnérabilité. Aucune opération Git, publication ou modification globale de Node.

.nvmrc et Netlify épinglés à Node 24.16.0 ; engines conserve la plage réellement exigée par eslint-plugin-astro et son parseur. Validation supplémentaire avec Node 24.16.0 téléchargé uniquement dans le cache npm local. Les neuf dépendances directes restent justifiées ; aucun ajout, suppression ou upgrade. Lockfile conservé et cohérent, installation par npm ci.

Les trois pages QA sont déplacées dans src/qa/ et injectées par une petite intégration Astro native en développement ou via le flag de QA. Production : 34 HTML / 36 routes (32 contenu + deux 404 + robots/sitemap), 43 fichiers ; aucun PDF/source map/QA/doc interne. build:qa conserve 37 HTML dans .qa/qa-build/ et check:design-system prépare ce build automatiquement. Correction du test de cibles pour ignorer les contrôles sans boîte rendue ; huit cas responsive/thème, axe, clavier, sans JS et reduced-motion réussis. Les compteurs i18n suivent désormais la liste des projets.

Ajout de check:release (routes, exclusions, motifs de confidentialité et placeholders) et alias check:seo sur le validateur existant. report:data affiche les statuts d'études FR et EN ; le bouton anglais indisponible indique « Public CV pending ». Aucun fait, projet, contribution, média ou choix de design changé.

.gitignore étendu pour fichiers IDE/OS, coverage, temporaires, backups et fichiers d'identifiants. QA, caches, originaux privés et dist restent ignorés, sans suppression des preuves locales. tsconfig exclut .qa pour ne pas analyser les copies/fixtures. Aucun composant/helper clairement mort identifié et aucune suppression substantielle.

README réécrit pour le handoff : installation, scripts, architecture, contenu, i18n, tests, limites d'accessibilité/performance, sécurité, CV absent, absence de licence et procédure Netlify/indexation. Guides d'architecture/design/i18n actualisés. Neuf documents classés dans docs/release-readiness.md ; development-report reste INTERNAL BUT USEFUL, les autres KEEP. Aucun REMOVE justifié. L'audit Phase 9 conserve ses nombres historiques avec un renvoi vers le build courant.

CI .github/workflows/ci.yml : push main/master, pull_request, Ubuntu, Node depuis .nvmrc, cache npm/lockfile, npm ci, lint, typecheck, tests, SEO isolé, build normal, liens et release guard. Read-only contents et credentials non persistés ; aucun déploiement ou Lighthouse bloquant. YAML et références des scripts contrôlés localement. Premier run GitHub à vérifier après publication, sans le présenter comme exécuté.

Copie propre des fichiers candidats, sans dépendances/build/caches/documents privés copiés : npm ci réussi sous Node 24.16.0/npm 11.11.0, puis commandes de CI, 22 tests et audit zéro vulnérabilité réussis. Typecheck final : 97 fichiers, zéro erreur/avertissement/hint. Build neuf 34 HTML, liens valides et release guard réussi. Aucun secret, chemin utilisateur, lien localhost public, document privé ou placeholder visible non voulu détecté ; occurrences TOKEN = prose OAuth, mots de scanner ou tokens de design. Les scans par motifs ne constituent pas une garantie universelle.

Preview réelle : six pages principales FR/EN HTTP 200, recherche et switch conservant le filtre, aucune erreur JS/requête externe. Routes QA et inconnues 404. La 404 inconnue EN est FR dans Astro preview car la configuration Netlify n'y est pas appliquée : fallback EN et en-têtes à tester sur l'hébergeur. Capture mobile inspectée et serveur fermé. Pas de nouvelle matrice 168 écrans ni de nouveau Lighthouse.

Netlify readiness : READY pour une première publication noindex. SITE_URL doit être limité au contexte Production, absent des previews ; activation readyForIndexing uniquement après obtention de l'origine réelle et validation du site. Procédure canonical/hreflang/sitemap/robots documentée. CV public toujours absent et téléchargement désactivé. Aucun .git créé, commit, push ou déploiement.

Inventaire final : 133 candidats au commit, aucune cible Markdown manquante dans README/docs. Les 43 fichiers générés sont identiques octet par octet au build de la copie propre ; lockfile identique. Démarrage dev confirmé sous Node 24.16.0 en environ 8,3 s avec --ignore-lock en session d'agent, accueil et trois pages QA 200/noindex. Le premier lancement automatique sans ce flag n'avait pas exposé de port ; cette particularité est documentée, sans changer le framework. Serveurs fermés.

### À VÉRIFIER

Premier run distant de CI, relecture humaine EN, lecteur d'écran/zoom/tactile, ouverture personnelle de LinkedIn ; conservation du rapport de développement si un dépôt plus court est préféré. Après publication, contrôler la 404 EN et les en-têtes Netlify.

### À CONFIRMER

Aucune décision bloquante.

### PROCHAINE ÉTAPE

Phase 11 — GitHub Publication & Netlify Deployment Preparation. Arrêt avant cette phase.

## V2 — refonte locale, 16 octobre 2026

V2.1 : audit des 14 dépôts et réécriture des 14 descriptions FR/EN, avec angles, descriptions longues, highlights, faits techniques optionnels et relations typées. Une seule source de résumés ; validation des traductions et références. Les sources précises, limites des vérifications et anciennes/nouvelles descriptions figurent dans project-content-sources.md et v2-content-audit.md. Aucun test des applications sources ni résultat ML nouvellement exécuté n'est revendiqué.

V2.2–3 : Hero asymétrique avec portrait original intégré à une surface technique, navigation sticky et palette dark navy ; Bento 7/5 puis 4/4/4, cinq schémas SVG spécifiques accompagnés de texte accessible, descriptions plus précises et CTA d'étude dominant. Aucun média produit fictif ni dépendance ajoutée. Le CV public reste indisponible.

V2.4–5 : Engineering Focus présente les mécanismes et liens de preuve ; sept groupes de compétences compacts conservent la relation interactive Technologies → Projets. Expériences en timeline, deux formations principales puis deux lignes secondaires, About resserré et Contact contrasté. Les faits du parcours sont conservés.

V2.6–7 : catalogue et neuf pages complémentaires utilisent les nouvelles descriptions et faits techniques ; recherche, filtres et URLs conservés. Cinq études reçoivent un Hero illustré, des parcours techniques et titres spécifiques, avec architecture, décisions, preuves et limites existantes. Aucun résultat, contribution individuelle ou état de production inventé.

V2.8 : parité FR/EN du modèle, dictionnaire V2 typé et tests des cinq histoires/visuels. Les 24 tests passent, dont deux nouveaux contrôles de contenu incomplet et de séparation IA/matching. SEO de l'origine fictive validé sans activer l'indexation du site local.

V2.9 : lint et typecheck réussis (105 fichiers, zéro erreur/avertissement/hint). Build : 34 HTML / 36 routes, liens et ancres valides, pages QA et documents privés exclus. `check:v2` réutilise l'audit complet : 168 cas responsive sur six largeurs 320–1440 et deux thèmes ; 56 scans axe et états menu/filtres, clavier, reduced motion, sans JS, réseau et 404 réussis. Contrôles supplémentaires : 14 descriptions exactes par langue, cinq visuels, hiérarchie Bento et absence de labels SVG hors viewBox. Portrait mobile compacté après inspection ; GitHub secondaire et CTA étude mis en évidence.

Captures inspectées et conservées dans `.qa/v2/` : home-desktop-light/dark, home-mobile-light, projects-desktop-light, rezouette-desktop, enterprise-bi-desktop, mindrawfx-mobile, plus pages d'accueil complètes et Bento. Les rapports browser.json et visual-report.json conservent les preuves locales ; les captures ne sont pas livrées au build public. Aucun appel externe au chargement des pages auditées. Les mesures automatiques ne remplacent pas la review visuelle, le lecteur d'écran et les essais tactiles humains.

Les contrôles lint/typecheck ont été exécutés à chaque sous-étape ; tests/build aux étapes substantielles, régressions corrigées avant la suite. Aucun Git init/add/commit/push, aucune publication GitHub ou Netlify et aucune modification globale de Node. La CI conserve ses contrôles et n'a pas été exécutée à distance.

Mesures finales dans [v2-validation.md](v2-validation.md) : Lighthouse 99–100 performance, 100 accessibilité/bonnes pratiques sur cinq configurations ; CLS zéro, LCP 0,43–1,66 s. Baseline Phase 9 à 100 ; variation de 0–1 point documentée, sans promesse terrain. SEO 63/66 attendu avec noindex. CSS 36 435 octets / gzip théorique 7 283 ; images WebP optimisées, aucune nouvelle dépendance. Audit npm connecté final : zéro vulnérabilité. Review visuelle humaine V2 attendue avant Phase 11 ; aucun élément bloquant à confirmer pour cette livraison locale.

## V3 — checkpoint visuel limité, 16 octobre 2026

Direction visuelle V2 rejetée par le propriétaire. Refonte locale limitée au Header, Hero et Featured : palette froide/bleu vif, display plus affirmé, portrait dans une composition organique et cinq visuels de produits explicitement illustratifs. Les données et mécanismes techniques sont préservés ; deux preuves et quatre technologies visibles par carte. Navigation active native et micro-feedback avec reduced motion, sans bibliothèque ajoutée.

Le [rapport V3](v3-checkpoint.md) documente le périmètre, les principes IHM, les contrôles ciblés, les mesures et les cinq captures dans `.qa/v3/`. Lint/typecheck, 24 tests et build passent ; huit cas FR/EN/thème/viewport et douze scans axe, clavier, menu, thème, technologies, sans JS et largeurs complémentaires validés. Pas de nouvelle matrice 168 cas. Lighthouse mobile ciblé : performance 98, accessibilité/bonnes pratiques 100, CLS zéro.

Arrêt au checkpoint demandé. Aucune refonte V3 des autres sections, du catalogue ou des études ; aucune opération Git ou publication. Prochaine étape : validation visuelle du propriétaire avant de poursuivre V3.

## V3.1 — largeur, Hero, contacts et vidéos, 16 octobre 2026

Maximum visuel porté à 1520 px pour Header, Hero, Bento, catalogue et Hero des études ; textes longs conservés autour de 60–75ch. Portrait légèrement agrandi et contacts regroupés sous la composition, avec grille mobile. Le numéro +33 7 51 24 55 31 a été fourni explicitement par le propriétaire et ajouté avec tel:+33751245531 ; aucune extraction d'un document privé. La validation et la garde de sortie autorisent ce numéro approuvé, tout en contrôlant les autres occurrences. Profil personnel France en FR/EN et positionnement Intelligence artificielle / Artificial Intelligence ; les lieux historiques et formulations propres aux projets restent pertinents.

Les 14 README ont répondu 200 à une lecture publique anonyme. Quatre vidéos Drive trouvées : Rezouette, SmartAlumni IIT, SchoolManagementMERN et EventPlanner. Pages de prévisualisation anonymes 200, métadonnée vidéo et aucune demande d'accès détectée ; lecture intégrale non revendiquée. Les dix autres README n'apportent aucun vrai lien vidéo, y compris ceux proposant un emplacement de future démo. Provenance et tableau des 14 projets dans project-content-sources.md. `videoDemo` est optionnel et validé contre l'inventaire vérifié ; CTA bilingue Play tôt dans les Featured concernés, quatre cartes catalogue et quatre fiches, avec nom de projet accessible, nouvel onglet et noopener noreferrer. Aucun iframe ou appel Drive au chargement du site.

Navigation locale des études : état actif, sticky desktop et ancres françaises accentuées gérées par ID décodé. Les contrôles ont révélé puis corrigé le sélecteur invalide sur ces ancres et un débordement de l'anneau décoratif à 1440 px. Rapport de contenu régénéré pour inclure les liens vidéo ; texte QA devenu obsolète actualisé, sans publication des routes QA.

27 tests passent, dont trois nouveaux tests du téléphone, du positionnement et des vidéos vérifiées/incomplètes. Lint/typecheck sans diagnostic ; build statique conservé à 34 HTML / 36 routes. `check:v3-1` couvre 24 cas axe/layout ciblés FR/EN, clair/sombre, mobile/1920, 28 conditions de CTA sur fiches, largeurs complémentaires et fallback sans JS. Six captures et rapport navigateur dans .qa/v3-1/. Le [rapport V3.1](v3-1-checkpoint.md) propose trois formulations Featured ; la formulation actuelle est conservée pour validation.

Arrêt au checkpoint propriétaire. Aucun commit, push, déploiement ou changement de dépendance ; aucune poursuite de la refonte complète V3. Prochaine étape : Owner visual validation before continuing V3.

## V3.2 — modernisation complète, 16 octobre 2026

V3.1 validée ; corrections du Hero puis extension autorisée à l'ensemble du portfolio. Statut étudiant plus visible, lignes Full-Stack et BI/Intelligence artificielle de même taille/poids/accent en FR/EN ; portrait mobile compacté pour garder l'équilibre. France et contacts publics conservés. Quatre formations rendues par un composant uniforme en 2×2 desktop et une colonne mobile, avec mêmes traitements et dates/localisations historiques inchangées.

Engineering Focus adopte une composition éditoriale asymétrique, quatre axes explicites et des liens de preuve. Skills reste limité à sept groupes courts ; explorateur en colonnes avec sélection, feedback et reset. Flutter ajouté aux technologies sélectionnables, sept relations signature contrôlées. Experience devient une timeline large en trois années ; About resserré à deux paragraphes humains et Contact reconstruit en conclusion navy avec les quatre moyens de contact et copie email.

Catalogue : introduction raccourcie, recherche visible hors des filtres, critères repliables et grille distincte de cinq ShowcaseCard illustrées et neuf cartes compactes. Recherche, filtres, historique/URL, reset, vide et sans JS conservés. Cinq études dotées de Heroes illustratifs distincts ; diagrammes factuels dans le corps, navigation locale, callouts et surfaces modernisés. Quatre démos vérifiées toujours visibles tôt, sans iframe. Aucun fait technique, résultat ML, contribution, qualification ou statut de production inventé.

Palette sémantique globale alignée sur V3, largeur 1520 px, paragraphes 60–75ch, dark mode dédié et reduced motion. Une surface sélectionnée claire initialement trop sombre pour le bleu a été éclaircie après échec du test AA, sans diminuer son seuil. Interactions natives et dépendances conservées. Documentation design-system/i18n/architecture/README actualisée ; anciens scripts QA adaptés aux nouvelles cartes et aux démos vérifiées sans retirer leurs contrôles fonctionnels.

Validation finale : lint ; typecheck 116 fichiers sans diagnostic ; 29 tests ; build 34 HTML / 36 routes ; liens/ancres, fixture SEO et garde de sortie réussis. `check:v3-2` : huit cas de composants FR/EN/clair/sombre/375–1920, égalité des quatre cartes Formation, hiérarchie typographique, clavier des sept relations, états sélectionnés axe et 28 fiches conditionnelles. Matrice complète étendue : 196 rendus sur sept largeurs 320–1920 et 14 pages ; 56 scans axe plus états technologiques/menu/filtres, aucun problème automatique détecté. Parcours clavier, copie simulée, sans JS, reduced motion, réseau sans appel externe, impression et 404 réussis.

Douze captures produites et inspectées dans .qa/v3-2/, avec rapports component-report.json/browser.json. Les captures isolées de sections omettent le Header sticky pour éviter son recouvrement automatique ; les captures de pages montrent l'interface complète. Lighthouse sur cinq configurations : performance 99–100, accessibilité/bonnes pratiques 100, LCP 0,43–1,81 s, TBT 0 ms, CLS 0 en mobile et 0,001 desktop. SEO 63/66 dû au noindex volontaire. CSS 74 566 octets / gzip théorique 13 561, coût mesuré et règles inutilisées documentés sans promesse terrain. Rapports Lighthouse distincts conservés dans .qa/final-audit/v3-2/.

Voir [v3-2-validation.md](v3-2-validation.md). Aucun commit, push, GitHub ou déploiement Netlify, aucune modification globale de Node. Arrêt pour **Final V3 visual review before Phase 11.** Aucun élément bloquant à confirmer ; les vérifications humaines restent la review visuelle demandée.

## V3.3 — revue visuelle finale, 16 octobre 2026

V3.2 techniquement validée par le propriétaire. Inspection directe des captures : Hero 320/375/1440/1600/1920 clair/sombre, accueils complets, sections rapprochées, catalogue et cinq études. Deux points retenus : P2 espace vide des formations, réduit uniformément par padding/gap/hauteur ; P3 action GitHub FR harmonisée sur « Voir le code sur GitHub ». Même direction V3, mêmes quatre formations, faits et composants. Titre Featured conservé après revue ; aucune nouvelle fonctionnalité ni dépendance.

Le [rapport final](v3-final-visual-review.md) rassemble la scorecard subjective de 16 domaines, les observations, trois walkthroughs recruteur et le parcours catalogue. Ces simulations ne sont pas des tests auprès de recruteurs réels. Aucun P1 ou P2 restant identifié ; aucun choix esthétique majeur en attente. Décision : **V3 READY FOR PUBLICATION**.

Validation après corrections : lint, typecheck 116 fichiers sans diagnostic, 29 tests, build 34 HTML / 36 routes, liens/ancres, garde de sortie et fixture SEO réussis. Audit npm : zéro vulnérabilité connue. 33 captures finales plus six extraits dans .qa/v3-final/ ; 38 scans axe ciblés sans violation détectée, recherche/filtres/reset, sélection Spring Boot et navigation locale des cinq études dans les deux thèmes mobiles validés. Absence de débordement sur trois pages à cinq largeurs dans les deux thèmes. Contrôles tactiles du catalogue 320/375 FR/EN mesurés à au moins 44 px ; quatre formations de même hauteur pour chaque configuration.

Lighthouse final sur quatre configurations : performance accueil desktop 100, accueil mobile 98, catalogue mobile 99, Rezouette mobile 100 ; accessibilité et bonnes pratiques 100 partout. LCP 0,46–1,81 s, TBT zéro ; CLS mobile zéro et desktop 0,00113. Variation d’un point mobile documentée sans nouvelle optimisation ou refonte. SEO 63/66 avec noindex volontaire conservé. Rapports bruts distincts dans .qa/final-audit/v3-final/ ; aucune promesse de performance terrain ou d’INP.

Arrêt des modifications visuelles. Aucun git add/commit/push, publication GitHub, déploiement Netlify ou activation d’indexation. Prochaine étape séparée : **Phase 11 — GitHub Publication & Netlify Deployment Preparation.**

## Phase 11 — préparation de publication manuelle, 16 octobre 2026

V3 définitivement validée par le propriétaire. Aucune modification esthétique, de contenu public, de stack, de CI ou de configuration de déploiement. Création des guides [publication-checklist.md](publication-checklist.md) et [deployment.md](deployment.md), actualisation du README et de [release-readiness.md](release-readiness.md). Métadonnées GitHub et premier message de commit préparés uniquement ; procédure GitHub → Netlify main → premier deploy noindex → origine réelle → QA publique → activation SEO ultérieure documentée.

Inventaire sans Git : 166 fichiers candidats selon .gitignore, aucun fichier privé ou secret détecté, liens Markdown de fichiers valides hors preuves QA explicitement locales. Références loopback et Desktop classées comme QA, validation d’origine, vocabulaire de catégorie ou historique. Contacts publics FR/EN cohérents, aucun ancien numéro détecté dans les sources publiques ; quatre vidéos conservées, 20 liens HTML avec attributs de sécurité attendus. Public CV pending et aucune copie de CV privé.

Node 24.16.0 cohérent dans .nvmrc/TOML/CI. npm ci propre en copie isolée réussi, lint, typecheck 116 fichiers sans diagnostic, 29 tests, SEO fixture, build 34 HTML / 36 routes / 45 fichiers, liens et release réussis ; npm audit zéro vulnérabilité connue. EPERM initial sur dépendance native verrouillée dans le dossier de travail : validation réalisée en copie propre, dépendances locales réalignées depuis l’installation du lockfile, aucun processus utilisateur arrêté ni installation globale modifiée. Comparaison des sources hors documentation et du lockfile inchangés ; dépendances directes installées conformes au lockfile.

Décision **READY FOR MANUAL PUBLICATION**. Aucun git init/add/commit/push, repository GitHub, Netlify ou indexing exécuté. Les premiers résultats CI Linux, HTTP public, démos anonymes, appareil réel et Lighthouse production restent des vérifications post-publication humaines. Prochaine étape : **Publication manuelle du repository GitHub, puis premier déploiement Netlify avec indexation encore désactivée.**
