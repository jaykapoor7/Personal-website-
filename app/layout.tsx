import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

import { Dock } from "@/components/Dock";
import { Preview } from "@/components/Preview";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";

// An editorial serif for names and headings, a plain sans for reading, and a
// mono for numbers, dates and labels.
const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: false,
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "I find broken systems and try to find solutions. Student at the University of Pittsburgh, founder of StrayPaw, and researcher in public health.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Jay Kapoor", template: "%s | Jay Kapoor" },
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Jay Kapoor",
    description,
    siteName: "Jay Kapoor",
  },
  twitter: { card: "summary_large_image", creator: "@jaybuildsvx" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#fafaf8" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      >
        <body className="relative">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <noscript>
            <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
          </noscript>
          {/* Hairlines down both sides of the reading column, as on a printed page. */}
          <div aria-hidden="true" className="rails" />
          <main id="main" className="relative pb-16 md:pb-20">
            {children}
          </main>
          <Footer />
          <Dock />
          <Preview />
        </body>
      </html>
    </ViewTransitions>
  );
}
