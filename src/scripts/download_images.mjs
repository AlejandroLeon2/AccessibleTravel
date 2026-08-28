import fs from 'fs';
import path from 'path';

const files = [
  './src/data/peru/peru-es/travels.json',
  './src/data/peru/peru-en/travels.json'
];

const destDir = './public/images/tours';
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadImage(url, destPath) {
  if (fs.existsSync(destPath)) {
    console.log(`[Cache] Already exists: ${destPath}`);
    return;
  }
  console.log(`[Download] Fetching: ${url}`);
  const req = await fetch(url);
  if (!req.ok) {
    console.error(`Failed to download ${url}: ${req.statusText}`);
    return;
  }
  const buffer = await req.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
}

async function run() {
  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`File not found: ${file}`);
      continue;
    }

    const dataRaw = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(dataRaw);
    let modified = false;

    for (const item of data) {
      if (item.images && Array.isArray(item.images)) {
        for (let img of item.images) {
          if (img.link && img.link.startsWith('http')) {
            // Extraemos el hash/id final del enlace de filestack
            const fileNameHash = img.link.split('/').pop().split('?')[0];
            const localFilename = `tour-${fileNameHash}.webp`;
            const localDestPath = path.join(destDir, localFilename);
            
            await downloadImage(img.link, localDestPath);
            
            // Actualizamos la referencia
            img.link = `/images/tours/${localFilename}`;
            modified = true;
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`[Updated] Saved changes to ${file}`);
    }
  }
  console.log('✅ Done process!');
}

run();
