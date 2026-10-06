import type { APIRoute } from 'astro';
import { rooms } from '../data/rooms';
import { sights } from '../data/sights';

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/camere', priority: '0.9' },
  ...rooms.map((r) => ({ path: `/camere/${r.slug}`, priority: '0.8' })),
  { path: '/contact', priority: '0.9' },
  { path: '/despre-noi', priority: '0.7' },
  { path: '/locatii', priority: '0.7' },
  ...sights.map((s) => ({ path: `/locatii/${s.slug}`, priority: '0.6' })),
  { path: '/galerie', priority: '0.6' },
  { path: '/recenzii', priority: '0.6' },
  { path: '/termeni-si-conditii', priority: '0.3' },
];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(({ path, priority }) => {
      const loc = new URL(`${base}${path === '/' ? '/' : `${path}/`}`, site).href;
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
    })
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
