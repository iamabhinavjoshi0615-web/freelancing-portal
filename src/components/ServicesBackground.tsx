"use client";

import React from "react";

interface ServicesBackgroundProps {
  mode?: "light" | "dark";
}

export default function ServicesBackground({ mode = "dark" }: ServicesBackgroundProps) {
  const row1Phrase = "Websites · Google ads · Meta ads · SEO · Maintenance · ";
  const row2Phrase = "Landing pages · Shopify · Consulting · Hosting · ";
  const row3Phrase = "Clear quotes · Fixed scope · Real results · ";

  const row1Block = row1Phrase.repeat(5);
  const row2Block = row2Phrase.repeat(5);
  const row3Block = row3Phrase.repeat(5);

  const textColor =
    mode === "light"
      ? "text-[#1B3B2B] dark:text-[#8A9B6E]"
      : "text-[#8A9B6E] dark:text-[#8A9B6E]";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-center gap-[35px] sm:gap-[48px] py-6 select-none opacity-[0.11]"
    >
      {/* Row 1: Moves Left, 30s loop */}
      <div className="w-full overflow-hidden">
        <div className={`flex whitespace-nowrap text-[22px] sm:text-[30px] font-medium leading-none ${textColor} animate-service-scroll-left-30`}>
          <span className="shrink-0">{row1Block}</span>
          <span className="shrink-0">{row1Block}</span>
        </div>
      </div>

      {/* Row 2: Moves Right, 30s loop */}
      <div className="w-full overflow-hidden">
        <div className={`flex whitespace-nowrap text-[22px] sm:text-[30px] font-medium leading-none ${textColor} animate-service-scroll-right-30`}>
          <span className="shrink-0">{row2Block}</span>
          <span className="shrink-0">{row2Block}</span>
        </div>
      </div>

      {/* Row 3: Moves Left, 40s loop */}
      <div className="w-full overflow-hidden">
        <div className={`flex whitespace-nowrap text-[22px] sm:text-[30px] font-medium leading-none ${textColor} animate-service-scroll-left-40`}>
          <span className="shrink-0">{row3Block}</span>
          <span className="shrink-0">{row3Block}</span>
        </div>
      </div>
    </div>
  );
}
