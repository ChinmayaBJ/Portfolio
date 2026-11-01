"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";
import { Search } from "@/components/icons";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent("open-command-palette"));
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mod, setMod] = useState("⌘K");

  useEffect(() => {
    const isMac = /mac|iphone|ipad|ipod/i.test(
      navigator.userAgent || navigator.platform || ""
    );
    setMod(isMac ? "⌘K" : "Ctrl K");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500 ${
        scrolled || open
          ? "border-line bg-ink/80 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link className="font-mono text-sm text-bone" aria-label="Home" href="/">
          chinmaya<span className="text-ember">.</span>bj
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              className={`group relative flex items-center gap-1.5 py-1 font-mono text-[0.8rem] transition-colors hover:text-bone ${
                isActive(l.href) ? "text-bone" : "text-muted"
              }`}
              href={l.href}
            >
              <span className="text-[0.62rem] tabular-nums text-muted">
                {l.n}
              </span>
              {l.label}
              <span
                aria-hidden="true"
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ember transition-transform duration-300 ease-[var(--ease-premium)] ${
                  isActive(l.href)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search"
            onClick={openCommandPalette}
            className="group hidden h-9 items-center gap-2 rounded-md border border-line bg-surface/40 pl-2.5 pr-2 font-mono text-[0.76rem] text-muted transition-colors hover:border-ember/40 hover:text-bone md:inline-flex lg:w-56"
          >
            <Search className="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-ember" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="ml-auto rounded border border-line bg-ink/50 px-1.5 py-0.5 text-[0.65rem] leading-none text-muted">
              {mod}
            </kbd>
          </button>

          <Link
            className="hidden font-mono text-[0.8rem] text-muted transition-colors hover:text-bone md:inline-block"
            href="/resume"
          >
            Résumé
          </Link>

          <div className="hidden md:block">
            <Link
              className="block rounded-md border border-line px-4 py-2 font-mono text-[0.8rem] text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
              href="/contact"
            >
              Get in touch
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center text-bone active:text-ember md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[var(--ease-premium)] ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[var(--ease-premium)] ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Click-away overlay */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-10 h-screen w-screen cursor-default bg-transparent md:hidden ${
          open ? "" : "hidden"
        }`}
      />

      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t bg-ink/95 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-premium)] md:hidden ${
          open
            ? "grid-rows-[1fr] border-line opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col px-6 py-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                className="flex items-center gap-3 py-3 font-mono text-sm text-muted transition-colors hover:text-bone active:text-bone"
                href={l.href}
              >
                <span className="text-[0.62rem] tabular-nums text-ember/70">
                  {l.n}
                </span>
                {l.label}
              </Link>
            ))}
            <Link
              className="flex items-center gap-3 py-3 font-mono text-sm text-muted transition-colors hover:text-bone active:text-bone"
              href="/resume"
            >
              <span className="text-[0.62rem] tabular-nums text-ember/70">
                04
              </span>
              Résumé
            </Link>
            <Link
              className="mt-3 rounded-md border border-ember/50 bg-ember/10 px-4 py-3 text-center font-mono text-sm text-bone transition-colors hover:border-ember hover:bg-ember/20"
              href="/contact"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
