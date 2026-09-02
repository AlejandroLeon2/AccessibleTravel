import type { Collection } from 'tinacms';
import { FixedList } from "../components/FixedList";

const menuItemChildSchema = {
  type: 'object' as const,
  name: 'children',
  label: 'Submenú',
  list: true,
  ui: { itemProps: (item) => ({ label: `${item?.labels?.es || item?.labels?.en || ''} (${item?.href || ''})` }) },
  description: 'Elementos del submenú desplegable. Se muestran al hacer clic o hover sobre el ítem padre.',
  fields: [
    {
      type: 'string' as const,
      name: 'key',
      label: 'Clave interna',
      description: 'Identificador único del ítem. Debe coincidir con el usado en el código. Ejemplo: "ContactUs", "AboutUs".',
      required: true,
    },
    {
      type: 'object' as const,
      name: 'labels',
      label: 'Etiquetas por idioma',
      description: 'Traducciones del texto visible en el menú.',
      fields: [
        {
          type: 'string',
          name: 'en',
          label: 'Etiqueta EN',
          description: 'Texto en inglés que se muestra en el menú. Ejemplo: "Contact Us"',
          required: true,
        },
        {
          type: 'string',
          name: 'es',
          label: 'Etiqueta ES',
          description: 'Texto en español que se muestra en el menú. Ejemplo: "Contáctanos"',
          required: true,
        },
      ],
    },
    {
      type: 'string' as const,
      name: 'href',
      label: 'Ruta',
      description: 'Ruta relativa dentro del sitio. Ejemplo: "/contacto", "/aboutUs".',
      required: true,
    },
    {
      type: 'image' as const,
      name: 'coverImage',
      label: 'Imagen de portada',
      description: 'Imagen que se muestra como fondo del submenú. Ejemplo: "/images/machu.webp".',
      required: true,
    },
    {
      type: 'boolean' as const,
      name: 'visible',
      label: 'Visible',
      description: 'Si está activo, el ítem se muestra en el menú. Si está desactivado, se oculta.',
      ui: {
        defaultValue: true,
      },
    },
  ],
};

export const headerMenu = {
  name: 'headerMenu',
  label: 'Menú de navegación',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'menu' },
  ui: { global: true },
  fields: [
    {
      type: 'object',
      name: 'items',
      label: 'Ítems del menú (No modificar por el momento)',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.labels?.es || item?.labels?.en || ''} (${item?.href || ''})` }),
    //component: FixedList,
    },
      description: 'Elementos principales del menú de navegación. Se muestran en el header del sitio.',
      fields: [
        {
          type: 'string',
          name: 'key',
          label: 'Clave interna',
          description: 'Identificador único del ítem. Debe coincidir con el usado en el código para resolver la página. Ejemplo: "Home", "Blog".',
          required: true,
        },
        {
          type: 'object',
          name: 'labels',
          label: 'Etiquetas por idioma',
          description: 'Traducciones del texto visible en el menú.',
          fields: [
            {
              type: 'string',
              name: 'en',
              label: 'Etiqueta EN',
              description: 'Texto en inglés que se muestra en el menú. Ejemplo: "Home"',
              required: true,
            },
            {
              type: 'string',
              name: 'es',
              label: 'Etiqueta ES',
              description: 'Texto en español que se muestra en el menú. Ejemplo: "Inicio"',
              required: true,
            },
          ],
        },
        {
          type: 'string',
          name: 'href',
          label: 'Ruta',
          description: 'Ruta relativa dentro del sitio. Ejemplo: "/", "/blog", "/destino/peru".',
          required: true,
        },
        {
          type: 'image',
          name: 'coverImage',
          label: 'Imagen de portada',
          description: 'Imagen que se muestra como fondo del submenú. Ejemplo: "/images/new2principal.webp".',
          required: true,
        },
        {
          type: 'boolean',
          name: 'visible',
          label: 'Visible',
          description: 'Si está activo, el ítem se muestra en el menú. Si está desactivado, se oculta.',
          ui: {
            defaultValue: true,
          },
        },
        menuItemChildSchema,
      ],
    },
  ],
} satisfies Collection<false>;
