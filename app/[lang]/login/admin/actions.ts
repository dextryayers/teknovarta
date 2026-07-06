'use server';

import { db } from '@/postgres/db';
import { users, securityLogs } from '@/drizle/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username dan password wajib diisi.' };
  }

  try {
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1);

    if (user.length === 0) {
      await db.insert(securityLogs).values({
        eventType: 'LOGIN_FAILED',
        details: `Failed login attempt for username: ${username}`,
      });
      return { error: 'Username atau password salah.' };
    }

    const isValid = await bcrypt.compare(password, user[0].passwordHash);

    if (!isValid) {
      await db.insert(securityLogs).values({
        eventType: 'LOGIN_FAILED',
        details: `Invalid password for username: ${username}`,
      });
      return { error: 'Username atau password salah.' };
    }

    // Success login
    const token = await signToken({ id: user[0].id, username: user[0].username, role: 'master_admin' });
    
    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan sistem.' };
  }

  // Redirect should happen outside try-catch
  redirect('/admin');
}
