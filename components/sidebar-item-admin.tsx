'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarItemAdminProps {
  children: React.ReactNode
}

export function SidebarItemAdmin({ children }: SidebarItemAdminProps) {
  const pathname = usePathname()
  const isPathAdmin = pathname.includes('/admin') ? true : false
  return (
    <div className={`relative ${isPathAdmin ? "bg-gray-200 text-gray-700" : ""}`}>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={"group w-full"}>
            <Link
              href={'/admin'}
              prefetch={false}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'group w-full'
              )}
            >
              <AdminPanelSettingsRoundedIcon fontSize="small"/>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Administration</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* <Link
        href={'/admin'}
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
          <span className="whitespace-nowrap">Administration</span>
        </div> */}
        {/* <AdminPanelSettingsRoundedIcon fontSize="small" />
      </Link> */}
      {<div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
