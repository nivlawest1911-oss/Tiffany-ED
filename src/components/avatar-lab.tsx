"use client"

import { useState, useEffect } from "react"
import { User, Wand2, Palette, Download, RefreshCw, Sparkles, Camera, Mic, Volume2 } from "lucide-react"
import Image from "next/image"

const avatarStyles = [
  { id: "professional", name: "Professional", description: "Corporate and polished", emoji: "👔" },
  { id: "educator", name: "Educator", description: "Warm and approachable", emoji: "📚" },
  { id: "leader", name: "Leader", description: "Confident and inspiring", emoji: "🎯" },
  { id: "creative", name: "Creative", description: "Artistic and expressive", emoji: "🎨" },
  { id: "afrofuturist", name: "Afrofuturist", description: "Sovereign and visionary", emoji: "🌌" },
]

const skinTones = [
  { id: "tone1", color: "#8d5524", name: "Rich Brown" },
  { id: "tone2", color: "#c68642", name: "Caramel" },
  { id: "tone3", color: "#5c3317", name: "Deep Brown" },
  { id: "tone4", color: "#a0522d", name: "Sienna" },
  { id: "tone5", color: "#d2691e", name: "Chocolate" },
  { id: "tone6", color: "#f1c27d", name: "Honey" },
]

const colorSchemes = [
  { id: "sovereign", colors: ["#00d2ff", "#10b981"], name: "Sovereign" },
  { id: "royal", colors: ["#d4af37", "#8b4513"], name: "Royal Gold" },
  { id: "ocean", colors: ["#0ea5e9", "#6366f1"], name: "Ocean" },
  { id: "forest", colors: ["#22c55e", "#14b8a6"], name: "Forest" },
  { id: "kente", colors: ["#d4af37", "#228b22", "#dc143c"], name: "Kente" },
]

export function AvatarLab() {
  const [selectedStyle, setSelectedStyle] = useState("professional")
  const [selectedScheme, setSelectedScheme] = useState("sovereign")
  const [selectedTone, setSelectedTone] = useState("tone1")
  const [isGenerating, setIsGenerating] = useState(false)
  const [avatarGenerated, setAvatarGenerated] = useState(false)
  const [isHyperReal, setIsHyperReal] = useState(false)
  const [rotation, setRotation] = useState(0)

  // Holographic rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => (r + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setAvatarGenerated(true)
    }, 3500)
  }

  const selectedToneData = skinTones.find((t) => t.id === selectedTone)
  const selectedSchemeData = colorSchemes.find((s) => s.id === selectedScheme)

  return (
    <section id="avatar-lab" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00d2ff]/20 particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            IDENTITY CREATION STUDIO
          </div>
          <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
            Avatar <span className="gradient-text">Lab</span>
          </h2>
          <p className="text-gray-400 text-lg">Create your Sovereign Identity with cultural authenticity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel with Holographic Effect */}
          <div className="glass-card-gold p-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Holographic ring */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background: `conic-gradient(from ${rotation}deg, #00d2ff, #10b981, #d4af37, #00d2ff)`,
                filter: "blur(40px)",
              }}
            />

            <div className="relative z-10 w-full flex flex-col items-center">

              {/* Hyper-Real Toggle */}
              <button
                onClick={() => setIsHyperReal(!isHyperReal)}
                className={`mb-6 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${isHyperReal
                    ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 border-white/10 text-gray-500 hover:border-white/30"
                  }`}
              >
                <Sparkles className="w-3 h-3" />
                {isHyperReal ? "HYPER-REALISTIC MODE ACTIVE" : "ENABLE HYPER-REALISM"}
              </button>

              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(from ${rotation}deg, ${selectedSchemeData?.colors[0]}, ${selectedSchemeData?.colors[1] || selectedSchemeData?.colors[0]}, ${selectedSchemeData?.colors[0]})`,
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                  }}
                />

                {/* Avatar container */}
                <div
                  className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center border-4 relative overflow-hidden float-animation"
                  style={{
                    borderColor: selectedSchemeData?.colors[0],
                    backgroundColor: avatarGenerated ? selectedToneData?.color : "rgba(255,255,255,0.1)",
                    boxShadow: isHyperReal ? `0 0 50px ${selectedSchemeData?.colors[0]}40` : 'none'
                  }}
                >
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="w-16 h-16 text-[#00d2ff] animate-spin" />
                      <span className="text-sm text-gray-400">Rendering {isHyperReal ? "4K" : "Preview"}...</span>
                    </div>
                  ) : avatarGenerated ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src="/professional-african-american-educator-avatar-port.jpg"
                        alt="Generated Avatar"
                        fill
                        className={`object-cover transition-all duration-700 ${isHyperReal ? 'contrast-125 saturate-110' : ''}`}
                      />
                      {!isHyperReal && <div className="absolute inset-0 bg-black/10 opacity-20 pointer-events-none" />}
                    </div>
                  ) : (
                    <User className="w-20 h-20 text-[#00d2ff]" />
                  )}
                </div>

                {/* Status badge */}
                <div
                  className="absolute -bottom-2 -right-2 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: selectedSchemeData?.colors[0] }}
                >
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>

              <p className="mt-8 text-lg text-gray-300 font-medium">Your Sovereign Identity</p>
              <p className="text-sm text-gray-500">
                {avatarStyles.find((s) => s.id === selectedStyle)?.emoji}{" "}
                {avatarStyles.find((s) => s.id === selectedStyle)?.name} Style
              </p>

              <div className="flex gap-3 mt-6">
                <button className="flex items-center gap-2 px-5 py-3 bg-[#00d2ff]/10 border border-[#00d2ff]/30 rounded-xl text-[#00d2ff] text-sm hover:bg-[#00d2ff]/20 transition-all touch-target">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm hover:bg-white/10 transition-all touch-target">
                  <Camera className="w-4 h-4" />
                  Use Photo
                </button>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="glass-card p-8 rounded-3xl space-y-8">
            {/* Avatar Style */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="w-5 h-5 text-[#00d2ff]" />
                <h3 className="font-bold text-white text-lg">Avatar Style</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {avatarStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl text-left transition-all touch-target ${selectedStyle === style.id
                        ? "bg-[#00d2ff]/20 border-2 border-[#00d2ff]"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                      }`}
                  >
                    <span className="text-2xl mb-2 block">{style.emoji}</span>
                    <p className="font-semibold text-white">{style.name}</p>
                    <p className="text-xs text-gray-400">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Tone - Celebrating diversity */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-bold text-white text-lg">Representation</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skinTones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`w-12 h-12 rounded-full transition-all touch-target ${selectedTone === tone.id
                        ? "ring-4 ring-white ring-offset-2 ring-offset-black scale-110"
                        : "hover:scale-105"
                      }`}
                    style={{ backgroundColor: tone.color }}
                    title={tone.name}
                    aria-label={tone.name}
                  />
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-[#10b981]" />
                <h3 className="font-bold text-white text-lg">Color Scheme</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => setSelectedScheme(scheme.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all touch-target ${selectedScheme === scheme.id
                        ? "bg-white/10 border-2 border-white/30 scale-105"
                        : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                      }`}
                  >
                    <div className="flex -space-x-1">
                      {scheme.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border-2 border-black/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-300 font-medium">{scheme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-5 bg-gradient-to-r from-[#00d2ff] via-[#10b981] to-[#d4af37] text-black font-bold text-lg rounded-xl hover:opacity-90 transition-all disabled:opacity-50 touch-target flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Creating Your {isHyperReal ? "Hyper-Real" : "Sovereign"} Identity...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Sovereign Avatar
                </>
              )}
            </button>

            {/* Voice customization teaser */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-800">
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00d2ff] transition-colors">
                <Mic className="w-4 h-4" />
                Add Voice
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00d2ff] transition-colors">
                <Volume2 className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
