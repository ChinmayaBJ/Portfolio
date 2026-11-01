"use client";

import { useEffect, useState } from "react";

// ─── Boot sequence ────────────────────────────────────────────────────────────
type LT = "header" | "cmd" | "log" | "success" | "prompt";

interface Seg {
  text: string;
  type: LT;
  /** Extra pause (ms) before typing begins on this line */
  pre?: number;
}

// Each line is concise so the full sequence completes in ~8 s before the hold.
const SEQ: Seg[] = [
  { text: "CHINMAYA OS v1.0.0 — runtime", type: "header" },
  { text: "$ boot --profile chinmaya",    type: "cmd",     pre: 600 },
  { text: "[ 0.012] kernel ............ start", type: "log" },
  { text: "[ 0.031] net: interface ..... ok",   type: "log" },
  { text: "[ 0.088] svc: llm-agents .... ok",   type: "log" },
  { text: "[ 0.142] svc: sap-btp ....... ok",   type: "log" },
  { text: "[ 0.201] ml: tensorflow ..... ok",   type: "log" },
  { text: "[ 0.234] ml: pytorch ........ ok",   type: "log" },
  { text: "[ 0.267] db: postgres ....... ok",   type: "log" },
  { text: "[ 0.288] env: flask ......... ok",   type: "log" },
  { text: "[ 0.312] env: react ......... ok",   type: "log" },
  { text: "[ 0.341] research: ieee ...... ok",  type: "log" },
  { text: "→ all layers online",               type: "success", pre: 420 },
  { text: "→ profile chinmaya loaded",         type: "success" },
  { text: "chinmaya@boot:~$ ",                 type: "prompt",  pre: 640 },
];

const CHAR_MS  = 20;   // ms per typed character
const LINE_MS  = 40;   // ms pause after each line completes
const HOLD_MS  = 3200; // ms to hold at completion before replaying

// ─── Helpers ─────────────────────────────────────────────────────────────────
const textColor = (type: LT): string => {
  switch (type) {
    case "header":  return "text-muted";
    case "cmd":     return "text-bone";
    case "log":     return "text-muted";
    case "success": return "text-ember";
    case "prompt":  return "text-bone";
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * Hero visual — a live-typing CRT boot terminal.
 * Types the 'chinmaya' profile boot sequence, loops, amber-on-dark, scanlines.
 * Replaces the previous Three.js retro-computer hero visual.
 */
export default function BootTerminal() {
  // `snap[i]` holds the currently-visible text for line i.
  const [snap, setSnap] = useState<string[]>(() => SEQ.map(() => ""));
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Per-invocation flag — safe under React Strict Mode double-invocation.
    let alive = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setSnap(SEQ.map((s) => s.text));
      setDone(true);
      return () => { alive = false; };
    }

    const sleep = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    const run = async () => {
      while (alive) {
        // ── Reset ────────────────────────────────────────────
        const buf = SEQ.map(() => "");
        setSnap([...buf]);
        setDone(false);

        // ── Type each line ───────────────────────────────────
        for (let i = 0; i < SEQ.length; i++) {
          if (!alive) return;
          const seg = SEQ[i];

          // Optional pre-line pause (cursor blinks on the empty line).
          if (seg.pre) await sleep(seg.pre);

          // Type characters one at a time.
          for (let c = 1; c <= seg.text.length; c++) {
            if (!alive) return;
            buf[i] = seg.text.slice(0, c);
            setSnap([...buf]);
            await sleep(CHAR_MS);
          }

          // Brief pause between lines.
          await sleep(LINE_MS);
        }

        // ── Hold at completion ───────────────────────────────
        if (!alive) return;
        setDone(true);
        await sleep(HOLD_MS);
      }
    };

    run();
    return () => { alive = false; };
  }, []);

  // ─── Derive cursor position ──────────────────────────────────────────────
  // Active = first line not yet fully typed (cursor blinks there during typing
  // and pre-pauses). Falls back to the last line once everything is complete.
  const activeIdx = (() => {
    for (let i = 0; i < SEQ.length; i++) {
      if ((snap[i] ?? "").length < SEQ[i].text.length) return i;
    }
    return SEQ.length - 1;
  })();

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8"
    >
      {/* Terminal card */}
      <div className="grain relative w-full max-w-[440px] overflow-hidden rounded-[var(--radius)] border border-line bg-surface/80 p-5 font-mono text-[0.72rem] shadow-panel backdrop-blur-sm sm:p-6 lg:max-w-[500px] lg:p-8 lg:text-[0.78rem]">

        {/* Window chrome — three dots + label */}
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#262b30]" />
          <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
          <span className="ml-2 text-[0.6rem] uppercase tracking-[0.22em] text-muted">
            terminal — chinmaya
          </span>
        </div>

        {/* CRT scanlines overlay — sits under text, above bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[var(--radius)]"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
          }}
        />

        {/* Boot lines */}
        <div className="relative">
          {SEQ.map((seg, i) => {
            const shown       = snap[i] ?? "";
            const isCurrent   = i === activeIdx;
            // Show cursor while typing (on the active line) or after done (at prompt).
            const showCursor  =
              (!done && isCurrent) ||
              (done && i === SEQ.length - 1);

            return (
              <div
                key={i}
                className={`overflow-hidden whitespace-pre leading-[1.6em] ${textColor(seg.type)}`}
                style={{ height: "1.6em" }}
              >
                {shown}
                {showCursor && (
                  <span
                    className="ml-px inline-block w-[0.5ch] animate-pulse bg-ember align-middle"
                    style={{ height: "0.82em" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
