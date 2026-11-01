import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/site";

/** Browser-chrome framed project card — used on the home grid and /projects. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="group block" href={`/projects/${project.slug}`}>
      <div className="relative">
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-float">
          <div className="flex items-center gap-1.5 border-b border-line bg-ink/50 px-3.5 py-2.5">
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
              <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
              <span className="h-2.5 w-2.5 rounded-full bg-dot-inactive" />
            </span>
            {project.browserLabel && (
              <span className="ml-3 truncate font-mono text-[0.65rem] text-muted">
                {project.browserLabel}
              </span>
            )}
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                project.objectClass ?? "object-top"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-semibold text-bone transition-colors group-hover:text-ember">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>
      <p className="mt-1 text-bone-dim">{project.tagline}</p>
      {project.active && (
        <div className="mt-2.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ember">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            Actively maintained
          </span>
        </div>
      )}
    </Link>
  );
}
