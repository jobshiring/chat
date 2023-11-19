import { getChats, removeChat, shareChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { SidebarItemChat } from '@/components/sidebar-item-chat'
import { SidebarItemBookmarks } from '@/components/sidebar-item-bookmarks'
export interface SidebarListProps {
  userId?: string
}

export async function SidebarList({ userId }: SidebarListProps) {
  // const chats = await getChats(userId)

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-2">
        {/* {chats.map(
          chat =>
            chat && ( */}
              <SidebarItemChat key={'1'} >
                {/* <SidebarActions
                  chat={chat}
                  removeChat={removeChat}
                  shareChat={shareChat}
                /> */}
              </SidebarItemChat>
              <SidebarItemBookmarks key={'2'} > </SidebarItemBookmarks>
            {/* )
        )} */}
      </div>
    </div>
  )
}
