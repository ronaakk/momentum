"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, HelpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import DisabledCalender from "./DisabledCalendar"
import TimePicker from "./TimePicker"

interface AddHabitFormProps {
    onAddHabit: (habit: {
        name: string
        description: string
        daysPerWeek: number
        time: string
        location: string
        goal: string
    }) => void
}

export default function AddHabitForm({ onAddHabit } : AddHabitFormProps) {
    const [habitName, setHabitName] = useState('')
    const [location, setLocation] = useState('')
    const [goal, setGoal] = useState('')
    const [daysPerWeek, setDaysPerWeek] = useState(3)
    const [time,  setTime] = useState('8:00')
    const [date, setDate] = useState<Date | undefined>(new Date())

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // TODO: Need to create db table for habits and how they're going to be stored
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Add New Habit</CardTitle>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <HelpCircle className="h-4 w-4" />
                                <span className="sr-only">Habit structure help</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                            <p>Structure your habit with:</p>
                            <p className="mt-2 font-medium">
                                I will [habit], [time/location] because I want to [goal/type of person I want to be]
                            </p>
                            <p className="mt-2 text-xs">
                                This structure helps create stronger habit foundations by connecting actions to your identity and
                                goals.
                            </p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <CardDescription>Define your habit with a clear structure to increase success</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="habit-name">
                        I will... <span className="text-[#1DB954]">(What habit?)</span>
                    </Label>
                    <Input
                        id="habit-name"
                        placeholder="e.g., meditate for 10 minutes"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="habit-location">
                            At... <span className="text-[#1DB954]">(Where?)</span>
                        </Label>
                        <Input
                            id="habit-location"
                            placeholder="e.g., in my bedroom"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="habit-time">
                            Time <span className="text-[#1DB954]">(When?)</span>
                        </Label>
                        {/* <TimePickerDemo value={time} onChange={setTime} /> */}
                        {/* <TimePicker onChange={setTime}/> */}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="habit-goal">
                        Because I want to... <span className="text-[#1DB954]">(Why?)</span>
                    </Label>
                    <Textarea
                        id="habit-goal"
                        placeholder="e.g., reduce stress and be more mindful"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="min-h-[80px]"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="days-per-week">Days Per Week</Label>
                        <Select value={daysPerWeek.toString()} onValueChange={(value) => setDaysPerWeek(Number.parseInt(value))}>
                            <SelectTrigger id="days-per-week">
                                <SelectValue placeholder="Select days" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                    {num} {num === 1 ? "day" : "days"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                                {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            {/* <Calendar mode="single" selected={date} onSelect={setDate} initialFocus /> */}
                            <DisabledCalender />
                        </PopoverContent>
                    </Popover>
                    </div>
                </div>

                <div className="pt-2">
                    <Button type="submit" className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Habit
                    </Button>
                </div>
                </form>
            </CardContent>
        </Card>
    )




}