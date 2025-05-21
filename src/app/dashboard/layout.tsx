import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/dashboard/theme-provider"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardNav from "@/components/dashboard/DashboardNav"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Momentum AI",
  description: "An AI-powered habit tracking platform.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dashboard-theme ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SidebarProvider>
            <DashboardNav variant="inset"/>
              {children}  
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}