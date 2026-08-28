import type { Collection } from 'tinacms';

export const blogEs = {
  name: 'blogEs',
  label: 'Blog ES',
  path: 'src/pages/es/blog',
  format: 'mdx',
  defaultItem: () => ({
    layout: '/src/layouts/BlogPostEs.astro',
    title: 'Nuevo artículo',
    description: '',
    image: '',
    date: new Date().toISOString(),
    author: '',
  }),
  fields: [
    { type: 'string', name: 'layout', label: 'Layout (No modificar)', required: true },
    { type: 'string', name: 'title', label: 'Título', isTitle: true, required: true },
    { type: 'string', name: 'description', label: 'Descripción' },
    { type: 'image', name: 'image', label: 'Imagen destacada' },
    { type: 'datetime', name: 'date', label: 'Fecha de publicación' },
    { type: 'string', name: 'author', label: 'Autor' },
    { type: 'rich-text', name: 'body', label: 'Contenido del artículo', isBody: true },
  ],
} satisfies Collection<false>;
