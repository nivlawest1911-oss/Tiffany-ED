/*
- [x] Audit `The Room` for overlaps with `AI Hub` and `Wellness`
- [x] Deep Audit for ALL application redundancies.
- [x] Document findings in expanded `audit_report.md`.
- [x] Update `implementation_plan.md` for total consolidation.
- [x] Phase 1: Unify Data Registries and Shared Utilities.
- [x] Phase 2: UI De-fragmentation
- [x] Unify Logos into `EdIntelLogo.tsx`
- [x] Consolidate Pricing/Subscription into `SovereignSubscription.tsx`
- [x] Merge Landing Pages into `ModernHomePage.tsx`
- [x] Phase 3: Sovereign Dashboard Unification
- [x] Merge `MissionControl` into `TheRoomClient`
- [x] Merge `CloudCommandCenter` into `TheRoomClient`
- [x] Fix JSX syntax & imports in `TheRoomClient`
- [x] Phase 4: Route Pruning & Cleanup
- [x] Delete `/ai-hub` directory
- [x] Correct `/dashboard` redirects to `/the-room`
- [x] Fix `EdIntelLogo` inline style warnings
- [/] Phase 5: Vercel Deployment & Verification
- [/] Initiate `vercel deploy --prod`
- [/] Perform final audit based on `audit_report.md`
- [x] Final verification and "Shit Removal" pass.
- [/] Document final state in `walkthrough.md`.
*/
import { createClient } from '@/lib/supabase/server';
import ModernHomePage from '@/components/ModernHomePage';
import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = await createClient();

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      return redirect('/the-room');
    }
  }

  return <ModernHomePage />;
}
