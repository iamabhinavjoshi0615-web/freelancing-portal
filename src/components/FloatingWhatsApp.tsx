"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  agencyName: string;
}

export default function FloatingWhatsApp({ phoneNumber, agencyName }: FloatingWhatsAppProps) {
  const formattedNumber = phoneNumber.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    `Hi ${agencyName}, I visited your website and would like to inquire about your Web Development & Digital Marketing services.`
  );
  const waUrl = `https://wa.me/${formattedNumber}?text=${text}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#10B981] text-white p-4 rounded-full shadow-lg hover:bg-[#059669] hover:scale-[1.05] transition-all duration-200 group focus:outline-none border border-[#10B981]/40"
      aria-label="Chat on WhatsApp"
      id="whatsapp-floating-btn"
    >
      {/* Icon */}
      <MessageCircle className="w-6 h-6 fill-current" />
      
      {/* Tooltip Label */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-sm font-bold transition-all duration-200 ease-in-out">
        Chat with Expert
      </span>
    </a>
  );
}
