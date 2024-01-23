import * as React from 'react'
import Link from 'next/link'

import { auth } from '@/auth'
import { getUserRole } from '@/app/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import {
  IconNextChat,
  IconSeparator,
} from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/user-menu'
import { cookies } from 'next/headers'
import { Label } from './ui/label'
import { LangDropDown } from './header-language-dropdown'

export async function Header() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  const user_role = await getUserRole(session?.user?.id)
  const BIZGPT_IFRAME_MODE = process.env.BIZGPT_IFRAME_MODE
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        {session?.user ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              {/* @ts-ignore */}
              <SidebarList userId={session?.user?.id} userRole={user_role} />
            </React.Suspense>
            <SidebarFooter>
              <ThemeToggle />
              {/* <ClearHistory clearChats={clearChats} /> */}
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <IconNextChat className="mr-2 h-6 w-6 dark:hidden" inverted />
            <IconNextChat className="mr-2 hidden h-6 w-6 dark:block" />
          </Link>
        )}
        <div className="flex items-center">
          { BIZGPT_IFRAME_MODE == 'true' ? (undefined) : (<IconSeparator className="h-6 w-6 text-muted-foreground/50" />) }
          {session?.user && BIZGPT_IFRAME_MODE == 'false' ? (
            <UserMenu user={session.user} />
          ) : (
            BIZGPT_IFRAME_MODE == 'true' ? undefined :<Label>Login</Label>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <LangDropDown />
      </div>
    </header>
  )
}
