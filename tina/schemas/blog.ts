import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

/**
 * Schema unificado de blog — reutilizable para EN y ES.
 * El path se parametriza en tina/config.ts.
 *
 * Labels y descriptions en español.
 */
export const blogBase = {
  format: 'mdx',
  defaultItem: () => ({
    title: 'new-post',
    description: '',
    image: '',
    date: new Date().toISOString(),
    author: '',
  }),
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título del artículo',
      isTitle: true,
      required: true,
      description: 'Encabezado principal del post. Ejemplo: "Cusco Accesible: Guía Completa"',
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descripción meta',
      description: 'Resumen corto para búsqueda y redes sociales. 120-160 caracteres.',
    },
    {
      type: 'image',
      name: 'image',
      label: 'Imagen destacada',
      description: 'Imagen de portada. Tamaño recomendado: 1200x630px.',
      ui: imagePathUi,
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Fecha de publicación',
      description: 'Fecha de publicación. Se usa para ordenar (más reciente primero).',
    },
    {
      type: 'string',
      name: 'author',
      label: 'Nombre del autor',
      description: 'Nombre del autor tal como aparece en la publicación.',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Contenido del artículo',
      isBody: true,
      description: 'Contenido principal en MDX. Soporta imágenes, código y componentes.',
    },
  ],
};
