# Plan de Implementación: Página 404 con TinaCMS

## Resumen

Página 404 totalmente editable desde TinaCMS, con contenido en JSON (no MDX), soporte i18n, y diseño responsive.

## Estructura de archivos

```
├── tina/schemas/
│   └── page-404.ts                    # Schema de TinaCMS para404
├── src/content/config/
│   ├── 404-en.json                    # Contenido en inglés
│   └── 404-es.json                    # Contenido en español
├── src/content.config.ts              # Schema de Astro (lectura)
├── src/pages/
│   └── 404.astro                      # Fallback (redirección por idioma)
└── src/pages/[locale]/
    └── 404.astro                      # Página404 principal
```

## Campos editables desde TinaCMS

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `titulo` | string | Título principal (ej: "Página No Encontrada") |
| `descripcion` | textarea | Mensaje explicativo |
| `botonInicio` | string | Texto del botón volver al inicio |
| `botonBlog` | string | Texto del botón ir al blog |
| `enlacesRapidos` | object[] | Lista de enlaces de navegación rápida |
| `imagenFondo` | image | Imagen de fondo (opcional) |
| `mensajeContacto` | textarea | Mensaje de ayuda (opcional) |

## Implementación completada

### 1. Schema de TinaCMS ✅
- Archivo: `tina/schemas/page-404.ts`
- Colecciones: `page404Es`, `page404En`
- Formato: JSON

### 2. Contenido JSON ✅
- `src/content/config/404-en.json` (inglés)
- `src/content/config/404-es.json` (español)

### 3. Schema de Astro ✅
- Archivo: `src/content.config.ts`
- Collections: `page404En`, `page404Es`

### 4. Páginas404 ✅
- `src/pages/404.astro` (fallback con redirección)
- `src/pages/[locale]/404.astro` (página principal)

### 5. Configuración de TinaCMS ✅
- `tina/config.ts` actualizado con nuevas collections

## Cómo funciona

### En desarrollo
```bash
pnpm dev
# TinaCMS admin: http://localhost:4001/admin/index.html
# Editar: Configuración del sitio → Página 404 (ES) / Página 404 (EN)
```

### En producción
1. Usuario visita `dominio.com/ruta-no-existe`
2. cPanel busca `404.html`
3. Si es raíz → redirige al idioma detectado
4. Si es `/en/...` o `/es/...` → muestra404 con contenido desde TinaCMS

### Flujo de contenido
```
TinaCMS Admin → Guarda cambios → GitHub commit → Build automático → Deploy a cPanel
```

## Verificación

```bash
# Local
pnpm dev
# Visitar: http://localhost:4321/noexiste
# Debe mostrar404 con contenido editable

# Build
pnpm build
# Verificar archivos:
ls -la dist/client/404.html
ls -la dist/client/en/404.html
ls -la dist/client/es/404.html
```

## Edición desde TinaCMS

1. Ir a `http://localhost:4001/admin/index.html`
2. Seleccionar "Página 404 (ES)" o "Página 404 (EN)"
3. Editar campos: título, descripción, botones, enlaces
4. Guardar → se genera nuevo404-es.json o404-en.json
5. Build automático actualiza el sitio

## Notas

- El contenido es JSON, no MDX (más simple para contenido estático)
- TinaCMS permite edición visual sin tocar código
- Los cambios se reflejan en el próximo build
- El404 fallback (raíz) redirige al idioma detectado del navegador
