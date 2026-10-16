import test from 'node:test';
import assert from 'node:assert/strict';
import { engineeringFocus } from '../src/data/engineering-focus.ts';
import { education } from '../src/data/education.ts';
import { homeTechnologies } from '../src/data/home.ts';
import { projectsUsing } from '../src/utils/projects.ts';

test('four global engineering domains and seven signature technology relations match owner decisions', () => {
  assert.deepEqual(engineeringFocus.map(focus => focus.title.fr), ['Ingénierie logicielle', 'Développement Full-Stack', 'Business Intelligence', 'Intelligence artificielle']);
  assert.deepEqual(engineeringFocus.map(focus => focus.title.en), ['Software Engineering', 'Full-Stack Development', 'Business Intelligence', 'Artificial Intelligence']);
  const expected = {
    'spring-boot': ['smartalumni', 'shopflow'], tensorflow: ['waste-classification'], pytorch: ['english-french-seq2seq'],
    ssas: ['enterprise-bi-dashboard'], javafx: ['min-draw-fx', 'java-network-communication'], laravel: ['jobconnect', 'eventplanner'], flutter: ['smart-trade-manager'],
  };
  for (const [technology, ids] of Object.entries(expected)) {
    assert.ok(homeTechnologies.some(id => id === technology));
    assert.deepEqual(projectsUsing(technology).map(project => project.id), ids);
  }
});

test('all four education records retain approved dates and historical locations in both languages', () => {
  assert.deepEqual(education.map(entry => [entry.id, entry.period.startYear, entry.period.endYear]), [
    ['esigelec', 2026, 2027], ['iit', 2024, 2027], ['fss', 2021, 2024], ['baccalaureat', 2021, 2021],
  ]);
  assert.equal(education[0]!.location.fr, 'Rouen, France');
  assert.equal(education[0]!.location.en, 'Rouen, France');
  for (const entry of education.slice(1)) assert.deepEqual(entry.location, { fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' });
  for (const entry of education) for (const locale of ['fr', 'en'] as const) assert.ok(entry.qualification[locale].trim());
  assert.match(education[1]!.specialization!.en, /Software Engineering and Business Intelligence/);
});
