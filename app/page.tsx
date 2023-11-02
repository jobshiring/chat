import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { auth } from '@/auth'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export default async function IndexPage() {
  const id = nanoid()
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  return <Chat id={id} username={session?.user?.email} />
}
