'use client';
export default function DistrictROI() {
  const metrics = [
    { label: 'Student Growth', value: '+22%', color: 'text-emerald-500' },
    { label: 'Resource Efficiency', value: '94%', color: 'text-blue-500' },
    { label: 'Sovereign Tokens', value: '1,240', color: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
          <p className="text-gray-400 text-xs uppercase tracking-widest">{m.label}</p>
          <h2 className={`text-4xl font-black mt-2 ${m.color}`}>{m.value}</h2>
        </div>
      ))}
    </div>
  );
}
