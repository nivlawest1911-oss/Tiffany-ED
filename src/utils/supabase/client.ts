import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.warn('[EDINTEL_SAFE_UPLINK] Missing browser Supabase configuration. Returning null client.')
        return null
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}
