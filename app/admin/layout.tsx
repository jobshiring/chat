import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/app/admin/components/sidebar-nav"
import { Toaster } from "@/components/ui/toaster"
import { GetTranslation } from "@/components/translation-helper/ClientTranslations"

export const metadata: Metadata = {
  title: "Administration",
  description: "BizGPT Administration",
}

const TextDirection = process.env.TEXT_DIRECTION


interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight" dir={TextDirection}>
          {/* {TranslationData["Administration"]} */}
          <GetTranslation text="Administration" />
            </h2>
          <p className="text-muted-foreground" dir={TextDirection}>
          <GetTranslation text="Manage your system" />
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex-1 lg:max-w-full">{children}</div>
        </div>
      </div>
      <Toaster />
    </>
  )
}
