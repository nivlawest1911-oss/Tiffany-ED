'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shield, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050811] text-white/70 text-sm">
      {/* Top Accreditation & Standards Bar */}
      <div className="border-b border-white/5 bg-white/[0.01] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <Shield className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-semibold text-white text-xs uppercase tracking-wider">FERPA & COPPA</div>
              <div className="text-[11px] text-white/50">100% Student Privacy Compliant</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <Award className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-semibold text-white text-xs uppercase tracking-wider">ALCOS Aligned</div>
              <div className="text-[11px] text-white/50">Alabama Course of Study Standards</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-semibold text-white text-xs uppercase tracking-wider">Science of Reading</div>
              <div className="text-[11px] text-white/50">Phonemic & Decodable Scaffolding</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <Lock className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div>
              <div className="font-semibold text-white text-xs uppercase tracking-wider">LTI 1.3 Certified</div>
              <div className="text-[11px] text-white/50">Canvas, Clever & Google Classroom</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D3B] p-[1px]">
              <div className="w-full h-full bg-[#0A0F1C] rounded-[11px] flex items-center justify-center">
                <Image 
                  src="/images/edintel-logo.png" 
                  alt="EdIntel" 
                  width={24} 
                  height={24} 
                  className="object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              EDINTEL <span className="text-xs text-[#D4AF37]">SOVEREIGN</span>
            </span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed max-w-sm">
            The definitive AI operating system for K-12 school districts, educators, and leaders. Sovereign intelligence, neural delegation, and automated compliance.
          </p>
          <div className="pt-2 text-[11px] text-white/40 font-mono">
            Designed & Developed by Dr. Alvin West II
          </div>
        </div>

        {/* Link Column 1 */}
        <div>
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 text-[#D4AF37]">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Command Center</Link></li>
            <li><Link href="#features" className="hover:text-white transition-colors">Traceable AI Engine</Link></li>
            <li><Link href="#solutions" className="hover:text-white transition-colors">Multi-Tier Scaffolding</Link></li>
            <li><Link href="#demo" className="hover:text-white transition-colors">Interactive Demo</Link></li>
          </ul>
        </div>

        {/* Link Column 2 */}
        <div>
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 text-[#D4AF37]">Solutions</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="#solutions" className="hover:text-white transition-colors">K-12 District Leaders</Link></li>
            <li><Link href="#solutions" className="hover:text-white transition-colors">Literacy Specialists</Link></li>
            <li><Link href="#solutions" className="hover:text-white transition-colors">Instructional Coaches</Link></li>
            <li><Link href="#compliance" className="hover:text-white transition-colors">LTI 1.3 Canvas Integration</Link></li>
          </ul>
        </div>

        {/* Link Column 3 */}
        <div>
          <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 text-[#D4AF37]">Compliance & Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/ferpa" className="hover:text-white transition-colors">FERPA & COPPA Shield</Link></li>
            <li><Link href="/help" className="hover:text-white transition-colors">Help Center & Support</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} EdIntel Inc. All rights reserved. Sovereign AI for Education.
          </div>
          <div className="flex items-center gap-6">
            <span>Mobile County Public Schools Partner</span>
            <span>•</span>
            <span>Alabama Literacy Act Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
