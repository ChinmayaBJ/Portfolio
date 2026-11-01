// Central site data — shared by Nav, Footer, CommandPalette, and pages.

export const SITE = {
  name: "Chinmaya B J",
  role: "Developer Consultant · AI/ML Engineer",
  location: "Bengaluru, India",
  email: "chinmayabj.sap@gmail.com",
  github: "https://github.com/Hades1710",
  linkedin: "https://in.linkedin.com/in/chinmaya-j-34a912235",
} as const;

export type NavLink = { label: string; href: string; n: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work", n: "01" },
  { label: "Projects", href: "/projects", n: "02" },
  { label: "Publications", href: "/publications", n: "03" },
  { label: "About", href: "/about", n: "04" },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  active: boolean;
  image: string;
  alt: string;
  /** Browser-chrome address label shown above the screenshot, if any. */
  browserLabel?: string;
  /** object-position for the screenshot crop. */
  objectClass?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "cat-net",
    title: "CAT-Net",
    year: "2025",
    tagline: "97% accuracy ECG arrhythmia classifier",
    active: true,
    image: "/assets/shots/basalt.webp",
    alt: "CAT-Net ECG classifier screenshot",
    objectClass: "object-top",
  },
  {
    slug: "brightside",
    title: "BrightSide",
    year: "2025",
    tagline: "AI debate coaching with emotional intelligence",
    active: true,
    image: "/assets/shots/ats-screener.webp",
    alt: "BrightSide platform screenshot",
    objectClass: "object-top",
  },
  {
    slug: "h2-leak",
    title: "H2 Leak Detector",
    year: "2024",
    tagline: "ML pipeline for hydrogen leak anomaly detection",
    active: true,
    image: "/assets/sunnify.webp",
    alt: "H2 Leak Detector screenshot",
    objectClass: "object-top",
  },
];
