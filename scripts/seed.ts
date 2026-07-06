import * as dotenv from 'dotenv';
dotenv.config();

import { db } from '../db';
import { users, categories, articles, videos, phoneSpecs, mediaAssets } from '../db/schema';
import { ARTICLES, CATEGORIES } from '../lib/articles';
import { VIDEOS } from '../lib/videos';
import { PHONE_SPECS } from '../lib/phone-specs';

async function getOrCreateMedia(url: string, filename: string) {
  if (!url) return null;
  
  const existing = await db.query.mediaAssets.findFirst({
    where: (m, { eq }) => eq(m.url, url)
  });
  
  if (existing) return existing.id;
  
  const [inserted] = await db.insert(mediaAssets).values({
    filename,
    originalName: filename,
    url,
    type: 'image',
  }).returning();
  
  return inserted.id;
}

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Seed User
  console.log('Creating Admin User...');
  const [admin] = await db.insert(users).values({
    fullName: 'Hanif Abdurrohim',
    username: 'hanif',
    email: 'hanif@teknovarta.com',
    passwordHash: 'hashed_password',
    role: 'admin',
    isStaff: true,
  }).onConflictDoNothing().returning();

  const authorId = admin?.id || (await db.query.users.findFirst())?.id;
  if (!authorId) throw new Error('Failed to create/find author');

  // 2. Seed Categories
  console.log('Creating Categories...');
  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const [inserted] = await db.insert(categories).values({
      name: cat.name,
      slug: cat.id,
      description: cat.description,
    }).onConflictDoNothing().returning();
    
    const finalCat = inserted || (await db.query.categories.findFirst({
      where: (c, { eq }) => eq(c.slug, cat.id)
    }));
    
    if (finalCat) categoryMap.set(cat.id, finalCat.id);
  }

  // 3. Seed Articles
  console.log(`Inserting ${ARTICLES.length} articles...`);
  for (const art of ARTICLES) {
    const mediaId = await getOrCreateMedia(art.image, `${art.slug}-image`);
    
    await db.insert(articles).values({
      title: art.title,
      slug: art.slug,
      excerpt: art.excerpt,
      aiSummary: art.aiSummary,
      content: art.content,
      featuredImageId: mediaId,
      categoryId: categoryMap.get(art.category),
      authorId: authorId,
      status: 'published',
      viewsCount: art.views,
      featured: art.featured || false,
      publishedAt: new Date(art.date),
    }).onConflictDoNothing();
  }

  // 4. Seed Videos
  console.log(`Inserting ${VIDEOS.length} videos...`);
  for (const vid of VIDEOS) {
    const mediaId = await getOrCreateMedia(vid.thumbnail, `${vid.slug}-thumb`);
    
    await db.insert(videos).values({
      title: vid.title,
      slug: vid.slug,
      excerpt: vid.aiSummary,
      youtubeId: vid.videoUrl.split('/embed/')[1]?.split('?')[0] || '',
      featuredImageId: mediaId,
      categoryId: categoryMap.get(vid.category),
      authorId: authorId,
      viewsCount: vid.views,
      publishedAt: new Date(vid.date),
    }).onConflictDoNothing();
  }

  // 5. Seed Phone Specs
  console.log(`Inserting ${PHONE_SPECS.length} phone specs...`);
  for (const spec of PHONE_SPECS) {
    const mediaId = await getOrCreateMedia(spec.image, `${spec.slug}-image`);
    
    await db.insert(phoneSpecs).values({
      brand: spec.brand,
      model: spec.model,
      slug: spec.slug,
      featuredImageId: mediaId,
      releasedYear: spec.releaseYear,
      deviceType: spec.type,
      specs: spec.specs,
      priceEstimate: spec.price,
    }).onConflictDoNothing();
  }

  console.log('✅ Seeding completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
