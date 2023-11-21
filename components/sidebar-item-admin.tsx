'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface SidebarItemAdminProps {
  children: React.ReactNode
}

export function SidebarItemAdmin({ children }: SidebarItemAdminProps) {
  const pathname = usePathname()
  const isPathAdmin = (pathname == '/admin') ? true : false
  return (
    <div className={`relative ${isPathAdmin ? "bg-gray-200 text-gray-700" : ""}`}>
      <Link
        href={'/admin'}
        prefetch={false}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group w-full pl-8 pr-16'
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title='Bookmarks'
        >
          <span className="whitespace-nowrap">Administration</span>
        </div>
      </Link>
      {<div className="absolute right-2 top-1">{children}</div>}
    </div>
  )
}
