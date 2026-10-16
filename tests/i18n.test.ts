import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { projectDetailsFr } from '../src/data/project-details.fr.ts';
import { projectDetailsEn } from '../src/data/project-details.en.ts';
import { ui } from '../src/i18n/ui.ts';
import { pageCopy, formatMessage } from '../src/i18n/pages.ts';
import { homeByLocale } from '../src/data/home.ts';
import { profile } from '../src/data/profile.ts';
import { skills } from '../src/data/skills.ts';
import { skillName } from '../src/i18n/skills.ts';
import { switchLocation, alternatePath, localizedPath } from '../src/i18n/routes.ts';
import { pageSeo, personSchema, projectSchema } from '../src/utils/seo.ts';
import { validateStudyParity, type StudyForParity } from '../src/utils/i18n-parity.ts';

test('translation dictionaries have the same non-empty keys in both languages', () => {
  const compare = (fr: object, en: object) => {
    assert.deepEqual(Object.keys(fr).sort(), Object.keys(en).sort());
    for (const [key, value] of Object.entries(fr)) {
      const translated = (en as Record<string, unknown>)[key];
      if (typeof value === 'object') compare(value, translated as object);
      else {
        assert.ok(typeof value === 'string' && value.trim(), key);
        assert.ok(typeof translated === 'string' && translated.trim(), key);
      }
    }
  };
  compare(ui.fr, ui.en);
  compare(pageCopy.fr, pageCopy.en);
  compare(homeByLocale.fr, homeByLocale.en);
  assert.equal(formatMessage(pageCopy.en.countOne, { count: 1, total: 14 }), '1 project of 14');
  assert.equal(formatMessage(pageCopy.en.countMany, { count: 0, total: 14 }), '0 projects of 14');
  assert.throws(() => formatMessage('{missing}', {}), /Missing message value/);
});
test('all 14 projects have complete English facts while identity and technology stay shared', () => {
  assert.deepEqual(Object.keys(projectDetailsEn).sort(), Object.keys(projectDetailsFr).sort());
  assert.equal(projects.length, 14);
  for (const project of projects) {
    assert.ok(project.summary.en && project.problem.en);
    assert.notEqual(project.summary.en, project.summary.fr);
    assert.equal(project.features.en.length, project.features.fr.length);
    assert.equal(project.limitations.en.length, project.limitations.fr.length);
    assert.deepEqual(project.myContributions, []);
    for (const locale of ['fr', 'en'] as const) {
      assert.equal(projectSchema(project, locale).codeRepository, project.githubUrl);
      assert.equal(projectSchema(project, locale).description, project.summary[locale]);
      assert.equal(alternatePath(localizedPath(locale, `/projects/${project.slug}/`), 'en'), `/en/projects/${project.slug}/`);
    }
  }
  assert.equal(profile.about.fr.length, profile.about.en.length);
  assert.equal(personSchema('en').jobTitle, 'Computer Engineering Student');
  assert.deepEqual(personSchema('fr').sameAs, personSchema('en').sameAs);
  assert.ok(!JSON.stringify(personSchema('en')).includes('telephone'));
  assert.equal(profile.cv.publicVersionApproved, false);
  for (const skill of skills) assert.ok(skillName(skill.id, 'en'));
  assert.equal(skillName('spring-boot', 'en'), 'Spring Boot');
  assert.equal(skillName('oop', 'en'), 'Object-oriented Programming');
  assert.throws(() => skillName('not-a-skill', 'en'), /Unknown skill/);
});
test('contextual language switching preserves useful catalogue filters and stable anchors', () => {
  assert.equal(switchLocation('/', 'en'), '/en/');
  assert.equal(switchLocation('/en/', 'fr'), '/');
  assert.equal(switchLocation('/projects/mindrawfx/', 'en'), '/en/projects/mindrawfx/');
  assert.equal(switchLocation('/en/projects/rezouette/', 'fr'), '/projects/rezouette/');
  assert.equal(switchLocation('/projects/', 'en', '?technology=pytorch&category=nlp&q=LSTM&tracking=x'), '/en/projects/?category=nlp&technology=pytorch&q=LSTM');
  assert.equal(switchLocation('/en/', 'fr', '', '#skills'), '/#skills');
  assert.equal(switchLocation('/projects/rezouette/', 'en', '', '#décisions-techniques'), '/en/projects/rezouette/');
  assert.equal(switchLocation('/404.html', 'en'), '/en/404/');
  assert.equal(switchLocation('/en/404/', 'fr'), '/404.html');
});
test('canonical and hreflang follow the configured origin and locale', () => {
  // Reserved fixture origin, never written into the generated site.
  const origin = 'https://portfolio.example';
  for (const path of ['/', '/projects/', ...projects.map(project => `/projects/${project.slug}/`)]) {
    for (const locale of ['fr', 'en'] as const) {
      const route = localizedPath(locale, path);
      const seo = pageSeo(locale, route, 'Title', 'Description', origin);
      assert.equal(seo.canonical, origin + route);
      assert.deepEqual(seo.alternates, [{ lang: 'fr', url: origin + localizedPath('fr', path) }, { lang: 'en', url: origin + localizedPath('en', path) }]);
    }
  }
});
test('parity control rejects a missing locale, missing section and altered diagram topology', () => {
  const make = (locale: 'fr' | 'en'): StudyForParity => ({
    data: { projectSlug: 'example', locale, draft: false, sources: ['https://github.com/bassem2002/example'], heroTechnologies: ['java'], demonstratedSkills: ['java'], diagrams: [{ id: 'flow', steps: ['A', 'B'] }] },
    body: locale === 'fr' ? '## Décisions techniques\n### Choix\n## Tests et vérification\n## Limites actuelles\n- Limite' : '## Technical Decisions\n### Choice\n## Testing and Verification\n## Current Limitations\n- Limitation',
  });
  const fr = make('fr');
  const en = make('en');
  assert.deepEqual(validateStudyParity([fr, en], ['example']), []);
  assert.match(validateStudyParity([fr], ['example']).join(), /one published study per locale/);
  assert.match(validateStudyParity([fr, { ...en, body: en.body!.replace('## Testing and Verification', '') }], ['example']).join(), /parity mismatch|Missing important section/);
  assert.match(validateStudyParity([fr, { ...en, data: { ...en.data, diagrams: [{ id: 'flow', steps: ['A', 'B', 'C'] }] } }], ['example']).join(), /parity mismatch/);
  assert.match(validateStudyParity([fr, en], []).join(), /Unexpected published study/);
});
