import type { Locale } from '../types/content.ts';
const fr = {
  value: 'Je conçois des applications Full-Stack et des solutions data, de l’architecture logicielle à l’intelligence artificielle.',
  work: 'Une sélection de projets', workTitle: 'Du code. Des idées.\nDes projets concrets.',
  workDescription: 'Logiciel, données et produit : cinq façons de passer de l’idée à l’implémentation.',
  illustration: 'Concept visuel · illustration, pas une capture',
  social: 'Publication sociale', composer: 'Composer une publication', schedule: 'Planifier', accounts: 'Comptes connectés',
  mentor: 'Mentorat & intelligence CV', document: 'CV', profile: 'Profil structuré', matching: 'Matching pondéré', mentors: 'Profils mentors',
  analytics: 'Explorer les données', filters: 'Filtres multidimensionnels', measures: 'Mesures du cube',
  canvas: 'Un espace pour dessiner', layers: 'Calques', undo: 'Annuler',
  vision: 'Voir. Extraire. Classer.', features: 'Caractéristiques', fusion: 'Fusion CNN', classification: 'Classification',
  bi: 'BI / Analytics', ai: 'Intelligence artificielle', more: 'technologies supplémentaires',
};
type Copy = { [K in keyof typeof fr]: string };
export const v3Copy = { fr, en: {
  value: 'I build full-stack applications and data-driven solutions, from software architecture to artificial intelligence.',
  work: 'Selected work', workTitle: 'Code. Ideas.\nThings that work.',
  workDescription: 'Software, data and product: five ways to turn an idea into an implementation.',
  illustration: 'Visual concept · illustration, not a screenshot',
  social: 'Social publishing', composer: 'Compose a post', schedule: 'Schedule', accounts: 'Connected accounts',
  mentor: 'Mentoring & CV intelligence', document: 'CV', profile: 'Structured profile', matching: 'Weighted matching', mentors: 'Mentor profiles',
  analytics: 'Explore the data', filters: 'Multidimensional filters', measures: 'Cube measures',
  canvas: 'A space to create', layers: 'Layers', undo: 'Undo',
  vision: 'See. Extract. Classify.', features: 'Features', fusion: 'CNN fusion', classification: 'Classification',
  bi: 'BI / Analytics', ai: 'Artificial Intelligence', more: 'more technologies',
} } satisfies Record<Locale, Copy>;
