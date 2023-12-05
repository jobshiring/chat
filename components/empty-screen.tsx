//@ts-nocheck
import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TextDirection = process.env.TEXT_DIRECTION

let exampleMessages: Object[] = []

if (TextDirection == 'RTL') {
  exampleMessages = [
    {
      heading: 'در خصوص کسب‌ و کار خود توضیح دهید',
      message: `کار من در حوزه ... است.`
    },
    {
      heading: 'خودتان را معرفی کنید',
      message: 'سلام\nاسم من آقای ... است.'
    }
  ]
}
else{
  exampleMessages = [
    {
      heading: 'Explain concepts about your business',
      message: `What is "X"?`
    },
    {
      heading: 'Introduce yourself',
      message: 'Hi\nMy name is "Mr. X"'
    }
  ]
}
export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold" dir={TextDirection}>
          {TextDirection === 'RTL' ? "به BizGPT خوش آمدید!" :  "Welcome to BizGPT!" }
        </h1>
        <p className="leading-normal text-muted-foreground" dir={TextDirection}>
          
          {TextDirection === 'RTL' ? "با پرسیدن یک سوال و یا استفاده از مثال‌های زیر، مکالمه خود با هوش مصنوعی را هم‌اکنون آغاز کنید:" :  "You can start a conversation by asking something or try the following examples:" }
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2" dir={TextDirection}>
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              dir={TextDirection}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message?.message)}
            >
              {TextDirection == 'RTL'? <ArrowBackIcon className="mr-2 text-muted-foreground" direction={TextDirection}/> : <IconArrowRight className="mr-2 text-muted-foreground" />}
              {message?.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
