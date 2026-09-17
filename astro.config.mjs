

import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tina from '@tinacms/astro/integration';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercelAdapter from '@astrojs/vercel';

export default defineConfig({
  site: 'https://accessibletravelperu.com',

  // Sitio completamente estático
  output: 'static',
  adapter: vercelAdapter(),

  redirects: {
    '/': '/en/',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [tina(), mdx(), sitemap(), react()],

  image: {
    layout: 'constrained',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
      },
    ],
  },

  vite: {
    plugins: [tailwindcss(), tinaAdminDevRedirect()],

    ssr: {
      noExternal: ['@tinacms/astro', '@tinacms/bridge'],
    },

    server: {
      watch: {
        ignored: [
          '**/tina/__generated__/**',
          '**/public/admin/**',
        ],
      },
    },
  },
});

