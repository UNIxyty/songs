import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbigpdiehkppwjcnmwxx.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_secret_8PgDtifYsh64n6VMc4Uq-w_kX8yL7qY';

export const supabase = createClient(supabaseUrl, supabaseKey);
