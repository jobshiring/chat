'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { IconSidebar } from '@/components/ui/icons'
import AppsIcon from '@mui/icons-material/Apps';
import { Separator } from "@/components/ui/separator"

export interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
          <IconSidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="inset-y-0 flex h-auto w-[62px] flex-col p-0">
      <SheetHeader className="p-5">
          {/* <SheetTitle className="text-sm">Chat History</SheetTitle> */}
          {/* <SheetTitle className="text-xs">Navigation</SheetTitle> */}
          <AppsIcon></AppsIcon>
      </SheetHeader>
      <Separator/>
        {children}
      </SheetContent>
    </Sheet>
  )
}
