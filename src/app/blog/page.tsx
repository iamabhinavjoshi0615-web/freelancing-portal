import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Lock, Calendar, Clock } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

export const revalidate = 60;

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
      ctaText: "[ UNLOCK WEBSITE SETUP BLUEPRINT @ ₹99 ]"
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
      ctaText: "[ UNLOCK AD LAUNCH PLAYBOOK @ ₹99 ]"
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
      ctaText: "[ UNLOCK HOSTING & RETAINER SHEETS @ ₹99 ]"
    }
  ];

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// KNOWLEDGE BASE & STRATEGY TEASERS</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              FREE RESOURCES & GUIDES
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans">
              Read our free expert columns and introductory columns below. To unlock step-by-step setup guides, tool sheets, and calculator scripts, check out our premium unlocks.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles List (Light Off-White Section) */}
      <section className="bg-[#F4F4F6] text-[#18191C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {articles.map((art, aIdx) => (
            <ScrollReveal key={art.id}>
              <article
                className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#526075]">
                  <span className="bg-[#F4F4F6] px-2.5 py-1 border border-[#E2E4E8] font-bold text-[#18191C]">
                    // {art.category.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#526075]" />
                    {art.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#526075]" />
                    {art.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#18191C] leading-tight">
                  0{aIdx + 1}. {art.title}
                </h2>

                <p className="text-sm text-[#526075] leading-relaxed font-sans">
                  {art.excerpt}
                </p>

                {/* Teaser Points */}
                <div className="bg-[#F4F4F6] p-6 border border-[#E2E4E8] space-y-3 font-mono">
                  <h3 className="text-xs font-mono font-bold text-[#18191C] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#18191C]" />
                    // KEY ACTION POINTS CHECKLIST:
                  </h3>
                  <ul className="space-y-2 text-xs text-[#526075]">
                    {art.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#18191C] font-bold shrink-0">&rarr;</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unlock Paywall CTA inside article */}
                <div className="border border-[#E2E4E8] p-5 bg-[#F4F4F6] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                  <div className="flex items-center gap-3 text-center sm:text-left flex-col sm:flex-row">
                    <div className="w-8 h-8 rounded bg-[#E2E4E8] text-[#18191C] font-mono flex items-center justify-center text-xs shrink-0">
                      &gt;_
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#18191C] uppercase">DEEP DIVE BLUEPRINT AVAILABLE</h4>
                      <p className="text-[11px] text-[#526075] mt-0.5 font-sans">Unlock detailed installation instructions, recommended vendors, and cost breakdown matrices.</p>
                    </div>
                  </div>
                  <Link
                    href={`/unlock?topic=${art.ctaTopic}`}
                    className="btn-bracket px-5 py-2.5 text-xs shrink-0"
                  >
                    {art.ctaText}
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
