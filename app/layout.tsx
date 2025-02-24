import { Playfair_Display, Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fluid Simulation",
  description: "WebGL Fluid Simulation using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
