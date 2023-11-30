import { SidebarItemChat } from '@/components/sidebar-item-chat'
import { SidebarItemBookmarks } from '@/components/sidebar-item-bookmarks'
import { SidebarItemAdmin } from '@/components/sidebar-item-admin'
export interface SidebarListProps {
  userId?: string
  userRole?: string
}

export async function SidebarList({ userId, userRole }: SidebarListProps) {

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-2">
        <SidebarItemChat key={'1'} > </SidebarItemChat>
        <SidebarItemBookmarks key={'2'} > </SidebarItemBookmarks>
        {(userRole == 'admin') ? (<SidebarItemAdmin key={'3'} > </SidebarItemAdmin>) : (undefined)}
      </div>
    </div>
  )
}
