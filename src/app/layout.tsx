import type { Metadata } from "next";
import "./globals.css";
import { TranslationProvider } from '@/hooks/useTranslation';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: "LogBid - International Logistics",
  description: "Connect with verified logistics agents globally. Save up to 40% on your shipments.",
  icons: {
    icon: "/logbid_logo.ico",
    shortcut: "/logbid_logo.ico",
    apple: "/logbid_logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TranslationProvider>
          <Navigation />
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
