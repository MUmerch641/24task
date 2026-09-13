import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | undefined;

export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Quote requests are temporarily unavailable. Please call us on 07346 811790.");
  }

  client ??= createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

export default getSupabase;
