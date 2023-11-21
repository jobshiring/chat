// @ts-nocheck 

import { Admin } from '@/components/admin'
import { auth } from '@/auth'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';

export default async function AdminPageOLD() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  return <Admin id={session?.user?.id} username={session?.user?.email} />
}
