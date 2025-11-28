// lib/supabase/server.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure only one instance of the server client is created
let supabaseServerClient: SupabaseClient | null = null;

const getSupabaseServerClient = () => {
  if (supabaseServerClient) {
    return supabaseServerClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase URL or service role key is not defined in environment variables.');
  }

  supabaseServerClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseServerClient;
};

export const supabaseServer = getSupabaseServerClient();
