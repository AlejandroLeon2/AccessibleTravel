import type { Collection } from 'tinacms';
import { imagePathUi } from '../utils/image-field';

export const siteConfig = {
  name: 'siteConfig',
  label: 'Configuración del sitio',
  path: 'src/content/config',
  format: 'json',
  match: { include: 'site' },
  ui: { global: true },

  fields: [
    { type: 'string', name: 'nombre', label: 'Nombre', required: true },
    { type: 'string', name: 'descripcion', label: 'Descripción', required: true, ui: { component: 'textarea' } },
    { type: 'string', name: 'correo', label: 'Correo', required: true },
    { type: 'string', name: 'uid', label: 'UID de WeTravel', required: true, description: 'Identificador usado para las analíticas de WeTravel' },
    { type: 'string', name: 'heroVideoUrl', label: 'URL de la pagina principal (YouTube)', required: true },
    { type: 'image', name: 'authorImage', label: 'Imagen del autor', required: true },

    {
      type: 'object',
      name: 'contactos',
      label: 'Contactos directos',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.tipo || ''} ${item?.numero || ''}` }) },
      fields: [
        {
          type: 'string',
          name: 'tipo',
          label: 'Tipo de contacto',
          required: true,
          ui: {
            component: 'select',
            options: [
              { label: 'WhatsApp', value: 'whatsapp' },
              { label: 'Messenger', value: 'messenger' }
            ]
          }
        },
        { type: 'string', name: 'pais', label: 'País' },
        { type: 'string', name: 'numero', label: 'Número' },
        { type: 'string', name: 'tooltipText', label: 'Texto' },
        { type: 'string', name: 'mensaje', label: 'Mensaje', ui: { component: 'textarea' } },
        { type: 'string', name: 'title', label: 'Título' },
        { type: 'string', name: 'url', label: 'URL' },
        { type: 'string', name: 'valor', label: 'Valor (Messenger)' }
      ]
    },

    {
      type: 'object',
      name: 'telefonos',
      label: 'Teléfonos',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.pais || ''} ${item?.numero || ''}` }) },
      fields: [
        { type: 'string', name: 'pais', label: 'País', required: true },
        { type: 'string', name: 'numero', label: 'Número', required: true },
        { type: 'string', name: 'url', label: 'URL', required: true }
      ]
    },

    { type: 'string', name: 'direccion', label: 'Dirección', required: true },
    {
      type: 'object',
      name: 'direccionHeader',
      label: 'Dirección del encabezado',
      fields: [
        { type: 'string', name: 'pais', label: 'País', required: true },
        { type: 'string', name: 'texto', label: 'Texto', required: true },
        { type: 'string', name: 'url', label: 'URL', required: true }
      ]
    },

    {
      type: 'object',
      name: 'redes',
      label: 'Redes sociales',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.tipo || ''} ${item?.handle || ''}` }) },
      fields: [
        {
          type: 'string',
          name: 'tipo',
          label: 'Tipo de red',
          required: true,
          ui: {
            component: 'select',
            options: [
              { label: 'Facebook', value: 'facebook' },
              { label: 'Instagram', value: 'instagram' },
              { label: 'YouTube', value: 'youtube' },
              { label: 'TikTok', value: 'tiktok' },
              { label: 'WhatsApp', value: 'whatsapp' },
              { label: 'Messenger', value: 'messenger' }
            ]
          }
        },
        { type: 'string', name: 'icono', label: 'Icono', required: true },
        { type: 'string', name: 'url', label: 'URL', required: true },
        { type: 'string', name: 'handle', label: 'Usuario', required: true },
        { type: 'string', name: 'pais', label: 'País' }
      ]
    }
  ]
} satisfies Collection<false>;
