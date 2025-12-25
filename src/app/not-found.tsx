import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-xl text-white/60 mb-8 font-light italic">Signal lost in the Prichard Node.</p>
      <Link href="/" className="px-8 py-3 border border-blue-500/50 hover:bg-blue-500/10 transition-all rounded-full uppercase tracking-widest text-xs">
        Return to Portal
      </Link>
    </main>
  );
}
