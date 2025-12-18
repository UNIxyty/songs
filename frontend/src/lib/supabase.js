import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jbigpdiehkppwjcnmwxx.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaWdwZGllaGtwcHdqY25td3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzk4NzgsImV4cCI6MjA4MTY1NTg3OH0.ejzBJZwzRj8KYmAyt0LxdvI1x0b-jDBc0gt66E4igtg';

export const supabase = createClient(supabaseUrl, supabaseKey);
