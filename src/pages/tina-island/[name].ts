// src/pages/tina-island/[name].ts
import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/tina/islands';

// REQUIRED — prerender = false for visual editing endpoint
// The bridge POSTs to this endpoint on every keystroke
export const prerender = false;

export const ALL: APIRoute = experimental_createIslandRoute(islands);
