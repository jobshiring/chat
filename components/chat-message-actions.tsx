// @ts-nocheck 
'use client'

import { type Message } from 'ai'

import { Button } from '@/components/ui/button';
import ButtonMaterial from '@mui/material/Button';
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

import { useState, useEffect } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import axios from 'axios'

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';

import { StyledEngineProvider } from '@mui/material/styles';

const StyledTextField = styled(TextField)(
  ({ color }) => `
      width: 60vw;
      font-family: sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      padding: 0px 12px;
      border-radius: 8px;
      color: ${color};
      border: 1px solid ${color};
      background: transparent;
      `
);

const colors = {
  grey: "#000000",
  "😀": "#4caf50",
  "🙂": "#6fbf73",
  "😐": "#ff9800",
  "🙁": "#f6685e",
  "😞": "#f44336"
}

const TextFieldcolors = {
  "😀": "success",
  "🙂": "success",
  "😐": "warning",
  "🙁": "error",
  "😞": "error"
}

function index_fixer(number: Number): Number {
  if (number <= 1) {
    return 1
  }
  else {
    return Math.round(number / 2)
  }
}

interface ChatMessageActionsBookmarkProps extends React.ComponentProps<'div'> {
  message: Message,
  index: number,
  username: String | undefined,
  bookmakrs: JSON | undefined
}

interface ChatMessageActionsFeedbackProps extends React.ComponentProps<'div'> {
  message: Message,
  index: number,
  username: String | undefined,
  feedbacks: JSON | undefined
}

let sendAxios = (url: string, payload: Object) => {
  axios.post(url, payload).then(({ data }) => {
    console.log(data);
  }).catch(function (error) {
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
  bookmarks,
  className,
  ...props
}: ChatMessageActionsBookmarkProps) {
  const [isBookmarked, setBookmark] = useState(false);


  useEffect(() => {
    if (index % 2 != 0) {
      if (bookmarks.bookmarks[`bookmark_${index_fixer(index)}`]) {
        setBookmark(bookmarks.bookmarks[`bookmark_${index_fixer(index)}`]?.bookmark);
      }
    }
  }, [bookmarks.bookmarks[`bookmark_${index_fixer(index)}`]]?.bookmark)

  axios.defaults.headers.common['Content-Type'] = "application/json"
  axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`
  const Bookmark = async () => {
    if (isBookmarked == true) {
      setBookmark(false)
      const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH}`
      const payload = {
        data: { "index": index_fixer(index), 'bookmark_state': false, 'username': username }
      };

      sendAxios(url, payload)
    }
    else if (isBookmarked == false) {
      setBookmark(true)
      const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH}`
      const payload = {
        data: { "index": index_fixer(index), 'bookmark_state': true, 'username': username }
      };
      sendAxios(url, payload)
    }
  }


  if (index % 2 != 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-end md:absolute md:-right-10 md:-top-1 ',
          className
        )}
        {...props}
      >
        <Button variant="ghost" size="icon" onClick={Bookmark}>
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </Button>

      </div>
    )
  }
}



export function ChatMessageActionsFeedback({
  message,
  index,
  username,
  feedbacks,
  className,
  ...props
}: ChatMessageActionsFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [inputText, setInputText] = useState(null);
  const [faceScore, setFaceScore] = useState(null);


  useEffect(() => {
    if (index % 2 != 0) {
      if (feedbacks.feedbacks[`feedback_${index_fixer(index)}`]) {
        setSubmitted(true);
        setFaceScore(feedbacks.feedbacks[`feedback_${index_fixer(index)}`]?.score);
      }
    }
  }, [feedbacks.feedbacks[`feedback_${index_fixer(index)}`]?.score])

  const handleFaceClick = (score: String) => {
    if (score === faceScore) {
      setFaceScore(null);
    } else {
      setFaceScore(score);
    }
  };

  const selectColor = (score: string) => {
    if (faceScore) {
      if (score === faceScore) {
        return colors[score]
      } else {
        if (submitted) {
          return "transparent"
        } else {
          return colors["grey"]
        }
      }
    } else {
      return colors["grey"]
    }
  }

  const selectHoverColor = (score: string) => {
    if (faceScore) {
      if (score === faceScore) {
        return colors[score]
      } else {
        if (submitted) {
          return "transparent"
        } else {
          return colors[score]
        }
      }
    } else {
      return colors[score]
    }
  }

  const handleTextInput = (text) => {
    setInputText(text.currentTarget.value);
  };

  const handleSubmission = () => {
    setSubmitted(true);
    const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH}`
    const payload = {
      data: { "index": index_fixer(index), 'face_score': faceScore, 'input_text': inputText, 'username': username }
    };

    sendAxios(url, payload)
  };
  if (index % 2 != 0) {
    return (
      <Box className="remove-all" paddingY={0.5} height={140} component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }} noValidate autoComplete="off">
        <Stack className="feedback-cls" direction="row" spacing={0} justifyContent={'right'} alignItems={'right'}>
          <SentimentVeryDissatisfiedIcon
            sx={{
              fontSize: 24,
              color: selectColor("😞"),
              // '&:hover': {
              //   cursor: submitted ? null : "pointer",
              //   color: selectHoverColor("😞"),
              // },
            }}
            onClick={() => submitted ? {} : handleFaceClick("😞")}
          />
          <SentimentDissatisfiedIcon
            sx={{
              fontSize: 24,
              color: selectColor("🙁"),
              // '&:hover': {
              //   cursor: submitted ? null : "pointer",
              //   color: selectHoverColor("🙁"),
              // },
            }}
            onClick={() => submitted ? {} : handleFaceClick("🙁")}
          />
          <SentimentNeutralIcon
            sx={{
              fontSize: 24,
              color: selectColor("😐"),
              // '&:hover': {
              //   cursor: submitted ? null : "pointer",
              //   color: selectHoverColor("😐"),
              // },
            }}
            onClick={() => submitted ? {} : handleFaceClick("😐")}
          />
          <SentimentSatisfiedIcon
            sx={{
              fontSize: 24,
              color: selectColor("🙂"),
              // '&:hover': {
              //   cursor: submitted ? null : "pointer",
              //   color: selectHoverColor("🙂"),
              // },
            }}
            onClick={() => submitted ? {} : handleFaceClick("🙂")}
          />
          <SentimentSatisfiedAltIcon
            sx={{
              fontSize: 24,
              color: selectColor("😀"),
              '&:hover': {
                cursor: submitted ? null : "pointer",
                color: selectHoverColor("😀"),
              },
            }}
            onClick={() => submitted ? {} : handleFaceClick("😀")}
          />
          {submitted === false && faceScore !== null ? <StyledTextField id="outlined-multiline-static" inputProps={{ maxLength: "1000" }} fullWidth={"false"} onChange={handleTextInput} multiline rows={4} placeholder={"Please describe..."} aria-label="Demo input" color={TextFieldcolors[faceScore]} /> : null}
          {submitted === false && faceScore !== null ? <ButtonMaterial sx={{ color: colors[faceScore] }} endIcon={<SendIcon />} variant="text" size="small" onClick={handleSubmission}>Submit</ButtonMaterial> : null}
        </Stack>
      </Box>
    )
  }
}