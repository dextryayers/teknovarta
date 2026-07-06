import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import * as schema from '../drizle/schema';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seed() {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/teknovarta';
  
  console.log('Connecting to PostgreSQL database...');
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client, { schema });

  const username = 'master';
  const password = 'teknovartamaster2026';

  console.log(`Checking if admin '${username}' exists...`);
  try {
    const existingUsers = await db.select().from(schema.users).limit(1);

    if (existingUsers.length > 0) {
      console.log('An admin user already exists. Skipping seed.');
      process.exit(0);
    }

    console.log('Creating master admin account...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await db.insert(schema.users).values({
      username: username,
      passwordHash: passwordHash,
    });

    console.log('=============================================');
    console.log('Master Admin Created Successfully!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('=============================================');
    console.log('Please change this password in the database later.');

  } catch (err) {
    console.error('Database connection failed! Have you pushed the schema? Error:', err);
  }

  process.exit(0);
}

seed().catch(err => {
  console.error('Seed Error:', err);
  process.exit(1);
});
