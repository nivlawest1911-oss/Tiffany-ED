import { redirect } from "next/navigation";
import { SovereignMasterShell } from "@/components/sovereign/sovereign-master-shell";
import { getCachedSession } from "@/lib/request-cache";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getCachedSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 md:p-10">
      <SovereignMasterShell />
    </div>
  );
}
