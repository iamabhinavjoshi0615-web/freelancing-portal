import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { getCmsSettings } from "../../lib/db";

export const revalidate = 60;

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
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing our website ({settings.agencyName}) or purchasing any digital guide, scope calculator blueprint, or custom implementation service, you agree to be bound by these Terms & Conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. Service Delivery & Payment Terms
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li>Digital blueprints and guide unlocks are made accessible instantly on page upon payment completion via UPI/Cards/Netbanking.</li>
              <li>Custom website development and performance ad management services require a 50% advance deposit to commence project milestones, with the remaining 50% payable prior to final file/access handover.</li>
              <li>Monthly retainers for SEO and website maintenance are billed monthly in advance.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              3. Intellectual Property Rights
            </h2>
            <p>
              Upon complete payment of project invoices, clients receive 100% full ownership of custom website code, media assets, and credentials delivered by our team. There is zero vendor lock-in.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              4. Limitation of Liability
            </h2>
            <p>
              Ad spend is paid directly to advertising platforms (Google Ads, Meta Ads). {settings.agencyName} is not responsible for external ad network policy changes or third-party hosting service disruptions outside our direct control.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
