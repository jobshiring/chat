import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'


export function EmptyScreenBookmarks({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          No bookmarks yet!
        </h1>
        <p className="leading-normal text-muted-foreground">
          You can start by bookmarking some question-answers.
        </p>
      </div>
    </div>
  )
}
