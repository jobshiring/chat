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
import axios from 'axios'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message,
  index: Number,
  username: String | undefined
}

export function ChatMessageActions({
  message,
  index,
  username,
  className,
  ...props
}: ChatMessageActionsProps) {
  const [isBookmarked, setBookmark] = useState(false);
  axios.defaults.headers.common['Content-Type'] = "application/json"
  axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`
  const Bookmark = async () => {
    if (isBookmarked == true) {
      setBookmark(false)
      const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_PATH}`
      const payload = {
        data: { "index": index, 'bookmark_state': false, 'username': username }
      };

      axios.post(url, payload).then(({ data }) => {
        console.log(data);
      });
    }
    else if (isBookmarked == false) {
      setBookmark(true)
      const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_PATH}`
      const payload = {
        data: { "index": index, 'bookmark_state': true, 'username': username }
      };
      axios.post(url, payload).then(({ data }) => {
        console.log(data);
      });
    }
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
        <Button variant="ghost" size="icon" onClick={Bookmark}>
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          <span className="sr-only">Copy message</span>
        </Button>


      </div>
    )
  }

}
