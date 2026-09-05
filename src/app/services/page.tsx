import React from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, ArrowRight, Lock, Eye } from "lucide-react";
import { getServices } from "../../lib/db";

export const dynamic = "force-dynamic";

export default function Services() {
  const services = getServices();

  const webServices = services.filter(
    (s) => ["business-website", "ecommerce-store", "landing-page", "service-booking"].includes(s.id)
  );

  const adsServices = services.filter(
    (s) => !["business-website", "ecommerce-store", "landing-page", "service-booking"].includes(s.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Our Services
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          High-Performance Digital Solutions
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          We build robust websites and run targeted ad campaigns designed to increase leads, calls, and customer conversions for Indian MSMEs.
        </p>
      </div>

      {/* SECTION 1: Web Development & App Services */}
      <div className="space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
              Web Development & Portals
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">
            Custom Website & E-commerce Solutions
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Fast, mobile-optimized business websites, online stores, landing pages, and booking software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {webServices.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/85 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>
                    <div className="mt-2 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">
                        Delivery: {service.deliveryTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Starting From</span>
                    <span className="text-2xl font-black text-zinc-900 dark:text-white">{service.startingPrice}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider mb-3">
                    What's Included:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  Inquire for details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/unlock?topic=website-building"
                  className="flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  Unlock Tech Blueprint (₹99)
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Digital Marketing & Ads Services */}
      <div className="space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Digital Marketing & Ads
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">
            Ad Campaign Management & Organic SEO
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Targeted Google Search ads, Meta (Instagram/Facebook) campaigns, and local GMB search rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {adsServices.map((service) => {
            const isAdsCard = service.id === "google-meta-ads";
            const isSeoCard = service.id === "seo-local-marketing";

            const trustStat = isAdsCard
              ? "Avg 3.2x ROAS across managed campaigns"
              : isSeoCard
              ? "50+ local businesses ranked on Google Maps"
              : "Proven Growth Strategy";

            const minCommitment = isAdsCard
              ? "1-month minimum commitment"
              : isSeoCard
              ? "3-month minimum — organic results take time"
              : null;

            const displayPrice = service.startingPrice.includes("+ GST")
              ? service.startingPrice
              : `${service.startingPrice} + GST`;

            const unlockTopic = isAdsCard ? "running-ads" : "website-pricing";

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-200/60 dark:border-emerald-900/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700"
              >
                <div>
                  {/* Header: Title, Retainer Tag + Commitment Note, & Price with GST */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {service.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium">
                        <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md font-semibold border border-emerald-200/40 dark:border-emerald-800/40">
                          {service.deliveryTime}
                        </span>
                        {minCommitment && (
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
                            • {minCommitment}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 block">Starting From</span>
                      <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{displayPrice}</span>
                    </div>
                  </div>

                  {/* REQUIREMENT 3: AD SPEND DISCLAIMER */}
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal mt-2 leading-relaxed">
                    This is our management fee only. Your ad budget (paid directly to Google/Meta) is separate and set by you.
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* REQUIREMENT 4: TRUST STAT (between description & checklist) */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{trustStat}</span>
                  </div>

                  {/* REQUIREMENT 1: FIX TEXT TRUNCATION (Single-Column Checklist) */}
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider mb-3">
                      What's Included:
                    </h4>
                    <ul className="flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="break-words font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* REQUIREMENT 2: FIX CTA HIERARCHY */}
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Primary CTA: Solid filled button, brand accent color, larger/bolder */}
                  <Link
                    href={`/unlock?topic=${unlockTopic}`}
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:scale-[1.02] transition-all text-center w-full sm:w-auto order-1 sm:order-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Unlock Ads Playbook (₹99)</span>
                  </Link>

                  {/* Secondary CTA: Plain text link style, smaller, muted gray color */}
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center justify-center gap-1 order-2 sm:order-1"
                  >
                    <span>Inquire for details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Paywall Callout */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-8 sm:p-12 text-center shadow-md">
        {/* Glow Element */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>

        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            Premium Design & Tech-Stack Blueprint
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Want to see the full detailed pricing matrix, recommended servers, database sizing rules, WooCommerce setups, and SEO optimization guides? Unlock our blueprint guide for <strong>₹99</strong>.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-left">
            <li className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-850">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Full Pricing Matrix</span>
            </li>
            <li className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-850">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Recommended Tool Stack</span>
            </li>
            <li className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 rounded-xl border border-zinc-200/50 dark:border-zinc-850">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Client Deliverable Checklist</span>
            </li>
          </ul>

          <div className="pt-4">
            <Link
              href="/unlock?topic=website-building"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all duration-200"
              id="services-cta-unlock"
            >
              View Full Tech Blueprint for ₹99
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
