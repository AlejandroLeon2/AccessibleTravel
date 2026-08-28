import type { Collection } from 'tinacms';

export const blogEn = {
  name: 'blogEn',
  label: 'Blog EN',
  path: 'src/pages/en/blog',
  format: 'mdx',
  defaultItem: () => ({
    layout: '/src/layouts/BlogPostEn.astro',
    title: 'New article',
    description: '',
    image: '',
    date: new Date().toISOString(),
    author: '',
  }),
  fields: [
    { type: 'string', name: 'layout', label: 'Layout (Do not modify)', required: true },
    { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
    { type: 'string', name: 'description', label: 'Description' },
    { type: 'image', name: 'image', label: 'Featured image' },
    { type: 'datetime', name: 'date', label: 'Publication date' },
    { type: 'string', name: 'author', label: 'Author' },
    { type: 'rich-text', name: 'body', label: 'Article content', isBody: true },
  ],
} satisfies Collection<false>;
