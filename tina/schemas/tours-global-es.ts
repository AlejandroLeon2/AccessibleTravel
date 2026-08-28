import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

export const toursGlobalesEs = {
  name: 'toursGlobalesEs',
  label: 'Tours Peru ES',
  path: 'src/content/tours-global/peru/es',
  format: 'json',
  fields: [
    { type: 'string', name: 'title', label: 'Título del tour', isTitle: true, required: true },
    { type: 'string', name: 'titleLink', label: 'Slug de URL', required: true },
    { type: 'string', name: 'operator', label: 'Operador del tour' },
    { type: 'string', name: 'duration', label: 'Duración del tour' },
    { type: 'boolean', name: 'siempreFecha', label: 'Mostrar cuenta regresiva' },
    { type: 'string', name: 'startDate', label: 'Fecha de inicio' },
    { type: 'string', name: 'endDate', label: 'Fecha de fin' },
    { type: 'number', name: 'rating', label: 'Calificación' },
    { type: 'number', name: 'reviews', label: 'Reseñas' },
    { type: 'boolean', name: 'recomendado', label: 'Recomendado' },
    { type: 'boolean', name: 'agotado', label: 'Agotado' },
    { type: 'string', name: 'groupSize', label: 'Tamaño del grupo' },
    { type: 'string', name: 'location', label: 'Ubicación' },
    { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
    { type: 'string', name: 'slogan', label: 'Eslogan' },
    { type: 'string', name: 'contact', label: 'Información de contacto' },
    { type: 'string', name: 'highlights', label: 'Puntos destacados', list: true },
    { type: 'string', name: 'includes', label: 'Servicios incluidos', list: true },
    { type: 'string', name: 'excludes', label: 'Servicios no incluidos', list: true },
    {
      type: 'object', name: 'packages', label: 'Paquetes de precios', list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Nombre' },
        { type: 'string', name: 'capacity', label: 'Capacidad' },
        { type: 'string', name: 'price', label: 'Precio' },
        { type: 'string', name: 'deposit', label: 'Depósito' },
        { type: 'string', name: 'description', label: 'Descripción' },
      ],
    },
    {
      type: 'object', name: 'addOns', label: 'Servicios adicionales', list: true,
      fields: [
        { type: 'string', name: 'name', label: 'Nombre' },
        { type: 'string', name: 'price', label: 'Precio' },
        { type: 'string', name: 'description', label: 'Descripción', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'itinerary', label: 'Itinerario detallado', list: true,
      fields: [
        { type: 'number', name: 'day', label: 'Número de día' },
        { type: 'string', name: 'time', label: 'Hora' },
        { type: 'string', name: 'title', label: 'Título del día' },
        { type: 'string', name: 'description', label: 'Descripción del día', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'object', name: 'images', label: 'Imágenes del tour', list: true,
      fields: [
        { type: 'image', name: 'link', label: 'Ruta de la imagen', required: true, ui: imagePathUi },
        { type: 'string', name: 'alt', label: 'Texto alternativo', required: true },
        { type: 'string', name: 'title', label: 'Título' },
      ],
    },
    {
      type: 'object', name: 'links', label: 'Enlaces importantes',
      fields: [
        { type: 'string', name: 'book', label: 'Enlace de reserva' },
        { type: 'string', name: 'brochure', label: 'Enlace del folleto' },
        { type: 'string', name: 'inquire', label: 'Enlace de consulta' },
      ],
    },
  ],
} as unknown as Collection<false>;
