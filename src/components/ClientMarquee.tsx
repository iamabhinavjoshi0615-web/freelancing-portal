"use client";

import React from "react";

export default function ClientMarquee() {
  const clientNames = [
    "Kumar Garments",
    "Apex Diagnostics",
    "Elite Properties",
    "Pandit Maa Baglamukhi",
  ];

  // Repeat items for seamless looping
  const marqueeList = [...clientNames, ...clientNames, ...clientNames, ...clientNames];

  return (
    <section className="bg-[#121316] border-b border-[#2E313A] py-5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-3 text-center">
        <span className="text-[11px] font-mono font-medium text-[#8E95A5] uppercase tracking-widest block">
          Trusted by businesses across India
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-6 shrink-0">
          {marqueeList.map((name, idx) => (
            <React.Fragment key={idx}>
              <span className="font-mono text-xs font-medium text-[#8E95A5] hover:text-[#FFFFFF] transition-colors cursor-default">
                {name}
              </span>
              <span className="text-[#8E95A5]/40 text-[10px] font-mono font-bold select-none">
                •
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
