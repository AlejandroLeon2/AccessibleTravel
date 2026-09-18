import { defineConfig } from 'tinacms';
import { siteConfig } from './schemas/site-config';
import { galleryLogos } from './schemas/gallery-logos';
import { banners } from './schemas/banners';
import { heroGroup } from './schemas/hero-group';
import { blogBase } from './schemas/blog';
import { toursGrupales } from './schemas/tours-grupales';
import { toursGlobales } from './schemas/tours-global';
import { headerMenu } from './schemas/menu';
import { page404 } from './schemas/page-404';


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
      if (collection.name === 'toursGlobalesEs') return { url: `/es/destino/tour/${slug}` };
      if (collection.name === 'toursGlobalesEn') return { url: `/en/destino/tour/${slug}` };
      return { url: '/' };
    },
  },
  schema: {
    collections: [
      siteConfig,
      galleryLogos,
      banners,
      heroGroup,
      headerMenu,
      // Blog — un schema, dos paths
      {
        ...blogBase,
        name: 'blogEs',
        label: 'Blog ES',
        path: 'src/content/blog/es',
        ui: {
          router: ({ document }) => `/es/blog/${document._sys.filename}`,
        },
      },
      {
        ...blogBase,
        name: 'blogEn',
        label: 'Blog EN',
        path: 'src/content/blog/en',
        ui: {
          router: ({ document }) => `/en/blog/${document._sys.filename}`,
        },
      },
      // Tours grupales - Spanish version (base schema with Spanish labels)
      {
        ...toursGrupales,
        name: 'toursGrupalesEs',
        label: 'Tours Grupales ES',
        path: 'src/content/tours-grupales/es',
        ui: {
          router: ({ document }) => `/es/group/${document._sys.filename}`,
        },
      },
      // Tours grupales - English version (same schema, different path)
      {
        ...toursGrupales,
        name: 'toursGrupalesEn',
        label: 'Group Tours EN',
        path: 'src/content/tours-grupales/en',
        ui: {
          router: ({ document }) => `/en/group/${document._sys.filename}`,
        },
      },
      // Tours globales - Spanish version (base schema with Spanish labels)
      {
        ...toursGlobales,
        name: 'toursGlobalesEs',
        label: 'Tours Peru ES',
        path: 'src/content/tours-global/peru/es',
        ui: {
          router: ({ document }) => `/es/destino/tour/${document._sys.filename}`,
        },
      },
      // Tours globales - English version (same schema, different path)
      {
        ...toursGlobales,
        name: 'toursGlobalesEn',
        label: 'Tours Peru (EN)',
        path: 'src/content/tours-global/peru/en',
        ui: {
          router: ({ document }) => `/en/destino/tour/${document._sys.filename}`,
        },
      },
      // Página 404 (multi-idioma)
      page404,
    ],
  },
});
