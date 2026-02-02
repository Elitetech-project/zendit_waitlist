import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: "Zendit | Bridge the Last Mile from Crypto to Fiat",
  description: "Zendit is the two-rail payment infrastructure built on Flare. Seamlessly bridge on-chain assets to off-chain bank accounts with real-time quoting and automated orchestration.",
  keywords: ["Zendit", "Flare Network", "Crypto to Fiat", "Two-Rail Payments", "Blockchain Remittance", "FLR Payouts", "Fintech Infrastructure"],
  authors: [{ name: "Zendit Team" }],
  openGraph: {
    title: "Zendit | The Last Mile of Crypto is Fiat",
    description: "Seamlessly bridge Flare assets to local bank accounts with Zendit's orchestrated payment rail.",
    url: "https://zendit.io",
    siteName: "Zendit",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Zendit - Two-Rail Payment System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zendit | Two-Rail Payment Infrastructure",
    description: "Orchestrating the transition from on-chain liquidity and real-world fiat settlement on Flare.",
    site: "@zenditpay",
    creator: "@zenditpay",
    images: ["/favicon.ico"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
