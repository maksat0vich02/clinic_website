import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import LayoutPage from "../components/layout/LayoutPage";

// Используем шрифт Inter вместо Geist для лучшей читаемости
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Стоматологическая клиника Dentaris | Бишкек | Современная стоматология",
  description:
    "Современная стоматология без боли в Бишкеке. Лечение зубов, имплантация, протезирование, отбеливание. Опытные врачи, безболезненно, с гарантией. Запись онлайн.",
  keywords: [
    "стоматология Бишкек",
    "лечение зубов",
    "имплантация зубов",
    "стоматологическая клиника",
    "зубной врач",
    "протезирование зубов",
    "отбеливание зубов",
    "детский стоматолог",
    "брекеты Бишкек",
    "зубная боль",
    "платная стоматология",
    "клиника Dentaris",
  ].join(", "),
  authors: [{ name: "Dentaris Clinic" }],
  creator: "Dentaris",
  publisher: "Dentaris",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://dentaris.kg",
    title: "Стоматологическая клиника Dentaris | Бишкек",
    description:
      "Современная стоматология без боли в Бишкеке. Лечение, имплантация, эстетическая стоматология.",
    siteName: "Dentaris Clinic",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dentaris Clinic - современная стоматология в Бишкеке",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentaris Clinic | Стоматология в Бишкеке",
    description: "Современная стоматология без боли. Запись онлайн.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://dentaris.kg",
  },
  category: "medical",
  verification: {
    google: "ваш-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Favicon и иконки */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Яндекс.Метрика и Google Analytics можно добавить здесь */}
        {/* <script dangerouslySetInnerHTML={{ __html: `YOUR_ANALYTICS_CODE` }} /> */}
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <LayoutPage>{children}</LayoutPage>

        {/* Script для Telegram бота */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Простая проверка отправки форм
              document.addEventListener('DOMContentLoaded', function() {
                const forms = document.querySelectorAll('form, button[type="submit"]');
                forms.forEach(form => {
                  form.addEventListener('submit', function(e) {
                    if (this.querySelector('input[name="phone"]') && !this.querySelector('input[name="phone"]').value) {
                      e.preventDefault();
                      alert('Пожалуйста, введите телефон');
                    }
                  });
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
