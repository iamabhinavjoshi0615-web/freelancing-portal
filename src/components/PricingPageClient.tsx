"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle, X, ShieldAlert, Lock } from "lucide-react";
import { PriceTier } from "../lib/content";
import ScrollReveal from "./ScrollReveal";

interface PricingPageClientProps {
  initialTiers: PriceTier[];
}

interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  delivery: string;
  support: string;
  isPopular?: boolean;
  included: string[];
  notIncluded: string[];
}

interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  billingNotice: string;
  disclaimer?: string;
  included: string[];
  notIncluded: string[];
}

const WEBSITE_PACKAGES: PackageItem[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    tagline: "Single-page design built to drive ad leads and customer inquiries.",
    price: "₹4,999",
    priceSuffix: "+ GST (one-time)",
    delivery: "3–5 days",
    support: "15 days",
    included: [
      "single-page design",
      "mobile responsive",
      "contact form with email delivery",
      "WhatsApp button",
      "basic SEO setup (title, description, sitemap)",
      "Google Analytics setup",
    ],
    notIncluded: [
      "multiple pages",
      "admin panel",
      "blog",
      "online payments",
      "monthly SEO or ad management",
    ],
  },
  {
    id: "business-website",
    name: "Business Website",
    tagline: "Multi-page website for companies looking to establish trust and generate local leads.",
    price: "₹8,999",
    priceSuffix: "+ GST (one-time)",
    delivery: "7–10 days",
    support: "30 days",
    isPopular: true,
    included: [
      "up to 5 pages (Home, About, Services, Contact, and one extra)",
      "mobile responsive",
      "contact form and lead capture",
      "WhatsApp button",
      "on-page SEO setup",
      "Google Analytics and Search Console setup",
      "blog section",
    ],
    notIncluded: [
      "online store or payments",
      "custom admin panel",
      "monthly SEO or ad management",
    ],
  },
  {
    id: "ecommerce-store",
    name: "E-commerce Store",
    tagline: "Complete online storefront to display products and accept online payments.",
    price: "₹18,999",
    priceSuffix: "+ GST (one-time)",
    delivery: "14–21 days",
    support: "45 days",
    included: [
      "product catalog and cart",
      "UPI, card, and netbanking checkout",
      "order and inventory management",
      "mobile responsive",
      "on-page SEO setup",
      "Google Analytics setup",
    ],
    notIncluded: [
      "product photography",
      "ongoing product uploads",
      "monthly SEO or ad management",
      "marketplace integrations",
    ],
  },
];

const RECURRING_SERVICES: ServiceItem[] = [
  {
    id: "ads-management",
    name: "Google & Meta Ads Management",
    tagline: "End-to-end ad campaign setup and optimization to drive inquiries and sales.",
    price: "₹7,999/month",
    priceSuffix: "+ GST",
    billingNotice: "Billed monthly in advance.",
    disclaimer: "Ad spend (paid directly to Google/Meta) is separate from our management fee.",
    included: [
      "Targeted Keyword & Audience Setup",
      "Custom Graphic & Reels Video Ad Creatives",
      "Meta Pixel & Conversion Tracking Audit",
      "A/B Split Testing & Bid Optimization",
      "Weekly ROAS & Lead Reports",
      "Dedicated Ad Specialist",
    ],
    notIncluded: [
      "Ad budget (paid directly to ad platforms)",
      "Website redesign",
      "Organic social media content creation",
    ],
  },
  {
    id: "local-seo",
    name: "Local SEO & Organic Growth",
    tagline: "Google Maps & search ranking optimization to attract organic local customers.",
    price: "₹5,999/month",
    priceSuffix: "+ GST",
    billingNotice: "Billed monthly in advance.",
    included: [
      "Google Business Profile (GMB) Optimization",
      "Local Map Pack Ranking Strategy",
      "Technical & On-Page SEO Optimization",
      "High-DA Citation & Backlink Building",
      "Monthly Keyword Rank Tracking",
    ],
    notIncluded: [
      "Google/Meta paid ads budget",
      "Website redesign",
      "Content writing beyond GMB updates",
    ],
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance",
    tagline: "Regular maintenance, security monitoring, and uptime protection for your website.",
    price: "from ₹999/month",
    priceSuffix: "+ GST",
    billingNotice: "Billed monthly in advance.",
    included: [
      "Uptime checks and minor fixes",
      "Core & plugin security updates",
      "Monthly database and file backups",
      "Basic security scanning & malware monitoring",
    ],
    notIncluded: [
      "Major redesigns or new feature development",
      "Third-party paid plugin subscriptions",
      "24/7 emergency hotline",
    ],
  },
];

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

    if (hostingQuality === "shared") {
      hostingCost = 1500;
    } else {
      hostingCost = 9600;
    }

    if (domainExtension === "in") {
      domainCost = 399;
    } else if (domainExtension === "com") {
      domainCost = 899;
    } else {
      domainCost = 0;
    }

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

  return (
    <div className="space-y-16 text-[#E2E4E8]">
      {/* SECTION 1: WEBSITE PACKAGES */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="wireframe-section-label mb-1">// WEBSITE & APPLICATION PACKAGES</div>
          <h2 className="text-2xl font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
            FIXED-SCOPE DEVELOPMENT PACKAGES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {WEBSITE_PACKAGES.map((pkg) => {
              const isPopular = pkg.isPopular;
              return (
                <div
                  key={pkg.id}
                  className={`bg-[#121316] p-6 sm:p-8 flex flex-col justify-between rounded-lg transition-all duration-300 card-hover ${
                    isPopular ? "border-2 border-[#0EA5E9]" : "border border-[#2E313A]"
                  }`}
                >
                  <div>
                    {/* Plain Text Label for Most Popular (No pill badge, no glow, no gradient) */}
                    {isPopular && (
                      <div className="text-xs font-mono font-bold text-[#0EA5E9] uppercase tracking-wider mb-2">
                        // MOST POPULAR
                      </div>
                    )}

                    {/* a) Package Name & One-Line Description */}
                    <h3 className="text-xl font-mono font-bold text-[#FFFFFF]">{pkg.name}</h3>
                    <p className="mt-1 text-xs text-[#8E95A5] font-sans leading-relaxed">
                      {pkg.tagline}
                    </p>

                    {/* b) Price with + GST */}
                    <div className="mt-4 pt-4 border-t border-[#2E313A] flex items-baseline gap-2">
                      <span className="text-3xl font-mono font-bold text-[#FFFFFF]">{pkg.price}</span>
                      <span className="text-xs font-mono text-[#8E95A5]">{pkg.priceSuffix}</span>
                    </div>

                    {/* c) Delivery Time */}
                    <div className="mt-3 inline-block bg-[#18191C] px-3 py-1 border border-[#2E313A] text-xs font-mono text-[#8E95A5]">
                      Delivery: {pkg.delivery}
                    </div>

                    {/* d) Included List with Green Check Icons */}
                    <div className="mt-6 space-y-2">
                      <h4 className="text-[11px] font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
                        Included:
                      </h4>
                      <ul className="space-y-2 text-xs font-sans text-[#E2E4E8]">
                        {pkg.included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* e) Not Included List with Muted Gray Cross Icons */}
                    <div className="mt-6 space-y-2">
                      <h4 className="text-[11px] font-mono font-bold text-[#8E95A5] uppercase tracking-wider">
                        Not included:
                      </h4>
                      <ul className="space-y-2 text-xs font-sans text-[#8E95A5]">
                        {pkg.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-[#8E95A5] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* f) Support Line */}
                    <div className="mt-6 pt-4 border-t border-[#2E313A] text-xs font-mono text-[#8E95A5]">
                      Post-launch support: <span className="font-bold text-[#FFFFFF]">{pkg.support}</span>
                    </div>
                  </div>

                  {/* g) Primary Button "Get this package" */}
                  <div className="mt-8">
                    <Link
                      href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                      className="btn-bracket block w-full py-3 text-xs font-mono text-center text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#18191C] transition-colors rounded-md"
                    >
                      Get this package
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Short Note Under Cards */}
          <div className="p-4 bg-[#121316] border border-[#2E313A] text-xs font-mono text-[#8E95A5] rounded-lg">
            <strong>Note:</strong> Support covers bug fixes, small content changes, and help using your site. New features or major changes are quoted separately.
          </div>
        </div>
      </ScrollReveal>

      {/* SECTION 2: RECURRING SERVICES ("Ongoing services") */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="wireframe-section-label mb-1">// MONTHLY MARKETING & MAINTENANCE RETAINERS</div>
          <h2 className="text-2xl font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
            Ongoing services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {RECURRING_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-[#121316] border border-[#2E313A] p-6 sm:p-8 flex flex-col justify-between rounded-lg transition-all duration-300 card-hover"
              >
                <div>
                  {/* Name & One-Line Description */}
                  <h3 className="text-xl font-mono font-bold text-[#FFFFFF]">{srv.name}</h3>
                  <p className="mt-1 text-xs text-[#8E95A5] font-sans leading-relaxed">
                    {srv.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-[#2E313A] flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-bold text-[#FFFFFF]">{srv.price}</span>
                    <span className="text-xs font-mono text-[#8E95A5]">{srv.priceSuffix}</span>
                  </div>

                  {/* Billing Notice */}
                  <div className="mt-2 text-xs font-mono text-[#8E95A5]">
                    {srv.billingNotice}
                  </div>

                  {/* Ad Spend Disclaimer if applicable */}
                  {srv.disclaimer && (
                    <div className="mt-4 p-3 bg-[#18191C] border border-[#2E313A] text-xs font-mono text-[#8E95A5] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#FFFFFF] text-[10px] uppercase">
                        <ShieldAlert className="w-3.5 h-3.5 text-[#8E95A5] shrink-0" />
                        AD SPEND DISCLAIMER
                      </div>
                      <p className="text-[11px] leading-relaxed">{srv.disclaimer}</p>
                    </div>
                  )}

                  {/* Included List */}
                  <div className="mt-6 space-y-2">
                    <h4 className="text-[11px] font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
                      Included:
                    </h4>
                    <ul className="space-y-2 text-xs font-sans text-[#E2E4E8]">
                      {srv.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included List */}
                  <div className="mt-6 space-y-2">
                    <h4 className="text-[11px] font-mono font-bold text-[#8E95A5] uppercase tracking-wider">
                      Not included:
                    </h4>
                    <ul className="space-y-2 text-xs font-sans text-[#8E95A5]">
                      {srv.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-[#8E95A5] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="mt-8">
                  <Link
                    href={`/contact?service=${encodeURIComponent(srv.name)}`}
                    className="btn-bracket block w-full py-3 text-xs font-mono text-center text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#18191C] transition-colors rounded-md"
                  >
                    Get this service
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-mono text-[#8E95A5]">
            // PAYMENT TERMS: 50% advance to begin work, 50% on completion before final handover.
          </p>
        </div>
      </ScrollReveal>

      {/* SECTION 3: HOSTING AND DOMAIN CLARITY */}
      <ScrollReveal>
        <div className="space-y-4">
          <div className="wireframe-section-label mb-1">// TRANSPARENT DOMAIN & HOSTING FEES</div>
          <h2 className="text-2xl font-mono font-bold text-[#FFFFFF] uppercase tracking-wider">
            Hosting and domain
          </h2>

          <div className="bg-[#121316] border border-[#2E313A] p-6 rounded-lg font-mono">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#2E313A] text-[#8E95A5] uppercase tracking-wider">
                  <th className="py-2.5 font-semibold">Service / Infrastructure</th>
                  <th className="py-2.5 font-semibold text-right">Estimated Cost (Billed at Cost)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2E313A]">
                <tr>
                  <td className="py-3 text-[#FFFFFF]">Domain (.com or .in)</td>
                  <td className="py-3 text-right text-[#E2E4E8]">₹500–1,200 per year, billed at cost</td>
                </tr>
                <tr>
                  <td className="py-3 text-[#FFFFFF]">Shared hosting</td>
                  <td className="py-3 text-right text-[#E2E4E8]">₹2,000–5,000 per year, billed at cost</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 pt-4 border-t border-[#2E313A] text-xs text-[#8E95A5] leading-relaxed">
              We set up your domain and hosting in your own name, so you always own them. There is no recurring hosting fee from us.
            </p>
          </div>
        </div>
      </ScrollReveal>

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
