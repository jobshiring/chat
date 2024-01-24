//@ts-nocheck
"use client"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

// import { columns } from "@/app/admin/components/columns-knowledgebase-details"
import { DataTable } from "@/app/admin/components/data-table-knowledgebase-details"
import { UserNav } from "@/app/admin/components/user-nav"
import { taskSchema } from "@/app/admin/data/schema"
import moment from 'moment'

import useSWR from "swr";
import GlobalConfig from '@/app/app.config.js'


import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "@/app/admin/data/data"
import { Task } from "@/app/admin/data/schema"
import { DataTableColumnHeader } from "@/app/admin/components/data-table-column-header"
import { DataTableRowActions } from "@/app/admin/components/data-table-row-actions"



const TextDirection = process.env.TEXT_DIRECTION


function KnowledgeBaseTable() {
  // Language and Translation
  var TranslationData = require(`@/translation/${GlobalConfig.LANG}.json`);
  
  const fetcher = (url) => fetch(url, {cache: "no-store"}).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/knowledgebase/get-vector-log-data',
    fetcher
  );
  if (isLoading) return <p dir={TextDirection}> {TranslationData["Loading..."]}</p>
  if (!data) return <p dir={TextDirection}>{TranslationData["No data!"]}</p>


  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TranslationData["id"]} />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "content",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TranslationData["Document Chunk"]} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] font-medium">
              {row.getValue("content")}
            </span>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "metadata",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TranslationData["metadata"]} />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] font-medium">
              {row.getValue("metadata")}
            </span>
          </div>
        )
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "datetime_added",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={TranslationData["datetime_added"]} />
      ),
      cell: ({ row }) => {
  
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] font-medium">
              {row.getValue("datetime_added")}
            </span>
          </div>
        )
      },
      enableSorting: true,
      enableHiding: true,
    }
  ]

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data.vector_data} columns={columns} />
      </div>
    </>
  )
}

export { KnowledgeBaseTable }