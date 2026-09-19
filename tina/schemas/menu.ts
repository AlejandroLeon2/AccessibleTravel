import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

export const headerMenu = {
  name: 'headerMenu',
  label: 'Menú de navegación',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'menu' },
  ui: { 
    global: true,
    router: () => '/en/',
  },
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Ítems del menú',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.labels?.es || item?.labels?.en || ''} (${item?.href || ''})` }) },
      description: 'Elementos del menú de navegación. Usar "parent" para anidar bajo otro ítem.',
      fields: [
        {
          type: 'string',
          name: 'key',
          label: 'Clave interna',
          description: 'Identificador único. Ejemplo: "Home", "Blog", "ContactUs".',
          required: true,
        },
        {
          type: 'object',
          name: 'labels',
          label: 'Etiquetas por idioma',
          fields: [
            {
              type: 'string',
              name: 'en',
              label: 'Etiqueta EN',
              required: true,
            },
            {
              type: 'string',
              name: 'es',
              label: 'Etiqueta ES',
              required: true,
            },
          ],
        },
        {
          type: 'string',
          name: 'href',
          label: 'Ruta',
          description: 'Ruta relativa. Ejemplo: "/", "/blog", "/contactUs".',
          required: true,
        },
        {
          type: 'image',
          name: 'coverImage',
          label: 'Imagen de portada',
          ui: imagePathUi,
        },
        {
          type: 'boolean',
          name: 'visible',
          label: 'Visible',
          ui: { defaultValue: true },
        },
        {
          type: 'string',
          name: 'parent',
          label: 'Padre',
          description: 'Clave del ítem padre para anidar como submenú. Vacío = nivel raíz. Ejemplo: "AboutUs".',
        },
      ],
    },
  ],
} satisfies Collection<false>;
