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
import createClient from "@/utils/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AddHabitForm() {
    const supabase = createClient()
    const { toast } = useToast()
    const router = useRouter()

    const [habitName, setHabitName] = useState('')
    const [habitDescription, setHabitDescription] = useState('')
    const [location, setLocation] = useState('')
    const [goal, setGoal] = useState('')
    const [daysPerWeek, setDaysPerWeek] = useState('')
    const [time,  setTime] = useState('')
    const [habitDifficulty, setHabitDifficulty] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO: make sure this habit saving logic works
        // get the current user and their id
        const { data : { user } } = await supabase.auth.getUser()
        const userId = user?.id

        const formData = {
            user_id: userId, // the foreign key to establish relationship with user
            habit_name: habitName.trim(),
            habit_description: habitDescription.trim(),
            location: location.trim(),
            goal: goal.trim(),
            time_of_day: time,
            days_per_week: parseInt(daysPerWeek),
            habit_difficulty: habitDifficulty
        }

        const { error : insertError } = await supabase.from('habits').insert(formData)

        if (insertError) {
            console.log('There was an error saving this habit to the db', insertError)
            toast({
                title: 'Uh oh! Something went wrong',
                description: insertError.message
            })
        } else {
            // redirect user to 'my habits'
            router.push('/dashboard/my-habits?success=true')
        }
    }

    const changeDifficultyDisplay = (difficulty : String) : String => {
        if (difficulty === 'Foundation') {
            return "Foundation - A habit that builds your routine"
        } else if (difficulty === 'Building') {
            return "Building - A habit that challenges you to grow"
        } else {
            return "Mastering - A habit you are living by"
        }
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
                        <Label htmlFor="habit-description">
                            I will... <span className="text-[#1DB954]">(What habit?)</span>
                        </Label>
                        <Input
                            id="habit-description"
                            placeholder="e.g., meditate for 10 minutes"
                            value={habitDescription}
                            onChange={(e) => setHabitDescription(e.target.value)}
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
                            <Select value={time.toString()} onValueChange={(value) => setTime(value)}>
                                <SelectTrigger id="habit-time">
                                    <SelectValue placeholder="Time of Day" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['Morning', 'Afternoon', 'Evening'].map((time_of_day) => (
                                        <SelectItem key={time_of_day} value={time_of_day.toString()}>
                                            {time_of_day}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <Select value={daysPerWeek.toString()} onValueChange={(value) => setDaysPerWeek(value)}>
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
                            <Label htmlFor="habit-difficulty">
                                Difficulty <span className="text-[#1DB954]">(What stage is this habit in?)</span>
                            </Label>
                            <Select value={habitDifficulty.toString()} onValueChange={(value) => setHabitDifficulty(value)}>
                                <SelectTrigger id="habit-difficulty">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    {['Foundation', 'Building', 'Mastering'].map((difficulty) => (
                                        <SelectItem key={difficulty} value={difficulty.toString()}>
                                            {changeDifficultyDisplay(difficulty)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>    
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="habit-name">
                            Name your habit
                        </Label>
                        <Input
                            id="habit-name"
                            placeholder="e.g., Morning Meditation"
                            value={habitName}
                            onChange={(e) => setHabitName(e.target.value)}
                        />
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