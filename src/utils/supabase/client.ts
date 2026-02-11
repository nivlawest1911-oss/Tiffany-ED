import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables are not set. Client will not be functional.')
        // Return a minimal client with placeholder values to prevent crashes during SSR/build
        return createBrowserClient(
            'https://placeholder.supabase.co',
            'placeholder-anon-key'
        )
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
