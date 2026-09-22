import React from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { getServices } from "../../lib/db";
import ScrollReveal from "../../components/ScrollReveal";

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
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// SERVICES DIRECTORY</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              HIGH-PERFORMANCE DIGITAL SOLUTIONS
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl">
              We build robust websites and run targeted ad campaigns designed to increase leads, calls, and customer conversions for Indian MSMEs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1: Web Development & App Services (Light Off-White Block) */}
      <section className="bg-[#F4F4F6] text-[#18191C] border-b border-[#E2E4E8] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ScrollReveal>
            <div className="border-b border-[#E2E4E8] pb-6">
              <h2 className="text-2xl font-mono font-bold text-[#18191C]">
                Custom Website & E-commerce Solutions
              </h2>
              <p className="mt-1 text-sm text-[#526075]">
                Fast, mobile-optimized business websites, online stores, landing pages, and booking software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {webServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between p-6 sm:p-8 bg-[#FFFFFF] border border-[#E2E4E8] shadow-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 border-b border-[#E2E4E8] pb-4">
                      <div>
                        <h3 className="text-xl font-mono font-bold text-[#18191C]">
                          {service.name}
                        </h3>
                        <div className="mt-2 flex gap-3 text-xs text-[#526075] font-mono">
                          <span className="bg-[#F4F4F6] px-2.5 py-1 border border-[#E2E4E8]">
                            DELIVERY: {service.deliveryTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-[#526075] font-mono block uppercase">STARTING FROM</span>
                        <span className="text-2xl font-mono font-bold text-[#18191C]">{service.startingPrice}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-[#526075] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-6">
                      <h4 className="text-xs font-mono font-bold text-[#18191C] uppercase tracking-wider mb-3">
                        // WHAT'S INCLUDED:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#18191C]">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-[#526075]">&rarr;</span>
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#E2E4E8] flex items-center justify-between gap-4">
                    <Link
                      href="/contact"
                      className="text-xs font-mono font-bold text-[#18191C] hover:underline flex items-center gap-1"
                    >
                      Inquire for details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/unlock?topic=website-building"
                      className="btn-bracket px-4 py-2 text-xs font-mono"
                    >
                      [ UNLOCK BLUEPRINT @ ₹99 ]
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: Digital Marketing & Ads Services (Dark Charcoal Block) */}
      <section className="bg-[#18191C] text-[#E2E4E8] border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <ScrollReveal>
            <div className="border-b border-[#2E313A] pb-6">
              <h2 className="text-2xl font-mono font-bold text-[#FFFFFF]">
                Ad Campaign Management & Organic SEO
              </h2>
              <p className="mt-1 text-sm text-[#8E95A5]">
                Targeted Google Search ads, Meta (Instagram/Facebook) campaigns, and local GMB search rankings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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
                    className="flex flex-col justify-between p-6 sm:p-8 bg-[#121316] border border-[#2E313A]"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#2E313A] pb-4">
                        <div>
                          <h3 className="text-xl font-mono font-bold text-[#FFFFFF]">
                            {service.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
                            <span className="bg-[#2E313A] text-[#FFFFFF] px-2.5 py-1">
                              {service.deliveryTime}
                            </span>
                            {minCommitment && (
                              <span className="text-[11px] text-[#8E95A5]">
                                • {minCommitment}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-xs text-[#8E95A5] font-mono block uppercase">STARTING FROM</span>
                          <span className="text-2xl font-mono font-bold text-[#FFFFFF]">{displayPrice}</span>
                        </div>
                      </div>

                      {/* AD SPEND DISCLAIMER */}
                      <p className="text-[11px] font-mono text-[#8E95A5] mt-3">
                        // NOTE: Management fee only. Ad budget (paid to platforms) is separate.
                      </p>

                      {/* Description */}
                      <p className="mt-4 text-sm text-[#8E95A5] leading-relaxed">
                        {service.description}
                      </p>

                      {/* TRUST STAT */}
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#2E313A]/50 border border-[#2E313A] text-xs font-mono text-[#FFFFFF]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8E95A5] shrink-0" />
                        <span>{trustStat}</span>
                      </div>

                      {/* Single-Column Checklist */}
                      <div className="mt-6">
                        <h4 className="text-xs font-mono font-bold text-[#FFFFFF] uppercase tracking-wider mb-3">
                          // WHAT'S INCLUDED:
                        </h4>
                        <ul className="flex flex-col gap-2 text-xs font-mono text-[#E2E4E8]">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-[#8E95A5]">&rarr;</span>
                              <span className="break-words">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA HIERARCHY */}
                    <div className="mt-8 pt-6 border-t border-[#2E313A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <Link
                        href={`/unlock?topic=${unlockTopic}`}
                        className="btn-bracket px-4 py-2 text-xs font-mono text-center w-full sm:w-auto order-1 sm:order-2"
                      >
                        [ UNLOCK PLAYBOOK @ ₹99 ]
                      </Link>

                      <Link
                        href="/contact"
                        className="text-xs font-mono text-[#8E95A5] hover:text-[#FFFFFF] flex items-center justify-center gap-1 order-2 sm:order-1"
                      >
                        <span>Inquire for details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Paywall Callout (Terminal Box Style) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="terminal-box p-8 sm:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="wireframe-section-label mx-auto">// SYSTEM DIAGNOSTIC BLUEPRINT</div>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#FFFFFF]">
                PREMIUM DESIGN & TECH-STACK BLUEPRINT
              </h2>
              <p className="text-sm text-[#8E95A5] font-mono leading-relaxed">
                Want to see the full detailed pricing matrix, recommended servers, database sizing rules, WooCommerce setups, and SEO optimization guides? Unlock our blueprint guide for ₹99.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#E2E4E8] max-w-md mx-auto text-left">
                <li className="flex items-center gap-2 bg-[#121316] p-3 border border-[#2E313A]">
                  <ShieldCheck className="w-4 h-4 text-[#8E95A5] shrink-0" />
                  <span>Full Pricing Matrix</span>
                </li>
                <li className="flex items-center gap-2 bg-[#121316] p-3 border border-[#2E313A]">
                  <ShieldCheck className="w-4 h-4 text-[#8E95A5] shrink-0" />
                  <span>Recommended Tool Stack</span>
                </li>
                <li className="flex items-center gap-2 bg-[#121316] p-3 border border-[#2E313A]">
                  <ShieldCheck className="w-4 h-4 text-[#8E95A5] shrink-0" />
                  <span>Client Deliverables</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/unlock?topic=website-building"
                  className="btn-bracket px-8 py-3.5 text-sm font-mono inline-block"
                  id="services-cta-unlock"
                >
                  [ VIEW FULL TECH BLUEPRINT @ ₹99 ]
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
