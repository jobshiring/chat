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
import { useState, useEffect } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Truculenta } from "next/font/google";

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


{/* <Button value={row.original.email}className="bg-inherit hover:bg-zinc-200" onClick={HandleAlert}><PersonRemoveSharpIcon sx={{ color: pink[500] }}/> </Button> */ }

export function UserRoles({ user_email }) {
    const [disabled, setDisabled] = useState(false);
    const { toast } = useToast()
    const fetcher = (url) => fetch(url, { cache: "no-store" }).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(
        '/api/admin/access-control/get-users-table',
        fetcher
    );
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data!</p>

    // ,
    // { refreshInterval: 1000 }

    for (const user of data)
        if (user.email == user_email)
            user.isUser = true

    const DeleteUser = (e) => {
        setDisabled(true)
        const res = fetch('/api/admin/access-control/delete-user', { method: 'POST', body: JSON.stringify({ email: e.currentTarget.value }) }).then((data) => {
            if(data.status == 200) {
                mutate();
                toast({ title: "Successfully deleted The user. Please wait until the changes are persisted." });
                setDisabled(false)
            }
            else{
                toast({ title: "Could not delete The user due to an error." });
                setDisabled(false)
            }
          });
        
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
                            {!row.original.isUser ? <>         <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button value={row.original.email} disabled={disabled} className="bg-inherit hover:bg-zinc-200"><PersonRemoveSharpIcon sx={{ color: pink[500] }} /> </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone and will permanently delete the following user account:  <strong>{row.original.email}</strong>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel >Cancel</AlertDialogCancel>
                                        <AlertDialogAction value={row.original.email} onClick={DeleteUser}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>  </> : undefined}
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
