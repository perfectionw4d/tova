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

export const metadata: Metadata = {
  title: "טובה גיטי זינגר - קטלוג ציורים | Tova Giti Zinger Art Catalog",
  description: "אתר קטלוג הציורים של אמנית טובה גיטי זינגר. ביצירות טובה תוכלו למצוא אמנות עמוקה ומשמעותית המשקפת חוקר חיים אמיתי.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
