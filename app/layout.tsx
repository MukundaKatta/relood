import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relood — The resale app for kids stuff.",
  description:
    "Buy and sell outgrown clothes, toys, and gear. Local pickup. Fixed prices. No haggling, no scams.",
  openGraph: {
    title: "Relood — The resale app for kids stuff.",
    description:
      "Buy and sell outgrown clothes, toys, and gear. Local pickup. Fixed prices. No haggling, no scams.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Relood&accent=lime&category=Marketplace",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Relood&accent=lime&category=Marketplace",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
