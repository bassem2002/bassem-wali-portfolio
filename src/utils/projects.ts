import { projects } from '../data/projects.ts';
import type { ProjectCategory, TechnologyId } from '../types/content.ts';

export const featuredProjects = () => projects.filter(project => project.featured);
export const projectBySlug = (slug: string) => projects.find(project => project.slug === slug);
export const projectById = (id: string) => projects.find(project => project.id === id);
export const projectsUsing = (technology: TechnologyId) => projects.filter(project => project.technologies.includes(technology));
export const projectsDemonstrating = (skill: TechnologyId) => projects.filter(project => project.relatedSkills.includes(skill));
export const projectsIn = (category: ProjectCategory) => projects.filter(project => project.categories.includes(category));
export const usedCategories = () => [...new Set(projects.flatMap(project => project.categories))];
export const usedTechnologies = () => [...new Set(projects.flatMap(project => project.technologies))];
