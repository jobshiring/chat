//@ts-nocheck
"use client"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/app/admin/components/columns-knowledgebase-details"
import { DataTable } from "@/app/admin/components/data-table-knowledgebase-details"
import { UserNav } from "@/app/admin/components/user-nav"
import { taskSchema } from "@/app/admin/data/schema"
import moment from 'moment'

import useSWR from "swr";

const TextDirection = process.env.TEXT_DIRECTION

function KnowledgeBaseTable() {
  // Language and Translation
  var TranslationData = require(`@/translation/${process.env.BIZGPT_FRONTEND_LANGUAGE}.json`);
  
  const fetcher = (url) => fetch(url, {cache: "no-store"}).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    '/api/admin/knowledgebase/get-vector-log-data',
    fetcher
  );
  if (isLoading) return <p dir={TextDirection}> {TranslationData["Loading..."]}</p>
  if (!data) return <p dir={TextDirection}>{TranslationData["No data!"]}</p>



  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <DataTable data={data.vector_data} columns={columns} />
      </div>
    </>
  )
}

export { KnowledgeBaseTable }