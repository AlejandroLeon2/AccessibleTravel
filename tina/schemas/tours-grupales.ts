import type { Collection } from 'tinacms';
import { tourBaseFields } from './tour-base-fields';
import { imagePathUi } from '../utils/image-field';
import { defaultGroupTourEs } from '../defaults/group-tour';

// Campos EXTRAS que solo existen en tours grupales
const groupTourExtraFields = [
  {
    type: 'datetime' as const,
    name: 'startDate',
    label: 'Fecha de inicio',
    description: 'Fecha y hora de inicio del tour. Se usa para la cuenta regresiva. Ejemplo: "2026-09-15T08:00:00.000Z"',
  },
  {
    type: 'datetime' as const,
    name: 'endDate',
    label: 'Fecha de fin',
    description: 'Fecha de finalización del tour. Ejemplo: "2026-09-24T18:00:00.000Z"',
  },
];

export const toursGrupales = {
  name: 'toursGrupalesEs',
  label: 'Tours Grupales ES',
  path: 'src/content/tours-grupales/es',
  format: 'json',
  defaultItem: defaultGroupTourEs,
  fields: [
    // Campos base de tours (importados)
    ...tourBaseFields,
    // Campos extras de grupales
    ...groupTourExtraFields,
  ],
} satisfies Collection<false>;
