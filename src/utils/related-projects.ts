import type { Project } from '../types/content.ts';

/** Rank shared, verified technologies and categories; preserve editorial ties. */
export function relatedProjects(project: Project, catalogue: readonly Project[], limit = 3) {
  return catalogue.filter(candidate => candidate.id !== project.id).map(candidate => {
    const technologies = candidate.technologies.filter(id => project.technologies.includes(id));
    const categories = candidate.categories.filter(id => project.categories.includes(id));
    return { project: candidate, technologies, categories, score: technologies.length * 3 + categories.length * 2 };
  }).filter(relation => relation.score > 0).sort((a, b) => b.score - a.score).slice(0, limit);
}
