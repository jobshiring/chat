// @ts-nocheck 
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function KnowledgeBase() {
  function onSubmit(data: ProfileFormValues) {
    // do something
  }

  return (
    <>
      <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center">
        <div className="w-[600px] flex-col">
          <Tabs defaultValue="upload_file" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload_file">Upload File</TabsTrigger>
              <TabsTrigger value="enter_text">Enter Text</TabsTrigger>
            </TabsList>
            <TabsContent value="upload_file">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Markdown File</CardTitle>
                  <CardDescription>
                    Upload your Markdown file. It will be added your AI&apos;s knowledge-base.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <Input type="file" placeholder="Upload a Markdown file" accept=".md" />
                </CardContent>
                <CardFooter>
                  <Button>Upload</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="enter_text">
              <Card>
                <CardHeader>
                  <CardTitle>Enter Text</CardTitle>
                  <CardDescription>
                    Enter your text below. It will be added your AI&apos;s knowledge-base.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <Textarea />
                </CardContent>
                <CardFooter>
                  <Button>Save Text</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
