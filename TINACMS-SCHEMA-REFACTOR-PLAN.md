# Plan: Refactor de Schemas TinaCMS

**Fecha**: 15 de septiembre de 2026
**Objetivo**: Eliminar duplicación de schemas, unificar idioma a español, crear herencia entre tours.

---

## Problemas Detectados

| # | Problema | Actual | Propuesto |
|---|----------|--------|-----------|
| 1 | Blog duplicado | `blog-en.ts` + `blog-es.ts` (99% idénticos) | Un solo `blog.ts` |
| 2 | Tours sin herencia | `tours-global.ts` + `tours-grupales.ts` (~80% duplicado) | `tour-base-fields.ts` + herencia |
| 3 | Idioma inconsistente | Labels en inglés y español | Todos en español |
| 4 | Config manual | Overrides manuales en `config.ts` | Spread automático |

---

## Fase 1: Unificar Blog ✅

- [x] **1.1** Crear `tina/schemas/blog.ts` con schema unificado (labels en español)
- [x] **1.2** Eliminar `tina/schemas/blog-en.ts`
- [x] **1.3** Eliminar `tina/schemas/blog-es.ts`
- [x] **1.4** Actualizar imports en `tina/config.ts` — reemplazar `blogEn`/`blogEs` por `blogBase`
- [x] **1.5** Ejecutar `npx tinacms build` — verificar que no hay errores
- [x] **1.6** Ejecutar `npx astro build` — verificar que blog funciona en ambos idiomas

**Archivos a crear:**
```
tina/schemas/blog.ts
```

**Archivos a eliminar:**
```
tina/schemas/blog-en.ts
tina/schemas/blog-es.ts
```

**Archivos a modificar:**
```
tina/config.ts
```

---

## Fase 2: Crear Tour Base ✅

- [x] **2.1** Crear `tina/schemas/tour-base-fields.ts` con todos los campos comunes (labels en español)
- [x] **2.2** Actualizar `tina/schemas/tours-global.ts` — importar `tourBaseFields` y reemplazar fields inline
- [x] **2.3** Ejecutar `npx tinacms build` — verificar que tours globales funciona
- [x] **2.4** Ejecutar `npx astro build` — verificar que las páginas de tour renderizan

**Archivos a crear:**
```
tina/schemas/tour-base-fields.ts
```

**Archivos a modificar:**
```
tina/schemas/tours-global.ts
```

---

## Fase 3: Tours Grupales Hereda Base ✅

- [x] **3.1** Actualizar `tina/schemas/tours-grupales.ts` — importar `tourBaseFields` y agregar campos extras (`startDate`, `endDate`)
- [x] **3.2** Ejecutar `npx tinacms build` — verificar que tours grupales tiene campos base + extras
- [x] **3.3** Ejecutar `npx astro build` — verificar que las páginas de tour grupal renderizan

**Archivos a modificar:**
```
tina/schemas/tours-grupales.ts
```

---

## Fase 4: Actualizar Config ✅

- [x] **4.1** Revisar `tina/config.ts` — verificar que imports de blog y tours son correctos
- [x] **4.2** Verificar que `previewUrl` funciona para todas las colecciones
- [x] **4.3** Ejecutar `npx tinacms build` — verificar que admin UI carga correctamente
- [x] **4.4** Verificar que todas las colecciones aparecen en el admin

**Archivos a modificar:**
```
tina/config.ts
```

---

## Fase 5: Normalizar Claves de Contenido ✅

Análisis de claves completado:
- **Tours globales** tienen: `contact`, `slogan` (extras)
- **Tours grupales** tienen: `startDate`, `endDate` (extras)
- Ambos comparten: `addOns`, `agotado`, `description`, `duration`, `excludes`, `groupSize`, `highlights`, `images`, `includes`, `itinerary`, `links`, `location`, `operator`, `packages`, `rating`, `recomendado`, `reviews`, `siempreFecha`, `title`, `titleLink`
- **Conclusión**: Las claves ya son consistentes. Los extras son legítimos por tipo de tour. No se requiere normalización.

**Archivos a crear:**
```
scripts/normalize-tour-keys.ts
```

**Archivos a modificar:**
```
src/content/tours-global/peru/es/*.json
src/content/tours-global/peru/en/*.json
src/content/tours-grupales/es/*.json
src/content/tours-grupales/en/*.json
```

---

## Fase 6: Sincronizar content.config.ts ✅

- [x] **6.1** Actualizar `src/content.config.ts` — schemas de tours consistentes con TinaCMS
- [x] **6.2** Usar `globalTourSchema.extend()` para tours grupales (base + startDate/endDate)
- [x] **6.3** Ejecutar `npx astro build` — verificar que no hay errores de validación
- [x] **6.4** Verificar que todos los tours se cargan correctamente

**Archivos a modificar:**
```
src/content.config.ts
```

---

## Fase 7: Testing Final ✅

- [x] **7.1** Ejecutar `npx tinacms build --content=local` — verificar que TinaCMS build pasa
- [x] **7.2** Ejecutar `npx astro build` — verificar que Astro build pasa (50 páginas)
- [x] **7.3** Verificar que no hay warnings en el build
- [x] **7.4** Verificar que `/en/` y `/es/` muestran contenido correcto
- [x] **7.5** Verificar que tours individuales renderizan en ambos idiomas
- [x] **7.6** Verificar que blog funciona en ambos idiomas

---

## Resumen de Cambios

| Archivo | Acción |
|---------|--------|
| `tina/schemas/blog-en.ts` | 🗑️ ELIMINAR |
| `tina/schemas/blog-es.ts` | 🗑️ ELIMINAR |
| `tina/schemas/blog.ts` | ✅ CREAR |
| `tina/schemas/tour-base-fields.ts` | ✅ CREAR |
| `tina/schemas/tours-global.ts` | 🔄 MODIFICAR — importar base |
| `tina/schemas/tours-grupales.ts` | 🔄 MODIFICAR — heredar base + extras |
| `tina/config.ts` | 🔄 MODIFICAR — imports actualizados |
| `src/content.config.ts` | 🔄 MODIFICAR — schemas consistentes |
| `scripts/normalize-tour-keys.ts` | ✅ CREAR |
| Content JSONs | 🔄 NORMALIZAR claves |

---

## Dependencias entre Fases

```
Fase 1 (Blog)      ──┐
Fase 2 (Tour Base) ──┼──→ Fase 4 (Config) ──→ Fase 6 (content.config) ──→ Fase 7 (Testing)
Fase 3 (Grupales)  ──┘         ↑
                               │
                        Fase 5 (Normalizar)
```

**Secuencia óptima**: 1 → 2 → 3 → 4 → 5 → 6 → 7
