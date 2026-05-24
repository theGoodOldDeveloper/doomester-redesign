import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOOMester - Digitális Okos Otthon Mester",
  description: "Home Assistant rendszerek telepítése, konfigurálása és felügyelete Gyöngyös és környékén",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Lora:ital,wght@0,400;0,600;1,400&family=Oswald:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
