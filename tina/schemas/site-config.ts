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
    {
      type: 'object', name: 'whatsapp1', label: 'WhatsApp Perú', fields: [
        { type: 'string', name: 'numero', label: 'Número', required: true },
        { type: 'string', name: 'tooltipText', label: 'Texto', required: true },
        { type: 'string', name: 'mensaje', label: 'Mensaje', required: true, ui: { component: 'textarea' } },
        { type: 'string', name: 'title', label: 'Título', required: true },
      ],
    },
    {
      type: 'object', name: 'whatsapp2', label: 'WhatsApp USA', fields: [
        { type: 'string', name: 'numero', label: 'Número', required: true },
        { type: 'string', name: 'tooltipText', label: 'Texto', required: true },
        { type: 'string', name: 'mensaje', label: 'Mensaje', required: true, ui: { component: 'textarea' } },
        { type: 'string', name: 'title', label: 'Título', required: true },
      ],
    },
    {
      type: 'object', name: 'Messenger', label: 'Messenger', fields: [
        { type: 'string', name: 'valor', label: 'URL', required: true },
        { type: 'string', name: 'tooltipText', label: 'Texto', required: true },
        { type: 'string', name: 'mensaje', label: 'Mensaje', required: true, ui: { component: 'textarea' } },
        { type: 'string', name: 'title', label: 'Título', required: true },
      ],
    },
    {
      type: 'object', name: 'telefonos', label: 'Teléfonos', list: true, fields: [
        { type: 'string', name: 'pais', label: 'País', required: true },
        { type: 'string', name: 'numero', label: 'Número', required: true },
        { type: 'string', name: 'url', label: 'URL', required: true },
      ],
    },
    { type: 'string', name: 'direccion', label: 'Dirección', required: true },
    {
      type: 'object', name: 'direccionHeader', label: 'Dirección del encabezado', fields: [
        { type: 'string', name: 'pais', label: 'País', required: true },
        { type: 'string', name: 'texto', label: 'Texto', required: true },
        { type: 'string', name: 'url', label: 'URL', required: true },
      ],
    },
    {
      type: 'object', name: 'redes', label: 'Redes sociales', list: true, fields: [
        { type: 'string', name: 'icono', label: 'Icono', required: true },
        { type: 'string', name: 'url', label: 'URL', required: true },
        { type: 'string', name: 'handle', label: 'Usuario', required: true },
        { type: 'string', name: 'pais', label: 'País' },
      ],
    },
  ],
} satisfies Collection<false>;
