import type { Localized } from '../types/content.ts';

export const home = {
  title: 'Développement logiciel, Full-Stack & BI',
  description: 'Bassem Wali, élève ingénieur en France : projets Full-Stack, architecture logicielle, Business Intelligence et intelligence artificielle. À la recherche d’un stage.',
  sections: {
    projects: { title: 'Projets sélectionnés.', description: 'OAuth, OLAP, architecture objet et CNN : cinq projets pour explorer les mécanismes derrière les interfaces.' },
    expertise: { title: 'Du logiciel aux données.', description: 'Le développement logiciel est mon axe principal. La BI et l’intelligence artificielle complètent ce parcours à travers des projets concrets.' },
    skills: { title: 'La stack, reliée aux projets.', description: 'Choisissez une technologie pour retrouver les projets qui la mettent en œuvre.' },
    experience: { title: 'Expériences professionnelles.', description: 'Deux stages Full-Stack chez Systeo Digital et un projet de fin d’études chez Clinisys.' },
    education: { title: 'Formation.', description: 'Un parcours en informatique, spécialisé en Génie Logiciel et Informatique Décisionnelle.' },
    about: { title: 'Un profil logiciel et données.' },
    contact: { title: 'Un projet, un stage ou une opportunité à discuter ?' },
  },
};
export const homeByLocale = {
  fr: home,
  en: {
    title: 'Software Engineering, Full-Stack & BI',
    description: 'Bassem Wali, Computer Engineering student in France. Full-Stack, software architecture, Business Intelligence and artificial intelligence projects. Seeking an internship.',
    sections: {
      projects: { title: 'Selected work.', description: 'OAuth, OLAP, object-oriented architecture and CNNs: five projects exploring the mechanisms behind the interfaces.' },
      expertise: { title: 'From software to data.', description: 'Software development is my main focus. Business Intelligence and artificial intelligence broaden that work through practical projects.' },
      skills: { title: 'The stack, connected to the work.', description: 'Choose a technology to explore the projects that put it into practice.' },
      experience: { title: 'Professional Experience.', description: 'Two Full-Stack internships at Systeo Digital and a bachelor’s final-year project at Clinisys.' },
      education: { title: 'Education.', description: 'A background in computer science, specialising in Software Engineering and Business Intelligence.' },
      about: { title: 'A software and data background.' },
      contact: { title: 'Have a project, internship or opportunity to discuss?' },
    },
  },
} satisfies Record<'fr' | 'en', typeof home>;

export interface HomeSkillGroup { id: string; title: Localized; skillIds: readonly string[] }
export const homeEyebrows: Record<'fr' | 'en', readonly string[]> = {
  fr: ['Projets phares', 'Axes d’ingénierie', 'Compétences', 'Expériences', 'Parcours académique', 'À propos', 'Contact'],
  en: ['Featured Projects', 'Engineering Focus', 'Skills', 'Experience', 'Education', 'About', 'Contact'],
};
export const homeSkillGroups: readonly HomeSkillGroup[] = [
  { id: 'languages', title: { fr: 'Développement logiciel', en: 'Software Development' }, skillIds: ['java', 'csharp', 'typescript', 'python', 'sql'] },
  { id: 'backend', title: { fr: 'Backend', en: 'Backend' }, skillIds: ['nestjs', 'spring-boot', 'aspnet-core', 'express', 'laravel'] },
  { id: 'frontend-mobile', title: { fr: 'Frontend & mobile', en: 'Frontend & Mobile' }, skillIds: ['angular', 'react', 'flutter', 'javafx', 'blazor'] },
  { id: 'data', title: { fr: 'Données & persistance', en: 'Data & Persistence' }, skillIds: ['postgresql', 'mongodb', 'sql-server', 'prisma', 'ef-core'] },
  { id: 'bi', title: { fr: 'Business Intelligence', en: 'Business Intelligence' }, skillIds: ['ssas', 'mdx', 'adomd', 'olap', 'chartjs'] },
  { id: 'ai', title: { fr: 'Intelligence artificielle / Machine Learning', en: 'Artificial Intelligence / Machine Learning' }, skillIds: ['scikit-learn', 'tensorflow', 'pytorch', 'deepseek', 'ml-kit'] },
  { id: 'architecture-tools', title: { fr: 'Tests & outils', en: 'Testing & Tools' }, skillIds: ['mvc', 'command-pattern', 'jest', 'junit', 'mockito'] },
];

// Only a technology selection is curated; matches come from Project.technologies.
export const homeTechnologies = ['spring-boot', 'angular', 'ssas', 'tensorflow', 'pytorch', 'javafx', 'laravel', 'flutter'] as const;

export const homeCardTechnologies: Readonly<Record<string, readonly string[]>> = {
  rezouette: ['nestjs', 'angular', 'typescript', 'postgresql', 'prisma'],
  smartalumni: ['spring-boot', 'angular', 'postgresql', 'tika', 'deepseek'],
  'enterprise-bi-dashboard': ['csharp', 'aspnet-core', 'ssas', 'mdx', 'adomd', 'chartjs'],
  'min-draw-fx': ['java', 'javafx', 'fxml', 'sqlite', 'jdbc'],
  'waste-classification': ['python', 'tensorflow', 'keras', 'resnet50'],
};
