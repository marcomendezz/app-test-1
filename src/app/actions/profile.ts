'use server';

import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/types';
import { revalidatePath } from 'next/cache';
import { profileSchema } from '@/lib/validations';

export async function getProfile() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) return null;

  return data as Profile;
}

export async function updateProfile(updates: Partial<Profile>) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('Unauthorized');

  // Server-side validation — only validate fields that are present
  const fieldsToValidate = Object.keys(updates);
  if (fieldsToValidate.some(k => ['full_name', 'email', 'company', 'notify_email', 'notify_browser'].includes(k))) {
    const partialSchema = profileSchema.partial();
    partialSchema.parse(updates);
  }

  // Strip sensitive fields that shouldn't be user-modifiable (plan is admin-only)
  const { id: _id, created_at: _created_at, plan: _plan, ...safeUpdates } = updates as Partial<Profile> & Record<string, unknown>;

  const { error } = await supabase
    .from('profiles')
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) throw new Error('Failed to update profile');

  revalidatePath('/dashboard', 'layout');
}
