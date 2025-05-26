"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"
import createClient from "@/utils/supabase/client"
import { useEffect, useState } from "react"

export function SiteHeader() {
    const [greeting, setGreeting] = useState<String>('')

    // need to use this because getUser is a client side function, and we can't use async within a client side function.
    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()
            const { data : { user }, error } = await supabase.auth.getUser()
            if (error || !user) {
                console.log('An error occured retrieving the user:', error)
            }

            const { data: userData } = await supabase.from('users').select('*').eq('id', user?.id).single()
            if (userData) {
                const firstName = userData.name.split(' ')[0]
                
                // extracting time of day
                const currHour = new Date().getHours()
                let timeOfDay = ''
                if (currHour < 12) {
                    timeOfDay = 'morning'
                } else if (currHour < 17) {
                    timeOfDay = 'afternoon'
                } else {
                    timeOfDay = 'evening'
                }

                setGreeting(`Good ${timeOfDay}, ${firstName}.`)
            }
        } 
        fetchData()
    }, [])

    return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{greeting}</h1>
        </div>
    </header>
    )
}