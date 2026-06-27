export function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-[#C5A46E]/30 border-t-[#C5A46E] rounded-full animate-spin mb-4" />
      <p className="text-white/60 text-sm">{message}</p>
    </div>
  );
}
