import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SearchAdvanced – Master Every Skill",
  description: "Advanced search, explore, and master new skills with thousands of expert-led online courses. Features smart search suggestions, trending topics, and professional filters.",
  keywords: ["online learning", "advanced search", "education", "skills", "e-learning"],
  openGraph: {
    title: "SearchAdvanced",
    description: "Search and discover your next skill with advanced professional filters.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
