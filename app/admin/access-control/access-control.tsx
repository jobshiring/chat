//@ts-nocheck
"use client"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/app/admin/components/columns-access-control-user-roles"
import { DataTable } from "@/app/admin/components/data-table-access-control-user-roles"
import { UserNav } from "@/app/admin/components/user-nav"
import { taskSchema } from "@/app/admin/data/schema"
import moment from 'moment'
import useSWR from "swr";

export function UserRoles({user_email}) {
    const fetcher = (url) => fetch(url, { cache: "no-store" }).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(
        '/api/admin/access-control/get-users-table',
        fetcher,
        { refreshInterval: 1000 }
    );
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data!</p>


    for (const user of data)
    if( user.email == user_email)
      user.isUser= true

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable data={data} columns={columns} />
            </div>
        </>
    )
}
