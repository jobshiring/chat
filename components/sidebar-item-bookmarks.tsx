'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TextDirection = process.env.TEXT_DIRECTION

interface SidebarItemBookmarksProps {
  children: React.ReactNode
}

export function SidebarItemBookmarks({ children }: SidebarItemBookmarksProps) {
  const pathname = usePathname()
  const isPathBookmarks =  (pathname == '/bookmarks') ? true : false
  return (
    <div className={`relative ${isPathBookmarks ? "bg-gray-200 text-gray-700" : ""}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"group w-full"}>
            <Link
              href={'/bookmarks'}
              prefetch={false}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'group w-full'
              )}
            >
              <BookmarkIcon fontSize="small"/>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {TextDirection == "RTL" ? <p> نشانک‌ها </p> : <p>Bookmarks</p> }
            
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
{/* 

      <Link
        href={'/bookmarks'}
        prefetch={false}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full'
        )}
      > */}
        {/* <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title='Bookmarks'
        >
          <span className="whitespace-nowrap">Bookmarks</span>
          
        </div> */}
        {/* {/* <BookmarkIcon fontSize="small" /> */}
        {/* {isPathBookmarks ? <KeyboardDoubleArrowLeftIcon sx={{pl: 0}} /> : <></>} */}
      {/* </Link> */} 
      {<div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
