import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chitistudio.com"),
  title: {
    default: "Chiti Technologies — Intelligent Systems & Digital Design",
    template: "%s | Chiti Technologies",
  },
  description:
    "We build intelligent systems, automation workflows, and scalable digital infrastructure. A premium creative technology collective specializing in Product Design, web development, and brand identity.",
  keywords: [
    "design studio",
    "UI/UX",
    "web development",
    "brand identity",
    "digital agency",
    "automation",
    "CRM",
    "chiti technologies",
  ],
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      en: "/en",
      hi: "/hi",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Chiti Technologies",
    title: "Chiti Technologies — Intelligent Systems & Digital Design",
    description:
      "We build intelligent systems, automation workflows, and scalable digital infrastructure.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Chiti Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiti Technologies — Intelligent Systems & Digital Design",
    description:
      "We build intelligent systems, automation workflows, and scalable digital infrastructure.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased selection:bg-primary selection:text-on-primary overflow-x-hidden`}
      >
        <div id="theme-clip" />
        {children}
      </body>
    </html>
  );
}
