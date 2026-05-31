import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Studio — Premium Digital Agency",
  description:
    "We craft extraordinary digital experiences for visionary brands. Premium web design, development, and brand strategy.",
  keywords: [
    "Apex Studio",
    "Premium Web Design",
    "Digital Agency",
    "Brand Strategy",
    "Web Development",
    "UI/UX Design",
  ],
  authors: [{ name: "Apex Studio" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Apex Studio — Premium Digital Agency",
    description:
      "We craft extraordinary digital experiences for visionary brands.",
    siteName: "Apex Studio",
    type: "website",
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
