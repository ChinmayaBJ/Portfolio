"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated count-up used for the ATS Screener "users served" metric.
 * Reproduces the production structure: an invisible target reserves width
 * while an absolutely-positioned value animates up on first view.
 */
export default function CountUp({
  target = 2000,
  suffix = "+",
  display = "2,000+",
  duration = 1600,
}: {
  target?: number;
  suffix?: string;
  display?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const shown =
    value >= target ? display : `${value.toLocaleString("en-US")}${suffix}`;

  return (
    <span
      ref={ref}
      className="relative inline-block [font-variant-numeric:tabular-nums]"
    >
      <span aria-hidden="true" className="invisible">
        {display}
      </span>
      <span className="absolute inset-0">{shown}</span>
    </span>
  );
}
