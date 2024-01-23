import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'
import GlobalConfig from '@/app/app.config.js'

const TextDirection = process.env.TEXT_DIRECTION

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  // Language and Translation
  // var TranslationData = require(`@/translation/${process.env.BIZGPT_FRONTEND_LANGUAGE}.json`);
  var TranslationData = require(`@/translation/${GlobalConfig.LANG}.json`);
  return (
    <p
      dir={TextDirection}
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      {TranslationData["Made with ❤️ by BizGPT"]}
      
    </p>
  )
}
