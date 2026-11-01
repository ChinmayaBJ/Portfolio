import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";
import CitationsToggle from "@/components/CitationsToggle";

export const metadata: Metadata = {
  title: "Publications",
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

type Citation = { title: string; venue: string };

type Paper = {
  year: string;
  venue: string;
  title: string;
  abstract: string;
  tags: string[];
  href?: string;
  doi?: string;
  citations?: Citation[];
};

const PAPERS: Paper[] = [
  {
    year: "2023",
    venue: "IEEE ICACRS 2023 · 11–13 Dec 2023",
    title: "Targeted Ransomware Attacks and Detection to Strengthen Cybersecurity Strategies",
    abstract:
      "Ransomware attacks have emerged as the most trending malware in recent eras, holding data and devices hostage until a ransom is paid. The proposed methodology involves virtual and practical demonstration of ransomware attacks using tools like TeamViewer and 7z, aiming to raise awareness of cybercriminal tactics. HostedScan, with its robust features, efficiently detects and categorizes risks, providing actionable insights to prioritize security efforts — including detailed reports on risk levels, vulnerabilities, IPs, ports, and hostnames — enabling proactive system and data protection.",
    tags: ["Cybersecurity", "Ransomware", "EDR", "Threat Detection", "Awareness"],
    href: "https://ieeexplore.ieee.org/document/10404203",
    doi: "10.1109/ICACRS58579.2023.10404203",
    citations: [
      { title: "SMS Spam Detection Using Machine Learning", venue: "IEEE ICSSCNA 2026" },
      { title: "Deep Learning Adversarial Attacks on Network Intrusion Detection", venue: "IEEE ICCES 2024" },
      { title: "Credit Card Fraud Detection Using ML", venue: "IEEE ICoICI 2024" },
      { title: "Phishing URL Detection via Hybrid ML", venue: "IEEE ICCPCT 2024" },
      { title: "Machine Learning for Vulnerability Management in Cybersecurity", venue: "Springer, 2025" },
      { title: "Ransomware in Focus: Trends and Countermeasures", venue: "IJLTEMAS vol.14 no.6, 2025" },
    ],
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
    year: "2025",
    venue: "IEEE CSITSS 2025 · 20–22 Nov 2025",
    title: "BrightSide: Real-Time Emotional Intelligence Meets Debate Coaching",
    abstract:
      "BrightSide is a real-time AI-powered platform that aims to improve student growth by integrating emotional intelligence training with an end-to-end debate coaching system. The emotional aspect of communication is frequently overlooked by conventional educational systems, which only concentrate on articulation and rational reasoning. BrightSide integrates sentiment analysis, NLP, transformer-based chatbots, and real-time feedback mechanisms, assessing argument structure, emotional tone, and empathy levels using models like GPT and BERT. Experimental findings show better emotional control and more student engagement during interactions.",
    tags: ["AI/NLP", "BERT", "GPT", "Emotional Intelligence", "EdTech", "Real-Time"],
    href: "https://ieeexplore.ieee.org/document/11295654",
    doi: "10.1109/CSITSS67709.2025.11295654",
  },
];

export default function PublicationsPage() {
  return (
    <div className="pb-28 pt-32">
      {/* ── Header ── */}
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <Label>publications</Label>
        <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.0] tracking-[-0.03em] text-bone sm:text-6xl">
          Research &amp; Publications
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim sm:text-xl">
          Three peer-reviewed papers spanning cybersecurity, audio signal
          processing, and applied AI — written and submitted while completing
          a full-time engineering degree.
        </p>

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

      {/* ── Timeline ── */}
      <div className="mx-auto mt-14 w-full max-w-6xl px-6 sm:px-10">
        <Reveal>
          <div className="relative">
            {/* connecting line — desktop only */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[0.9rem] hidden h-px bg-line sm:block"
            />

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {[...PAPERS].sort((a, b) => Number(a.year) - Number(b.year)).map((paper) => (
                <div key={paper.year} className="relative flex flex-col">
                  {/* node */}
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                    <span className="relative z-10 inline-flex h-[1.8rem] w-[1.8rem] items-center justify-center rounded-full border border-ember/50 bg-ink ring-4 ring-ink font-mono text-[0.6rem] tabular-nums text-ember">
                      {paper.year.slice(2)}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-ember sm:mt-3">
                      {paper.year}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-bone">
                    {paper.title}
                  </h3>
                  <p className="mt-1.5 font-mono text-[0.72rem] leading-relaxed text-muted">
                    {paper.venue}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {paper.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-ink px-2 py-0.5 font-mono text-[0.65rem] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                {(paper.href || paper.doi) && (
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    {paper.href && (
                      <a
                        href={paper.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-ember transition-colors hover:text-ember/80"
                      >
                        View on IEEE Xplore
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {paper.doi && (
                      <span className="font-mono text-[0.68rem] text-muted">
                        DOI: {paper.doi}
                      </span>
                    )}
                  </div>
                )}
                {paper.citations && paper.citations.length > 0 && (
                  <CitationsToggle citations={paper.citations} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
