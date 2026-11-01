"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { NAV_LINKS, PROJECTS, SITE } from "@/lib/site";
import { Search, CornerDownLeft } from "@/components/icons";

type Item = {
  label: string;
  hint: string;
  group: "Pages" | "Projects" | "Links";
  href: string;
  external?: boolean;
};

const ITEMS: Item[] = [
  { label: "Home", hint: "Start here", group: "Pages", href: "/" },
  ...NAV_LINKS.map(
    (l): Item => ({
      label: l.label,
      hint: `0${l.n.replace(/^0/, "")}`,
      group: "Pages",
      href: l.href,
    })
  ),
  { label: "Résumé", hint: "Experience & skills", group: "Pages", href: "/resume" },
  { label: "Get in touch", hint: "Contact", group: "Pages", href: "/contact" },
  ...PROJECTS.map(
    (p): Item => ({
      label: p.title,
      hint: p.tagline,
      group: "Projects",
      href: `/projects/${p.slug}`,
    })
  ),
  { label: "GitHub", hint: "github.com/Hades1710", group: "Links", href: SITE.github, external: true },
  { label: "LinkedIn", hint: "Connect", group: "Links", href: SITE.linkedin, external: true },
  { label: "Email", hint: SITE.email, group: "Links", href: `mailto:${SITE.email}`, external: true },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      close();
      if (item.external) {
        window.open(item.href, item.href.startsWith("mailto:") ? "_self" : "_blank");
      } else {
        router.push(item.href);
      }
    },
    [close, router]
  );

  // Global shortcuts + open event from the nav search button.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  };

  // Keep the active row scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  let runningIndex = -1;
  const groups: Item["group"][] = ["Pages", "Projects", "Links"];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm"
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[var(--radius)] border border-line bg-surface shadow-float"
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects…"
            className="h-12 w-full bg-transparent font-mono text-sm text-bone placeholder:text-muted focus:outline-none"
            aria-label="Search"
          />
          <kbd className="rounded border border-line bg-ink/50 px-1.5 py-0.5 font-mono text-[0.65rem] leading-none text-muted">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center font-mono text-sm text-muted">
              No results.
            </p>
          )}
          {groups.map((group) => {
            const groupItems = results.filter((i) => i.group === group);
            if (groupItems.length === 0) return null;
            return (
              <div key={group} className="mb-1">
                <p className="px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                  {group}
                </p>
                {groupItems.map((item) => {
                  runningIndex += 1;
                  const idx = runningIndex;
                  const isActive = idx === active;
                  return (
                    <button
                      key={item.label}
                      data-idx={idx}
                      type="button"
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2.5 text-left transition-colors ${
                        isActive ? "bg-ember/10 text-bone" : "text-bone-dim"
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-sm">{item.label}</span>
                        <span className="truncate font-mono text-xs text-muted">
                          {item.hint}
                        </span>
                      </span>
                      {isActive && (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-ember" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
