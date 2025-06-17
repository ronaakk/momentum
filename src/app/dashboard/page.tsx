"use client"

import { SiteHeader } from '@/components/dashboard/content/SiteHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import AddHabitForm from '@/components/dashboard/content/add-habit-form'

export default function Dashboard() {
  const addHabit = (habitData: {
    name: string
    description: string
    daysPerWeek: number
    time: string
    location: string
    goal: string
  }) => {

  }

  
  return (
    <SidebarInset>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1">
          <div className="container flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  {/* Content goes in here */}
                  <div className="rounded-lg border p-6">
                    <AddHabitForm onAddHabit={addHabit} />
                    {/* TODO: Implement the general analytics later */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarInset>
  )
}