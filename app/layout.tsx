import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Jay Kapoor: founder of StrayPaw, Economics and Statistics at Pitt. Startups, research, projects and photos, from Bangalore to Pittsburgh.";

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

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={sans.variable}>
        <body className="relative">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Nav />
          <noscript>
            <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
          </noscript>
          <main
            id="main"
            className="relative z-10 overflow-clip rounded-b-[28px] bg-bg pb-24 md:rounded-b-[44px] md:pb-32"
          >
            {children}
          </main>
          <Footer />
          {/* The contact panel is pinned, so its anchor is the end of the page. */}
          <span
            id="contact"
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-px w-px"
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
