import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

/**
 * Campos comunes para tours globales y grupales.
 * Estos campos se reutilizan en ambos schemas via import/spread.
 *
 * Labels y descriptions en español.
 */
export const tourBaseFields: Collection<false>['fields'] = [
  // ── Identidad ─────────────────────────────────────────────────────
  {
    type: 'string' as const,
    name: 'title',
    label: 'Título',
    isTitle: true,
    required: true,
    description: 'Nombre del tour. Ejemplo: "Machu Picchu Accesible"',
  },

  // ── Información general ───────────────────────────────────────────
  {
    type: 'string' as const,
    name: 'operator',
    label: 'Operador',
    description: 'Empresa que opera el tour.',
  },
  {
    type: 'string' as const,
    name: 'duration',
    label: 'Duración (días)',
    description: 'Cantidad de días como texto. Ejemplo: "8"',
  },
  {
    type: 'string' as const,
    name: 'location',
    label: 'Ubicación',
    description: 'Destino principal del tour.',
  },
  {
    type: 'string' as const,
    name: 'groupSize',
    label: 'Tamaño del grupo',
    description: 'Cantidad mínima y máxima. Ejemplo: "2 - 8"',
  },

  // ── Calificaciones y estado ───────────────────────────────────────
  {
    type: 'number' as const,
    name: 'rating',
    label: 'Calificación',
    description: 'Promedio (1 a 5). Ejemplo: 5',
  },
  {
    type: 'number' as const,
    name: 'reviews',
    label: 'Cantidad de reseñas',
    description: 'Total de reseñas. Ejemplo: 39',
  },
  {
    type: 'boolean' as const,
    name: 'recomendado',
    label: 'Recomendado',
    description: 'Se muestra como recomendado en la página principal.',
  },
  {
    type: 'boolean' as const,
    name: 'siempreFecha',
    label: 'Siempre disponible',
    description: 'Sin fechas fijas, disponible todo el año.',
  },
  {
    type: 'boolean' as const,
    name: 'agotado',
    label: 'Agotado',
    description: 'Marca el tour como agotado.',
  },

  // ── Contenido ─────────────────────────────────────────────────────
  {
    type: 'string' as const,
    name: 'description',
    label: 'Descripción',
    ui: { component: 'textarea' },
    description: 'Descripción completa del tour.',
  },
  {
    type: 'string' as const,
    name: 'slogan',
    label: 'Eslogan',
    description: 'Frase corta debajo del título.',
  },
  {
    type: 'string' as const,
    name: 'contact',
    label: 'Texto de contacto',
    description: 'Texto del botón de contacto.',
  },

  // ── Puntos destacados ─────────────────────────────────────────────
  {
    type: 'string' as const,
    name: 'highlights',
    label: 'Puntos destacados',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item || 'Punto destacado' }) } as any,
    description: 'Lista de aspectos clave del tour.',
  },

  // ── Incluido / No incluido ────────────────────────────────────────
  {
    type: 'string' as const,
    name: 'includes',
    label: 'Servicios incluidos',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item || 'Servicio incluido' }) } as any,
    description: 'Servicios cubiertos por el precio.',
  },
  {
    type: 'string' as const,
    name: 'excludes',
    label: 'Servicios no incluidos',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item || 'Servicio no incluido' }) } as any,
    description: 'Servicios NO cubiertos.',
  },

  // ── Paquetes de precios ───────────────────────────────────────────
  {
    type: 'object' as const,
    name: 'packages',
    label: 'Paquetes de precios',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.name || 'Paquete' }) } as any,
    description: 'Opciones de precio por tipo de viajero.',
    fields: [
      { type: 'string' as const, name: 'name', label: 'Nombre', description: 'Tipo de viajero.' },
      { type: 'string' as const, name: 'capacity', label: 'Capacidad', description: 'Cantidad máxima.' },
      { type: 'string' as const, name: 'price', label: 'Precio', description: 'Precio con moneda.' },
      { type: 'string' as const, name: 'deposit', label: 'Depósito', description: 'Seña requerida.' },
      { type: 'string' as const, name: 'description', label: 'Descripción', description: 'Detalles del paquete.' },
    ],
  },

  // ── Servicios adicionales ─────────────────────────────────────────
  {
    type: 'object' as const,
    name: 'addOns',
    label: 'Servicios opcionales',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.name || 'Servicio adicional' }) } as any,
    description: 'Extras opcionales.',
    fields: [
      { type: 'string' as const, name: 'name', label: 'Nombre', description: 'Nombre del servicio.' },
      { type: 'string' as const, name: 'price', label: 'Precio', description: 'Costo.' },
      { type: 'string' as const, name: 'description', label: 'Descripción', ui: { component: 'textarea' }, description: 'Detalles.' },
    ],
  },

  // ── Itinerario ────────────────────────────────────────────────────
  {
    type: 'object' as const,
    name: 'itinerary',
    label: 'Itinerario',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.title ? `Día ${item?.day || '?'} — ${item.title}` : 'Día' }) } as any,
    description: 'Desglose día por día.',
    fields: [
      { type: 'number' as const, name: 'day', label: 'Número de día', description: 'Secuencial. Ejemplo: 1' },
      { type: 'string' as const, name: 'title', label: 'Título del día', description: 'Nombre corto.' },
      { type: 'string' as const, name: 'description', label: 'Descripción del día', ui: { component: 'textarea' }, description: 'Narrativa completa.' },
    ],
  },

  // ── Imágenes ──────────────────────────────────────────────────────
  {
    type: 'object' as const,
    name: 'images',
    label: 'Galería del tour',
    list: true,
    ui: { itemProps: (item: any) => ({ label: item?.title || item?.alt || 'Imagen' }) } as any,
    description: 'Fotos del carrusel.',
    fields: [
      { type: 'image' as const, name: 'link', label: 'Imagen', required: true, description: 'Ruta relativa a public/.', ui: imagePathUi },
      { type: 'string' as const, name: 'alt', label: 'Texto alternativo', required: true, description: 'Descripción accesible.' },
      { type: 'string' as const, name: 'title', label: 'Pie de foto', description: 'Etiqueta corta.' },
    ],
  },

  // ── Enlaces ───────────────────────────────────────────────────────
  {
    type: 'object' as const,
    name: 'links',
    label: 'Enlaces externos',
    description: 'URLs de reserva y consulta.',
    fields: [
      { type: 'string' as const, name: 'book', label: 'URL de reserva', description: 'Enlace de reserva.' },
      { type: 'string' as const, name: 'brochure', label: 'Folleto', description: 'URL del PDF.' },
      { type: 'string' as const, name: 'inquire', label: 'Consulta', description: 'Botón de consulta.' },
    ],
  },
];
