'use server'

import { createClient } from '@/utils/supabase/server'
import { sanitizeName } from '@/lib/helpers';

export async function loginWithEmail(formData: FormData) : Promise<{ error?: string; success?: boolean; }> {
  const supabase = await createClient()

  const formInputs = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(formInputs)

  if (error) {
    // check if the user exists in our db with the given email
    const { data: user } = await supabase.from('users').select('*').eq('email', formInputs.email).single()

    if (!user) {
      // user does not exist
      return { error: 'User does not exist, please sign up.' }
    } else {
      // password is incorrect
      return { error: 'Password is incorrect, please try again.' }
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

  // get the auth.id from data
  if (data?.user) {
    const { id } = data.user

    // add the user to our 'users' table
    const { error : insertError } = await supabase.from('users').insert({ 
      id,
      name: formInputs.name,
      email: formInputs.email,
      profile_image: "/assets/images/default-avatar.png"
    })

    if (insertError) {
      return { error: insertError.message }
    }
  }

  if (signUpError) {
      console.log('There was an error signing up this user:', signUpError)

      // check if user already exists by querying the email given
      const { data : existingUser, error : selectError } = await supabase.from('users').select('email').eq('email', formInputs.email).single()

      if (selectError) {
        return { error: selectError.message }
      }

      if (existingUser) {
        return { error: 'An account with this email already exists.' }
      }
  }

  return { success: true }

}