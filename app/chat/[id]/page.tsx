// @ts-nocheck 
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

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


export default async function ChatPage({ params }: ChatPageProps) {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }
  const bookmarks = await GetBookmarks()
  const feedbacks = await GetFeedbacks()
  return <Chat id={session?.user?.email} initialMessages={chat.messages} username={session?.user?.email} bookmarks={bookmarks} feedbacks={feedbacks} />
}
