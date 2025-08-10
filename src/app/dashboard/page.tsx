"use client"

import { SiteHeader } from '@/components/dashboard/SiteHeader'
import { SidebarInset } from '@/components/ui/sidebar'
import AddHabitForm from '@/components/dashboard/habits/add-habit-form'
import { useState, useEffect } from 'react'
import DashboardHabitList from '@/components/dashboard/habits/DashboardHabitList'
import { useToast } from '@/hooks/use-toast'
import createClient from '@/utils/supabase/client'

// generate days of current week in an array format (a calendar like view)
const getCurrentWeekDays = () => {
  const today = new Date() // the full date object (ex. Dec 18, 2024 3:45 PM)

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    // doing the math to get the past 6 days from today
    date.setDate(today.getDate() - 6 + i)
    
    // return todays Date object, plus the abbreviation of the current day
    return {
      date,
      dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
      isToday: i === 6
    }
  })
}

export default function Dashboard() {
  const supabase = createClient()
  const { toast } = useToast()
  const [weekDays] = useState(getCurrentWeekDays())
  // 6 will always represent today
  const currentDayIndex = 6

  // load the habit list with sample data to test mobile responsiveness
  const [habits, setHabits] = useState([
    {
      id: 1,
      habit_name: "Morning meditation",
      habit_description: "I will meditate for 10 minutes, in my bedroom because I want to reduce stress and be more mindful.",
      days_per_week: 5,
      time_of_day: "Morning",
      location: "in my bedroom",
      goal: "reduce stress and be more mindful",
      completedDays: [false, true, true, false, false, false, false],
      reminder_set: true,
      is_active: true,
      habit_difficulty: "Foundation" as "Foundation",
      user_id: "sample-id-1"
    },
    {
      id: 2,
      habit_name: "Evening reading",
      habit_description: "I will read for 30 minutes, before bed because I want to learn new things and improve my focus.",
      days_per_week: 3,
      time_of_day: "Evening",
      location: "before bed",
      goal: "learn new things and improve my focus",
      completedDays: [false, false, true, true, false, false, false],
      reminder_set: true,
      is_active: true,
      habit_difficulty: "Building" as "Building",
      user_id: "sample-id-2"
    },
    {
      id: 3,
      habit_name: "Evening workout",
      habit_description: "I will exercise for 30 minutes, at the gym because I want to be healthier and have more energy.",
      days_per_week: 4,
      time_of_day: "Evening",
      location: "at the gym",
      goal: "be healthier and have more energy",
      completedDays: [false, true, false, true, true, false, false],
      reminder_set: true,
      is_active: false,
      habit_difficulty: "Mastering" as "Mastering",
      user_id: "sample-id-3"
    },
  ])

  // TODO: Implement reminder toggling closer to MVP using Resend API


  const saveHabitCompletion = async (habitId: number, isCompleted: boolean, targetDate: Date) => {
    if (isCompleted) {
      const { error : completionInsertError } = await supabase
        .from('habit_completions')
        .insert({
          habit_id: habitId,
          completed_at: targetDate.toISOString()
        })
      
      if (completionInsertError) {
        console.log('There was an error saving this habit completion to the db', completionInsertError)
        toast({
            title: 'Uh oh! Something went wrong',
            description: completionInsertError.message
        })
      }
    } else {
      const startOfDay = new Date(targetDate)
      startOfDay.setHours(0, 0, 0)

      const endOfDay = new Date(targetDate)
      endOfDay.setHours(23, 59, 59, 999)
      
      // only delete the completion whos date lies in between start and end of target date
      const { error } = await supabase
        .from('habit_completions')
        .delete()
        .eq('habit_id', habitId)
        .gte('completed_at', startOfDay.toISOString())
        .lte('completed_at', endOfDay.toISOString())
      
      if (error) {
        console.log('Error removing completion:', error)
        toast({
          title: 'Error',
          description: 'Failed to remove completion'
        })
      }
    }
  }

  const onToggleHabitCompletion = (id: number, dayIndex: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id && habit.is_active) {
          // set completion on completedDays by getting the day clicked in UI
          const newCompletedDays = [...habit.completedDays]
          newCompletedDays[dayIndex] = !newCompletedDays[dayIndex]
          const targetDate = weekDays[dayIndex].date

          // add to habit completions (TODO: turn on when general UI WORKS)
          // saveHabitCompletion(id, newCompletedDays[currentDayIndex], targetDate)
          
          // return the habit with the updated days checked
          return {...habit, completedDays: newCompletedDays}
        }
        return habit
      })
    )
  }

  const setReminderChange = async (habitId : number, reminderState : boolean) => {
    const { error } = await supabase
      .from('habits')
      .update({ reminder_set : reminderState })
      .eq('habit_id', habitId)
  }

  const onToggleReminder = async (id: number) => {
    setHabits(habits.map((habit) => {
      if (habit.id === id && habit.is_active) {
        const updatedHabit = { ...habit, reminder_set: !habit.reminder_set }
        // update reminders in db
        // TODO: This reminder setting logic will need changing when we actually get the data and don't load sample
        // setReminderChange(id, updatedHabit.reminder_set)

        toast({
          title: 'Reminders updated.',
          description: updatedHabit.reminder_set ? "Keep an eye out in your email!" : "Reminders have been turned off."
        })
        return updatedHabit
      }
      return habit
    }))
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
                    <AddHabitForm />
                    <DashboardHabitList
                      habits={habits}
                      currentDayIndex={currentDayIndex}
                      onToggleHabitCompletion={onToggleHabitCompletion}
                      onToggleReminder={onToggleReminder}
                      weekDays={weekDays}
                    />
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