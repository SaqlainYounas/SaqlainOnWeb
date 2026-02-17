import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/contexts/theme-context";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import CustomCursor from "@/components/custom-cursor";
import { Suspense } from "react";
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
    default: "Saqlain | Portfolio",
    template: "%s | Saqlain",
  },
  description: "Full-stack developer building modern web applications with clean code and thoughtful design.",
  metadataBase: new URL("https://saqlain-on-web-saqlainyounas-projects.vercel.app"),
  openGraph: {
    title: "muhammad saqlain younas",
    description: "full-stack developer building modern web applications with clean code and thoughtful design.",
    url: "https://saqlain-on-web-saqlainyounas-projects.vercel.app",
    siteName: "saqlain.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "muhammad saqlain younas",
    description: "full-stack developer building modern web applications with clean code and thoughtful design.",
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
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
