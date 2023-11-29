//@ts-nocheck
"use client"
import { columns } from "@/app/admin/components/columns-access-control-user-roles"
import { DataTable } from "@/app/admin/components/data-table-access-control-user-roles"
import useSWR from "swr";
import { AddUser } from "@/app/admin/access-control/add-user"
import { pink } from '@mui/material/colors';
// ss
import { ColumnDef } from "@tanstack/react-table"
import { Task } from "@/app/admin/components/data/schema"
import { DataTableColumnHeader } from "@/app/admin/components/data-table-column-header"

import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp';
import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const DropDownSelector = ({ user_email }) => {
return (
    <>
    <Select onValueChange={(event) => { fetch('/api/admin/access-control/update-user-role', { method: 'POST', body: JSON.stringify({ email: user_email, role: event }) }) }}  >
        <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change Role" />
        </SelectTrigger>
        <SelectContent>
        <SelectGroup>
            <SelectLabel >Roles</SelectLabel>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
        </SelectGroup>
        </SelectContent>
    </Select>
    </>
)
}

export function UserRoles({ user_email }) {
    const { toast } = useToast()
    const fetcher = (url) => fetch(url, { cache: "no-store" }).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(
        '/api/admin/access-control/get-users-table',
        fetcher,
        { refreshInterval: 1000 }
    );

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data!</p>

    for (const user of data)
        if (user.email == user_email)
            user.isUser = true

    const DeleteUser = (e) => {
        fetch('/api/admin/access-control/delete-user', { method: 'POST', body: JSON.stringify({ email: e.currentTarget.value })});
        mutate();
        toast({ title: "Successfully deleted The user. Please wait until the changes are persisted." });
    }

    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => (
            <DataTableColumnHeader column={column} title="id" />
            ),
            cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
            enableSorting: true,
            enableHiding: false,
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                <span className="max-w-[500px] font-medium">
                    {row.getValue("email")}
                </span>
                </div>
            )
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "role",
            header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
            ),
            cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                <span className="max-w-[500px] font-medium">
                    {row.getValue("role")}
                </span>
                </div>
            )
            },
            enableSorting: false,
            enableHiding: true,
        },
        {
            id: "actions",
            header: "Change Role",
            enableHiding: false,
            cell: ({ row }) => {
            return (
                <>
                <div>
                    {!row.original.isUser ? <DropDownSelector user_email={row.original.email} /> : undefined}
                </div>
                </>)
            },
        },
        {
            id: "delete",
            header: "Delete",
            enableHiding: false,
            cell: ({ row }) => {
            return (
                <>
                <div>
                    {!row.original.isUser ? <><Button value={row.original.email} className="bg-inherit hover:bg-zinc-200" onClick={DeleteUser}><PersonRemoveSharpIcon sx={{ color: pink[500] }}/> </Button> </> : undefined}
                </div>
                </>)
            },
        }
        ]

    return (
        <>
            <AddUser mutate={mutate} />
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable data={data} columns={columns} />
            </div>
        </>
    )
}
