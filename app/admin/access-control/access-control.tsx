// @ts-nocheck 
"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import validator from "validator";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import useSWR from "swr";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const validateEmail = (e) => {
  const email = e.target.value;

  if (validator.isEmail(email)) {
    return true
  } else {
    false
  }
};


export function DialogDemo() {
  const { toast } = useToast()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isReadyPassword, setIsReadyPassword] = useState(false)
  const [isEqualPassword, setIsEqualPassword] = useState(false)

  const [role, setRole] = React.useState("editor")
  async function onSubmit_User(data) {
    data.preventDefault();
    const res = await fetch('/api/admin/access-control/add-user', { method: 'POST', body: JSON.stringify({ email: email, password: password, role: role })});
    toast({ title: "Successfully added The new user." });
  }

  console.log(password, passwordConfirm)
return (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Add New User</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>
          Add a new user and provide their info.
        </DialogDescription>
      </DialogHeader>
      <form>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="text" required onChange={(e) => { if (validateEmail(e)) { setEmail(e.target.value); setIsValidEmail(true); } else setIsValidEmail(false); }} className="col-span-3" />
            {isValidEmail ? undefined  : <p className="col-span-4 text-sm pl-24 text-red-500"> please provide a correct email </p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" type="password" required onChange={(e) => { setPassword(e.target.value); }} className="col-span-3" />
            {(password == passwordConfirm) ? undefined : <p className="col-span-4 text-sm pl-24 text-red-500"> please confirm the password <ArrowDownwardIcon /> </p> }
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password_confirm" className="text-right">
              Confirm Password
            </Label>
            <Input id="password_confirm" type="password" required onChange={(e) => {  setPasswordConfirm(e.target.value); }} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password_confirm" className="text-right">
              Role
            </Label>
            <DropdownMenu className="col-span-3" >
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{role.charAt(0).toUpperCase() + role.slice(1)}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Roles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                  <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter>
          {isValidEmail & (password.length > 0) & (password == passwordConfirm) ? (<Button type="submit" onClick={onSubmit_User}> Save changes </Button>) : (<Button disabled={true}> Save changes </Button>)
          }
        </DialogFooter>

      </form>
    </DialogContent>

  </Dialog>
)
}

export type Payment = {
  id: string
  email: string
  role: "admin" | "viewer" | "editor"
  organization: string
}

const DropDownSelector = ({ user_email }) => {
  return (
    <>
      <Select onValueChange={(event) => { fetch('/api/admin/access-control/user-role-list', { method: 'POST', body: JSON.stringify({ email: user_email, role: event }) }) }}  >
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

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Id
          <CaretSortIcon className="ml-0 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <CaretSortIcon className="ml-0 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role
          <CaretSortIcon className="ml-0 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "org",
    header: "Organization",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Organization
          <CaretSortIcon className="ml-0 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("org")}</div>
    ),
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
]

export function DataTableDemo({user_email}) {
  const fetcher = (url) => fetch(url, {method: 'GET',cache: "no-store"}).then((res) => res.json() );
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  

   const  { data, error, isLoading, mutate }  = useSWR(
    '/api/admin/access-control/get-users-table',
    fetcher,
    { refreshInterval: 1000 }
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  for (const user of data)
    if( user.email == user_email)
      user.isUser= true

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
