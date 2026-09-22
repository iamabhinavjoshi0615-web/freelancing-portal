"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock, Terminal } from "lucide-react";

interface HeaderProps {
  agencyName: string;
}

export default function Header({ agencyName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pay & Unlock", href: "/unlock" },
    { name: "Resources", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E4E8] bg-[#F4F4F6]/90 backdrop-blur-xl transition-all duration-300 ease-out shadow-xs text-[#111827]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Icon */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18191C] text-white shadow-xs group-hover:scale-105 active:scale-95 transition-transform duration-300 ease-out">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#111827] transition-colors duration-200">
                {agencyName}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#FFFFFF] p-1 rounded-lg border border-[#E2E4E8] shadow-xs">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-mono font-semibold transition-all duration-200 ease-out rounded-md flex items-center gap-1.5 active:scale-95 ${
                  active
                    ? "bg-[#18191C] text-white shadow-xs"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F4F4F6]"
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/unlock"
            className="flex items-center gap-1.5 rounded-lg bg-[#18191C] hover:bg-[#22242A] px-4 py-2 text-xs font-mono font-bold text-white shadow-xs hover:scale-[1.02] transition-all duration-200"
            id="nav-cta-unlock"
          >
            <Lock className="w-3.5 h-3.5 text-white" />
            <span>[ UNLOCK @ ₹99 ]</span>
          </Link>
        </div>

        {/* Medium Screen Quick Action (sm to lg) */}
        <div className="hidden sm:flex lg:hidden items-center gap-2">
          <Link
            href="/unlock"
            className="flex items-center gap-1 rounded-lg bg-[#18191C] text-white px-3 py-1.5 text-xs font-mono font-bold shadow-xs hover:scale-[1.02] transition-all"
          >
            <Lock className="w-3 h-3 text-white" />
            <span>[ UNLOCK @ ₹99 ]</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#111827] hover:bg-[#FFFFFF] border border-[#E2E4E8] focus:outline-none transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#E2E4E8] bg-[#FFFFFF] px-4 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-mono font-bold transition-all ${
                    active
                      ? "text-white bg-[#18191C]"
                      : "text-[#4B5563] hover:bg-[#F4F4F6] hover:text-[#111827]"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-[#E2E4E8]">
            <Link
              href="/unlock"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#18191C] hover:bg-[#22242A] py-3 text-xs font-mono font-bold text-white shadow-xs hover:scale-[1.01] transition-all"
            >
              <Lock className="w-4 h-4 text-white" />
              <span>[ UNLOCK GUIDES @ ₹99 ]</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
