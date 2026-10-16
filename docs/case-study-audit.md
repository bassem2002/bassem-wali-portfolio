# Audit éditorial des études de cas — Phase 6

Cinq études FR, adaptées en EN en Phase 8, intégrées au site statique local. Aucun déploiement. Les affirmations reprennent les données de Phase 3 et une relecture des sources publiques aux révisions ci-dessous. Les snapshots de travail restent dans `.qa/source-audit/`, ignorés par Git et hors du site. Aucun identifiant réel, document utilisateur, média professionnel ou output de notebook n’est republié.

Les décisions comportent choix, bénéfice technique et compromis. Les bénéfices généraux ne sont pas attribués à une motivation historique ou à une contribution personnelle. Aucune métrique de performance, couverture, fréquentation ou disponibilité en production n’est annoncée. Les suites des projets sources et le notebook n’ont pas été exécutés pendant cette phase.

## Rezouette

- **Title SEO :** Rezouette — plateforme Full-Stack et intégrations OAuth.
- **Route :** `/projects/rezouette/`.
- **Sections :** vue d’ensemble/contexte Systeo 2026, problème, fonctionnalités Phase 3, architecture, stack, trois décisions, intégrations/analytics, tests, limites, compétences, projets liés et GitHub.
- **Architecture :** trois SVG : Angular → contrôleurs → cas d’usage → modèles/contrats ; adaptateurs → Prisma → PostgreSQL ; cas d’usage → adaptateurs OAuth/fournisseurs → APIs sociales. Légendes et listes textuelles. Les flèches décrivent les flux retenus, pas une cartographie exhaustive des dépendances ni des microservices.
- **Testing :** Jest, cas d’usage et mocks ; OAuth/PKCE, publication, planification et analytics présents. Aucun comptage ni résultat d’exécution.
- **Limitations :** validations TikTok/LinkedIn/YouTube ; absence d’authentification applicative/RBAC ; stockage OAuth temporaire ; coordination multi-instance ; chiffrement des jetons ; tests frontend non configurés.
- **GitHub :** [repository](https://github.com/bassem2002/rezouette-social-media-saas).
- **Media used :** SVG natifs seulement ; aucune capture applicative ni démo.
- **Claims requiring review :** portée exacte de la participation au stage. Le CV et la consigne valident l’association au stage, tandis que le README public utilise aussi un positionnement personnel : aucune responsabilité détaillée n’est attribuée. Facebook/Instagram sont qualifiés selon le statut déclaré dans le dépôt, avec absence de revalidation réelle explicite. Analytics = historique local.
- **Sources :** révision [def3f0c](https://github.com/bassem2002/rezouette-social-media-saas/tree/def3f0c35878819854758a39f976e9239288b816), README (statuts et limites), `backend/src/domain/shared/ports/`, `application/social/use-cases/`, `application/scheduled-post/use-cases/`, `application/analytics/use-cases/`, `infrastructure/prisma/repositories/prisma-analytics.repository.ts` et tests associés.

## SmartAlumni IIT

- **Title SEO :** SmartAlumni IIT — mentorat, analyse de CV et matching pondéré.
- **Route :** `/projects/smartalumni-iit/`.
- **Sections :** vue d’ensemble, problème, fonctionnalités, architecture/pipelines, stack, trois décisions, accès, tests, limites, compétences, projets liés et GitHub.
- **Architecture :** backend Angular → contrôleurs → services → repositories → PostgreSQL ; pipeline CV → Tika → DeepSeek → champs structurés ; pipeline distinct profils → règles pondérées → mentors classés. Fallback local expliqué dans le texte, sans confusion avec le classement.
- **Testing :** `CVServiceImplTest` et `RecommandationServiceImplTest`, JUnit/Mockito. Présence examinée, suites non exécutées, couverture non annoncée.
- **Limitations :** matching par règles ; dépendance API et fallback limité ; relecture des champs ; absence de validation indépendante des parcours et de pertinence utilisateur.
- **GitHub :** [repository](https://github.com/bassem2002/smartalumni-iit).
- **Media used :** SVG natifs seulement.
- **Claims requiring review :** formulation de la distinction analyse assistée/matching ; aucune contribution individuelle détaillée. Les contrôles Spring Security/JWT ne sont pas présentés comme un audit global de sécurité.
- **Sources :** révision [54c605c](https://github.com/bassem2002/smartalumni-iit/tree/54c605c1e7833521e953c7585a7a26d6963b4bdf), `backend/src/main/java/tn/IIT/mentorat_platform/service/impl/CVServiceImpl.java`, `AiCvExtractionServiceImpl.java`, `RecommandationServiceImpl.java`, `config/SecurityConfig.java` et `backend/src/test/java/tn/IIT/mentorat_platform/service/`.

## Enterprise BI Dashboard

- **Title SEO :** Enterprise BI Dashboard — analyse OLAP avec SSAS et MDX.
- **Route :** `/projects/enterprise-bi-dashboard/`.
- **Sections :** vue d’ensemble/périmètre de consommation, problème, fonctionnalités, architecture, stack, trois décisions, lecture BI/dépendances, vérification, limites, compétences, projets liés et GitHub.
- **Architecture :** contrôleur MVC → contrat ISsasService → SsasService → ADOMD.NET → cube SSAS ; retour service → JSON → JavaScript → Chart.js. Le contrat est identifié comme interface logicielle.
- **Testing :** aucun projet de tests automatisés identifié ; aucun cube exécuté pendant cette préparation.
- **Limitations :** cube/warehouse/ETL/scripts de déploiement non inclus ; dépendance au schéma ; identité/configuration de connexion ; tests et résultats métier non reproduits.
- **GitHub :** [repository](https://github.com/bassem2002/enterprise-bi-dashboard).
- **Media used :** SVG natifs seulement.
- **Claims requiring review :** périmètre OLAP et lisibilité du diagramme ; aucune attribution de construction du warehouse/cube/ETL. Power BI et SSIS ne figurent pas dans la stack.
- **Sources :** révision [2f5b034](https://github.com/bassem2002/enterprise-bi-dashboard/tree/2f5b034545c1792d56283fe525f005151ed5525b), `Controllers/DashboardController.cs`, `Services/ISsasService.cs`, `Services/SsasService.cs`, `wwwroot/js/dashboard.js` et limites du README.

## MinDrawFX

- **Title SEO :** MinDrawFX — éditeur JavaFX et design patterns en pratique.
- **Route :** `/projects/mindrawfx/`.
- **Sections :** vue d’ensemble, problème, fonctionnalités, architecture, stack, patterns appliqués, trois décisions, vérification, limites, compétences, projets liés et GitHub.
- **Architecture :** JavaFX/FXML → contrôleur → services → repository SQLite → JDBC → SQLite ; flux des commandes avec notification Observer. Les descriptions distinguent la persistance du fonctionnement des objets graphiques.
- **Testing :** aucun test automatisé identifié ; application JavaFX non lancée.
- **Limitations :** configuration JavaFX ; absence de tests ; fidélité de la sauvegarde/reconstruction non validée par exécution.
- **GitHub :** [repository](https://github.com/bassem2002/MinDrawFX).
- **Media used :** SVG natifs seulement.
- **Claims requiring review :** densité de la section patterns et vocabulaire objet. Command, Decorator, Observer, Factory, Repository, Strategy, Singleton et Adapter sont reliés à leurs classes. Observer actualise historique/statut/journalisation dans `MainController.update` ; aucun rafraîchissement du canvas ne lui est attribué.
- **Sources :** révision [4d4a36a](https://github.com/bassem2002/MinDrawFX/tree/4d4a36af8195b6b6d783c4fac8d55ba5ef545ddd), `src/command/CommandManager.java`, `src/controller/MainController.java`, `src/model/commands/`, `src/decorator/`, `src/factory/`, `src/service/ShapePersistenceService.java`, `src/repository/`, `src/model/strategies/`, `src/singleton/DatabaseConnection.java`, `src/adapter/CanvasExportAdapter.java`.

## Waste Classification

- **Title SEO :** Waste Classification — transfert d’apprentissage avec TensorFlow.
- **Route :** `/projects/waste-classification/`.
- **Sections :** vue d’ensemble expérimentale, problème, fonctionnalités, trois flux ML, stack, trois décisions, expérimentations/vérification, limites, compétences, projets liés et GitHub.
- **Architecture :** préparation/augmentation ; ResNet50 ImageNet → poids externes → fusion de caractéristiques et blocs inspirés de DenseNet → sortie binaire ; entraînement → validation → callbacks. Le schéma ne représente pas un pipeline MLOps.
- **Testing :** aucun test logiciel identifié ; revue des cellules de code, sans réexécution ni métrique finale publiée. Validation ML explicitement distincte des tests unitaires.
- **Limitations :** données et poids externes ; environnement Colab/Drive ; initialisation `p_m_dechets2` commentée ; résultats non reproduits.
- **GitHub :** [repository](https://github.com/bassem2002/waste-classification-deep-learning).
- **Media used :** SVG natifs seulement ; aucun output ou graphique historique repris.
- **Claims requiring review :** description de la fusion et du fine-tuning ; aucune supériorité mesurée attribuée au modèle. La structure combine des portions ResNet50 avec blocs personnalisés ; elle n’est pas présentée comme un DenseNet complet préentraîné.
- **Sources :** révision [edcda7e](https://github.com/bassem2002/waste-classification-deep-learning/tree/edcda7e232600a408a6a1c6d9d8e8656da0edeb3), cellules de `waste_classification_resnet50.ipynb` (`garbage_resnet`, `build_p_m_dechets2`, chargement des datasets, compilation, callbacks et appel `fit`).

## Contrôles transversaux

- Les cinq fichiers FR et les cinq fichiers EN ont `draft: false`. Seules les cinq cartes phares proposent une étude de cas dans chaque langue. Les neuf autres projets conservent leur page de détails.
- IDs projets conservés ; slugs SmartAlumni et MinDrawFX alignés sur les routes demandées. Liens, langue, sitemap et métadonnées dérivent de ces slugs ; aucune route supplémentaire ajoutée.
- Relations calculées à partir des technologies/catégories partagées, hors projet courant, puis départagées selon l’ordre éditorial. Deux ou trois projets liés ; aucun mapping manuel.
- Hero limité à six technologies, stack complète dans le corps. Compétences démontrées vérifiées contre `relatedSkills` ; seuls les liens vers des technologies réelles utilisent le filtre du catalogue.
- SVG avec titre, description, légende et liste textuelle native disponible sans JS. Navigation par ancres, breadcrumb et lien d’évitement au clavier.
- SEO par étude : titre/description propres, Open Graph, canonical configuré par l’origine du site et schéma SoftwareSourceCode factuel. Aucun auteur individuel, date, licence ou version supposé.
- QA locale : `npm run check:design-system -- --case-studies`. Matrice : cinq pages × 375/768/1024/1440 px × clair/sombre, axe A/AA, overflow, hiérarchie, focus, ancres, fallback textuel, métadonnées et liens liés. Fallback sans JS et CTA des listes également contrôlés. Captures `.qa/case-studies/`, hors publication.

## Relecture utilisateur

Wording technique, diagrammes, éventuelles sections longues (notamment les patterns) et périmètre des contributions individuelles. Aucune attribution détaillée n’est nécessaire pour rendre ces études utilisables : les contributions restent omises tant qu’elles ne sont pas confirmées.

La rédaction EN conserve les sections, limites et réserves FR : statuts fournisseurs et analytics locaux de Rezouette ; analyse assistée distincte du matching pondéré ; consommation d’un cube SSAS ; rôles vérifiés des patterns ; résultats Waste non reproduits. Les 13 diagrammes partagent leur composant et leur structure, avec textes et alternatives localisés. `validateStudyParity()` bloque une langue/section importante ou une structure de diagramme manquante. La relecture sémantique humaine reste complémentaire. QA anglaise : `.qa/i18n/`, commande et détails dans `docs/i18n.md`.
