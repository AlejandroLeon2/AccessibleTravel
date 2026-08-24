
// src/pages/tina-island/[name].ts
import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/tina/islands';

// During static production builds, set prerender to true and return empty static paths
// so that Astro can compile cleanly without requiring an SSR adapter.
export const prerender = true;

export function getStaticPaths() {
  return [];
}

export const ALL: APIRoute = experimental_createIslandRoute(islands);