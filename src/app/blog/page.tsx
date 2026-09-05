import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Lock, Calendar, Clock, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Blog() {
  const articles = [
    {
      id: "mistakes-website",
      title: "5 Costly Mistakes Indian Small Businesses Make with Their First Website",
      excerpt: "Many local manufacturers and B2B vendors pay agencies up to ₹50,000 for standard websites, only to lose access to their domains, experience slow loading times on mobile, or pay high monthly retainers they don't need.",
      readTime: "4 Min Read",
      date: "Aug 24, 2026",
      category: "Web Development",
      tips: [
        "Buying domains under the developer's personal login instead of your own. This makes you lose ownership of your brand name.",
        "Paying high monthly retainers for static websites that don't need regular developer edits.",
        "Neglecting mobile load speed. Over 80% of your Indian customers will access your site via mobile networks (Jio/Airtel 4G/5G).",
        "Buying expensive SSL certificates (often ₹2,000/yr) when they are actually 100% free with modern hostings."
      ],
      ctaTopic: "website-building",
      ctaText: "Unlock the Complete Website Setup Blueprint"
    },
    {
      id: "ads-budget",
      title: "How to Set Your First Daily Ad Budget on Facebook and Google without Burning Money",
      excerpt: "Many merchants click the 'Boost Post' button on Instagram or load ₹500 in Google Ads without setting up tracking, resulting in zero leads. Learn the core principles of budget allocation in the Indian marketplace.",
      readTime: "5 Min Read",
      date: "Aug 18, 2026",
      category: "Digital Marketing",
      tips: [
        "Never use the 'Boost Post' button. Always run ads through Meta Ads Manager to target specific conversion events.",
        "Set a minimum budget of ₹500/day. Lower budgets prevent the platform's AI from learning who your real buyers are.",
        "Choose Google Ads if customers are actively searching for your service, and Meta Ads if your product relies on visual awareness.",
        "Install the tracking pixel BEFORE spending a single rupee, otherwise you won't know which ad generated the lead."
      ],
      ctaTopic: "running-ads",
      ctaText: "Unlock the Complete Ad Launch Playbook"
    },
    {
      id: "hosting-shared-cloud",
      title: "Shared Hosting vs Managed Cloud: Which is Right for Your Business Scale?",
      excerpt: "Is it worth paying ₹800/month for Cloudways or AWS hosting, or is a ₹149/month shared Hostinger plan enough? We break down the server math for Indian local stores.",
      readTime: "3 Min Read",
      date: "Aug 12, 2026",
      category: "Hosting & Tech",
      tips: [
        "If you run a simple corporate profile (About, Services, Contact) with less than 5,000 visitors/mo, basic shared hosting is more than enough.",
        "If you run WooCommerce or Shopify with multiple checkout pages, choose Managed Cloud to avoid checkout timeouts.",
        "Avoid local hosting companies that don't provide daily automated backup safeguards."
      ],
      ctaTopic: "website-pricing",
      ctaText: "Unlock the Complete Hosting & Retainer Price Sheets"
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-200/30">
          Knowledge Base
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Free Resources & Strategy Teasers
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base">
          Read our free expert columns and introductory columns below. To unlock step-by-step setup guides, tool sheets, and calculator scripts, check out our premium unlocks.
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-12">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-450 dark:text-zinc-550">
              <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md">
                {art.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {art.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {art.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
              {art.title}
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {art.excerpt}
            </p>

            {/* Teaser Points */}
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Key Action Points Checklist:
              </h3>
              <ul className="space-y-2 text-xs text-zinc-650 dark:text-zinc-405">
                {art.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-500 font-bold shrink-0">!</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unlock Paywall CTA inside article */}
            <div className="border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 bg-blue-500/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left flex-col sm:flex-row">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Deep Dive Guide Available</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Unlock detailed installation instructions, recommended vendors, and cost breakdown matrices.</p>
                </div>
              </div>
              <Link
                href={`/unlock?topic=${art.ctaTopic}`}
                className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 text-xs transition-colors shrink-0 shadow"
              >
                {art.ctaText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
