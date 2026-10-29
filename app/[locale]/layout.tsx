import type { Metadata } from "next";
import { Inter, Manrope, Anek_Bangla, Noto_Serif_Bengali } from "next/font/google";
import { siteConfig } from "@/src/config/site";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  variable: "--font-anek-bangla",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

export async function generateMetadata(
  props: { params: Promise<{locale: string}> }
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'SEO'});

  const seoTitle = t("title");
  const seoDescription = t("description");

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seoTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: seoDescription,
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'x-default': '/',
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: locale === 'en' ? siteConfig.url : `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: locale === 'bn' ? "bn_BD" : "en_US",
      type: "website",
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
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({locale, namespace: 'SEO'});

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable} ${anekBangla.variable} ${notoSerifBengali.variable} antialiased`} data-locale={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              description: t("description"),
              contactPoint: siteConfig.contact.email ? {
                "@type": "ContactPoint",
                email: siteConfig.contact.email,
                contactType: "customer support"
              } : undefined,
              sameAs: [
                siteConfig.social.linkedin,
                siteConfig.social.facebook,
                siteConfig.social.instagram
              ].filter(Boolean)
            })
          }}
        />
      </head>
      <body className={`min-h-screen bg-brand-emerald text-brand-ivory selection:bg-brand-gold/30 selection:text-white flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
