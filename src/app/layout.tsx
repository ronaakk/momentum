import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// Load the font I want to use
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans", // Custom CSS variable
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}

