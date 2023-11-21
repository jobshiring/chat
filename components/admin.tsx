'use client'

import { cn } from '@/lib/utils'
import { EmptyScreenAdmin } from '@/components/empty-screen-admin'


export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string,
  username?: String | undefined,

}

export function Admin({ id, username, className }: ChatProps) {
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        <EmptyScreenAdmin />
      </div>
    </>
  )
}
