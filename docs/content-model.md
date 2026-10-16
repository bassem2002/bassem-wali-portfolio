# Modèle de contenu — V2

La V2 ajoute `project-narratives.ts`, source unique des 14 descriptions FR/EN, angles, highlights, détails techniques et faits optionnels (authentification, base, IA/données). `summary` reste un alias de `shortDescription`. `mainFeatures` reprend les fonctionnalités existantes ; `relatedProjects` est calculé à partir des relations vérifiées. Les anciens résumés ont été retirés des fichiers de détails. `project-visuals.ts` et `case-stories.ts` portent les cinq schémas explicatifs et parcours techniques bilingues. Les preuves et réserves sont consignées dans [project-content-sources.md](project-content-sources.md) et [v2-content-audit.md](v2-content-audit.md).

## Sources

Le contenu utilise le CV local, l’audit de Phase 0 et les décisions validées. Les 14 URLs GitHub ont été relues via les métadonnées publiques le 10 octobre 2026 : toutes correspondent aux dépôts publics attendus. Cette vérification ne prétend pas que leurs applications ou tests ont été exécutés.

Le CV privé reste préservé et hors du site. V3.1 ajoute uniquement le téléphone fourni expressément pour publication par le propriétaire, avec affichage lisible, cible E.164 et publicationApproved. Aucune donnée médicale, credential, contenu client ou URL interne n’est ajouté. Quatre liens vidéo publics issus des README sont ajoutés via `videoDemo` (URL, fournisseur, libellés FR/EN, source et date de vérification) ; aucun screenshot réhébergé. La version publique du CV manque toujours.

## Project

`src/data/projects.ts` assemble les métadonnées techniques et les contenus de `src/data/project-details.fr.ts` et `src/data/project-details.en.ts`, indexés par ID. Les anciens résumés de départ ont été retirés pour conserver une seule rédaction par langue.

| Champ | Rôle |
|---|---|
| `id` | Identité stable, utilisée par les relations |
| `slug` | Chemin des routes FR/EN ; slugs de Phase 1 conservés |
| `title` | Nom complet ; remplace `name` |
| `shortTitle?` | Titre compact de carte si utile |
| `featured` | Cinq projets validés ; remplace `priority` |
| `projectType` | Contexte professionnel, académique, personnel ou non précisé |
| `summary` | Alias du nouveau `shortDescription`, complet en FR et EN |
| `problem` | Problème traité en FR et EN |
| `categories` | Domaines du projet |
| `technologies` | IDs de stack, labels issus du registre |
| `githubUrl` | URL réelle ; remplace `repository` |
| `features` | Fonctionnalités du projet, distinctes du travail individuel |
| `architecture` | Description vérifiée, sans version inutile |
| `limitations` | Limites courtes et utiles |
| `testing` | Tests présents et `executedDuringAudit: false` |
| `relatedSkills` | Technologies et concepts démontrés, sans doublons |
| `experienceReference?` | ID de l’expérience liée |
| `myContributions` | Contributions avec preuves ; vide si périmètre non isolé |
| `demo` | `null` ; future démo avec accès public et droits validés |
| `videoDemo?` | Lien vidéo vérifié et sourcé dans le README, quatre projets en V3.1 ; absent pour les autres |
| `screenshots` | Vide ; futures images locales avec droits et sensibilité contrôlés |
| `evidence` | Sources des descriptions, pas attribution automatique d’auteur |

Le statut Case Study est calculé depuis la collection Markdown. Il n’est pas dupliqué dans les projets, ni accompagné d’un bouton avant publication. `categories` représente aussi les domaines ; aucun champ redondant `category`/`domains` n’est nécessaire.

ID et slug commencent avec la même valeur mais sont stockés séparément. Pour modifier une route, conserver l’ID et adapter le slug et les frontmatters associés. Les exemples de nouveaux slugs du prompt ne remplacent pas les routes déjà validées : aucune migration n’a été effectuée.

## Taxonomies et compétences

Domaines : Full-Stack, Backend, Mobile, Business Intelligence, Machine Learning, Deep Learning, NLP, Architecture logicielle, Réseaux, Desktop, IA appliquée et Computer Vision. Data Mining est représenté comme concept de compétence, sans ajouter une catégorie de projet redondante.

Les compétences ont 13 catégories : Langages, Backend, Frontend & mobile, Données & persistance, Business Intelligence, Machine Learning, Deep Learning, NLP, IA appliquée, APIs & sécurité, Architecture logicielle, Tests & outils et Réseaux. Les libellés sont dans `src/data/skill-categories.ts`.

Le registre comprend 111 entrées, **technologies et concepts réunis**, sans niveau ou pourcentage. Il ne représente pas 111 technologies maîtrisées au même niveau. La présentation de la homepage pourra rester compacte ; la vue de travail montre toutes les références.

`src/data/skills.ts` définit les IDs, noms et catégories. Les champs `projectIds` et les sources repository sont dérivés de `Project.relatedSkills` ; les composants n’écrivent aucune correspondance.

- `projectsUsing(id)` : relation de stack à partir de `technologies`, pour l’interaction signature.
- `projectsDemonstrating(id)` : relation de compétence à partir de `relatedSkills`, pour les concepts.
- `projectById(id)` : références stables ; `projectBySlug(slug)` : routes.

Relations testées : PyTorch → Seq2Seq uniquement ; TensorFlow → Waste Classification ; SSAS → BI Dashboard ; JavaFX → MinDrawFX et Java Network Suite ; Laravel → JobConnect et EventPlanner.

.NET, SQL, jQuery, HTML et CSS sont conservés sur la base explicite du CV et de Clinisys, avec `projectIds: []`. Aucun lien GitHub fictif ne leur est attribué. Un nouvel ID sans projet démonstratif ni source CV explicitement prévue fait échouer l’assemblage.

## Profil, expériences et formation

Le profil fournit le Hero, la ligne académique, trois paragraphes À propos, le message de contact, la recherche de stage et les langues sans niveau. Les CTA restent dans le dictionnaire i18n.

Les expériences conservent Systeo 2026/Rezouette, Systeo 2025/School Management MERN et Clinisys 2024. Les deux stages ont des références réciproques projet/expérience. Clinisys reste une description générale avec sa stack CV, sans lien de dépôt ni données médicales. Les contributions détaillées restent vides.

La formation conserve ESIGELEC, IIT, Faculté des Sciences de Sfax et le baccalauréat au lycée Tayeb Mhiri, avec lieux et périodes du CV. Aucun niveau de langue ou diplôme supplémentaire n’est ajouté.

## i18n et études de cas

Les contenus publics utilisent `Localized<T> = { fr, en }`. `Editorial<T>` exige désormais lui aussi les deux langues. Résumés, problèmes, fonctionnalités et limites EN sont rédigés ; les comptes de fonctionnalités/limites sont comparés et les données de profil, d’expérience et de formation sont vérifiées dans les deux langues.

Cinq Markdown par langue sont intégrés comme études de cas (`draft: false`). Leur frontmatter porte aperçu, technologies du Hero, textes des diagrammes et compétences démontrées ; le corps contient décisions, spécificités, vérification et limites. Fonctionnalités et stack viennent toujours des données projets. La collection vérifie les champs nécessaires et les relations ; `publishedCaseStudy()` impose aussi la parité structurelle FR/EN. Voir `docs/case-study-audit.md` pour les sources et `docs/i18n.md` pour les traductions.

## Workflow d’édition

1. Auditer le dépôt, puis compléter `repository-inventory.ts` et les métadonnées de `projects.ts`.
2. Ajouter le contenu français dans `project-details.fr.ts`, sous l’ID stable.
3. Référencer les technologies et les concepts du registre ; les relations inverses se calculent.
4. Préparer le Markdown pertinent avec `draft: true`.
5. Exécuter les contrôles et régénérer le rapport.

```sh
npm run check:data
npm run report:data
npm run lint
npm run typecheck
npm test
npm run build
npm run check:links
```

`prebuild` lance la validation des données. `report:data` écrit `docs/content-audit.md` : 14 projets, références, médias/démos, études, compétences et routes FR/EN. `/data-preview/` est une vue française de travail, noindex et hors sitemap. Le lien anglais renvoie au catalogue EN existant, sans inventer une seconde vue éditoriale.

Les tests injectent des erreurs : doublons, URL fictive, mauvais dépôt, catégorie/technologie inconnue, nombre featured incorrect et relations incohérentes. Aucun nouvel outil de validation n’a été ajouté.

## Notes internes d’audit

- SmartAlumni : CV historique Spring Boot 3, manifeste audité 4.0.5 ; cartes sans version.
- RestaurantManagementDotNet : CV .NET 10, projets audités .NET 9 ; cartes sans version.
- Rezouette : OAuth fournisseur distinct de l’authentification applicative ; mocks distincts de validation réelle.
- Housing Insurance : seuil choisi sur le test, préparation hors folds et résultats historiques divergents. Aucune métrique dans la carte. Les détails éventuels devront parler de « Recorded experimental results » avec contexte méthodologique.
- Waste Classification : données et poids externes, initialisation à préparer ; aucune performance reproduite revendiquée.
- Seq2Seq : LSTM ; aucune architecture Transformer, Attention, LLM ou RAG revendiquée.
- Périmètre individuel des projets collectifs à préciser avant attribution détaillée.

Ces notes ne sont pas routées vers le site. Aucun média professionnel non autorisé n’est copié.
