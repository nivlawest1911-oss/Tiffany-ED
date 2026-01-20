"use client"

import { Facebook, Youtube, Linkedin, Instagram, Twitter, Mail, MapPin } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/alvin.west.18", color: "#1877f2" },
  { name: "TikTok", icon: TikTokIcon, url: "https://www.tiktok.com/@alvinwestii", color: "#000000" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/dr-alvin-west-ii-dba-pd-m-58133519/",
    color: "#0a66c2",
  },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@EdIntel", color: "#ff0000" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/edintel_professional/", color: "#e4405f" },
  { name: "Twitter/X", icon: Twitter, url: "https://twitter.com/EdIntelAI", color: "#1da1f2" },
]

const quickLinks = [
  { name: "Command", href: "#" },
  { name: "Avatar Lab", href: "#avatar-lab" },
  { name: "Strategic Sync", href: "#neural-sync" },
  { name: "Professional Labs", href: "#innovation-labs" },
  { name: "Professional Pricing", href: "#pricing" },
  { name: "Support Protocol", href: "#support" },
]

export function GlobalPresence() {
  return (
    <footer className="px-4 md:px-8 py-16 border-t border-gray-800 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d2ff] to-[#10b981] flex items-center justify-center">
                <span className="text-xl font-black text-black">E</span>
              </div>
              <div>
                <h3 className="font-black tracking-tighter text-2xl text-white">EdIntel Professional</h3>
                <p className="text-xs text-gray-400">Administrative Intelligence v4.0.2</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering Alabama educators with AI-powered tools for IEP creation, compliance management, and
              administrative excellence. Built for Mobile County Public Schools and the state of Alabama.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00d2ff]" />
                <a href="mailto:support@edintel.ai" className="hover:text-white transition-colors">
                  support@edintel.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00d2ff]" />
                <span>Mobile, Alabama</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-[#00d2ff] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00d2ff] transition-colors text-sm">
                  Alabama Achieves
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00d2ff] transition-colors text-sm">
                  MCPSS Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00d2ff] transition-colors text-sm">
                  Legal Vault
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00d2ff] transition-colors text-sm">
                  Research Hub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#00d2ff] transition-colors text-sm">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-gray-800">
          <div className="text-center md:text-left">
            <h4 className="font-black tracking-tighter text-xl text-white mb-2">Global Presence</h4>
            <a href="#pricing" className="text-sm text-[#00d2ff] hover:underline">
              Sales Protocol →
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d2ff]/30 hover:bg-[#00d2ff]/10 transition-all touch-target"
                  title={social.name}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <div className="flex justify-center mb-6">
            {/* Holographic diamond logo */}
            <div className="relative">
              <div className="w-10 h-10 rotate-45 bg-gradient-to-br from-[#00d2ff] to-[#10b981] opacity-50" />
              <div className="absolute inset-0 w-10 h-10 rotate-45 bg-gradient-to-br from-[#10b981] to-[#d4af37] animate-pulse opacity-30" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              FERPA Compliance
            </a>
          </div>

          <p className="text-xs text-gray-600 tracking-widest">
            © 2025 EdIntel Professional. All rights reserved. Made with ♥ in Mobile, Alabama.
          </p>
        </div>
      </div>
    </footer>
  )
}
