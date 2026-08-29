import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

/**
 * Schema TinaCMS para tours globales (tours-global/peru/{en,es}).
 *
 * Debe coincidir exactamente con el JSON real en src/content/tours-global/peru/en/*.json
 * y con el schema de Astro en src/content.config.ts (globalTourSchema).
 */
export const toursGlobales = {
  name: 'toursGlobalesEs',
  label: 'Tours Peru',
  path: 'src/content/tours-global/peru/es',
  format: 'json',
  fields: [
    // ── Identidad ─────────────────────────────────────────────────────
    {
      type: 'string',
      name: 'title',
      label: 'Título',
      isTitle: true,
      required: true,
      description: 'Nombre del tour que se muestra al usuario. Ejemplo: "The Colors of Cusco"',
    },
    {
      type: 'string',
      name: 'titleLink',
      label: 'Slug de URL',
      required: true,
      description: 'Identificador amigable para la URL. Ejemplo: "colors-of-cusco-accessible-tour"',
    },

    // ── Información general ───────────────────────────────────────────
    {
      type: 'string',
      name: 'operator',
      label: 'Operador',
      description: 'Empresa que opera el tour. Ejemplo: "Accessible Travel Peru"',
    },
    {
      type: 'string',
      name: 'duration',
      label: 'Duración (días)',
      description: 'Cantidad de días como texto. Ejemplo: "8"',
    },
    {
      type: 'string',
      name: 'location',
      label: 'Ubicación',
      description: 'Destino principal del tour. Ejemplo: "Cusco, Perú"',
    },
    {
      type: 'string',
      name: 'groupSize',
      label: 'Tamaño del grupo',
      description: 'Cantidad mínima y máxima de viajeros. Ejemplo: "2 - 8"',
    },

    // ── Calificaciones y estado ───────────────────────────────────────
    {
      type: 'number',
      name: 'rating',
      label: 'Calificación',
      description: 'Promedio de calificación de los huéspedes (1 a 5). Ejemplo: 5',
    },
    {
      type: 'number',
      name: 'reviews',
      label: 'Cantidad de reseñas',
      description: 'Total de reseñas recibidas. Ejemplo: 39',
    },
    {
      type: 'boolean',
      name: 'recomendado',
      label: 'Recomendado',
      description: 'Si está activo, se muestra como recomendado en la página principal.',
    },
    {
      type: 'boolean',
      name: 'siempreFecha',
      label: 'Siempre disponible',
      description: 'Cuando está activo, el tour no tiene fechas fijas y se puede reservar en cualquier momento.',
    },
    {
      type: 'boolean',
      name: 'agotado',
      label: 'Agotado',
      description: 'Marca el tour como agotado. Se mostrará un badge de "Agotado".',
    },

    // ── Contenido ─────────────────────────────────────────────────────
    {
      type: 'string',
      name: 'description',
      label: 'Descripción',
      ui: { component: 'textarea' },
      description: 'Descripción completa del tour que se muestra en la página de detalle.',
    },
    {
      type: 'string',
      name: 'slogan',
      label: 'Eslogan',
      description: 'Frase corta que aparece debajo del título. Ejemplo: "Accessible Travel Peru 🇵🇪 - Making Peru Accessible for Everyone ♿"',
    },
    {
      type: 'string',
      name: 'contact',
      label: 'Texto de contacto',
      description: 'Texto del botón de contacto. Ejemplo: "WhatsApp us... 👉 click here!"',
    },

    // ── Puntos destacados ─────────────────────────────────────────────
    {
      type: 'string',
      name: 'highlights',
      label: 'Puntos destacados',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Punto destacado' }) },
      description: 'Lista de aspectos clave del tour. Ejemplo: "Transporte accesible privado", "Guía bilingüe"',
    },

    // ── Incluido / No incluido ────────────────────────────────────────
    {
      type: 'string',
      name: 'includes',
      label: 'Servicios incluidos',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Servicio incluido' }) },
      description: 'Servicios cubiertos por el precio base. Ejemplo: "4* Hotel accommodation (Double room)"',
    },
    {
      type: 'string',
      name: 'excludes',
      label: 'Servicios no incluidos',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Servicio no incluido' }) },
      description: 'Servicios NO cubiertos. Ejemplo: "Flight Tickets (International Tickets)"',
    },

    // ── Paquetes de precios ───────────────────────────────────────────
    {
      type: 'object',
      name: 'packages',
      label: 'Paquetes de precios',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name || 'Paquete' }) },
      description: 'Cada paquete representa un tipo de viajero con su propio precio.',
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Nombre del paquete',
          description: 'Tipo de viajero. Ejemplo: "Wheelchair user" o "Partner"',
        },
        {
          type: 'string',
          name: 'capacity',
          label: 'Capacidad',
          description: 'Cantidad máxima de lugares para este paquete. Ejemplo: "4"',
        },
        {
          type: 'string',
          name: 'price',
          label: 'Precio',
          description: 'Precio completo con símbolo de moneda. Ejemplo: "$3,010"',
        },
        {
          type: 'string',
          name: 'deposit',
          label: 'Depósito',
          description: 'Seña requerida para reservar. Ejemplo: "$500"',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Descripción del paquete',
          description: 'Detalles adicionales de lo que incluye este paquete.',
        },
      ],
    },

    // ── Servicios adicionales ─────────────────────────────────────────
    {
      type: 'object',
      name: 'addOns',
      label: 'Servicios opcionales',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name || 'Servicio adicional' }) },
      description: 'Extras opcionales que el huésped puede reservar junto al tour.',
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Nombre del servicio',
          description: 'Qué es el servicio adicional. Ejemplo: "Extra day in Lima"',
        },
        {
          type: 'string',
          name: 'price',
          label: 'Precio',
          description: 'Costo con moneda. Ejemplo: "$70"',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Descripción',
          ui: { component: 'textarea' },
          description: 'Explicación detallada del servicio. Ejemplo: "Accessible hotel accommodation per night. Includes Breakfast"',
        },
      ],
    },

    // ── Itinerario ────────────────────────────────────────────────────
    {
      type: 'object',
      name: 'itinerary',
      label: 'Itinerario',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ? `Día ${item?.day || '?'} — ${item.title}` : 'Día' }) },
      description: 'Desglose día por día del tour. Un elemento por día.',
      fields: [
        {
          type: 'number',
          name: 'day',
          label: 'Número de día',
          description: 'Número secuencial del día. Ejemplo: 1',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Título del día',
          description: 'Nombre corto del día que se muestra en la línea de tiempo. Ejemplo: "Arrival in Lima - Welcome to Peru"',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Descripción del día',
          ui: { component: 'textarea' },
          description: 'Narrativa completa de lo que sucede este día. Incluir detalles de transporte accesible, comidas y actividades opcionales.',
        },
      ],
    },

    // ── Imágenes ──────────────────────────────────────────────────────
    {
      type: 'object',
      name: 'images',
      label: 'Galería del tour',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || item?.alt || 'Imagen' }) },
      description: 'Fotos que se muestran en el carrusel de la galería.',
      fields: [
        {
          type: 'image',
          name: 'link',
          label: 'Imagen',
          required: true,
          ui: imagePathUi,
          description: 'Ruta relativa a public/. Ejemplo: "/images/tours/tour-Cf1ucBCeQ96LGsCKpSPW.webp"',
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Texto alternativo',
          required: true,
          description: 'Descripción accesible de la imagen. Ejemplo: "Vibrant colors of Rainbow Mountain"',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Pie de foto',
          description: 'Etiqueta corta debajo de la imagen. Ejemplo: "Rainbow Mountain"',
        },
      ],
    },

    // ── Enlaces ───────────────────────────────────────────────────────
    {
      type: 'object',
      name: 'links',
      label: 'Enlaces externos',
      description: 'URLs de reserva y consulta.',
      fields: [
        {
          type: 'string',
          name: 'book',
          label: 'URL de reserva',
          description: 'URL completa de la página de reserva. Ejemplo: "https://accessibletravelperu.wetravel.com/trips/..."',
        },
        {
          type: 'string',
          name: 'brochure',
          label: 'Folleto',
          description: 'URL para descargar el PDF del folleto, o texto como "Download brochure".',
        },
        {
          type: 'string',
          name: 'inquire',
          label: 'Consulta',
          description: 'URL o etiqueta del botón de consulta. Ejemplo: "Ask a question"',
        },
      ],
    },
  ],
} as unknown as Collection<false>;
