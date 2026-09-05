"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Layers,
  PhoneCall,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { CalculatedEstimate } from "../lib/quizConfig";

interface PersonalizedActionPlanCardProps {
  sessionId?: string | null;
  estimate?: CalculatedEstimate | null;
}

export default function PersonalizedActionPlanCard({
  sessionId,
  estimate: initialEstimate,
}: PersonalizedActionPlanCardProps) {
  const [estimate, setEstimate] = useState<CalculatedEstimate | null>(initialEstimate || null);
  const [loading, setLoading] = useState<boolean>(!initialEstimate && !!sessionId);

  useEffect(() => {
    if (!initialEstimate && sessionId) {
      async function fetchQuizData() {
        try {
          const res = await fetch(`/api/quiz?sessionId=${encodeURIComponent(sessionId!)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.response?.estimateData) {
              setEstimate(data.response.estimateData);
            }
          }
        } catch (e) {
          console.error("Failed to fetch quiz estimate for session:", e);
        } finally {
          setLoading(false);
        }
      }
      fetchQuizData();
    }
  }, [sessionId, initialEstimate]);

  if (loading) {
    return (
      <div className="p-8 bg-zinc-900 text-white rounded-3xl border border-zinc-800 text-center space-y-3">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-zinc-400">Loading your personalized action plan...</p>
      </div>
    );
  }

  if (!estimate) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl space-y-8 my-8 print:my-4 print:p-6 print:bg-white print:text-zinc-900 print:border-zinc-300">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 print:border-zinc-300 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 print:text-emerald-700">
            Unlocked Paid Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 text-white print:text-zinc-900">
            Personalized Action Plan & Recommendation
          </h2>
        </div>
        <div className="text-right sm:text-right">
          <span className="text-xs text-zinc-400 print:text-zinc-600 block font-medium">Single Target Tier</span>
          <span className="text-2xl font-black text-emerald-400 print:text-emerald-700">
            {estimate.exactRecommendedPackage.priceFormatted}
          </span>
        </div>
      </div>

      {/* 1. EXACT RECOMMENDED PACKAGE (Single Number/Tier, not a range) */}
      <div className="bg-white/5 print:bg-zinc-50 border border-white/10 print:border-zinc-200 rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 print:text-emerald-700 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            Exact Recommended Package Tier
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            Single Target Number
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h3 className="text-xl font-bold text-white print:text-zinc-900">
              {estimate.exactRecommendedPackage.packageName}
            </h3>
            <p className="text-xs text-zinc-400 print:text-zinc-600 mt-1">
              Calculated based on your specific monthly budget allocation answer.
            </p>
          </div>
          <div className="text-3xl font-black text-emerald-300 print:text-emerald-700 shrink-0">
            {estimate.exactRecommendedPackage.priceFormatted}
          </div>
        </div>
      </div>

      {/* 2. RECOMMENDED PLATFORMS & TOOLS */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white print:text-zinc-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          Recommended Tech Stack & Vendor Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/5 print:bg-zinc-50 border border-white/10 print:border-zinc-200 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-blue-300 print:text-blue-700 tracking-wider block">Recommended CMS / Code</span>
            <p className="font-bold text-white print:text-zinc-900 text-sm">{estimate.recommendedStack.platform}</p>
          </div>
          <div className="bg-white/5 print:bg-zinc-50 border border-white/10 print:border-zinc-200 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-indigo-300 print:text-indigo-700 tracking-wider block">Domain & Hosting Vendor</span>
            <p className="font-bold text-white print:text-zinc-900 text-sm">{estimate.recommendedStack.domainHosting}</p>
          </div>
          <div className="bg-white/5 print:bg-zinc-50 border border-white/10 print:border-zinc-200 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-300 print:text-emerald-700 tracking-wider block">Payment & Analytics</span>
            <p className="font-bold text-white print:text-zinc-900 text-sm">{estimate.recommendedStack.analyticsPayment}</p>
          </div>
        </div>
      </div>

      {/* 3. STEP-BY-STEP TIMELINE */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white print:text-zinc-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          Step-by-Step Implementation Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {estimate.timelineSchedule.map((t, idx) => (
            <div key={idx} className="bg-white/5 print:bg-zinc-50 border border-white/10 print:border-zinc-200 p-5 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-emerald-400 print:text-emerald-700">{t.phase}</span>
                <span className="text-[10px] bg-zinc-800 print:bg-zinc-200 text-zinc-300 print:text-zinc-700 px-2 py-0.5 rounded font-semibold">{t.duration}</span>
              </div>
              <p className="text-xs text-zinc-300 print:text-zinc-700 leading-relaxed pt-1">{t.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PERSONALIZED CHECKLIST */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white print:text-zinc-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          Personalized Action Checklist
        </h3>
        <div className="bg-white/5 print:bg-zinc-50 border border-white/10 print:border-zinc-200 p-6 rounded-2xl space-y-3">
          {estimate.personalizedChecklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-zinc-200 print:text-zinc-800 leading-relaxed">
              <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-md shrink-0 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CTA TO BOOK FREE CALL OR PURCHASE STARTER PACKAGE DIRECTLY */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-blue-950 print:bg-emerald-50 border border-emerald-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest block">
            Ready To Execute?
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            Hire Our Team & Credit 100% of Your Rs 99 Unlock Fee
          </h4>
          <p className="text-xs text-emerald-100/80">
            Book a 10-minute strategy call or initiate your starter package deployment today.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="https://wa.me/917415917942?text=Hi%20Guruji%20Digital,%20I%20unlocked%20my%20personalized%20action%20plan%20and%20want%20to%20book%20a%20free%2010-min%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 text-xs transition-all shadow-lg"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book Free 10-Min Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
