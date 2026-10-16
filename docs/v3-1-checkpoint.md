# V3.1 — largeur, Hero, contacts et démos vidéo

V3.1 validée par le propriétaire. Le dernier état est la [V3.2 complète](v3-2-validation.md) ; ce rapport conserve les décisions et vérifications du checkpoint précédent.

16 octobre 2026. Checkpoint local, sans Phase 11, commit, push ni déploiement. Les autres sections attendent toujours la validation visuelle du propriétaire.

## Livré

- Header, Hero, Bento, catalogue et Hero des études : maximum 1520 px, gutters de 24 à 40 px selon l'écran. À 1920 px, le contenu visuel utilise 1520 px ; les autres sections d'accueil conservent leur composition précédente. Paragraphes et corps d'études limités autour de 60–75 caractères par ligne.
- Hero réparti environ 57/43 sur grand écran, portrait légèrement agrandi, contacts déplacés sous la composition. Aucun doublon GitHub/LinkedIn dans le Hero et aucune retouche du fichier photo.
- Localisation personnelle : **France**, FR et EN. Rouen/Sfax restent dans les contextes historiques de formation/expérience. Positionnement global : **Intelligence artificielle / Artificial Intelligence** ; les formulations spécifiques des projets ne sont pas remplacées aveuglément.
- Nouveau texte Hero : « Je conçois des applications Full-Stack et des solutions data, de l’architecture logicielle à l’intelligence artificielle. » EN : « I build Full-Stack applications and data solutions, from software architecture to artificial intelligence. »
- GitHub, LinkedIn et numéro public **+33 7 51 24 55 31**, fourni expressément par le propriétaire. Appel : `tel:+33751245531`. Les boutons passent en grille sous la photo sur mobile ; aucun contact flottant. Numéro également accessible dans Contact. Aucun ancien CV privé utilisé.
- Textes des cartes et de la navigation légèrement agrandis. Navigation locale des études avec état actif, y compris pour les ancres françaises accentuées ; sticky sur grand écran avec compensation du Header.

## Audit vidéo des 14 README

Tous les README ont été relus anonymement (HTTP 200). Quatre vrais liens Drive sont présents ; pages de prévisualisation ouvertes sans compte, HTTP 200 et métadonnée video/mp4, sans demande d'accès détectée. La lecture intégrale des vidéos n'est pas revendiquée. Sources, URLs, labels originaux et limites dans [project-content-sources.md](project-content-sources.md#v31--audit-des-démos-vidéo-16-octobre-2026).

| Project | Video found | Provider | Source | Added to portfolio |
|---|---|---|---|---|
| Rezouette | YES | Google Drive | README | YES |
| SmartAlumni IIT | YES | Google Drive | README | YES |
| Enterprise BI Dashboard | NO | — | README | NO |
| MinDrawFX | NO | — | README | NO |
| Waste Classification | NO | — | README | NO |
| Housing Insurance Claim Prediction | NO | — | README | NO |
| English–French Seq2Seq | NO | — | README | NO |
| Smart Trade Manager | NO | — | README | NO |
| ShopFlow | NO | — | README | NO |
| JobConnect | NO | — | README | NO |
| RestaurantManagementDotNet | NO | — | README | NO |
| SchoolManagementMERN | YES | Google Drive | README | YES |
| Java Network Communication Suite | NO | — | README | NO |
| EventPlanner | YES | Google Drive | README | YES |

NO signifie « aucun lien vidéo trouvé dans le README », sans conclure sur des sources inconnues. Les sections proposant une future vidéo ne sont pas retenues comme preuves.

`videoDemo` stocke URL, fournisseur, libellés FR/EN, source README et date de vérification. Le validateur refuse les URLs vides ou non présentes dans l'inventaire vérifié, les sources empruntées à un autre projet et les traductions manquantes. CTA avec Play, nom du projet accessible, nouvel onglet et `noopener noreferrer`. Aucun iframe ni chargement Google Drive lors de la visite du portfolio.

Placement : tôt après la proposition sur les deux Featured concernés, sur les quatre cartes du catalogue et dans les quatre fiches concernées, avant détails techniques/description longue. Deux études concernées (Rezouette, SmartAlumni) ; deux fiches complémentaires (SchoolManagementMERN, EventPlanner). Pas de lien vidéo pour les dix autres projets.

## Wording Featured : trois options

| Option | FR | EN |
|---|---|---|
| Actuelle, conservée pour la review | Du code. Des idées. Des projets concrets. | Code. Ideas. Things that work. |
| Plus orientée systèmes | Des systèmes concrets, du code à l’usage. | Real systems, from code to use. |
| Plus professionnelle et directe | Ingénierie logicielle. Projets en action. | Software engineering. Projects in action. |

La première conserve le rythme visuel du checkpoint partiellement validé. La troisième est la recommandation éditoriale pour une prochaine décision du propriétaire. « Construits et testés » n'est pas retenu comme promesse générale, tous les projets n'ayant pas une suite métier vérifiée.

## Validation et captures

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run check:links` et `npm run check:release`. Les 27 tests incluent trois nouveaux contrôles : numéro approuvé/France/IA, inventaire des quatre vidéos et rejet de contenus vidéo invalides. La garde de sortie autorise uniquement la cible téléphonique explicitement approuvée ; les autres numéros restent détectés. CI et dépendances conservées.

`npm run check:v3-1` vérifie 24 cas ciblés (FR/EN, 375/1920, clair/sombre, accueil/catalogue/Rezouette) avec axe, clavier/focus, téléphone, contacts sous portrait, largeur/alignment Header–Hero, liens vidéo et sécurité, navigation locale et ancres accentuées. Contrôle conditionnel des CTA sur les 28 fiches FR/EN, largeurs complémentaires 320/768/1024/1440 et contacts/vidéos sans JS. Le rapport local est `.qa/v3-1/checkpoint-report.json`. Pas de nouvelle matrice 168 cas ni de nouveau score Lighthouse revendiqué pour V3.1.

Résultat final : tous ces contrôles passent, zéro violation axe détectée sur les 24 cas, zéro débordement aux largeurs vérifiées et aucun appel externe au chargement. Typecheck : 114 fichiers, zéro erreur/avertissement/hint. Production : 34 HTML / 36 routes ; liens et garde de sortie réussis. Fixture SEO à origine configurée validée. Captures inspectées en clair, sombre, mobile, Bento et fiches avec vidéo. Les validations tactiles/lecteur d'écran et la lecture personnelle des vidéos restent des vérifications humaines.

Captures :

- `.qa/v3-1/hero-wide-desktop.png` — 1920 px, clair.
- `.qa/v3-1/hero-wide-dark.png` — 1920 px, sombre.
- `.qa/v3-1/hero-contact-mobile.png` — 375 px, téléphone visible sous portrait.
- `.qa/v3-1/featured-wide-desktop.png` — Bento élargi et deux CTA vidéo.
- `.qa/v3-1/project-with-video.png` — carte SchoolManagementMERN avec vidéo.
- `.qa/v3-1/case-study-with-video.png` — Hero Rezouette avec vidéo.

À vérifier : largeur générale, contacts, lecture personnelle des quatre vidéos, wording Hero et choix Featured. Téléphone fourni : aucun numéro à demander. Prochaine étape : **Owner visual validation before continuing V3.**
