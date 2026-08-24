// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tina from '@tinacms/astro/integration';
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: 'https://accessibletravelperu.com',
  output: 'static',

  vite: {
    plugins: [tailwindcss(),tinaAdminDevRedirect()],
    ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge']}
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en', ],
    routing: {
      prefixDefaultLocale: true 
    }
  },

  integrations: [
    tina(),mdx()
     //sitemap()
  ],
});