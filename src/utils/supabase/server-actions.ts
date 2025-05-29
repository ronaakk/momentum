'use server'

import { createClient } from '@/utils/supabase/server'
import { sanitizeName } from '@/lib/helpers';
import supabaseAdmin from './supabase-admin';

export async function loginWithEmail(formData: FormData) : Promise<{ error?: string; success?: boolean; }> {
  const supabase = await createClient()

  const formInputs = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(formInputs)

  if (error) {
    // check if the user exists in our db with the given email using the supabase admin
    const { data: user } = await supabaseAdmin.from('users').select('*').eq('email', formInputs.email).single()
    console.log(user)

    if (!user) {
      // user does not exist
      return { error: 'User does not exist, please sign up.' }
    } else {
      // they're already signed up with google
      return { error: "Looks like you've signed up with Google. Please use 'Continue with Google' to log in." }
    }
  }

  return { success: true }
}

export async function signup(formData: FormData) : Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()

  // clean up the name if necessary
  const name = formData.get('name') as string
  const sanitizedName = sanitizeName(name)

  const formInputs = {
    name: sanitizedName,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data, error : signUpError } = await supabase.auth.signUp(formInputs)

  if (signUpError) {
    return { error: signUpError.code}
  }

  // get the auth.id from data
  if (data?.user) {
    const { id } = data.user

    // add the user to our 'users' table
    const { error : insertError } = await supabase.from('users').insert({ 
      id,
      name: formInputs.name,
      email: formInputs.email,
      profile_image: "/assets/images/default-avatar.svg"
    })

    if (insertError) {
      return { error: insertError.message }
    }
  }

  return { success: true }

}