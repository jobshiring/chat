'use client'

import { type Message } from 'ai'

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

import { useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message,
  index: Number
}

export function ChatMessageActions({
  message,
  index,
  className,
  ...props
}: ChatMessageActionsProps) {
  // Add useState for IsBookmarked
  const [isBookmarked, setBookmark] = useState(false);
  // 127.0.0.1:8000
  const onCopy = async () => {
    if (isBookmarked == true) setBookmark(false)
    else if (isBookmarked == false) setBookmark(true)
  }


  if (index % 2 != 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
          className
        )}
        {...props}
      >
        <Button variant="ghost" size="icon" onClick={onCopy}>
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          <span className="sr-only">Copy message</span>
        </Button>


      </div>
    )
  }

}
