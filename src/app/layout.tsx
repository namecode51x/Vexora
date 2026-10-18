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

export const metadata: Metadata = {
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
  openGraph: {
    title: "VEXORA — Kill the delay. Feel the difference.",
    description:
      "Latency, FPS and network optimization for gamers. Faster inputs. Better results.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        <PerformanceProvider>{children}</PerformanceProvider>
        <Toaster />
      </body>
    </html>
  );
}
