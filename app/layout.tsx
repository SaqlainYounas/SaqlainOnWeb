import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { I18nProvider } from "@/lib/contexts/i18n-context";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import CustomCursor from "@/components/custom-cursor";
import { Suspense } from "react";
import content from "@/content.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: content.metadata.title.default,
    template: content.metadata.title.template,
  },
  description: content.metadata.description,
  metadataBase: new URL("https://saqlain-on-web-saqlainyounas-projects.vercel.app"),
  openGraph: {
    title: content.metadata.openGraph.title,
    description: content.metadata.openGraph.description,
    url: "https://saqlain-on-web-saqlainyounas-projects.vercel.app",
    siteName: content.metadata.openGraph.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.metadata.twitter.title,
    description: content.metadata.twitter.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <FirebaseAnalytics />
        </Suspense>
        <ThemeProvider>
          <I18nProvider>
            <CustomCursor />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
