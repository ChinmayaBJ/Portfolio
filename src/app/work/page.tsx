import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/icons";

export const metadata = {
  title: "Work",
  description:
    "Experience across AI agent engineering, ML research, and software development — SAP India, Samsung R&D, Dell Technologies, and Outspark.",
};

type Role = {
  period: string;
  present?: boolean;
  location: string;
  mode: string;
  title: string;
  org: string;
  blurb: string;
  bullets: string[];
  logo?: string;
  logoSize?: string;
};

const ROLES: Role[] = [
  {
    period: "Jul 2026 – Present",
    present: true,
    location: "Bengaluru, India",
    mode: "On-site",
    title: "Developer Consultant",
    org: "SAP India (Business Data Cloud)",
    logo: "/assets/logos/sap.svg",
    blurb: "Building production AI agents and LLM-powered automation on SAP BTP.",
    bullets: [
      "Built an LLM-powered platform (Flask, React, @sap/datasphere-cli) that deploys SAP Datasphere master-data objects with up to 27 artifacts per run, replacing a 3–4 hour expert-gated manual process.",
      "Added Claude-based CSN enrichment (~70% less manual annotation) and a voice + text agentic copilot that executes wizard actions and deployments, cutting time-to-first-deploy from ~3.5 hours to under 5 minutes.",
      "Automated S/4HANA → Datasphere Replication Flow setup in a single CLI call, with a BTP Audit Log trail for GDPR/SOX traceability — no credentials reach model context.",
      "Converted a manual SharePoint-based agent tracking workflow into an automated AI Agent Catalog on SAP BTP Cloud Foundry (Flask, React, PostgreSQL, MS Graph) with semantic search and an approval workflow; 15-minute automated sync cut data staleness from 2–3 days to under 30 minutes, saving ~5 hours/week across 60+ governed agents.",
    ],
  },
  {
    period: "Jul 2025 – Jan 2026",
    location: "Bangalore, India",
    mode: "On-site",
    title: "Research Intern",
    org: "Samsung R&D",
    logo: "/assets/logos/samsung.avif",
    blurb: "Engineered a lightweight animation pipeline using Stable Diffusion for stylized video synthesis on mobile devices.",
    bullets: [
      "Engineered a lightweight animation pipeline using Stable Diffusion v1.5 with DreamBooth LoRA for stylized video synthesis.",
      "Optimised inference throughput from 12 fps to 18 fps on mid-range mobile SoCs via quantisation and batching.",
      "Benchmarked deployment on mobile devices and platforms including Replicate and OpenXLab.",
    ],
  },
  {
    period: "Jul 2024 – May 2025",
    location: "Bangalore, India",
    mode: "On-site",
    title: "Project Intern",
    org: "Dell Technologies",
    logo: "/assets/logos/dell.png",
    logoSize: "h-11",
    blurb: "Simulated ransomware variants and benchmarked enterprise detection frameworks alongside Dell's Senior Architect.",
    bullets: [
      "Simulated 20+ ransomware variants (Lockbit, Ryuk, WannaCry) to benchmark detection; measured TTD, accuracy and encryption speed.",
      "Collaborated directly with Dell's Senior Architect to align simulator design with enterprise threat-modelling framework and secure sign-off for production hardening.",
    ],
  },
  {
    period: "Jul 2023 – Dec 2023",
    location: "Remote",
    mode: "Remote",
    title: "Software Intern",
    org: "Outspark",
    blurb: "Developed a voice-enabled resume builder using NLP and speech recognition for dynamic form-filling.",
    bullets: [
      "Developed a voice-enabled resume builder using spaCy, NLTK, BERT, and speech recognition for dynamic form-filling.",
      "Extracted structured data (name, education, experience) from natural-language resumes; delivered a working Proof of Concept for future productisation.",
    ],
  },
];

const EDUCATION = {
  degree: "B.E. in Artificial Intelligence & Machine Learning",
  meta: "R.V. College of Engineering · 2022–2026 · Bengaluru, India",
  bullets: [
    "CGPA: 9.18",
    "Published 3 research papers (IEEE, 2023–2025)",
    "Sri Chaitanya PU College — CBSE Class XII: 91%",
    "Sri Chaitanya School — CBSE Class X: 95%",
  ],
};

type Cert = { title: string; issuer: string; year: string; href: string };

const CERTS: Cert[] = [
  {
    title: "Advanced Learning Algorithms",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    href: "https://www.coursera.org",
  },
  {
    title: "Supervised Machine Learning",
    issuer: "Coursera / DeepLearning.AI",
    year: "2024",
    href: "https://www.coursera.org",
  },
];

export default function WorkPage() {
  return (
    <>
      <div className="pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-7 bg-line" aria-hidden="true" />
            experience
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.025em] text-bone sm:text-5xl">
            Building AI systems that replace manual work, for real.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
            From mobile ML inference at Samsung to production AI agents at SAP India — a track record built on shipping things that hold.
          </p>
        </div>

        <div className="mx-auto mt-14 w-full max-w-6xl px-6 sm:px-10">
          <h2 className="sr-only">Experience</h2>
          <div className="border-t border-line">
            {ROLES.map((r) => (
              <article
                key={r.title + r.org}
                className="grid gap-5 border-b border-line py-9 transition-[opacity,transform] duration-300 ease-[var(--ease-premium)] md:grid-cols-[210px_1fr] md:gap-10"
              >
                <div className="font-mono text-xs">
                  {r.logo && (
                    <div className="mb-4 flex items-center">
                      <Image
                        src={r.logo}
                        alt={r.org}
                        width={110}
                        height={40}
                        className={`${r.logoSize ?? "h-9"} w-auto rounded object-contain opacity-90 transition-opacity hover:opacity-100`}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-bone">
                    {r.present && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                      </span>
                    )}
                    {r.period}
                  </div>
                  <div className="mt-2 uppercase tracking-[0.15em] text-muted">
                    {r.location}
                  </div>
                  <div className="mt-0.5 uppercase tracking-[0.15em] text-muted">
                    {r.mode}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl">
                    {r.title}
                    <span className="text-muted"> · {r.org}</span>
                  </h3>
                  <p className="mt-2 text-[0.97rem] text-bone-dim">{r.blurb}</p>
                  <ul className="mt-4 space-y-2.5">
                    {r.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-[0.95rem] leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 grid w-full max-w-6xl gap-12 border-t border-line px-6 pb-28 pt-14 sm:px-10 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-7 bg-line" aria-hidden="true" />
              education
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold text-bone">
              {EDUCATION.degree}
            </h2>
            <p className="mt-1.5 font-mono text-sm text-muted">
              {EDUCATION.meta}
            </p>
            <ul className="mt-5 space-y-2.5">
              {EDUCATION.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-bone-dim"
                >
                  <span className="mt-2 h-px w-3 shrink-0 bg-ember/60" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-7 bg-line" aria-hidden="true" />
              certifications
            </span>
            <ul className="mt-5 border-t border-line">
              {CERTS.map((c) => (
                <li
                  key={c.title}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <div className="text-[0.95rem] text-bone">
                    {c.title}
                    <span className="ml-2 font-mono text-xs text-muted">
                      · {c.issuer}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5 font-mono text-xs text-muted">
                    {c.year}
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ember transition-colors hover:text-ember-bright"
                      aria-label={`${c.title} credential`}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </>
  );
}
