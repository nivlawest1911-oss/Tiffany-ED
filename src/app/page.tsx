import { createClient } from '@/lib/supabase/server';
import LandingPageClient from './LandingPageClient';
import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = await createClient();

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return redirect('/dashboard');
    }
  }

  return <LandingPageClient />;
}

