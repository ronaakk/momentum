"use client"
import React from 'react'

import { BarChart3, BookOpen, Home, Send, BookCheck, Settings } from "lucide-react"
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
import createClient from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { getProfileImageUrl } from '@/utils/supabase/profileStorage'

// Menu items for nav
const navData = {
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
      title: "Reflections",
      url: "/dashboard/reflections",
      icon: BookOpen,
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
}

export default function DashboardNav({...props} : React.ComponentProps<typeof Sidebar>) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    image: ''
  })

  useEffect(() => {
    // we need to use async here because useEffect runs on the client, after initial render
    const fetchData = async () => {
      const supabase = createClient()
      const { data : { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        console.log('An error occured retrieving user for nav:', error)
        return
      }
      
      const { data } = await supabase.from('users').select('name, email, profile_image').eq('id', user?.id).single()
      // get the signed url for their profile image
      const profilePicture = await getProfileImageUrl(data?.profile_image)
      setUserInfo({
        name: data?.name || 'User',
        email: data?.email || '',
        image: profilePicture
      })
    }

    fetchData()
  }, [])

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
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  )
}
