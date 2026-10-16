import type { Localized } from '../types/content.ts';
interface Phase { title: Localized; body: Localized }
interface CaseStory { title: Localized; featuresTitle: Localized; architectureTitle: Localized; phases: readonly Phase[] }
const t = (fr: string, en: string): Localized => ({ fr, en });
export const caseStories: Readonly<Record<string, CaseStory>> = {
  rezouette: {
    title: t('Un cycle, plusieurs fournisseurs.', 'One lifecycle, multiple providers.'),
    featuresTitle: t('Le cycle de publication', 'The publishing lifecycle'),
    architectureTitle: t('Les frontières du backend', 'Backend boundaries'),
    phases: [
      { title: t('Connecter', 'Connect'), body: t('Le compte social passe par un flux OAuth propre au fournisseur, avec PKCE selon la plateforme.', 'A social account goes through a provider-specific OAuth flow, with PKCE where applicable.') },
      { title: t('Planifier', 'Schedule'), body: t('Le contenu et sa date sont persistés. Le traitement des publications dues fait évoluer leur état avant l’appel externe.', 'Content and its schedule are persisted. Processing due posts transitions their state before the external call.') },
      { title: t('Publier et suivre', 'Publish and track'), body: t('L’adaptateur traite la cible ; l’historique conserve succès ou échec. Les mocks ne prouvent pas la validation réelle du fournisseur.', 'An adapter handles the target; history records success or failure. Mocks do not establish live provider validation.') },
    ],
  },
  smartalumni: {
    title: t('Analyser un document. Classer des mentors.', 'Analyse a document. Rank mentors.'),
    featuresTitle: t('Le parcours étudiant–Alumni', 'The student–Alumni journey'),
    architectureTitle: t('Deux traitements, deux responsabilités', 'Two processes, separate responsibilities'),
    phases: [
      { title: t('Extraire le document', 'Extract the document'), body: t('Tika transforme le CV en texte. DeepSeek aide à structurer les champs ; un fallback local reste distinct.', 'Tika turns a CV into text. DeepSeek helps structure fields; a separate local fallback is available.') },
      { title: t('Relire le profil', 'Review the profile'), body: t('Les informations extraites peuvent être relues et validées avant de renseigner le profil utilisateur.', 'Extracted information can be reviewed and approved before populating the user profile.') },
      { title: t('Trouver un mentor', 'Find a mentor'), body: t('Le service de recommandation compare les profils par critères pondérés. Demandes et conversations prolongent la mise en relation.', 'The recommendation service compares profiles using weighted criteria. Requests and conversations support the mentoring relationship.') },
    ],
  },
  'enterprise-bi-dashboard': {
    title: t('Des filtres aux mesures multidimensionnelles.', 'From filters to multidimensional measures.'),
    featuresTitle: t('Les vues d’analyse', 'Analytical views'),
    architectureTitle: t('Le trajet d’une requête OLAP', 'The path of an OLAP query'),
    phases: [
      { title: t('Choisir les dimensions', 'Choose dimensions'), body: t('Les filtres partagés sélectionnent les membres du cube par année, produit, client ou fournisseur.', 'Shared filters select cube members by year, product, customer or supplier.') },
      { title: t('Construire le MDX', 'Build MDX'), body: t('SsasService combine mesures, axes et filtres, puis ADOMD.NET interroge le cube externe.', 'SsasService combines measures, axes and filters, then ADOMD.NET queries the external cube.') },
      { title: t('Restituer les mesures', 'Present measures'), body: t('Les résultats sont mappés vers les réponses JSON et Chart.js ; disponibilité et schéma SSAS restent des prérequis.', 'Results are mapped to JSON responses and Chart.js; SSAS availability and the expected schema remain prerequisites.') },
    ],
  },
  'min-draw-fx': {
    title: t('Chaque geste modifie un état.', 'Every action changes state.'),
    featuresTitle: t('Les opérations de l’éditeur', 'Editor operations'),
    architectureTitle: t('Commandes, formes et persistance', 'Commands, shapes and persistence'),
    phases: [
      { title: t('Créer une forme', 'Create a shape'), body: t('Une factory crée rectangle, cercle ou ligne. Les décorateurs composent les effets autour de la forme.', 'A factory creates a rectangle, circle or line. Decorators compose effects around the shape.') },
      { title: t('Rendre l’action réversible', 'Make the action reversible'), body: t('Command encapsule dessin et suppression ; CommandManager conserve les piles Undo/Redo et notifie ses observateurs.', 'Command encapsulates drawing and deletion; CommandManager maintains Undo/Redo stacks and notifies observers.') },
      { title: t('Sauvegarder ou exporter', 'Persist or export'), body: t('Le repository SQLite sauvegarde les formes ; un adaptateur distinct exporte le canvas JavaFX en PNG.', 'The SQLite repository saves shapes; a separate adapter exports the JavaFX canvas to PNG.') },
    ],
  },
  'waste-classification': {
    title: t('Assembler un classifieur à partir de caractéristiques.', 'Build a classifier from extracted features.'),
    featuresTitle: t('Les étapes de l’expérimentation', 'Steps in the experiment'),
    architectureTitle: t('Extraction et fusion des caractéristiques', 'Feature extraction and fusion'),
    phases: [
      { title: t('Préparer les images', 'Prepare images'), body: t('Des datasets RGB sont préparés avec augmentation : rotation, zoom et retournement horizontal.', 'RGB datasets are prepared with augmentation: rotation, zoom and horizontal flips.') },
      { title: t('Adapter les caractéristiques', 'Adapt features'), body: t('ResNet50 et des poids externes servent une adaptation binaire ; une construction explore des blocs denses et des fusions.', 'ResNet50 and external weights support binary adaptation; another construction explores dense blocks and fusion.') },
      { title: t('Définir la validation', 'Define validation'), body: t('Le code prévoit validation, EarlyStopping et checkpoints. Données externes et instanciation commentée empêchent de promettre une exécution immédiate.', 'The code defines validation, EarlyStopping and checkpoints. External data and commented instantiation prevent claiming an immediate complete run.') },
    ],
  },
};
