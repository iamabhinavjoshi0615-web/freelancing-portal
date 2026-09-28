import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { getCmsSettings } from "../../lib/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Terms of Service & Conditions | The Industries",
  description: "Terms of service governing the use of our website, consultancy services, and digital products.",
  openGraph: {
    title: "Terms of Service & Conditions | The Industries",
    description: "Terms of service governing the use of our website, consultancy services, and digital products.",
    images: [{ url: "/icon.png", width: 1200, height: 630, alt: "Terms of Service" }],
  },
};

export default function TermsAndConditionsPage() {
  const settings = getCmsSettings();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#18191C] text-[#F8FAFC] font-mono">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#2E313A] pb-6 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#8E95A5] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> [ BACK TO HOME ]
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#22242A] text-white border border-[#2E313A]">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xs text-[#8E95A5]">
            Effective Date: September 2026 • {settings.agencyName}
          </p>
        </div>

        <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-10 rounded-xl space-y-6 text-xs leading-relaxed text-[#9CA3AF] font-sans">
          {/* Section 1: General Site Usage Terms */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              1. General Site Usage Terms
            </h2>
            <p>
              By accessing, browsing, or using this website ({settings.agencyName}) or utilizing our interactive estimation tools and digital resource blueprints, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please refrain from using our site.
            </p>
          </section>

          {/* Section 2: Service Delivery Terms */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. Service & Product Delivery Terms
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li>
                <strong className="text-white">Digital Guides & Blueprints:</strong> All purchased guides and diagnostic blueprints are digital products and are delivered instantly upon successful payment completion via Razorpay. Access is provided immediately on-screen and/or via electronic communication.
              </li>
              <li>
                <strong className="text-white">Custom Project Work & Retainers:</strong> Website development, e-commerce builds, and performance ad management services follow individually agreed project timelines, written scopes of work, and milestone schedules. Payment terms generally require a 50% advance deposit prior to work commencement, with the remaining balance due upon completion before final access or asset handover.
              </li>
            </ul>
          </section>

          {/* Section 3: Intellectual Property */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              3. Intellectual Property Rights
            </h2>
            <p>
              All original content, site code, design assets, guides, calculators, and materials published on this website remain the exclusive property of {settings.agencyName} unless explicitly agreed otherwise in writing.
            </p>
            <p>
              For custom client projects, full ownership of custom code, design files, and domain credentials transfers completely to the client upon full payment of project invoices.
            </p>
          </section>

          {/* Section 4: Limitation of Liability */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              4. Limitation of Liability
            </h2>
            <p>
              Our guides, diagnostic calculators, and blueprints provide general informational and technical guidance based on industry best practices. Actual business outcomes, ad conversion rates, and revenue results depend entirely on individual execution, external market conditions, ad platform policies, and product-market fit. {settings.agencyName} shall not be held liable for third-party hosting disruptions or advertising campaign performance variations outside our direct scope of work.
            </p>
          </section>

          {/* Section 5: Governing Law */}
          <section className="space-y-2 border-t border-[#2E313A] pt-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of <strong className="text-white">India</strong>. Any disputes arising out of or related to the use of this website or our services shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
