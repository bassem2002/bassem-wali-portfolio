import type { VideoDemo } from '../types/content.ts';
// Public README links, checked anonymously on 2026-10-16. Preview HTML 200,
// video/mp4 metadata and no access-request gate; playback itself was not audited.
const demo = (repo: string, fileId: string, linkLabel: string, query = 'sharing'): VideoDemo => ({
  url: `https://drive.google.com/file/d/${fileId}/view?usp=${query}`,
  provider: 'google-drive',
  label: { fr: 'Voir la démo vidéo', en: 'Watch Video Demo' },
  source: { readmeUrl: `https://github.com/bassem2002/${repo}/blob/HEAD/README.md`, linkLabel, verifiedOn: '2026-10-16' },
  publicAccessVerified: true,
});
export const verifiedProjectVideos: Readonly<Record<string, VideoDemo>> = {
  rezouette: demo('rezouette-social-media-saas', '1sUsT_SoCW7xMoSCSIlbmOnX9BkbYMIC6', 'Watch the Rezouette Demo'),
  smartalumni: demo('smartalumni-iit', '1j74wpRJeC8yzun8rzkfKVTZCarL3RZ1l', 'Watch the SmartAlumni IIT Demo'),
  'school-management': demo('SchoolManagementMERN', '1Uy4cN5VlgvYhHsBc-llL0Ot4zzAh-6TL', 'Watch the full demo on Google Drive'),
  eventplanner: demo('EventPlanner', '1n4wYXKcO70Brjbpre_zxXekASekbVXlZ', 'Watch Demo — EventPlanner', 'drive_link'),
};
