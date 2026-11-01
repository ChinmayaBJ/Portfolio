import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CopyButton from "@/components/CopyButton";
import CountUp from "@/components/CountUp";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { CASE_STUDIES, CASE_SLUGS, type CaseStudy } from "@/lib/caseStudies";

// Statically generated per-slug (generateStaticParams); allow the route to
// block on `params` rather than requiring a Suspense shell under cacheComponents.
export const instant = false;

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const cs = CASE_STUDIES[slug];
  if (!cs) return { title: "Not found" };
  return {
    title: cs.title,
    description: cs.tagline,
  };
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function OrcidMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="#A6CE39" d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" />
      <g fill="#FFF">
        <path d="M86.3 186.2H70.9V79.1h15.4v107.1z" />
        <path d="M108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7 0-21.5-13.7-39.7-43.7-39.7h-23.7v79.4z" />
        <path d="M88.7 56.8c0 5.5-4.5 10.1-10.1 10.1s-10.1-4.6-10.1-10.1c0-5.6 4.5-10.1 10.1-10.1 5.6 0 10.1 4.6 10.1 10.1z" />
      </g>
    </svg>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
      <span className="h-px w-7 bg-line" aria-hidden="true" />
      {children}
    </span>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const cs: CaseStudy | undefined = CASE_STUDIES[slug];
  if (!cs) notFound();

  return (
    <div className="pb-28 pt-28">
      {/* ── Header ── */}
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <Link
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-bone"
          href="/projects"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <div className="mt-9 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="tabular-nums text-ember">{cs.year}</span>
          <span className="h-px w-6 bg-line" />
          <span className="text-muted">{cs.tagline}</span>
          {cs.active && (
            <>
              <span className="h-px w-6 bg-line" />
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ember">
                <StatusDot />
                Actively maintained
              </span>
            </>
          )}
        </div>

        <h1 className="mt-4 font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.03em] text-bone sm:text-6xl">
          {cs.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim sm:text-xl">
          {cs.lead}
        </p>

        <div className="mt-7 flex items-center gap-6 font-mono text-sm">
          {cs.links.map((l) =>
            l.icon === "github" ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  l.variant === "ember"
                    ? "text-ember hover:text-ember-bright"
                    : "text-muted hover:text-bone"
                }`}
              >
                <GithubMark className="h-4 w-4" />
                {l.label}
              </a>
            ) : (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 transition-colors ${
                  l.variant === "ember"
                    ? "text-ember hover:text-ember-bright"
                    : "text-muted hover:text-bone"
                }`}
              >
                {l.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )
          )}
        </div>

        {/* Metrics / badges */}
        {cs.metrics === "ats" ? (
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="https://ats-screener.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group/metric flex items-baseline gap-1.5"
            >
              <span className="font-display text-2xl font-semibold text-bone transition-colors group-hover/metric:text-ember">
                <CountUp />
              </span>
              <span
                className="relative -ml-0.5 inline-flex h-[7px] w-[7px] self-center"
                title="Live count, updated in real time"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400 ring-2 ring-emerald-400/15" />
                <span className="sr-only">live</span>
              </span>
              <span className="font-mono text-xs text-muted">users served</span>
            </a>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-semibold text-bone transition-colors group-hover/metric:text-ember">
                6
              </span>
              <span className="font-mono text-xs text-muted">
                real ATS engines
              </span>
            </div>
          </div>
        ) : cs.badges ? (
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            {cs.badges.map((b) => (
              <a
                key={b.alt}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.img} alt={b.alt} className="h-[1.35rem]" />
              </a>
            ))}
          </div>
        ) : null}
      </div>

      {/* ── Hero image ── */}
      <div className="mx-auto mt-14 w-full max-w-6xl px-6 sm:px-10">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-ember/20 via-ember/5 to-transparent blur-3xl"
              />
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-float">
                <div className="flex items-center gap-1.5 border-b border-line bg-ink/50 px-3.5 py-2.5">
                  <span aria-hidden="true" className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
                    <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
                    <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
                  </span>
                  {cs.browserLabel && (
                    <span className="ml-3 truncate font-mono text-[0.65rem] text-muted">
                      {cs.browserLabel}
                    </span>
                  )}
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover ${cs.objectClass ?? "object-top"} transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Body + sidebar ── */}
      <div className="mx-auto mt-16 grid w-full max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-bone-dim">
          {cs.body.map((para, i) => (
            <Reveal key={i}>{para}</Reveal>
          ))}
        </div>

        <div className="lg:border-l lg:border-line lg:pl-12">
          <Label>highlights</Label>
          <ul className="mt-5 space-y-3">
            {cs.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-bone-dim"
              >
                <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Label>built with</Label>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[0.78rem]">
            {cs.builtWith.map((t) => (
              <li
                key={t}
                className="rounded-sm bg-surface px-2.5 py-1 text-bone-dim"
              >
                {t}
              </li>
            ))}
          </ul>

          {cs.team && (
            <>
              <div className="mt-10">
                <Label>team</Label>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-bone-dim">
                {cs.team}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Cite this work (basalt) ── */}
      {cs.cite && (
        <div className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
          <div className="rounded-xl border border-line bg-surface/40 p-6 sm:p-8">
            <Label>cite this work</Label>
            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-line bg-ink/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    APA
                  </span>
                  <CopyButton text={cs.cite.apa} />
                </div>
                <p className="mt-2.5 select-all break-words font-mono text-[0.8rem] leading-relaxed text-bone-dim">
                  {cs.cite.apa}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-ink/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    BibTeX
                  </span>
                  <CopyButton text={cs.cite.bibtex} />
                </div>
                <pre className="mt-2.5 select-all overflow-x-auto font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                  {cs.cite.bibtex}
                </pre>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
              <a
                href={cs.cite.doi.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
              >
                {cs.cite.doi.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={cs.cite.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
              >
                <OrcidMark className="h-4 w-4" />
                ORCID
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Next project ── */}
      <div className="mx-auto mt-24 w-full max-w-6xl border-t border-line px-6 pt-10 sm:px-10">
        <Link
          className="group flex items-center justify-between gap-4"
          href={`/projects/${cs.next.slug}`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Next project
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xl font-semibold text-bone transition-colors group-hover:text-ember sm:text-2xl">
            {cs.next.title}
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
