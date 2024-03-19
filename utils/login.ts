import { createClient } from '@/utils/supabase/client'


const supabase = createClient()

type formStateType = {
    email: string,
    password: string
}

export const signInServer = async (formState: formStateType) => {
    const { email, password } = formState
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return error
  }

export const signUpServer = async (formState: formStateType) => {
    const { email, password } = formState
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/api/auth/callback` }
    })
}
