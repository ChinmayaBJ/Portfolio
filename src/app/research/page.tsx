import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Three published IEEE research papers across cybersecurity, AI/NLP, and audio signal processing.",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
      <span className="h-px w-7 bg-line" aria-hidden="true" />
      {children}
    </span>
  );
}

type Paper = {
  year: string;
  venue: string;
  title: string;
  abstract: string;
  tags: string[];
  href?: string;
};

const PAPERS: Paper[] = [
  {
    year: "2025",
    venue: "IEEE Conference · Nov 2025",
    title: "BrightSide: AI Debate Coaching with Emotional Intelligence",
    abstract:
      "An AI-powered debate coaching platform that leverages BERT and GPT-based models with an emotional-intelligence layer for real-time argument analysis, rebuttal suggestion, and tone feedback. Evaluates NLP pipelines across multiple debate domains and proposes a multi-signal scoring framework for automated debate quality assessment.",
    tags: ["AI/NLP", "BERT", "GPT", "Debate AI", "Emotional Intelligence"],
  },
  {
    year: "2024",
    venue: "RVCE Internal Publication · 2024",
    title: "Real-Time Sung Mantra Recognition via Audio Fingerprinting",
    abstract:
      "A signal-processing and machine-learning pipeline for identifying sung mantras in real-time audio streams. Combines spectrogram-based fingerprinting with a lightweight classification model to achieve robust recognition across variations in pitch, tempo, and recording environment. Evaluated on a custom dataset of traditional Vedic recitations.",
    tags: ["Audio ML", "Signal Processing", "Fingerprinting", "Real-Time"],
  },
  {
    year: "2023",
    venue: "IEEE ICACRS 2023",
    title: "Benchmarking Enterprise Ransomware Detection Frameworks",
    abstract:
      "A systematic benchmarking study of enterprise ransomware detection and response frameworks, simulating 20+ variants (LockBit, Ryuk, WannaCry) under controlled conditions. Measures time-to-detect, accuracy, and encryption-speed thresholds across leading EDR platforms, informing a risk-weighted selection model for enterprise security architects.",
    tags: ["Cybersecurity", "Ransomware", "EDR", "Threat Modelling", "Benchmarking"],
  },
];

export default function ResearchPage() {
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

        <div className="mt-9">
          <Label>publications</Label>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.03em] text-bone sm:text-6xl">
            Research &amp; Publications
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim sm:text-xl">
            Three peer-reviewed papers spanning cybersecurity, audio signal
            processing, and applied AI — written and submitted while completing
            a full-time engineering degree.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-6 font-mono text-sm">
          <div className="inline-flex items-center gap-2 text-muted">
            <span className="text-ember">3</span> papers published
          </div>
          <div className="inline-flex items-center gap-2 text-muted">
            <span className="text-ember">IEEE</span> ICACRS 2023, IEEE 2025
          </div>
          <div className="inline-flex items-center gap-2 text-muted">
            B.E. AI &amp; ML · RVCE Bengaluru
          </div>
        </div>
      </div>

      {/* ── Figure ── */}
      <div className="mx-auto mt-14 w-full max-w-6xl px-6 sm:px-10">
        <Reveal>
          <figure className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-line bg-white shadow-float">
            <div className="p-6 sm:p-8">
              <Image
                src="/assets/research-teaser.webp"
                alt="Research overview: cybersecurity, audio ML, and AI/NLP publications"
                width={1040}
                height={540}
                sizes="(max-width: 1024px) 100vw, 56rem"
                className="w-full"
              />
            </div>
            <figcaption className="border-t border-black/10 px-6 py-3 font-mono text-[0.7rem] leading-relaxed text-black/55 sm:px-8">
              Three published papers across IEEE ICACRS 2023, an IEEE conference
              in 2025, and an RVCE publication — each peer-reviewed and complete.
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ── Papers ── */}
      <div className="mx-auto mt-16 w-full max-w-6xl px-6 sm:px-10">
        <Label>papers</Label>
        <div className="mt-8 space-y-8">
          {PAPERS.map((paper, i) => (
            <Reveal key={i}>
              <div className="rounded-xl border border-line bg-surface/40 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="tabular-nums text-ember">{paper.year}</span>
                  <span className="h-px w-6 bg-line" />
                  <span className="text-muted">{paper.venue}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl">
                  {paper.title}
                </h2>
                <p className="mt-3 max-w-3xl text-[0.97rem] leading-relaxed text-bone-dim">
                  {paper.abstract}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-ink px-2.5 py-1 font-mono text-[0.72rem] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {paper.href && (
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-ember transition-colors hover:text-ember-bright"
                  >
                    View paper
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform hover:-translate-y-0.5 hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Back to all projects ── */}
      <div className="mx-auto mt-24 w-full max-w-6xl border-t border-line px-6 pt-10 sm:px-10">
        <Link className="group flex items-center justify-between gap-4" href="/projects">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Back to
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xl font-semibold text-bone transition-colors group-hover:text-ember sm:text-2xl">
            All projects
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
