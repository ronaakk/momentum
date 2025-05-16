'use client'
import createClient from '@/utils/supabase/client'
import { useToast } from '@/hooks/use-toast'   

// accept toast as a parameter here, ['toast'] tells TS to only extract the toast method from useToast
// we had to do this because we can't use hooks in plain functions, it has to be within a component or custom hooks
export async function handleGoogleLogin({ toast } : { toast: ReturnType<typeof useToast>['toast']}) {
    const supabase = createClient()
    
    const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/callback`
    console.log('Redirecting to:', redirectTo)
    
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // this will redirect to the callback URL after login
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/callback`,
        },
    })
     
    if (error) {
        console.log('Google login unsuccessful', error.message)
        toast({
            title: 'Uh oh!',
            description: 'Google login unsuccessful, please try again.',
            variant: 'destructive',
        })
    } 
}