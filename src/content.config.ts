import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { projects } from '@/data/projects';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    projectSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .refine(slug => projects.some(project => project.slug === slug), 'Unknown project slug'),
    locale: z.enum(['fr', 'en']),
    title: z.string().min(1),
    description: z.string().min(1),
    draft: z.boolean().default(true),
    sources: z.array(z.url()).min(1),
    heroTechnologies: z.array(z.string()).max(6).optional(),
    overview: z.string().optional(),
    diagrams: z.array(z.object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      title: z.string(),
      description: z.string(),
      steps: z.array(z.string()).min(2).max(7),
    })).optional(),
    demonstratedSkills: z.array(z.string()).optional(),
  }).superRefine((study, context) => {
    if (study.draft) return;
    const project = projects.find(project => project.slug === study.projectSlug);
    if (!study.overview?.trim() || !study.heroTechnologies?.length || !study.diagrams?.length || !study.demonstratedSkills?.length) {
      context.addIssue({ code: 'custom', message: 'Published studies require overview, hero technologies, diagrams and demonstrated skills' });
    }
    if (project && (!study.heroTechnologies?.every(id => project.technologies.includes(id)) || !study.demonstratedSkills?.every(id => project.relatedSkills.includes(id)))) {
      context.addIssue({ code: 'custom', message: 'Study technologies and skills must be supported by the project' });
    }
    if (new Set(study.diagrams?.map(diagram => diagram.id)).size !== study.diagrams?.length) {
      context.addIssue({ code: 'custom', message: 'Diagram IDs must be unique within a study' });
    }
  }),
});

export const collections = { caseStudies };
