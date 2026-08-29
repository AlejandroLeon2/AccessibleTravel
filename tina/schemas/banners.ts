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
      ui: {
        itemProps: (item) => ({
          label: item?.title?.es || item?.title?.en || 'Banner',
        }),
      },
      description: 'Imágenes del carrusel de la página principal. Se muestran en orden secuencial.',
      fields: [
        {
          type: 'image',
          name: 'src',
          label: 'Imagen del banner',
          required: true,
          description: 'Ruta de la imagen. Ejemplo: "/images/banners/hero-machu-picchu.webp". Tamaño recomendado: 1920x800px.',
        },
        {
          type: 'object',
          name: 'alt',
          label: 'Texto alternativo (por idioma)',
          description: 'Descripción accesible de la imagen para lectores de pantalla.',
          fields: [
            { type: 'string', name: 'en', label: 'Inglés', required: true, description: 'Ejemplo: "Accessible tour at Machu Picchu"' },
            { type: 'string', name: 'es', label: 'Español', required: true, description: 'Ejemplo: "Tour accesible en Machu Picchu"' },
          ],
        },
        {
          type: 'object',
          name: 'title',
          label: 'Título del banner (por idioma)',
          description: 'Texto superpuesto sobre la imagen del carrusel.',
          fields: [
            { type: 'string', name: 'en', label: 'Inglés', required: true, ui: { component: 'textarea' }, description: 'Ejemplo: "Discover Peru Without Limits"' },
            { type: 'string', name: 'es', label: 'Español', required: true, ui: { component: 'textarea' }, description: 'Ejemplo: "Descubrí Perú Sin Límites"' },
          ],
        },
      ],
    },
    {
      type: 'object',
      name: 'paymentLogos',
      label: 'Logos de métodos de pago',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.alt?.es || item?.alt?.en || item?.titleLink || 'Logo de pago',
        }),
      },
      description: 'Logos de las formas de pago aceptadas que se muestran en el sitio.',
      fields: [
        {
          type: 'image',
          name: 'src',
          label: 'Imagen del logo',
          required: true,
          description: 'Ruta de la imagen del logo de pago. Ejemplo: "/images/payments/visa.webp".',
        },
        {
          type: 'object',
          name: 'alt',
          label: 'Nombre del método de pago (por idioma)',
          description: 'Nombre del método de pago para accesibilidad.',
          fields: [
            { type: 'string', name: 'en', label: 'Inglés', required: true, description: 'Ejemplo: "Visa"' },
            { type: 'string', name: 'es', label: 'Español', required: true, description: 'Ejemplo: "Visa"' },
          ],
        },
        {
          type: 'string',
          name: 'titleLink',
          label: 'Enlace del método de pago',
          required: true,
          description: 'URL de la página del método de pago o documento informativo. Ejemplo: "https://wetravel.com/payments"',
        },
      ],
    },
  ],
} satisfies Collection<false>;
