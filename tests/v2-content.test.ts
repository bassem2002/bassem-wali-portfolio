import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projects } from '../src/data/projects.ts';
import { skills } from '../src/data/skills.ts';
import { profile } from '../src/data/profile.ts';
import { experiences } from '../src/data/experience.ts';
import { education } from '../src/data/education.ts';
import { engineeringFocus } from '../src/data/engineering-focus.ts';
import { validateContent } from '../src/utils/validate-content.ts';
import { projectVisuals } from '../src/data/project-visuals.ts';
import { caseStories } from '../src/data/case-stories.ts';
import { v2Copy } from '../src/i18n/v2.ts';

test('V2 validator rejects incomplete bilingual narratives, empty optional facts and invalid related IDs', () => {
  const data = { projects, skills, profile, experiences, education, engineeringFocus };
  const first = projects[0]!;
  for (const changes of [
    { longDescription: { ...first.longDescription, en: '' } },
    { highlights: { ...first.highlights, en: [] } },
    { authentication: { fr: 'OAuth', en: '' } },
    { relatedProjects: [first.id, 'unverified-project'] },
  ]) assert.ok(validateContent({ ...data, projects: [{ ...first, ...changes }, ...projects.slice(1)] }).length > 0);
  assert.deepEqual(validateContent(data), []);
  const sources = readFileSync('docs/project-content-sources.md', 'utf8');
  for (const project of projects) assert.ok(sources.includes(project.githubUrl), project.id);
});

test('V2 stories and explanatory graphics cover the same five projects in both languages without merging matching and AI', () => {
  const ids = projects.filter(project => project.featured).map(project => project.id).sort();
  assert.deepEqual(Object.keys(projectVisuals).sort(), ids);
  assert.deepEqual(Object.keys(caseStories).sort(), ids);
  for (const id of ids) {
    const visual = projectVisuals[id]!, story = caseStories[id]!;
    assert.equal(visual.labels.fr.length, visual.labels.en.length);
    assert.equal(story.phases.length, 3);
    for (const locale of ['fr', 'en'] as const) {
      assert.ok(visual.title[locale] && visual.description[locale]);
      assert.ok(story.phases.every(phase => phase.title[locale] && phase.body[locale]));
    }
  }
  assert.match(projectVisuals.smartalumni!.description.en, /not an ML model/);
  assert.match(projectVisuals['waste-classification']!.description.en, /not been rerun/);
  for (const key of ['hero', 'facts', 'project'] as const) assert.deepEqual(Object.keys(v2Copy.fr[key]).sort(), Object.keys(v2Copy.en[key]).sort());
});
