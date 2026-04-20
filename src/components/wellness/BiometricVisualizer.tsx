'use client';

import { useRef, useEffect } from "react";
import { Activity } from "lucide-react";

interface Props {
  isSimulated: boolean;
  biometrics: { currentHR: number; currentStressIndex: number; currentHRV: number };
}

export default function BiometricVisualizer({ isSimulated: _isSimulated, biometrics }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use higher resolution for sharper rendering
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const width = 720;
    const height = 220;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let phase = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Waveform
      const color = biometrics.currentStressIndex > 70 ? "#f43f5e" : "#22d3ee";
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;

      ctx.beginPath();
      for (let i = 0; i < 120; i++) {
        const x = (i / 120) * width;
        const noise = Math.sin(phase + i * 0.15) * (biometrics.currentStressIndex / 8);
        const y = height / 2 + noise;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.12;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [biometrics]);

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-left">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-teal-400" />
          <span className="font-mono tracking-[0.4em] text-lg uppercase text-left">LIVE BIOMETRICS</span>
        </div>
        <div className="text-teal-400 font-mono text-sm">HR: {biometrics.currentHR} bpm</div>
      </div>
      <div className="relative w-full h-[220px]">
        <canvas ref={canvasRef} className="w-full h-full rounded-2xl" style={{ width: '100%', height: '220px' }} />
      </div>
    </div>
  );
}
