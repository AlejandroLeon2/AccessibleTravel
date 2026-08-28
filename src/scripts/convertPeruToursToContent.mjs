import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sources = [
  { language: 'en', source: 'src/data/peru/peru-en/travels.json' },
  { language: 'es', source: 'src/data/peru/peru-es/travels.json' },
];

function normalizeTour(tour) {
  const { uid, uuid, reseñas, ...content } = tour;
  return {
    ...content,
    highlights: tour.highlights ?? [],
    includes: tour.includes ?? [],
    excludes: tour.excludes ?? [],
    packages: tour.packages ?? [],
    addOns: tour.addOns ?? [],
    itinerary: tour.itinerary ?? [],
    images: tour.images ?? [],
    reviews: reseñas ?? tour.reviews ?? 0,
    siempreFecha: tour.siempreFecha ?? false,
    agotado: tour.agotado ?? false,
    links: {
      book: tour.links?.book ?? '',
      brochure: tour.links?.brochure ?? '',
      inquire: tour.links?.inquire ?? '',
    },
  };
}

for (const { language, source } of sources) {
  const tours = JSON.parse(fs.readFileSync(path.join(root, source), 'utf8'));
  const destination = path.join(root, 'src/content/tours-global/peru', language);
  fs.mkdirSync(destination, { recursive: true });

  for (const tour of tours) {
    const normalized = normalizeTour(tour);
    const filename = `${normalized.titleLink}.json`;
    fs.writeFileSync(path.join(destination, filename), `${JSON.stringify(normalized, null, 2)}\n`);
  }

  console.log(`${language}: ${tours.length} tours escritos en ${destination}`);
}
