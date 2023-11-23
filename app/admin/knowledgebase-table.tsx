// @ts-nocheck 
"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { v4 as uuidv4 } from 'uuid';

function TableRowFiller(log) {
  const text_direction = process.env.TEXT_DIRECTION
  return (
    <TableRow key={log.id}>
      <TableCell key={`${log.id}-1`} className="font-medium">{log.id}</TableCell>
      <TableCell key={`${log.id}-2`} dir={text_direction == 'RTL' ? "rtl" : "ltr"} align="justify">{log.document}</TableCell>
      <TableCell key={`${log.id}-3`} align="justify">{log.metadata}</TableCell>
      <TableCell key={`${log.id}-4`} className="text-right">{log.datetime_added}</TableCell>
    </TableRow>
  )
}

export function KnowledgeBaseTable(vector_data_log: JSON) {
  const VectorDataLog: array = vector_data_log.vector_data_log
  if (!VectorDataLog) return (<p align="center"> No vector-data insertion log! Add some to see data here.</p>)
  return (
    <div>
      <Table>
        <TableCaption>A table of all the text-data you have uploaded so far.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>document</TableHead>
            <TableHead>source</TableHead>
            <TableHead className="text-right">datetime_inserted</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody key={1}>
          {VectorDataLog.map(log => <TableRowFiller key={uuidv4()} id={log.id} document={log.document} metadata={JSON.parse(log.metadata).title} datetime_added={log.datetime_added} />)}
        </TableBody>
      </Table>
    </div>
  )
}
