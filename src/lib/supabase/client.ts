import { createBrowserClient } from '@supabase/ssr';

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function createClient() {
  return createBrowserClient(
    getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  );
}
