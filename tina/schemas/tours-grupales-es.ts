import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';
import { defaultGroupTourEs } from '../defaults/group-tour';

export const toursGrupalesEs = {
  name: 'toursGrupalesEs',
  label: 'Group Tours ES',
  path: 'src/content/tours-grupales/es',
  format: 'json',
  defaultItem: defaultGroupTourEs,
  fields: [
    { type: 'string', name: 'title', label: 'Título del tour', isTitle: true, required: true },
    {
      type: 'string', name: 'titleLink', label: 'Slug de URL', required: true,
      ui: { validate: (value: unknown) => typeof value !== 'string' || !value ? 'El slug es obligatorio' : (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? null : 'Usa sólo minúsculas, números y guiones simples') },
    },
    { type: 'string', name: 'operator', label: 'Operador del tour' },
    { type: 'string', name: 'duration', label: 'Duración del tour' },
    { type: 'boolean', name: 'siempreFecha', label: 'Mostrar cuenta regresiva' },
    { type: 'datetime', name: 'startDate', label: 'Fecha de inicio del tour' },
    { type: 'datetime', name: 'endDate', label: 'Fecha de fin del tour' },
    {
      type: 'number', name: 'rating', label: 'Calificación del tour',
      ui: { validate: (value: unknown) => typeof value !== 'number' || (value >= 0 && value <= 5) ? null : 'La calificación debe estar entre 0 y 5' },
    },
    {
      type: 'number', name: 'reviews', label: 'Número de reseñas',
      ui: { validate: (value: unknown) => typeof value !== 'number' || (Number.isInteger(value) && value >= 0) ? null : 'Las reseñas deben ser un número entero no negativo' },
    },
    { type: 'boolean', name: 'recomendado', label: 'Tour recomendado' },
    { type: 'boolean', name: 'agotado', label: 'Tour agotado' },
    { type: 'string', name: 'groupSize', label: 'Tamaño del grupo' },
    { type: 'string', name: 'location', label: 'Ubicación del tour' },
    { type: 'string', name: 'description', label: 'Descripción del tour', ui: { component: 'textarea' } },
    { type: 'string', name: 'highlights', label: 'Puntos destacados', list: true },
    { type: 'string', name: 'includes', label: 'Servicios incluidos', list: true },
    { type: 'string', name: 'excludes', label: 'Servicios no incluidos', list: true },
    {
      type: 'object', name: 'packages', label: 'Paquetes de precios', list: true,
      description: 'Opciones de precio según el tipo de viajero. Ejemplo: Usuario de silla de ruedas, $3,845, depósito $500.',
      fields: [
        { type: 'string', name: 'name', label: 'Nombre del paquete' },
        { type: 'string', name: 'price', label: 'Precio' },
        { type: 'string', name: 'deposit', label: 'Depósito' },
      ],
    },
    { type: 'string', name: 'addOns', label: 'Servicios adicionales', list: true },
    {
      type: 'object', name: 'itinerary', label: 'Itinerario detallado', list: true,
      description: 'Un objeto por cada día del viaje. Ejemplo: Día 1, Arribo a Lima.',
      fields: [
        { type: 'number', name: 'day', label: 'Número de día' },
        { type: 'string', name: 'title', label: 'Título del día' },
        { type: 'string', name: 'description', label: 'Descripción del día', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'images', label: 'Imágenes del tour', list: true,
      description: 'Imágenes mostradas en la galería. Ejemplo: /images/dieciochoprincipal.webp.',
      fields: [
        { type: 'image', name: 'link', label: 'Ruta de la imagen', required: true, ui: imagePathUi },
        { type: 'string', name: 'alt', label: 'Texto alternativo', required: true },
        { type: 'string', name: 'title', label: 'Título de la imagen' },
      ],
    },
    {
      type: 'object', name: 'links', label: 'Enlaces importantes',
      description: 'Enlaces de reserva, folleto y consultas. El enlace de reserva puede contener el ID de WeTravel al final.',
      fields: [
        { type: 'string', name: 'book', label: 'Enlace de reserva' },
        { type: 'string', name: 'brochure', label: 'Enlace del folleto' },
        { type: 'string', name: 'inquire', label: 'Enlace de consulta' },
      ],
    },
  ],
} as unknown as Collection<false>;
