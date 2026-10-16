# Sources du contenu projet V2

Audit présenté avant implémentation, intégré le 16 octobre 2026. Les 14 README publics ont été confrontés aux arbres, manifestes disponibles et fichiers ciblés. Les liens ci-dessous permettent de retrouver les affirmations. HEAD est une référence évolutive ; les cinq études conservent aussi les révisions de l'audit antérieur dans case-study-audit.md. Les appels ultérieurs à l'API de métadonnées ont rencontré une limite 403 ; les lectures raw des fichiers cités ont répondu 200. Aucune application, suite source ou entraînement n'a été exécuté. Présence de code ≠ validation en production.

## Rezouette

[Dépôt et README](https://github.com/bassem2002/rezouette-social-media-saas). Manifestes backend/package.json et frontend/package.json ; configuration de persistance backend/prisma/schema.prisma.

- Preuves : [traitement des publications dues](https://github.com/bassem2002/rezouette-social-media-saas/blob/HEAD/backend/src/application/scheduled-post/use-cases/process-due-scheduled-posts.use-case.ts), son fichier .spec.ts, application/auth/use-cases/connect-youtube-account.use-case.ts et ports/adaptateurs.
- Utilisé : OAuth/PKCE selon fournisseur, cas d'usage séparés, planification, transition d'état avant appels, isolation des erreurs, Prisma/PostgreSQL, tests Jest avec mocks et analytics locaux.
- Exclu : authentification applicative complète, multi-workspace/RBAC, chiffrement des tokens au repos, engagement temps réel universel et validation réelle de tous les fournisseurs. FB/Instagram : statut déclaré par le README, non reproduit.
- Limites : TikTok validation en attente ; LinkedIn/YouTube mocks ; états OAuth en mémoire. README qualifie le projet de personnel, tandis que le contexte de stage vient du CV/choix utilisateur : aucune contribution détaillée déduite.

## SmartAlumni IIT

[Dépôt et README](https://github.com/bassem2002/smartalumni-iit). Manifestes backend/pom.xml et frontend/package.json ; application.yml/properties examinés sans republier les valeurs.

- Preuves : backend/src/main/java/tn/IIT/mentorat_platform/service/impl/{CVServiceImpl,AiCvExtractionServiceImpl,RecommandationServiceImpl}.java ; [classement pondéré](https://github.com/bassem2002/smartalumni-iit/blob/HEAD/backend/src/main/java/tn/IIT/mentorat_platform/service/impl/RecommandationServiceImpl.java) ; tests CVServiceImplTest et RecommandationServiceImplTest.
- Utilisé : mentorat, profils, demandes, conversations ; Tika → DeepSeek → données relues ; fallback local ; matching distinct par critères ; JWT/Spring Security ; PostgreSQL/JPA.
- Exclu : recommandation par modèle ML entraîné, qualité d'extraction garantie, contribution individuelle attribuée depuis le seul README.
- Limites : API externe, revue humaine des champs, tests de services non exécutés. Captures référencées dans images/, non importées ni réputées autorisées par leur seule publicité.

## Enterprise BI Dashboard

[Dépôt et README](https://github.com/bassem2002/enterprise-bi-dashboard). EnterpriseBIDashboard.csproj : net8.0 et ADOMD.NET ; appsettings.json examiné avec valeurs omises.

- Preuves : [SsasService.cs](https://github.com/bassem2002/enterprise-bi-dashboard/blob/HEAD/Services/SsasService.cs), ISsasService.cs, Controllers/DashboardController.cs et wwwroot/js/dashboard.js.
- Utilisé : MDX centralisé, filtres multidimensionnels, traitement de la hiérarchie d'axe dans ROWS plutôt que duplication dans WHERE, repli des mesures calculées, endpoints JSON et Chart.js.
- Exclu : construction du cube/warehouse/ETL, Power BI, SSIS, disponibilité réelle du cube, chiffres métier inventés. Aucun projet de tests identifié.
- Limites : SSAS externe et schéma attendu ; authentification Windows/configuration de connexion selon environnement. Pas de screenshot public déclaré.

## MinDrawFX

[Dépôt et README](https://github.com/bassem2002/MinDrawFX). Pas de manifeste Maven/Gradle ; dépendances JavaFX et JAR SQLite documentées.

- Preuves : [CommandManager](https://github.com/bassem2002/MinDrawFX/blob/HEAD/src/command/CommandManager.java), controller/MainController.java, decorator/ShapeDecorator.java, service/ShapePersistenceService.java, repository/SQLiteShapeRepository.java et factories.
- Utilisé : Undo/Redo par piles, effets Decorator, factories, repository SQLite/JDBC, alternative texte et export PNG.
- Exclu : dessin vectoriel professionnel complet, déplacement/redimensionnement/couches, tests JUnit ou build automatisé. Observer actualise historique/statut/logs ; aucun rafraîchissement du canvas ne lui est attribué.
- Limites : lancement JavaFX manuel ; fidélité de la persistance non vérifiée à l'exécution. Aucune capture inventée.

## Waste Classification

[Dépôt et README](https://github.com/bassem2002/waste-classification-deep-learning), requirements.txt et [cellules du notebook](https://github.com/bassem2002/waste-classification-deep-learning/blob/HEAD/waste_classification_resnet50.ipynb).

- Utilisé : images RGB 48×48, augmentation, ResNet50, adaptation binaire, blocs denses personnalisés, couches de transition, concaténation/addition de caractéristiques, EarlyStopping et ModelCheckpoint.
- Exclu : DenseNet complet préentraîné, modèle supérieur démontré, accuracy nouvelle, classification des labels O/R interprétée sans preuve, pipeline MLOps.
- Limites : données/poids externes ; appel d'instanciation p_m_dechets2 commenté ; imports pandas/seaborn absents du requirements examiné ; Colab/Drive. Validation ML distincte des tests logiciels, aucune réexécution.

## Housing Insurance Claim Prediction

[Dépôt et README](https://github.com/bassem2002/housing-insurance-claim-prediction), requirements.txt, src/{data_preprocessing,train,evaluate}.py, run_pipeline.py et notebook référencé.

- Utilisé : imputation/encodage, Random Forest, Gradient Boosting, SMOTE/SMOTETomek, seuils, métriques et CLI.
- Exclu : nouveaux scores, modèle universellement meilleur, validation indépendante, dataset client republié.
- Limites : seuils choisis avec labels de test, prétraitement hors folds, désaccords notebook/CSV, dataset absent et dépendances non verrouillées. Aucun test automatisé identifié.

## English–French Seq2Seq

[Dépôt et README](https://github.com/bassem2002/pytorch-en-fr-seq2seq), requirements.txt et english_french_seq2seq_pytorch.ipynb.

- Utilisé : vocabulaire word-level, tokens spéciaux/padding, DataLoader, encodeur/décodeur LSTM, teacher forcing, perte ignorant le padding, gradient clipping, validation et décodage glouton.
- Exclu : Transformer, attention, LLM, qualité de traduction ou benchmark certifiés.
- Limites : corpus externe, petits vocabulaires et séquences courtes ; poids sans pipeline de vocabulaire complet, dépendances non épinglées. Aucun test logiciel identifié, notebook non exécuté.

## Smart Trade Manager

[Dépôt et README](https://github.com/bassem2002/smart_trade_manager), pubspec.yaml ; lib/main.dart et lib/services/{ml_service,firebase_database,auth_service}.dart.

- Utilisé : Flutter, Firebase Auth/Realtime Database, cache persistant, produits/fournisseurs/expéditions, OCR, codes et traduction ML Kit sur appareil.
- Exclu : CRUD complet fournisseurs/expéditions, backend IA entraîné, fonctionnement natif testé ou règles Firebase auditées.
- Limites : configuration Firebase et appareil ; aucun test unit/widget/intégration identifié. Références images/ présentes, non importées.

## ShopFlow

[Dépôt et README](https://github.com/bassem2002/ShopFlow-Full-Stack-E-Commerce-Platform). Shopflow/Shopflow/pom.xml et Shopflow/shopflow_front/package.json.

- Preuves : [OrderServiceImpl](https://github.com/bassem2002/ShopFlow-Full-Stack-E-Commerce-Platform/blob/HEAD/Shopflow/Shopflow/src/main/java/com/shopflow/shopflow/service/impl/OrderServiceImpl.java), OrderController, SecurityConfig et FirebaseConfig.
- Utilisé : rôles admin/vendeur/client, variantes, stock, panier, coupons, commandes transactionnelles et restitution du stock à l'annulation ; JWT/Firebase ; PostgreSQL/H2.
- Exclu : paiement bancaire réel, atomicité/concurrence certifiée, tests métier déclarés à partir de seuls scénarios README. ShopflowApplicationTests contient contextLoads.
- Limites : paiement réel absent, tests principalement squelette ; captures référencées non importées.

## JobConnect

[Dépôt et README](https://github.com/bassem2002/JobConnect). composer.json/package.json ; ApplicationController, JobOfferController, routes/web.php et middleware ; tests/Feature/Auth/AuthenticationTest.php et ProfileTest.php.

- Utilisé : offres, CV/candidatures, statuts, notifications, modération et validation des entreprises, sessions Breeze, Eloquent/MySQL.
- Exclu : moteur de matching IA, suite de tests métier complète ou envoi réel de notifications vérifié.
- Limites : tests auth/profil issus de Breeze, parcours métier non exécutés. Captures docs/screenshots référencées non importées.

## RestaurantManagementDotNet

[Dépôt et README](https://github.com/bassem2002/RestaurantManagementDotNet). Backend/Backend.csproj, Front/Front.csproj ; Backend/Controllers/AccountController.cs, Data/AppDbContext.cs, Program.cs et Repository/Implementations/Payment.cs.

- Utilisé : API ASP.NET Core, Blazor WebAssembly, Identity/JWT, création de panier à l'inscription, rôles, EF Core et SQL Server/LocalDB.
- Exclu : passerelle bancaire réelle déduite du CRUD Payment, tests automatisés ou déploiement validés.
- Limites : configuration API locale, aucun projet de tests dédié identifié. Le build réussi déclaré dans le README n'est pas revendiqué comme exécuté dans cet audit.

## SchoolManagementMERN

[Dépôt et README](https://github.com/bassem2002/SchoolManagementMERN). backend/frontend package.json ; controllers/authControllers.js, middlewares/verifyToken.js, models/lesson.js et backend/test/security.test.js.

- Utilisé : groupes, matières, salles, séances, documents, calendriers par rôle, JWT/autorisation, React/Redux et MongoDB/Mongoose.
- Exclu : absence totale de tests recopiée du README : le fichier de tests de sécurité existe. Ni conformité de sécurité globale ni couverture métier complète revendiquées.
- Limites : tests ciblés backend, application non exécutée ; médias images/ référencés sans autorisation de republication déduite.

## Java Network Communication Suite

[Dépôt et README](https://github.com/bassem2002/JavaNetworkCommunicationSuite). Pas de manifeste automatisé ; tcp_mini_project/Serveur.java, udp_mini_projet/ServeurUDP_Multi.java et MuiltiCastMiniProjet/Server.java.

- Utilisé : sockets TCP/UDP/multicast, handlers multi-client, flux binaires et réception hors thread UI JavaFX.
- Exclu : transport chiffré, identité authentifiée, fiabilité UDP équivalente à TCP et retransmission multicast garantie.
- Limites : TLS/auth absents, lancement réseau manuel, limitations de fragmentation/réémission documentées. Aucun test identifié.

## EventPlanner

[Dépôt et README](https://github.com/bassem2002/EventPlanner). composer.json/package.json ; Users/BwRegistrationController.php, Admin/BwEventController.php, routes/web.php et tests/Feature/ExampleTest.php.

- Utilisé : Laravel/Blade, Eloquent/MySQL, sessions, rôles, inscriptions avec recherche de doublons et annulation avec contrôle du propriétaire.
- Exclu : workflow complet d'approbation ou réservation concurrente certifiée ; une vidéo publique n'est pas une autorisation de republication.
- Limites : tests de squelette, traitements principalement en contrôleurs ; captures/vidéo référencées non intégrées.

## Règles transversales

Les descriptions courtes, longues et highlights sont dans src/data/project-narratives.ts ; fonctionnalités/limites restent dans les sources FR/EN existantes. Aucun contenu technique n'établit une contribution personnelle : myContributions reste vide. Aucun screenshot ou média source n'est copié. Les mentions de limites sur carte restent brèves ; les détails sont conservés dans les études. Les trois documents d'audit ne sont pas publiés dans dist/.

## V3.1 — audit des démos vidéo, 16 octobre 2026

Lecture anonyme des 14 README via raw.githubusercontent.com : HTTP 200 pour chaque dépôt. Recherche des liens Drive/YouTube, fichiers vidéo et sections demo/video/demonstration/presentation/walkthrough. Quatre liens réels trouvés ; aucune vidéo créée à partir d’une section placeholder. Les sources restent évolutives (HEAD). Ces constats complètent et remplacent le statut antérieur « démos absentes » pour les quatre projets concernés.

| Project | Video demo | Provider | Video source | URL | Added to portfolio |
|---|---|---|---|---|---|
| Rezouette | YES | google-drive | [README](https://github.com/bassem2002/rezouette-social-media-saas/blob/HEAD/README.md) | [Vidéo](https://drive.google.com/file/d/1sUsT_SoCW7xMoSCSIlbmOnX9BkbYMIC6/view?usp=sharing) | YES |
| SmartAlumni IIT | YES | google-drive | [README](https://github.com/bassem2002/smartalumni-iit/blob/HEAD/README.md) | [Vidéo](https://drive.google.com/file/d/1j74wpRJeC8yzun8rzkfKVTZCarL3RZ1l/view?usp=sharing) | YES |
| Enterprise BI Dashboard | NO | — | [README](https://github.com/bassem2002/enterprise-bi-dashboard/blob/HEAD/README.md) | — | NO |
| MinDrawFX | NO | — | [README](https://github.com/bassem2002/MinDrawFX/blob/HEAD/README.md) | — | NO |
| Waste Classification | NO | — | [README](https://github.com/bassem2002/waste-classification-deep-learning/blob/HEAD/README.md) | — | NO |
| Housing Insurance Claim Prediction | NO | — | [README](https://github.com/bassem2002/housing-insurance-claim-prediction/blob/HEAD/README.md) | — | NO |
| English–French Seq2Seq | NO | — | [README](https://github.com/bassem2002/pytorch-en-fr-seq2seq/blob/HEAD/README.md) | — | NO |
| Smart Trade Manager | NO | — | [README](https://github.com/bassem2002/smart_trade_manager/blob/HEAD/README.md) | — | NO |
| ShopFlow | NO | — | [README](https://github.com/bassem2002/ShopFlow-Full-Stack-E-Commerce-Platform/blob/HEAD/README.md) | — | NO |
| JobConnect | NO | — | [README](https://github.com/bassem2002/JobConnect/blob/HEAD/README.md) | — | NO |
| RestaurantManagementDotNet | NO | — | [README](https://github.com/bassem2002/RestaurantManagementDotNet/blob/HEAD/README.md) | — | NO |
| SchoolManagementMERN | YES | google-drive | [README](https://github.com/bassem2002/SchoolManagementMERN/blob/HEAD/README.md) | [Vidéo](https://drive.google.com/file/d/1Uy4cN5VlgvYhHsBc-llL0Ot4zzAh-6TL/view?usp=sharing) | YES |
| Java Network Communication Suite | NO | — | [README](https://github.com/bassem2002/JavaNetworkCommunicationSuite/blob/HEAD/README.md) | — | NO |
| EventPlanner | YES | google-drive | [README](https://github.com/bassem2002/EventPlanner/blob/HEAD/README.md) | [Vidéo](https://drive.google.com/file/d/1n4wYXKcO70Brjbpre_zxXekASekbVXlZ/view?usp=drive_link) | YES |

### Accessibilité publique des quatre liens

- **Rezouette** : label README « Watch the Rezouette Demo ». URL [Drive](https://drive.google.com/file/d/1sUsT_SoCW7xMoSCSIlbmOnX9BkbYMIC6/view?usp=sharing). Sans cookies ni connexion : HTTP 200, titre « demo finale.mp4 - Google Drive », métadonnée video/mp4, aucune page de demande d’accès détectée. Vérifié le 16 octobre 2026.
- **SmartAlumni IIT** : label README « Watch the SmartAlumni IIT Demo ». URL [Drive](https://drive.google.com/file/d/1j74wpRJeC8yzun8rzkfKVTZCarL3RZ1l/view?usp=sharing). Sans cookies ni connexion : HTTP 200, titre « pfa-demo.mp4 - Google Drive », métadonnée video/mp4, aucune page de demande d’accès détectée. Vérifié le 16 octobre 2026.
- **SchoolManagementMERN** : label README « Watch the full demo on Google Drive ». URL [Drive](https://drive.google.com/file/d/1Uy4cN5VlgvYhHsBc-llL0Ot4zzAh-6TL/view?usp=sharing). Sans cookies ni connexion : HTTP 200, titre « Ecole demo - Google Drive », métadonnée video/mp4, aucune page de demande d’accès détectée. Vérifié le 16 octobre 2026.
- **EventPlanner** : label README « Watch Demo — EventPlanner ». URL [Drive](https://drive.google.com/file/d/1n4wYXKcO70Brjbpre_zxXekASekbVXlZ/view?usp=drive_link). Sans cookies ni connexion : HTTP 200, titre « montage application gestion des evenements.mp4 - Google Drive », métadonnée video/mp4, aucune page de demande d’accès détectée. Vérifié le 16 octobre 2026.

La vérification porte sur l’ouverture anonyme de la page de prévisualisation, pas sur une lecture intégrale ni sur toutes les restrictions réseau possibles. Les noms de fichiers sont génériques pour certaines vidéos ; leur association au projet repose sur le lien explicite de son README. Aucun téléchargement, réhébergement ou iframe. Les liens s’ouvrent volontairement dans un nouvel onglet avec noopener noreferrer.

ShopFlow, RestaurantManagementDotNet et Java Network Communication Suite contiennent des sections proposant une future vidéo, sans URL : ces sections ne constituent pas des démos vérifiées. Pour les autres projets sans lien, NO signifie « aucun lien vidéo trouvé dans le README relu », pas « aucune vidéo ne peut exister ailleurs ». Les copies de README et les réponses Drive sont conservées uniquement dans .qa/v3-1/, exclues du build.
