import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./experience.css";

import { Nav } from "@/components/Nav";

import { Footer } from "@/components/Footer";
import { person } from "@/content/site";
import { siteUrl } from "@/lib/site";
const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const description =
  "Jay Kapoor. Economics and Statistics student at Pitt. Interested in software, data, and public health. Projects, research, and photos.";
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
export const viewport: Viewport = { themeColor: "#f4f4f0" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <noscript>
          <style>{`.scale-control,.connection-switch,.network-toggle,.photo-scrub,.hero-actions button,.falls,.field-tabs,.juno-steps,.care-stations{display:none!important}.then-photo{clip-path:none!important;position:relative!important;aspect-ratio:1.3}.now-photo{position:relative!important;aspect-ratio:1}.then-now{aspect-ratio:auto!important}.split-divider,.photo-era{display:none!important}@media(max-width:760px){.nav-links{display:flex!important;gap:15px;flex-wrap:wrap}.site-nav{height:auto!important;min-height:100px;flex-wrap:wrap;padding-block:15px}.menu-toggle{display:none!important}.scene-narration button{display:none!important}}`}</style>
        </noscript>
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
