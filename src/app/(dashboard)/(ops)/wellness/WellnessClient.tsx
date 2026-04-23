// src/app/(dashboard)/(ops)/wellness/WellnessClient.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { subscribeToBiometrics, type BiometricData } from "@/lib/wearable-service";

const BiometricVisualizer = dynamic(() => import("@/components/wellness/BiometricVisualizer"), {
  ssr: false,
  loading: () => <div className="h-[220px] bg-zinc-900/50 rounded-3xl animate-pulse flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest">Initialising Neural Link...</div>
});

const BurnoutShield = dynamic(() => import("@/components/wellness/BurnoutShield"), {
  ssr: false,
  loading: () => <div className="h-[120px] bg-zinc-900/50 rounded-3xl animate-pulse mt-8" />
});

const ProtocolOutput = dynamic(() => import("@/components/wellness/ProtocolOutput"), {
  ssr: false
});

export default function WellnessClient() {
  const [biometrics, setBiometrics] = useState<BiometricData>({
    currentHR: 72,
    currentStressIndex: 42,
    currentHRV: 68,
  });
  const [protocolResult, setProtocolResult] = useState<string | null>(null);

  // Real-time biometric uplink
  useEffect(() => {
    const unsubscribe = subscribeToBiometrics((data) => {
      setBiometrics(data);
    });

    return unsubscribe;
  }, []);

  const handleProtocolComplete = (result: string) => {
    setProtocolResult(result);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-baseline mb-10 text-left">
          <h1 className="text-5xl font-mono tracking-[0.4em] uppercase text-left">TRANSCEND</h1>
          <div className="text-teal-400 text-sm font-mono tracking-widest text-right">LIVE NEURAL UPLINK • ACTIVE</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BiometricVisualizer biometrics={biometrics} isSimulated={true} />
          <BurnoutShield biometrics={biometrics} onProtocolComplete={handleProtocolComplete} />
        </div>

        {protocolResult && <ProtocolOutput result={protocolResult} />}
      </motion.div>
    </div>
  );
}
