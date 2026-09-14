"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Award, CheckCircle2, TrendingUp, Terminal } from "lucide-react";
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
  experienceYears,
  satisfiedClients,
  projectsCompleted,
  adBudgetManaged,
}: FooterProps) {
  return (
    <footer className="w-full border-t border-[#2E313A] bg-[#18191C] text-[#E2E4E8] mt-auto">
      {/* Trust Metrics Banner */}
      <div className="border-b border-[#2E313A] bg-[#121316]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C]">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 font-mono text-xs">
                01
              </div>
              <span className="text-2xl font-bold font-mono text-[#FFFFFF]">
                <AnimatedCounter value={`${projectsCompleted}+`} />
              </span>
              <span className="text-xs text-[#8E95A5] font-mono mt-1">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C]">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 font-mono text-xs">
                02
              </div>
              <span className="text-2xl font-bold font-mono text-[#FFFFFF]">
                <AnimatedCounter value={`${satisfiedClients}+`} />
              </span>
              <span className="text-xs text-[#8E95A5] font-mono mt-1">Clients Served</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-[#2E313A] bg-[#18191C]">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[#2E313A]/50 text-[#8E95A5] mb-2 font-mono text-xs">
                03
              </div>
              <span className="text-2xl font-bold font-mono text-[#FFFFFF]">
                <AnimatedCounter value={`${experienceYears}+ Years`} />
              </span>
              <span className="text-xs text-[#8E95A5] font-mono mt-1">Years of Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
            <p className="text-sm text-[#8E95A5] max-w-sm leading-relaxed">
              {tagline}
            </p>
            <p className="text-xs text-[#8E95A5] font-mono border-l-2 border-[#526075] pl-3 py-1">
              Empowering MSMEs & Startups with high-ROI consultancy and transparent pricing structure.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-[#8E95A5] uppercase tracking-wider">// Quick Directory</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm font-mono">
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
                <Link href="/admin" className="text-[#8E95A5] hover:text-[#FFFFFF] transition-colors">[ CMS Admin ]</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-[#8E95A5] uppercase tracking-wider">// Contact Info</h3>
            <ul className="space-y-2 text-sm font-mono text-[#8E95A5]">
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

        {/* Lower Banner */}
        <div className="mt-12 pt-8 border-t border-[#2E313A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#8E95A5]">
            &copy; {new Date().getFullYear()} {agencyName}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-mono text-[#8E95A5]">
            <span>[ SYSTEM DEPLOYED ] GST Registered Invoices available.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
