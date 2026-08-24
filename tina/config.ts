import { defineConfig } from "tinacms";

// Detect branch dynamically from hosting provider env vars
const branch = "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || null,
  // Get this from tina.io
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  server: {
    allowedOrigins: process.env.NODE_ENV !== 'production'
      ? ['http://localhost:4321', 'http://localhost:4001']
      : [],
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  ui: {
    previewUrl: (context) => {
      const { collection, document } = context;
      const slug = document._sys.relativePath.replace(/\.(md|mdx)$/, '');
      if (collection.name === 'blogEs') {
        return { url: `/es/blog/${slug}` };
      }
      if (collection.name === 'blogEn') {
        return { url: `/en/blog/${slug}` };
      }
      return { url: `/` };
    },
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "blogEs",
        label: "Blog ES",
        path: "src/pages/es/blog",
        format: "mdx",
        defaultItem: () => {
          return {
            layout: "/src/layouts/BlogPostEs.astro",
            date: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout (No modificar)",
            required: true,
            description: "Layout asignado automáticamente. No cambiar este valor.",
          },
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
            description: "Título del artículo del blog",
          },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            description: "Descripción breve del artículo para SEO",
          },
          {
            type: "image",
            name: "image",
            label: "Imagen destacada",
            description: "Imagen principal del artículo",
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha de publicación",
            description: "Fecha en que se publicará el artículo",
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
            description: "Nombre del autor del artículo",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido del artículo",
            isBody: true,
            description: "Contenido principal del artículo en formato rich text",
          },
        ],
      },
      {
        name: "blogEn",
        label: "Blog EN",
        path: "src/pages/en/blog",
        format: "mdx",
        defaultItem: () => {
          return {
            layout: "/src/layouts/BlogPostEn.astro",
            date: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: "string",
            name: "layout",
            label: "Layout (Do not modify)",
            required: true,
            description: "Layout assigned automatically. Do not change this value.",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            description: "Article title",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            description: "Brief article description for SEO",
          },
          {
            type: "image",
            name: "image",
            label: "Featured image",
            description: "Main article image",
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication date",
            description: "Date when the article will be published",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            description: "Name of the article author",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Article content",
            isBody: true,
            description: "Main article content in rich text format",
          },
        ],
      },
    ],
  },
});
