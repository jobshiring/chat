import 'server-only'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_ADMIN_RETRIEVE_VECTOR_LOG}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`
    }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch/retrieve vector-log data - The main component')
  }
  const output = await res.json();
  if (process.env.DEBUG_MODE) console.log(output, await res.status)
  return NextResponse.json(output)
}
