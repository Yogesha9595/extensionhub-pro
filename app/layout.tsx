import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PaddleCheckoutLauncher } from "@/components/paddle/paddle-checkout-launcher";

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
  title: "ExtensionHub",
  description: "Discover useful browser extensions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PaddleCheckoutLauncher />

        {children}
      </body>
    </html>
  );
}