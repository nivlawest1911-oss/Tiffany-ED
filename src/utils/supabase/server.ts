import { createServerClient, type CookieMethods } from "@supabase/ssr";
import { cookies } from "next/headers";

// Check env vars BEFORE any Supabase imports execute
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const createClient = async (cookieStore?: ReturnType<typeof cookies>) => {
  // Gracefully handle missing Supabase configuration - check FIRST
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

