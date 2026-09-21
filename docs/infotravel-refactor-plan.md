# Plan: Refactorización de Infotravel.astro — Por Fases

## Problema Actual

`Infotravel.astro` tiene **530 líneas** con 10+ secciones mezcladas, 3 scripts inline, imports de 10 componentes, y lógica de negocio acoplada a la UI.

## Objetivo

Convertir `Infotravel.astro` en un **layout orquestador** que internamente componga secciones atómicas. Cada hijo se auto-contiene (HTML + script) y recibe solo los datos que necesita.

## Principios

1. **Atomicidad**: cada componente hace UNA cosa
2. **Composición interna**: el orquestador importa y compone hijos (no slots que el consumidor llene)
3. **Props mínimas**: cada componente recibe solo lo que necesita
4. **Scripts aislados**: cada componente lleva su propio script
5. **API externa sin cambios**: los pages no cambian su forma de usar Infotravel

---

## Fase 1: Crear componentes hoja (sin dependencias entre ellos)

> Estos 4 componentes son 100% presentacionales. No tienen scripts. Se pueden crear en paralelo.

### Tarea 1.1: Crear TourHeader.astro

- **Crear**: `src/components/section/Infotravel/TourHeader.astro`
- **Extraer** del Infotravel actual (líneas 69-136): el bloque del `<h1>`, duración, capacidad, ubicación, share buttons
- **Props**: `data` (title, duration, groupSize, location, recomendado), `lenguaje`, `siteConfig`
- **Imports**: Calendario, Persona, LocationIcon, ShareButtons, tinaField
- **Verificar**: que los `tinaField` paths sean idénticos a los del original

### Tarea 1.2: Crear TourDescription.astro

- **Crear**: `src/components/section/Infotravel/TourDescription.astro`
- **Extraer** del Infotravel actual (líneas 151-196): descripción + lista includes + lista excludes
- **Props**: `data` (description, includes, excludes), `lenguaje`
- **Imports**: tinaField
- **Verificar**: que los `tinaField` paths (`includes.${index}`, `excludes.${index}`) sean idénticos

### Tarea 1.3: Crear TourAddons.astro

- **Crear**: `src/components/section/Infotravel/TourAddons.astro`
- **Extraer** del Infotravel actual (líneas 214-262): lista de add-ons
- **Props**: `data` (addOns), `lenguaje`
- **Imports**: tinaField
- **Verificar**: que los `tinaField` paths (`addOns.${index}.name`, `.price`, `.description`) sean idénticos

### Tarea 1.4: Crear TourTabs.astro (HTML + script)

- **Crear**: `src/components/section/Infotravel/TourTabs.astro`
- **Extraer** del Infotravel actual:
  - HTML (líneas 45-65): botones tab-info y tab-plan
  - Script (líneas 358-421): `initTabs()`, `handleTabClick()`, MutationObserver
- **Props**: `lenguaje`, `hasItinerary` (boolean)
- **Verificar**: que los IDs `tab-info`, `tab-plan`, `tab-content-info`, `tab-content-plan` se mantengan
- **Verificar**: que el script se auto-inicialice con `DOMContentLoaded` + `astro:page-load`

---

## Fase 2: Crear componente con script propio

> WeTravelWidget es el componente más complejo: tiene lógica de iframe, checkout modal, y analytics.

### Tarea 2.1: Crear WeTravelWidget.astro

- **Crear**: `src/components/section/Infotravel/WeTravelWidget.astro`
- **Extraer** del Infotravel actual:
  - HTML (líneas 197-212): heading "Paquetes" + contenedor `#wetravel_package_listing`
  - Script (líneas 423-524): `initWeTravelWidget()`, `openCheckout()`, `closeCheckout()`, `sendAnalytics()`
- **Props**: `uid`, `uuid`, `color`, `showReviews`, `env`, `lenguaje`
- **Verificar**: que los data-attributes (`data-uid`, `data-uuid`, etc.) se mantengan
- **Verificar**: que el script se auto-inicialice correctamente

---

## Fase 3: Crear el orquestador

> Infotravel.astro se reescribe como compositor interno. Importa todos los hijos y los compone.

### Tarea 3.1: Crear Infotravel.astro (nuevo orquestador)

- **Crear**: `src/components/section/Infotravel/Infotravel.astro`
- **Importar** todos los hijos: TourTabs, TourHeader, TourDescription, TourAddons, WeTravelWidget
- **Importar** componentes existentes: Acordeon, AsideTravel, GaleriaModal, WhatsappCta, ShareButtons, Recomendaciones, ReviewList
- **Mantener** la lógica de fallback de `lenguaje` (`getLocaleData`)
- **Mantener** la lógica de `uuid` (regex sobre `data.links.book`)
- **Componer** los hijos internamente (no usar slots)
- **Mantener** el script de EmailJS (lines 299-356 del original) — es para AsideTravel
- **Mantener** el `ShareButtons` al final del archivo (line 525-529)
- **Verificar**: que la estructura HTML resultante sea idéntica a la del original

### Tarea 3.2: Verificar que la estructura HTML no cambió

- **Comparar** el HTML generado del nuevo Infotravel vs el original
- **Verificar** que los elementos con ID (`titulo`, `tab-content-info`, `tab-content-plan`, `wetravel_package_listing`) estén en el mismo orden
- **Verificar** que las clases CSS (`animate-on-scroll`, `fade-up`, etc.) se mantengan

---

## Fase 4: Actualizar imports y limpiar

> Actualizar los 3 archivos que importan Infotravel y eliminar el archivo viejo.

### Tarea 4.1: Actualizar import en tour page

- **Archivo**: `src/pages/[locale]/destino/tour/[titleLink].astro`
- **Cambiar**: `from "../../../../components/section/Infotravel.astro"` → `from "../../../../components/section/Infotravel/Infotravel.astro"`
- **No cambiar** nada más en el archivo

### Tarea 4.2: Actualizar import en group page

- **Archivo**: `src/pages/[locale]/group/[titleLink].astro`
- **Cambiar**: `from "../../../components/section/Infotravel.astro"` → `from "../../../components/section/Infotravel/Infotravel.astro"`
- **No cambiar** nada más en el archivo

### Tarea 4.3: Actualizar import en islands.ts

- **Archivo**: `src/lib/tina/islands.ts`
- **Cambiar**: `from "../../components/section/Infotravel.astro"` → `from "../../components/section/Infotravel/Infotravel.astro"`
- **No cambiar** nada más en el archivo

### Tarea 4.4: Eliminar archivo viejo

- **Eliminar**: `src/components/section/Infotravel.astro`
- **Verificar** que ningún otro archivo lo importe (grep por `section/Infotravel.astro`)

---

## Fase 5: Verificación final

> Build completo para confirmar que todo compila y renderiza igual.

### Tarea 5.1: Build de TinaCMS

- **Ejecutar**: `npx tinacms build --content=local`
- **Verificar**: que termine sin errores

### Tarea 5.2: Build de Astro

- **Ejecutar**: `npx astro build`
- **Verificar**: que todas las páginas se generen (tour + group en en/es)
- **Verificar**: que no haya errores de import o de tipo

### Tarea 5.3: Verificar estructura final

- **Listar** archivos en `src/components/section/Infotravel/`
- **Contar** líneas de cada componente vs el original (530)
- **Confirmar** que el orquestador tiene ~110 líneas (no 530)

---

## Resumen de Fases

| Fase | Tareas | Dependencias | Resultado |
|------|--------|-------------|-----------|
| 1 | 4 componentes hoja | Ninguna | TourHeader, TourDescription, TourAddons, TourTabs |
| 1 | 1 componente con script | Ninguna | WeTravelWidget |
| 3 | 1 orquestador | Fase 1-2 | Infotravel.astro nuevo |
| 4 | 4 updates + delete | Fase 3 | Imports actualizados, viejo eliminado |
| 5 | 3 verificaciones | Fase 4 | Build limpio |

**Total: 5 fases, 13 tareas**
