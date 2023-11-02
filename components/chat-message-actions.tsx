'use client'

import { type Message } from 'ai'

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

import { useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios'

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';


interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message,
  index: Number,
  username: String | undefined
}

let sendAxios = (url: string, payload: Object) => {
  axios.post(url, payload).then(({ data }) => {
    console.log(data);
  })  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}

export function ChatMessageActionsBookmark({
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
        data: { "index": Math.round(index/2), 'bookmark_state': false, 'username': username }
      };

      sendAxios(url, payload)
    }
    else if (isBookmarked == false) {
      setBookmark(true)
      const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_PATH}`
      const payload = {
        data: { "index": Math.round(index/2), 'bookmark_state': true, 'username': username }
      };
      sendAxios(url, payload)
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
        </Button>
        <Button variant="ghost" size="icon" onClick={Bookmark}>
        {isBookmarked ? <SentimentVeryDissatisfiedIcon /> : <SentimentVeryDissatisfiedIcon />}
      </Button>
      </div>
    )
  }

  }
