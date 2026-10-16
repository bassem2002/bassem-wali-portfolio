import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { projects } from '@/data/projects';
import { locales } from '@/types/content';
import { publicPaths, sitemapText } from '@/utils/crawling';
export const GET: APIRoute = () => new Response(sitemapText(publicPaths(projects, locales), site), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
