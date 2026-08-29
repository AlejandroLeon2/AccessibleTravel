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
    {
      type: 'string',
      name: 'nombre',
      label: 'Nombre del sitio',
      required: true,
      description: 'Nombre de la empresa que aparece en el header y pie de página. Ejemplo: "Accessible Travel Peru"',
    },
    {
      type: 'string',
      name: 'descripcion',
      label: 'Descripción del sitio',
      required: true,
      ui: { component: 'textarea' },
      description: 'Descripción corta del negocio para SEO y meta tags. Ejemplo: "Tour operator specializing in accessible travel throughout Peru for wheelchair users and travelers with reduced mobility."',
    },
    {
      type: 'string',
      name: 'correo',
      label: 'Correo electrónico',
      required: true,
      description: 'Email de contacto principal. Ejemplo: "info@accessibletravelperu.com"',
    },
    {
      type: 'string',
      name: 'uid',
      label: 'UID de WeTravel',
      required: true,
      description: 'Identificador único de la cuenta de WeTravel usado para integrar botones de reserva y analíticas. Ejemplo: "travel-peru-12345"',
    },
    {
      type: 'string',
      name: 'heroVideoUrl',
      label: 'URL del video hero (YouTube)',
      required: true,
      description: 'URL completa del video que se reproduce en la sección hero de la página principal. Ejemplo: "https://www.youtube.com/watch?v=abc123"',
    },
    {
      type: 'image',
      name: 'authorImage',
      label: 'Imagen del autor',
      required: true,
      ui: imagePathUi,
      description: 'Foto del fundador o representante que aparece en la sección "Sobre nosotros". Ejemplo: "/images/team/founder.webp"',
    },

    {
      type: 'object',
      name: 'contactos',
      label: 'Contactos directos',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.tipo || ''} ${item?.numero || ''}` }) },
      description: 'Canales de comunicación directa con la empresa (WhatsApp, Messenger).',
      fields: [
        {
          type: 'string',
          name: 'tipo',
          label: 'Canal de contacto',
          required: true,
          ui: {
            component: 'select',
            options: [
              { label: 'WhatsApp', value: 'whatsapp' },
              { label: 'Messenger', value: 'messenger' },
            ],
          },
          description: 'Plataforma de mensajería. Seleccionar WhatsApp o Messenger.',
        },
        {
          type: 'string',
          name: 'pais',
          label: 'Código de país',
          description: 'Código telefónico del país. Ejemplo: "+51" para Perú.',
        },
        {
          type: 'string',
          name: 'numero',
          label: 'Número de teléfono',
          description: 'Número completo con código de país. Ejemplo: "+51984123456"',
        },
        {
          type: 'string',
          name: 'tooltipText',
          label: 'Texto del tooltip',
          description: 'Texto que aparece al pasar el cursor sobre el ícono de contacto. Ejemplo: "Escríbenos por WhatsApp"',
        },
        {
          type: 'string',
          name: 'mensaje',
          label: 'Mensaje predeterminado',
          ui: { component: 'textarea' },
          description: 'Mensaje que se envía automáticamente al abrir el chat. Ejemplo: "Hola, me interesa un tour accesible en Perú"',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Título del botón',
          description: 'Etiqueta visible del botón de contacto. Ejemplo: "WhatsApp"',
        },
        {
          type: 'string',
          name: 'url',
          label: 'URL de contacto',
          description: 'Enlace directo al canal. Ejemplo: "https://wa.me/51984123456?text=Hola"',
        },
        {
          type: 'string',
          name: 'valor',
          label: 'Valor (Messenger)',
          description: 'Identificador de Facebook Messenger. Ejemplo: "https://m.me/accessibletravelperu"',
        },
      ],
    },

    {
      type: 'object',
      name: 'telefonos',
      label: 'Teléfonos',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.pais || ''} ${item?.numero || ''}` }) },
      description: 'Números de teléfono fijos o móviles de la empresa.',
      fields: [
        {
          type: 'string',
          name: 'pais',
          label: 'País',
          required: true,
          description: 'Nombre del país o código telefónico. Ejemplo: "Perú" o "+51"',
        },
        {
          type: 'string',
          name: 'numero',
          label: 'Número',
          required: true,
          description: 'Número de teléfono completo. Ejemplo: "+51 84 123456"',
        },
        {
          type: 'string',
          name: 'url',
          label: 'Enlace tel:',
          required: true,
          description: 'Enlace con protocolo tel: para marcación directa. Ejemplo: "tel:+5184123456"',
        },
      ],
    },

    {
      type: 'string',
      name: 'direccion',
      label: 'Dirección de oficina',
      required: true,
      description: 'Dirección física de la oficina principal. Ejemplo: "Av. El Sol 456, Cusco, Perú"',
    },

    {
      type: 'object',
      name: 'direccionHeader',
      label: 'Dirección del encabezado',
      description: 'Dirección abreviada que se muestra en la barra de navegación superior.',
      fields: [
        {
          type: 'string',
          name: 'pais',
          label: 'País',
          required: true,
          description: 'Nombre corto del país. Ejemplo: "Perú"',
        },
        {
          type: 'string',
          name: 'texto',
          label: 'Texto de la dirección',
          required: true,
          description: 'Dirección corta para el header. Ejemplo: "Cusco, Perú"',
        },
        {
          type: 'string',
          name: 'url',
          label: 'Enlace de Google Maps',
          required: true,
          description: 'URL de la ubicación en Google Maps. Ejemplo: "https://maps.google.com/?q=..."',
        },
      ],
    },

    {
      type: 'object',
      name: 'redes',
      label: 'Redes sociales',
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.tipo || ''} ${item?.handle || ''}` }) },
      description: 'Perfiles de redes sociales que aparecen en el header y pie de página.',
      fields: [
        {
          type: 'string',
          name: 'tipo',
          label: 'Plataforma',
          required: true,
          ui: {
            component: 'select',
            options: [
              { label: 'Facebook', value: 'facebook' },
              { label: 'Instagram', value: 'instagram' },
              { label: 'YouTube', value: 'youtube' },
              { label: 'TikTok', value: 'tiktok' },
              { label: 'WhatsApp', value: 'whatsapp' },
              { label: 'Messenger', value: 'messenger' },
            ],
          },
          description: 'Red social de la que se trata.',
        },
        {
          type: 'string',
          name: 'icono',
          label: 'Nombre del ícono',
          required: true,
          description: 'Nombre del ícono SVG o paquete de íconos. Ejemplo: "facebook", "instagram", "youtube".',
        },
        {
          type: 'string',
          name: 'url',
          label: 'URL del perfil',
          required: true,
          description: 'Enlace completo al perfil. Ejemplo: "https://www.facebook.com/accessibletravelperu"',
        },
        {
          type: 'string',
          name: 'handle',
          label: 'Usuario',
          required: true,
          description: 'Nombre de usuario o alias. Ejemplo: "@accessibletravelperu"',
        },
        {
          type: 'string',
          name: 'pais',
          label: 'País',
          description: 'País asociado al perfil (para redes con presencia regional). Ejemplo: "Perú"',
        },
      ],
    },
  ],
} satisfies Collection<false>;
