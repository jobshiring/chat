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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

const TextDirection = process.env.TEXT_DIRECTION

export function KnowledgeBase(vector_data_log: JSON) {
  const [state, setState] = useState(0);
  const { toast } = useToast()
  const [ready, setReady] = useState(true);
  const [inputText, setInputText] = useState(null);
  const handleTextInput = (text) => {
    setInputText(text.currentTarget.value);
  };

  async function onSubmit_text() {
    setReady(false);

    let payload = { "text": inputText }
    const response = await fetch('/api/admin/knowledgebase/embedding-text-insert', {
      method: 'POST',
      headers: {},
      body: JSON.stringify(payload)
    }
    )
    const json = await response.json()
    if (json.status != 201) toast({ title: TextDirection == 'RTL' ? "خطا در بارگذاری متن!" : "Text insertion failed!" })
    else toast({ title: TextDirection == 'RTL' ? "متن با موفقیت بارگذاری شد." : "Successfully Inserted The text." })
    setReady(true);
  };

  const [FileState, setFileState] = useState({ selectedFile: null, })

  // On file select (from the pop up)
  async function onFileChange(event) {
    // Update the state
    setFileState({
      selectedFile: event.target.files[0],
    });
  };

  // On file upload (click the upload button)
  async function onFileUpload() {
    setReady(false);
    // Create an object of formData
    const formData = new FormData();
    formData.append('file_name', FileState.selectedFile.name);
    formData.append('file', FileState.selectedFile);

    const response = await fetch('/api/admin/knowledgebase/markdown-file-upload', {
      method: 'POST',
      body: formData
    }
    )
    const json = await response.json()
    if (json.status != 200) toast({ title: TextDirection == 'RTL' ? "خطا در بارگذاری فایل " : "Markdown upload failed!" })
    else toast({ title: TextDirection == 'RTL' ? "فایل با موفقیت بارگذاری شد." : "Successfully uploaded the Markdown file." })
    setReady(true);
  };

  return (
    <>
      <div className="flex h-[500px] flex-col items-center">
        <div className="w-[600px] flex-col">
          <Tabs defaultValue="upload_file" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload_file" dir={TextDirection}>{TextDirection == 'RTL' ? "بارگذاری فایل" : "Upload File"}</TabsTrigger>
              <TabsTrigger value="enter_text" dir={TextDirection}>{TextDirection == 'RTL' ? "بارگذاری متن" : "Enter Text"}</TabsTrigger>
            </TabsList>
            <TabsContent value="upload_file" dir={TextDirection}>
              <Card>
                <CardHeader>
                  <CardTitle> {TextDirection == 'RTL' ? "بارگذاری فایل Markdown" : "Upload Markdown File"}</CardTitle>
                  <CardDescription>
                  {TextDirection == 'RTL' ? "از طریق این پنل می‌توانید فایل Markdown خود را بارگذاری کنید. " : "Upload your Markdown file. It will be added your AI&apos;s knowledgebase."}
                    
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input onChange={onFileChange} type="file" placeholder="Upload a Markdown file" accept=".md"  />
                </CardContent>
                <CardFooter>
                  {ready ? <Button onClick={onFileUpload} disabled={false}>{TextDirection == 'RTL' ? "بارگذاری" : "Upload"}</Button> : <Button onClick={onFileUpload} disabled={true}>Upload</Button>}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="enter_text" dir={TextDirection}>
              <Card>
                <CardHeader>
                  <CardTitle>{TextDirection == 'RTL' ? "بارگذاری متن" : "Enter Text"}</CardTitle>
                  <CardDescription>
                  {TextDirection == 'RTL' ? "از طریق این پنل می‌توانید متن خود را بارگذاری کنید." : "Enter your text below. It will be added your AI&apos;s knowledgebase."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea rows={5} cols={50} onChange={handleTextInput} overflow="scroll" />
                </CardContent>
                <CardFooter>
                  {ready ? <Button onClick={onSubmit_text} disabled={false}>{TextDirection == 'RTL' ? "بارگذاری متن" : "Save Text"}</Button> : <Button onClick={onSubmit_text} disabled={true}>Save Text</Button>}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

    </>
  )
}
