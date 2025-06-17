"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function DisabledCalender() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date()
  )

return (
    <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        disabled={{
            before: new Date(),
        }}
        className="rounded-lg border shadow-sm"
    />
)
}
