// @ts-nocheck
import { KnowledgeBaseTable } from "@/app/admin/knowledgebase-details/knowledgebase-table"

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function KnowledgeBaseOverView() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Knowledgebase Details</h3>
        <p className="text-sm text-muted-foreground">
          Examine the data you have inserted so far.
        </p>
      </div>
      <> </>
      <KnowledgeBaseTable />
    </div>
  )
}
