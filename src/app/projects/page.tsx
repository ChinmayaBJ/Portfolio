import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";

export const metadata = {
  title: "Projects",
  description:
    "AI/ML projects by Chinmaya B J — ECG arrhythmia classification, hydrogen leak detection, audio fingerprinting, and AI debate coaching, each with published research.",
};

/** GitHub brand mark — local to this page (shared icons.tsx is lucide-only). */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type Badge = { href: string; src: string; alt: string };
type ProjLink =
  | { kind: "casestudy"; href: string }
  | { kind: "source"; href: string }
  | { kind: "plain"; label: string; href: string };

type Featured = {
  slug: string;
  n: string;
  year: string;
  title: string;
  tagline: string;
  desc: string;
  tech: string[];
  image: string;
  browserLabel?: string;
  reverse?: boolean;
  badges?: Badge[];
  metrics?: boolean;
  links: ProjLink[];
};

const FEATURED: Featured[] = [
  {
    slug: "cat-net",
    n: "01",
    year: "2025",
    title: "CAT-Net",
    tagline: "97% accuracy ECG arrhythmia classification",
    desc: "An end-to-end ML pipeline on the MIT-BIH Arrhythmia Database using single-lead (MLII) ECG. Designed CAT-Net — a custom CNN + Attention + Transformer model of 1.8M parameters — achieving 97% average accuracy and 93% average F1 across 5 arrhythmia classes (N, S, V, F, Q). Built wavelet (DWT) denoising, R-peak detection, heartbeat segmentation, and addressed severe class imbalance by benchmarking SMOTEENN, ADASYN, and SMOTETomek.",
    tech: ["Python", "TensorFlow", "PyTorch", "CNN", "Attention", "Transformer", "MIT-BIH", "Google Colab"],
    image: "/assets/shots/cat-net.png",
    links: [
      { kind: "plain", label: "Colab Notebook", href: "https://colab.research.google.com/drive/1ppb72S9oLWh7UGpoLd56jJe3LlRw2704" },
    ],
  },
  {
    slug: "brightside",
    n: "02",
    year: "2025",
    title: "BrightSide",
    tagline: "AI debate coaching with emotional intelligence",
    desc: "A real-time, web-based platform pairing end-to-end debate coaching with emotional-intelligence training. Integrated sentiment analysis, NLP, and a transformer-based chatbot (GPT, BERT) to assess argument structure, emotional tone, and empathy. Introduced novel feedback metrics including voice pitch, delivering real-time feedback. Published as an IEEE paper (Nov 2025) showing improved emotional control and higher student engagement.",
    tech: ["BERT", "GPT", "NLP", "Sentiment Analysis", "Python", "React", "Speech Recognition"],
    image: "/assets/shots/brightside.jpg",
    reverse: true,
    links: [
      { kind: "plain", label: "IEEE Paper", href: "https://ieeexplore.ieee.org" },
      { kind: "casestudy", href: "/publications" },
    ],
  },
  {
    slug: "h2-leak",
    n: "03",
    year: "2024",
    title: "H2 Leak Detector",
    tagline: "ML pipeline for hydrogen safety anomaly detection",
    desc: "An end-to-end ML pipeline on a time-synchronized 1 Hz multi-sensor dataset (405 samples, 24 channels) from an EU hydrogen-safety research experiment. Trained a Random Forest with 5-fold CV R² = 0.996 and an LSTM sequence regressor; random-search tuning cut LSTM CV RMSE by ~48% (1.03 → 0.53). Applied Isolation Forest (10% contamination) to flag anomalies without ground-truth labels. Ranked features with five importance methods — CH3 pressure was the strongest predictor.",
    tech: ["Python", "scikit-learn", "TensorFlow/Keras", "LSTM", "Pandas", "Isolation Forest", "Time-Series"],
    image: "/assets/shots/h2-leak.png",
    links: [
      { kind: "plain", label: "Colab Notebook", href: "https://colab.research.google.com/drive/1AkHdBWzX-5ck_BSfR0W4rFfcLS9A8dLp" },
      { kind: "source", href: "https://github.com/ChinmayaBJ" },
    ],
  },
];

type More = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  extra?: string;
  desc: string;
  image: string;
  browserLabel?: string;
  objectClass: string;
};

const MORE: More[] = [
  {
    slug: "audio-fingerprinting",
    title: "Mantra Fingerprinter",
    year: "2024",
    tagline: "Real-time audio fingerprinting for sung mantras",
    extra: "Published research — R.V. College of Engineering",
    desc: "A real-time system that identifies and verifies sung mantras in audio recordings by converting signals into compact fingerprints matched against a database. Stays accurate despite variations in pitch, speed, and vocal characteristics, tolerating noise and overlapping sounds.",
    image: "/assets/shots/audio-fingerprinting.png",
    objectClass: "object-center",
  },
  {
    slug: "sap-agent-catalog",
    title: "SAP Agent Catalog",
    year: "2026",
    tagline: "60+ governed AI agents on SAP BTP Cloud Foundry",
    desc: "Automated AI agent catalog replacing a manual SharePoint workflow. Semantic search, approval workflows, and a 15-minute sync cycle cut data staleness from 2–3 days to under 30 minutes, saving ~5 hours/week.",
    image: "/assets/shots/netdash.webp",
    objectClass: "object-top",
  },
  {
    slug: "ransomware-detector",
    title: "Ransomware Detector",
    year: "2023",
    tagline: "Benchmarking 20+ ransomware variants — IEEE ICACRS",
    desc: "Simulated Lockbit, Ryuk, WannaCry and 17+ other variants to benchmark enterprise detection. Measured TTD, accuracy, and encryption speed. Published at IEEE ICACRS 2023, cited by 7 papers including Forensic Science International.",
    image: "/assets/shots/ransomware-detector.png",
    objectClass: "object-center",
  },
];

function BrowserFrame({
  image,
  alt,
  browserLabel,
  objectClass = "object-top",
  glow = false,
}: {
  image: string;
  alt: string;
  browserLabel?: string;
  objectClass?: string;
  glow?: boolean;
}) {
  return (
    <div className="relative">
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-ember/20 via-ember/5 to-transparent blur-3xl"
        />
      )}
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-float">
        <div className="flex items-center gap-1.5 border-b border-line bg-ink/50 px-3.5 py-2.5">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
            <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
            <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
          </span>
          {browserLabel && (
            <span className="ml-3 truncate font-mono text-[0.65rem] text-muted">
              {browserLabel}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${objectClass}`}
          />
        </div>
      </div>
    </div>
  );
}

function ProjectLinks({ links }: { links: ProjLink[] }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-sm">
      {links.map((l, i) => {
        if (l.kind === "casestudy") {
          return (
            <Link
              key={i}
              className="group/cs inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-bright"
              href={l.href}
            >
              Case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cs:-translate-y-0.5 group-hover/cs:translate-x-0.5" />
            </Link>
          );
        }
        if (l.kind === "source") {
          return (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              Source
            </a>
          );
        }
        return (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-bone"
          >
            {l.label}
          </a>
        );
      })}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-7 bg-line" aria-hidden="true" />
          projects
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.025em] text-bone sm:text-5xl">
          AI/ML research and engineering, end to end.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
          From 97% accuracy ECG classifiers to production LLM agents at SAP India — each project shipped, documented, and several published in IEEE.
        </p>
      </div>

      {/* Featured projects */}
      <div className="mx-auto mt-20 w-full max-w-6xl space-y-28 px-6 sm:space-y-36 sm:px-10">
        {FEATURED.map((p) => (
          <Reveal key={p.slug}>
            <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={p.reverse ? "lg:order-2" : ""}>
                <Link
                  aria-label={`${p.title} case study`}
                  className="block"
                  href={`/projects/${p.slug}`}
                >
                  <BrowserFrame
                    image={p.image}
                    alt={`${p.title} screenshot`}
                    browserLabel={p.browserLabel}
                    glow
                  />
                </Link>
              </div>
              <div className={p.reverse ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="tabular-nums text-ember">{p.n}</span>
                  <span className="text-muted">{p.year}</span>
                  <span className="h-px w-5 bg-line" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ember">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                    </span>
                    Actively maintained
                  </span>
                </div>
                <Link className="inline-block" href={`/projects/${p.slug}`}>
                  <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-bone transition-colors group-hover:text-ember sm:text-3xl">
                    {p.title}
                  </h2>
                </Link>
                <p className="mt-1.5 font-mono text-sm text-muted">{p.tagline}</p>
                <p className="mt-5 max-w-xl text-[0.97rem] leading-relaxed text-bone-dim">
                  {p.desc}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-line px-2.5 py-1 text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {p.badges && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
                    {p.badges.map((b) => (
                      <a
                        key={b.src}
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.src} alt={b.alt} className="h-[1.35rem]" />
                      </a>
                    ))}
                  </div>
                )}

                {p.metrics && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <a
                      href="https://ats-screener.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/metric flex items-baseline gap-1.5"
                    >
                      <span className="font-display text-2xl font-semibold text-bone transition-colors group-hover/metric:text-ember">
                        <span className="relative inline-block [font-variant-numeric:tabular-nums]">
                          <span aria-hidden="true" className="invisible">
                            2,000+
                          </span>
                          <span className="absolute inset-0">2,000+</span>
                        </span>
                      </span>
                      <span
                        className="relative -ml-0.5 inline-flex h-[7px] w-[7px] self-center"
                        title="Live count, updated in real time"
                      >
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400 ring-2 ring-emerald-400/15" />
                        <span className="sr-only">live</span>
                      </span>
                      <span className="font-mono text-xs text-muted">
                        users served
                      </span>
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
                )}

                <ProjectLinks links={p.links} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* More work */}
      <div className="mx-auto mt-28 w-full max-w-6xl border-t border-line px-6 pt-16 sm:px-10">
        <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-7 bg-line" aria-hidden="true" />
          more work
        </span>
        <div className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {MORE.map((m) => (
            <Reveal key={m.slug}>
              <Link className="group block" href={`/projects/${m.slug}`}>
                <BrowserFrame
                  image={m.image}
                  alt={`${m.title} screenshot`}
                  browserLabel={m.browserLabel}
                  objectClass={m.objectClass}
                />
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-bone transition-colors group-hover:text-ember">
                    {m.title}
                  </h3>
                  <span className="font-mono text-xs text-muted">{m.year}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-muted">{m.tagline}</p>
                {m.extra && (
                  <p className="mt-1 font-mono text-[0.7rem] text-muted">
                    {m.extra}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {m.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-ember">
                  Case study
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
