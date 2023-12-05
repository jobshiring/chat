//@ts-nocheck
'use client'
import { columns } from '@/app/admin/components/columns-access-control-user-roles'
import { DataTable } from '@/app/admin/components/data-table-access-control-user-roles'
import useSWR from 'swr'
import { AddUser } from '@/app/admin/access-control/add-user'
import { pink } from '@mui/material/colors'
// ss
import { ColumnDef } from '@tanstack/react-table'
import { Task } from '@/app/admin/components/data/schema'
import { DataTableColumnHeader } from '@/app/admin/components/data-table-column-header'

import PersonRemoveSharpIcon from '@mui/icons-material/PersonRemoveSharp'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useState, useEffect } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Truculenta } from 'next/font/google'

const TextDirection = process.env.TEXT_DIRECTION

const DropDownSelector = ({ user_email, mutate, toast }) => {
  return (
    <>
      <Select
        onValueChange={event => {
          fetch('/api/admin/access-control/update-user-role', {
            method: 'POST',
            body: JSON.stringify({ email: user_email, role: event })
          }).then(data => {
              toast({ title:  TextDirection == 'RTL' ? `نقش کاربر با موفقیت تغییر کرد` : `Successfully changed The user's role: ${user_email}.`  });
              mutate();})
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Change Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{TextDirection == 'RTL' ? "نقش‌ها" : "Roles"}</SelectLabel>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

{
  /* <Button value={row.original.email}className="bg-inherit hover:bg-zinc-200" onClick={HandleAlert}><PersonRemoveSharpIcon sx={{ color: pink[500] }}/> </Button> */
}

export function UserRoles({ user_email }) {
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()
  const fetcher = url =>
    fetch(url, { cache: 'no-store' }).then(res => res.json())
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/access-control/get-users-table',
    fetcher
  )
  if (isLoading) return <p dir={TextDirection}>{TextDirection == 'RTL' ? "در حال بارگذاری..." : "Loading..."}</p>
  if (!data) return <p dir={TextDirection}>{TextDirection == 'RTL' ? " داده‌ای دریافت نشد/موجود نیست! " : "No data!"}</p>

  // ,
  // { refreshInterval: 1000 }

  for (const user of data) if (user.email == user_email) user.isUser = true

  const DeleteUser = e => {
    setDisabled(true)
    const res = fetch('/api/admin/access-control/delete-user', {
      method: 'POST',
      body: JSON.stringify({ email: e.currentTarget.value })
    }).then(data => {
      if (data.status == 200) {
        mutate()
        toast({
          title:
          TextDirection == 'RTL' ? "کاربر با حذف شد. لطفا چند لحظه صبر کنید تا سیستم بروزرسانی شود." : 'Successfully deleted The user. Please wait until the changes are persisted.'
        })
        setDisabled(false)
      } else {
        toast({ title: TextDirection == 'RTL' ? "خطا در تعریف کاربر" :'Could not delete The user due to an error.' })
        setDisabled(false)
      }
    })
  }

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TextDirection == 'RTL' ? "شناسه" :"id"} />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
      enableSorting: true,
      enableHiding: false
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TextDirection == 'RTL' ? "ایمیل" :"Email"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] font-medium">
              {row.getValue('email')}
            </span>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TextDirection == 'RTL' ? "نقش" :"Role"} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] font-medium">
              {row.getValue('role')}
            </span>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: true
    },
    {
      id: 'actions',
      header: TextDirection == 'RTL' ? 'تغییر نقش' : 'Change Role',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
            <div>
              {!row.original.isUser ? (
                <DropDownSelector user_email={row.original.email} mutate={mutate} toast={toast} />
              ) : undefined}
            </div>
          </>
        )
      }
    },
    {
      id: 'delete',
      header: TextDirection == 'RTL' ? 'حذف' : 'Delete',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <>
            <div>
              {!row.original.isUser ? (
                <>
                  {' '}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        value={row.original.email}
                        disabled={disabled}
                        className="bg-inherit hover:bg-zinc-200"
                      >
                        <PersonRemoveSharpIcon sx={{ color: pink[500] }} />{' '}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader dir={TextDirection}>
                        <AlertDialogTitle>
                          {TextDirection == 'RTL' ? 'آیا از تصمیم خود مطمئن هستید؟ ' : "Are you absolutely sure?"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                        {TextDirection == 'RTL' ? 'این عمل موجب حذف کاربر روبرو خواهد شد:' : "This action cannot be undone and will permanently delete the following user account:"}
                          {' '}
                          <strong>{row.original.email}</strong>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          {TextDirection == 'RTL' ? 'لغو' : 'Cancel'}
                          </AlertDialogCancel>
                        <AlertDialogAction
                          value={row.original.email}
                          onClick={DeleteUser}
                        >
                          {TextDirection == 'RTL' ? 'ادامه' : 'Continue'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>{' '}
                </>
              ) : undefined}
            </div>
          </>
        )
      }
    }
  ]

  return (
    <>
      <div className="md:flex pl-8" dir={TextDirection}>
        <AddUser mutate={mutate} />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 pl-8 pr-8 pb-8 md:flex">
        <DataTable data={data} columns={columns} />
      </div>
    </>
  )
}
