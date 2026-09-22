import React from "react";
import Link from "next/link";
import { Lock, Shield, ArrowLeft } from "lucide-react";
import { getCmsSettings } from "../../lib/db";

export const dynamic = "force-dynamic";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs text-[#8E95A5]">
            Effective Date: September 2026 • Last updated for {settings.agencyName}
          </p>
        </div>

        <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-10 rounded-xl space-y-6 text-xs leading-relaxed text-[#9CA3AF] font-sans">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you use our website, consult our tools, or purchase digital diagnostic blueprints, we collect personal information required to process your transaction and provide consulting services:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li>Contact details: Full Name, Email Address, and Phone/WhatsApp Number.</li>
              <li>Transaction data: Payment confirmation details processed securely via Razorpay payment gateway. (Note: We do not store full credit/debit card numbers or UPI PINs on our servers).</li>
              <li>Technical usage data: Diagnostic calculator selections, device browser type, and page access timestamps.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. How We Use Your Data
            </h2>
            <p>
              We strictly utilize your collected data for the following operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li>Instantly unlocking and delivering digital consultancy blueprints upon payment confirmation.</li>
              <li>Sending transaction receipts, WhatsApp/Email service updates, and scheduling discovery calls.</li>
              <li>Providing technical customer support for custom web builds and ad campaign setups.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              3. Data Non-Disclosure & Security
            </h2>
            <p>
              We maintain a zero-spam policy. <strong className="text-white">We do not sell, rent, or trade your personal data to third parties.</strong> All payment processing is encrypted end-to-end through Razorpay PCI-DSS compliant infrastructure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              4. Contact for Privacy & Data Queries
            </h2>
            <p>
              If you have questions regarding your personal data or wish to request data correction/deletion, please contact our team:
            </p>
            <div className="p-4 bg-[#18191C] border border-[#2E313A] font-mono text-xs text-[#E2E4E8] space-y-1">
              <p>Email: <a href={`mailto:${settings.contactEmail}`} className="underline text-white">{settings.contactEmail}</a></p>
              <p>Phone: <a href={`tel:${settings.contactPhone}`} className="underline text-white">{settings.contactPhone}</a></p>
              <p>Office: {settings.officeAddress}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
