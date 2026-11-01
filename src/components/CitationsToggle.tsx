"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/icons";

type Citation = { title: string; venue: string };

export default function CitationsToggle({ citations }: { citations: Citation[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-line/50 pt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-bone"
      >
        <span className="h-px w-3 bg-ember/40" />
        Cited by IEEE conferences, Springer, and international journals
        <ChevronDown
          className={`h-3 w-3 shrink-0 text-ember/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="mt-3 space-y-1.5">
          {citations.map((c) => (
            <li key={c.title} className="flex items-baseline gap-2.5 font-mono text-[0.72rem]">
              <span className="mt-[0.4em] h-px w-3 shrink-0 bg-ember/40" />
              <span className="text-bone-dim">{c.title}</span>
              <span className="shrink-0 text-muted">·</span>
              <span className="shrink-0 text-muted">{c.venue}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
