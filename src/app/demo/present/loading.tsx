export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-pulse space-y-8">
      <div className="h-10 w-96 bg-white/10 rounded-2xl" />
      <div className="h-6 w-[700px] bg-white/10 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-28 bg-white/10 rounded-2xl" />)}
      </div>
      <div className="h-80 bg-white/10 rounded-3xl" />
    </div>
  );
}
