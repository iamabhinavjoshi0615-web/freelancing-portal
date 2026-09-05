import React from "react";
import { getPricingTiers } from "../../lib/db";
import PricingPageClient from "../../components/PricingPageClient";

export const dynamic = "force-dynamic";

export default function Pricing() {
  const tiers = getPricingTiers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-200/30">
          Charges & Estimates
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Transparent Consultancy Pricing
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          No hidden fees, no opaque markup. Review our standard base rates for developer retainers, setups, domains, and cloud server configurations.
        </p>
      </div>

      {/* Render the Client Estimator & Tables */}
      <PricingPageClient initialTiers={tiers} />
    </div>
  );
}
