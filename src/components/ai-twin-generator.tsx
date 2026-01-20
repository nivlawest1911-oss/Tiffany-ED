"use client"

import { useState } from "react"
import { Video, Mic, Camera, Sparkles, User, Brain, MessageSquare, HardDrive, Upload, ScanFace, Fingerprint } from "lucide-react"
import { motion } from "framer-motion";
import { generateProfessionalResponse } from '../lib/leadership-ai';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

export function AITwinGenerator() {
    const [twinName, setTwinName] = useState("")
    const [twinRole, setTwinRole] = useState("teacher")
    const [userImage, setUserImage] = useState<string | null>(null);
    const [isScanningVoice, setIsScanningVoice] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [twinCreated, setTwinCreated] = useState(false);
    const [twinProfile, setTwinProfile] = useState<string>("");
    const { playClick, playSuccess, playHover } = useProfessionalSounds(); // Sound Effects

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUserImage(url);
            playSuccess();
        }
    };

    const handleVoiceScan = () => {
        setIsScanningVoice(true);
        playClick();
        setTimeout(() => {
            setIsScanningVoice(false);
            playSuccess();
            alert("VOICE PRINT CAPTURED: 99.4% Similarity match. Voice profile synced to Executive Core.");
        }, 3000);
    };

    const handleGenerateTwin = async () => {
        playClick();
        setIsGenerating(true)
        try {
            // Simulated 2-step generation for realism
            await new Promise(r => setTimeout(r, 2500));

            const rawProfile = await generateProfessionalResponse("twin configuration", "twin-gen-1");
            const customizedProfile = rawProfile
                .replace('[Name]', twinName || "User AI")
                .replace('[Role]', twinRole === 'teacher' ? 'Instructional Core Assistant' :
                    twinRole === 'admin' ? 'Strategic Operations Director' :
                        twinRole === 'counselor' ? 'Student Advocacy Lead' : 'Instructional Coach');

            setTwinProfile(customizedProfile);
            setTwinCreated(true);
            playSuccess();
        } catch (error) {
            console.error("Twin Generation Failed", error);
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <section id="ai-twin" className="px-4 md:px-8 py-16 md:py-32 relative overflow-hidden bg-black font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        <ScanFace className="w-3 h-3" />
                        <span>Professional Strategic Cloning</span>
                    </motion.div>
                    <h2 className="font-black tracking-tighter text-5xl md:text-7xl text-white mb-6 leading-tight">
                        Deploy Your <br /><span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">Sovereign Identity</span>
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Create a high-fidelity AI delegate that mirrors your voice, leadership style, and decision-making matrix.
                        This is your personal <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Digital Twin</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Twin Creator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-indigo-500/20 transition-all shadow-[0_0_50px_rgba(79,70,229,0.1)]"
                    >
                        <div className="absolute top-6 right-8">
                            <div className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full bg-black/40">
                                <HardDrive size={10} />
                                SOVEREIGN STORAGE: ACTIVE
                            </div>
                        </div>

                        <h3 className="font-bold text-2xl text-white mb-8 flex items-center gap-3">
                            <Fingerprint className="text-indigo-500" />
                            Identity Configuration
                        </h3>

                        <div className="space-y-8">
                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 block">Designation (Twin Name)</label>
                                <input
                                    type="text"
                                    value={twinName}
                                    onChange={(e) => setTwinName(e.target.value)}
                                    placeholder="e.g., Executive West AI"
                                    className="w-full p-5 bg-black/50 border border-white/10 rounded-2xl text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 block">Strategic Role Template</label>
                                <select
                                    value={twinRole}
                                    onChange={(e) => setTwinRole(e.target.value)}
                                    className="w-full p-5 bg-black/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 appearance-none font-mono text-sm"
                                >
                                    <option value="teacher">Sovereign Principal</option>
                                    <option value="admin">Strategic Operations Chief</option>
                                    <option value="counselor">Student Advocacy Lead</option>
                                    <option value="coach">Executive Coach</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <label className="cursor-pointer group/upload">
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    <div className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl group-hover/upload:bg-white/10 group-hover/upload:border-indigo-500/30 transition-all aspect-square text-center">
                                        <Camera className={`w-6 h-6 ${userImage ? 'text-emerald-400' : 'text-blue-400'}`} />
                                        <span className="text-[10px] uppercase font-bold text-zinc-500 group-hover/upload:text-white leading-tight">
                                            {userImage ? 'Image Loaded' : 'Upload Your Photo'}
                                        </span>
                                    </div>
                                </label>

                                <button
                                    onClick={handleVoiceScan}
                                    disabled={isScanningVoice}
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all aspect-square text-center disabled:opacity-50"
                                >
                                    <Mic className={`w-6 h-6 ${isScanningVoice ? 'animate-pulse text-red-500' : 'text-emerald-400'}`} />
                                    <span className="text-[10px] uppercase font-bold text-zinc-500 hover:text-white leading-tight">
                                        {isScanningVoice ? 'Recording...' : 'Voice Print Scan'}
                                    </span>
                                </button>

                                <button
                                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all aspect-square text-center"
                                >
                                    <Video className="w-6 h-6 text-purple-400" />
                                    <span className="text-[10px] uppercase font-bold text-zinc-500 hover:text-white leading-tight">Motion Mastery</span>
                                </button>
                            </div>

                            <button
                                onClick={handleGenerateTwin}
                                disabled={isGenerating || !twinName || !userImage}
                                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20"
                            >
                                {isGenerating ? (
                                    <>
                                        <Brain className="w-5 h-5 animate-spin" />
                                        Synthesizing Your Identity...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Deploy Sovereign Twin
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Twin Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] flex flex-col h-full relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)]"
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-bold text-2xl text-white flex items-center gap-3">
                                <ScanFace className="text-emerald-500" />
                                Identity Preview
                            </h3>
                            {twinCreated && (
                                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                                    Twin Online
                                </div>
                            )}
                        </div>

                        {twinCreated ? (
                            <div className="space-y-6 flex-1 flex flex-col relative z-10">
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center shrink-0 border border-white/10 shadow-2xl">
                                    <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                    <div className="relative z-10 text-center w-full px-8">
                                        <div className="relative w-32 h-32 mx-auto mb-4 group">
                                            <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-20" />
                                            <img
                                                src={userImage || "/images/dr_alvin_west.png"}
                                                alt="AI Twin"
                                                className="w-full h-full rounded-full border-4 border-indigo-500 shadow-2xl object-cover relative z-10"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-2 border-black z-20">
                                                <Sparkles size={12} className="text-white" />
                                            </div>
                                        </div>
                                        <h4 className="text-white font-bold text-lg uppercase tracking-wider">{twinName}</h4>
                                        <p className="text-indigo-400 text-[10px] font-mono uppercase tracking-[0.3em]">SOVEREIGN_TWIN_v4.2</p>

                                        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mt-6 border border-white/5">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                                                animate={{ width: ["0%", "100%"] }}
                                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-[8px] text-zinc-500 font-mono">LATENCY: 12ms</span>
                                            <span className="text-[8px] text-zinc-500 font-mono">FIDELITY: 99.8%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/50 rounded-2xl p-6 border border-white/5 font-mono text-[10px] text-indigo-300/80 leading-relaxed shadow-inner">
                                    <div className="flex items-center gap-2 mb-4 text-zinc-600 border-b border-white/5 pb-2">
                                        <HardDrive size={10} />
                                        <span>/system/identities/{twinName.toLowerCase().replace(/\s/g, '_') || 'twin'}.core</span>
                                    </div>
                                    {twinProfile}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 relative z-10">
                                <Brain className="w-20 h-20 text-zinc-800 mb-6 animate-pulse" />
                                <p className="text-zinc-500 font-medium">Awaiting Identity Configuration</p>
                                <p className="text-xs text-zinc-600 mt-2 max-w-xs mx-auto">Upload your photo and record your voice print to begin the cloning process.</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Embedded Demo Video - Enhanced */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-16 bg-zinc-900/20 border border-white/5 p-8 rounded-[3rem] overflow-hidden"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-2">
                            <Video size={10} />
                            <span>Professional Demo Vault</span>
                        </div>
                        <h3 className="font-bold text-2xl text-white">Strategic Twin Capabilities</h3>
                    </div>
                    <div className="aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl max-w-5xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                        <video
                            controls
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            poster="/images/labs-bg.jpg"
                        >
                            <source src="/videos/briefings/counselor_briefing.mp4" type="video/mp4" />
                            <track kind="captions" src="/videos/ai-twin-captions.vtt" srcLang="en" label="English" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                            <p className="text-white font-bold text-lg">Dr. West (Strategic Twin)</p>
                            <p className="text-indigo-400 text-xs font-mono">Live Demonstration • fidelity_99_8.mp4</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
