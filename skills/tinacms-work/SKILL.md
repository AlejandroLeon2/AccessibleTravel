---
name: tinacms-work
description: "Trigger: TinaCMS, tina config, collection, schema, field, visual editing, CMS, content model, tina island, tinaField. Work with TinaCMS collections, fields, config, and Astro visual editing."
license: Apache-2.0
metadata:
  author: "alejandro"
  version: "1.0"
---

# TinaCMS Work Skill

## Activation Contract

Load this skill when:
- Creating, modifying, or debugging TinaCMS collections or fields
- Editing `tina/config.ts` or any file under `tina/schemas/`
- Working on visual editing, TinaIsland, or tinaField wiring
- Adding new content types that TinaCMS will manage
- Debugging TinaCMS dev server, admin, or content persistence
- Syncing schemas between `tina/schemas/` and `src/content.config.ts`

## Hard Rules

1. **Dual-schema sync**: Every TinaCMS collection in `tina/config.ts` MUST have a matching Astro collection in `src/content.config.ts`. They must agree on field names and types. The Tina schema drives the editor; the Astro schema drives the build. Mismatch = silent data loss.
2. **Never commit `tina/__generated__/`**: It is gitignored and regenerated on every `tinacms dev` / `tinacms build`.
3. **Env vars are build-time only**: `PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are embedded during `tinacms dev` or `tinacms build`. Setting them after the build has no effect. Only `.env` is loaded (not `.env.local`, `.env.development`).
4. **Admin-exposed vars must use `TINA_PUBLIC_` or `NEXT_PUBLIC_` prefix**: Any other `process.env` access in admin-side code (custom fields, `beforeSubmit`) will be `undefined`.
5. **Collection `name` must be unique, singular, no spaces/dashes/special chars**: Use `post`, not `posts`.
6. **`fields` or `templates`, never both**: A collection uses one or the other.
7. **After changing collection `path`**: restart `tinacms dev` so generated files reflect the new path.
8. **`ssr.noExternal` must include `@tinacms/astro` and `@tinacms/bridge`**: Removing them breaks the Astro+Tina integration.
9. **Config must be deterministic**: Do not use `Date.now()`, `Math.random()`, or non-deterministic values in schema/config properties. Return a function for dynamic defaults.

## Decision Gates

| Task | Path |
|------|------|
| Add a new TinaCMS-managed content type | Create schema in `tina/schemas/` → register in `tina/config.ts` → add matching Astro collection in `src/content.config.ts` |
| Make an Astro page visually editable | Follow the 5-step island pattern: field → data loader → island registry → endpoint → `<TinaIsland>` + `tinaField()` |
| Add a global/site-wide config field | Use `ui.global: true` on the collection → appears under **Site** in admin sidebar |
| Content lives in `src/content/` and is CMS-edited | TinaCMS manages it via `tina/config.ts` schema |
| Content is script-generated (e.g. tours from JSON) | Write a conversion script in `src/scripts/`, run manually with `pnpm content:global-tours` |
| Need a list field | Set `list: true` on the field; reference fields cannot be lists directly — wrap in `object` with `list: true` |
| Need dropdown/checkboxes | Add `options` array to any scalar field; with `list: true` → checkboxes, without → dropdown |

## Execution Steps

### Adding a new TinaCMS collection

1. Create `tina/schemas/{name}.ts` exporting a collection object using `satisfies Collection<false>`.
2. Define fields using TinaCMS field types: `string`, `number`, `boolean`, `image`, `datetime`, `reference`, `object`, `rich-text`.
3. Register in `tina/config.ts` `schema.collections` array.
4. Add matching Astro collection in `src/content.config.ts` using `defineCollection` + `z` schema + `glob` loader.
5. Restart `tinacms dev` to regenerate GraphQL schema.

### Field type quick reference

| TinaCMS type | Astro/Zod equivalent | Notes |
|--------------|---------------------|-------|
| `string` | `z.string()` | Use `ui: { component: 'textarea' }` for multi-line |
| `number` | `z.number()` | |
| `boolean` | `z.boolean()` | |
| `datetime` | `z.string()` | Stored as ISO string |
| `image` | `z.string()` | Stores path relative to `media.mediaRoot` |
| `reference` | `z.string()` | Stores document path; cannot be `list: true` directly |
| `object` | `z.object({...})` | Nested fields; use `list: true` for arrays of objects |
| `rich-text` | N/A in Astro schema | TinaCMS manages markdown body; use `isBody: true` |

### Visual editing pattern (Astro)

1. **Schema field** in `tina/config.ts`
2. **Data loader** in `src/lib/tina/data.ts` using `requestWithMetadata()`
3. **Island registry** in `src/lib/tina/islands.ts`
4. **Endpoint** `src/pages/tina-island/[name].ts` with `export const prerender = false`
5. **Component** wrap with `<TinaIsland>` and stamp elements with `tinaField(data, 'fieldName')`

### Key references

- Config: `tina/config.ts`
- Schemas: `tina/schemas/`
- Astro content: `src/content.config.ts`
- Tina lib: `src/lib/tina/data.ts`, `src/lib/tina/islands.ts`
- Island endpoint: `src/pages/tina-island/[name].ts`
- Visual editing components: `src/components/tina/`

## Output Contract

When completing TinaCMS work, return:
- Files created or modified (full paths)
- Whether `tina/config.ts` and `src/content.config.ts` are in sync
- Any restart required (`tinacms dev` must restart after schema changes)
- Whether visual editing is wired for new collections

## References

- Official docs: https://tina.io/docs
- Collections: https://tina.io/docs/reference/collections
- Fields: https://tina.io/docs/reference/fields
- Config: https://tina.io/docs/reference/config
- Astro integration: https://tina.io/docs/frameworks/astro
- Visual editing (Astro): https://tina.io/docs/contextual-editing/astro
- Project AGENTS.md — stack, dev commands, content architecture
