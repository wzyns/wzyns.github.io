import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "b10g",
  description: "A file-explorer style blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
        <div className="flex-1 flex flex-col">{children}</div>
        <footer className="py-6 text-center text-sm text-zinc-400 dark:text-zinc-600">
          © 2025 b10g. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
