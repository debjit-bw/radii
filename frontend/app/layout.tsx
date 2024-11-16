import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import "./globals.css";
import DynamicProvider from "@/providers/dynamic-provider";
import Providers from "@/providers";

const neueRetrograde = localFont({
  src: "./fonts/NeueRegrade-Variable.woff2",
  variable: "--font-neue-retrograde",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const btBeauSans = localFont({
  src: [
    {
      path: "./fonts/BT-BeauSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/BT-BeauSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/BT-BeauSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BT-BeauSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/BT-BeauSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BT-BeauSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/BT-BeauSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BT-BeauSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/BT-BeauSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/BT-BeauSans-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-bt-beau-sans",
});

export const metadata: Metadata = {
  title: "Radii",
  description: "The Future of Digital Advertisements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${neueRetrograde.variable} ${geistMono.variable} ${btBeauSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
