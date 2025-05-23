"use client"
import { useEffect } from "react"
import React from "react"

export default function DashBoardThemeProvider({ children } : { children: React.ReactNode }) {
    useEffect(() => {
        // add dark styles to html and body
        document.documentElement.classList.add('dark')
        document.body.classList.add('dashboard-theme', 'dark')

        // Cleanup when component unmounts (user navigates away from dashboard)
        // this will return when this component is 'destroyed', 
        return () => {
            document.documentElement.classList.remove('dark')
            document.body.classList.remove('dashboard-theme', 'dark')
        }
    }, [])

    return <>{children}</>
}