import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { skills } from '../src/data/skills.ts';
import { experiences } from '../src/data/experience.ts';
import { profile } from '../src/data/profile.ts';
import { projectCategoryIds, locales } from '../src/types/content.ts';
import { localizedPath, alternatePath } from '../src/i18n/routes.ts';
import { education } from '../src/data/education.ts';
import { engineeringFocus } from '../src/data/engineering-focus.ts';
import { validateContent } from '../src/utils/validate-content.ts';
import { projectsDemonstrating } from '../src/utils/projects.ts';
import type { ProjectCategory } from '../src/types/content.ts';
import { homeSkillGroups, homeTechnologies, homeCardTechnologies } from '../src/data/home.ts';

test('projects have unique routes, valid references and complete translations', () => {
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map(project => project.slug)).size, projects.length);
  assert.equal(new Set(projects.map(project => project.githubUrl)).size, projects.length);
  const technologyIds = new Set(skills.map(skill => skill.id));
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(project.githubUrl, /^https:\/\/github\.com\/bassem2002\/[\w.-]+$/);
    assert.notEqual(project.githubUrl, profile.links.github + '/bassem2002');
    assert.ok(project.categories.length > 0);
    assert.ok(project.categories.every(category => projectCategoryIds.includes(category)));
    assert.ok(project.technologies.every(id => technologyIds.has(id)), project.title);
    assert.ok(project.evidence.length > 0);
    for (const locale of locales) {
      assert.ok(project.summary[locale].trim());
      assert.ok(project.limitations[locale].length > 0);
    }
    if (project.demo) {
      assert.equal(project.demo.publicAccessVerified, true);
      assert.equal(project.demo.republicationApproved, true);
    }
  }
  for (const experience of experiences) {
    if (experience.projectSlug) assert.ok(projects.some(project => project.slug === experience.projectSlug));
    assert.ok(experience.period.start <= experience.period.end);
  }
});

test('featured selection and technology evidence match approved decisions', () => {
  assert.deepEqual(projects.filter(project => project.featured).map(project => project.slug),
    ['rezouette', 'smartalumni-iit', 'enterprise-bi-dashboard', 'mindrawfx', 'waste-classification']);
  assert.deepEqual(projects.filter(project => project.technologies.includes('pytorch')).map(project => project.slug), ['english-french-seq2seq']);
  assert.deepEqual(projects.filter(project => project.technologies.includes('ssas')).map(project => project.slug), ['enterprise-bi-dashboard']);
  assert.deepEqual(projects.filter(project => project.technologies.includes('spring-boot')).map(project => project.slug), ['smartalumni-iit', 'shopflow']);
  assert.equal(projects.find(project => project.slug === 'housing-insurance')?.featured, false);
  assert.equal(projects.find(project => project.slug === 'smart-trade-manager')?.featured, false);
  assert.equal(profile.cv.publicVersionApproved, false);
  assert.ok(projects.every(project => !project.demo));
});

test('language switches preserve project route and normalize slashes', () => {
  assert.equal(localizedPath('fr'), '/');
  assert.equal(localizedPath('en'), '/en/');
  assert.equal(localizedPath('en', '/projects/'), '/en/projects/');
  assert.equal(alternatePath('/en/projects/rezouette/', 'fr'), '/projects/rezouette/');
  assert.equal(alternatePath('/projects/rezouette/', 'en'), '/en/projects/rezouette/');
  assert.equal(alternatePath('/en/', 'fr'), '/');
});

const content = { projects, skills, experiences, education, profile, engineeringFocus };
test('content validator rejects broken identities, URLs and cross references', () => {
  assert.deepEqual(validateContent(content), []);
  const first = projects[0];
  const second = projects[1];
  assert.ok(first && second);
  const replace = (changed: typeof first) => ({ ...content, projects: [changed, ...projects.slice(1)] });
  const faults = [
    { data: replace({ ...first, id: second.id }), error: /Project IDs: duplicate/ },
    { data: replace({ ...first, slug: second.slug }), error: /Project slugs: duplicate/ },
    { data: replace({ ...first, githubUrl: 'https://example.com/fake' }), error: /invalid GitHub URL/ },
    { data: replace({ ...first, githubUrl: second.githubUrl }), error: /repository does not match audit/ },
    { data: replace({ ...first, categories: ['invented-category' as ProjectCategory] }), error: /unknown category/ },
    { data: replace({ ...first, technologies: ['invented-technology'] }), error: /unknown\/unrelated technology/ },
    { data: replace({ ...first, featured: false }), error: /Featured count/ },
    { data: replace({ ...first, experienceReference: 'missing-experience' }), error: /invalid experience reference/ },
    { data: { ...content, skills: skills.map(skill => skill.id === 'pytorch' ? { ...skill, projectIds: ['waste-classification'] } : skill) }, error: /invalid project reference|inconsistent skill/ },
    { data: { ...content, engineeringFocus: engineeringFocus.map(focus => focus.id === 'bi' ? { ...focus, skillIds: ['pytorch'] } : focus) }, error: /unsupported focus skill/ },
  ];
  for (const fault of faults) assert.match(validateContent(fault.data).join('\n'), fault.error);
});

test('skills expose verified project IDs and editorial safeguards remain intact', () => {
  const relationships = {
    pytorch: ['english-french-seq2seq'], tensorflow: ['waste-classification'],
    ssas: ['enterprise-bi-dashboard'], javafx: ['min-draw-fx', 'java-network-communication'],
    laravel: ['jobconnect', 'eventplanner'],
  };
  for (const [id, expected] of Object.entries(relationships)) {
    assert.deepEqual(skills.find(skill => skill.id === id)?.projectIds, expected);
    assert.deepEqual(projectsDemonstrating(id).map(project => project.id), expected);
  }
  for (const project of projects) {
    assert.equal(new Set(project.relatedSkills).size, project.relatedSkills.length);
    assert.ok(project.technologies.every(id => project.relatedSkills.includes(id)));
    for (const locale of ['fr', 'en'] as const) {
      assert.equal(localizedPath(locale, '/projects/' + project.slug), `${locale === 'en' ? '/en' : ''}/projects/${project.slug}/`);
    }
    assert.deepEqual(project.myContributions, []);
    assert.deepEqual(project.screenshots, []);
    assert.equal(project.demo, null);
  }
  const housing = projects.find(project => project.id === 'housing-insurance');
  assert.ok(housing);
  assert.doesNotMatch(housing.summary.fr, /ROC.?AUC|F1|rappel|\d\s*%/i);
  assert.equal(experiences.find(experience => experience.id === 'clinisys-2024')?.projectSlug, undefined);
  assert.deepEqual(experiences.find(experience => experience.id === 'clinisys-2024')?.technologies,
    ['csharp', 'dotnet', 'sql', 'javascript', 'jquery', 'html', 'css']);
  assert.equal(profile.phone.publicationApproved, true);
  assert.equal(profile.phone.e164, '+33751245531');
});

test('homepage selection stays compact and references verified skills/technologies', () => {
  assert.ok(homeSkillGroups.length >= 5 && homeSkillGroups.length <= 7);
  for (const group of homeSkillGroups) {
    assert.ok(group.skillIds.length <= 6);
    assert.ok(group.skillIds.every(id => skills.some(skill => skill.id === id)));
  }
  for (const id of homeTechnologies) assert.ok(projects.some(project => project.technologies.includes(id)));
  for (const [id, technologies] of Object.entries(homeCardTechnologies)) {
    const project = projects.find(project => project.id === id);
    assert.ok(project?.featured);
    assert.ok(technologies.length >= 3 && technologies.length <= 6);
    assert.ok(technologies.every(id => project.technologies.includes(id)));
  }
});
