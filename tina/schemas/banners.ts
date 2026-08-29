import type { Collection } from 'tinacms';

export const banners = {
  name: 'banners',
  label: 'Banners del carrusel',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'banners' },
  ui: { global: true },
  fields: [
    {
      type: 'object',
      name: 'banners',
      label: 'Banners',
      list: true,
      fields: [
        { type: 'image', name: 'src', label: 'Imagen', required: true },
        {
          type: 'object',
          name: 'alt',
          label: 'Texto alternativo (por idioma)',
          fields: [
            { type: 'string', name: 'en', label: 'Inglés', required: true },
            { type: 'string', name: 'es', label: 'Español', required: true },
          ],
        },
        {
          type: 'object',
          name: 'title',
          label: 'Título (por idioma)',
          fields: [
            { type: 'string', name: 'en', label: 'Inglés', required: true, ui: { component: 'textarea' } },
            { type: 'string', name: 'es', label: 'Español', required: true, ui: { component: 'textarea' } },
          ],
        },
      ],
    },
    {
      type: 'object',
      name: 'paymentLogos',
      label: 'Logos de métodos de pago',
      list: true,
      fields: [
        { type: 'image', name: 'src', label: 'Imagen', required: true },
        {
          type: 'object',
          name: 'alt',
          label: 'Texto alternativo (por idioma)',
          fields: [
            { type: 'string', name: 'en', label: 'Inglés', required: true },
            { type: 'string', name: 'es', label: 'Español', required: true },
          ],
        },
        { type: 'string', name: 'titleLink', label: 'Enlace del título', required: true },
      ],
    },
  ],
} satisfies Collection<false>;