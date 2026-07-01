export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="animate-pulse space-y-8">
        <div className="h-10 w-96 bg-white/10 rounded-2xl" />
        <div className="h-6 w-[600px] bg-white/10 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-80 bg-white/10 rounded-3xl" />)}
        </div>
      </div>
    </div>
  );
}
