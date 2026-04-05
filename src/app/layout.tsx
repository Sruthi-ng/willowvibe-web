import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    default: "WillowVibe | Data Synapse — Data Engineering Services",
    template: "%s | WillowVibe Data Synapse",
  },
  description:
    "WillowVibe Data Synapse is your dedicated data engineering team. We build resilient cloud lakehouses, automate complex data pipelines, and eliminate data silos so your business thrives on clean, actionable intelligence.",
  keywords: [
    "data engineering",
    "data pipeline",
    "cloud lakehouse",
    "ETL ELT",
    "Snowflake",
    "Databricks",
    "AWS data engineering",
    "data migration",
    "MLOps infrastructure",
    "WillowVibe",
  ],
  authors: [{ name: "WillowVibe Data Synapse", url: "https://www.willowvibe.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.willowvibe.com",
    siteName: "WillowVibe | Data Synapse",
    title: "WillowVibe | Data Synapse — Architecting the Data Ecosystem of Tomorrow",
    description:
      "Your dedicated data engineering team. We build cloud lakehouses, automate pipelines, and turn raw data into actionable intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WillowVibe | Data Synapse",
    description: "Expert data engineering services — pipelines, cloud lakehouses, AI infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
