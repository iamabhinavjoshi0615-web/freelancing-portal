"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
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

  const handleSubmitQuiz = async () => {
    setLoading(true);
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

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/40 dark:border-emerald-800/40">
              100% Free Interactive Calculator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-1">
              Website & Ad Investment Calculator
            </h2>
          </div>
        </div>

        {step <= 5 && (
          <div className="text-right">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 block">
              Step {step} of 5
            </span>
            <div className="w-24 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* QUESTION 1: Website Type */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
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
                  className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50"
                  }`}
                  type="button"
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{item.label}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 text-sm transition-all shadow-md"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 2: Current Website Status */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            2. What is your current website status?
          </h3>
          <div className="space-y-4">
            {statusOptions.map((item) => {
              const isSelected = hasWebsite === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setHasWebsite(item.id as QuizQuestions["hasWebsite"])}
                  className={`w-full p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 dark:border-blue-500 ring-2 ring-blue-500/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50"
                  }`}
                  type="button"
                >
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-zinc-300 dark:border-zinc-700"}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white">{item.label}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 text-sm transition-all shadow-md"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 3: Main Goal */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
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
                  className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50"
                  }`}
                  type="button"
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{item.label}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 text-sm transition-all shadow-md"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 4: Monthly Budget Comfort */}
      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            4. What is your comfortable monthly budget allocation?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {budgetOptions.map((item) => {
              const isSelected = budget === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setBudget(item.id as QuizQuestions["budget"])}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50"
                  }`}
                  type="button"
                >
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">{item.label}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 text-sm transition-all shadow-md"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 5: Timeline */}
      {step === 5 && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
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
                  className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-3 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/30 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/20"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50"
                  }`}
                  type="button"
                >
                  <div className={`p-3 rounded-full ${isSelected ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{item.label}</h4>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleSubmitQuiz}
              disabled={loading}
              className="flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 text-sm transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {loading ? (
                <span>Calculating Free Estimate...</span>
              ) : (
                <>
                  <span>Calculate Free Summary Output</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: FREE OUTPUT SUMMARY CARD */}
      {step === 6 && result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-800/50 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-800/40 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Instant Free Price Estimate Summary
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2 text-white">
                  Your Estimated Project Ranges
                </h3>
              </div>
              <span className="text-xs text-blue-200 bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-700/40">
                Calculated via config rules
              </span>
            </div>

            {/* Price Ranges Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Website Development Range */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-400" />
                    Website Development
                  </span>
                  {result.estimate.devCostRange ? (
                    <span className="text-xs font-black text-emerald-400">Development</span>
                  ) : (
                    <span className="text-xs font-bold text-amber-400">Skipped (Existing Site)</span>
                  )}
                </div>
                {result.estimate.devCostRange ? (
                  <div>
                    <div className="text-2xl font-black text-white">
                      Rs {result.estimate.devCostRange.min.toLocaleString("en-IN")} - Rs {result.estimate.devCostRange.max.toLocaleString("en-IN")}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{result.estimate.devCostRange.label}</p>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-300">
                    Website cost skipped because you selected maintenance only for your existing site.
                  </p>
                )}
              </div>

              {/* 2. Hosting & Domain (Yearly Add-on) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-indigo-400" />
                  Hosting & Domain (Yearly Add-on)
                </span>
                <div className="text-xs text-zinc-200 space-y-1">
                  <p className="flex justify-between border-b border-white/10 pb-1">
                    <span>{result.estimate.hostingDomain.domain.label}:</span>
                    <strong className="text-white">{result.estimate.hostingDomain.domain.range}</strong>
                  </p>
                  <p className="flex justify-between border-b border-white/10 pb-1 pt-1">
                    <span>{result.estimate.hostingDomain.basicHosting.label}:</span>
                    <strong className="text-white">{result.estimate.hostingDomain.basicHosting.range}</strong>
                  </p>
                  <p className="flex justify-between pt-1">
                    <span>{result.estimate.hostingDomain.premiumHosting.label}:</span>
                    <strong className="text-white">{result.estimate.hostingDomain.premiumHosting.range}</strong>
                  </p>
                </div>
              </div>

              {/* 3. Maintenance Tiers (Monthly Add-on) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  Maintenance Tiers (Monthly Add-on)
                </span>
                <div className="text-xs text-zinc-200 space-y-1">
                  <p className="flex justify-between border-b border-white/10 pb-1">
                    <span>Basic:</span>
                    <strong className="text-white">{result.estimate.maintenanceTiers.basic.range}</strong>
                  </p>
                  <p className="flex justify-between border-b border-white/10 pb-1 pt-1">
                    <span>Standard:</span>
                    <strong className="text-white">{result.estimate.maintenanceTiers.standard.range}</strong>
                  </p>
                  <p className="flex justify-between pt-1">
                    <span>Premium:</span>
                    <strong className="text-white">{result.estimate.maintenanceTiers.premium.range}</strong>
                  </p>
                </div>
              </div>

              {/* 4. Ad Management Fee (If Q3 = "Run ads") */}
              {result.estimate.adManagement ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    Ad Management Fee (Monthly)
                  </span>
                  <div className="text-2xl font-black text-emerald-300">
                    {result.estimate.adManagement.range}
                  </div>
                  <div className="p-2.5 bg-emerald-900/40 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-200 leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{result.estimate.adManagement.disclaimer}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 flex flex-col justify-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-zinc-500" />
                    Ad Management Fee
                  </span>
                  <p className="text-xs text-zinc-400">
                    Not applicable for your selection (only shown if main goal is set to &quot;Run ads&quot;).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA Box to Unlock Exact Recommended Package + Action Plan for Rs 99 */}
          <div className="bg-white dark:bg-zinc-950 border-2 border-emerald-500/40 dark:border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                Unlock Exact Strategy & Recommendations
              </span>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                Get your exact recommended package + personalized action plan for Rs 99
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
                Unlocks exact single pricing tier, target platforms (Shopify/Next.js/WordPress), vendor hosting links, step-by-step urgency schedule, and personalized checklist. 100% credited back on final service invoice!
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link
                href={`/unlock?topic=${result.suggestedTopic}&quizSession=${result.sessionId}`}
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 text-sm transition-all shadow-lg shadow-emerald-500/25 hover:scale-105"
              >
                <Lock className="w-4 h-4" />
                <span>Get Action Plan @ Rs 99</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setStep(1);
                setResult(null);
              }}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 underline"
            >
              Re-take Quiz / Change Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
