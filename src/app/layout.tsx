import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://unnatvega.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Unnat Vega — Premium Trade & Digital Agency",
    template: "%s | Unnat Vega",
  },
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
    "Global Trade",
    "Export Compliance",
    "Import Facilitation",
    "Digital Presence",
    "Brand Identity",
    "Mumbai Export Agency",
    "India Trade Solutions",
  ],
  authors: [{ name: "Unnat Vega", url: BASE_URL }],
  creator: "Unnat Vega",
  publisher: "Unnat Vega",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Unnat Vega — Premium Trade & Digital Agency",
    description:
      "Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence.",
    url: BASE_URL,
    siteName: "Unnat Vega",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Unnat Vega — Premium Trade & Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unnat Vega — Premium Trade & Digital Agency",
    description:
      "Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@unnatvega",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

/* ─────────────────────── JSON-LD Structured Data ─────────────────────── */
function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Unnat Vega",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      "Empowering exporters, importers, and businesses with powerful digital solutions for global trade excellence.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-75974-64336",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://linkedin.com/company/unnatvega",
      "https://instagram.com/unnatvega",
      "https://facebook.com/unnatvega",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Unnat Vega",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Unnat Vega",
    image: `${BASE_URL}/logo.svg`,
    url: BASE_URL,
    telephone: "+91-75974-64336",
    email: "unnatvega@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mumbai",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
          <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
