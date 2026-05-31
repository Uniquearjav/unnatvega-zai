import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unnat Vega — Premium Trade & Digital Agency",
  description:
    "Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence. Export management, import facilitation, and digital presence.",
  keywords: [
    "Unnat Vega",
    "Export Import",
    "Trade Solutions",
    "Digital Agency",
    "Export Management",
    "Import Services",
    "International Trade",
    "Business Solutions",
  ],
  authors: [{ name: "Unnat Vega" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Unnat Vega — Premium Trade & Digital Agency",
    description:
      "Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence.",
    siteName: "Unnat Vega",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
