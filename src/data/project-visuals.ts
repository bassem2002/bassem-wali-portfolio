import type { Localized } from '../types/content.ts';
interface VisualCopy { title: Localized; description: Localized; labels: Localized<readonly string[]> }
export const projectVisuals: Readonly<Record<string, VisualCopy>> = {
  rezouette: {
    title: { fr: 'Du compte connecté à la publication', en: 'From connected account to publication' },
    description: { fr: 'Schéma explicatif : compte, OAuth/PKCE, contenu, planification, adaptateur fournisseur et suivi de publication. Pas une capture du produit.', en: 'Explanatory diagram: account, OAuth/PKCE, content, scheduling, provider adapter and publication tracking. Not a product screenshot.' },
    labels: { fr: ['Compte', 'OAuth / PKCE', 'Contenu', 'Planification', 'Adaptateur', 'Publié / échec'], en: ['Account', 'OAuth / PKCE', 'Content', 'Schedule', 'Adapter', 'Published / failed'] },
  },
  smartalumni: {
    title: { fr: 'Deux mécanismes, deux responsabilités', en: 'Two mechanisms, separate responsibilities' },
    description: { fr: 'Le CV est extrait par Tika puis analysé avec DeepSeek pour un profil relu. Séparément, les profils étudiant/Alumni alimentent un score pondéré et un classement de mentors ; ce matching n’est pas un modèle ML.', en: 'Tika extracts CV text and DeepSeek helps produce a reviewed profile. Separately, student/Alumni profiles feed weighted scoring and mentor ranking; this matching is not an ML model.' },
    labels: { fr: ['CV', 'Tika · texte', 'DeepSeek', 'Profil relu', 'Profils', 'Score pondéré', 'Mentors classés'], en: ['CV', 'Tika · text', 'DeepSeek', 'Reviewed profile', 'Profiles', 'Weighted score', 'Ranked mentors'] },
  },
  'enterprise-bi-dashboard': {
    title: { fr: 'Interroger des dimensions, restituer des mesures', en: 'Query dimensions, present measures' },
    description: { fr: 'Les filtres passent par ASP.NET Core et MDX, puis interrogent le cube SSAS via ADOMD.NET. Les résultats alimentent KPI et graphiques. Aucun chiffre métier représenté.', en: 'Filters pass through ASP.NET Core and MDX to query the SSAS cube through ADOMD.NET. Results feed KPIs and charts. No business values are represented.' },
    labels: { fr: ['Filtres', 'ASP.NET Core', 'MDX', 'Cube SSAS', 'OLAP', 'KPI / graphiques'], en: ['Filters', 'ASP.NET Core', 'MDX', 'SSAS cube', 'OLAP', 'KPIs / charts'] },
  },
  'min-draw-fx': {
    title: { fr: 'Une action, une commande réversible', en: 'An action, a reversible command' },
    description: { fr: 'Action de dessin vers Command et Undo/Redo ; formes décorées pour les effets visuels ; repository vers SQLite pour la persistance. Illustration des responsabilités, pas capture d’application.', en: 'Drawing actions become Commands with Undo/Redo; decorated shapes provide effects; a repository uses SQLite for persistence. An illustration of responsibilities, not an application screenshot.' },
    labels: { fr: ['Action', 'Command', 'Undo / Redo', 'Forme + effet', 'Repository', 'SQLite'], en: ['Action', 'Command', 'Undo / Redo', 'Shape + effect', 'Repository', 'SQLite'] },
  },
  'waste-classification': {
    title: { fr: 'De l’image aux caractéristiques', en: 'From image to features' },
    description: { fr: 'Pipeline conceptuel d’images, augmentation, caractéristiques ResNet50, fusion avec des blocs CNN inspirés de DenseNet et classification binaire. Le notebook nécessite des fichiers externes et n’a pas été réexécuté.', en: 'Conceptual pipeline of images, augmentation, ResNet50 features, fusion with DenseNet-inspired CNN blocks and binary classification. The notebook needs external files and has not been rerun.' },
    labels: { fr: ['Image RGB', 'Augmentation', 'ResNet50', 'Blocs CNN', 'Fusion', 'Classification'], en: ['RGB image', 'Augmentation', 'ResNet50', 'CNN blocks', 'Fusion', 'Classification'] },
  },
};
