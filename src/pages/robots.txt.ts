import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { robotsText } from '@/utils/crawling';

export const GET: APIRoute = () => {
  return new Response(robotsText(site),
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
