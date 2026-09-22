"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Terminal, CheckCircle2 } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface FooterProps {
  agencyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  experienceYears: number;
  satisfiedClients: number;
  projectsCompleted: number;
  adBudgetManaged: string;
}

export default function Footer({
  agencyName,
  tagline,
  phone,
  email,
  address,
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState("");
  const [subscribeErr, setSubscribeErr] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setSubscribeErr("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    setSubscribeErr("");
    setSubscribedMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribedMsg(data.message || "Subscribed! You'll receive free tips in your inbox.");
        setNewsletterEmail("");
      } else {
        setSubscribeErr(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setSubscribeErr("Network error. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="w-full border-t border-[#2E313A] bg-[#18191C] text-[#E2E4E8] mt-auto">
      {/* Trust Metrics Banner */}
      <div className="border-b border-[#2E313A] bg-[#121316]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center font-mono">
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C] rounded-lg">
              <div className="flex items-center justify-center w-7 h-7 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 text-xs">
                01
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                <AnimatedCounter value="10+" />
              </span>
              <span className="text-[11px] sm:text-xs text-[#8E95A5] uppercase tracking-wider mt-1">PROJECTS DELIVERED</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C] rounded-lg">
              <div className="flex items-center justify-center w-7 h-7 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 text-xs">
                02
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                <AnimatedCounter value="3+" />
              </span>
              <span className="text-[11px] sm:text-xs text-[#8E95A5] uppercase tracking-wider mt-1">CLIENTS SERVED</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C] rounded-lg">
              <div className="flex items-center justify-center w-7 h-7 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 text-xs">
                03
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                <AnimatedCounter value="3+" />
              </span>
              <span className="text-[11px] sm:text-xs text-[#8E95A5] uppercase tracking-wider mt-1">YEARS OF ENGINEERING</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C] rounded-lg">
              <div className="flex items-center justify-center w-7 h-7 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 text-xs">
                04
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-[#FFFFFF]">
                <AnimatedCounter value="500+" />
              </span>
              <span className="text-[11px] sm:text-xs text-[#8E95A5] uppercase tracking-wider mt-1">INDIAN SMBs GUIDED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Email Newsletter Capture Banner */}
        <div className="p-6 sm:p-8 bg-[#121316] border border-[#2E313A] rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl font-mono">
              <span className="text-[10px] font-bold text-[#8E95A5] uppercase tracking-widest block">
                // FREE INSIGHTS NEWSLETTER
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                Not ready to unlock a guide yet? Get free tips on pricing & ads straight to your inbox.
              </h3>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-3 font-mono shrink-0 w-full md:w-auto">
              <input
                type="email"
                required
                placeholder="your.email@company.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-[#18191C] border border-[#2E313A] text-white px-4 py-2.5 text-xs focus:outline-none focus:border-white rounded-lg w-full sm:w-64"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="btn-bracket bg-white text-[#18191C] hover:bg-[#E2E4E8] border-white px-5 py-2.5 text-xs font-bold shrink-0 text-center"
              >
                {subscribing ? "SUBSCRIBING..." : "[ SUBSCRIBE ]"}
              </button>
            </form>
          </div>

          {subscribedMsg && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] bg-[#10B981]/10 p-3 rounded border border-[#10B981]/30">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
              <span>{subscribedMsg}</span>
            </div>
          )}
          {subscribeErr && (
            <div className="text-xs font-mono text-[#EF4444] bg-[#EF4444]/10 p-3 rounded border border-[#EF4444]/30">
              {subscribeErr}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-[#2E313A] text-white">
                <Terminal className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight font-mono text-[#FFFFFF] uppercase">
                {agencyName}
              </span>
            </div>
            <p className="text-sm text-[#8E95A5] max-w-sm leading-relaxed font-sans">
              {tagline}
            </p>
            <p className="text-xs text-[#8E95A5] font-mono border-l-2 border-[#526075] pl-3 py-1">
              Empowering MSMEs & Startups with high-ROI consultancy and transparent pricing structure.
            </p>
          </div>

          {/* Column 2: Navigation & Legal Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-[#8E95A5] uppercase tracking-wider">// Quick Directory & Legal</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs font-mono">
              <li>
                <Link href="/" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Home ]</Link>
              </li>
              <li>
                <Link href="/services" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Services ]</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Pricing ]</Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Portfolio ]</Link>
              </li>
              <li>
                <Link href="/unlock" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Guides ]</Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Resources ]</Link>
              </li>
              <li>
                <Link href="/about" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ About Us ]</Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Get Quote ]</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Privacy Policy ]</Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Terms & Conditions ]</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ Refund Policy ]</Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ CMS Admin ]</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-[#8E95A5] uppercase tracking-wider">// Contact Info</h3>
            <ul className="space-y-2 text-xs font-mono text-[#8E95A5]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8E95A5] shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline hover:text-[#FFFFFF]">{phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8E95A5] shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline hover:text-[#FFFFFF]">{email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8E95A5] shrink-0 mt-0.5" />
                <span className="leading-tight">{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Banner with GSTIN Display */}
        <div className="mt-12 pt-8 border-t border-[#2E313A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#8E95A5]">
            &copy; {new Date().getFullYear()} {agencyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#8E95A5]">
            <span>[ SYSTEM DEPLOYED ] GST Registered Invoices available.</span>
            <span className="text-white border-l border-[#2E313A] pl-3">GSTIN: XXXXXXXXXXXXXXX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
