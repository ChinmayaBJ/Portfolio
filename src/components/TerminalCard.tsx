"use client";

import { useEffect, useRef, useState } from "react";

type Line = { text: string; color: string };

// Right-aligned "ok" with dot leaders, matching the production boot card.
const row = (label: string) =>
  `${label} ${".".repeat(Math.max(3, 22 - label.length))} ok`;

const LINES: Line[] = [
  { text: "$ boot --profile chinmaya", color: "text-bone" },
  { text: row("llm-agents"), color: "text-muted" },
  { text: row("sap-btp"), color: "text-muted" },
  { text: row("ml-research"), color: "text-muted" },
  { text: row("ieee-papers"), color: "text-muted" },
  { text: "→ all layers online", color: "text-ember" },
];

const TOTAL = LINES.reduce((n, l) => n + l.text.length, 0);

export default function TerminalCard() {
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setChars(TOTAL);
      setDone(true);
      return;
    }
    let count = 0;
    let acc = 0;
    let last = performance.now();
    let holding = 0;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (count < TOTAL) {
        acc += dt;
        // ~28ms per character
        while (acc > 28 && count < TOTAL) {
          acc -= 28;
          count += 1;
          setChars(count);
        }
      } else {
        holding += dt;
        setDone(true);
        if (holding > 3200) {
          count = 0;
          holding = 0;
          setDone(false);
          setChars(0);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Distribute the typed character budget across lines.
  let remaining = chars;
  const rendered = LINES.map((l) => {
    const take = Math.max(0, Math.min(l.text.length, remaining));
    remaining -= take;
    const typing = take > 0 && take < l.text.length;
    const started = take > 0 || remaining < 0;
    return { ...l, shown: l.text.slice(0, take), typing, started };
  });

  // Which line currently holds the caret.
  const activeIdx = (() => {
    let acc = 0;
    for (let i = 0; i < LINES.length; i++) {
      acc += LINES[i].text.length;
      if (chars <= acc) return i;
    }
    return LINES.length - 1;
  })();

  return (
    <div className="mt-12 max-w-sm">
      <div
        aria-hidden="true"
        className="grain w-full max-w-sm rounded-[var(--radius)] border border-line bg-surface/60 p-4 font-mono text-[0.72rem] leading-relaxed shadow-panel backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
          <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
          <span className="ml-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            session
          </span>
        </div>
        <div className="overflow-hidden">
          {rendered.map((l, i) => (
            <div
              key={i}
              className={`h-[1.45em] overflow-hidden whitespace-pre leading-[1.45em] ${l.color}`}
            >
              {l.shown}
              {!done && i === activeIdx && (
                <span className="ml-px inline-block h-3 w-[0.5ch] animate-pulse bg-ember align-middle" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
