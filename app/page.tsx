import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { getChat, GetBookmarks, GetFeedbacks } from '@/app/actions'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const id = nanoid()
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  const bookmarks = await GetBookmarks()
  const feedbacks = await GetFeedbacks()

  if (session?.user?.id) {
    const chat = await getChat(session?.user?.id)
    return <Chat id={session?.user?.id} username={session?.user?.email} initialMessages={chat.messages} bookmarks={bookmarks} feedbacks={feedbacks} />
  }

  return <Chat id={session?.user?.id} username={session?.user?.email} bookmarks={bookmarks} feedbacks={feedbacks} />


}
