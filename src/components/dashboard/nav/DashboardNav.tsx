"use client"
import React from 'react'

import { BarChart3, Calendar, Home, Send, BookCheck, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { NavUser } from './NavUser'
import { NavMain } from './NavMain'
import NavSecondary from './NavSecondary'

// Menu items for nav
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "My Habits",
      url: "/dashboard",
      icon: BookCheck,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: '/dashboard/settings',
      icon: Settings
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: Send
    }

  ],
  // TODO: need to get user info and populate here, right now I'm using sample data
  user: {
    name: 'Ronak',
    email: 'ronaakk6@gmail.com',
    image: '/assets/images/default-avatar.svg'
  }
}

export default function DashboardNav({...props} : React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Image src='/assets/images/momentum-logo.svg' alt='momentum logo' width={30} height={30} className='filter brightness-0 invert-[0.5] sepia-[0.3] saturate-[35] hue-rotate-[80deg]'/>
              <span className="text-base font-semibold">Momentum</span> 
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
