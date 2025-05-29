import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Load the font I want to use
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans", // Custom CSS variable
});

export const metadata: Metadata = {
  title: "Momentum",
  description: "Tiny changes, lasting results.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} antialiased`} suppressHydrationWarning>
      <body>
          {children}
          <Toaster />
      </body>
    </html>
  );
}

