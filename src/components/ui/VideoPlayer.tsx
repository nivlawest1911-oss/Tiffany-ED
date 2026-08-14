"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  onTelemetryUpdate?: (metrics: { currentTime: number; duration: number; engagementScore: number }) => void;
}

export function VideoPlayer({ src, poster, title, onTelemetryUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    const pct = (current / total) * 100;
    setProgress(pct);

    // Engagement telemetry hook for automated media pruning evaluation
    if (onTelemetryUpdate) {
      const engagementScore = current > 10 ? pct / 100 : 0.1;
      onTelemetryUpdate({ currentTime: current, duration: total, engagementScore });
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group min-h-[300px]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full object-cover"
      />

      {/* Contextual Native Ad / Sovereign Sponsorship Overlay */}
      <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-slate-200">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-medium">{title || "Sovereign Executive Briefing"}</span>
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex flex-col gap-2">
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden cursor-pointer">
          <div className="bg-amber-400 h-full transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-slate-200 hover:text-amber-400 hover:bg-slate-900"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-slate-200 hover:text-amber-400 hover:bg-slate-900"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>
          <span className="text-xs font-mono text-slate-400">EdIntel Sovereign Stream</span>
        </div>
      </div>
    </div>
  );
}
