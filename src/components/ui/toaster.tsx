'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      closeButton
      richColors
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#0A0F1C] group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-white/70',
          actionButton:
            'group-[.toast]:bg-[#C5A46E] group-[.toast]:text-[#0A0F1C] group-[.toast]:font-semibold',
          cancelButton:
            'group-[.toast]:bg-white/10 group-[.toast]:text-white',
          success:
            'group-[.toast]:border-emerald-500/30 group-[.toast]:bg-emerald-950/30',
          error:
            'group-[.toast]:border-red-500/30 group-[.toast]:bg-red-950/30',
          warning:
            'group-[.toast]:border-[#C5A46E]/30 group-[.toast]:bg-[#C5A46E]/10',
        },
      }}
    />
  );
}
