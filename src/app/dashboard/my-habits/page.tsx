"use client"

import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

function MyHabitsPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
      if (success) {
        toast({
          title: 'Habit successfully saved.',
          description: "Your future self will thank you for this!"
        })

        // clean up the url
        router.replace('/dashboard/my-habits', { scroll: false })
      }
  }, [])

  return (
    <div>MyHabitsPage</div>
  )
}

export default MyHabitsPage