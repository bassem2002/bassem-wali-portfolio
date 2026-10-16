import type { Localized } from '../types/content.ts';
export interface ProjectNarrative {
  shortDescription: Localized;
  longDescription: Localized;
  angle: Localized;
  highlights: Localized<readonly string[]>;
  technicalHighlights: Localized<readonly string[]>;
  cardNote?: Localized;
  authentication?: Localized;
  database?: Localized;
  aiOrDataComponents?: Localized;
}
const t = (fr: string, en: string): Localized => ({ fr, en });
const list = (fr: readonly string[], en: readonly string[]): Localized<readonly string[]> => ({ fr, en });

// Editorial synthesis of README + inspected implementations. Source paths and
// exclusions are maintained in docs/project-content-sources.md, never in the UI.
export const projectNarratives: Readonly<Record<string, ProjectNarrative>> = {
  rezouette: {
    angle: t('OAuth & orchestration sociale', 'OAuth & publishing workflows'),
    shortDescription: t('Plateforme NestJS/Angular de publication sociale : comptes OAuth, contenus immédiats ou programmés et historique persistant, avec des intégrations isolées par fournisseur.', 'NestJS/Angular social publishing platform with OAuth account connections, immediate or scheduled posts and persistent history, using provider-specific integrations.'),
    longDescription: t('Rezouette réunit connexion des comptes, préparation des contenus, calendrier et suivi des publications. Le backend répartit ces parcours entre cas d’usage, contrats et adaptateurs ; les publications dues sont traitées par lots, avec un état propre à chaque tentative.', 'Rezouette brings account connections, content preparation, a calendar and publication tracking together. The backend separates use cases, contracts and adapters; due posts are processed in batches with state recorded for each attempt.'),
    highlights: list(['Comptes connectés via OAuth / PKCE', 'Planification et suivi des états', 'Adaptateurs et tests avec mocks'], ['OAuth / PKCE account connections', 'Scheduling and publication states', 'Provider adapters and mocked tests']),
    technicalHighlights: list(['La transition vers PROCESSING précède les appels externes ; une erreur de publication ne bloque pas le reste du lot.', 'Les analytics agrègent l’historique local des publications, sans prétendre mesurer l’engagement de tous les réseaux.'], ['Posts transition to PROCESSING before external calls; a publication failure does not stop the remaining batch.', 'Analytics aggregate local publication history rather than claiming live engagement data from every network.']),
    authentication: t('OAuth des fournisseurs, avec PKCE selon la plateforme. L’authentification applicative et le multi-rôle ne sont pas implémentés.', 'Provider OAuth, with PKCE where applicable. Application-level authentication and multi-role access are not implemented.'),
    database: t('PostgreSQL via Prisma : comptes sociaux, médias, publications et planifications.', 'PostgreSQL through Prisma for social accounts, media, publications and schedules.'),
    cardNote: t('Certaines intégrations attendent une validation réelle.', 'Some integrations still need live validation.'),
  },
  smartalumni: {
    angle: t('Du document au mentor', 'From document to mentor'),
    shortDescription: t('Plateforme Spring Boot/Angular de mentorat : extraction de CV avec Tika, analyse assistée DeepSeek, validation du profil, classement pondéré des mentors et conversations.', 'Spring Boot/Angular mentoring platform with Tika CV extraction, DeepSeek-assisted analysis, profile review, weighted mentor ranking and conversations.'),
    longDescription: t('Les parcours étudiants, Alumni et administrateurs couvrent profils, recherche, demandes et messagerie. L’analyse documentaire aide à renseigner un profil ; un service distinct compare les profils et classe les mentors selon des critères pondérés.', 'Student, Alumni and administrator workflows cover profiles, discovery, requests and messaging. Document analysis helps populate a profile; a separate service compares profiles and ranks mentors using weighted criteria.'),
    highlights: list(['CV → Tika → DeepSeek → profil relu', 'Matching par critères pondérés', 'Demandes de mentorat et messagerie'], ['CV → Tika → DeepSeek → reviewed profile', 'Matching through weighted criteria', 'Mentoring requests and messaging']),
    technicalHighlights: list(['Un fallback local par règles et mots-clés accompagne l’extraction assistée.', 'Le classement des mentors est indépendant de DeepSeek ; ce n’est pas un modèle de recommandation ML entraîné.'], ['A local rules-and-keyword fallback supports assisted extraction.', 'Mentor ranking is separate from DeepSeek; it is not a trained ML recommendation model.']),
    authentication: t('Spring Security et JWT, avec rôles étudiant, Alumni et administrateur.', 'Spring Security and JWT with student, Alumni and administrator roles.'),
    database: t('PostgreSQL et Spring Data JPA pour profils, demandes et conversations.', 'PostgreSQL and Spring Data JPA for profiles, requests and conversations.'),
    aiOrDataComponents: t('Tika extrait le texte ; DeepSeek aide à structurer les informations, relues avant validation. Le matching utilise des règles.', 'Tika extracts text; DeepSeek helps structure information for review before approval. Matching uses rules.'),
    cardNote: t('Analyse assistée dépendante d’une API externe.', 'Assisted analysis depends on an external API.'),
  },
  'enterprise-bi-dashboard': {
    angle: t('Du filtre à la mesure OLAP', 'From filter to OLAP measure'),
    shortDescription: t('Dashboard ASP.NET Core MVC interrogeant un cube SSAS via ADOMD.NET : requêtes MDX centralisées, filtres multidimensionnels, mesures calculées et restitution Chart.js.', 'ASP.NET Core MVC dashboard querying an SSAS cube through ADOMD.NET, with centralised MDX, multidimensional filters, calculated measures and Chart.js views.'),
    longDescription: t('Les vues de ventes, achats, produits, clients et fournisseurs partagent les mêmes filtres. SsasService construit les requêtes MDX et mappe les résultats ; le contrôleur expose des réponses JSON consommées par les graphiques.', 'Sales, purchases, product, customer and supplier views share a common set of filters. SsasService builds MDX and maps results; the controller exposes JSON responses consumed by the charts.'),
    highlights: list(['Requêtes MDX et filtres partagés', 'Mesures calculées du cube SSAS', 'ADOMD.NET → JSON → Chart.js'], ['MDX queries and shared filters', 'Calculated SSAS cube measures', 'ADOMD.NET → JSON → Chart.js']),
    technicalHighlights: list(['Un filtre portant sur la hiérarchie de l’axe est appliqué à ROWS pour éviter sa présence simultanée dans le slicer.', 'Les mesures calculées disposent d’un repli requête par requête lorsque leur récupération groupée échoue.'], ['A filter on the axis hierarchy is applied to ROWS to avoid placing that hierarchy in the slicer as well.', 'Calculated measures fall back to individual queries when the grouped request fails.']),
    database: t('Cube SSAS multidimensionnel externe. Le warehouse, l’ETL et le déploiement du cube ne sont pas inclus.', 'External SSAS Multidimensional cube. The warehouse, ETL and cube deployment are not included.'),
    aiOrDataComponents: t('Analyse OLAP, mesures calculées et filtres par membres MDX ; aucun composant IA revendiqué.', 'OLAP analysis, calculated measures and MDX member filters; no AI component is claimed.'),
    cardNote: t('Cube SSAS externe requis.', 'External SSAS cube required.'),
  },
  'min-draw-fx': {
    angle: t('Des gestes aux commandes réversibles', 'From gestures to reversible commands'),
    shortDescription: t('Éditeur 2D JavaFX : actions annulables avec Command, effets composés avec Decorator, sauvegarde par repository SQLite et export PNG.', 'JavaFX 2D editor with reversible Command actions, composable Decorator effects, SQLite repository persistence and PNG export.'),
    longDescription: t('Rectangles, cercles et lignes passent par des factories ; dessin et suppression sont encapsulés en commandes. Le contrôleur coordonne le canvas, l’historique et les services, tandis que la persistance reste derrière un contrat de repository.', 'Factories create rectangles, circles and lines; drawing and deletion are encapsulated as commands. The controller coordinates the canvas, history and services, while persistence sits behind a repository contract.'),
    highlights: list(['Piles Undo / Redo avec Command', 'Effets composables avec Decorator', 'Repository SQLite et export PNG'], ['Command-based Undo / Redo stacks', 'Composable Decorator effects', 'SQLite repository and PNG export']),
    technicalHighlights: list(['Observer notifie les changements de commandes pour l’historique, le statut et les logs.', 'Factory sépare la création des formes ; le repository sépare leur sauvegarde des interactions.'], ['Observer reports command changes to history, status and logging.', 'Factory separates shape creation; the repository separates persistence from interactions.']),
    database: t('SQLite/JDBC, avec une alternative de persistance dans un fichier texte.', 'SQLite/JDBC with an alternative text-file persistence implementation.'),
    cardNote: t('Projet d’architecture ; tests automatisés absents.', 'Architecture project; no automated tests identified.'),
  },
  'waste-classification': {
    angle: t('Transfert & fusion de caractéristiques', 'Transfer learning & feature fusion'),
    shortDescription: t('Notebook TensorFlow/Keras explorant la classification binaire de déchets avec des caractéristiques ResNet50, augmentation des images et blocs CNN inspirés de DenseNet.', 'TensorFlow/Keras notebook exploring binary waste classification with ResNet50 features, image augmentation and DenseNet-inspired CNN blocks.'),
    longDescription: t('Un modèle ResNet50 chargé avec des poids externes sert de base à une adaptation binaire. Une seconde construction explore la fusion de caractéristiques avec des blocs denses personnalisés et des couches de transition ; le notebook définit entraînement, validation et callbacks.', 'A ResNet50 model loaded with external weights provides a basis for binary adaptation. A second construction explores feature fusion with custom dense blocks and transition layers; the notebook defines training, validation and callbacks.'),
    highlights: list(['ResNet50 et adaptation binaire', 'Blocs denses et fusion de branches', 'Augmentation, EarlyStopping et checkpoints'], ['ResNet50 and binary adaptation', 'Dense blocks and branch fusion', 'Augmentation, EarlyStopping and checkpoints']),
    technicalHighlights: list(['Le modèle personnalisé combine des portions de ResNet50, concaténations et addition de caractéristiques ; ce n’est pas un DenseNet préentraîné complet.', 'Le code de préparation charge des images RGB de 48 × 48 pixels et prépare des datasets TensorFlow.'], ['The custom model combines ResNet50 stages, concatenations and feature addition; it is not a complete pretrained DenseNet.', 'Preparation code loads 48 × 48 RGB images and constructs TensorFlow datasets.']),
    aiOrDataComponents: t('Transfert d’apprentissage et fine-tuning exploratoires, classifieur binaire et validation ML distincte des tests logiciels.', 'Exploratory transfer learning and fine-tuning, binary classification and ML validation distinct from software testing.'),
    cardNote: t('Données et poids externes ; notebook non réexécuté.', 'External data and weights; notebook not rerun.'),
  },
  'housing-insurance': {
    angle: t('Classes déséquilibrées & seuils', 'Class imbalance & decision thresholds'),
    shortDescription: t('Pipeline Scikit-learn de classification de sinistres : prétraitement, Random Forest, Gradient Boosting, rééquilibrage SMOTETomek et étude des seuils de décision.', 'Scikit-learn insurance claim classification pipeline covering preprocessing, Random Forest, Gradient Boosting, SMOTETomek rebalancing and decision thresholds.'),
    longDescription: t('Notebook, modules Python et CLI organisent nettoyage, imputation, encodage, entraînement et évaluation. Les comparaisons explorent le compromis entre identification des sinistres et erreurs de classification, avec des limites méthodologiques documentées.', 'A notebook, Python modules and CLI organise cleaning, imputation, encoding, training and evaluation. Comparisons explore the trade-off between identifying claims and classification errors, with documented methodological limitations.'),
    highlights: list(['Prétraitement et CLI Python', 'Random Forest / Gradient Boosting'], ['Preprocessing and Python CLI', 'Random Forest / Gradient Boosting']),
    technicalHighlights: list(['SMOTE/SMOTETomek et seuils sont explorés ; la sélection sur les labels de test limite l’interprétation des résultats.'], ['SMOTE/SMOTETomek and thresholds are explored; selection using test labels limits the interpretation of results.']),
    aiOrDataComponents: t('Classification supervisée, déséquilibre de classes et métriques de classification ; aucune nouvelle performance annoncée.', 'Supervised classification, class imbalance and classification metrics; no new performance result claimed.'),
    cardNote: t('Dataset externe ; réserves de validation.', 'External dataset; validation caveats.'),
  },
  'english-french-seq2seq': {
    angle: t('Encodeur-décodeur LSTM', 'LSTM encoder–decoder'),
    shortDescription: t('Traducteur anglais–français PyTorch : vocabulaire au niveau des mots, encodeur-décodeur LSTM, apprentissage avec teacher forcing et génération par décodage glouton.', 'PyTorch English–French translator with word-level vocabularies, an LSTM encoder–decoder, teacher-forced training and greedy decoding.'),
    longDescription: t('Le notebook prépare les séquences, entraîne un modèle Seq2Seq et suit la perte de validation. Il montre une chaîne pédagogique complète, du texte aux tokens générés, sans attention ni Transformer.', 'The notebook prepares sequences, trains a Seq2Seq model and tracks validation loss. It demonstrates an educational workflow from text to generated tokens, without attention or a Transformer.'),
    highlights: list(['Tokenisation, padding et DataLoader', 'Teacher forcing et décodage glouton'], ['Tokenisation, padding and DataLoader', 'Teacher forcing and greedy decoding']),
    technicalHighlights: list(['La perte ignore le padding ; gradient clipping et checkpoints accompagnent l’entraînement.'], ['Loss ignores padding; training includes gradient clipping and checkpoints.']),
    aiOrDataComponents: t('NLP neuronal avec embeddings et LSTM ; petits vocabulaires et séquences courtes.', 'Neural NLP with embeddings and LSTMs; small vocabularies and short sequences.'),
    cardNote: t('Corpus externe ; qualité non reproduite.', 'External corpus; quality not reproduced.'),
  },
  'smart-trade-manager': {
    angle: t('Mobile, synchronisation & ML Kit', 'Mobile, sync & ML Kit'),
    shortDescription: t('Application Flutter de suivi des produits, fournisseurs et expéditions, combinant synchronisation Firebase, OCR, scan QR/barres et traduction sur l’appareil avec ML Kit.', 'Flutter app for products, suppliers and shipments, combining Firebase synchronisation with ML Kit OCR, QR/barcode scanning and on-device translation.'),
    longDescription: t('Les écrans mobiles s’appuient sur des services Firebase et ML Kit dédiés. Images de la caméra ou de la galerie alimentent extraction de texte et lecture de codes ; la traduction identifie la langue source avant traitement sur l’appareil.', 'Mobile screens use dedicated Firebase and ML Kit services. Camera or gallery images feed text extraction and code scanning; translation identifies the source language before processing on the device.'),
    highlights: list(['Firebase Realtime Database', 'OCR, codes et traduction locale'], ['Firebase Realtime Database', 'OCR, codes and on-device translation']),
    technicalHighlights: list(['Les services isolent authentification, flux de données et capacités natives ; le cache Firebase peut persister hors ligne.'], ['Services separate authentication, data streams and native capabilities; Firebase caching can persist offline.']),
    authentication: t('Firebase Authentication.', 'Firebase Authentication.'), database: t('Firebase Realtime Database.', 'Firebase Realtime Database.'),
    aiOrDataComponents: t('Google ML Kit : OCR, lecture de codes, identification de langue et traduction sur l’appareil.', 'Google ML Kit: OCR, code scanning, language identification and on-device translation.'),
    cardNote: t('Configuration Firebase et appareil requis.', 'Firebase configuration and device required.'),
  },
  shopflow: {
    angle: t('Commandes & stock transactionnels', 'Transactional orders & inventory'),
    shortDescription: t('E-commerce multi-rôle Spring Boot/Angular : variantes et stocks, panier, coupons et commandes transactionnelles, avec authentification JWT/Firebase et persistance PostgreSQL.', 'Multi-role Spring Boot/Angular commerce app with variants, stock, carts, coupons and transactional orders, JWT/Firebase authentication and PostgreSQL persistence.'),
    longDescription: t('Les parcours administrateur, vendeur et client partagent un catalogue avec variantes. Le service de commande vérifie et décrémente le stock, calcule les montants et traite l’annulation avec restitution du stock.', 'Administrator, seller and customer workflows share a catalogue with variants. The order service checks and decrements inventory, calculates totals and handles cancellation with stock restoration.'),
    highlights: list(['Variantes, coupons et commandes', 'Stock traité dans une transaction Spring'], ['Variants, coupons and orders', 'Stock handled in a Spring transaction']),
    technicalHighlights: list(['Le service distingue stock produit et stock de variante lors de la création et de l’annulation.'], ['The service distinguishes product and variant inventory during order creation and cancellation.']),
    authentication: t('Spring Security, JWT et intégration Firebase Authentication.', 'Spring Security, JWT and Firebase Authentication integration.'), database: t('PostgreSQL via Spring Data JPA ; configuration H2 également présente.', 'PostgreSQL through Spring Data JPA; an H2 configuration is also present.'),
    cardNote: t('Aucune passerelle de paiement réelle intégrée.', 'No real payment gateway integrated.'),
  },
  jobconnect: {
    angle: t('Candidatures & modération', 'Applications & moderation'),
    shortDescription: t('Plateforme Laravel de recrutement : offres modérées, candidatures avec CV, traitement recruteur, notifications et accès contrôlés selon les rôles et le statut des comptes.', 'Laravel recruitment platform with moderated listings, CV applications, recruiter processing, notifications and access controlled by role and account status.'),
    longDescription: t('Candidats, entreprises et administrateurs suivent des parcours distincts. Les contrôleurs gèrent offres, candidatures, CV, notifications et signalements ; les middleware prennent en compte rôle, statut et validation de l’entreprise.', 'Applicants, companies and administrators follow separate workflows. Controllers manage listings, applications, CVs, notifications and reports; middleware considers role, status and company approval.'),
    highlights: list(['CV, candidatures et suivi des statuts', 'Validation des entreprises et offres'], ['CVs, applications and status tracking', 'Company and listing approval']),
    technicalHighlights: list(['Les candidatures et documents sont reliés aux offres et à leur entreprise ; les accès distinguent candidat, recruteur et administrateur.'], ['Applications and documents are tied to listings and their company; access distinguishes applicants, recruiters and administrators.']),
    authentication: t('Sessions Laravel Breeze et middleware de rôle/statut.', 'Laravel Breeze sessions and role/status middleware.'), database: t('MySQL et relations Eloquent.', 'MySQL and Eloquent relationships.'),
  },
  'restaurant-management': {
    angle: t('API .NET & client Blazor', '.NET API & Blazor client'),
    shortDescription: t('Application de commande pour restaurant associant API ASP.NET Core, client Blazor WebAssembly, Identity/JWT et repositories EF Core sur SQL Server.', 'Restaurant ordering application combining an ASP.NET Core API, Blazor WebAssembly client, Identity/JWT and EF Core repositories on SQL Server.'),
    longDescription: t('Le client et l’API partagent des modèles pour le catalogue, le panier et les commandes. Identity gère les utilisateurs et rôles ; les repositories encapsulent l’accès aux entités relationnelles.', 'The client and API share models for the catalogue, cart and orders. Identity manages users and roles; repositories encapsulate access to relational entities.'),
    highlights: list(['Client Blazor et API séparés', 'Identity, JWT et repositories EF Core'], ['Separate Blazor client and API', 'Identity, JWT and EF Core repositories']),
    technicalHighlights: list(['L’inscription attribue le rôle Client et crée son panier ; les données Payment ne constituent pas une passerelle bancaire.'], ['Registration assigns the Client role and creates a cart; Payment records do not constitute a banking gateway.']),
    authentication: t('ASP.NET Core Identity et JWT, rôles Admin/Client.', 'ASP.NET Core Identity and JWT, Admin/Client roles.'), database: t('SQL Server / LocalDB avec Entity Framework Core.', 'SQL Server / LocalDB with Entity Framework Core.'),
  },
  'school-management': {
    angle: t('Séances, ressources & accès par rôle', 'Sessions, resources & role-based access'),
    shortDescription: t('Plateforme React/Express organisant groupes, matières, salles, séances et documents pédagogiques, avec calendriers par rôle, JWT, autorisations et état client Redux.', 'React/Express platform for groups, subjects, rooms, sessions and learning documents, with role-specific calendars, JWT, authorisation and Redux client state.'),
    longDescription: t('Administrateurs, enseignants et étudiants disposent de parcours liés aux mêmes entités scolaires MongoDB. Les services et middleware Express portent les traitements et accès ; React présente calendriers, ressources et tableaux de bord.', 'Administrators, teachers and students use workflows backed by shared MongoDB school entities. Express services and middleware handle processing and access; React presents calendars, resources and dashboards.'),
    highlights: list(['Calendriers et documents pédagogiques', 'Rôles Admin / Teacher / Student'], ['Learning calendars and documents', 'Admin / Teacher / Student roles']),
    technicalHighlights: list(['Des tests Node ciblent JWT, mots de passe et autorisations, malgré une mention contraire dans le README.'], ['Node tests target JWT, passwords and authorisation, despite a contrary statement in the README.']),
    authentication: t('JWT et middleware d’autorisation par rôle et statut.', 'JWT and role/status authorisation middleware.'), database: t('MongoDB avec schémas et relations Mongoose.', 'MongoDB with Mongoose schemas and relationships.'),
  },
  'java-network-communication': {
    angle: t('TCP, UDP & diffusion multicast', 'TCP, UDP & multicast delivery'),
    shortDescription: t('Suite Java/JavaFX comparant messagerie TCP multi-client, échanges UDP et distribution multicast de médias, avec threads réseau et mises à jour de l’interface séparés.', 'Java/JavaFX suite comparing multi-client TCP messaging, UDP exchanges and multicast media distribution, separating network threads from UI updates.'),
    longDescription: t('Trois modules illustrent des modèles de communication distincts : connexions TCP avec handlers clients, datagrammes UDP et diffusion à un groupe multicast. Les clients JavaFX combinent messages, fichiers et traitement réseau en arrière-plan.', 'Three modules illustrate distinct communication models: TCP connections with client handlers, UDP datagrams and multicast group delivery. JavaFX clients combine messages, files and background network processing.'),
    highlights: list(['Trois modèles de communication', 'Sockets, threads et interfaces JavaFX'], ['Three communication models', 'Sockets, threads and JavaFX interfaces']),
    technicalHighlights: list(['Le transfert TCP utilise des flux binaires ; les mécanismes UDP/multicast ne garantissent pas la retransmission.'], ['TCP transfer uses binary streams; the UDP/multicast mechanisms do not guarantee retransmission.']),
    cardNote: t('Projet pédagogique, sans TLS ni authentification.', 'Educational project without TLS or authentication.'),
  },
  eventplanner: {
    angle: t('Événements & inscriptions', 'Events & registrations'),
    shortDescription: t('Application Laravel/Blade de gestion d’événements et d’inscriptions : accès participant/administrateur, prévention des doublons, annulation et administration des événements.', 'Laravel/Blade event and registration app with participant/administrator access, duplicate-registration checks, cancellation and event administration.'),
    longDescription: t('Les modèles Eloquent relient utilisateurs, événements, catégories et inscriptions. Les contrôleurs portent les parcours d’inscription et d’annulation, avec des vues Blade et des middleware de rôle.', 'Eloquent models connect users, events, categories and registrations. Controllers implement registration and cancellation workflows, with Blade views and role middleware.'),
    highlights: list(['Inscriptions, annulation et contrôle des doublons', 'MVC Laravel et relations Eloquent'], ['Registration, cancellation and duplicate checks', 'Laravel MVC and Eloquent relationships']),
    technicalHighlights: list(['L’annulation vérifie que l’inscription appartient à l’utilisateur connecté ; aucun workflow complet d’approbation n’est revendiqué.'], ['Cancellation checks that the registration belongs to the signed-in user; no complete approval workflow is claimed.']),
    authentication: t('Authentification par sessions Laravel et middleware de rôle.', 'Laravel session authentication and role middleware.'), database: t('MySQL et Eloquent.', 'MySQL and Eloquent.'),
  },
};
