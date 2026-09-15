# Auditoría: TinaCMS Visual Editing — AccessibleTravel

**Fecha**: 15 de septiembre de 2026
**Proyecto**: AccessibleTravel (Astro 7.2.4 + TinaCMS 3.12.0)

---

## Estado Actual

| Aspecto | Estado |
|---------|--------|
| TinaCMS admin UI | ✅ Funcional (`/admin/index.html`) |
| Colecciones TinaCMS | ✅ 9 colecciones configuradas |
| Visual Editing (islands) | ❌ No implementado |
| Componentes React/TSX | ❌ Ninguno (100% Astro) |
| `client:*` directives | ❌ Ninguna |

**Problema central**: TinaCMS está configurado solo como CMS headless. Los editores usan el formulario de Tina, pero NO ven cambios en tiempo real en la página. Para visual editing, cada componente editable necesita un "island" React que conecte con TinaCMS via `useTina()`.

---

## Colecciones TinaCMS Existentes

| Colección | Ruta contenido | Tipo | Visual Editing |
|-----------|---------------|------|----------------|
| `siteConfig` | `src/content/config/site.json` | JSON global | ⚠️ Parcial |
| `headerMenu` | `src/content/config/menu-{en,es}.json` | JSON menú | ❌ No aplica |
| `banners` | `src/content/config/banners.json` | JSON banners | ⚠️ Parcial |
| `heroGroup` | `src/content/config/hero-group.json` | JSON hero | ⚠️ Parcial |
| `galleryLogos` | `src/content/config/gallery-logos.json` | JSON logos | ❌ No aplica |
| `blogEn` | `src/content/blog/en/*.mdx` | MDX blog | ✅ Ideal candidato |
| `blogEs` | `src/content/blog/es/*.mdx` | MDX blog | ✅ Ideal candidato |
| `toursGlobalesEn` | `src/content/tours-global/peru/en/*.json` | JSON tours | ✅ Ideal candidato |
| `toursGlobalesEs` | `src/content/tours-global/peru/es/*.json` | JSON tours | ✅ Ideal candidato |
| `toursGrupalesEn` | `src/content/tours-grupales/en/*.json` | JSON tours | ✅ Ideal candidato |
| `toursGrupalesEs` | `src/content/tours-grupales/es/*.json` | JSON tours | ✅ Ideal candidato |

---

## Análisis por Componente

### 🟢 CANDIDATOS IDEALES para Visual Editing

Estos componentes muestran datos del CMS y se benefician directamente de la edición visual.

| Componente | Fuente datos | Campos editables | Prioridad |
|------------|-------------|------------------|-----------|
| `HeroGroup.astro` | `heroGroup` collection | descuento, descripción, includes, video URL | 🔴 Alta |
| `PortadaDinamica.astro` | `banners` collection | imágenes, alt, título | 🔴 Alta |
| `DestinosRecomendados.astro` | `toursGlobales` collection | tours recomendados | 🟡 Media |
| `CardDestino.astro` | props de tour | título, imagen, precio, duración | 🟡 Media |
| `Infotravel.astro` | props de tour | descripción, highlights, includes, itinerary | 🟡 Media |
| `Certificaciones.astro` | `galleryLogos` collection | logos de certificaciones | 🟡 Media |
| `BlogNew.astro` | props de artículos | artículos recientes | 🟢 Baja |
| `PostCard.astro` | props de artículo | título, imagen, fecha, author | 🟢 Baja |
| `Comentarios.astro` | estático o JSON | testimonios | 🟢 Baja |

### 🔴 Componentes que NO necesitan Visual Editing

Estos componentes son puramente UI, estáticos, o de terceros. No tienen datos del CMS editables.

| Componente | Razón | Tipo |
|------------|-------|------|
| `Layout.astro` | Wrapper general, solo props de SEO | Layout |
| `Header.astro` | Navegación, menú viene de JSON | Navegación |
| `Footer.astro` | Links estáticos, contactos de siteConfig | UI estática |
| `MainContent.astro` | Wrapper `<slot/>` | Layout |
| `MetadataLayout.astro` | Meta tags SEO | SEO |
| `Metadata.astro` | Scripts analytics (FB, GTM) | Scripts |
| `WhatsappCta.astro` | Botón flotante, número de phone | UI estática |
| `WhatsappPop.astro` | Popup WhatsApp | UI estática |
| `Modalcontac.astro` | Modal de contacto | UI estática |
| `MensajeApp.astro` | Mensaje de app | UI estática |
| `ShareButtons.astro` | Botones share sociales | UI estática |
| `Actividades.astro` | Grid de actividades, datos estáticos | UI estática |
| `Terminos.astro` | Contenido estático de términos | Contenido estático |
| `Formulario.astro` | Formulario de contacto | Formulario |
| `ContactoForm.astro` | Formulario de contacto | Formulario |
| `Acordeon.astro` | UI genérica accordion | UI genérica |
| `Times.astro` | Fechas y precios | UI genérica |
| `GaleriaModal.astro` | Modal de imágenes | UI estática |
| `ReviewList.astro` | Lista de reviews | UI estática |
| `InstagramPop.astro` | Popup Instagram | UI estática |
| `MessengerPop.astro` | Popup Messenger | UI estática |
| `Bento.astro` | Grid layout | UI genérica |
| `Pago.astro` | Sección de pagos | UI estática |

---

## Arquitectura Requerida para Visual Editing

### Cómo funciona en Astro + TinaCMS

```
┌─────────────────────────────────────────────┐
│  Página Astro (SSG)                         │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  Componente.astro                   │    │
│  │  - Recibe props del CMS             │    │
│  │  - Renderiza contenido              │    │
│  └──────────────┬──────────────────────┘    │
│                 │                           │
│  ┌──────────────▼──────────────────────┐    │
│  │ 编辑 Island (React)                  │    │
│  │  - useTina({ query, variables })    │    │
│  │  - Bridge mode (solo en dev)        │    │
│  │  - Actualiza props en tiempo real   │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

### Para cada componente editable se necesita:

1. **Schema TinaCMS** (ya existe para la mayoría)
2. **Query GraphQL** (generada por TinaCMS)
3. **React Island** con `useTina()` hook
4. **Componente wrapper** que pase los datos editables

### Ejemplo de patrón

```tsx
// src/components/editable/HeroGroupEdit.tsx
'use client'
import { useTina } from 'tinacms/dist/react'
import HeroGroup from '../section/HeroGroup.astro'

export function HeroGroupEdit({ query, data }) {
  const { data: editableData } = useTina({ query, variables: {}, data })
  return <HeroGroup {...editableData} />
}
```

```astro
---
// src/pages/[locale]/groupTours.astro
import { HeroGroupEdit } from '../../components/editable/HeroGroupEdit'
import { client } from '../../../tina/__generated__/client'
const result = await client.queries.heroGroup({ relativePath: 'hero-group.json' })
---
<HeroGroupEdit query={result.query} data={result.data} client:load />
```

---

## Prioridad de Implementación

### Fase 1: Fundamentos (2-3 días)

| Tarea | Esfuerzo | Impacto |
|-------|----------|---------|
| Instalar `@tinacms/cli` y configurar GraphQL client | 2h | Base |
| Generar tipos TypeScript desde schemas | 1h | Base |
| Crear directorio `src/components/editable/` | 0.5h | Organización |
| Configurar `previewUrl` correctamente para cada colección | 2h | UX editor |

### Fase 2: Componentes de Alto Impacto (3-4 días)

| Componente | Tarea | Esfuerzo |
|------------|-------|----------|
| `HeroGroup` | React Island + query heroGroup | 4h |
| `PortadaDinamica` | React Island + query banners | 4h |
| `Certificaciones` | React Island + query galleryLogos | 3h |
| `CardDestino` | React Island para tours | 4h |
| `Infotravel` | React Island para detail tour | 4h |

### Fase 3: Blog y Tours (2-3 días)

| Componente | Tarea | Esfuerzo |
|------------|-------|----------|
| Blog listing | React Island para blogEn/blogEs | 3h |
| Blog post | React Island para MDX content | 4h |
| Tour detail | React Island para toursGlobales | 4h |

### Fase 4: Content Collections Sync (1 día)

| Tarea | Esfuerzo | Descripción |
|-------|----------|-------------|
| Sincronizar schemas TinaCMS ↔ Astro | 4h | Los schemas de `tina/schemas/` y `src/content.config.ts` deben mantenerse en sync |

---

## Problemas Detectados

### 1. Schemas Duplicados ⚠️

Los schemas están definidos en DOS lugares:
- `tina/schemas/*.ts` — para TinaCMS admin
- `src/content.config.ts` — para Astro content collections

**Riesgo**: Si se modifica uno y no el otro, los datos se rompen.

**Solución**: Generar `src/content.config.ts` automáticamente desde los schemas de TinaCMS, o usar un shared schema.

### 2. Sin React Components ❌

El proyecto no tiene ningún componente React/TSX. Para visual editing se necesita:
- Agregar `react` como dependencia (ya está en astro.config.mjs)
- Crear al menos 5-8 React islands para los componentes principales

### 3. i18n en Visual Editing ⚠️

Los componentes React deben respetar el locale actual. Actualmente:
- `getLocaleData(locale)` funciona solo en Astro (server-side)
- Las React islands necesitan recibir el locale como prop

### 4. Colecciones JSON vs MDX

| Tipo | Visual Editing | Complejidad |
|------|---------------|-------------|
| MDX (blog) | Nativo — TinaCMS tiene editor MDX | Baja |
| JSON (tours, config) | Requiere formularios custom | Media |

---

## Recomendación: No Todo Necesita Visual Editing

### Componentes que SÍ necesitan visual editing:
- **HeroGroup** — contenido dinámico que cambia con campañas
- **PortadaDinamica/Banners** — promociones frecuentes
- **Certificaciones/Logos** — actualizaciones ocasionales
- **Tours (CardDestino, Infotravel)** — contenido que se actualiza regularmente
- **Blog** — el core del CMS

### Componentes que NO necesitan visual editing:
- **Layout, Header, Footer** — estructura del sitio, cambia con código
- **Forms (Formulario, ContactoForm)** — configuración técnica
- **WhatsApp/Messenger/Instagram popups** — configuración de terceros
- **ShareButtons** — funcionalidad, no contenido
- **Terminos** — contenido estático rara vez cambia
- **Actividades** — contenido estático
- **Metadata/Scripts** — configuración técnica

---

## Estimación Total

| Fase | Días | Componentes |
|------|------|-------------|
| Fase 1: Fundamentos | 2-3 | Setup base |
| Fase 2: Alto impacto | 3-4 | Hero, Banners, Certificaciones, Tours |
| Fase 3: Blog y Tours | 2-3 | Blog listing, Blog post, Tour detail |
| Fase 4: Sync schemas | 1 | Eliminar duplicación |
| **Total** | **8-11 días** | **~10 componentes editables** |

---

## Conclusión

El proyecto tiene una base sólida de TinaCMS pero falta la capa de visual editing. La prioridad debe ser:

1. **Resolver la duplicación de schemas** (TinaCMS ↔ Astro)
2. **Implementar visual editing para los 3-4 componentes de mayor impacto** (Hero, Banners, Tours)
3. **No implementar visual editing en componentes puramente UI/estáticos**

El esfuerzo total es de **8-11 días** para tener visual editing completo en los componentes que lo necesitan.
