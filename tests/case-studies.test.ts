import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { projects } from '../src/data/projects.ts';
import { relatedProjects } from '../src/utils/related-projects.ts';

const directory = 'src/content/case-studies/fr';
const studies = readdirSync(directory).filter(name => name.endsWith('.md')).map(name => {
  const text = readFileSync(`${directory}/${name}`, 'utf8');
  return { text, slug: text.match(/^projectSlug: (.+)$/m)?.[1], published: /^draft: false$/m.test(text) };
});
test('exactly five French featured studies publish at the requested routes', () => {
  assert.equal(studies.filter(study => study.published).length, 5);
  const expected = ['rezouette', 'smartalumni-iit', 'enterprise-bi-dashboard', 'mindrawfx', 'waste-classification'];
  assert.deepEqual(studies.filter(study => study.published).map(study => study.slug).sort(), [...expected].sort());
  for (const study of studies) assert.ok(projects.find(project => project.slug === study.slug)?.featured);
  assert.match(readFileSync('src/content/case-studies/en/rezouette.md', 'utf8'), /^draft: false$/m);
});
test('studies have unique metadata, repository evidence, diagrams, decisions and honest limitations', () => {
  const titles = new Set();
  for (const study of studies) {
    const project = projects.find(project => project.slug === study.slug)!;
    const title = study.text.match(/^title: "(.+)"$/m)?.[1];
    assert.ok(title);
    assert.ok(!titles.has(title));
    titles.add(title);
    assert.match(study.text, /^description: ".+"$/m);
    assert.match(study.text, /^locale: fr$/m);
    assert.ok(study.text.includes(project.githubUrl));
    assert.match(study.text, /^diagrams:\n/m);
    assert.match(study.text, /^    description: ".+"$/m);
    assert.match(study.text, /^## Décisions techniques$/m);
    assert.match(study.text, /^## (Tests et vérification|Expérimentations et vérification)$/m);
    assert.match(study.text, /^## Limites actuelles$/m);
    assert.doesNotMatch(study.text, /\uFFFD|\d+(?:[.,]\d+)?\s*%|## (Ma contribution|My Contribution)/);
    const decisions = study.text.split('## Décisions techniques')[1]!.split('\n## ')[0]!;
    assert.ok((decisions.match(/^### /gm)?.length ?? 0) >= 2);
    assert.ok((decisions.match(/^### /gm)?.length ?? 0) <= 4);
    const limitations = study.text.split('## Limites actuelles')[1]!;
    assert.ok((limitations.match(/^- /gm)?.length ?? 0) >= 3);
    assert.ok((limitations.match(/^- /gm)?.length ?? 0) <= 6);
  }
});
test('related projects use shared verified evidence, exclude self and keep editorial ties', () => {
  for (const project of projects.filter(project => project.featured)) {
    const related = relatedProjects(project, projects);
    assert.ok(related.length >= 2 && related.length <= 3);
    assert.equal(new Set(related.map(item => item.project.id)).size, related.length);
    for (const item of related) {
      assert.notEqual(item.project.id, project.id);
      assert.ok(projects.includes(item.project));
      assert.ok(item.technologies.length + item.categories.length > 0);
      assert.ok(item.technologies.every(id => project.technologies.includes(id) && item.project.technologies.includes(id)));
      assert.ok(item.categories.every(id => project.categories.includes(id) && item.project.categories.includes(id)));
    }
  }
  assert.deepEqual(relatedProjects(projects[0]!, projects, 2).map(item => item.project.id), ['smartalumni', 'shopflow']);
  assert.equal(relatedProjects(projects.find(project => project.id === 'min-draw-fx')!, projects)[0]?.project.id, 'java-network-communication');
  const waste = relatedProjects(projects.find(project => project.id === 'waste-classification')!, projects).map(item => item.project.id);
  assert.ok(waste.includes('housing-insurance') && waste.includes('english-french-seq2seq'));
  assert.deepEqual(relatedProjects(projects[0]!, [projects[0]!]), []);
});
test('sensitive distinctions remain explicit in editorial content', () => {
  const text = (slug: string) => studies.find(study => study.slug === slug)!.text;
  assert.match(text('rezouette'), /historique local/);
  assert.match(text('rezouette'), /authentification des utilisateurs/i);
  assert.match(text('smartalumni-iit'), /sans modèle de recommandation ML entraîné/);
  assert.match(text('enterprise-bi-dashboard'), /ETL.*non inclus/);
  assert.match(text('waste-classification'), /n’a pas été réexécuté/);
  assert.match(text('waste-classification'), /Initialisation de `p_m_dechets2` commentée/);
});
