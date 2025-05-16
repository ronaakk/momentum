import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  // searchParams -> get url query params, origin -> get the full domain 
  const { searchParams, origin } = new URL(request.url)
  // this 'code' is the authorization code returned from google
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Origin:', origin);
  console.log('Code present:', !!code);
  console.log('Next destination:', next);

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.log('Session exchange failed:', error.message)
        return NextResponse.redirect(`${origin}/login`)
      }

      // get the user id associated with auth
      const { data: { user }, error: queryError } = await supabase.auth.getUser()

      if (queryError && queryError.code !== 'PGRST116') {
        console.error('Error checking for existing user:', queryError)
      }

      if (user) {
        const { data : existingUser } = await supabase.from('users').select('id').eq('id', user.id).single()

        // save the user to our users table if they don't exist
        if (!existingUser) {
          const { error : insertError } = await supabase.from('users').insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name,
            profile_image: user.user_metadata.picture,
          })

          if (insertError) {
            console.log('Error inserting user into db:', insertError)
          }
        }
      }

      if (!error) {
        const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === 'development'

        console.log('Redirecting to dashboard...');
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Forwarded host:', forwardedHost);

        if (isLocalEnv) {
          // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      }
    } catch (error) {
      console.log('Unexpected error in callback:', error)
      return NextResponse.redirect(`${origin}/login?error=unexpected_error`) 
    }
  } else {
      console.log('No code found in callback url')
      return NextResponse.redirect(`${origin}/login?error=no_code`)
  }  
}