import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cursor } from "@/components/Cursor";
import { Boot } from "@/components/Boot";
import { CommandPalette } from "@/components/CommandPalette";
import { RouteBackdrop } from "@/components/RouteBackdrop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Jay Kapoor — fintech, healthtech, and investment research. The work behind the resume.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Portfolio`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Jay Kapoor",
    "portfolio",
    "fintech",
    "healthtech",
    "investment research",
    "venture research",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — Portfolio`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Portfolio`,
    description,
    creator: "@jaybuildsvx",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1a4d",
};

// JSON-LD Person schema — helps search engines understand & richly surface Jay.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  image: `${siteUrl}/jay-kapoor.jpg`,
  jobTitle: "Builder & Researcher",
  description,
  email: `mailto:${profile.email}`,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Pittsburgh",
  },
  knowsAbout: [
    "Fintech",
    "Healthtech",
    "Investment Research",
    "Venture Research",
    "Operations",
    "Market Mapping",
  ],
  sameAs: socials
    .filter((s) => s.type !== "email")
    .map((s) => s.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="grain min-h-screen">
        <div className="backdrop" aria-hidden />
        <RouteBackdrop />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var r=document.documentElement,t=localStorage.getItem('accent'),m={gold:'232 176 75',amber:'233 162 59',green:'126 231 135',white:'243 239 228'};if(t&&m[t])r.style.setProperty('--accent',m[t]);var bm={sunset:'/backdrop-sunset.webp',hills:'/backdrop-hills.webp',cobalt:'/sky-backdrop.webp'},o=localStorage.getItem('backdrop'),p=location.pathname,k=(o&&bm[o])?o:(p.indexOf('/work')===0?'hills':(p.indexOf('/writing')===0||p.indexOf('/ledger')===0||p.indexOf('/thesis')===0)?'cobalt':(p.indexOf('/about')===0?'hills':'sunset'));if(bm[k])r.style.setProperty('--bg-image','url('+bm[k]+')');}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Boot />
        <CommandPalette />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
