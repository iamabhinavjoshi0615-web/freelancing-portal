"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Layers,
  PhoneCall,
  Zap
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
      <div className="p-8 bg-[#121316] text-[#E2E4E8] border border-[#2E313A] text-center space-y-3 font-mono">
        <div className="w-6 h-6 border-2 border-[#FFFFFF] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-mono text-[#8E95A5]">[ LOADING PERSONALIZED ACTION PLAN... ]</p>
      </div>
    );
  }

  if (!estimate) {
    return null;
  }

  return (
    <div className="bg-[#121316] text-[#E2E4E8] p-6 sm:p-10 border border-[#2E313A] space-y-8 my-8 font-mono print:my-4 print:p-6 print:bg-white print:text-zinc-900 print:border-zinc-300">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2E313A] print:border-zinc-300 pb-6">
        <div>
          <div className="wireframe-section-label mb-1">// UNLOCKED PAID BREAKDOWN</div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#FFFFFF] print:text-zinc-900">
            PERSONALIZED ACTION PLAN & RECOMMENDATION
          </h2>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs text-[#8E95A5] print:text-zinc-600 block uppercase">// TARGET PACKAGE TIER</span>
          <span className="text-2xl font-mono font-bold text-[#FFFFFF] print:text-emerald-700">
            {estimate.exactRecommendedPackage.priceFormatted}
          </span>
        </div>
      </div>

      {/* 1. EXACT RECOMMENDED PACKAGE */}
      <div className="bg-[#18191C] print:bg-zinc-50 border border-[#2E313A] print:border-zinc-200 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#FFFFFF] print:text-emerald-700 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#8E95A5]" />
            EXACT RECOMMENDED PACKAGE TIER
          </span>
          <span className="bg-[#2E313A] text-[#FFFFFF] text-[10px] font-mono px-2 py-0.5 border border-[#2E313A]">
            SINGLE TARGET NUMBER
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h3 className="text-xl font-mono font-bold text-[#FFFFFF] print:text-zinc-900">
              {estimate.exactRecommendedPackage.packageName}
            </h3>
            <p className="text-xs text-[#8E95A5] print:text-zinc-600 mt-1 font-sans">
              Calculated based on your specific monthly budget allocation answer.
            </p>
          </div>
          <div className="text-3xl font-mono font-bold text-[#FFFFFF] print:text-emerald-700 shrink-0">
            {estimate.exactRecommendedPackage.priceFormatted}
          </div>
        </div>
      </div>

      {/* 2. RECOMMENDED PLATFORMS & TOOLS */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-bold text-[#FFFFFF] print:text-zinc-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#8E95A5]" />
          RECOMMENDED TECH STACK & VENDOR TOOLS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-[#18191C] print:bg-zinc-50 border border-[#2E313A] print:border-zinc-200 p-5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#8E95A5] tracking-wider block">// RECOMMENDED PLATFORM</span>
            <p className="font-bold text-[#FFFFFF] print:text-zinc-900 text-sm">{estimate.recommendedStack.platform}</p>
          </div>
          <div className="bg-[#18191C] print:bg-zinc-50 border border-[#2E313A] print:border-zinc-200 p-5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#8E95A5] tracking-wider block">// DOMAIN & HOSTING</span>
            <p className="font-bold text-[#FFFFFF] print:text-zinc-900 text-sm">{estimate.recommendedStack.domainHosting}</p>
          </div>
          <div className="bg-[#18191C] print:bg-zinc-50 border border-[#2E313A] print:border-zinc-200 p-5 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#8E95A5] tracking-wider block">// PAYMENT & ANALYTICS</span>
            <p className="font-bold text-[#FFFFFF] print:text-zinc-900 text-sm">{estimate.recommendedStack.analyticsPayment}</p>
          </div>
        </div>
      </div>

      {/* 3. STEP-BY-STEP TIMELINE */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-bold text-[#FFFFFF] print:text-zinc-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#8E95A5]" />
          IMPLEMENTATION TIMELINE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {estimate.timelineSchedule.map((t, idx) => (
            <div key={idx} className="bg-[#18191C] print:bg-zinc-50 border border-[#2E313A] print:border-zinc-200 p-5 space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#FFFFFF]">{t.phase}</span>
                <span className="text-[10px] bg-[#2E313A] text-[#FFFFFF] px-2 py-0.5 font-mono">{t.duration}</span>
              </div>
              <p className="text-xs text-[#8E95A5] print:text-zinc-700 leading-relaxed pt-1 font-sans">{t.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PERSONALIZED CHECKLIST */}
      <div className="space-y-4">
        <h3 className="text-lg font-mono font-bold text-[#FFFFFF] print:text-zinc-900 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#8E95A5]" />
          PERSONALIZED ACTION CHECKLIST
        </h3>
        <div className="bg-[#18191C] print:bg-zinc-50 border border-[#2E313A] print:border-zinc-200 p-6 space-y-3 font-mono">
          {estimate.personalizedChecklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-[#E2E4E8] print:text-zinc-800 leading-relaxed">
              <span className="text-[#8E95A5]">&rarr;</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CTA TO BOOK FREE CALL */}
      <div className="bg-[#18191C] border border-[#2E313A] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 print:hidden">
        <div className="space-y-1 text-center sm:text-left font-mono">
          <span className="text-[10px] text-[#8E95A5] uppercase tracking-widest block">
            // READY TO EXECUTE?
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[#FFFFFF]">
            HIRE OUR TEAM & CREDIT 100% OF YOUR ₹99 UNLOCK FEE
          </h4>
          <p className="text-xs text-[#8E95A5] font-sans">
            Book a 10-minute strategy call or initiate your starter package deployment today.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="https://wa.me/917415917942?text=Hi%20The%20Industries,%20I%20unlocked%20my%20personalized%20action%20plan%20and%20want%20to%20book%20a%20free%2010-min%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bracket px-6 py-3 text-xs text-center block"
          >
            [ BOOK FREE 10-MIN CALL ]
          </a>
        </div>
      </div>
    </div>
  );
}
