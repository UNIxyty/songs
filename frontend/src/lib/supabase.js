import { createClient } from '@supabase/supabase-js';

// Get from environment or use defaults (for Vercel, these should be set as env vars)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbigpdiehkppwjcnmwxx.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_secret_8PgDtifYsh64n6VMc4Uq-w_kX8yL7qY';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

