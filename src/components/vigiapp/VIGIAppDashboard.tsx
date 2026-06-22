"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Thermometer, Battery, Wifi, AlertTriangle, Shield, 
  Activity, Zap, Radio, CheckCircle2, RefreshCw, X, Play, Clock,
  Cpu, Power, HelpCircle, AlertCircle, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  temp?: number;
  load?: number;
  battery?: number;
  fuel?: number;
  latency?: number;
  uptime: number;
}

// Sample mock infrastructure devices
const INITIAL_DEVICES: Device[] = [
  { id: "dev-01", name: "Main Server Rack A", type: "SERVER_RACK", location: "District Server Room 102", status: "normal", temp: 24, load: 45, uptime: 1820 },
  { id: "dev-02", name: "UPS Core Battery Backup", type: "UPS", location: "District Server Room 102", status: "normal", battery: 98, load: 38, uptime: 9500 },
  { id: "dev-03", name: "Backup Generator Diesel 1", type: "GENERATOR", location: "South Campus Plant", status: "normal", fuel: 82, load: 0, uptime: 120 },
  { id: "dev-04", name: "Industrial HVAC Server Cooling", type: "HVAC", location: "District Server Room 102 Roof", status: "normal", temp: 18, load: 60, uptime: 2400 },
  { id: "dev-05", name: "Telecom Uplink Fiber Node", type: "TELECOM_HUB", location: "Administration Building", status: "normal", latency: 4, load: 52, uptime: 11200 }
];

const INITIAL_ALERTS = [
  { id: "alt-01", deviceName: "Industrial HVAC Server Cooling", severity: "warning", message: "HVAC condenser fan speed variance detected. Monitoring threshold limits.", timestamp: "2026-05-30 08:34:10" },
  { id: "alt-02", deviceName: "Backup Generator Diesel 1", severity: "critical", message: "Fuel level threshold breach: Diesel fuel reserve drops under 25%. Refill scheduled.", timestamp: "2026-05-30 08:02:15" }
];

export function VIGIAppDashboard() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [alerts, setAlerts] = useState<any[]>(INITIAL_ALERTS);
  const [overallHealth, setOverallHealth] = useState(94);
  const [isSimulatingHeartbeat, setIsSimulatingHeartbeat] = useState(false);
  const [activeTab, setActiveTab] = useState("topology");

  // Telemetry simulator loop
  useEffect(() => {
    const timer = setInterval(() => {
      // Micro fluctuation
      setDevices(prev => prev.map(device => {
        if (device.status !== "normal") return device;
        
        let update: any = { ...device };
        if (device.temp !== undefined) update.temp = Math.max(15, Math.min(45, device.temp + (Math.random() > 0.5 ? 1 : -1)));
        if (device.load !== undefined) update.load = Math.max(10, Math.min(95, device.load + (Math.random() > 0.5 ? 2 : -2)));
        if (device.battery !== undefined) update.battery = Math.max(0, Math.min(100, device.battery - (Math.random() > 0.8 ? 1 : 0)));
        if (device.latency !== undefined) update.latency = Math.max(2, Math.min(20, device.latency + (Math.random() > 0.5 ? 1 : -1)));
        return update;
      }));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Simulates a heartbeat incoming trigger
  const handleTestTelemetry = async () => {
    setIsSimulatingHeartbeat(true);
    await new Promise(r => setTimeout(r, 1200));
    
    // Set HVAC to critical overheating
    setDevices(prev => prev.map(dev => {
      if (dev.id === "dev-04") {
        return { ...dev, status: "critical", temp: 44, load: 95 };
      }
      return dev;
    }));

    const newAlert = {
      id: `alt-${Date.now()}`,
      deviceName: "Industrial HVAC Server Cooling",
      severity: "critical",
      message: "OVERHEAT EMERGENCY: Compressor shutoff. Temperature critical: 44°C",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setAlerts(prev => [newAlert, ...prev]);
    setOverallHealth(76);
    setIsSimulatingHeartbeat(false);
    toast.error("VIGIApp Critical Overheat Alert Triggered!", {
      description: "HVAC Compressor unit flagged. Temperature critical: 44°C"
    });
  };

  // Simulates technicians resolving alerts
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alt => alt.id !== id));
    toast.success("Alert acknowledged & technician dispatched.");
    
    // Reset HVAC status back to normal if all alerts cleared
    if (alerts.length <= 1) {
      setDevices(prev => prev.map(dev => {
        if (dev.id === "dev-04") return { ...dev, status: "normal", temp: 18, load: 60 };
        if (dev.id === "dev-03") return { ...dev, status: "normal", fuel: 82, load: 0 };
        return dev;
      }));
      setOverallHealth(100);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#06060a] text-zinc-100 p-6 relative overflow-hidden font-mono select-none">
      
      {/* Scanline CRT overlay + Tech Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-15" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:25px_25px]" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-cyan-500/5" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-cyan-500/5" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-cyan-500/5" />
        <div className="absolute top-20 left-0 w-full h-[1px] bg-cyan-500/5" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-cyan-500/5" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 space-y-6">
        
        {/* Superior NOC Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Badge className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-mono tracking-widest uppercase py-0.5 text-[9px]">
                NOC Operational Security
              </Badge>
              <span className="text-[10px] text-zinc-600 font-mono pl-3 border-l border-white/10">TELEMETRY UPLINK STATUS: SECURE</span>
            </div>
            <h1 className="text-2xl font-black tracking-widest text-white mt-1.5 uppercase">
              VIGIApp <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-amber-300 bg-clip-text text-transparent">Infrastructure Monitor</span>
            </h1>
            <p className="text-zinc-500 text-[10px] mt-1 max-w-2xl font-mono">
              Military-grade facility surveillance. Monitor district UPS capacities, generator diesel levels, server room core ambient temperatures, and network latency nodes in real time.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button 
              onClick={handleTestTelemetry}
              disabled={isSimulatingHeartbeat}
              className="bg-zinc-950 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 font-black text-xs py-5 px-5 flex items-center gap-2 tracking-widest"
            >
              {isSimulatingHeartbeat ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4 animate-pulse" />}
              <span>SIMULATE CRITICAL Breaches</span>
            </Button>
          </div>
        </div>

        {/* Diagnostic NOC stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/60 border-white/5 p-4 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block font-mono">FACILITY INTEGRITY</span>
              <span className={cn(
                "text-2xl font-black block mt-1",
                overallHealth > 85 ? "text-cyan-400" : "text-rose-500 animate-pulse"
              )}>{overallHealth}% Health</span>
              <span className="text-[9px] text-zinc-600">Active Mobile County Nodes</span>
            </div>
            <Shield className="w-8 h-8 text-cyan-500/20" />
          </Card>
          <Card className="bg-black/60 border-white/5 p-4 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block font-mono">MONITORED HARDWARE</span>
              <span className="text-2xl font-black text-white block mt-1">{devices.length} Nodes</span>
              <span className="text-[9px] text-zinc-600">Telemetry Heartbeat Active</span>
            </div>
            <Server className="w-8 h-8 text-cyan-500/20" />
          </Card>
          <Card className="bg-black/60 border-white/5 p-4 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block font-mono">ACTIVE ALARMS</span>
              <span className={cn(
                "text-2xl font-black block mt-1",
                alerts.length > 0 ? "text-rose-500" : "text-emerald-400"
              )}>{alerts.length} Breaches</span>
              <span className="text-[9px] text-rose-400/80">Requires dispatch logs</span>
            </div>
            <AlertTriangle className="w-8 h-8 text-rose-500/30" />
          </Card>
          <Card className="bg-black/60 border-white/5 p-4 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block font-mono">TECH NETWORK HUB</span>
              <span className="text-2xl font-black text-emerald-400 block mt-1">4.0 ms Latency</span>
              <span className="text-[9px] text-emerald-400/80">ASA Fiber Connection Secure</span>
            </div>
            <Wifi className="w-8 h-8 text-emerald-500/20" />
          </Card>
        </div>

        {/* Dashboard Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* NOC Device status table (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-black/60 border-white/10 backdrop-blur-xl">
              <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase text-zinc-300">FACILITY DEVICES TELEMETRY LOGGER</CardTitle>
                </div>
                <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/30 text-[9px] uppercase font-mono">LIVE FEED</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/5 bg-zinc-950/40 text-[9px] font-black text-zinc-500 uppercase tracking-widest font-mono">
                        <th className="p-4">Monitor Target</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Core Metrics</th>
                        <th className="p-4">Uptime Index</th>
                        <th className="p-4">Alert Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300 font-medium font-mono">
                      {devices.map(dev => (
                        <tr key={dev.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <span className={cn(
                                "h-2 w-2 rounded-full animate-pulse shrink-0",
                                dev.status === 'normal' && "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]",
                                dev.status === 'warning' && "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
                                dev.status === 'critical' && "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                              )} />
                              <div>
                                <span className="font-bold text-zinc-200 block">{dev.name}</span>
                                <span className="text-[9px] text-zinc-500 uppercase">{dev.type}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-zinc-500 uppercase text-[10px]">{dev.location}</td>
                          <td className="p-4">
                            {dev.type === 'SERVER_RACK' && (
                              <div className="flex items-center gap-2.5">
                                <Thermometer className="w-4 h-4 text-cyan-400" />
                                <span>{dev.temp}°C</span>
                                <span className="text-zinc-500">|</span>
                                <Activity className="w-4 h-4 text-cyan-400" />
                                <span>{dev.load}% Load</span>
                              </div>
                            )}
                            {dev.type === 'UPS' && (
                              <div className="flex items-center gap-2.5">
                                <Battery className="w-4 h-4 text-cyan-400" />
                                <span>{dev.battery}% Battery</span>
                                <span className="text-zinc-500">|</span>
                                <Activity className="w-4 h-4 text-cyan-400" />
                                <span>{dev.load}% load</span>
                              </div>
                            )}
                            {dev.type === 'GENERATOR' && (
                              <div className="flex items-center gap-2.5">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span>Diesel: {dev.fuel}%</span>
                              </div>
                            )}
                            {dev.type === 'HVAC' && (
                              <div className="flex items-center gap-2.5">
                                <Thermometer className="w-4 h-4 text-cyan-400" />
                                <span className={cn(dev.temp !== undefined && dev.temp > 35 && "text-rose-500 font-bold")}>{dev.temp}°C Airflow</span>
                              </div>
                            )}
                            {dev.type === 'TELECOM_HUB' && (
                              <div className="flex items-center gap-2.5">
                                <Wifi className="w-4 h-4 text-cyan-400" />
                                <span>{dev.latency}ms ping</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4 font-mono text-zinc-500">{dev.uptime} hrs</td>
                          <td className="p-4">
                            <Badge className={cn(
                              "font-mono text-[9px] uppercase",
                              dev.status === 'normal' && "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
                              dev.status === 'warning' && "bg-amber-500/10 border-amber-500/20 text-amber-400",
                              dev.status === 'critical' && "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            )}>
                              {dev.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Topology Flow Chart Visual */}
            <Card className="bg-black/60 border-white/10 p-5">
              <CardHeader className="p-0 pb-3 border-b border-white/5">
                <CardTitle className="text-sm font-bold uppercase text-zinc-300">FACILITY POWER POWER GRID TOPOLOGY</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-10 py-4 max-w-3xl mx-auto relative">
                  
                  {/* Connective links */}
                  <div className="absolute top-[50%] left-[20%] right-[20%] h-0.5 bg-dashed border-t border-cyan-500/20 pointer-events-none hidden md:block" />

                  {/* Node 1: Generator */}
                  <div className="flex flex-col items-center space-y-2 z-10">
                    <div className="h-14 w-14 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-zinc-200 block uppercase">Diesel Generator</span>
                      <span className="text-[9px] text-zinc-500 font-mono">STANDBY (82% fuel)</span>
                    </div>
                  </div>

                  {/* Node 2: UPS Backup */}
                  <div className="flex flex-col items-center space-y-2 z-10">
                    <div className="h-14 w-14 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
                      <Battery className="w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-zinc-200 block uppercase">Core UPS</span>
                      <span className="text-[9px] text-zinc-500 font-mono">ONLINE (98% batt)</span>
                    </div>
                  </div>

                  {/* Node 3: Server Core */}
                  <div className="flex flex-col items-center space-y-2 z-10">
                    <div className="h-14 w-14 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                      <Server className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-zinc-200 block uppercase">Main Servers</span>
                      <span className="text-[9px] text-zinc-500 font-mono">NORMAL (24°C)</span>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>

          </div>

          {/* NOC Active Alarm Scrolling Feed (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-black/60 border-white/10 backdrop-blur-xl min-h-[400px] flex flex-col justify-between p-5">
              
              <div className="space-y-4">
                <div className="border-b border-white/5 pb-2.5 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">ACTIVE SYSTEM ALARMS</h4>
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                </div>
                
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  <AnimatePresence mode="popLayout">
                    {alerts.map(alt => (
                      <motion.div 
                        key={alt.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={cn(
                          "p-3 rounded border text-[11px] leading-relaxed relative group transition-all",
                          alt.severity === 'critical' 
                            ? "bg-rose-500/5 border-rose-500/20 text-rose-300 hover:border-rose-500/40" 
                            : "bg-amber-500/5 border-amber-500/20 text-amber-300 hover:border-amber-500/40"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-white block uppercase tracking-wider text-[9px] font-mono">{alt.deviceName}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleAcknowledgeAlert(alt.id)}
                            className="text-zinc-500 hover:text-white p-0 h-4 w-4 shrink-0 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="mt-1 text-zinc-400 font-mono">{alt.message}</p>
                        <div className="mt-2.5 pt-1.5 border-t border-white/5 flex justify-between items-center text-[8px] text-zinc-500 font-mono">
                          <span>DATE: {alt.timestamp}</span>
                          <span className={cn(
                            "font-bold uppercase tracking-widest",
                            alt.severity === 'critical' ? "text-rose-500 animate-pulse" : "text-amber-500"
                          )}>{alt.severity}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {alerts.length === 0 && (
                    <div className="py-16 text-center text-zinc-600 flex flex-col items-center gap-2">
                      <ShieldCheck className="w-8 h-8 text-zinc-700 animate-bounce" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">NO BREACHES DETECTED</span>
                      <p className="text-[9px] text-zinc-600 leading-relaxed max-w-[160px] mx-auto">All county database infrastructures are performing within acceptable parameters.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-zinc-950 border border-white/5 p-3 rounded text-[10px] text-zinc-500 leading-normal mt-4 font-mono">
                <span className="text-zinc-400 font-bold uppercase text-[9px] block mb-0.5">NOC RESILIENCE COMPLIANCE CERT</span>
                VIGIApp verifies facility cooling, automatic power bypass routing, and cybersecurity logs recursively every 30 seconds.
              </div>

            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
export const vigiAppDashboard = VIGIAppDashboard;
