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
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function KnowledgeBase() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false);
  const [inputText, setInputText] = useState(null);
  const handleTextInput = (text) => {
    setInputText(text.currentTarget.value);
  };

  async function onSubmit_text() {
    setSubmitted(true);

    let payload = { "text": inputText }
    const response = await fetch('/api/admin/embedding-text-insert', {
      method: 'POST',
      headers: {},
      body: JSON.stringify(payload)
    }
    )
    const json = await response.json()
    if ( json.status != 200) toast({title: "Text insertion failed!"})
    else toast({title: "Successfully Inserted The text."})
  };

  
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
                  <Button >Upload</Button>
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
                <Textarea rows={5} cols={50} onChange={handleTextInput} />
                </CardContent>
                <CardFooter>
                  <Button onClick={onSubmit_text}>Save Text</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
  }
