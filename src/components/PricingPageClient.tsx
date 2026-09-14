"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, Lock, ShieldAlert } from "lucide-react";
import { PriceTier } from "../lib/content";
import ScrollReveal from "./ScrollReveal";

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

    if (projectType === "landing") {
      devFeeMin = 4000;
      devFeeMax = 8000;
    } else if (projectType === "business") {
      devFeeMin = 8000 + (pagesCount > 5 ? (pagesCount - 5) * 800 : 0);
      devFeeMax = 18000 + (pagesCount > 5 ? (pagesCount - 5) * 1200 : 0);
    } else if (projectType === "ecommerce") {
      devFeeMin = 15000;
      devFeeMax = 35000;
    } else if (projectType === "booking" || projectType === "custom") {
      devFeeMin = 12000;
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
  // Helper for timeline estimates per pricing tier item
  const getItemTimeline = (item: string, category: string) => {
    const itemLower = item.toLowerCase();
    const catLower = category.toLowerCase();

    if (itemLower.includes("landing")) return "Delivery: 1-2 weeks";
    if (itemLower.includes("basic") || itemLower.includes("business")) return "Delivery: 2-3 weeks";
    if (itemLower.includes("booking") || itemLower.includes("service")) return "Delivery: 3-4 weeks";
    if (itemLower.includes("e-commerce") || itemLower.includes("ecommerce")) return "Delivery: 4-6 weeks";
    if (catLower.includes("retainer") || catLower.includes("maintenance") || catLower.includes("ad")) {
      return "Starts within: 3-5 business days";
    }
    return "Delivery: Instant (Same Day)";
  };

  const categories = Array.from(new Set(initialTiers.map((t) => t.category)));

  return (
    <div className="space-y-16 text-[#E2E4E8]">
      {/* Estimated Delivery Timelines Summary */}
      <ScrollReveal>
        <div className="space-y-4 font-mono">
          <div className="wireframe-section-label mb-1">// ESTIMATED DELIVERY TIMELINES</div>
          <h2 className="text-xl font-bold text-[#FFFFFF] uppercase tracking-wider">
            STANDARD PACKAGE DELIVERY TIMELINES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-[#121316] border border-[#2E313A] space-y-1">
              <div className="text-xs font-bold text-[#FFFFFF]">Landing Page / Starter Tier</div>
              <div className="text-xs text-[#8E95A5] font-mono">Delivery: 1-2 weeks</div>
            </div>
            <div className="p-4 bg-[#121316] border border-[#2E313A] space-y-1">
              <div className="text-xs font-bold text-[#FFFFFF]">Basic Business Website Tier</div>
              <div className="text-xs text-[#8E95A5] font-mono">Delivery: 2-3 weeks</div>
            </div>
            <div className="p-4 bg-[#121316] border border-[#2E313A] space-y-1">
              <div className="text-xs font-bold text-[#FFFFFF]">Booking / Service Website Tier</div>
              <div className="text-xs text-[#8E95A5] font-mono">Delivery: 3-4 weeks</div>
            </div>
            <div className="p-4 bg-[#121316] border border-[#2E313A] space-y-1">
              <div className="text-xs font-bold text-[#FFFFFF]">E-commerce Website Tier</div>
              <div className="text-xs text-[#8E95A5] font-mono">Delivery: 4-6 weeks</div>
            </div>
            <div className="p-4 bg-[#121316] border border-[#2E313A] space-y-1 sm:col-span-2 lg:col-span-2">
              <div className="text-xs font-bold text-[#FFFFFF]">Monthly Retainers (Ad Management, SEO, Maintenance)</div>
              <div className="text-xs text-[#8E95A5] font-mono">Starts within: 3-5 business days</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Basic Pricing Tables */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => (
            <ScrollReveal key={category} delayMs={catIdx * 120}>
              <div className="bg-[#121316] border border-[#2E313A] p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="wireframe-section-label mb-2">// CATEGORY 0{catIdx + 1}</div>
                  <h3 className="text-lg font-mono font-bold text-[#FFFFFF] border-b border-[#2E313A] pb-3 mb-4 uppercase tracking-wider">
                    {category} CHARGES
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="text-[#8E95A5] uppercase tracking-wider border-b border-[#2E313A]">
                          <th className="py-3 font-semibold">Service / Item</th>
                          <th className="py-3 font-semibold text-right">Standard Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E313A]">
                        {initialTiers
                          .filter((t) => t.category === category)
                          .map((t, idx) => (
                            <tr key={idx} className="hover:bg-[#18191C] transition-colors">
                              <td className="py-3 font-mono text-[#E2E4E8]">
                                {t.item}
                                <span className="block text-[10px] text-[#8E95A5] font-mono mt-0.5">
                                  Billing: {t.billing} • <span className="text-[#8E95A5] font-medium">{getItemTimeline(t.item, t.category)}</span>
                                </span>
                              </td>
                              <td className="py-3 text-right font-bold font-mono text-[#FFFFFF]">
                                {t.basicPrice}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {category.toLowerCase().includes("ad") && (
                  <div className="mt-4 p-4 bg-[#18191C] border border-[#2E313A] text-xs font-mono space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#FFFFFF] uppercase tracking-wider text-[10px]">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#8E95A5] shrink-0" />
                      AD SPEND DISCLAIMER
                    </div>
                    <p className="text-[#8E95A5] text-[11px] leading-relaxed">
                      <strong>Note:</strong> Ad spend (paid directly to Google/Meta) is separate from our management fee. Example: If your ad budget is Rs 5,000/month, that goes to the ad platform directly via your own billing.
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-4 text-xs font-mono text-[#8E95A5]">
          // PAYMENT TERMS: 50% advance to begin work, 50% on completion before final handover.
        </p>
      </div>

      {/* Interactive Estimator and locked detail output */}
      <div className="terminal-box">
        <div className="bg-[#121316] p-6 sm:p-8 border-b border-[#2E313A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#2E313A] flex items-center justify-center text-[#FFFFFF] font-mono text-xs">
              &gt;_
            </div>
            <div>
              <h2 className="text-xl font-mono font-bold text-[#FFFFFF] uppercase">Interactive Budget Estimator</h2>
              <p className="text-xs text-[#8E95A5] font-mono">Calculate real-time ballpark development investment.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#8E95A5] hidden sm:inline-block">[ CALCULATOR ACTIVE ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider mb-2">
                  // Project Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full border border-[#2E313A] bg-[#121316] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                >
                  <option value="landing">High-Converting Landing Page</option>
                  <option value="business">Multi-Page Business Website</option>
                  <option value="ecommerce">E-commerce Online Store</option>
                  <option value="booking">Booking / Appointment Portal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider mb-2">
                  // Domain Extension
                </label>
                <select
                  value={domainExtension}
                  onChange={(e) => setDomainExtension(e.target.value)}
                  className="w-full border border-[#2E313A] bg-[#121316] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                >
                  <option value="in">India Extension (.in) - ₹399/yr</option>
                  <option value="com">Global Extension (.com) - ₹899/yr</option>
                  <option value="none">No Domain needed (I have one)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
                  // Number of Pages
                </label>
                <span className="text-xs font-mono font-bold bg-[#121316] text-[#FFFFFF] px-2 py-0.5 border border-[#2E313A]">
                  {pagesCount} Pages
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full h-2 bg-[#2E313A] rounded-none appearance-none cursor-pointer accent-[#FFFFFF]"
              />
              <div className="flex justify-between text-[10px] text-[#8E95A5] font-mono mt-1.5">
                <span>1 Page (Landing)</span>
                <span>15 Pages</span>
                <span>30 Pages</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider mb-2">
                  // Hosting Infrastructure
                </label>
                <select
                  value={hostingQuality}
                  onChange={(e) => setHostingQuality(e.target.value)}
                  className="w-full border border-[#2E313A] bg-[#121316] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                >
                  <option value="shared">Budget Shared SSD (₹149/mo)</option>
                  <option value="cloud">High-Performance Managed Cloud (₹799/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider mb-2">
                  // Monthly Support
                </label>
                <select
                  value={maintenance}
                  onChange={(e) => setMaintenance(e.target.value)}
                  className="w-full border border-[#2E313A] bg-[#121316] px-4 py-2.5 text-xs font-mono text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF]"
                >
                  <option value="none">No Retainer (Pay-as-you-go)</option>
                  <option value="basic">Basic Maintenance (₹1,999/mo)</option>
                  <option value="premium">Premium Support (₹4,999/mo)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estimates Output Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#121316] border-t lg:border-t-0 lg:border-l border-[#2E313A] flex flex-col justify-between font-mono">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-[#8E95A5] uppercase tracking-wider">
                // ESTIMATED SETUP INVESTMENT
              </h3>
              
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-[#FFFFFF]">
                  ₹{est.totalSetupMin.toLocaleString("en-IN")} - ₹{est.totalSetupMax.toLocaleString("en-IN")}
                </span>
                <span className="block text-xs text-[#8E95A5]">
                  Includes developer fees, hosting, & domain (Year 1 setup)
                </span>
              </div>

              <div className="pt-4 border-t border-[#2E313A] text-xs space-y-2 text-[#8E95A5]">
                <div className="flex justify-between">
                  <span>Development Fee:</span>
                  <span className="font-bold text-[#FFFFFF]">
                    ₹{est.devFeeMin.toLocaleString()} - ₹{est.devFeeMax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hosting (Year 1):</span>
                  <span className="font-bold text-[#FFFFFF]">₹{est.hostingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Domain registration:</span>
                  <span className="font-bold text-[#FFFFFF]">₹{est.domainCost}</span>
                </div>
                {est.maintCost > 0 && (
                  <div className="flex justify-between text-[#FFFFFF] font-bold">
                    <span>Monthly retainer:</span>
                    <span>₹{est.maintCost.toLocaleString()}/mo</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#2E313A] text-[11px] text-[#8E95A5]">
                  // TERMS: 50% advance, 50% on completion.
                </div>
              </div>
            </div>

            {/* Lock Cover Callout */}
            <div className="mt-8 p-4 border border-[#2E313A] bg-[#18191C] text-center">
              <div className="flex items-center justify-center gap-2 text-[#FFFFFF] font-bold text-xs mb-1.5 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                Custom Strategy Locked
              </div>
              <p className="text-[11px] text-[#8E95A5] leading-relaxed mb-3">
                Unlock exact hosting URLs, recommended plugins, design checklist, and ad conversion strategies.
              </p>
              <Link
                href="/unlock?topic=website-pricing"
                className="btn-bracket w-full py-2 text-xs text-center inline-block"
              >
                [ UNLOCK STRATEGY BLUEPRINT @ ₹99 ]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
