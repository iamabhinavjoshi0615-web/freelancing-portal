"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Lock, ShieldAlert, HelpCircle } from "lucide-react";
import { PriceTier } from "../lib/content";

interface PricingPageClientProps {
  initialTiers: PriceTier[];
}

export default function PricingPageClient({ initialTiers }: PricingPageClientProps) {
  // Calculator States
  const [projectType, setProjectType] = useState("business");
  const [pagesCount, setPagesCount] = useState(5);
  const [hostingQuality, setHostingQuality] = useState("shared");
  const [domainExtension, setDomainExtension] = useState("in");
  const [maintenance, setMaintenance] = useState("none");

  // Basic calculators
  const calculateEstimate = () => {
    let devFeeMin = 0;
    let devFeeMax = 0;
    let hostingCost = 0;
    let domainCost = 0;

    // Dev fees based on type
    if (projectType === "landing") {
      devFeeMin = 4999;
      devFeeMax = 7999;
    } else if (projectType === "business") {
      devFeeMin = 8999;
      devFeeMax = 15000;
      // Add page weighting
      if (pagesCount > 5) {
        const extraPages = pagesCount - 5;
        devFeeMin += extraPages * 800;
        devFeeMax += extraPages * 1200;
      }
    } else if (projectType === "ecommerce") {
      devFeeMin = 18999;
      devFeeMax = 35000;
      if (pagesCount > 10) {
        const extraPages = pagesCount - 10;
        devFeeMin += extraPages * 1000;
        devFeeMax += extraPages * 1500;
      }
    } else if (projectType === "booking") {
      devFeeMin = 12499;
      devFeeMax = 22000;
    }

    // Hosting estimates
    if (hostingQuality === "shared") {
      hostingCost = 1500; // yearly shared
    } else {
      hostingCost = 9600; // yearly cloud (approx ₹800/mo)
    }

    // Domain estimates
    if (domainExtension === "in") {
      domainCost = 399;
    } else if (domainExtension === "com") {
      domainCost = 899;
    } else {
      domainCost = 0;
    }

    // Monthly maintenance additions
    let maintCost = 0;
    if (maintenance === "basic") maintCost = 1999;
    if (maintenance === "premium") maintCost = 4999;

    const totalSetupMin = devFeeMin + hostingCost + domainCost;
    const totalSetupMax = devFeeMax + hostingCost + domainCost;

    return {
      devFeeMin,
      devFeeMax,
      hostingCost,
      domainCost,
      maintCost,
      totalSetupMin,
      totalSetupMax,
    };
  };

  const est = calculateEstimate();

  // Group tiers by category
  const categories = Array.from(new Set(initialTiers.map((t) => t.category)));

  return (
    <div className="space-y-20">
      {/* Basic Pricing Tables */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden"
            >
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {category} Charges
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-850">
                      <th className="py-3 font-semibold">Service/Item</th>
                      <th className="py-3 font-semibold text-right">Standard Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                    {initialTiers
                      .filter((t) => t.category === category)
                      .map((t, idx) => (
                        <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                          <td className="py-4 font-medium text-zinc-800 dark:text-zinc-300">
                            {t.item}
                            <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                              Billing: {t.billing}
                            </span>
                          </td>
                          <td className="py-4 text-right font-semibold text-zinc-900 dark:text-white">
                            {t.basicPrice}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {category.toLowerCase().includes("ad") && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[10px]">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    Ad Spend Disclaimer
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 text-[11px] leading-relaxed">
                    <strong>Note:</strong> Ad spend (the amount paid directly to Google/Meta/platforms) is separate from our management fee. <em>Example:</em> If your ad budget is Rs 5,000/month, that goes to the ad platform directly via your own billing — our management fee is charged separately for setup, strategy, ad graphics/reels, and bid optimization.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <strong>Payment Terms:</strong> 50% advance to begin work, 50% on completion before final handover.
        </p>
      </div>

      {/* Interactive Estimator and locked detail output */}
      <div className="border border-zinc-200 dark:border-zinc-850 rounded-3xl bg-white dark:bg-zinc-900/40 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-950 dark:to-zinc-900 p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-850 flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Interactive Budget Estimator</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Get a ballpark development estimate based on your specific goals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Project Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="landing">High-Converting Landing Page</option>
                  <option value="business">Multi-Page Business Website</option>
                  <option value="ecommerce">E-commerce Online Store</option>
                  <option value="booking">Booking / Appointment Portal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Domain Extension
                </label>
                <select
                  value={domainExtension}
                  onChange={(e) => setDomainExtension(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="in">India Extension (.in) - ₹399/yr</option>
                  <option value="com">Global Extension (.com) - ₹899/yr</option>
                  <option value="none">No Domain needed (I have one)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Number of Pages
                </label>
                <span className="text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                  {pagesCount} Pages
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mt-1.5 font-medium">
                <span>1 Page (Landing)</span>
                <span>15 Pages</span>
                <span>30 Pages (Complex structure)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Hosting Infrastructure
                </label>
                <select
                  value={hostingQuality}
                  onChange={(e) => setHostingQuality(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="shared">Budget Shared SSD (₹149/mo)</option>
                  <option value="cloud">High-Performance Managed Cloud (₹799/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Monthly Retainer Support
                </label>
                <select
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">No Retainer (Pay-as-you-go)</option>
                  <option value="basic">Basic Maintenance (₹1,999/mo)</option>
                  <option value="premium">Premium Developer Support (₹4,999/mo)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estimates Output Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/50 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-850 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Estimated Setup Investment
              </h3>
              
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
                  ₹{est.totalSetupMin.toLocaleString("en-IN")} - ₹{est.totalSetupMax.toLocaleString("en-IN")}
                </span>
                <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  Includes developer fees, hosting, & domain (Year 1 setup)
                </span>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs space-y-2 text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Development Fee estimate:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    ₹{est.devFeeMin.toLocaleString()} - ₹{est.devFeeMax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hosting (1st year):</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">₹{est.hostingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Domain registration:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">₹{est.domainCost}</span>
                </div>
                {est.maintCost > 0 && (
                  <div className="flex justify-between text-blue-600 dark:text-blue-400 font-medium">
                    <span>Monthly retainer support:</span>
                    <span>₹{est.maintCost.toLocaleString()}/mo</span>
                  </div>
                )}
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <strong>Payment Terms:</strong> 50% advance to begin work, 50% on completion before final handover.
                </div>
              </div>
            </div>

            {/* Lock Cover Callout */}
            <div className="mt-8 relative rounded-2xl overflow-hidden border border-amber-200/50 bg-amber-500/[0.04] p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs mb-1.5 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Custom Strategy locked
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                Unlock exact hosting URLs, recommended plugins, design checklist, and ad conversion strategies.
              </p>
              <Link
                href="/unlock?topic=website-pricing"
                className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 text-xs transition-colors shadow"
              >
                Unlock Strategy Blueprint @ ₹99
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
