import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cnkhwdjgxxcjjxsnixxf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNua2h3ZGpneHhjamp4c25peHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3OTE4OTMsImV4cCI6MjA1ODM2Nzg5M30.wqj0mhUOBt_OP7lxU63Unnqbl6dQCKXnr1zRq7f0p_U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test directo para confirmar conexión correcta
const testConnection = async () => {
  const { data, error } = await supabase.storage.listBuckets();
  console.log('Buckets visibles desde Supabase client.ts:', data, error);
};
testConnection();
