// @ts-nocheck 
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'
import validator from "validator";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const validateEmail = (e) => {
  const email = e.target.value;

  if (validator.isEmail(email)) {
    return true
  } else {
    false
  }
};

export function AddUser({ mutate }) {
  const { toast } = useToast()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true)

  const [role, setRole] = React.useState("editor")
  async function onSubmit_User(data) {
    data.preventDefault();
    const res = await fetch('/api/admin/access-control/add-user', { method: 'POST', body: JSON.stringify({ email: email, password: password, role: role }) });
    toast({ title: "Successfully added The new user. You could now safely close the dialog." });
    mutate()
  }

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
              {isValidEmail ? undefined : <p className="col-span-4 text-sm pl-24 text-red-500"> please provide a correct email </p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" required onChange={(e) => { setPassword(e.target.value); }} className="col-span-3" />
              {(password == passwordConfirm) ? undefined : <p className="col-span-4 text-sm pl-24 text-red-500"> please confirm the password <ArrowDownwardIcon /> </p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password_confirm" className="text-right">
                Confirm Password
              </Label>
              <Input id="password_confirm" type="password" required onChange={(e) => { setPasswordConfirm(e.target.value); }} className="col-span-3" />
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
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
          </DialogFooter>

        </form>
      </DialogContent>

    </Dialog>
  )
}