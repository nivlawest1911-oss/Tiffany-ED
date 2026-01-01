'use client';
import { useState, useEffect } from 'react';
import CircadianFilter from '@/components/graphics/CircadianFilter';
import AidePanel from '@/components/ui/AidePanel';
import AdminDirectory from '@/components/ui/AdminDirectory';
import LeadershipGenerator from '@/components/bento/LeadershipGenerator';
import PersonnelPulse from '@/components/ui/PersonnelPulse';
import EfficiencyPulse from '@/components/ui/EfficiencyPulse';
import SystemHealthTile from '@/components/bento/SystemHealthTile';
import ArchitectIdentityNode from '@/components/bento/ArchitectIdentityNode';
import ROISingularityHeader from '@/components/bento/ROISingularityHeader';
import ExecutiveDashboard from '@/components/bento/ExecutiveDashboard';
import AvatarLaboratory from '@/components/bento/AvatarLaboratory';
import NeuralSyncGym from '@/components/bento/NeuralSyncGym';
import LegalSingularityVault from '@/components/bento/LegalSingularityVault';
import AutomatedIEPAudit from '@/components/bento/AutomatedIEPAudit';
import IEPGenerator from '@/components/bento/IEPGenerator';
import LessonPlanGenerator from '@/components/bento/LessonPlanGenerator';
import EQGenerator from '@/components/bento/EQGenerator';
import DelegateOverlay from '@/components/ui/DelegateOverlay';
import AvatarMasterclass from '@/components/bento/AvatarMasterclass';
import SocialLinks from '@/components/ui/SocialLinks';
import PricingMatrix from '@/components/bento/PricingMatrix';
import NeuralTrainingCommand from '@/components/bento/NeuralTrainingCommand';
import SovereignPrivacyManifesto from '@/components/bento/SovereignPrivacyManifesto';
import SovereignAgreement from '@/components/bento/SovereignAgreement';
import Support from '@/app/support/page';
import Blog from '@/app/blog/page';
import WhatsEdIntel from '@/app/whats-cognifit/page';
import SovereignFeed from '@/components/bento/SovereignFeed';
import SovereignRankGuide from '@/components/bento/SovereignRankGuide';
import SovereignIDManager from '@/components/bento/SovereignIDManager';
import SovereignSkillMatrix from '@/components/bento/SovereignSkillMatrix';
import SovereignSocialUplink from '@/components/bento/SovereignSocialUplink';
import SovereignEnterpriseModule from '@/components/bento/SovereignEnterpriseModule';
import SovereignBroadcastNode from '@/components/bento/SovereignBroadcastNode';

import { Brain, Users, Shield } from 'lucide-react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [panel, setPanel] = useState<{ open: boolean, mode: 'aide' | 'iep' }>({ open: false, mode: 'aide' });
  const [activeTab, setActiveTab] = useState<'command' | 'avatar' | 'neural' | 'labs' | 'roi' | 'blog' | 'whats' | 'support' | 'feed' | 'identity'>('command');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-zinc-50 dark:bg-black" />;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500 pb-20 overflow-x-hidden">
      <CircadianFilter />
      <DelegateOverlay />
      <AidePanel
        isOpen={panel.open}
        mode={panel.mode}
        onClose={() => setPanel({ ...panel, open: false })}
      />

      <div className="max-w-[1800px] mx-auto px-6 pt-12">
        {/* Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600/20 blur-xl group-hover:bg-blue-600/40 transition-all rounded-full" />
              <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl relative z-10 transition-transform group-hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img src="/images/edintel-logo.png" alt="EdIntel Logo" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <div className="h-12 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
                  <Shield className="text-white" size={12} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Sovereign Matrix</span>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic leading-none">
                EdIntel <span className="text-blue-600">Sovereign</span>
              </h1>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mt-2">Director Command Node // v4.0.2</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('command')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'command' ? 'bg-zinc-900 dark:bg-white text-white dark:text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Command
            </button>
            <button
              onClick={() => setActiveTab('avatar')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'avatar' ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Avatar Lab
            </button>
            <button
              onClick={() => setActiveTab('neural')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'neural' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Neural Sync
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'labs' ? 'bg-amber-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Sovereign Labs
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'roi' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Sovereign ROI
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'feed' ? 'bg-amber-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Network Feed
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'support' ? 'bg-amber-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              Support Protocol
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === 'command' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              <div className="lg:col-span-8 space-y-8">
                <ROISingularityHeader />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <LeadershipGenerator />
                  <ExecutiveDashboard />
                </div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <ArchitectIdentityNode />
                <SystemHealthTile />
                <div className="grid grid-cols-2 gap-4">
                  <EfficiencyPulse />
                  <PersonnelPulse />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              <div className="lg:col-span-8">
                <LegalSingularityVault />
              </div>
              <div className="lg:col-span-4 space-y-8">
                <AdminDirectory />
                <PersonnelPulse />
              </div>
            </div>
          </>
        )}

        {activeTab === 'labs' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none opacity-20 border border-zinc-200 dark:border-zinc-800">
              <img src="/images/labs-bg.jpg" className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 dark:from-black/90 to-transparent" />
            </div>

            <div className="relative z-10 px-8 pt-8">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic mb-8">Sovereign <span className="text-blue-600">Research & Design</span></h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LessonPlanGenerator />
                <EQGenerator />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <IEPGenerator />
                <AutomatedIEPAudit />
              </div>
              <div className="grid grid-cols-1 gap-8 mt-8">
                <SovereignPrivacyManifesto />
                <SovereignAgreement />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <PricingMatrix />
          </div>
        )}

        {activeTab === 'avatar' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AvatarLaboratory />
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-xl font-bold mb-4">Active Delegates</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="font-semibold">IEP Processing Bot</p>
                            <p className="text-xs text-zinc-500">Administrator</p>
                          </div>
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400">● Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-bold mb-2">Time Saved This Week</h3>
                  <p className="text-4xl font-black text-purple-600 dark:text-purple-400">47.3 hrs</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Across 12 educators</p>
                </div>
              </div>
              <SovereignRankGuide />
            </div>
            <AvatarMasterclass />
          </div>
        )}

        {activeTab === 'neural' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <NeuralSyncGym />
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Impact Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Reading Speed</span>
                      <span className="font-bold text-cyan-600">+67%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: '67%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Suspension Reduction</span>
                      <span className="font-bold text-green-600">-89%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '89%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Impulse Control</span>
                      <span className="font-bold text-blue-600">+42%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '42%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800">
                <h3 className="text-lg font-bold mb-2">Students Engaged</h3>
                <p className="text-4xl font-black text-cyan-600 dark:text-cyan-400">1,247</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">This semester</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Support />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Blog />
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SovereignFeed />
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SovereignIDManager />
            <SovereignSocialUplink />
            <SovereignBroadcastNode />
            <SovereignEnterpriseModule />
            <SovereignSkillMatrix />
          </div>
        )}

        {activeTab === 'whats' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <WhatsEdIntel />
          </div>
        )}

        <SocialLinks />
      </div>
    </main >
  );
}