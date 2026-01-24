'use client';
import { useState } from 'react';
import {
    User,
    Sparkles,
    Zap,
    Shield as LucideShield,
    Video,
    Globe,
    Activity,
    Dna,
    CheckCircle2,
    Loader2,
    Type,
    Copy,
    Volume2
} from "lucide-react";


interface AvatarConfig {
    role: string;
    name: string;
    specialization: string;
    autonomyLevel: number;
    avatarUrl?: string;
    elevenLabsId?: string;
}

const AVATAR_LIBRARY = [
    { id: 'twin-01', name: 'Director West', role: 'Executive', img: '/images/dr_alvin_west.png', heygenId: 'Abigail_expressive_2024112501', elevenLabsId: 'JBFqnCBsd6RMkjVDRZzb' },
    { id: 'twin-02', name: 'Dr. Sarah James', role: 'Instructional', img: '/images/avatars/iep_architect.png', heygenId: 'Lina_Dress_Sitting_Side_public', elevenLabsId: '21m00Tcm4TlvDq8ikWAM' },
    { id: 'twin-03', name: 'Specialist David', role: 'STEM Lead', img: '/images/avatars/executive_leader.png', heygenId: 'Abigail_standing_office_front', elevenLabsId: 'soY4btAspOtqS4y4s7TV' },
    { id: 'twin-04', name: 'Principal Elena', role: 'Compliance', img: '/images/avatars/data_analyst.png', heygenId: 'Lina_Dress_Sitting_Side_public', elevenLabsId: 'AZnzlk1XvdvUeBnXmlld' },
    { id: 'twin-05', name: 'Agent Marcus II', role: 'Operations', img: '/images/avatars/executive_leader.png', heygenId: 'Abigail_expressive_2024112501', elevenLabsId: 'TxGEqnHWrfWFTfGW9XjX' },
    { id: 'twin-06', name: 'Director Nova', role: 'Professional Lead', img: '/images/avatars/curriculum_strategist.png', heygenId: 'Lina_Dress_Sitting_Side_public', elevenLabsId: 'EXAVITQu4vr4xnSDxMaL' },
];

interface AvatarOutput {
    mission: string;
    profile: string;
    power: string;
    tasks: string[];
    sid: string;
}

export default function AvatarStudio() {
    const [config, setConfig] = useState<AvatarConfig>({
        role: 'teacher',
        name: '',
        specialization: '',
        autonomyLevel: 75,
        avatarUrl: AVATAR_LIBRARY[0].img
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);
    const [output, setOutput] = useState<AvatarOutput | null>(null);
    const [captionsProject, setCaptionsProject] = useState<any>(null);
    const [isSyncingCaptions, setIsSyncingCaptions] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const roles = [
        { id: 'superintendent', label: 'Superintendent', icon: <LucideShield size={16} />, color: 'purple' },
        { id: 'admin', label: 'Principal/Admin', icon: <Zap size={16} />, color: 'orange' },
        { id: 'teacher', label: 'Lead Educator', icon: <User size={16} />, color: 'blue' },
        { id: 'counselor', label: 'Support/Counselor', icon: <Activity size={16} />, color: 'rose' },
        { id: 'board', label: 'Board Member', icon: <Globe size={16} />, color: 'emerald' },
        { id: 'central', label: 'Central Office', icon: <Dna size={16} />, color: 'indigo' },
    ];

    const handleGenerate = async () => {
        if (!config.name || !config.specialization) return;
        setIsGenerating(true);

        try {
            const res = await fetch('/api/avatar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            const textResponse = await res.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                console.error("Avatar API returned non-JSON:", textResponse);
                throw new Error("Assistant Creation Error: Client returned invalid format.");
            }

            if (!res.ok || data.error) {
                throw new Error(data?.error || "Creation process interrupted.");
            }

            // Parse the output (simple parsing for now)
            const text = data.output;
            const parsed: AvatarOutput = {
                mission: extract(text, 'MISSION:', 'COGNITIVE_PROFILE:'),
                profile: extract(text, 'COGNITIVE_PROFILE:', 'CORE_POWER:'),
                power: extract(text, 'CORE_POWER:', 'AUTOMATED_TASKS:'),
                tasks: extract(text, 'AUTOMATED_TASKS:', 'PROFESSIONAL_ID:').split('\n').filter(t => t.trim()).map(t => t.replace(/^[0-9.-]+\s*/, '')),
                sid: extract(text, 'PROFESSIONAL_ID:', null)
            };

            setOutput(parsed);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    const extract = (text: string | undefined, start: string, end: string | null): string => {
        if (!text) return "Pending Definition";
        const s = text.indexOf(start);
        if (s === -1) return "Profile Set";
        const startPos = s + start.length;
        const e = end ? text.indexOf(end, startPos) : text.length;
        return text.substring(startPos, e).trim();
    };

    const handleGenerateVideo = async () => {
        if (!output) return;
        setIsGeneratingVideo(true);
        setVideoStatus('Initiating Video Profile...');

        try {
            const avatar = AVATAR_LIBRARY.find(a => a.img === config.avatarUrl);
            const res = await fetch('/api/heygen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    avatarId: avatar?.heygenId || '6b56dc29-9e8c-11ee-8608-0a58a9feac02',
                    text: output.mission
                }),
            });
            const textResponse = await res.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                console.error("HeyGen API returned non-JSON:", textResponse);
                throw new Error("Video Link Unstable.");
            }

            if (!res.ok || data.error) {
                throw new Error(data?.error || "Video Creation Failed.");
            }

            const { videoId } = data;

            // Start Polling
            const pollStatus = async () => {
                const statusRes = await fetch('/api/heygen', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'status', videoId }),
                });

                const statusText = await statusRes.text();
                let statusData;
                try {
                    statusData = JSON.parse(statusText);
                } catch (err) {
                    console.error("HeyGen Status API returned non-JSON:", statusText);
                    setVideoStatus('Sync Error');
                    return;
                }

                const { status } = statusData;

                if (status.status === 'completed') {
                    setVideoUrl(status.video_url);
                    setIsGeneratingVideo(false);
                    setVideoStatus(null);
                } else if (status.status === 'failed') {
                    setVideoStatus('Creation Failed');
                    setIsGeneratingVideo(false);
                } else {
                    setVideoStatus(`Creating Video: ${status.status}...`);
                    setTimeout(pollStatus, 3000);
                }
            };

            pollStatus();
        } catch (e) {
            console.error(e);
            setIsGeneratingVideo(false);
            setVideoStatus('Error Connecting to Video Service');
        }
    };

    const handleSyncCaptions = async () => {
        setIsSyncingCaptions(true);
        try {
            const res = await fetch('/api/captions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stableId: 'lsQRXGhq46Tk81__VgUO-' }),
            });
            const textResponse = await res.text();
            let data;
            try {
                data = JSON.parse(textResponse);
            } catch (err) {
                console.error("Captions API returned non-JSON:", textResponse);
                throw new Error("Captions Sync Failed: Invalid response.");
            }

            if (!res.ok || data.error) {
                throw new Error(data?.error || 'Captions Sync Failed');
            }

            const { project } = data;
            setCaptionsProject(project);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSyncingCaptions(false);
        }
    };

    const handleSpeak = async () => {
        if (!output || isSpeaking) return;
        setIsSpeaking(true);

        try {
            const avatar = AVATAR_LIBRARY.find(a => a.img === config.avatarUrl);
            const res = await fetch('/api/elevenlabs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: output.mission,
                    voiceId: avatar?.elevenLabsId || '21m00Tcm4TlvDq8ikWAM' // Fallback to Rachel
                }),
            });

            if (!res.ok) throw new Error('Speech synthesis failed');

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);

            audio.onended = () => {
                setIsSpeaking(false);
                URL.revokeObjectURL(url);
            };

            await audio.play();

        } catch (e) {
            console.error(e);
            setIsSpeaking(false);
        }
    };

    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-950 text-white border border-zinc-900 shadow-3xl relative overflow-hidden group">
            {/* Background Grid/Glow */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] -mr-64 -mt-64 pointer-events-none group-hover:bg-purple-600/20 transition-all duration-1000" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 group-hover:border-purple-500/50 transition-all">
                                <LucideShield className="text-purple-500" size={24} />
                            </div>
                            <div className="h-8 w-px bg-zinc-800" />
                        </div>
                        <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl relative z-10 transition-transform group-hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800 p-2">
                            <img src="/images/edintel-logo.png" alt="EdIntel Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-zinc-400">
                                Avatar Studio
                            </h2>
                            <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]">Executive Assistant Creation v5.0</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-950/30 border border-purple-500/30 rounded-2xl shadow-lg shadow-purple-900/20">
                            <Video size={14} className="text-purple-400" />
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">High-Fidelity Sync</span>
                        </div>
                    </div>
                </div>


                {!output ? (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        {/* Avatar Library Selection */}
                        <div>
                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Select Leadership Base</label>
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                {AVATAR_LIBRARY.map((avatar) => (
                                    <button
                                        key={avatar.id}
                                        onClick={() => setConfig({ ...config, avatarUrl: avatar.img })}
                                        className={`flex-shrink-0 group/av relative w-24 transition-all ${config.avatarUrl === avatar.img ? 'scale-110' : 'opacity-50 hover:opacity-100'}`}
                                    >
                                        <div className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${config.avatarUrl === avatar.img ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-zinc-800'}`}>
                                            <img src={avatar.img} alt={avatar.name} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-[8px] font-bold uppercase tracking-tighter mt-2 text-center text-zinc-400 group-hover/av:text-purple-400">{avatar.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Config Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Leadership Role Profile</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {roles.map((r) => (
                                            <button
                                                key={r.id}
                                                onClick={() => setConfig({ ...config, role: r.id })}
                                                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${config.role === r.id
                                                    ? `bg-${r.color}-500/10 border-${r.color}-500/50 text-white shadow-lg`
                                                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-lg bg-zinc-800 ${config.role === r.id ? 'text-white' : ''}`}>
                                                    {r.icon}
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">{r.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={config.name}
                                            onChange={(e) => setConfig({ ...config, name: e.target.value })}
                                            placeholder="Assistant Name"
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-zinc-700"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={config.specialization}
                                            onChange={(e) => setConfig({ ...config, specialization: e.target.value })}
                                            placeholder="Specialization (e.g., Compliance/STEM)"
                                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Assistive Calibration</span>
                                        <span className="text-xl font-black text-purple-400">{config.autonomyLevel}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={config.autonomyLevel}
                                        onChange={(e) => setConfig({ ...config, autonomyLevel: parseInt(e.target.value) })}
                                        className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-purple-500"
                                    />
                                    <div className="flex justify-between mt-3 text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">
                                        <span>Human-Assisted</span>
                                        <span>Fully Autonomous</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !config.name || !config.specialization}
                            className="w-full py-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-size-200 animate-gradient rounded-3xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.01] transition-all shadow-2xl shadow-purple-900/20 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Setting up assistant profile...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Create Leadership Assistant
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="animate-in zoom-in-95 duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Visual & ID */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex flex-col items-center justify-center relative group/avatar overflow-hidden">
                                    <div className="absolute inset-0 bg-purple-600/5 animate-pulse" />
                                    {videoUrl ? (
                                        <video
                                            className="w-full h-full object-cover relative z-10"
                                            src={videoUrl}
                                            controls
                                            autoPlay
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center border-4 border-purple-500/20 relative z-10 shadow-3xl">
                                            <img src={config.avatarUrl} alt={config.name} className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all duration-700" />
                                            {isGeneratingVideo && (
                                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                                                    <Loader2 className="animate-spin text-purple-400 mb-2" size={24} />
                                                    <span className="text-[8px] font-black uppercase text-purple-400 text-center px-4">{videoStatus}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="mt-6 text-center z-10">
                                        <h3 className="text-xl font-black tracking-tight">{config.name}</h3>
                                        <p className="text-[10px] font-mono text-purple-500 font-bold uppercase tracking-widest mt-1">
                                            {output.sid}
                                        </p>
                                    </div>
                                    {/* Design Overlay */}
                                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-[3rem] m-4" />
                                </div>

                                <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                                    <div className="flex items-center gap-3 text-purple-400 mb-3">
                                        <LucideShield size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Leadership Role</span>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-300 italic">{output.power}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800 relative overflow-hidden group/briefing">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />

                                    <div className="absolute top-6 right-8 z-20">
                                        <div className="flex items-center gap-2 text-green-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            Assistant Online
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2 text-center lg:text-left">Assignment</span>
                                            <p className="text-lg font-medium leading-relaxed text-zinc-200 text-center lg:text-left">
                                                "{output.mission}"
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Specialization profile</span>
                                            <p className="text-sm text-zinc-400 leading-relaxed">
                                                {output.profile}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-4">Priority Tasks</span>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {output.tasks.map((task, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-zinc-800 group/task hover:border-purple-500/50 transition-all">
                                                        <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover/task:text-purple-400">
                                                            0{i + 1}
                                                        </div>
                                                        <span className="text-[11px] font-medium text-zinc-400 group-hover/task:text-zinc-200">{task}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            setOutput(null);
                                            setVideoUrl(null);
                                        }}
                                        className="flex-1 py-5 bg-zinc-900 border border-zinc-800 rounded-3xl font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={handleSpeak}
                                        disabled={isSpeaking}
                                        className="w-20 py-5 bg-zinc-900 border border-zinc-800 rounded-3xl font-bold uppercase hover:bg-zinc-800 hover:border-purple-500/50 transition-all flex items-center justify-center text-purple-400 disabled:opacity-50 group/mic"
                                        title="Preview Voice Profile"
                                    >
                                        {isSpeaking ? <Loader2 className="animate-spin text-purple-500" size={18} /> :
                                            <div className="relative">
                                                <Volume2 size={18} className="group-hover/mic:scale-110 transition-transform" />
                                                {/* Audio Wave Effect */}
                                                <div className="absolute inset-0 bg-purple-500/30 blur-lg rounded-full animate-ping opacity-0 group-hover/mic:opacity-100" />
                                            </div>
                                        }
                                    </button>
                                    <button
                                        onClick={handleGenerateVideo}
                                        disabled={isGeneratingVideo || !!videoUrl}
                                        className="flex-1 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isGeneratingVideo ? (
                                            <>
                                                <Loader2 className="animate-spin" size={14} />
                                                Creating Video...
                                            </>
                                        ) : videoUrl ? (
                                            <>
                                                <CheckCircle2 size={14} />
                                                Video Ready
                                            </>
                                        ) : (
                                            <>
                                                <Video size={14} />
                                                Create Professional Briefing
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Transcribe Hub */}
                <div className="mt-12 p-8 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-800/50 relative group/captions overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/captions:opacity-100 transition-opacity duration-1000" />
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-xl">
                                <Type className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black tracking-tight uppercase">Transcription Center</h3>
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">AI-Powered Rapid Transcription Bridge</p>
                            </div>
                        </div>

                        {!captionsProject ? (
                            <button
                                onClick={handleSyncCaptions}
                                disabled={isSyncingCaptions}
                                className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                {isSyncingCaptions ? (
                                    <>
                                        <Loader2 className="animate-spin" size={14} />
                                        Syncing Project...
                                    </>
                                ) : (
                                    <>
                                        <Copy size={14} />
                                        Sync Transcriptions
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="flex items-center gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-blue-400 mb-1">Project Active</p>
                                    <p className="text-xs font-bold text-zinc-300">lsQRXGhq46Tk81__VgUO-</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                    <CheckCircle2 size={20} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Lab Signature */}
                <div className="mt-12 pt-8 border-t border-zinc-900 flex items-center justify-between opacity-30">
                    <div className="flex gap-6">
                        <span className="text-[9px] font-mono tracking-widest uppercase">Encryption: AES-256</span>
                        <span className="text-[9px] font-mono tracking-widest uppercase">Center: DIRECTOR-01</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest uppercase">Dr. Alvin West, II | Director © 2025</span>
                </div>
            </div>
        </div>
    );
}
