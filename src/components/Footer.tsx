import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link className="font-mono text-sm text-bone" href="/">
            chinmaya<span className="text-ember">.</span>bj
            </Link>
            <p className="mt-2 font-mono text-xs text-muted">
              {SITE.role}, {SITE.location}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                className="transition-colors hover:text-bone"
                href={l.href}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-5 font-mono text-xs">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-bone"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-bone"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-muted transition-colors hover:text-bone"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[0.7rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Chinmaya B J</span>
          <span>Designed and built from scratch.</span>
        </div>
      </div>
    </footer>
  );
}
