"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string | number;
  className?: string;
  durationMs?: number;
}

export default function AnimatedCounter({ value, className = "", durationMs = 1800 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [value]);

  const animateCount = () => {
    const rawString = String(value);
    // Extract first continuous number sequence or float
    const numericMatch = rawString.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
    
    if (!numericMatch) {
      setDisplayValue(rawString);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const numIndex = rawString.replace(/,/g, "").indexOf(numericMatch[0]);
    const prefix = rawString.substring(0, rawString.indexOf(numericMatch[0][0]));
    const suffix = rawString.substring(rawString.indexOf(numericMatch[0]) + numericMatch[0].length);

    const isFloat = numericMatch[0].includes(".");
    const startTime = performance.now();

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out quadratic: 1 - (1 - progress)^2
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const currentNum = targetNum * easedProgress;

      let formattedNum = "";
      if (isFloat) {
        formattedNum = currentNum.toFixed(1);
      } else {
        formattedNum = Math.floor(currentNum).toLocaleString("en-IN");
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      } else {
        // Ensure exact target at the end
        setDisplayValue(rawString);
      }
    };

    requestAnimationFrame(updateFrame);
  };

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
