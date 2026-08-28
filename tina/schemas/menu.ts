import type { Collection } from 'tinacms';

const menuItemChildSchema = {
  type: 'object' as const,
  name: 'children',
  label: 'Submenú',
  list: true,
  fields: [
    { type: 'string' as const, name: 'key', label: 'Clave', required: true },
    { type: 'string' as const, name: 'label', label: 'Etiqueta', required: true },
    { type: 'string' as const, name: 'href', label: 'URL', required: true },
    { type: 'image' as const, name: 'coverImage', label: 'Imagen de portada', required: true },
  ],
};

export const headerMenuEs = {
  name: 'headerMenuEs',
  label: 'Menú de navegación (ES)',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'menu-es' },
  ui: { global: true },
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Ítems del menú',
      list: true,
      fields: [
        { type: 'string', name: 'key', label: 'Clave', required: true },
        { type: 'string', name: 'label', label: 'Etiqueta', required: true },
        { type: 'string', name: 'href', label: 'URL', required: true },
        { type: 'image', name: 'coverImage', label: 'Imagen de portada', required: true },
        menuItemChildSchema,
      ],
    },
  ],
} satisfies Collection<false>;

export const headerMenuEn = {
  name: 'headerMenuEn',
  label: 'Menú de navegación (EN)',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'menu-en' },
  ui: { global: true },
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Ítems del menú',
      list: true,
      fields: [
        { type: 'string', name: 'key', label: 'Clave', required: true },
        { type: 'string', name: 'label', label: 'Etiqueta', required: true },
        { type: 'string', name: 'href', label: 'URL', required: true },
        { type: 'image', name: 'coverImage', label: 'Imagen de portada', required: true },
        menuItemChildSchema,
      ],
    },
  ],
} satisfies Collection<false>;
