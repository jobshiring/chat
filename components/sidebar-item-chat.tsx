'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarItemChatProps {
  children: React.ReactNode
}

export function SidebarItemChat({ children }: SidebarItemChatProps) {
  const pathname = usePathname()
  const isPathHome = (pathname == '/') ? true : false
  return (
    <div className={`relative ${isPathHome ? "bg-gray-200 text-gray-700" : ""}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"group w-full"}>
            <Link
              href={'/'}
              prefetch={false}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'group w-full'
              )}
            >
              <ChatRoundedIcon fontSize="small"/>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


      {/* old code below */}
      {/* <Link
        href={'/'}
        prefetch={false}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full'
        )}
      > */}
      {/* <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title='Chat'
        >
          <span className="whitespace-nowrap">Chat</span>

        </div> */}

      {/* <ChatRoundedIcon fontSize="small"> Chat </ChatRoundedIcon>
      </Link> */}
      {<div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
