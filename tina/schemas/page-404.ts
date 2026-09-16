import type { Collection } from 'tinacms';

export const page404 = {
  name: 'page404',
  label: 'Página 404',
  path: 'src/content/config',
  format: 'json',
  match: { include: '404' },
   ui: {
    router: () => '/s',
  },
  fields: [
    {
      type: 'object',
      name: 'titulo',
      label: 'Título',
      fields: [
        { type: 'string', name: 'en', label: 'English', required: true },
        { type: 'string', name: 'es', label: 'Español', required: true },
      ],
      description: 'Título principal de la página 404',
    },
    {
      type: 'object',
      name: 'descripcion',
      label: 'Descripción',
      fields: [
        { type: 'string', name: 'en', label: 'English', required: true, ui: { component: 'textarea' } },
        { type: 'string', name: 'es', label: 'Español', required: true, ui: { component: 'textarea' } },
      ],
      description: 'Mensaje explicativo para el usuario',
    },
    {
      type: 'object',
      name: 'botonInicio',
      label: 'Texto del botón Inicio',
      fields: [
        { type: 'string', name: 'en', label: 'English', required: true },
        { type: 'string', name: 'es', label: 'Español', required: true },
      ],
      description: 'Etiqueta del botón para volver al inicio',
    },
    {
      type: 'object',
      name: 'botonBlog',
      label: 'Texto del botón Blog',
      fields: [
        { type: 'string', name: 'en', label: 'English', required: true },
        { type: 'string', name: 'es', label: 'Español', required: true },
      ],
      description: 'Etiqueta del botón para ir al blog',
    },
    {
      type: 'object',
      name: 'enlacesRapidos',
      label: 'Enlaces rápidos',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.texto?.en || ''} / ${item?.texto?.es || ''}` }) },
      description: 'Enlaces de navegación rápida',
      fields: [
        {
          type: 'object',
          name: 'texto',
          label: 'Texto del enlace',
          fields: [
            { type: 'string', name: 'en', label: 'English', required: true },
            { type: 'string', name: 'es', label: 'Español', required: true },
          ],
        },
        {
          type: 'string',
          name: 'url',
          label: 'URL (EN)',
          required: true,
        },
        {
          type: 'string',
          name: 'urlEs',
          label: 'URL (ES)',
          required: true,
        },
      ],
    },
    {
      type: 'image',
      name: 'imagenFondo',
      label: 'Imagen de fondo',
      description: 'Imagen de fondo de la página 404 (opcional)',
    },
    {
      type: 'object',
      name: 'mensajeContacto',
      label: 'Mensaje de contacto',
      fields: [
        { type: 'string', name: 'en', label: 'English', required: true, ui: { component: 'textarea' } },
        { type: 'string', name: 'es', label: 'Español', required: true, ui: { component: 'textarea' } },
      ],
      description: 'Mensaje alternativo si el usuario necesita ayuda',
    },
  ],
} satisfies Collection<false>;
