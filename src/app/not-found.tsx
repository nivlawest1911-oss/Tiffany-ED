import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* Gold Accent Circle */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#C5A46E]/30">
          <span className="text-6xl font-light text-[#C5A46E]">404</span>
        </div>

        <h1 className="text-5xl font-semibold tracking-[-2.5px] text-white mb-4">
          Page not found
        </h1>
        
        <p className="text-white/70 mb-8 text-lg">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          
          <Button asChild variant="outline" className="border-white/20">
            <Link href="/help">Visit Help Center</Link>
          </Button>
        </div>

        <p className="mt-10 text-xs text-white/40 tracking-[1px]">
          EDINTEL SOVEREIGN • INSTITUTIONAL PLATFORM
        </p>
      </div>
    </div>
  );
}
