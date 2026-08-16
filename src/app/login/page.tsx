import { redirect } from "next/navigation";
import { LoginCard } from "@/components/auth/login-card";
import { getCachedSession } from "@/lib/request-cache";
import Image from "next/image";

export default async function LoginPage() {
  let session = null;
  try {
    session = await getCachedSession();
  } catch (error) {
    console.error("[LOGIN_PAGE] Failed to retrieve auth session:", error);
  }

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
      {/* Server Component above-the-fold static brand header for immediate FCP/LCP */}
      <div className="mb-6 flex flex-col items-center text-center space-y-2">
        <div className="relative w-14 h-14 mb-1">
          <Image
            src="/images/edintel-logo.png"
            alt="EdIntel Sovereign"
            width={56}
            height={56}
            priority
            className="object-contain"
          />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 font-sans">
          EdIntel Sovereign
        </h1>
        <p className="text-xs text-amber-400/90 font-mono uppercase tracking-widest">
          Intelligence in Education
        </p>
      </div>

      <div className="w-full max-w-md min-h-[440px]">
        <LoginCard />
      </div>
    </div>
  );
}
