import React from "react";
import { getProjects } from "../../lib/db";
import PortfolioPageClient from "../../components/PortfolioPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Work & Portfolio | Guruji Digital & Tech India",
  description: "View case studies of e-commerce store builds, custom business websites, and lead generation campaigns delivered for Indian small business owners.",
};

export default function Portfolio() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Our Work
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Completed Client Case Studies
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          Browse our portfolio showing how we build fast, high-converting digital assets and ads for businesses across India.
        </p>
      </div>

      {/* Main Portfolio Grid */}
      <PortfolioPageClient initialProjects={projects} />
    </div>
  );
}
