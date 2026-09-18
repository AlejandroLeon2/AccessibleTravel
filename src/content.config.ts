import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Dynamic project root derived from this file's location (src/content.config.ts)
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const contentConfigDir = resolve(projectRoot, 'src/content/config');
const toursGlobalDir = resolve(projectRoot, 'src/content/tours-global/peru');
const toursGrupalesDir = resolve(projectRoot, 'src/content/tours-grupales');
const blogDir = resolve(projectRoot, 'src/content/blog');

const bannerItemSchema = z.object({
  src: z.string(),
  alt: z.object({ en: z.string(), es: z.string() }),
  title: z.object({ en: z.string(), es: z.string() }),
});

const paymentLogoSchema = z.object({
  src: z.string(),
  alt: z.object({ en: z.string(), es: z.string() }),
  titleLink: z.string(),
});

const banners = defineCollection({
  loader: glob({ pattern: 'banners.json', base: contentConfigDir }),
  schema: z.object({
    banners: z.array(bannerItemSchema),
    paymentLogos: z.array(paymentLogoSchema),
  }),
});

// HeroGroup schema matching new flat structure with En/Es suffixes
const heroGroup = defineCollection({
  loader: glob({ pattern: 'hero-group.json', base: contentConfigDir }),
  schema: z.object({
    discountPercent: z.string(),
    heroVideoUrl: z.string(),
    descriptionEn: z.string(),
    descriptionEs: z.string(),
    includesTitleEn: z.string(),
    includesTitleEs: z.string(),
    includesEn: z.array(z.object({ itemEn: z.string(), detailEn: z.string() })),
    includesEs: z.array(z.object({ itemEs: z.string(), detailEs: z.string() })),
  }),
});

// SiteConfig schema matching new structure
const siteConfig = defineCollection({
  loader: glob({ pattern: 'site.json', base: contentConfigDir }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
    correo: z.string(),
    uid: z.string(),
    heroVideoUrl: z.string(),
    authorImage: z.string(),
    contactos: z.array(z.object({
      tipo: z.string(),
      pais: z.string().optional(),
      numero: z.string().optional(),
      tooltipText: z.string().optional(),
      mensaje: z.string().optional(),
      title: z.string().optional(),
      url: z.string().optional(),
      valor: z.string().optional(),
    })),
    telefonos: z.array(z.object({ pais: z.string(), numero: z.string(), url: z.string() })),
    direccion: z.string(),
    direccionHeader: z.object({ pais: z.string(), texto: z.string(), url: z.string() }),
    redes: z.array(z.object({ tipo: z.string(), icono: z.string(), url: z.string(), handle: z.string(), pais: z.string().optional() })),
  }),
});

// Menu schema matching new unified structure with labels object
const menuItemChildSchema = z.object({
  key: z.string(),
  labels: z.object({ en: z.string(), es: z.string() }),
  href: z.string(),
  coverImage: z.string(),
  visible: z.boolean().optional().default(true),
});

const menuItemSchema = z.object({
  key: z.string(),
  labels: z.object({ en: z.string(), es: z.string() }),
  href: z.string(),
  coverImage: z.string(),
  visible: z.boolean().optional().default(true),
  children: z.array(menuItemChildSchema).optional(),
});

const menuSchema = z.object({
  items: z.array(menuItemSchema),
});

const headerMenu = defineCollection({
  loader: glob({ pattern: 'menu.json', base: contentConfigDir }),
  schema: menuSchema,
});

const galleryLogos = defineCollection({
  loader: glob({ pattern: 'gallery-logos.json', base: contentConfigDir }),
  schema: z.object({
    galleryLogos: z.array(z.object({ src: z.string(), alt: z.string() })),
  }),
});

// 404 page schema (multi-language)
const langSchema = z.object({
  en: z.string(),
  es: z.string(),
});

const page404Schema = z.object({
  titulo: langSchema,
  descripcion: langSchema,
  botonInicio: langSchema,
  botonBlog: langSchema,
  enlacesRapidos: z.array(z.object({
    texto: langSchema,
    url: z.string(),
    urlEs: z.string(),
  })).optional(),
  imagenFondo: z.string().optional(),
  mensajeContacto: langSchema,
});

const page404 = defineCollection({
  loader: glob({ pattern: '404.json', base: contentConfigDir }),
  schema: page404Schema,
});

// ── Shared tour schema (matches TinaCMS tour-base-fields) ─────────────
const tourBaseFields = {
  title: z.string(),
  operator: z.string().optional(),
  duration: z.string().optional(),
  siempreFecha: z.boolean().optional(),
  rating: z.number().optional(),
  reviews: z.number(),
  recomendado: z.boolean().optional(),
  agotado: z.boolean().optional(),
  groupSize: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  slogan: z.string().optional(),
  contact: z.string().optional(),
  highlights: z.array(z.string()),
  includes: z.array(z.string()),
  excludes: z.array(z.string()),
  packages: z.array(z.object({
    name: z.string(),
    capacity: z.string().optional(),
    price: z.string(),
    deposit: z.string().optional(),
    description: z.string().optional(),
  })),
  addOns: z.array(z.union([z.string(), z.object({
    name: z.string(),
    price: z.string().optional(),
    description: z.string().optional(),
  })])),
  itinerary: z.array(z.object({
    day: z.number().optional(),
    time: z.string().optional(),
    title: z.string(),
    description: z.string(),
  })),
  images: z.array(z.object({
    link: z.string(),
    alt: z.string(),
    title: z.string(),
  })),
  links: z.object({
    book: z.string(),
    brochure: z.string(),
    inquire: z.string(),
  }),
};

const globalTourSchema = z.object(tourBaseFields);

// ── Tours globales ────────────────────────────────────────────────────
const toursGlobalesEn = defineCollection({
  loader: glob({ pattern: '**/*.json', base: resolve(toursGlobalDir, 'en') }),
  schema: globalTourSchema,
});

const toursGlobalesEs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: resolve(toursGlobalDir, 'es') }),
  schema: globalTourSchema,
});

// ── Tours grupales (base + startDate/endDate) ─────────────────────────
const groupTourSchema = globalTourSchema.extend({
  startDate: z.union([z.string(), z.date()]),
  endDate: z.union([z.string(), z.date()]),
});

const toursGrupalesEs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: resolve(toursGrupalesDir, 'es') }),
  schema: groupTourSchema,
});

const toursGrupalesEn = defineCollection({
  loader: glob({ pattern: '**/*.json', base: resolve(toursGrupalesDir, 'en') }),
  schema: groupTourSchema,
});

// ── Blog (unified schema) ─────────────────────────────────────────────
const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  date: z.union([z.string(), z.date()]).optional(),
  author: z.string().optional(),
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: resolve(blogDir, 'en') }),
  schema: blogSchema,
});

const blogEs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: resolve(blogDir, 'es') }),
  schema: blogSchema,
});

export const collections = {
  siteConfig,
  galleryLogos,
  banners,
  heroGroup,
  headerMenu,
  toursGlobalesEn,
  toursGlobalesEs,
  toursGrupalesEs,
  toursGrupalesEn,
  blogEn,
  blogEs,
  page404,
};
