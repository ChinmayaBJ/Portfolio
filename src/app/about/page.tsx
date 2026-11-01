import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Developer Consultant at SAP India building production AI agents and LLM automation. B.E. AI & ML graduate, published IEEE researcher.",
};

const FACTS: { dt: string; dd: string }[] = [
  { dt: "Based in", dd: "Bengaluru, India" },
  { dt: "Currently", dd: "Developer Consultant at SAP India (BDC)" },
  { dt: "Education", dd: "B.E. AI & ML, R.V. College of Engineering" },
  { dt: "Focus", dd: "AI agents, LLM automation, ML research" },
];

const NOW: string[] = [
  "Building LLM-powered AI agents and automation platforms on SAP BTP at SAP India",
  "Deepening expertise in transformer architectures, RAG pipelines, and production LLM systems",
  "Expanding published research — 3 papers across IEEE conferences covering AI, cybersecurity, and audio signal processing",
];

const TOOLS: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "C", "HTML/CSS", "Bash", "SQL"],
  },
  {
    label: "Web & product",
    items: ["React", "Flask", "Django", "DRF", "Streamlit", "REST APIs"],
  },
  {
    label: "ML & AI",
    items: ["TensorFlow", "PyTorch", "scikit-learn", "BERT", "HuggingFace", "OpenCV", "spaCy", "NLTK"],
  },
  {
    label: "Cloud & platform",
    items: ["SAP BTP", "SAP Datasphere", "PostgreSQL", "Linux", "Git", "LLM APIs"],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-7 bg-line" aria-hidden="true" />
          about
        </span>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait + facts */}
          <div>
            <div className="group/portrait relative w-full max-w-[320px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2.5 -z-10 rounded-[1.5rem] bg-gradient-to-tr from-ember/45 via-ember/20 to-ember/5 opacity-80 blur-2xl transition-opacity duration-500 group-hover/portrait:opacity-100"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius)] border border-ember/40">
                <Image
                  src="/assets/chinmaya-portrait.jpg"
                  alt="Chinmaya B J"
                  fill
                  quality={90}
                  sizes="420px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <dl className="mt-8 max-w-[320px] border-t border-line font-mono text-sm">
              {FACTS.map((f) => (
                <div
                  key={f.dt}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    {f.dt}
                  </dt>
                  <dd className="text-right text-bone">{f.dd}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Narrative */}
          <div>
            <h1 className="max-w-2xl font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-bone sm:text-[2.6rem]">
              I build AI that doesn&#39;t just demo well — it ships to production and stays there.
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-bone-dim">
              <Reveal>
                <p>
                  I&#39;m the engineer you hand{" "}
                  <em className="font-medium not-italic text-ember">
                    the problem nobody wants to own
                  </em>
                  . At SAP India I built a platform that replaced a 3–4 hour expert-gated manual process with a single LLM-powered workflow that deploys in{" "}
                  <em className="font-medium not-italic text-ember">
                    under 5 minutes
                  </em>
                  . I didn&#39;t just add an AI layer on top — I redesigned the system underneath it so the model context never touches credentials, the audit trail is GDPR/SOX-clean, and the thing actually holds under load.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Before that, I spent time at Samsung R&D pushing a Stable Diffusion pipeline from 12 fps to 18 fps on mobile SoCs, and at Dell benchmarking 20+ ransomware variants with their senior architect to inform real enterprise threat modelling. That range — from mobile inference throughput to cybersecurity simulation to LLM agent orchestration — is{" "}
                  <em className="font-medium not-italic text-ember">
                    deliberate
                  </em>
                  . It means when I design a system I know what breaks at the model layer, what breaks at the hardware layer, and what breaks when someone tries to exploit the gap between them. I&#39;ve also published three{" "}
                  <em className="font-medium not-italic text-ember">
                    IEEE research papers
                  </em>{" "}
                  — because I don&#39;t just build things, I understand them well enough to write about them.
                </p>
              </Reveal>
            </div>

            <div className="mt-12">
              <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                <span className="h-px w-7 bg-line" aria-hidden="true" />
                now
              </span>
              <ul className="mt-4 space-y-2.5">
                {NOW.map((n) => (
                  <li
                    key={n}
                    className="flex gap-3 text-[0.97rem] leading-relaxed text-bone-dim"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="mt-20 border-t border-line pt-14">
          <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-7 bg-line" aria-hidden="true" />
            tools I reach for
          </span>
          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((group) => (
              <div key={group.label}>
                <h2 className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone">
                  <span className="h-px w-4 bg-ember" />
                  {group.label}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2 font-mono text-[0.78rem]">
                  {group.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-sm bg-surface px-2.5 py-1 text-bone-dim"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
