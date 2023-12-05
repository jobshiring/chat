//@ts-nocheck
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const sidebarNavItems = [
  {
    title: "Knowledgebase",
    href: "",
    links:[
      {
        title: "Knowledgebase",
        href: "/admin",
      },
      {
        title: "Knowledgebase Overview",
        href: "/admin/knowledgebasedetails",
      }
    ]
  },
  {
    title: "Access Control",
    href: "/admin/access-control",
  }
]

const TextDirection = process.env.TEXT_DIRECTION

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      dir={TextDirection}
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-0",
        className
      )}
      {...props}
    >
      <h1 dir={TextDirection}> <strong> 
      {TextDirection == 'RTL' ? "مخزن دانش" : "Knowledgebase"}
         </strong> </h1>
        <Link key="/admin" 
          href="/admin"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/admin"
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
        {TextDirection == 'RTL' ? "بارگذاری " : "Upload"}
          
        </Link>
        <Link key="/admin/knowledgebase-details" 
          href="/admin/knowledgebase-details"
          prefetch={false}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/admin/knowledgebase-details"
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
        {TextDirection == 'RTL' ? "جزئیات " : "Details"}
          
        </Link>
        <h1 dir={TextDirection}> <strong> 
          {TextDirection == 'RTL' ? " دسترسی " : "Access Control "}
          </strong></h1>
        <Link key="/admin/access-control" 
          href="/admin/access-control"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/admin/access-control"
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {TextDirection == 'RTL' ? " مدیریت کاربرها و نقش‌ها " : "Manage User Roles"}
          
        </Link>
    </nav>
  )
}
