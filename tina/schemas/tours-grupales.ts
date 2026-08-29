import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';
import { defaultGroupTourEs } from '../defaults/group-tour';

export const toursGrupales = {
  name: 'toursGrupalesEs',
  label: 'Tours Grupales ES',
  path: 'src/content/tours-grupales/es',
  format: 'json',
  defaultItem: defaultGroupTourEs,
  fields: [
    // ── Identidad ─────────────────────────────────────────────────────
    {
      type: 'string',
      name: 'title',
      label: 'Título del tour',
      isTitle: true,
      required: true,
      description: 'Nombre del tour grupal que se muestra al usuario. Ejemplo: "Machu Picchu, Titicaca & Rainbow Mountain — Septiembre 2026"',
    },
    {
      type: 'string',
      name: 'titleLink',
      label: 'Slug de URL',
      required: true,
      ui: {
        validate: (value: unknown) =>
          typeof value !== 'string' || !value
            ? 'El slug es obligatorio'
            : /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
              ? null
              : 'Usa sólo minúsculas, números y guiones simples',
      },
      description: 'Identificador amigable para la URL. Ejemplo: "machu-picchu-titicaca-septiembre-2026"',
    },

    // ── Información general ───────────────────────────────────────────
    {
      type: 'string',
      name: 'operator',
      label: 'Operador',
      description: 'Empresa u organización que opera el tour. Ejemplo: "Accessible Travel Peru"',
    },
    {
      type: 'string',
      name: 'duration',
      label: 'Duración (días)',
      description: 'Cantidad de días como texto. Ejemplo: "10"',
    },
    {
      type: 'boolean',
      name: 'siempreFecha',
      label: 'Fecha fija',
      description: 'Si está activo, el tour tiene fechas específicas y muestra una cuenta regresiva.',
    },
    {
      type: 'datetime',
      name: 'startDate',
      label: 'Fecha de inicio',
      description: 'Fecha y hora de inicio del tour. Se usa para la cuenta regresiva. Ejemplo: "2026-09-15T08:00:00.000Z"',
    },
    {
      type: 'datetime',
      name: 'endDate',
      label: 'Fecha de fin',
      description: 'Fecha de finalización del tour. Ejemplo: "2026-09-24T18:00:00.000Z"',
    },

    // ── Calificaciones y estado ───────────────────────────────────────
    {
      type: 'number',
      name: 'rating',
      label: 'Calificación (1-5)',
      ui: {
        validate: (value: unknown) =>
          typeof value !== 'number' || (value >= 0 && value <= 5)
            ? null
            : 'La calificación debe estar entre 0 y 5',
      },
      description: 'Promedio de calificación de los huéspedes. Ejemplo: 4.8',
    },
    {
      type: 'number',
      name: 'reviews',
      label: 'Cantidad de reseñas',
      ui: {
        validate: (value: unknown) =>
          typeof value !== 'number' || (Number.isInteger(value) && value >= 0)
            ? null
            : 'Las reseñas deben ser un número entero no negativo',
      },
      description: 'Total de reseñas recibidas. Ejemplo: 24',
    },
    {
      type: 'boolean',
      name: 'recomendado',
      label: 'Recomendado',
      description: 'Si está activo, el tour aparece destacado en la página de tours grupales.',
    },
    {
      type: 'boolean',
      name: 'agotado',
      label: 'Agotado',
      description: 'Marca el tour como agotado. Se muestra un badge de "Agotado" y desactiva la reserva.',
    },
    {
      type: 'string',
      name: 'groupSize',
      label: 'Tamaño del grupo',
      description: 'Cantidad mínima y máxima de viajeros. Ejemplo: "8 - 16"',
    },
    {
      type: 'string',
      name: 'location',
      label: 'Destinos',
      description: 'Destinos principales del tour. Ejemplo: "Cusco, Puno, Lima"',
    },

    // ── Contenido ─────────────────────────────────────────────────────
    {
      type: 'string',
      name: 'description',
      label: 'Descripción del tour',
      ui: { component: 'textarea' },
      description: 'Descripción completa del tour grupal. Incluir detalles de accesibilidad, fechas y lo que lo hace único.',
    },
    {
      type: 'string',
      name: 'highlights',
      label: 'Puntos destacados',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Punto destacado' }) },
      description: 'Aspectos clave del tour mostrados como viñetas. Ejemplo: "Acceso prioritario a Machu Picchu", "Guía bilingüe especializado"',
    },

    // ── Incluido / No incluido ────────────────────────────────────────
    {
      type: 'string',
      name: 'includes',
      label: 'Servicios incluidos',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Servicio incluido' }) },
      description: 'Servicios cubiertos por el precio. Ejemplo: "Hoteles 4* accesibles", "Vans adaptadas con rampa"',
    },
    {
      type: 'string',
      name: 'excludes',
      label: 'Servicios no incluidos',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Servicio no incluido' }) },
      description: 'Servicios NO cubiertos por el precio. Ejemplo: "Pasajes internos", "Seguro de viaje"',
    },

    // ── Paquetes de precios ───────────────────────────────────────────
    {
      type: 'object',
      name: 'packages',
      label: 'Paquetes de precios',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.name || 'Paquete' }) },
      description: 'Opciones de precio según el tipo de viajero. Ejemplo: Usuario de silla de ruedas, $3,845, depósito $500.',
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Nombre del paquete',
          description: 'Tipo de viajero o categoría. Ejemplo: "Silla de ruedas", "Acompañante", "Sin discapacidad"',
        },
        {
          type: 'string',
          name: 'price',
          label: 'Precio',
          description: 'Precio completo con moneda. Ejemplo: "$3,845"',
        },
        {
          type: 'string',
          name: 'deposit',
          label: 'Depósito',
          description: 'Seña requerida para reservar. Ejemplo: "$500"',
        },
      ],
    },

    // ── Servicios adicionales ─────────────────────────────────────────
    {
      type: 'string',
      name: 'addOns',
      label: 'Servicios opcionales',
      list: true,
      ui: { itemProps: (item) => ({ label: item || 'Servicio adicional' }) },
      description: 'Extras disponibles para reservar. Ejemplo: "Día extra en Lima — $70", "Tren panorámico 360° — $100"',
    },

    // ── Itinerario ────────────────────────────────────────────────────
    {
      type: 'object',
      name: 'itinerary',
      label: 'Itinerario',
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title ? `Día ${item?.day || '?'} — ${item.title}` : 'Día' }) },
      description: 'Desglose día por día del tour. Un objeto por cada día.',
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
          description: 'Nombre corto del día. Ejemplo: "Arribo a Lima — Bienvenidos a Perú"',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Descripción del día',
          ui: { component: 'textarea' },
          description: 'Narrativa completa del día. Incluir transporte accesible, comidas, actividades y opciones opcionales.',
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
      description: 'Fotos del tour que se muestran en el carrusel de la galería.',
      fields: [
        {
          type: 'image',
          name: 'link',
          label: 'Imagen',
          required: true,
          ui: imagePathUi,
          description: 'Ruta de la imagen relativa a public/. Ejemplo: "/images/tours/grupal-machu-picchu.webp"',
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Texto alternativo',
          required: true,
          description: 'Descripción accesible de la imagen. Ejemplo: "Grupo de viajeros accesibles en la entrada de Machu Picchu"',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Pie de foto',
          description: 'Etiqueta corta que aparece debajo de la imagen. Ejemplo: "Machu Picchu Sunrise Tour"',
        },
      ],
    },

    // ── Enlaces ───────────────────────────────────────────────────────
    {
      type: 'object',
      name: 'links',
      label: 'Enlaces externos',
      description: 'URLs de reserva, folleto y consulta.',
      fields: [
        {
          type: 'string',
          name: 'book',
          label: 'URL de reserva',
          description: 'Enlace a la plataforma de reserva. Ejemplo: "https://accessibletravelperu.wetravel.com/trips/machu-picchu-sept-2026"',
        },
        {
          type: 'string',
          name: 'brochure',
          label: 'Folleto',
          description: 'URL para descargar el PDF, o texto del botón. Ejemplo: "Descargar folleto"',
        },
        {
          type: 'string',
          name: 'inquire',
          label: 'Consulta',
          description: 'URL o etiqueta del botón de consulta. Ejemplo: "Hacer una pregunta"',
        },
      ],
    },
  ],
} as unknown as Collection<false>;
