import { supabase } from '../lib/supabase';

// Get table name from environment or use default
const TABLE_NAME = import.meta.env.VITE_SUPABASE_TABLE || 'links';

export const getSongs = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateSongStatus = async (id, status) => {
  // Match your existing status values: NULL, 'Saved', 'Approved', 'Declined', 'About to Play'
  const validStatuses = ['Saved', 'Approved', 'Declined', 'About to Play'];
  if (status && !validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ 
      status: status || null
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
