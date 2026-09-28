import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { getCmsSettings } from "../../lib/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy | The Industries",
  description: "Privacy policy detailing how we collect, use, and protect your information at The Industries.",
  openGraph: {
    title: "Privacy Policy | The Industries",
    description: "Privacy policy detailing how we collect, use, and protect your information at The Industries.",
    images: [{ url: "/icon.png", width: 1200, height: 630, alt: "Privacy Policy" }],
  },
};

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
            Effective Date: September 2026 • {settings.agencyName}
          </p>
        </div>

        <div className="bg-[#121316] border border-[#2E313A] p-6 sm:p-10 rounded-xl space-y-6 text-xs leading-relaxed text-[#9CA3AF] font-sans">
          {/* Section 1: Information We Collect */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you interact with our site, consult our estimation tools, or purchase digital guides/services, we collect the following personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li><strong className="text-white">Contact Information:</strong> Full Name, Email Address, and Phone / WhatsApp Number.</li>
              <li><strong className="text-white">Quiz & Estimator Responses:</strong> Selections made during project estimation quizzes (e.g., website type, feature requirements, budget preferences).</li>
              <li><strong className="text-white">Payment Details:</strong> Transactions are processed securely via Razorpay. Full card details, banking credentials, and UPI PINs are processed on Razorpay&apos;s encrypted servers and are <strong className="text-white">never stored on our servers</strong>.</li>
            </ul>
          </section>

          {/* Section 2: Why Information is Collected */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              2. Purpose of Collection
            </h2>
            <p>We collect and use your data strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#E2E4E8]">
              <li>To generate and provide personalized project estimates and technical advice.</li>
              <li>To securely process payments for digital guide unlocks and service retainers.</li>
              <li>To deliver purchased digital guides, blueprints, and project deliverables instantly.</li>
              <li>To optionally follow up via WhatsApp or email regarding your inquiry if you have explicitly opted in.</li>
            </ul>
          </section>

          {/* Section 3: Data Sharing & Third Parties */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              3. Data Non-Disclosure & Third-Party Sharing
            </h2>
            <p>
              We enforce a strict confidentiality and zero-spam policy. <strong className="text-white">Your personal data is never sold, rented, or shared with third parties for marketing purposes.</strong> Data is shared only with trusted infrastructure providers (such as Razorpay for payment processing or messaging tools for delivering purchased guides) strictly as required to process payments or deliver requested services.
            </p>
          </section>

          {/* Section 4: Data Retention & User Rights */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              4. Data Retention & User Rights
            </h2>
            <p>
              We retain transaction records and inquiry data only as long as necessary to maintain active service records, fulfill legal obligations, and support past purchasers.
            </p>
            <p>
              <strong className="text-white">Your Rights:</strong> You have full control over your data. You may request access to, correction of, or deletion of your personal information at any time by contacting our support team.
            </p>
          </section>

          {/* Section 5: Cookies & Analytics Disclosure */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              5. Cookie Usage & Analytics Disclosure
            </h2>
            <p>
              Our website uses cookies and lightweight analytics tools to understand visitor interactions, track page performance, and enhance user navigation. These cookies help us optimize loading speeds and measure the effectiveness of our resource guides. You can manage or disable cookie preferences directly through your web browser settings.
            </p>
          </section>

          {/* Section 6: Contact Us */}
          <section className="space-y-2 border-t border-[#2E313A] pt-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              6. Contact for Privacy Inquiries
            </h2>
            <p>
              For any questions regarding this Privacy Policy, data access requests, or deletion inquiries, please reach out to us:
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
