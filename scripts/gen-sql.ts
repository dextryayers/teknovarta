import { ARTICLES } from '../lib/articles';
import { VIDEOS } from '../lib/videos';
import { PHONE_SPECS } from '../lib/phone-specs';
import * as fs from 'fs';

let sql = `-- ARTICLES SEED DATA\n`;

ARTICLES.forEach(art => {
  const contentEscaped = art.content.replace(/'/g, "''");
  const titleEscaped = art.title.replace(/'/g, "''");
  const excerptEscaped = art.excerpt.replace(/'/g, "''");
  
  // Note: We need the UUID of the category. In our seed script we used slugs.
  // In SQL, we can use a subquery to find the category ID.
  sql += `INSERT INTO articles (title, slug, excerpt, content, category_id, author_id, status, views_count, featured, published_at) 
VALUES ('${titleEscaped}', '${art.slug}', '${excerptEscaped}', '${contentEscaped}', (SELECT id FROM categories WHERE slug = '${art.category}'), (SELECT id FROM users WHERE username = 'hanif'), 'published', ${art.views}, ${art.featured || false}, '${art.date}') 
ON CONFLICT (slug) DO NOTHING;\n\n`;
});

sql += `-- VIDEOS SEED DATA\n`;
VIDEOS.forEach(vid => {
  const titleEscaped = vid.title.replace(/'/g, "''");
  const excerptEscaped = vid.aiSummary.replace(/'/g, "''");
  const ytId = vid.videoUrl.split('/embed/')[1]?.split('?')[0] || '';
  
  sql += `INSERT INTO videos (title, slug, excerpt, youtube_id, category_id, author_id, views_count, published_at)
VALUES ('${titleEscaped}', '${vid.slug}', '${excerptEscaped}', '${ytId}', (SELECT id FROM categories WHERE slug = '${vid.category}'), (SELECT id FROM users WHERE username = 'hanif'), ${vid.views}, '${vid.date}')
ON CONFLICT (slug) DO NOTHING;\n\n`;
});

sql += `-- PHONE SPECS SEED DATA\n`;
PHONE_SPECS.forEach(spec => {
  const brandEscaped = (spec.brand || '').replace(/'/g, "''");
  const modelEscaped = (spec.model || '').replace(/'/g, "''");
  const specsJson = JSON.stringify(spec.specs || {}).replace(/'/g, "''");
  const slug = spec.slug || `${brandEscaped}-${modelEscaped}`.toLowerCase().replace(/ /g, '-');
  
  sql += `INSERT INTO phone_specs (brand, model, slug, released_year, device_type, specs, price_estimate)
VALUES ('${brandEscaped}', '${modelEscaped}', '${slug}', ${spec.releaseYear || 2026}, '${spec.type || 'smartphone'}', '${specsJson}', '${spec.price || ''}')
ON CONFLICT (slug) DO NOTHING;\n\n`;
});

fs.appendFileSync('./database/seed_data.sql', sql);
console.log('SQL generated!');
