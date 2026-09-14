import React from "react";
import { Mail, Phone, MapPin, ExternalLink, MessageCircle } from "lucide-react";
import { getCmsSettings } from "../../lib/db";
import ContactForm from "../../components/ContactForm";
import ScrollReveal from "../../components/ScrollReveal";

export const dynamic = "force-dynamic";

export default function Contact() {
  const settings = getCmsSettings();

  const waText = encodeURIComponent(
    `Hi ${settings.agencyName}, I would like to book a consultation regarding my business.`
  );
  const waUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${waText}`;

  return (
    <div className="w-full bg-[#18191C] text-[#E2E4E8]">
      {/* Page Header (Dark Charcoal Block) */}
      <section className="border-b border-[#2E313A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="wireframe-section-label mb-4">// GET IN TOUCH</div>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-[#FFFFFF] max-w-3xl">
              START YOUR DIGITAL PROJECT
            </h1>
            <p className="mt-4 text-[#8E95A5] text-base sm:text-lg max-w-2xl font-sans">
              Ready to scale? Connect with our development and marketing consultants. Book a direct call or drop an inquiry.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content (Light Off-White Section) */}
      <section className="bg-[#F4F4F6] text-[#18191C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-mono">
          {/* Left Side: Contact Cards & Booking */}
          <div className="lg:col-span-5 space-y-8">
            {/* Booking Card */}
            <ScrollReveal>
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 sm:p-8 space-y-4 text-[#18191C]">
                <div>
                  <span className="text-[10px] text-[#526075] font-mono font-bold uppercase block">// FREE CONSULTATION</span>
                  <h3 className="text-lg font-mono font-bold text-[#18191C]">Book 10-Min Discovery Call</h3>
                </div>
                <p className="text-xs text-[#526075] leading-relaxed font-sans">
                  Schedule a brief 10-minute briefing call with our lead developer to clarify your ideas, tech options, and timeline estimations.
                </p>
                <a
                  href={settings.consultationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bracket w-full py-3.5 text-xs text-center inline-block"
                  id="calendly-booking-btn"
                >
                  [ SCHEDULE DISCOVERY CALL &rarr; ]
                </a>
              </div>
            </ScrollReveal>

            {/* Quick WhatsApp Action */}
            <ScrollReveal>
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 space-y-4 text-[#18191C]">
                <h3 className="text-xs font-mono font-bold text-[#18191C] uppercase">
                  // IMMEDIATE ASSISTANCE
                </h3>
                <p className="text-xs text-[#526075] leading-relaxed font-sans">
                  Skip forms entirely. Click below to message our engineering team directly on WhatsApp.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#18191C] text-[#FFFFFF] font-mono text-xs font-bold w-full text-center inline-flex items-center justify-center gap-2 hover:bg-[#2E313A]"
                  id="whatsapp-contact-page-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  [ CHAT ON WHATSAPP ]
                </a>
              </div>
            </ScrollReveal>

            {/* Core Info Details */}
            <ScrollReveal>
              <div className="bg-[#FFFFFF] border border-[#E2E4E8] p-6 space-y-4 text-xs font-mono text-[#18191C]">
                <h3 className="text-xs font-mono font-bold text-[#18191C] uppercase pb-2 border-b border-[#E2E4E8]">
                  // CONTACT INFORMATION
                </h3>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#526075] shrink-0" />
                  <a href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`} className="hover:underline text-[#18191C]">
                    {settings.contactPhone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#526075] shrink-0" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:underline text-[#18191C]">
                    {settings.contactEmail}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#526075] shrink-0 mt-0.5" />
                  <span className="leading-tight text-[#526075]">{settings.officeAddress}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
