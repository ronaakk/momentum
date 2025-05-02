'use client'
import createClient from '@/utils/supabase/client'

export async function handleGoogleLogin() {
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        },
    })
    
    // TODO: 05/02/2025 - Add toast notification for success and error
    if (error) {
        console.log('Google login unsuccessful', error.message)
        // toast
    }


}