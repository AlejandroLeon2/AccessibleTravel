// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';     

export default defineConfig({
  site: 'https://accessibletravelperu.com', 

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap() 
  ],


  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  }
});
