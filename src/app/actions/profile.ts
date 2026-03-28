'use server';

import { createClient } from '@/lib/supabase/server';
import { Profile } from '@/types';
import { revalidatePath } from 'next/cache';

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

  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard', 'layout');
}
