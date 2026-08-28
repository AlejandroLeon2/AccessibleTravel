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
      fields: [
        { type: 'image', name: 'src', label: 'Imagen', required: true, ui: imagePathUi },
        { type: 'string', name: 'alt', label: 'Texto alternativo', required: true },
      ],
    },
  ],
} satisfies Collection<false>;
