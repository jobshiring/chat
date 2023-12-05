import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

const TextDirection = process.env.TEXT_DIRECTION

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      dir={TextDirection}
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      {TextDirection == "RTL" ? "تهیه شده با ❤️ توسط BizGPT" : "Made with ❤️ by BizGPT." }
      
    </p>
  )
}
