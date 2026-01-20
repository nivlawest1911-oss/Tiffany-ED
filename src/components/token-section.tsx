import { Coins } from "lucide-react"

export function TokenSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12 rounded-3xl text-center">
          <h2 className="font-black tracking-tighter text-3xl md:text-4xl text-[#00d2ff] mb-4">Fuel Your Future</h2>
          <p className="text-2xl md:text-3xl font-bold text-white mb-6">Unlock Ultimate Intelligence</p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00d2ff]/30 to-[#10b981]/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,210,255,0.3)]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#10b981] flex items-center justify-center">
                  <Coins className="w-8 h-8 text-white" />
                </div>
              </div>
              {/* Orbital ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#00d2ff]/30 animate-spin"
                style={{ animationDuration: "10s" }}
              />
            </div>
            <div className="text-left">
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                $9.9 <span className="text-lg font-normal text-gray-400">/ 1,000 AI Actions</span>
              </p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00d2ff]/20 to-[#10b981]/20 border border-[#00d2ff]/50 rounded-xl text-[#00d2ff] font-bold text-lg hover:from-[#00d2ff]/30 hover:to-[#10b981]/30 transition-all shadow-[0_0_30px_rgba(0,210,255,0.2)]">
            <Coins className="w-5 h-5" />
            Mint Your Tokens
          </button>

          <p className="mt-6 text-sm text-gray-500">
            Professional tokens never expire. Use them across all EdIntel products.
          </p>
        </div>
      </div>
    </section>
  )
}
