import { site } from '../config/site.ts';
import type { Profile } from '../types/content.ts';

export const profile = {
  name: 'Bassem Wali',
  headline: { fr: 'Développement logiciel & Full-Stack', en: 'Software Engineering & Full-Stack Development' },
  secondaryHeadline: { fr: 'Business Intelligence · Intelligence artificielle', en: 'Business Intelligence · Artificial Intelligence' },
  status: { fr: 'Élève ingénieur en génie informatique', en: 'Computer Engineering Student' },
  location: { fr: 'France', en: 'France' },
  summary: {
    fr: 'Je développe des applications Full-Stack et des APIs, avec des projets en architecture logicielle, Business Intelligence et intelligence artificielle.',
    en: 'I build Full-Stack applications and APIs, with projects in software architecture, Business Intelligence and artificial intelligence.',
  },
  academicLine: { fr: 'IIT · Échange académique à ESIGELEC, Rouen', en: 'IIT · Academic exchange at ESIGELEC, Rouen' },
  about: { fr: [
    'J’aime comprendre ce qui se passe derrière une interface : comment le code s’organise, comment les données circulent et comment un choix technique simplifie l’usage.',
    'Je cherche un stage pour apprendre au contact d’une équipe et contribuer à un logiciel utile, avec une attention particulière à la clarté et à la maintenabilité.',
  ], en: [
    'I like understanding what happens behind an interface: how code is organised, how data flows and how a technical choice makes something easier to use.',
    'I am looking for an internship where I can learn alongside a team and contribute to useful software, with particular attention to clarity and maintainability.',
  ] },
  availability: { fr: 'À la recherche d’un stage en développement logiciel, Full-Stack, Backend, Business Intelligence ou IA / Machine Learning.', en: 'Seeking an internship in Software Development, Full-Stack, Backend, Business Intelligence or AI / Machine Learning.' },
  contactMessage: { fr: 'Pour échanger sur une opportunité de stage ou un projet, contactez-moi par email ou sur LinkedIn.', en: 'For internship opportunities or to discuss a project, contact me by email or on LinkedIn.' },
  internshipFocus: {
    fr: ['Développement logiciel', 'Full-Stack', 'Backend', 'Business Intelligence', 'IA / Machine Learning'],
    en: ['Software Engineering', 'Full-Stack', 'Backend', 'Business Intelligence', 'AI / Machine Learning'],
  },
  email: 'welibassem079@gmail.com',
  phone: { display: '+33 7 51 24 55 31', e164: '+33751245531', publicationApproved: true },
  links: { github: 'https://github.com/bassem2002', linkedin: 'https://www.linkedin.com/in/bassem-wali' },
  languages: [{ fr: 'Arabe', en: 'Arabic' }, { fr: 'Français', en: 'French' }, { fr: 'Anglais', en: 'English' }],
  cv: { path: site.cvPath, publicVersionApproved: false },
  portrait: {
    source: 'src/assets/portrait.png',
    alt: { fr: 'Portrait de Bassem Wali', en: 'Portrait of Bassem Wali' },
    approved: true,
  },
} satisfies Profile;
