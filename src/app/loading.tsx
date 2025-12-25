export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="relative w-24 h-24">
        {/* Animated Neural Pulse */}
        <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping" />
        <div className="absolute inset-2 border border-blue-400/40 rounded-full animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </div>
      </div>
      <p className="mt-8 font-mono text-xs tracking-[0.3em] text-blue-400/60 uppercase animate-pulse">
        Synchronizing Node Data...
      </p>
    </div>
  );
}
