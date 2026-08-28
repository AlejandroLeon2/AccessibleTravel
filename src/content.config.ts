import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const globalTourSchema = z.object({
  title: z.string(),
  titleLink: z.string(),
  operator: z.string().optional(),
  duration: z.string().optional(),
  siempreFecha: z.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
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
  packages: z.array(z.object({ name: z.string(), capacity: z.string().optional(), price: z.string(), deposit: z.string().optional(), description: z.string().optional() })),
  addOns: z.array(z.union([z.string(), z.object({ name: z.string(), price: z.string().optional(), description: z.string().optional() })])),
  itinerary: z.array(z.object({ day: z.number().optional(), time: z.string().optional(), title: z.string(), description: z.string() })),
  images: z.array(z.object({ link: z.string(), alt: z.string(), title: z.string() })),
  links: z.object({ book: z.string(), brochure: z.string(), inquire: z.string() }),
});

const toursGlobalesEn = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tours-global/peru/en' }),
  schema: globalTourSchema,
});

const toursGlobalesEs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tours-global/peru/es' }),
  schema: globalTourSchema,
});

const siteConfig = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/config' }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string(),
    correo: z.string(),
    uid: z.string(),
    whatsapp1: z.object({ numero: z.string(), tooltipText: z.string(), mensaje: z.string(), title: z.string() }),
    whatsapp2: z.object({ numero: z.string(), tooltipText: z.string(), mensaje: z.string(), title: z.string() }),
    Messenger: z.object({ valor: z.string(), tooltipText: z.string(), mensaje: z.string(), title: z.string() }),
    telefonos: z.array(z.object({ pais: z.string(), numero: z.string(), url: z.string() })),
    direccion: z.string(),
    direccionHeader: z.object({ pais: z.string(), texto: z.string(), url: z.string() }),
    redes: z.array(z.object({ icono: z.string(), url: z.string(), handle: z.string(), pais: z.string().optional() })),
  }),
});

const menuItemChildSchema = z.object({
  key: z.string(),
  label: z.string(),
  href: z.string(),
  coverImage: z.string(),
});

const menuItemSchema = z.object({
  key: z.string(),
  label: z.string(),
  href: z.string(),
  coverImage: z.string(),
  children: z.array(menuItemChildSchema).optional(),
});

const menuSchema = z.object({
  items: z.array(menuItemSchema),
});

const headerMenuEs = defineCollection({
  loader: glob({ pattern: 'menu-es.json', base: './src/content/config' }),
  schema: menuSchema,
});

const headerMenuEn = defineCollection({
  loader: glob({ pattern: 'menu-en.json', base: './src/content/config' }),
  schema: menuSchema,
});

const galleryLogos = defineCollection({
  loader: glob({ pattern: 'gallery-logos.json', base: './src/content/config' }),
  schema: z.object({
    galleryLogos: z.array(z.object({ src: z.string(), alt: z.string() })),
  }),
});

// Definir el esquema para tours grupales en español
const toursGrupalesEs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tours-grupales/es' }),
  schema: z.object({
    title: z.string(),
    titleLink: z.string(),
    operator: z.string(),
    duration: z.string(),
    siempreFecha: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
    rating: z.number(),
    reviews: z.number(),
    recomendado: z.boolean(),
    agotado: z.boolean(),
    groupSize: z.string(),
    location: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),

    includes: z.array(z.string()),
    excludes: z.array(z.string()),
    packages: z.array(z.object({
      name: z.string(),
      price: z.string(),
      deposit: z.string(),
    })),
    addOns: z.array(z.string()),
    itinerary: z.array(z.object({
      day: z.number(),
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
  }),
});

// Definir el esquema para tours grupales en inglés
const toursGrupalesEn = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/tours-grupales/en' }),
  schema: z.object({
    title: z.string(),
    titleLink: z.string(),
    operator: z.string(),
    duration: z.string(),
    siempreFecha: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
    rating: z.number(),
    reviews: z.number(),
    recomendado: z.boolean(),
    agotado: z.boolean(),
    groupSize: z.string(),
    location: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),

    includes: z.array(z.string()),
    excludes: z.array(z.string()),
    packages: z.array(z.object({
      name: z.string(),
      price: z.string(),
      deposit: z.string(),
    })),
    addOns: z.array(z.string()),
    itinerary: z.array(z.object({
      day: z.number(),
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
  }),
});

export const collections = {
  siteConfig,
  galleryLogos,
  headerMenuEs,
  headerMenuEn,
  toursGlobalesEn,
  toursGlobalesEs,
  toursGrupalesEs,
  toursGrupalesEn,
};
