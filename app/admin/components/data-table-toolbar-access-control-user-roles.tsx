"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/app/admin/components/data-table-view-options"

import { priorities, statuses } from "@/app/admin/data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

const TextDirection = process.env.TEXT_DIRECTION
interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // Language and Translation
  var TranslationData = require(`@/translation/${process.env.BIZGPT_FRONTEND_LANGUAGE}.json`);

  return (
    <div className="flex items-center justify-between">
      <div className={TextDirection == "RTL" ? "flex flex-1 items-center space-x-2"  : "flex flex-1 items-center space-x-2"} dir={TextDirection}>
        <Input
          placeholder={TranslationData["Filter emails..."]}
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      {TextDirection == 'RTL' ? undefined : <DataTableViewOptions table={table} />}
    </div>
  )
}
