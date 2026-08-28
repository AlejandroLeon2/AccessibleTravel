import { defineConfig } from 'tinacms';
import { siteConfig } from './schemas/site-config';
import { galleryLogos } from './schemas/gallery-logos';
import { blogEs } from './schemas/blog-es';
import { blogEn } from './schemas/blog-en';
import { toursGrupalesEs } from './schemas/tours-grupales-es';
import { toursGrupalesEn } from './schemas/tours-grupales-en';
import { toursGlobalesEs } from './schemas/tours-global-es';
import { toursGlobalesEn } from './schemas/tours-global-en';
import { headerMenuEs, headerMenuEn } from './schemas/menu';

const branch = 'main';

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  server: {
    allowedOrigins: process.env.NODE_ENV !== 'production'
      ? ['http://localhost:4321', 'http://localhost:4001']
      : [],
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',

    },
  },
  ui: {
    previewUrl: (context: any) => {
      const { collection, document } = context;
      const slug = document._sys.relativePath.replace(/\.(md|mdx|json)$/, '');
      if (collection.name === 'blogEs') return { url: `/es/blog/${slug}` };
      if (collection.name === 'blogEn') return { url: `/en/blog/${slug}` };
      if (collection.name === 'toursGrupalesEs') return { url: `/es/group/${slug}` };
      if (collection.name === 'toursGrupalesEn') return { url: `/en/group/${slug}` };
      return { url: '/' };
    },
  },
  schema: {
    collections: [
      siteConfig,
      galleryLogos,
      headerMenuEs,
      headerMenuEn,
      blogEs,
      blogEn,
      toursGrupalesEs,
      toursGrupalesEn,
      toursGlobalesEs,
      toursGlobalesEn,
    ],
  },
});
