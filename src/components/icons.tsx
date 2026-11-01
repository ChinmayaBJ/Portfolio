// Inlined lucide icons (exact paths from the production markup) so we match
// the original 1:1 without pulling in the lucide-react dependency.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function base(name: string, className?: string): SVGProps<SVGSVGElement> {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: `lucide lucide-${name}${className ? ` ${className}` : ""}`,
  };
}

export function Search({ className, ...rest }: IconProps) {
  return (
    <svg {...base("search", className)} {...rest}>
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
}

export function ArrowRight({ className, ...rest }: IconProps) {
  return (
    <svg {...base("arrow-right", className)} {...rest}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowLeft({ className, ...rest }: IconProps) {
  return (
    <svg {...base("arrow-left", className)} {...rest}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export function ArrowUpRight({ className, ...rest }: IconProps) {
  return (
    <svg {...base("arrow-up-right", className)} {...rest}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function ChevronDown({ className, ...rest }: IconProps) {
  return (
    <svg {...base("chevron-down", className)} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CornerDownLeft({ className, ...rest }: IconProps) {
  return (
    <svg {...base("corner-down-left", className)} {...rest}>
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
      <path d="m9 10-5 5 5 5" />
    </svg>
  );
}
