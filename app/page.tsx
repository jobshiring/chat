import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { getChat } from '@/app/actions'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';

async function GetBookmarks(): Promise<JSON> {
  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH}`
  const payload = {
    data: { "index": Math.round(2 / 2), 'bookmark_state': false, 'username': 'user1' }
  };
  let output;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch/retrieve bookmark data - The main component')
  }
  output = await res.json();
  return output
}

async function GetFeedbacks(): Promise<JSON> {
  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_FEEDBACK_RETRIEVE_PATH}`
  const payload = {
    data: { "index": Math.round(2 / 2), 'bookmark_state': false, 'username': 'user1' }
  };
  let output;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch/retrieve feedback data - The main component')
  }
  output = await res.json();
  return output
}


export default async function IndexPage() {
  const id = nanoid()
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  const bookmarks = await GetBookmarks()
  const feedbacks = await GetFeedbacks()

  if (session?.user?.id){
    const chat = await getChat(session?.user?.id)
    return <Chat id={session?.user?.id} username={session?.user?.email} initialMessages={chat.messages} bookmarks={bookmarks} feedbacks={feedbacks} />
  }
  
  return <Chat id={session?.user?.id} username={session?.user?.email} bookmarks={bookmarks} feedbacks={feedbacks} />

  
}
