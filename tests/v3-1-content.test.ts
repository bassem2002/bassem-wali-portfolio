import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';
import { profile } from '../src/data/profile.ts';
import { skills } from '../src/data/skills.ts';
import { experiences } from '../src/data/experience.ts';
import { education } from '../src/data/education.ts';
import { engineeringFocus } from '../src/data/engineering-focus.ts';
import { validateContent } from '../src/utils/validate-content.ts';
import { verifiedProjectVideos } from '../src/data/project-videos.ts';
import { v3Copy } from '../src/i18n/v3.ts';
import type { VideoDemo } from '../src/types/content.ts';
const content = { projects, profile, skills, experiences, education, engineeringFocus };

test('owner-approved public phone, France location and broad AI positioning are consistent in FR/EN', () => {
  assert.deepEqual(profile.location, { fr: 'France', en: 'France' });
  assert.equal(profile.phone.e164, '+33751245531');
  assert.equal(profile.phone.display.replaceAll(' ', ''), profile.phone.e164);
  assert.equal(profile.phone.publicationApproved, true);
  assert.equal(v3Copy.fr.ai, 'Intelligence artificielle');
  assert.equal(v3Copy.en.ai, 'Artificial Intelligence');
  assert.doesNotMatch(JSON.stringify([profile.summary, profile.about]), /IA appliquée|applied AI/i);
  const invalidPhone = { ...profile.phone, display: '+33 7 00 00 00 00' };
  assert.ok(validateContent({ ...content, profile: { ...profile, phone: invalidPhone } }).some(issue => issue.includes('phone display')));
  assert.ok(validateContent({ ...content, profile: { ...profile, phone: { ...profile.phone, e164: 'not-a-number' } } }).some(issue => issue.includes('E.164')));
});

test('only four README-backed public videos are attached, with complete bilingual labels and project provenance', () => {
  assert.deepEqual(projects.filter(project => project.videoDemo).map(project => project.id), ['rezouette', 'smartalumni', 'school-management', 'eventplanner']);
  for (const project of projects) {
    assert.equal(project.videoDemo?.url, verifiedProjectVideos[project.id]?.url);
    if (!project.videoDemo) continue;
    const video = project.videoDemo;
    assert.equal(video.provider, 'google-drive');
    assert.match(video.url, /^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view\?usp=/);
    assert.equal(video.source.readmeUrl, `${project.githubUrl}/blob/HEAD/README.md`);
    assert.equal(video.publicAccessVerified, true);
    assert.equal(video.label.fr, 'Voir la démo vidéo');
    assert.equal(video.label.en, 'Watch Video Demo');
  }
  assert.deepEqual(validateContent(content), []);
});

test('video validation rejects empty, borrowed, unverified or incompletely translated demos', () => {
  const first = projects[0]!;
  assert.ok(first.videoDemo);
  const video = first.videoDemo;
  for (const changed of [
    { ...video, url: '' },
    { ...video, url: 'https://drive.google.com/file/d/unverified/view' },
    { ...video, label: { fr: video.label.fr, en: '' } },
    { ...video, source: { ...video.source, readmeUrl: `${projects[1]!.githubUrl}/blob/HEAD/README.md` } },
    { ...video, publicAccessVerified: false } as unknown as VideoDemo,
  ]) assert.ok(validateContent({ ...content, projects: [{ ...first, videoDemo: changed }, ...projects.slice(1)] }).some(issue => /video/.test(issue)));
  const noVideo = projects.find(project => project.id === 'enterprise-bi-dashboard')!;
  assert.ok(validateContent({ ...content, projects: projects.map(project => project.id === noVideo.id ? { ...project, videoDemo: video } : project) }).some(issue => issue.includes('video not in verified README inventory')));
});
