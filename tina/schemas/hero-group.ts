import type { Collection } from "tinacms";

export const heroGroup = {
  name: "heroGroup",
  label: "Pagina Group Tours",
  path: "src/content/config",
  format: "json",
  match: { include: "hero-group" },
  ui: { global: true },

  fields: [
    {
      type: "string",
      name: "discountPercent",
      label: "Porcentaje de descuento (%)",
      ui: { component: "number" },
      description: 'Número del descuento mostrado en el banner. Ejemplo: "15" para 15%. Dejar vacío si no hay descuento.',
    },
    {
      type: 'string',
      name: 'heroVideoUrl',
      label: 'URL del video hero (YouTube)',
      required: true,
      description: 'URL completa del video de YouTube que se reproduce de fondo. Ejemplo: "https://www.youtube.com/watch?v=abc123"',
    },
    {
      type: "string",
      name: "descriptionEn",
      label: "Descripción (Inglés)",
      ui: { component: "textarea" },
      description: 'Texto descriptivo de la página de group tours en inglés. Ejemplo: "Join our accessible group tours through Peru\'s most breathtaking destinations."',
    },
    {
      type: "string",
      name: "descriptionEs",
      label: "Descripción (Español)",
      ui: { component: "textarea" },
      description: 'Texto descriptivo de la página de group tours en español. Ejemplo: "Unite a nuestros tours grupales accesibles por los destinos más impresionantes de Perú."',
    },
    {
      type: "string",
      name: "includesTitleEn",
      label: "Título de sección 'Qué incluye' (Inglés)",
      description: 'Encabezado de la lista de servicios incluidos. Ejemplo: "What\'s Included"',
    },
    {
      type: "string",
      name: "includesTitleEs",
      label: "Título de sección 'Qué incluye' (Español)",
      description: 'Encabezado de la lista de servicios incluidos. Ejemplo: "Qué Incluye"',
    },
    {
      type: "object",
      name: "includesEn",
      label: "Servicios incluidos (Inglés)",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.itemEn || "Nuevo ítem" }) },
      description: 'Lista de servicios incluidos en el tour grupal.',
      fields: [
        {
          type: "string",
          name: "itemEn",
          label: "Servicio",
          description: 'Nombre del servicio incluido. Ejemplo: "Accessible transportation"',
        },
        {
          type: "string",
          name: "detailEn",
          label: "Detalle",
          ui: { component: "textarea" },
          description: 'Explicación detallada del servicio. Ejemplo: "Wheelchair-accessible vans with ramp and tie-down systems for all ground transfers."',
        },
      ],
    },
    {
      type: "object",
      name: "includesEs",
      label: "Servicios incluidos (Español)",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.itemEs || "Nuevo ítem" }) },
      description: 'Lista de servicios incluidos en el tour grupal.',
      fields: [
        {
          type: "string",
          name: "itemEs",
          label: "Servicio",
          description: 'Nombre del servicio incluido. Ejemplo: "Transporte accesible"',
        },
        {
          type: "string",
          name: "detailEs",
          label: "Detalle",
          ui: { component: "textarea" },
          description: 'Explicación detallada del servicio. Ejemplo: "Vans accesibles con rampa y sistema de sujeción para todas las transferencias terrestres."',
        },
      ],
    },
  ],
} satisfies Collection<false>;
