'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Menu, 
  X, 
  ChevronRight, 
  LayoutDashboard,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#C5A46E] to-[#8C6D3B] p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0A0F1C] rounded-[11px] flex items-center justify-center overflow-hidden">
              <Image 
                src="/images/edintel-logo.png" 
                alt="EdIntel" 
                width={28} 
                height={28} 
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Sparkles className="w-5 h-5 text-[#D4AF37] hidden group-hover:block transition-all" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              EDINTEL <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold tracking-wider">SOVEREIGN</span>
            </span>
            <span className="text-[10px] tracking-[2px] text-white/50 font-mono uppercase">AI Operating System for Education</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="#features" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span>Features</span>
          </Link>
          <Link href="#solutions" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <span>Solutions</span>
          </Link>
          <Link href="#compliance" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]/80" />
            <span>FERPA Compliance</span>
          </Link>
          <Link href="#demo" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-[#D4AF37]/80" />
            <span>Science of Reading</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoading && user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#C5A46E] hover:from-[#C5A46E] hover:to-[#A67C52] text-[#0A0F1C] font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <button 
                onClick={() => logout()}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-[#D4AF37] to-[#C5A46E] hover:from-[#C5A46E] hover:to-[#A67C52] text-[#0A0F1C] font-bold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2 group">
                  <span>Request Demo</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-white/80 hover:text-white bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0A0F1C]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#D4AF37] py-2 text-base font-medium border-b border-white/5"
            >
              Features
            </Link>
            <Link 
              href="#solutions" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#D4AF37] py-2 text-base font-medium border-b border-white/5"
            >
              Solutions
            </Link>
            <Link 
              href="#compliance" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#D4AF37] py-2 text-base font-medium border-b border-white/5"
            >
              FERPA Compliance
            </Link>
            <Link 
              href="#demo" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/80 hover:text-[#D4AF37] py-2 text-base font-medium border-b border-white/5"
            >
              Interactive AI Demo
            </Link>
          </nav>
          <div className="pt-4 flex flex-col gap-3">
            {!isLoading && user ? (
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#D4AF37] text-[#0A0F1C] font-bold py-3 rounded-xl">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#D4AF37] text-[#0A0F1C] font-bold py-3 rounded-xl">
                    Request a Demo
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-white/20 text-white py-3 rounded-xl">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
