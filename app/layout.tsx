import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/ui/motion-provider";
import { personal } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site";
import { publicAssetPath } from "@/lib/paths";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
const jetbrains = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 800",
});

const siteUrl = getSiteUrl();
const title = "Ali Alqassab | Full-Stack Developer";
const description =
  "Portfolio of Ali Alqassab, a second-year Programming student and Full-Stack Developer in Bahrain building web applications, backend systems, databases, and real-time software.";
const socialImage = {
  url: new URL(
    publicAssetPath("opengraph-image.png"),
    siteUrl?.origin ?? "http://localhost:3000",
  ).toString(),
  width: 1200,
  height: 630,
  alt: "Ali Alqassab — Full-Stack Developer & 2nd-Year Programming Student in Bahrain. The Developer System.",
};

export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  title,
  description,
  applicationName: "Ali Alqassab — The Developer System",
  authors: [{ name: personal.name }],
  creator: personal.name,
  keywords: [
    "Ali Alqassab",
    "Full-Stack Developer",
    "Bahrain",
    "Go",
    "React",
    "Next.js",
    "Software Development",
  ],
  alternates: siteUrl ? { canonical: siteUrl.toString() } : undefined,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: personal.name,
    images: [socialImage],
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
  robots: { index: Boolean(siteUrl), follow: true },
  icons: {
    icon: [{ url: publicAssetPath("icon.svg"), type: "image/svg+xml" }],
    apple: publicAssetPath("apple-icon.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrains.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
