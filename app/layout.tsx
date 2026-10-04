import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "ReadmeForge | GitHub Profile README Builder",
  description: "Compose, preview, and export a polished GitHub profile README.",
  openGraph: {
    title: "ReadmeForge | GitHub Profile README Builder",
    description: "Compose, preview, and export a polished GitHub profile README.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Script id="readmeforge-theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: "try { if (localStorage.getItem('readmeforge-theme') === 'dark') document.documentElement.classList.add('dark'); } catch {}"
        }} />
        {children}
      </body>
    </html>
  );
}