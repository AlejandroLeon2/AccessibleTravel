import type { Collection } from 'tinacms';

const menuItemChildSchema = {
  type: 'object' as const,
  name: 'children',
  label: 'Submenú',
  list: true,
  ui: { itemProps: (item) => ({ label: `${item?.labels?.es || item?.labels?.en || ''} (${item?.href || ''})` }) },
  fields: [
    {
      type: 'string' as const,
      name: 'key',
      label: 'Clave interna',
      description: 'Identificador único del ítem. Ejemplo: "ContactUs", "AboutUs".',
      required: true,
    },
    {
      type: 'object' as const,
      name: 'labels',
      label: 'Etiquetas por idioma',
      description: 'Traducciones del texto visible en el menú.',
      fields: [
        { type: 'string', name: 'en', label: 'Etiqueta EN', description: 'Ejemplo: "Contact Us".', required: true },
        { type: 'string', name: 'es', label: 'Etiqueta ES', description: 'Ejemplo: "Contáctanos".', required: true }
      ]
    },
    {
      type: 'string' as const,
      name: 'href',
      label: 'Ruta',
      description: 'Ruta relativa dentro del sitio. Ejemplo: "/contacto", "/aboutUs".',
      required: true,
    },
    {
      type: 'image' as const,
      name: 'coverImage',
      label: 'Imagen',
      description: 'Imagen asociada al ítem del menú. Ejemplo: "/images/machu.webp".',
      required: true,
    },
  ],
};

export const headerMenu = {
  name: 'headerMenu',
  label: 'Menú de navegación',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'menu' },
  ui: { global: true },
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Ítems del menú',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.labels?.es || item?.labels?.en || ''} (${item?.href || ''})` }) },
      fields: [
        {
          type: 'string',
          name: 'key',
          label: 'Clave interna',
          description: 'Identificador único del ítem. Ejemplo: "Home", "Blog".',
          required: true,
        },
        {
          type: 'object',
          name: 'labels',
          label: 'Etiquetas por idioma',
          description: 'Traducciones del texto visible en el menú.',
          fields: [
            { type: 'string', name: 'en', label: 'Etiqueta EN', description: 'Ejemplo: "Home".', required: true },
            { type: 'string', name: 'es', label: 'Etiqueta ES', description: 'Ejemplo: "Inicio".', required: true }
          ]
        },
        {
          type: 'string',
          name: 'href',
          label: 'Ruta',
          description: 'Ruta relativa dentro del sitio. Ejemplo: "/", "/blog", "/destino/peru".',
          required: true,
        },
        {
          type: 'image',
          name: 'coverImage',
          label: 'Imagen',
          description: 'Imagen asociada al ítem del menú. Ejemplo: "/images/new2principal.webp".',
          required: true,
        },
        menuItemChildSchema,
      ],
    },
  ],
} satisfies Collection<false>;
