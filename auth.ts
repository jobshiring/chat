import 'server-only'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Old auth function
export const auth = async ({
  cookieStore
}: {
  cookieStore: ReturnType<typeof cookies>
}) => {
  // Create a Supabase client configured to use cookies
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

export const authUser = async () => {
  // Create a Supabase client configured to use cookies
  // const supabase = createServerComponentClient({
  //   cookies: () => cookieStore
  // })
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  // const supabase = createClient()
  // const { data:data, error:error } = await supabase.auth.getUser()

  if (error) throw error
  return data
}
