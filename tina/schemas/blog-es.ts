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
    {
      type: 'string',
      name: 'layout',
      label: 'Layout (No modificar)',
      required: true,
      description: 'Componente de layout de Astro para renderizar esta publicación. Debe ser "/src/layouts/BlogPostEs.astro".',
    },
    {
      type: 'string',
      name: 'title',
      label: 'Título del artículo',
      isTitle: true,
      required: true,
      description: 'Encabezado principal del post. Ejemplo: "Cusco Accesible: Guía Completa para Usuarios de Silla de Ruedas"',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descripción meta',
      description: 'Resumen corto que aparece en resultados de búsqueda y vistas previas sociales. Se recomiendan 120-160 caracteres. Ejemplo: "Descubrí las mejores atracciones accesibles, hoteles y consejos para visitar Cusco en silla de ruedas."',
    },
    {
      type: 'image',
      name: 'image',
      label: 'Imagen destacada',
      description: 'Imagen de portada que se muestra en el listado del blog y al inicio del artículo. Tamaño recomendado: 1200x630px.',
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Fecha de publicación',
      description: 'Fecha en que se publicó el artículo. Se usa para ordenar (más reciente primero). Ejemplo: "2026-03-15T00:00:00.000Z"',
    },
    {
      type: 'string',
      name: 'author',
      label: 'Nombre del autor',
      description: 'Nombre del autor del artículo tal como aparece en la publicación. Ejemplo: "Accessible Travel Peru"',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Contenido del artículo',
      isBody: true,
      description: 'Contenido principal del artículo escrito en MDX. Soporta imágenes, bloques de código y componentes personalizados.',
    },
  ],
} satisfies Collection<false>;
