import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Woof } from "@/components/Woof";
import { siteUrl } from "@/lib/site";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Jay Kapoor: companies, research, papers, games and photos, from Bangalore to Pittsburgh.";

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

export const viewport: Viewport = { themeColor: "#f6f6f3" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      >
        <body>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Nav />
          <noscript>
            <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
          </noscript>
          <main id="main">{children}</main>
          <Footer />
          <Woof />
        </body>
      </html>
    </ViewTransitions>
  );
}
