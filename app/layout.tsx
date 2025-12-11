import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AdSenseScript } from "@/components/ads/google-adsense";
import { PushNotificationBanner } from "@/components/ui/push-notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VebDream - Professional Web Saytlar va IT Xizmatlari",
    template: "%s | VebDream",
  },
  description: "Professional web sayt yaratish, mobil ilovalar, Telegram botlar va IT xizmatlari. O'zbekistonda eng ishonchli veb-agentlik.",
  keywords: [
    "web sayt yaratish",
    "veb dizayn",
    "web development",
    "mobile app",
    "dasturlash",
    "telegram bot",
    "IT xizmatlari",
    "VebDream",
    "O'zbekiston",
  ],
  authors: [{ name: "VebDream Team" }],
  creator: "VebDream",
  publisher: "VebDream",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://vebdream.uz",
    title: "VebDream - Sizning Raqamli Orzularingiz Amalga Oshadi",
    description: "Professional web saytlar, Telegram botlar va zamonaviy IT yechimlarini taqdim etamiz",
    siteName: "VebDream",
  },
  twitter: {
    card: "summary_large_image",
    title: "VebDream - Sizning Raqamli Orzularingiz Amalga Oshadi",
    description: "Professional web saytlar, Telegram botlar va zamonaviy IT yechimlarini taqdim etamiz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VebDream",
    url: "https://vebdream.uz",
    logo: "https://vebdream.uz/logo.png",
    description:
      "Professional web saytlar, Telegram botlar va zamonaviy IT yechimlarini taqdim etamiz",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998-99-644-84-44",
      contactType: "customer service",
      areaServed: "UZ",
      availableLanguage: ["uz", "ru", "en"],
    },
    sameAs: [
      "https://t.me/vebdream",
      "https://instagram.com/vebdream.uz",
    ],
  };

  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense verification */}
        {/* Google AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-5228715743284616" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0EA5E9" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VebDream" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
        <AdSenseScript />
        <PushNotificationBanner />
      </body>
    </html>
  );
}
