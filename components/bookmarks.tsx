'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreenBookmarks } from '@/components/empty-screen-bookmarks'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string,
  username?: String | undefined,
  bookmarks?: JSON | undefined,
  feedbacks?: JSON | undefined,
  bookmark_page: Boolean
}

export function Bookmarks({ id, initialMessages, username, bookmarks, feedbacks, bookmark_page, className }: ChatProps) {
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {initialMessages?.length ? (
          <>
            <ChatList messages={initialMessages} username={username} bookmarks={bookmarks} feedbacks={feedbacks} bookmark_page={bookmark_page} />
            <ChatScrollAnchor />
          </>
        ) : (
          <EmptyScreenBookmarks />
        )}
      </div>
    </>
  )
}
