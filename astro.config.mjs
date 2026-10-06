// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';

// Pe Vercel site-ul stă în rădăcina domeniului; pe GitHub Pages, în /pensiune-pictori.
const onVercel = !!process.env.VERCEL;

// Adresa publică a site-ului: src/continut/general.json → seo.adresaSite
const general = JSON.parse(readFileSync(new URL('./src/continut/general.json', import.meta.url), 'utf8'));
const siteUrl = (general.seo?.adresaSite || 'https://pensiuneapictorilor.ro').replace(/\/+$/, '');

export default defineConfig({
  site: onVercel ? siteUrl : 'https://emanuellovin255.github.io',
  base: onVercel ? '/' : '/pensiune-pictori',
  build: {
    // CSS și JS în fișiere externe, fără blocuri inline în HTML
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 0,
    },
  },
});
