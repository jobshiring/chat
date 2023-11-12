// @ts-nocheck 
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getChat, GetBookmarks, GetFeedbacks } from '@/app/actions'
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
