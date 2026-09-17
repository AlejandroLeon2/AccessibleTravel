// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tina from '@tinacms/astro/integration';
import mdx from "@astrojs/mdx";
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// Host-neutral: every content page prerenders to static HTML, and the one
// on-demand route (/tina-island, the visual-editing endpoint) is served by
// whichever host built the site. Each platform sets its own build env var
// automatically — nothing to configure — and any other host (including a
// local `wrangler deploy`) falls back to a portable Node server. Set
// DEPLOY_ADAPTER to force a specific adapter when no env var applies.
function getAdapter() {
  switch (process.env.DEPLOY_ADAPTER) {
    case 'vercel': return vercel();
    case 'node': return node({ mode: 'standalone' });
    case undefined: break; // no override -> auto-detect below
    default:
      console.warn(`[astro.config] Unknown DEPLOY_ADAPTER "${process.env.DEPLOY_ADAPTER}" - ignoring and auto-detecting.`);
  }
  if (process.env.VERCEL) return vercel();

  return node({ mode: 'standalone' });
}

export default defineConfig({
  site: 'https://accessibletravelperu.com',
  // Vercel needs 'hybrid' for /tina-island/* endpoint, cPanel needs 'static'
  output: process.env.VERCEL ? 'hybrid' : 'static',
  adapter: getAdapter(),

  redirects: {
    '/': '/en/',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  },

  integrations: [tina(), mdx(), sitemap(), react()],

  image: {
    layout: 'constrained',
    remotePatterns: [{ protocol: 'https', hostname: 'assets.tina.io' }],
  },

  vite: {
    plugins: [tailwindcss(), tinaAdminDevRedirect()],
    ssr: {
      noExternal: ['@tinacms/astro', '@tinacms/bridge'],
    },
    server: {
      watch: {
        ignored: ['**/tina/__generated__/**', '**/public/admin/**'],
      },
    },
  },
});
