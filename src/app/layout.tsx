import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chinmayabj.dev"),
  title: {
    default: "Chinmaya B J · Developer Consultant & AI/ML Engineer",
    template: "%s · Chinmaya B J",
  },
  description:
    "Developer Consultant at SAP India building production AI agents and LLM-powered automation. B.E. AI & ML graduate with published IEEE research.",
  applicationName: "Chinmaya B J",
  authors: [{ name: "Chinmaya B J" }],
  openGraph: {
    title: "Chinmaya B J · Developer Consultant & AI/ML Engineer",
    description:
      "Developer Consultant at SAP India building production AI agents and LLM-powered automation. B.E. AI & ML graduate with published IEEE research.",
    url: "https://chinmayabj.dev",
    siteName: "Chinmaya B J",
    type: "website",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmaya B J · Developer Consultant & AI/ML Engineer",
    description:
      "Developer Consultant at SAP India building production AI agents and LLM-powered automation. B.E. AI & ML graduate with published IEEE research.",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${hanken.variable}`}
    >
      <body className="min-h-dvh font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main
          id="main-content"
          tabIndex={-1}
          className="page-enter min-h-dvh scroll-mt-24 outline-none"
        >
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
