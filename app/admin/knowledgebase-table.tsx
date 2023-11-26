//@ts-nocheck
"use client"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/app/admin/components/columns"
import { DataTable } from "@/app/admin/components/data-table"
import { UserNav } from "@/app/admin/components/user-nav"
import { taskSchema } from "@/app/admin/data/schema"
import moment from 'moment'

import useSWR from "swr";


function getTasks(json: JSON) {
  const better_data_list = []
  for (const entry of json.vector_data) {
    const date_time = moment(entry.datetime_added)
    better_data_list.push(
      {
        id: entry.id,
        id_inserted: entry.id_inserted,
        document: entry.document,
        metadata: JSON.parse(entry.metadata).title,
        datetime_added: date_time.utc().format('YYYY-MM-DD HH:mm:ss:SS')
      }
    )
  }
  return z.array(taskSchema).parse(better_data_list)
}

function KnowledgeBaseTable() {
  const fetcher = (url) => fetch(url, {cache: "no-store"}).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    'api/admin/get-vector-log-data',
    fetcher,
    { refreshInterval: 1000 }
  );
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No vector log data</p>



  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Knowledge-base overview</h2>
            <p className="text-muted-foreground">
              Here&apos;s the table containing all the data added to the knowledge-base so far.
            </p>
          </div>
        </div>
        <DataTable data={data.vector_data} columns={columns} />
      </div>
    </>
  )
}

export { KnowledgeBaseTable }