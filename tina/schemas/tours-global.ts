import type { Collection } from 'tinacms';
import { tourBaseFields } from './tour-base-fields';

/**
 * Schema TinaCMS para tours globales (tours-global/peru/{en,es}).
 * Usa los campos base compartidos con tours grupales.
 */
export const toursGlobales = {
  name: 'toursGlobalesEs',
  label: 'Tours Peru',
  path: 'src/content/tours-global/peru/es',
  format: 'json',
  fields: tourBaseFields,
} satisfies Collection<false>;
