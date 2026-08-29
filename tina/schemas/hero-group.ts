import type { Collection } from "tinacms";

export const heroGroup = {
  name: "heroGroup",
  label: "Grupo Hero (Ofertas)",
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
    },
     { type: 'string', name: 'heroVideoUrl', label: 'URL de la pagina principal (YouTube)', required: true },
    {
      type: "string",
      name: "descriptionEn",
      label: "Descripción (Inglés)",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "descriptionEs",
      label: "Descripción (Español)",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "includesTitleEn",
      label: "Título 'Qué incluye' (Inglés)"
    },
    {
      type: "string",
      name: "includesTitleEs",
      label: "Título 'Qué incluye' (Español)"
    },
    {
      type: "object",
      name: "includesEn",
      label: "Elementos incluidos (Inglés)",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.itemEn || "Nuevo ítem" }) },
      fields: [
        { type: "string", name: "itemEn", label: "Elemento (Inglés)" },
        { type: "string", name: "detailEn", label: "Detalle (Inglés)", ui: { component: "textarea" } }
      ],
    },
    {
      type: "object",
      name: "includesEs",
      label: "Elementos incluidos (Español)",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.itemEs || "Nuevo ítem" }) },
      fields: [
        { type: "string", name: "itemEs", label: "Elemento (Español)" },
        { type: "string", name: "detailEs", label: "Detalle (Español)", ui: { component: "textarea" } }
      ],
    },
  ],
} satisfies Collection<false>;
