"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  TrendingUp,
  Award,
  Zap,
  Clock,
  Lock,
  ChevronRight,
  ShoppingCart,
  BookOpen,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Server,
  Wrench
} from "lucide-react";
import { CalculatedEstimate, calculateQuizEstimate, QuizQuestions } from "../lib/quizConfig";

export default function InteractiveQuiz() {
  const [step, setStep] = useState(1);
  const [slideDir, setSlideDir] = useState<"next" | "back">("next");
  const [loading, setLoading] = useState(false);

  // Form State matching exact 5 questions requested
  const [websiteType, setWebsiteType] = useState<QuizQuestions["websiteType"]>("basic");
  const [hasWebsite, setHasWebsite] = useState<QuizQuestions["hasWebsite"]>("none");
  const [goal, setGoal] = useState<QuizQuestions["goal"]>("inquiries");
  const [budget, setBudget] = useState<QuizQuestions["budget"]>("5k_15k");
  const [timeline, setTimeline] = useState<QuizQuestions["timeline"]>("asap");

  // Calculated Estimate State
  const [result, setResult] = useState<{
    sessionId: string;
    suggestedTopic: string;
    estimate: CalculatedEstimate;
  } | null>(null);

  const handleNextStep = (nextStep: number) => {
    setSlideDir("next");
    setStep(nextStep);
  };

  const handleBackStep = (prevStep: number) => {
    setSlideDir("back");
    setStep(prevStep);
  };

  const handleSubmitQuiz = async () => {
    setLoading(true);
    setSlideDir("next");
    try {
      const answers: QuizQuestions = {
        websiteType,
        hasWebsite,
        goal,
        budget,
        timeline,
      };

      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteType,
          hasWebsite,
          goal,
          budget,
          timeline,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult({
          sessionId: data.sessionId,
          suggestedTopic: data.suggestedTopic,
          estimate: data.estimate || calculateQuizEstimate(answers),
        });
        setStep(6); // Step 6 is Free Summary Output Card
      } else {
        // Fallback offline calculation if server response is delayed
        setResult({
          sessionId: `local_${Date.now()}`,
          suggestedTopic: goal === "ads" ? "running-ads" : "website-building",
          estimate: calculateQuizEstimate(answers),
        });
        setStep(6);
      }
    } catch (err) {
      console.error("Quiz submission error:", err);
      // Fallback calculation locally
      const answers: QuizQuestions = { websiteType, hasWebsite, goal, budget, timeline };
      setResult({
        sessionId: `local_${Date.now()}`,
        suggestedTopic: goal === "ads" ? "running-ads" : "website-building",
        estimate: calculateQuizEstimate(answers),
      });
      setStep(6);
    } finally {
      setLoading(false);
    }
  };

  const websiteTypeOptions = [
    { id: "landing", label: "Landing Page", icon: Globe, desc: "Single focused page for leads, campaign promo, or product launch" },
    { id: "basic", label: "Basic Business Website", icon: ShieldCheck, desc: "3-5 pages portfolio/company profile for SMBs & services" },
    { id: "blog", label: "Blog/Content Website", icon: BookOpen, desc: "Articles, publishing portal, newsletter & organic SEO" },
    { id: "booking", label: "Booking/Service Website", icon: Calendar, desc: "Appointments, reservations, client forms & calendar slots" },
    { id: "ecommerce", label: "E-commerce Website", icon: ShoppingCart, desc: "Online store, cart checkout, UPI payments & inventory" },
  ];

  const statusOptions = [
    { id: "none", label: "No website yet", desc: "Starting completely from scratch (need domain, hosting & build)" },
    { id: "redesign", label: "Have one, needs redesign", desc: "Modernize design, mobile load speed & conversion optimization (0.6x - 0.7x base rate)" },
    { id: "maintenance", label: "Have one, just needs maintenance", desc: "Skip dev cost. Need monthly security, backups & technical support only" },
  ];

  const goalOptions = [
    { id: "inquiries", label: "Get more inquiries", icon: TrendingUp, desc: "Phone calls, WhatsApp leads, appointment inquiries" },
    { id: "sell", label: "Sell products online", icon: ShoppingCart, desc: "Direct payment gateway checkouts & automated orders" },
    { id: "credibility", label: "Build credibility", icon: Award, desc: "High-trust corporate presence to win premium client contracts" },
    { id: "ads", label: "Run ads", icon: Zap, desc: "Launch high-ROI Meta & Google Ads campaigns for fast acquisition" },
  ];

  const budgetOptions = [
    { id: "under_5k", label: "Under Rs 5,000", desc: "Starter budget / initial launch or basic maintenance" },
    { id: "5k_15k", label: "Rs 5,000-15,000", desc: "Standard business website build or initial ad setup" },
    { id: "15k_40k", label: "Rs 15,000-40,000", desc: "Full custom portal / multi-page site or performance ad management" },
    { id: "40k_plus", label: "Rs 40,000+", desc: "Scaled enterprise platform & multi-channel marketing agency retainer" },
  ];

  const timelineOptions = [
    { id: "asap", label: "ASAP (within a week)", icon: Zap },
    { id: "month", label: "Within a month", icon: Clock },
    { id: "exploring", label: "Just exploring", icon: Globe },
  ];

  const slideAnimationClass = slideDir === "next" 
    ? "animate-in fade-in slide-in-from-right-8 duration-300"
    : "animate-in fade-in slide-in-from-left-8 duration-300";

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#18191C] border border-[#2E313A] rounded-xl p-4 sm:p-8 shadow-xl relative overflow-hidden text-[#F8FAFC] font-mono">
      {/* Top Thin Progress Bar */}
      {step <= 5 && (
        <div className="w-full h-1 bg-[#22242A] rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-white transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2E313A] pb-6 mb-8">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9CA3AF]">
            $ SYSTEM DIAGNOSTIC CALCULATOR
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-sans">
            Website & Ad Investment Calculator
          </h2>
        </div>

        {step <= 5 && (
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#9CA3AF] block">
              [ STEP {step}/5 ]
            </span>
          </div>
        )}
      </div>

      {/* QUESTION 1: Website Type */}
      {step === 1 && (
        <div key={1} className={`space-y-6 ${slideAnimationClass}`}>
          <h3 className="text-base font-bold text-white font-sans">
            1. What type of website do you need?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {websiteTypeOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = websiteType === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setWebsiteType(item.id as QuizQuestions["websiteType"])}
                  className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-white bg-[#22242A] shadow-xs"
                      : "border-[#2E313A] hover:border-white/60 bg-[#18191C]"
                  }`}
                  type="button"
                >
                  <div className={`p-2 rounded-md shrink-0 ${isSelected ? "bg-white text-[#18191C]" : "bg-[#22242A] text-white"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-sans">{item.label}</h4>
                    <p className="text-xs text-[#9CA3AF] font-sans mt-0.5">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => handleNextStep(2)}
              className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white"
            >
              [ NEXT QUESTION &rarr; ]
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 2: Current Website Status */}
      {step === 2 && (
        <div key={2} className={`space-y-6 ${slideAnimationClass}`}>
          <h3 className="text-base font-bold text-white font-sans">
            2. What is your current website status?
          </h3>
          <div className="space-y-4">
            {statusOptions.map((item) => {
              const isSelected = hasWebsite === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setHasWebsite(item.id as QuizQuestions["hasWebsite"])}
                  className={`w-full p-4 rounded-lg border text-left transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? "border-white bg-[#22242A] shadow-xs"
                      : "border-[#2E313A] hover:border-white/60 bg-[#18191C]"
                  }`}
                  type="button"
                >
                  <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${isSelected ? "border-white bg-white text-[#18191C]" : "border-[#2E313A]"}`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#18191C]"></div>}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-sans">{item.label}</h4>
                    <p className="text-xs text-[#9CA3AF] font-sans mt-1">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => handleBackStep(1)}
              className="btn-bracket text-[#9CA3AF] border-[#2E313A] hover:text-white"
            >
              [ &larr; BACK ]
            </button>
            <button
              onClick={() => handleNextStep(3)}
              className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white"
            >
              [ NEXT QUESTION &rarr; ]
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 3: Main Goal */}
      {step === 3 && (
        <div key={3} className={`space-y-6 ${slideAnimationClass}`}>
          <h3 className="text-base font-bold text-white font-sans">
            3. What is your main business goal?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goalOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = goal === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setGoal(item.id as QuizQuestions["goal"])}
                  className={`flex items-start gap-4 p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-white bg-[#22242A] shadow-xs"
                      : "border-[#2E313A] hover:border-white/60 bg-[#18191C]"
                  }`}
                  type="button"
                >
                  <div className={`p-2 rounded-md shrink-0 ${isSelected ? "bg-white text-[#18191C]" : "bg-[#22242A] text-white"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-sans">{item.label}</h4>
                    <p className="text-xs text-[#9CA3AF] font-sans mt-0.5">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => handleBackStep(2)}
              className="btn-bracket text-[#9CA3AF] border-[#2E313A] hover:text-white"
            >
              [ &larr; BACK ]
            </button>
            <button
              onClick={() => handleNextStep(4)}
              className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white"
            >
              [ NEXT QUESTION &rarr; ]
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 4: Monthly Budget Comfort */}
      {step === 4 && (
        <div key={4} className={`space-y-6 ${slideAnimationClass}`}>
          <h3 className="text-base font-bold text-white font-sans">
            4. What is your comfortable monthly budget allocation?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgetOptions.map((item) => {
              const isSelected = budget === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setBudget(item.id as QuizQuestions["budget"])}
                  className={`p-5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-white bg-[#22242A] shadow-xs"
                      : "border-[#2E313A] hover:border-white/60 bg-[#18191C]"
                  }`}
                  type="button"
                >
                  <h4 className="text-sm font-bold text-white font-sans">{item.label}</h4>
                  <p className="text-xs text-[#9CA3AF] font-sans mt-1">{item.desc}</p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => handleBackStep(3)}
              className="btn-bracket text-[#9CA3AF] border-[#2E313A] hover:text-white"
            >
              [ &larr; BACK ]
            </button>
            <button
              onClick={() => handleNextStep(5)}
              className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white"
            >
              [ NEXT QUESTION &rarr; ]
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 5: Timeline */}
      {step === 5 && (
        <div key={5} className={`space-y-6 ${slideAnimationClass}`}>
          <h3 className="text-base font-bold text-white font-sans">
            5. What is your timeline urgency?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {timelineOptions.map((item) => {
              const Icon = item.icon;
              const isSelected = timeline === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTimeline(item.id as QuizQuestions["timeline"])}
                  className={`p-5 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-3 ${
                    isSelected
                      ? "border-white bg-[#22242A] shadow-xs"
                      : "border-[#2E313A] hover:border-white/60 bg-[#18191C]"
                  }`}
                  type="button"
                >
                  <div className={`p-2.5 rounded-full ${isSelected ? "bg-white text-[#18191C]" : "bg-[#22242A] text-white"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-sans">{item.label}</h4>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-[#2E313A]">
            <button
              onClick={() => handleBackStep(4)}
              className="btn-bracket text-[#9CA3AF] border-[#2E313A] hover:text-white"
            >
              [ &larr; BACK ]
            </button>
            <button
              onClick={handleSubmitQuiz}
              disabled={loading}
              className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white disabled:opacity-50"
            >
              {loading ? (
                <span>[ CALCULATING... ]</span>
              ) : (
                <span>[ CALCULATE SUMMARY OUTPUT &rarr; ]</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: FREE OUTPUT SUMMARY CARD */}
      {step === 6 && result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#18191C] text-[#F8FAFC] rounded-xl p-6 sm:p-8 border border-[#2E313A] shadow-xl space-y-6 font-mono">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2E313A] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#9CA3AF]">
                  $ DIAGNOSTIC ESTIMATE OUTPUT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-2 text-white font-sans">
                  Your Estimated Project Ranges
                </h3>
              </div>
              <span className="text-xs font-mono text-white bg-[#22242A] px-3 py-1 rounded-md border border-[#2E313A]">
                Config Rules Applied
              </span>
            </div>

            {/* Price Ranges Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Website Development Range */}
              <div className="bg-[#22242A] border border-[#2E313A] rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-white" />
                    Website Development
                  </span>
                </div>
                {result.estimate.devCostRange ? (
                  <div>
                    <div className="text-2xl font-bold text-white font-sans">
                      Rs {result.estimate.devCostRange.min.toLocaleString("en-IN")} - Rs {result.estimate.devCostRange.max.toLocaleString("en-IN")}
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5 font-sans">{result.estimate.devCostRange.label}</p>
                  </div>
                ) : (
                  <p className="text-xs text-[#9CA3AF] font-sans">
                    Website cost skipped because you selected maintenance only for your existing site.
                  </p>
                )}
              </div>

              {/* 2. Hosting & Domain (Yearly Add-on) */}
              <div className="bg-[#22242A] border border-[#2E313A] rounded-xl p-5 space-y-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-white" />
                  Hosting & Domain (Yearly)
                </span>
                <div className="text-xs text-[#9CA3AF] space-y-1 font-sans">
                  <p className="flex justify-between border-b border-[#2E313A] pb-1">
                    <span>{result.estimate.hostingDomain.domain.label}:</span>
                    <strong className="text-white">{result.estimate.hostingDomain.domain.range}</strong>
                  </p>
                  <p className="flex justify-between border-b border-[#2E313A] pb-1 pt-1">
                    <span>{result.estimate.hostingDomain.basicHosting.label}:</span>
                    <strong className="text-white">{result.estimate.hostingDomain.basicHosting.range}</strong>
                  </p>
                  <p className="flex justify-between pt-1">
                    <span>{result.estimate.hostingDomain.premiumHosting.label}:</span>
                    <strong className="text-white">{result.estimate.hostingDomain.premiumHosting.range}</strong>
                  </p>
                </div>
              </div>

              {/* 3. Maintenance Tiers */}
              <div className="bg-[#22242A] border border-[#2E313A] rounded-xl p-5 space-y-2">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-white" />
                  Maintenance Tiers (Monthly)
                </span>
                <div className="text-xs text-[#9CA3AF] space-y-1 font-sans">
                  <p className="flex justify-between border-b border-[#2E313A] pb-1">
                    <span>Basic:</span>
                    <strong className="text-white">{result.estimate.maintenanceTiers.basic.range}</strong>
                  </p>
                  <p className="flex justify-between border-b border-[#2E313A] pb-1 pt-1">
                    <span>Standard:</span>
                    <strong className="text-white">{result.estimate.maintenanceTiers.standard.range}</strong>
                  </p>
                  <p className="flex justify-between pt-1">
                    <span>Premium:</span>
                    <strong className="text-white">{result.estimate.maintenanceTiers.premium.range}</strong>
                  </p>
                </div>
              </div>

              {/* 4. Ad Management Fee */}
              {result.estimate.adManagement ? (
                <div className="bg-[#22242A] border border-[#2E313A] rounded-xl p-5 space-y-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-white" />
                    Ad Management Fee (Monthly)
                  </span>
                  <div className="text-2xl font-bold text-white font-sans">
                    {result.estimate.adManagement.range}
                  </div>
                  <div className="p-2.5 bg-[#18191C] border border-[#2E313A] rounded-lg text-[11px] text-[#9CA3AF] font-sans leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{result.estimate.adManagement.disclaimer}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#22242A] border border-[#2E313A] rounded-xl p-5 space-y-2 flex flex-col justify-center">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-white" />
                    Ad Management Fee
                  </span>
                  <p className="text-xs text-[#9CA3AF] font-sans">
                    Not applicable for your selection (only shown if main goal is set to &quot;Run ads&quot;).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA Box to Unlock Exact Recommended Package */}
          <div className="bg-[#22242A] border border-white rounded-xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-widest block">
                [ UNLOCK ACTION PLAN ]
              </span>
              <h4 className="text-xl font-bold text-white font-sans">
                Get your exact recommended package + personalized action plan for Rs 99
              </h4>
              <p className="text-xs text-[#9CA3AF] font-sans max-w-xl">
                Unlocks exact single pricing tier, target platforms (Shopify/Next.js/WordPress), vendor hosting links, step-by-step urgency schedule, and personalized checklist. 100% credited back on final service invoice!
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link
                href={`/unlock?topic=${result.suggestedTopic}&quizSession=${result.sessionId}`}
                className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>[ UNLOCK PLAN @ ₹99 ]</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setSlideDir("back");
                setStep(1);
                setResult(null);
              }}
              className="text-xs font-mono font-bold text-[#9CA3AF] hover:text-white underline"
            >
              [ RE-TAKE QUIZ / CHANGE ANSWERS ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

