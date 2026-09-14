import React from "react";
import { getProjects } from "../../lib/db";
import PortfolioPageClient from "../../components/PortfolioPageClient";
import ScrollReveal from "../../components/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Work & Portfolio | Guruji Digital & Tech India",
  description: "View case studies of e-commerce store builds, custom business websites, and lead generation campaigns delivered for Indian small business owners.",
};

export default function Portfolio() {
  const projects = getProjects();

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// OUR WORK & CASE STUDIES</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              COMPLETED CLIENT CASE STUDIES
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans">
              Browse our portfolio showing how we build fast, high-converting digital assets and ads for businesses across India.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Portfolio Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <PortfolioPageClient initialProjects={projects} />
      </section>
    </div>
  );
}
