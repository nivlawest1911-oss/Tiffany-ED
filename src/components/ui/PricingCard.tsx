"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onSelect: () => void;
  currencySymbol?: string;
}

export function PricingCard({
  title,
  price,
  period = "/month",
  description,
  features,
  isPopular = false,
  ctaText,
  onSelect,
  currencySymbol = "$",
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between",
        "bg-slate-900/80 backdrop-blur-xl border border-slate-800/80",
        isPopular && "border-amber-500/40 shadow-lg shadow-amber-500/10"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MOST POPULAR</span>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-amber-400">
            {currencySymbol}
            {price}
          </span>
          {period && <span className="text-xs text-slate-400">{period}</span>}
        </div>

        <ul className="mt-6 space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onSelect}
        className={cn(
          "mt-8 w-full font-semibold transition-all duration-200",
          isPopular
            ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
            : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
        )}
      >
        {ctaText}
      </Button>
    </div>
  );
}
