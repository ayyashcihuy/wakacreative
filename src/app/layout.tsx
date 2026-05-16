import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://wakacreative.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Waka Creative | Jasa Video Production & Foto Profesional di Bekasi",
    template: "%s | Waka Creative",
  },
  description:
    "Waka Creative adalah spesialis video production dan foto profesional di Bekasi. Melayani video company profile, video iklan (TVC), video dokumentasi, foto direksi, color grading, dan motion graphic untuk brand Anda.",
  keywords: [
    "jasa video production Bekasi",
    "jasa foto company profile Bekasi",
    "video company profile Jakarta",
    "jasa video iklan",
    "video production profesional",
    "jasa video dokumentasi",
    "color grading video",
    "motion graphic Bekasi",
    "Waka Creative",
  ],
  authors: [{ name: "Waka Creative", url: BASE_URL }],
  creator: "Waka Creative",
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
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Waka Creative",
    title: "Waka Creative | Jasa Video Production & Foto Profesional di Bekasi",
    description:
      "Spesialis video production dan foto profesional di Bekasi. Video company profile, TVC, dokumentasi, color grading, dan motion graphic.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Waka Creative — Jasa Video Production & Foto di Bekasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waka Creative | Jasa Video Production & Foto Profesional di Bekasi",
    description:
      "Spesialis video production dan foto profesional di Bekasi. Video company profile, TVC, dokumentasi, color grading, dan motion graphic.",
    images: ["/og-image.jpg"],
    creator: "@wakacreative",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/web-app-manifest-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/web-app-manifest-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Waka Creative",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/web-app-manifest-512x512.png`,
      },
      sameAs: [
        "https://www.instagram.com/waka.creative",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-813-8594-5720",
        contactType: "customer service",
        availableLanguage: "Indonesian",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Waka Creative",
      description:
        "Spesialis video production dan foto profesional di Bekasi. Melayani video company profile, video iklan (TVC), dokumentasi, color grading, dan motion graphic.",
      url: BASE_URL,
      telephone: "+62-813-8594-5720",
      email: "info@wakacreative.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bekasi",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.31561493178479,
        longitude: 106.94690214694378,
      },
      areaServed: [
        { "@type": "City", name: "Bekasi" },
        { "@type": "City", name: "Jakarta" }
      ],
      image: `${BASE_URL}/og-image.jpg`,
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
