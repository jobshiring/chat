import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'

export interface ChatList {
  messages: Message[],
  username: String | undefined,
  bookmarks: JSON
}

export function ChatList({ messages, username, bookmarks}: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} index={index} username={username} bookmarks={bookmarks}/>
          {index < messages.length - 1 && index % 2 != 0 && index >= 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  )
}
