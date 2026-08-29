import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

export const galleryLogos = {
  name: 'galleryLogos',
  label: 'Logos de la galería',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'gallery-logos' },
  ui: { global: true },
  defaultItem: () => ({ galleryLogos: [] }),
  fields: [
    {
      type: 'object',
      name: 'galleryLogos',
      label: 'Logos',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.alt || 'Logo',
        }),
      },
      description: 'Logos de empresas aliadas o patrocinadores que se muestran en la galería de la página principal.',
      fields: [
        {
          type: 'image',
          name: 'src',
          label: 'Imagen del logo',
          required: true,
          ui: imagePathUi,
          description: 'Ruta de la imagen del logo. Ejemplo: "/images/logos/ally-company.webp". Formatos recomendados: WebP o SVG.',
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Nombre de la empresa',
          required: true,
          description: 'Nombre de la empresa o marca que aparece como texto alternativo. Ejemplo: "Turismo Inclusivo Perú"',
        },
      ],
    },
  ],
} satisfies Collection<false>;
