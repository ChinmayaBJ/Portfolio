import Link from "next/link";
import { PROJECTS } from "@/lib/site";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import HeroVisual from "@/components/BootTerminal";
import { ArrowRight, ArrowUpRight, ChevronDown } from "@/components/icons";

const WHAT_I_DO = [
  {
    n: "01",
    title: "AI agents & LLM automation",
    body: "Production AI agents and LLM-powered platforms on SAP BTP, cutting multi-hour manual workflows to under 5 minutes.",
  },
  {
    n: "02",
    title: "ML research & deployment",
    body: "End-to-end ML pipelines from data engineering to model training, published in IEEE with 97%+ accuracy on real-world datasets.",
  },
  {
    n: "03",
    title: "Full-stack product engineering",
    body: "Flask, React, and PostgreSQL backends wired to intelligent frontends — shipped from prototype to production at SAP and Samsung.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[42rem] w-[42rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-ember/12 blur-[140px]"
        />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-28 sm:px-10 lg:min-h-dvh lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24 lg:pb-24">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              Open to engineering roles
            </div>
            <h1 className="mt-7 text-balance font-display text-[3.1rem] font-semibold leading-[0.95] tracking-[-0.035em] text-bone sm:text-[4.1rem] lg:text-[4.7rem]">
              I build AI that works, from the prompt to{" "}
              <span className="text-ember">production.</span>
            </h1>
            <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-bone-dim sm:text-lg">
              Developer Consultant at SAP India shipping{" "}
              <em className="font-medium not-italic text-ember">
                production AI agents
              </em>{" "}
              and LLM automation. B.E. AI &amp; ML graduate with{" "}
              <em className="font-medium not-italic text-ember">
                published IEEE research
              </em>{" "}
              in cybersecurity and applied AI. I take the hardest problem in
              your stack and{" "}
              <em className="font-medium not-italic text-ember">
                own it end to end
              </em>
              .
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                className="group inline-flex items-center gap-2 rounded-md border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm text-bone transition-colors duration-300 hover:border-ember hover:bg-ember/20"
                href="/projects"
              >
                See the work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-1 py-3 font-mono text-sm text-muted transition-colors hover:text-bone"
              >
                Résumé
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="relative h-[40vh] min-h-[300px] w-full lg:h-[80vh]">
            <HeroVisual />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-80 transition-opacity duration-500 lg:flex"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
            scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-ember" />
        </div>
      </section>

      {/* ── Selected work ── */}
      <section className="border-t border-line/60 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                <span className="h-px w-7 bg-line" aria-hidden="true" />
                selected work
              </span>
              <h2 className="mt-5 max-w-xl text-balance font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-bone sm:text-[2.75rem]">
                Things built with real impact.
              </h2>
            </div>
            <Link
              className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-ember"
              href="/projects"
            >
              All projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I do ── */}
      <section className="border-t border-line/60 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-7 bg-line" aria-hidden="true" />
            what I do
          </span>
          <div className="mt-10 border-t border-line">
            {WHAT_I_DO.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.05}>
                <div className="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_1.8fr] md:gap-10">
                  <h2 className="flex items-baseline gap-3 font-display text-lg font-semibold text-bone">
                    <span className="font-mono text-xs tabular-nums text-ember">
                      {item.n}
                    </span>
                    {item.title}
                  </h2>
                  <p className="text-[0.97rem] leading-relaxed text-bone-dim">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Currently ── */}
      <section className="border-t border-line/60 py-24 sm:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-end sm:justify-between sm:px-10">
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-7 bg-line" aria-hidden="true" />
              currently
            </span>
            <h2 className="mt-5 max-w-xl font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
              Developer Consultant at SAP India.
            </h2>
            <p className="mt-3 max-w-md text-bone-dim">
              Building AI agents and LLM-powered automation on SAP BTP (Business Data Cloud).
            </p>
          </div>
          <Link
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-ember"
            href="/work"
          >
            See the full path
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-line/60 py-28 sm:py-36">
        <div className="mx-auto w-full max-w-6xl px-6 text-center sm:px-10">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-[2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-bone sm:text-[2.75rem]">
              Have something worth building?
            </h2>
          </Reveal>
          <p className="mx-auto mt-5 max-w-md text-bone-dim">
            Open to new-grad roles and problems worth the effort.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              className="group inline-flex items-center gap-2 rounded-md border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm text-bone transition-colors duration-300 hover:border-ember hover:bg-ember/20"
              href="/contact"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
