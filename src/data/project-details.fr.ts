// French editorial source keyed by stable project ID. No metrics or personal
// contributions are inferred from project features. English writing is Phase 8.
export interface FrenchProjectDetails {
  shortTitle?: string;
  problem: string;
  features: readonly string[];
  limitations: readonly string[];
  skills: readonly string[];
  experienceReference?: string;
}
export const projectDetailsFr: Readonly<Record<string, FrenchProjectDetails>> = {
  rezouette: {
    problem: 'Regrouper les connexions à plusieurs plateformes sociales et le suivi des publications dans une interface commune.',
    features: [
      'Connexion de comptes sociaux via OAuth 2.0, avec PKCE pour les intégrations concernées.',
      'Gestion de contenus et workflows de publication immédiate ou programmée.',
      'Historique des publications et suivi de leurs états.',
      'Backend NestJS, persistance Prisma/PostgreSQL et interface Angular.',
      'Tests backend Jest avec dépendances et fournisseurs externes simulés.',
    ],
    limitations: ['TikTok, LinkedIn et YouTube nécessitent encore une validation avec les fournisseurs réels.', 'Authentification applicative et gestion multi-rôles non implémentées.'],
    skills: ['rest', 'layered-architecture', 'clean-architecture-principles', 'mock-testing'],
    experienceReference: 'systeo-2026',
  },
  smartalumni: {
    problem: 'Faciliter la recherche de mentors, les demandes de mentorat et les échanges au sein d’un réseau Alumni.',
    features: [
      'Gestion des profils étudiants, Alumni et administrateurs avec authentification JWT.',
      'Recherche de mentors, demandes de mentorat et gestion de leur statut.',
      'Conversations et historique des messages.',
      'Extraction documentaire avec Apache Tika et analyse assistée via DeepSeek API, avec fallback local.',
      'Recommandation de mentors selon des règles et des critères pondérés.',
      'Fonctions d’administration et tests JUnit/Mockito des services CV et recommandation.',
    ],
    limitations: ['Le matching des mentors est fondé sur des règles ; il ne s’agit pas d’un modèle ML entraîné.', 'Analyse assistée dépendante d’un service externe ; tests concentrés sur les services backend.'],
    skills: ['rest', 'rbac', 'layered-architecture', 'document-analysis', 'weighted-matching', 'mock-testing'],
  },
  'enterprise-bi-dashboard': {
    problem: 'Présenter les mesures multidimensionnelles d’un cube SSAS dans une interface de consultation et de filtrage.',
    features: [
      'Indicateurs de ventes, achats et mesures calculées OLAP.',
      'Filtres globaux et vues analytiques par produits, clients, fournisseurs et dates.',
      'Construction des requêtes MDX dans un service SSAS centralisé utilisant ADOMD.NET.',
      'Endpoints JSON consommés par les visualisations Chart.js.',
      'États d’erreur et de données absentes lorsque le cube ou une mesure est indisponible.',
    ],
    limitations: ['Le cube SSAS et les scripts de déploiement du warehouse ne sont pas inclus.', 'Les analyses dépendent du schéma et de la disponibilité du cube externe.'],
    skills: ['olap', 'kpi', 'mvc'],
  },
  'min-draw-fx': {
    problem: 'Organiser un éditeur graphique extensible en séparant interactions, formes, commandes et persistance.',
    features: [
      'Création, sélection et suppression de rectangles, cercles et lignes.',
      'Annulation et rétablissement des commandes avec Undo/Redo.',
      'Effets appliqués aux formes via des décorateurs.',
      'Sauvegarde et chargement des dessins avec SQLite/JDBC.',
      'Export du canvas JavaFX au format PNG.',
      'Command, Decorator, Observer et Factory dans une architecture MVC avec services et repositories.',
    ],
    limitations: ['JavaFX doit être configuré manuellement pour lancer l’application.', 'Aucun test automatisé identifié dans le dépôt audité.'],
    skills: ['oop', 'mvc', 'repository-pattern', 'command-pattern', 'decorator-pattern', 'observer-pattern', 'factory-pattern', 'solid-principles'],
  },
  'waste-classification': {
    problem: 'Étudier l’adaptation de réseaux convolutifs préentraînés et de blocs personnalisés à une tâche de classification d’images.',
    features: [
      'Extraction de caractéristiques avec ResNet50 et adaptation à une classification binaire.',
      'Augmentation des images par rotation, zoom et retournement horizontal.',
      'Blocs denses et couches de transition inspirés de DenseNet, avec fusion de caractéristiques.',
      'Code d’entraînement avec Early Stopping et sauvegarde des meilleurs poids.',
    ],
    limitations: ['Le dataset et certains poids externes sont nécessaires.', 'L’initialisation de p_m_dechets2 est commentée ; une exécution complète exige de préparer le notebook.'],
    skills: ['cnn', 'transfer-learning', 'fine-tuning', 'data-augmentation', 'early-stopping', 'model-checkpointing'],
  },
  'housing-insurance': {
    shortTitle: 'Housing Insurance',
    problem: 'Comparer des approches de classification pour identifier les contrats associés à un sinistre, en tenant compte du déséquilibre des classes.',
    features: [
      'Analyse exploratoire, nettoyage, imputation, encodage et préparation des variables.',
      'Comparaison de Random Forest et Gradient Boosting.',
      'Rééquilibrage avec SMOTE et SMOTETomek.',
      'Notebook, modules Python et interface de lancement en ligne de commande.',
    ],
    limitations: ['Dataset non distribué ; résultats historiques non reproduits lors de l’audit.', 'Choix de seuil effectué sur le jeu de test et écarts entre résultats du notebook et du CSV.'],
    skills: ['eda', 'preprocessing', 'binary-classification', 'model-comparison', 'data-mining'],
  },
  'english-french-seq2seq': {
    shortTitle: 'English–French Seq2Seq',
    problem: 'Mettre en œuvre les étapes d’une traduction neuronale, de la préparation des phrases à la génération de tokens français.',
    features: [
      'Construction des vocabulaires, tokenisation, padding et préparation des séquences.',
      'Encodeur et décodeur LSTM dans un modèle Seq2Seq.',
      'Entraînement avec teacher forcing et calcul de perte de validation.',
      'Génération par décodage glouton et sauvegarde des poids du modèle.',
    ],
    limitations: ['Dataset de traduction non inclus.', 'Vocabulaire non sauvegardé avec les poids ; qualité de traduction non validée indépendamment.'],
    skills: ['seq2seq', 'encoder-decoder', 'teacher-forcing', 'greedy-decoding', 'preprocessing'],
  },
  'smart-trade-manager': {
    problem: 'Associer le suivi de produits, fournisseurs et expéditions à des outils mobiles de lecture et de traduction de documents.',
    features: [
      'Authentification Firebase et synchronisation via Firebase Realtime Database.',
      'Écrans de consultation et d’ajout de produits, fournisseurs et expéditions.',
      'Reconnaissance de texte et lecture de codes QR/barres avec Google ML Kit.',
      'Identification de langue et traduction sur l’appareil.',
      'Préférences locales et interface multilingue français, anglais et arabe.',
    ],
    limitations: ['Les opérations de modification et de suppression ne sont pas complètes pour tous les modules.', 'Configuration Firebase externe et capacités natives requises.'],
    skills: ['ocr', 'barcode-scanning', 'language-detection', 'on-device-translation'],
  },
  shopflow: {
    problem: 'Organiser les parcours client, vendeur et administrateur autour du catalogue et des commandes.',
    features: [
      'Rôles administrateur, vendeur et client.',
      'Catalogue avec catégories, variantes, stock et avis produits.',
      'Panier persistant, coupons et création de commandes.',
      'Traitement des commandes et du stock dans une transaction Spring.',
      'Authentification JWT et intégration Firebase Authentication.',
    ],
    limitations: ['Aucun service externe de paiement intégré.', 'Tests métier non présents ; seul un test de contexte Spring est identifié.'],
    skills: ['rest', 'rbac', 'layered-architecture', 'transactions'],
  },
  jobconnect: {
    problem: 'Relier candidats et recruteurs tout en permettant l’administration des offres, des comptes et des candidatures.',
    features: [
      'Parcours candidat, entreprise/recruteur et administrateur.',
      'Publication et modération des offres, dépôt de candidatures et gestion de CV.',
      'Recherche, offres sauvegardées et notifications.',
      'Administration des utilisateurs, catégories, offres et signalements.',
    ],
    limitations: ['Tests d’authentification et de profil issus de Laravel Breeze.', 'Workflows d’offres, de candidatures et de modération non couverts par des tests métier.'],
    skills: ['mvc', 'rbac'],
  },
  'restaurant-management': {
    shortTitle: 'Restaurant Management .NET',
    problem: 'Relier le parcours de commande des clients à l’administration du catalogue et au suivi des commandes.',
    features: [
      'Inscription, connexion et rôles avec ASP.NET Core Identity et JWT.',
      'Gestion du catalogue et des catégories.',
      'Panier et parcours de commandes côté client Blazor.',
      'Accès aux données par repositories et Entity Framework Core.',
    ],
    limitations: ['Adresse de l’API configurée pour un environnement local.', 'Aucun projet dédié de tests automatisés identifié.'],
    skills: ['rest', 'rbac', 'repository-pattern'],
  },
  'school-management': {
    shortTitle: 'School Management MERN',
    problem: 'Centraliser les ressources et l’organisation scolaire dans des interfaces adaptées aux rôles.',
    features: [
      'Authentification JWT et accès adaptés aux rôles administrateur, professeur et élève.',
      'Gestion des groupes, matières, salles et sessions.',
      'Calendriers et tableaux de bord par rôle.',
      'Upload de documents avec Multer et contrôles de type et de taille.',
      'État client React/Redux et tests backend sur l’authentification et les autorisations.',
    ],
    limitations: ['Tests concentrés sur la sécurité backend ; couverture complète des parcours non démontrée.'],
    skills: ['rest', 'rbac', 'layered-architecture'],
    experienceReference: 'systeo-2025',
  },
  'java-network-communication': {
    shortTitle: 'Java Network Suite',
    problem: 'Comparer les mécanismes de communication client/serveur et de diffusion à un groupe dans des applications réseau.',
    features: [
      'Serveur multi-client et communications publiques ou privées.',
      'Transfert de fichiers et de médias.',
      'Modules TCP, UDP et diffusion multicast IPv4.',
      'Interfaces JavaFX et traitement concurrent des connexions.',
    ],
    limitations: ['Configuration réseau et lancement manuels.', 'Aucun test automatisé identifié.'],
    skills: ['tcp', 'udp', 'ipv4-multicast', 'multithreading'],
  },
  eventplanner: {
    problem: 'Centraliser la consultation des événements et les inscriptions dans une application web à accès contrôlé.',
    features: [
      'Gestion des événements, catégories et images.',
      'Consultation des événements et gestion des inscriptions.',
      'Gestion des utilisateurs et contrôle d’accès administrateur/utilisateur.',
      'Vues Blade et persistance Eloquent dans une architecture MVC Laravel.',
    ],
    limitations: ['Workflow dédié d’approbation des événements non confirmé.', 'Seuls les tests Laravel de squelette sont identifiés.'],
    skills: ['mvc', 'rbac'],
  },
};
