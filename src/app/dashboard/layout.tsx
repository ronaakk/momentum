import "@/app/globals.css"
import DashboardNav from "@/components/dashboard/nav/DashboardNav"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import DashBoardThemeProvider from "@/components/dashboard/DashboardThemeProvider"

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
    <DashBoardThemeProvider>
      <SidebarProvider>
        <DashboardNav variant="inset"/>
        {children}  
      </SidebarProvider>
    </DashBoardThemeProvider> 
  )
}