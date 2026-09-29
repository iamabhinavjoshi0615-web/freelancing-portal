"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 1. Skip if prefers-reduced-motion is enabled
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Skip on excluded routes (admin, unlock, etc.)
    if (pathname.startsWith("/admin") || pathname.startsWith("/unlock")) {
      return;
    }

    // Always activate preloader on page load
    setMounted(true);
    setProgress(0);
    setFading(false);
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 600; // 600ms smooth animation duration on every load
    let animationFrameId: number;
    let isDismissing = false;

    const dismissPreloader = () => {
      if (isDismissing) return;
      isDismissing = true;
      setProgress(100);

      setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setMounted(false);
          document.body.style.overflow = "";
        }, 150); // 150ms quick fade-out
      }, 80); // 80ms hold time
    };

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed >= duration) {
        dismissPreloader();
        return;
      }

      // Fast ease-out curve (0 to 100)
      const t = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - t, 3);
      const currentProgress = Math.min(Math.floor(easeOut * 100), 99);
      setProgress(currentProgress);

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    const handleLoad = () => {
      dismissPreloader();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (!mounted) return null;

  const formattedProgress = String(Math.min(100, Math.max(0, progress))).padStart(3, "0");

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] bg-[#18191C] flex flex-col items-center justify-center select-none transition-opacity duration-150 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center font-mono">
        {/* Brand Name */}
        <span className="text-[15px] font-medium text-[#FFFFFF] tracking-normal">
          The Industries
        </span>

        {/* Thin Progress Line (170px wide, 2px tall) */}
        <div className="w-[170px] h-[2px] bg-[#2E313A] mt-3 overflow-hidden">
          <div
            className="h-full bg-[#C1652F] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Small Muted Monospace Counter */}
        <span className="text-[11px] text-[#8E95A5] mt-2.5">
          [ {formattedProgress}% ]
        </span>
      </div>
    </div>
  );
}
