import React from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft, CheckCircle2 } from "lucide-react";
import { getCmsSettings } from "../../lib/db";

export const revalidate = 60;

export default function RefundPolicyPage() {
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
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Refund & Cancellation Policy
            </h1>
          </div>
          <p className="text-xs text-[#8E95A5]">
            Effective Date: September 2026 • {settings.agencyName}
          </p>
        </div>

        <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-10 rounded-xl space-y-6 text-xs leading-relaxed text-[#9CA3AF] font-sans">
          <div className="bg-[#18191C] border-l-4 border-white p-4 font-mono text-xs text-white space-y-1">
            <h3 className="font-bold">// 100% SERVICE CREDIT GUARANTEE</h3>
            <p className="text-[#9CA3AF] font-sans text-xs">
              Every ₹99 or ₹249 blueprint unlock payment you make is 100% credited (deducted) towards your final invoice if you hire our team for full project execution or ad management.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              1. Digital Blueprint Unlocks (₹99 / ₹249)
            </h2>
            <p>
              Due to the instant, downloadable digital nature of our proprietary consulting handbooks, calculators, and supplier lists, all ₹99 and ₹249 guide unlocks are non-refundable once unlocked.
            </p>
            <p>
              However, as part of our transparency promise, <strong className="text-white">100% of the money you pay for any guide unlock will be fully credited towards your final service invoice</strong> if you choose to hire {settings.agencyName} for website development or marketing campaign execution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. Custom Development & Ad Management Services
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li>Cancellations requested prior to the start of design mockups or code development will receive a full refund minus payment processing gateway fees.</li>
              <li>Once work has commenced following approval of project scope, partial refunds are calculated based on completed milestones.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              3. Requesting Assistance or Billing Credit
            </h2>
            <p>
              To claim your ₹99/₹249 credit on a service invoice or inquire about billing, contact us:
            </p>
            <div className="p-4 bg-[#18191C] border border-[#2E313A] font-mono text-xs text-[#E2E4E8] space-y-1">
              <p>Email: <a href={`mailto:${settings.contactEmail}`} className="underline text-white">{settings.contactEmail}</a></p>
              <p>Phone: <a href={`tel:${settings.contactPhone}`} className="underline text-white">{settings.contactPhone}</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
