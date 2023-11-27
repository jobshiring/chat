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

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-0",
        className
      )}
      {...props}
    >
      {/* {items.map((item) => ( 
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))} */}
      <h1> <strong> Knowledgebase </strong> </h1>
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
          Upload
        </Link>
        <Link key="/admin/knowledgebase-details" 
          href="/admin/knowledgebase-details"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/admin/knowledgebase-details"
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          Details
        </Link>
        <h1> <strong> Access Control </strong></h1>
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
          Manage User Roles
        </Link>
    </nav>
  )
}
