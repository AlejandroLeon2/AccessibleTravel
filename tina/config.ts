import { defineConfig } from 'tinacms';
import { siteConfig } from './schemas/site-config';
import { galleryLogos } from './schemas/gallery-logos';
import { banners } from './schemas/banners';
import { heroGroup } from './schemas/hero-group';
import { blogEs } from './schemas/blog-es';
import { blogEn } from './schemas/blog-en';
import { toursGrupalesEs } from './schemas/tours-grupales-es';
import { toursGlobalesEs } from './schemas/tours-global-es';
import { headerMenu } from './schemas/menu';


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
      blogEs,
      blogEn,
      // Tours grupales - Spanish version (base schema with Spanish labels)
      {
        ...toursGrupalesEs,
        name: 'toursGrupalesEs',
        label: 'Tours Grupales ES',
        path: 'src/content/tours-grupales/es',
      },
      // Tours grupales - English version (same schema, different path)
      {
        ...toursGrupalesEs,
        name: 'toursGrupalesEn',
        label: 'Group Tours EN',
        path: 'src/content/tours-grupales/en',
      },
      // Tours globales - Spanish version (base schema with Spanish labels)
      {
        ...toursGlobalesEs,
        name: 'toursGlobalesEs',
        label: 'Tours Peru ES',
        path: 'src/content/tours-global/peru/es',
      },
      // Tours globales - English version (same schema, different path)
      {
        ...toursGlobalesEs,
        name: 'toursGlobalesEn',
        label: 'Tours Peru (EN)',
        path: 'src/content/tours-global/peru/en',
      },
    ],
  },
});
