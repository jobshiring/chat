'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface SidebarItemChatProps {
  children: React.ReactNode
}

export function SidebarItemChat({ children }: SidebarItemChatProps) {
  const pathname = usePathname()
  const isPathHome =  (pathname == '/') ? true : false
  return (
    <div className={`relative ${isPathHome ? "bg-gray-200 text-gray-700" : ""}`}>
      {/* <div className="absolute left-2 top-1 flex h-6 w-6 items-center justify-center">
        {chat.sharePath ? (
          <Tooltip delayDuration={1000}>
            <TooltipTrigger
              tabIndex={-1}
              className="focus:bg-muted focus:ring-1 focus:ring-ring"
            >
              <IconUsers className="mr-2" />
            </TooltipTrigger>
            <TooltipContent>This is a shared chat.</TooltipContent>
          </Tooltip>
        ) : (
          <IconMessage className="mr-2" />
        )}
      </div> */}
      <Link
        href={'/'}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full pl-8 pr-16'
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title='Chat'
        >
          <span className="whitespace-nowrap">Chat</span>
        </div>
        {/* {isPathHome ? <KeyboardDoubleArrowLeftIcon /> : <></>} */}
      </Link>
      {<div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
