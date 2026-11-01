import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Developer Consultant at SAP India, AI/ML engineer, B.E. AI & ML graduate. The full document is below.",
};

function Download({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`lucide lucide-download${className ? ` ${className}` : ""}`}
    >
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

const PDF = "/Chinmaya-BJ-Resume.pdf";

export default function ResumePage() {
  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-7 bg-line" aria-hidden="true" />
              résumé
            </span>
            <h1 className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] text-bone sm:text-5xl">
              Chinmaya B J
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-bone-dim">
              Developer Consultant at SAP India, AI/ML engineer, B.E. graduate.
              The full document is below, and the PDF is one tap away.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-sm">
            <a
              href={PDF}
              download="Chinmaya BJ - Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-md border border-ember/50 bg-ember/10 px-5 py-3 font-mono text-sm text-bone transition-colors duration-300 hover:border-ember hover:bg-ember/20"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-bone"
            >
              Open in new tab
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-[840px] flex-col gap-8">
          <div className="overflow-hidden rounded-lg border border-line bg-white shadow-float">
            <Image
              src="/assets/resume-page-1.jpg"
              alt="Chinmaya B J resume, page 1"
              width={1275}
              height={1650}
              className="w-full"
              sizes="(max-width: 880px) 100vw, 840px"
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-line bg-white shadow-float">
            <Image
              src="/assets/resume-page-2.jpg"
              alt="Chinmaya B J resume, page 2"
              width={1275}
              height={1650}
              className="w-full"
              sizes="(max-width: 880px) 100vw, 840px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
