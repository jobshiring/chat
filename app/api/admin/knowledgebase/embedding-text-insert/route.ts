import 'server-only'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  let mode = json.mode
  const cookieStore = cookies()
  const userId = (await auth({ cookieStore }))?.user.id
  const userName = (await auth({ cookieStore }))?.user.email

  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_ADMIN_EMBEDDING_INSERT_TEXT}`
  const payload = json
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`
    },
    body: JSON.stringify(payload)
  })

  if (process.env.DEBUG_MODE) console.log(await res.json(), await res.status)
  return NextResponse.json({ status: await res.status })
}
