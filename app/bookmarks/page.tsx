import { nanoid } from '@/lib/utils'
import { Bookmarks } from '@/components/bookmarks'
import { auth } from '@/auth'
import { cookies } from 'next/headers'
import { getBookmarkedMessagesSupabase, getChat, getBookmarksLocal, getBookmarksSupabase, getFeedbacksLocal } from '@/app/actions'
import { type Chat } from '@/lib/types'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';


async function getBookmarkedMessages(chat: Chat, bookmarks: JSON){
  let bookmarked_messages = { messages : []};
  
  for (var key of Object.keys(bookmarks.bookmarks)){
    if (bookmarks.bookmarks[key].bookmark){
        let index = Number(key.replace('bookmark_',''))
        let index_1;
        let index_2;
        index_1 = (index * 2) - 2
        index_2 = (index * 2) - 1
        console.log('===> Pushing index ', index, ' ..... ')
        chat.messages[index_1] ? bookmarked_messages.messages.push(chat.messages[index_1]) : console.log("messages for index ", index_1,' is undefined')
        chat.messages[index_2] ? bookmarked_messages.messages.push(chat.messages[index_2]) : console.log("messages for index ", index_2,' is undefined')
    }
  }

  return bookmarked_messages
}

async function returnTrueBookmarks(bookmarks: JSON){
  for (var key of Object.keys(bookmarks.bookmarks)) 
    if (!bookmarks.bookmarks[key].bookmark)
      delete bookmarks.bookmarks[key]
  console.log(bookmarks)
  return bookmarks
}

export default async function BookmarksPage() {
  // const id = nanoid()
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  const bookmarks = await getBookmarksSupabase(session?.user?.id)
  const feedbacks = await getFeedbacksLocal()
  

  if (session?.user?.id) {
    const chat = await getChat(session?.user?.id)
    const bookmarked_messages = await getBookmarkedMessages(chat, bookmarks)
    // const bookmarked_messages = await getBookmarkedMessagesSupabase(session?.user?.id)
    return <Bookmarks id={session?.user?.id} username={session?.user?.email} initialMessages={bookmarked_messages.messages} bookmarks={undefined} feedbacks={undefined} bookmark_page={true} />
  }

  return <Bookmarks id={session?.user?.id} username={session?.user?.email} bookmarks={bookmarks} feedbacks={feedbacks} />


}
