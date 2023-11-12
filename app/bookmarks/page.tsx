import { nanoid } from '@/lib/utils'
import { Bookmarks } from '@/components/bookmarks'
import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { getBookmarks, GetBookmarks, GetFeedbacks } from '@/app/actions'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';




export default async function BookmarksPage() {
  // const id = nanoid()
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  const bookmarks = await GetBookmarks()
  const feedbacks = await GetFeedbacks()

  if (session?.user?.id) {
    const bookmarked_messages = await getBookmarks(session?.user?.id)
    return <Bookmarks id={session?.user?.id} username={session?.user?.email} initialMessages={bookmarked_messages.messages} bookmarks={bookmarks} feedbacks={feedbacks} />
  }

  return <Bookmarks id={session?.user?.id} username={session?.user?.email} bookmarks={bookmarks} feedbacks={feedbacks} />


}
