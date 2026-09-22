"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string | number;
  className?: string;
  durationMs?: number;
}

export default function AnimatedCounter({ value, className = "", durationMs = 1800 }: AnimatedCounterProps) {
  const rawString = String(value);
  const [displayValue, setDisplayValue] = useState<string>(rawString);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const match = rawString.match(/^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/);
      if (!match) {
        setDisplayValue(rawString);
        return;
      }

      const prefix = match[1];
      const numStr = match[2];
      const suffix = match[3];
      const targetNum = parseFloat(numStr.replace(/,/g, ""));

      if (isNaN(targetNum) || targetNum === 0) {
        setDisplayValue(rawString);
        return;
      }

      const isFloat = numStr.includes(".");
      const startTime = performance.now();

      const updateFrame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        const currentNum = targetNum * easedProgress;

        let formattedNum = "";
        if (isFloat) {
          formattedNum = currentNum.toFixed(1);
        } else {
          formattedNum = Math.round(currentNum).toLocaleString("en-IN");
        }

        if (progress < 1) {
          setDisplayValue(`${prefix}${formattedNum}${suffix}`);
          requestAnimationFrame(updateFrame);
        } else {
          setDisplayValue(rawString);
        }
      };

      // Set initial count value to 0 before animation begins
      setDisplayValue(`${prefix}0${suffix}`);
      requestAnimationFrame(updateFrame);
    };

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry && (entry.isIntersecting || entry.intersectionRatio > 0)) {
            startAnimation();
            observer.unobserve(element);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return () => {
        if (element) observer.unobserve(element);
      };
    } else {
      startAnimation();
    }
  }, [rawString, durationMs]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
