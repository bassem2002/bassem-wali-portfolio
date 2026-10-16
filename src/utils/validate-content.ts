import { projectCategoryIds, skillCategoryIds } from '../types/content.ts';
import type { Project, Skill, Experience, Education, Profile } from '../types/content.ts';
import type { EngineeringFocus } from '../data/engineering-focus.ts';
import { auditedRepositories } from '../data/repository-inventory.ts';
import { verifiedProjectVideos } from '../data/project-videos.ts';

interface ContentData {
  projects: readonly Project[]; skills: readonly Skill[];
  experiences: readonly Experience[]; education: readonly Education[];
  profile: Profile; engineeringFocus: readonly EngineeringFocus[];
}
export function validateContent(data: ContentData): readonly string[] {
  const issues: string[] = [];
  const require = (condition: boolean, message: string) => { if (!condition) issues.push(message); };
  const unique = (values: readonly string[], label: string) => require(new Set(values).size === values.length, `${label}: duplicate`);
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const projectIds = new Set(data.projects.map(project => project.id));
  const skills = new Map(data.skills.map(skill => [skill.id, skill]));
  const experiences = new Map(data.experiences.map(experience => [experience.id, experience]));
  unique(data.projects.map(project => project.id), 'Project IDs');
  unique(data.projects.map(project => project.slug), 'Project slugs');
  unique(data.projects.map(project => project.githubUrl), 'GitHub URLs');
  unique(data.skills.map(skill => skill.id), 'Skill IDs');
  unique(data.experiences.map(experience => experience.id), 'Experience IDs');
  unique(data.education.map(entry => entry.id), 'Education IDs');
  require(data.projects.filter(project => project.featured).length === 5, 'Featured count must be 5');
  require(data.projects.length === Object.keys(auditedRepositories).length, 'Project inventory differs from audited repositories');
  for (const project of data.projects) {
    const label = project.id;
    require(slugPattern.test(project.id) && slugPattern.test(project.slug), `${label}: invalid ID/slug`);
    require(Boolean(project.title.trim() && project.problem.fr.trim()), `${label}: missing title/problem`);
    require(Boolean(project.summary.fr.trim() && project.summary.en.trim()), `${label}: missing summary`);
    require(project.summary.fr.length <= 300, `${label}: card summary too long`);
    for (const locale of ['fr', 'en'] as const) {
      require(Boolean(project.shortDescription[locale]?.trim() && project.longDescription[locale]?.trim() && project.angle[locale]?.trim()), `${label}: incomplete V2 narrative ${locale}`);
      require(project.highlights[locale].length >= 2 && project.highlights[locale].length <= 3 && project.highlights[locale].every(item => item.trim()), `${label}: invalid card highlights ${locale}`);
      require(project.technicalHighlights[locale].length > 0 && project.technicalHighlights[locale].every(item => item.trim()), `${label}: missing technical highlights ${locale}`);
      for (const field of ['authentication', 'database', 'aiOrDataComponents', 'cardNote'] as const) if (project[field]) require(Boolean(project[field]?.[locale].trim()), `${label}: empty optional ${field}/${locale}`);
    }
    require(project.highlights.fr.length === project.highlights.en.length && project.technicalHighlights.fr.length === project.technicalHighlights.en.length, `${label}: V2 list parity mismatch`);
    require(project.relatedProjects.every(id => id !== project.id && projectIds.has(id)), `${label}: invalid related project`);
    require(project.features.fr.length > 0 && project.features.fr.every(feature => Boolean(feature.trim())), `${label}: missing French features`);
    require(Boolean(project.problem.en?.trim()), `${label}: missing English problem`);
    require(project.features.en.length === project.features.fr.length && project.features.en.every(feature => Boolean(feature.trim())), `${label}: feature translation mismatch`);
    require(project.limitations.en.length === project.limitations.fr.length && project.limitations.en.every(limitation => Boolean(limitation.trim())), `${label}: limitation translation mismatch`);
    require(project.limitations.fr.length > 0, `${label}: missing limitations`);
    require(/^https:\/\/github\.com\/bassem2002\/[A-Za-z0-9_.-]+$/.test(project.githubUrl), `${label}: invalid GitHub URL`);
    require(project.githubUrl === auditedRepositories[project.id], `${label}: repository does not match audit`);
    require(!project.githubUrl.endsWith('/bassem2002'), `${label}: profile repository is excluded`);
    require(project.categories.length > 0 && project.categories.every(category => projectCategoryIds.includes(category)), `${label}: unknown category`);
    unique(project.categories, `${label} categories`);
    unique(project.technologies, `${label} technologies`);
    unique(project.relatedSkills, `${label} related skills`);
    require(project.technologies.length > 0, `${label}: empty stack`);
    for (const id of project.technologies) require(skills.has(id) && project.relatedSkills.includes(id), `${label}: unknown/unrelated technology ${id}`);
    for (const id of project.relatedSkills) {
      const skill = skills.get(id);
      require(Boolean(skill && skill.projectIds.includes(project.id)), `${label}: inconsistent skill ${id}`);
    }
    require(project.evidence.length > 0, `${label}: missing evidence`);
    for (const contribution of project.myContributions) require(Boolean(contribution.evidence.reference.trim()), `${label}: contribution lacks evidence`);
    if (project.experienceReference) {
      const experience = experiences.get(project.experienceReference);
      require(Boolean(experience && experience.projectSlug === project.slug), `${label}: invalid experience reference`);
    }
    if (project.demo) {
      require(project.demo.publicAccessVerified === true && project.demo.republicationApproved === true, `${label}: unapproved demo`);
      require(/^https:\/\//.test(project.demo.url), `${label}: invalid demo URL`);
    }
    if (project.videoDemo) {
      const video = project.videoDemo;
      const verified = verifiedProjectVideos[project.id];
      require(Boolean(verified && verified.url === video.url && verified.provider === video.provider && verified.source.readmeUrl === video.source.readmeUrl), `${label}: video not in verified README inventory`);
      require(video.publicAccessVerified === true && /^https:\/\//.test(video.url), `${label}: unverified video URL`);
      require(['google-drive', 'youtube', 'other'].includes(video.provider), `${label}: invalid video provider`);
      require(Boolean(video.label.fr.trim() && video.label.en.trim() && video.source.linkLabel.trim()), `${label}: incomplete video labels`);
      require(video.source.readmeUrl.startsWith(`${project.githubUrl}/blob/`) && /^\d{4}-\d{2}-\d{2}$/.test(video.source.verifiedOn), `${label}: invalid video provenance`);
    }
    for (const screenshot of project.screenshots) {
      require(screenshot.republicationApproved === true && screenshot.sensitiveContentReviewed === true, `${label}: unapproved screenshot`);
      require(screenshot.source.startsWith('src/assets/') && !screenshot.source.includes('..'), `${label}: invalid screenshot path`);
    }
  }
  for (const skill of data.skills) {
    require(skillCategoryIds.includes(skill.category), `${skill.id}: unknown skill category`);
    require(Boolean(skill.name.trim() && skill.evidence.length), `${skill.id}: missing skill label/evidence`);
    require(!/[?\uFFFD]/.test(skill.name), `${skill.id}: damaged skill label encoding`);
    unique(skill.projectIds, `${skill.id} project IDs`);
    for (const id of skill.projectIds) {
      require(projectIds.has(id) && data.projects.some(project => project.id === id && project.relatedSkills.includes(skill.id)), `${skill.id}: invalid project reference ${id}`);
    }
    if (!skill.projectIds.length) require(skill.evidence.some(evidence => evidence.source === 'cv'), `${skill.id}: skill without repository or CV evidence`);
  }
  for (const experience of data.experiences) {
    require(/^\d{4}-\d{2}$/.test(experience.period.start) && /^\d{4}-\d{2}$/.test(experience.period.end) && experience.period.start <= experience.period.end, `${experience.id}: invalid period`);
    require(experience.technologies.every(id => skills.has(id)), `${experience.id}: unknown technology`);
    if (experience.projectSlug) require(data.projects.some(project => project.slug === experience.projectSlug && project.experienceReference === experience.id), `${experience.id}: inconsistent project reference`);
  }
  for (const entry of data.education) require(entry.period.startYear <= entry.period.endYear && entry.evidence.length > 0, `${entry.id}: invalid education record`);
  for (const focus of data.engineeringFocus) {
    require(focus.projectIds.every(id => projectIds.has(id)), `${focus.id}: unknown focus project`);
    for (const id of focus.skillIds) require(skills.has(id) && data.projects.some(project => focus.projectIds.includes(project.id) && project.relatedSkills.includes(id)), `${focus.id}: unsupported focus skill ${id}`);
  }
  if (data.profile.phone) {
    const phone = data.profile.phone;
    require(phone.publicationApproved === true && /^\+[1-9]\d{7,14}$/.test(phone.e164), 'Profile: phone must be approved and E.164 formatted');
    require(phone.display.replace(/[\s().-]/g, '') === phone.e164, 'Profile: phone display differs from call target');
  }
  for (const locale of ['fr', 'en'] as const) {
    require(Boolean(data.profile.about[locale]?.length && data.profile.about[locale].every(paragraph => paragraph.trim())), `Profile: missing ${locale} about text`);
    require(Boolean(data.profile.availability[locale]?.trim() && data.profile.contactMessage[locale]?.trim()), `Profile: missing ${locale} contact text`);
    for (const experience of data.experiences) require(Boolean(experience.role[locale]?.trim() && experience.summary[locale]?.trim()), `${experience.id}: missing ${locale} experience text`);
    for (const entry of data.education) require(Boolean(entry.qualification[locale]?.trim() && entry.location[locale]?.trim()), `${entry.id}: missing ${locale} education text`);
  }
  require(data.profile.cv.path === '/cv/Bassem_Wali_CV.pdf', 'Unexpected public CV path');
  require(data.profile.about.fr.length >= 2 && data.profile.about.fr.length <= 4, 'About must contain 2–4 paragraphs');
  return issues;
}
