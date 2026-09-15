# Plan: Resolver Duplicación de Schemas (TinaCMS ↔ Astro)

**Fecha**: 15 de septiembre de 2026
**Problema**: Los schemas están definidos en DOS lugares que deben mantenerse en sync manualmente.

---

## Problema Actual

```
tina/schemas/*.ts          ←→    src/content.config.ts
(TinaCMS admin UI)                (Astro content collections)
     ↓                                    ↓
  GraphQL queries                  getEntry/getCollection
     ↓                                    ↓
  Visual editing                   Renderizado de páginas
```

**Riesgo**: Si se modifica un schema en un lugar y no en el otro, los datos se rompen silenciosamente.

### Ejemplo concreto del problema

```ts
// tina/schemas/tours-global.ts — campo 'addOns' como object
{ type: 'object', name: 'addOns', fields: [{ name: 'name' }, { name: 'price' }] }

// src/content.config.ts — campo 'addOns' como union de string y object
z.union([z.string(), z.object({ name: z.string(), price: z.string() })])
```

**Diferencia**: El schema de TinaCMS espera objetos, pero el de Astro acepta strings O objetos. Si un tour tiene `addOns: ["Extra day"]`, TinaCMS lo rechaza pero Astro lo acepta.

---

## Estrategia: TinaCMS como Single Source of Truth

### Por qué TinaCMS como fuente

| Criterio | TinaCMS schemas | Astro content.config.ts |
|----------|-----------------|------------------------|
| Detalle | ✅ Labels, descripciones, UI config | ❌ Solo tipos |
| Validación | ✅ Required, patterns, options | ✅ Zod validation |
| Generación | ✅ Puede generar tipos TS | ❌ No puede generar TinaCMS |
| Mantenimiento | ✅ Se edita en admin UI | ❌ Solo código |

### Arquitectura propuesta

```
tina/schemas/*.ts  (FUENTE ÚNICA)
        ↓
   [script generador]
        ↓
src/content.config.ts  (GENERADO)
```

---

## Plan de Implementación

### Fase 1: Analizar diferencias (2h)

**Objetivo**: Mapear todas las diferencias entre schemas.

| Schema | Diferencias encontradas |
|--------|------------------------|
| `siteConfig` | ✅ Idénticos |
| `headerMenu` | ✅ Idénticos |
| `banners` | ✅ Idénticos |
| `heroGroup` | ✅ Idénticos |
| `galleryLogos` | ✅ Idénticos |
| `blogEn/BlogEs` | ⚠️ TinaCMS tiene `body` (rich-text), Astro no lo incluye en schema |
| `toursGlobales` | ⚠️ `addOns` type mismatch (object vs union) |
| `toursGrupales` | ⚠️ Campos opcionales en TinaCMS, requeridos en Astro |

**Tareas**:
- [ ] Crear tabla comparativa completa
- [ ] Decidir qué diferencias son intencionales vs bugs
- [ ] Estandarizar los schemas en TinaCMS (fuente única)

### Fase 2: Estandarizar schemas en TinaCMS (4h)

**Objetivo**: Asegurar que los schemas de TinaCMS sean la fuente completa y correcta.

| Tarea | Descripción | Tiempo |
|-------|-------------|--------|
| 2.1 | Revisar `toursGlobales` — unificar `addOns` como object con name/price/description | 1h |
| 2.2 | Revisar `toursGrupales` — cambiar campos requeridos a opcionales donde aplique | 1h |
| 2.3 | Agregar campos faltantes en TinaCMS que Astro espera | 1h |
| 2.4 | Validar que todos los JSON existentes pasan la validación de TinaCMS | 1h |

### Fase 3: Script generador (4h)

**Objetivo**: Crear un script que genere `src/content.config.ts` desde los schemas de TinaCMS.

#### Opción A: Script Node.js (Recomendada)

```ts
// scripts/generate-content-config.ts
import { siteConfig } from '../tina/schemas/site-config';
import { headerMenu } from '../tina/schemas/menu';
// ... importar todos los schemas

function tinaFieldToZod(field: any): string {
  // Converter campo de TinaCMS a Zod schema string
  switch (field.type) {
    case 'string': return field.required ? 'z.string()' : 'z.string().optional()'
    case 'number': return field.required ? 'z.number()' : 'z.number().optional()'
    case 'boolean': return field.required ? 'z.boolean()' : 'z.boolean().optional()'
    case 'image': return 'z.string()'
    case 'datetime': return 'z.string().optional()'
    case 'object': return generateObjectSchema(field)
    case 'rich-text': return 'z.string()' // MDX body
    // ...
  }
}

function generateCollection(schema: any): string {
  // Generar defineCollection() call desde schema de TinaCMS
}

// Generar content.config.ts
const output = generateContentConfig(allCollections);
fs.writeFileSync('src/content.config.ts', output);
```

#### Opción B: Usar TinaCLI (Menor esfuerzo)

TinaCMS ya tiene `tinacms generate` que tipos TypeScript. Podemos:
1. Usar `tinacms generate` para tipos
2. Crear un wrapper que convierta esos tipos a Zod schemas

### Fase 4: Integración con build (1h)

**Objetivo**: Ejecutar el generador automáticamente antes del build.

```json
// package.json
{
  "scripts": {
    "prebuild": "tsx scripts/generate-content-config.ts",
    "build": "tinacms build --content=local && astro build",
    "dev": "tsx scripts/generate-content-config.ts && node scripts/dev.mjs"
  }
}
```

### Fase 5: Validación (2h)

**Objetivo**: Asegurar que el generador produce resultados correctos.

| Tarea | Descripción |
|-------|-------------|
| 5.1 | Generar `content.config.ts` y comparar con el manual actual |
| 5.2 | Ejecutar `npx astro build` — debe pasar sin errores |
| 5.3 | Ejecutar `tinacms build` — debe pasar sin errores |
| 5.4 | Verificar que las páginas renderizan correctamente |
| 5.5 | Agregar test de validación al CI |

---

## Archivos a Modificar

| Archivo | Acción |
|---------|--------|
| `tina/schemas/tours-global.ts` | **MODIFICAR** — unificar `addOns` schema |
| `tina/schemas/tours-grupales.ts` | **MODIFICAR** — ajustar campos opcionales |
| `scripts/generate-content-config.ts` | **CREAR** — script generador |
| `src/content.config.ts` | **GENERADO** — ya no se edita manualmente |
| `package.json` | **MODIFICAR** — agregar scripts prebuild/dev |

---

## Ejemplo de Resultado

### Input (tina/schemas/tours-global.ts)

```ts
export const toursGlobales = {
  name: 'toursGlobalesEs',
  fields: [
    { type: 'string', name: 'title', required: true },
    { type: 'number', name: 'rating', required: false },
    { type: 'boolean', name: 'agotado', required: false },
    // ...
  ]
}
```

### Output (src/content.config.ts — generado)

```ts
import { z } from 'astro:content';

const globalTourSchema = z.object({
  title: z.string(),
  rating: z.number().optional(),
  agotado: z.boolean().optional(),
  // ...
});

export const collections = {
  toursGlobalesEn: defineCollection({ /* ... */ }),
  toursGlobalesEs: defineCollection({ /* ... */ }),
};
```

---

## Beneficios

| Beneficio | Impacto |
|-----------|---------|
| ✅ Editar schema una sola vez | Reduce errores humanos |
| ✅ TinaCMS admin siempre sincronizado | No más " funciona en admin pero no en la página" |
| ✅ Astro siempre recibe datos válidos | Build falla temprano si hay inconsistencia |
| ✅ Documentación automática | Los labels/descripciones de TinaCMS documentan los schemas |
| ✅ Preparado para visual editing | Schemas consistentes = islands consistentes |

---

## Riesgos y Mitigaciones

| Riesgo | Mitigación |
|--------|------------|
| Script generador tiene bugs | Validar output contra content.config.ts manual actual |
| TinaCMS no expone suficiente info | Usar fallback a schema manual para campos complejos |
| Performance del build | Cache del generador, solo regenerar si schemas cambiaron |
| Migration data breaking | Verificar que todos los JSON existentes pasan validación |

---

## Timeline

| Fase | Tiempo | Dependencias |
|------|--------|--------------|
| Fase 1: Analizar diferencias | 2h | Ninguna |
| Fase 2: Estandarizar schemas | 4h | Fase 1 |
| Fase 3: Script generador | 4h | Fase 2 |
| Fase 4: Integración build | 1h | Fase 3 |
| Fase 5: Validación | 2h | Fase 4 |
| **Total** | **13h (~2 días)** | |

---

## Decisión Requerida

¿Usamos **Opción A** (script Node.js custom) o **Opción B** (wrapper sobre TinaCLI)?

| Criterio | Opción A (Script) | Opción B (TinaCLI) |
|----------|-------------------|-------------------|
| Control total | ✅ Sí | ⚠️ Limitado |
| Esfuerzo | 4h | 2h |
| Mantenimiento | Manual | Depende de TinaCMS |
| Flexibilidad | ✅ Cualquier output | ❌ Solo tipos TS |

**Recomendación**: Opción A — mayor control y flexibilidad para generar exactamente lo que Astro necesita.
