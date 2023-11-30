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
  DialogClose
} from "@/components/ui/dialog"
import * as DialogPrimitive from '@radix-ui/react-dialog'
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
  const [isReady, setIsReady] = useState(true)
  const [role, setRole] = React.useState("editor")

  const [open, setOpen] = React.useState(false);

  function onSubmit_User(data) {
    setIsReady(false)
    data.preventDefault();
    fetch('/api/admin/access-control/add-user', { method: 'POST', body: JSON.stringify({ email: email, password: password, role: role }) }).then(data => {
      if ( data.status == 200){
        toast({ title: "Successfully added The new user.😊" });
        mutate();
      // resetting all the states
      setEmail('')
      setPassword('')
      setPasswordConfirm('')
      setIsValidEmail(true)
      setIsReady(true)
      setOpen(false)
      }
      else {
        toast({ title: "Could not add new user.😓" });
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add a new user and provide their info.
          </DialogDescription>
          <DialogDescription>
            * In order to help adding multiple users easier, the dialog does not close after saving.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit_User}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="text" value={email} required onChange={(e) => { setEmail(e.target.value); if (validateEmail(e)) { setIsValidEmail(true); } else setIsValidEmail(false); }} className="col-span-3" />
              {isValidEmail ? undefined : <p className="col-span-4 text-sm pl-24 text-red-500"> please provide a correct email </p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" required value={password} onChange={(e) => { setPassword(e.target.value); }} className="col-span-3" />
              {(password == passwordConfirm) ? undefined : <p className="col-span-4 text-sm pl-24 text-red-500"> please confirm the password <ArrowDownwardIcon /> </p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password_confirm" className="text-right">
                Confirm Password
              </Label>
              <Input id="password_confirm" type="password" value={passwordConfirm} required onChange={(e) => { setPasswordConfirm(e.target.value); }} className="col-span-3" />
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
            <DialogClose asChild>
              {isValidEmail & (password.length > 0) & (password == passwordConfirm) ? (<Button type="submit" disabled={!isReady}  
              > Save changes </Button>) : (<Button disabled={true}> Save changes </Button>)
              }
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}