"use client"

import { useState } from "react"
import { Shield, Award, Link2, Download, Share2, CheckCircle, Lock } from "lucide-react"

interface Credential {
    id: string
    title: string
    issuer: string
    date: string
    verified: boolean
    blockchainHash: string
}

export function BlockchainCredentials() {
    const [credentials] = useState<Credential[]>([
        {
            id: "1",
            title: "EdIntel Sovereign Certification",
            issuer: "EdIntel Academy",
            date: "2025-12-15",
            verified: true,
            blockchainHash: "0x7f9a4b2c8d1e3f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
        },
        {
            id: "2",
            title: "AI-Powered IEP Specialist",
            issuer: "Alabama Department of Education",
            date: "2025-11-20",
            verified: true,
            blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
        },
        {
            id: "3",
            title: "Cognitive Leadership Certificate",
            issuer: "Walden University",
            date: "2025-10-05",
            verified: true,
            blockchainHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
        },
    ])

    return (
        <section id="blockchain" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm mb-4 float-animation">
                        <Shield className="w-4 h-4" />
                        BLOCKCHAIN VERIFIED
                    </div>
                    <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
                        Digital <span className="gradient-text">Credentials</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Tamper-proof certifications stored on Ethereum blockchain with NFT verification
                    </p>
                </div>

                {/* Blockchain Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card-gold p-6 rounded-2xl text-center heritage-glow">
                        <Lock className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">100%</p>
                        <p className="text-sm text-gray-400">Tamper-Proof</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <Link2 className="w-8 h-8 text-[#00d2ff] mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">Ethereum</p>
                        <p className="text-sm text-gray-400">Blockchain Network</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">Instant</p>
                        <p className="text-sm text-gray-400">Verification</p>
                    </div>
                </div>

                {/* Credentials List */}
                <div className="space-y-6">
                    {credentials.map((credential) => (
                        <div key={credential.id} className="glass-card p-6 rounded-2xl hover:scale-[1.01] transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#cd7f32] flex items-center justify-center flex-shrink-0">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-xl text-white">{credential.title}</h3>
                                            {credential.verified && (
                                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-xs text-emerald-400 font-semibold">Verified</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 mb-1">Issued by: {credential.issuer}</p>
                                        <p className="text-sm text-gray-500">Date: {new Date(credential.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Blockchain Hash */}
                            <div className="bg-black/30 p-4 rounded-xl mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Link2 className="w-4 h-4 text-[#00d2ff]" />
                                    <span className="text-xs text-gray-400">Blockchain Hash</span>
                                </div>
                                <code className="text-xs text-[#00d2ff] font-mono break-all">
                                    {credential.blockchainHash}
                                </code>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button className="flex-1 py-2 bg-[#00d2ff]/20 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg hover:bg-[#00d2ff]/30 transition-all flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Download NFT
                                </button>
                                <button className="flex-1 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share on LinkedIn
                                </button>
                                <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all">
                                    <Shield className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Verification Info */}
                <div className="mt-12 glass-card-gold p-8 rounded-3xl">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-8 h-8 text-[#d4af37]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-2xl text-white mb-3">How Blockchain Verification Works</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center">
                                            <span className="text-sm font-bold text-[#00d2ff]">1</span>
                                        </div>
                                        <h4 className="font-semibold text-white">Earn Credential</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">Complete training and assessments</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                            <span className="text-sm font-bold text-emerald-400">2</span>
                                        </div>
                                        <h4 className="font-semibold text-white">Mint NFT</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">Credential stored on Ethereum</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center">
                                            <span className="text-sm font-bold text-[#d4af37]">3</span>
                                        </div>
                                        <h4 className="font-semibold text-white">Verify Instantly</h4>
                                    </div>
                                    <p className="text-sm text-gray-400">Anyone can verify authenticity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
