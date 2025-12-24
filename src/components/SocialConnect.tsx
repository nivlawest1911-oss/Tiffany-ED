'use client';
import { Twitter, Linkedin, Share2 } from 'lucide-react';

export default function SocialConnect() {
  return (
    <div className="flex items-center space-x-4 p-4 bg-[#111] rounded-2xl border border-[#222]">
      <span className="text-sm text-gray-400">Share Neural Win:</span>
      <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
      <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-700" />
      <Share2 className="w-5 h-5 cursor-pointer hover:text-green-400" />
    </div>
  );
}
