'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: passwordSchema,
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
});

export async function login(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { success } = rateLimit(`login:${ip}`, { maxAttempts: 5, windowMs: 15 * 60 * 1000 });
  if (!success) {
    return { error: 'Too many login attempts. Please try again in a few minutes.' };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    // Generic message to prevent email enumeration
    return { error: 'Invalid email or password' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { success } = rateLimit(`signup:${ip}`, { maxAttempts: 3, windowMs: 15 * 60 * 1000 });
  if (!success) {
    return { error: 'Too many signup attempts. Please try again in a few minutes.' };
  }

  const parsed = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    console.error('NEXT_PUBLIC_SITE_URL is not configured');
    return { error: 'Service configuration error. Please contact support.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.full_name,
      },
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    // Generic message to prevent email enumeration
    return { error: 'Unable to create account. Please try again.' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/verify-email');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
