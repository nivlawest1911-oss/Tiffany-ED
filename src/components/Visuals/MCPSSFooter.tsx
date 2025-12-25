'use client';
export default function MCPSSFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40 backdrop-blur-xl p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light text-white/60">
        <div>
          <h4 className="text-[#FFD700] font-bold mb-4 uppercase tracking-widest">District HQ</h4>
          <p>1 Magnum Pass</p>
          <p>Mobile, AL 36618</p>
          <p>P: 251-221-4000</p>
        </div>
        <div className="text-center">
          <h4 className="text-[#FFD700] font-bold mb-4 uppercase tracking-widest italic">Learning Today. Leading Tomorrow.</h4>
          <p className="max-w-xs mx-auto">The mission of Mobile County Public Schools is to graduate students who are college and career ready.</p>
        </div>
        <div className="text-right">
          <h4 className="text-[#FFD700] font-bold mb-4 uppercase tracking-widest">Connect</h4>
          <p>#teammcpss</p>
          <p>Perseverance Propels Progress</p>
        </div>
      </div>
    </footer>
  );
}
