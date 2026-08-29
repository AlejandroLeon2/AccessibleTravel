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
    {
      type: 'string',
      name: 'layout',
      label: 'Layout (Do not modify)',
      required: true,
      description: 'Astro layout component used to render this post. Must be "/src/layouts/BlogPostEn.astro".',
    },
    {
      type: 'string',
      name: 'title',
      label: 'Article title',
      isTitle: true,
      required: true,
      description: 'Main heading of the blog post. Example: "Accessible Cusco: A Complete Guide for Wheelchair Users"',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Meta description',
      description: 'Short summary shown in search results and social previews. 120-160 characters recommended. Example: "Discover the best accessible attractions, hotels, and tips for visiting Cusco with a wheelchair."',
    },
    {
      type: 'image',
      name: 'image',
      label: 'Featured image',
      description: 'Cover image displayed on the blog listing and at the top of the article. Recommended size: 1200x630px.',
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Publication date',
      description: 'Date the article was published. Used for sorting (newest first). Example: "2026-03-15T00:00:00.000Z"',
    },
    {
      type: 'string',
      name: 'author',
      label: 'Author name',
      description: 'Name of the article author as it appears on the post. Example: "Accessible Travel Peru"',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Article content',
      isBody: true,
      description: 'Main content of the article written in MDX. Supports images, code blocks, and custom components.',
    },
  ],
} satisfies Collection<false>;
