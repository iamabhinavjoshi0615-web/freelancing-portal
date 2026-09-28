import React from "react";
import type { Metadata } from "next";
import { getPricingTiers } from "../../lib/db";
import PricingPageClient from "../../components/PricingPageClient";
import ScrollReveal from "../../components/ScrollReveal";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Transparent Web Development & Ad Management Pricing | The Industries",
  description: "Clear, fixed-scope pricing for business websites, landing pages, e-commerce stores, Google/Meta ads management, and local SEO. No hidden fees or recurring hosting markups.",
  openGraph: {
    title: "Transparent Web Development & Ad Management Pricing | The Industries",
    description: "Clear, fixed-scope pricing for business websites, landing pages, e-commerce stores, Google/Meta ads management, and local SEO.",
    images: [{ url: "/icon.png", width: 1200, height: 630, alt: "The Industries Pricing" }],
  },
};

export default function Pricing() {
  const tiers = getPricingTiers();

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// CHARGES & ESTIMATES</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              TRANSPARENT CONSULTANCY PRICING
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans">
              No hidden fees, no opaque markup. Review our standard base rates for developer retainers, setups, domains, and cloud server configurations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Pricing Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <PricingPageClient initialTiers={tiers} />
      </section>
    </div>
  );
}
