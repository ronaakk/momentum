import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

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
    <html lang="en" className={`${openSans.variable} antialiased`}>
      <body>
        {/* nav should be wider
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-0">
          <Nav />
        </div> */}

        <div> 
          {children}
        </div>

        {/* <div className="mx-auto max-w-7xl px-4 py-4 md:px-0">
          <Footer />
        </div> */}
      </body>
    </html>
  );
}

