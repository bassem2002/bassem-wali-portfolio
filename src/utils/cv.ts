import { existsSync } from 'node:fs';
import { profile } from '@/data/profile';

// Never copy the original private PDF. Approval and a public asset are both required.
export function publicCvAvailable() {
  return profile.cv.publicVersionApproved &&
    existsSync(new URL(`../../public${profile.cv.path}`, import.meta.url));
}
