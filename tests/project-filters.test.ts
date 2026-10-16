import assert from 'node:assert/strict';
import { test } from 'node:test';
import { projects } from '../src/data/projects.ts';
import { categories } from '../src/data/categories.ts';
import { technologyNames } from '../src/data/skills.ts';
import { matchesProject, readFilters, writeFilters } from '../src/utils/project-filters.ts';

const rows = projects.map(project => ({ ...project, text: [project.title, project.summary.fr, ...project.categories.map(id => categories[id].fr), ...project.technologies.map(id => technologyNames.get(id))].join(' ') }));
const filter = (category = '', technology = '', q = '') => rows.filter(row => matchesProject(row, { category, technology, q })).map(row => row.id);
test('catalogue and every category preserve the verified editorial order', () => {
  assert.equal(rows.length, 14);
  assert.equal(rows.filter(row => row.featured).length, 5);
  assert.ok(rows.slice(0, 5).every(row => row.featured));
  for (const category of Object.keys(categories)) assert.deepEqual(filter(category), projects.filter(project => project.categories.includes(category as keyof typeof categories)).map(project => project.id));
});
test('technology filters use actual stacks, including the required audit relationships', () => {
  const expected = { pytorch: ['english-french-seq2seq'], tensorflow: ['waste-classification'], ssas: ['enterprise-bi-dashboard'], javafx: ['min-draw-fx', 'java-network-communication'], laravel: ['jobconnect', 'eventplanner'], flutter: ['smart-trade-manager'], 'spring-boot': ['smartalumni', 'shopflow'] };
  for (const [technology, ids] of Object.entries(expected)) assert.deepEqual(filter('', technology), ids);
});
test('search, combined criteria, empty results and reset', () => {
  assert.deepEqual(filter('', '', 'rézouette'), ['rezouette']);
  assert.deepEqual(filter('', '', 'SPRING BOOT'), ['smartalumni', 'shopflow']);
  assert.deepEqual(filter('mobile', 'pytorch'), []);
  assert.deepEqual(filter('', '', 'no-matching-project'), []);
  assert.equal(filter().length, 14);
});
test('URL state is shareable, bounded and rejects unknown category and technology', () => {
  const state = { category: 'nlp', technology: 'pytorch', q: 'English French' };
  assert.deepEqual(readFilters(new URLSearchParams(writeFilters(state)), rows), state);
  assert.deepEqual(readFilters(new URLSearchParams('category=unknown&technology=unknown'), rows), { category: '', technology: '', q: '' });
  assert.equal(readFilters(new URLSearchParams({ q: 'x'.repeat(500) }), rows).q.length, 160);
  assert.equal(writeFilters({ category: '', technology: '', q: '' }), '');
});
