import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () => {
  // Gracefully handle missing Supabase configuration
  if (!supabaseUrl || !supabaseKey) {
    console.log("[SUPABASE_CLIENT] Missing Supabase configuration. Returning null client.");
    return null;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
