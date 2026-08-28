import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Referencia completa de atributos requeridos
const REQUIRED_FIELDS = [
  'title',
  'titleLink',
  'operator',
  'duration',
  'siempreFecha',
  'startDate',
  'endDate',
  'unidades',
  'uid',
  'uuid',
  'rating',
  'reviews',
  'recomendado',
  'agotado',
  'groupSize',
  'location',
  'description',
  'highlights',
  'includes',
  'excludes',
  'packages',
  'addOns',
  'itinerary',
  'images',
  'links'
];

// Función para validar que todos los campos requeridos estén presentes
function validateFields(tour, tourIndex, lang) {
  const missing = [];
  for (const field of REQUIRED_FIELDS) {
    // Manejar conversión de 'reseñas' a 'reviews'
    const sourceField = field === 'reviews' && 'reseñas' in tour ? 'reseñas' : field;
    
    if (!(sourceField in tour)) {
      missing.push(field);
    }
  }
  
  if (missing.length > 0) {
    console.warn(`⚠️  Tour ${tourIndex} (${lang}) missing fields: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
}

// Función para convertir un objeto tour a formato MDX
function serializeYamlValue(value, indentLevel = 0) {
  const indent = '  '.repeat(indentLevel);
  
  if (value === null || value === undefined) {
    return '""';
  }
  
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }
  
  if (typeof value === 'string') {
    if (value.includes('\n')) {
      const lines = value.split('\n');
      return '|\n' + lines.map(line => '  '.repeat(indentLevel + 1) + line).join('\n');
    }
    return JSON.stringify(value);
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    let result = '\n';
    const nextIndent = '  '.repeat(indentLevel + 1);
    for (const item of value) {
      if (typeof item === 'object' && item !== null) {
        const keys = Object.keys(item);
        if (keys.length === 0) {
          result += `${nextIndent}- {}\n`;
        } else {
          result += `${nextIndent}- ${keys[0]}: ${serializeYamlValue(item[keys[0]], indentLevel + 2)}\n`;
          for (let i = 1; i < keys.length; i++) {
            result += `${nextIndent}  ${keys[i]}: ${serializeYamlValue(item[keys[i]], indentLevel + 2)}\n`;
          }
        }
      } else {
        result += `${nextIndent}- ${serializeYamlValue(item, indentLevel + 1)}\n`;
      }
    }
    return result.trimEnd();
  }
  
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return '{}';
    }
    let result = '\n';
    const nextIndent = '  '.repeat(indentLevel + 1);
    for (const key of keys) {
      result += `${nextIndent}${key}: ${serializeYamlValue(value[key], indentLevel + 1)}\n`;
    }
    return result.trimEnd();
  }
  
  return JSON.stringify(value);
}

// Función para convertir un objeto tour a formato MDX
function convertTourToMdx(tour, lang) {
  const frontmatter = {};
  
  // Copiar todos los campos al frontmatter
  for (const field of REQUIRED_FIELDS) {
    // Manejar conversión de 'reseñas' a 'reviews'
    const sourceField = field === 'reviews' && 'reseñas' in tour ? 'reseñas' : field;
    
    if (sourceField in tour) {
      const value = tour[sourceField];
      
      // Manejar fechas
      if (field === 'startDate' || field === 'endDate') {
        if (value instanceof Date) {
          frontmatter[field] = value.toISOString();
        } else {
          frontmatter[field] = value;
        }
      }
      // Manejar arrays
      else if (Array.isArray(value)) {
        frontmatter[field] = value;
      }
      // Manejar objetos
      else if (typeof value === 'object' && value !== null) {
        frontmatter[field] = value;
      }
      // Manejar booleanos y strings
      else {
        frontmatter[field] = value;
      }
    } else {
      // Si falta un campo, usar valor por defecto
      if (field === 'highlights' || field === 'addOns') {
        frontmatter[field] = [];
      } else if (field === 'recomendado' || field === 'agotado' || field === 'siempreFecha') {
        frontmatter[field] = false;
      } else if (field === 'rating' || field === 'reviews') {
        frontmatter[field] = 0;
      } else {
        frontmatter[field] = '';
      }
    }
  }
  
  // Generar frontmatter YAML
  let yaml = '---\n';
  for (const [key, value] of Object.entries(frontmatter)) {
    const serialized = serializeYamlValue(value, 0);
    if (serialized.startsWith('\n')) {
      yaml += `${key}:${serialized}\n`;
    } else {
      yaml += `${key}: ${serialized}\n`;
    }
  }
  yaml += '---\n\n';
  
  // Contenido del body (puede estar vacío, el contenido principal está en el frontmatter)
  const body = '';
  
  return yaml + body;
}

// Función principal
async function convertGroupToursToMdx() {
  const basePath = path.resolve(__dirname, '../..');
  const sourceEs = path.join(basePath, 'src/data/groupTours.js');
  const sourceEn = path.join(basePath, 'src/data/groupToursEn.js');
  const destEs = path.join(basePath, 'src/content/tours-grupales/es');
  const destEn = path.join(basePath, 'src/content/tours-grupales/en');
  
  console.log('🚀 Starting conversion of group tours to MDX...\n');
  
  // Procesar tours en español usando importación dinámica
  console.log('📝 Processing Spanish tours...');
  try {
    const moduleEs = await import(path.join(basePath, 'src/data/groupTours.js'));
    const groupToursEs = moduleEs.groupTours;
    
    console.log(`   Found ${groupToursEs.length} tours in Spanish\n`);
    
    for (let i = 0; i < groupToursEs.length; i++) {
      const tour = groupToursEs[i];
      const isValid = validateFields(tour, i, 'ES');
      
      if (!isValid) {
        console.warn(`   ⚠️  Tour ${i + 1} has missing fields, but will be converted anyway`);
      }
      
      const mdxContent = convertTourToMdx(tour, 'ES');
      const filename = `${tour.titleLink || `tour-${i}`}.mdx`;
      const filepath = path.join(destEs, filename);
      
      fs.writeFileSync(filepath, mdxContent, 'utf-8');
      console.log(`   ✅ Created: ${filename}`);
    }
    
    console.log(`\n   📁 Spanish tours saved to: ${destEs}\n`);
  } catch (error) {
    console.error('❌ Error processing Spanish tours:', error.message);
  }
  
  // Procesar tours en inglés usando importación dinámica
  console.log('📝 Processing English tours...');
  try {
    const moduleEn = await import(path.join(basePath, 'src/data/groupToursEn.js'));
    const groupToursEn = moduleEn.groupTours;
    
    console.log(`   Found ${groupToursEn.length} tours in English\n`);
    
    for (let i = 0; i < groupToursEn.length; i++) {
      const tour = groupToursEn[i];
      const isValid = validateFields(tour, i, 'EN');
      
      if (!isValid) {
        console.warn(`   ⚠️  Tour ${i + 1} has missing fields, but will be converted anyway`);
      }
      
      const mdxContent = convertTourToMdx(tour, 'EN');
      const filename = `${tour.titleLink || `tour-${i}`}.mdx`;
      const filepath = path.join(destEn, filename);
      
      fs.writeFileSync(filepath, mdxContent, 'utf-8');
      console.log(`   ✅ Created: ${filename}`);
    }
    
    console.log(`\n   📁 English tours saved to: ${destEn}\n`);
  } catch (error) {
    console.error('❌ Error processing English tours:', error.message);
  }
  
  console.log('✅ Conversion completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Spanish tours: ${fs.readdirSync(destEs).length} files`);
  console.log(`   - English tours: ${fs.readdirSync(destEn).length} files`);
}

// Ejecutar la conversión
convertGroupToursToMdx().catch(console.error);
