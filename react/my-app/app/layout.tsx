import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Component/Navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// NEXT.JS TOPIC 3: METADATA API
// Next.js provides a Metadata API for SEO and social sharing
export const metadata: Metadata = {
  title: "React & Next.js Examples",
  description: "Learn React hooks, props, conditional rendering, and Next.js routing, server/client components, and metadata",
  keywords: ["React", "Next.js", "Hooks", "Routing", "Server Components"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "React & Next.js Examples",
    description: "Comprehensive examples of React and Next.js topics",
    type: "website",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
