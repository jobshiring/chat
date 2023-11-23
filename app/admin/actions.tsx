import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { type Chat } from '@/lib/types'
import { auth } from '@/auth'

export async function getVectorDataLogLocal(): Promise<JSON> {
  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_ADMIN_RETRIEVE_VECTOR_LOG}`
  let output;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`,
      'Content-Type': 'application/json'
    },
    next: { revalidate: 0 }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch/retrieve vector-log data - The main component')
  }
  output = await res.json();
  return output
}
