import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to new-grad roles and hard problems. The fastest way to reach me is right here.",
};

function Mail({ className }: { className?: string }) {
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
      className={`lucide lucide-mail${className ? ` ${className}` : ""}`}
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function MapPin({ className }: { className?: string }) {
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
      className={`lucide lucide-map-pin${className ? ` ${className}` : ""}`}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh items-center pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-7 bg-line" aria-hidden="true" />
          contact
        </span>
        <h1 className="mt-6 font-display text-[3rem] font-semibold leading-[0.95] tracking-[-0.03em] text-bone sm:text-[4.2rem]">
          Let&#39;s build something.
        </h1>

        <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="max-w-md text-lg leading-relaxed text-bone-dim">
              Open to new-grad roles and hard problems. The fastest way to reach
              me is right here.
            </p>
            <div className="mt-9">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-3 font-display text-xl text-bone transition-colors hover:text-ember sm:text-2xl"
              >
                <Mail className="h-5 w-5 text-ember" />
                {SITE.email}
              </a>
            </div>
            <ul className="mt-10 space-y-3 font-mono text-sm">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile, opens in a new tab"
                  className="group inline-flex items-center gap-3 text-bone transition-colors hover:text-ember"
                >
                  <GitHubMark className="h-4 w-4 text-muted transition-colors group-hover:text-ember" />
                  github.com/Hades1710
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile, opens in a new tab"
                  className="group inline-flex items-center gap-3 text-bone transition-colors hover:text-ember"
                >
                  <LinkedInMark className="h-4 w-4 text-muted transition-colors group-hover:text-ember" />
                  Chinmaya B J
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-muted">
                <MapPin className="h-4 w-4" />
                Bengaluru, India
              </li>
            </ul>
            <div className="mt-12" aria-hidden="true">
              <Image
                src="/assets/contact-bitmoji.webp"
                alt=""
                width={320}
                height={320}
                className="float-bob w-36 select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:w-44"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
