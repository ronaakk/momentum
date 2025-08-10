"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, BellOff, Clock, Info, Sun, Moon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { format } from "date-fns"

// all the interfaces required
interface WeekDay {
    date: Date
    dayName: string
    isToday: boolean
}

interface Habit {
    id: number
    habit_name: string
    habit_description: string
    days_per_week: number
    time_of_day: string
    location: string
    goal: string
    completedDays: boolean[] // UI state use only, this is not in db
    reminder_set: boolean
    is_active: boolean
    habit_difficulty: "Foundation" | "Building" | "Mastering"
    user_id: string
}

interface HabitListProps {
    habits: Habit[]
    weekDays: WeekDay[]
    // functions to deal with logging of habits and reminders
    onToggleHabitCompletion: (id: number, dayIndex: number) => void
    onToggleReminder: (id: number) => void
    // this will be used in the UI to check the current day
    currentDayIndex: number
}

function DashboardHabitList({
  habits,
  weekDays,
  onToggleHabitCompletion,
  onToggleReminder,
  currentDayIndex
} : HabitListProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Habits</CardTitle>
        <CardDescription>
          Track your daily progress
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* check if we have any habits first off */}
          {habits.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No active habits. Add your first one to get started!
            </div>
          ) : (
            <Accordion type="multiple" className="w-full">
              {/* map over the habits and place them all in their own item */}
              {habits.map((habit) => {

                // calculate the completion for this current week using completedDays from the habit, then getting the percentage
                const completedCount = habit.completedDays.filter((day) => day).length
                // this will be used in the analytics and the progress bar
                const weeklyProgress = (completedCount / habit.days_per_week) * 100

                return (
                  <AccordionItem key={habit.id} value={`habit-${habit.id}`} className="border-b border-border space-y-2">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex flex-1 items-center">
                        <div
                          className={`mr-3 h-4 w-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            habit.completedDays[currentDayIndex] 
                              ? 'bg-[#1DB954] border-[#1DB954]' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            onToggleHabitCompletion(habit.id, currentDayIndex)
                          }}
                        >
                          {habit.completedDays[currentDayIndex] && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <span className="font-medium text-sm">{habit.habit_name}</span>
                            <div className="flex ml-auto gap-2 items-center">
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <Clock className="hidden sm:block sm:h-3 sm:w-3 sm:text-[#1DB954]"/>
                                <span className="hidden sm:block">{habit.time_of_day}</span>
                                {habit.time_of_day === 'Morning' || habit.time_of_day === 'Afternoon' ? (
                                  <Sun className="block sm:hidden h-3.5 w-3.5 sm:text-[#1DB954]"/>
                                ) : (
                                  <Moon className="block sm:hidden h-3.5 w-3.5 sm:text-[#1DB954]"/>
                                )}
                              </Badge>

                              <Badge variant="secondary" className="flex items-center gap-1">
                                {completedCount}/{habit.days_per_week} 
                                <span className="hidden sm:block">days</span>
                              </Badge>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <Progress value={weeklyProgress} className="h-2"/>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-4 pt-2">
                      <div className="space-y-4 px-7">
                        <div className="text-sm">{habit.habit_description}</div>

                        {/* reminders */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "p-2 rounded-full transition-colors",
                                habit.reminder_set ? "bg-[#1DB954]/20 text-[#1DB954]" : "bg-muted text-muted-foreground",
                              )}
                            >
                              {habit.reminder_set ? <Bell className="h-3 w-3 sm:h-4 sm:w-4" /> : <BellOff className="h-3 w-3 sm:h-4 sm:w-4" />}
                            </div>
                            <div>
                              <span className="text-xs sm:text-sm font-medium">Reminders</span>
                              <p className="text-xs text-muted-foreground">
                                {habit.reminder_set ? "Active" : "Disabled"}
                              </p>
                            </div>
                          </div>
                
                          {/* Desktop: Switch circle */}
                          <Switch
                            checked={habit.reminder_set}
                            onCheckedChange={() => onToggleReminder(habit.id)}
                            className="data-[state=checked]:bg-[#1DB954]"
                          />
                          
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Weekly Progress</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3.5 w-3.5 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <span>Aiming to complete your habit {habit.days_per_week} days per week. (Monday to Sunday)</span>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {/* mobile view */}
                          <div className="sm:hidden overflow-x-auto scrollbar-hide">
                            <div className="flex gap-4 min-w-max px-2 pb-2">
                              {weekDays.map((day, index) => (
                                <div key={index} className="flex flex-col items-center space-y-2 flex-shrink-0">
                                  <span
                                    className={cn(
                                      "text-xs font-medium whitespace-nowrap",
                                      day.isToday ? "text-[#1DB954]" : "text-muted-foreground",
                                    )}
                                  >
                                    {day.dayName}
                                  </span>
                                  <button
                                    onClick={() => onToggleHabitCompletion(habit.id, index)}
                                    className={cn(
                                      "relative h-10 w-10 rounded-xl transition-all duration-200",
                                      "flex items-center justify-center hover:scale-105 active:scale-95",
                                      "border-2 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 focus:ring-offset-background",
                                      habit.completedDays[index]
                                        ? "bg-[#1DB954] border-[#1DB954] text-white shadow-lg shadow-[#1DB954]/25"
                                        : "border-border hover:border-[#1DB954]/50 bg-card/50",
                                        day.isToday && 
                                          !habit.completedDays[index] &&
                                          "ring-2 ring-[#1DB954]/30 ring-offset-1 ring-offset-background",
                                    )}
                                  >
                                    {habit.completedDays[index] ? (
                                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : (
                                      <span className="text-xs font-medium text-muted-foreground">
                                        {format(day.date, "d")}
                                      </span>
                                    )}                            
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>


                          {/* desktop view */}
                          <div className="hidden sm:grid grid-cols-7 gap-2 sm:gap-3">
                            {weekDays.map((day, index) => (
                              <div key={index} className="flex flex-col items-center space-y-2">
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    day.isToday ? "text-[#1DB954]" : "text-muted-foreground",
                                  )}
                                >
                                  {day.dayName}
                                </span>
                                <button
                                  onClick={() => onToggleHabitCompletion(habit.id, index)}
                                  className={cn(
                                    "relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl transition-all duration-200",
                                    "flex items-center justify-center hover:scale-105 active:scale-95",
                                    "border-2 focus:outline-none focus:ring-2 focus:ring-[#1DB954] focus:ring-offset-2 focus:ring-offset-background",
                                    habit.completedDays[index]
                                      ? "bg-[#1DB954] border-[#1DB954] text-white shadow-lg shadow-[#1DB954]/25"
                                      : "border-border hover:border-[#1DB954]/50 bg-card/50",
                                      day.isToday && 
                                        !habit.completedDays[index] &&
                                        "ring-2 ring-[#1DB954]/30 ring-offset-1 ring-offset-background",
                                  )}
                                >
                                  {habit.completedDays[index] ? (
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <span className="text-xs font-medium text-muted-foreground">
                                      {format(day.date, "d")}
                                    </span>
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardHabitList