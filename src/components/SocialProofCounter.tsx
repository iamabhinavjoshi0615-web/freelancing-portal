"use client";

import React, { useState, useEffect } from "react";
import { Users, ShieldCheck, TrendingUp, Lock } from "lucide-react";

interface SocialProofCounterProps {
  initialUnlocksCount?: number;
}

export default function SocialProofCounter({ initialUnlocksCount = 0 }: SocialProofCounterProps) {
  const baseCount = 1240;
  const totalCount = baseCount + initialUnlocksCount;

  const tickerItems = [
    { city: "Mumbai", topic: "Facebook & Meta Ads Blueprint", time: "2 mins ago" },
    { city: "Delhi NCR", topic: "Complete Bundle (4 Guides)", time: "7 mins ago" },
    { city: "Bengaluru", topic: "Website Building & Hosting Guide", time: "14 mins ago" },
    { city: "Ahmedabad", topic: "Website Types & Pricing Handbook", time: "21 mins ago" },
    { city: "Ludhiana", topic: "Ad Campaign Charges Breakdown", time: "32 mins ago" },
    { city: "Pune", topic: "Complete Bundle (4 Guides)", time: "45 mins ago" },
    { city: "Hyderabad", topic: "Google Ads Keyword Setup Guide", time: "1 hour ago" },
  ];

  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  const activeTicker = tickerItems[tickerIndex];

  return (
    <div className="w-full bg-gradient-to-r from-blue-900/90 via-indigo-950 to-zinc-950 text-white border-y border-blue-800/40 py-8 px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Main Live Counter */}
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {totalCount.toLocaleString("en-IN")}+
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Live Impact
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium mt-0.5">
              Indian SMB owners & entrepreneurs guided by our blueprints
            </p>
          </div>
        </div>

        {/* Recent Activity Ticker */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 flex items-center gap-3 w-full md:w-auto max-w-md shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
          <div className="text-xs space-y-0.5 overflow-hidden">
            <div className="font-bold text-zinc-200 flex items-center justify-between gap-3">
              <span>Someone from {activeTicker.city}</span>
              <span className="text-[10px] text-zinc-400 font-normal">{activeTicker.time}</span>
            </div>
            <p className="text-emerald-300 font-medium truncate">
              Unlocked: {activeTicker.topic}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
