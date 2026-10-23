import type { Metadata, Viewport } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/Nav";

import { Footer } from "@/components/Footer";
import { person } from "@/content/site";
import { siteUrl } from "@/lib/site";
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const description =
  "Jay Kapoor builds software and studies access to care. StrayPaw, public health research, and playful engineering. Economics & Statistics at the University of Pittsburgh.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Jay Kapoor", template: "%s · Jay Kapoor" },
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Jay Kapoor",
    description,
    siteName: "Jay Kapoor",
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#f7f6ef" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <noscript>
          <style>{`.scale-control,.connection-switch,.hero-actions button,.falls,.field-tabs,.juno-steps,.care-stations{display:none!important}`}</style>
        </noscript>
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
