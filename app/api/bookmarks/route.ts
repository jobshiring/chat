import 'server-only'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { auth } from '@/auth'
import { NextResponse } from "next/server";

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  const mode = json.mode
  const cookieStore = cookies()
  const userId = (await auth({ cookieStore }))?.user.id
  const userName = (await auth({ cookieStore }))?.user.email

  if (mode == "supabase") {
    console.log("supabase")
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore
    })
    const id = userId
    const user_id = userId
    const payload = { bookmarks: json.data }
    if (!userId) {
      return new Response('Unauthorized', {
        status: 401
      })
    }
    await supabase.from('bookmarks').upsert({ id, user_id, payload }).throwOnError()
  }
  else if (mode == "local") {
    const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_PERSIST_PATH}`
    const payload = {
      data: { "index": json?.state_diff?.index, 'bookmark_state': json?.bookmark_state?.index, 'username': userName }
    };
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': "application/json", 'Authorization': `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}` },
      body: JSON.stringify(payload)
    }
    )
  }
  // to thelp resolve the error: Cannot read properties of undefined (reading 'headers')
  return NextResponse.json({ message: 'good', success: true });
}
