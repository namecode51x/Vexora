import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PerformanceProvider } from "@/components/vexora/performance-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* URL pública del sitio (el export de GitHub Pages sirve bajo /Vexora) */
const SITE_URL = "https://namecode51x.github.io/Vexora";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "VEXORA — Kill the delay. Feel the difference.",
  description:
    "VEXORA optimizes your keyboard and mouse latency, slashes delay and pushes your FPS to the max. The ultimate performance optimization utility for Windows. Every millisecond counts.",
  keywords: [
    "Vexora",
    "PC optimization",
    "reduce delay",
    "more FPS",
    "low latency",
    "gaming",
    "input lag",
    "Windows optimizer",
  ],
  authors: [{ name: "VEXORA" }],
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VEXORA — Kill the delay. Feel the difference.",
    description:
      "Latency, FPS and network optimization for gamers. Faster inputs. Better results.",
    url: "/",
    siteName: "VEXORA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VEXORA — Kill the delay. Feel the difference.",
    description:
      "Latency, FPS and network optimization for gamers. Faster inputs. Better results.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

/* Datos estructurados para resultados enriquecidos de Google */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VEXORA",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Windows 10, Windows 11",
  description:
    "Performance optimization utility for gamers. Removes keyboard and mouse input waits, tunes keyboard repeat, keeps the pointer 1:1 and stabilizes your connection.",
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        <PerformanceProvider>{children}</PerformanceProvider>
        <Toaster />
      </body>
    </html>
  );
}
