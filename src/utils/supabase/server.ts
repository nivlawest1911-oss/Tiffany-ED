import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// EdIntel Supabase Server Client - v2.0
// Check environment variables at module load time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

export const createClient = async (cookieStore?: ReturnType<typeof cookies>) => {
  // Early return if Supabase is not configured - app works without it
  if (!isSupabaseConfigured) {
    return null;
  }

  try {
    const store = cookieStore ? await cookieStore : await cookies();
    return createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return store.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      },
    );
  } catch (error) {
    console.error("[SUPABASE_SERVER] Failed to create client:", error);
    return null;
  }
};

