// @ts-nocheck
import { KnowledgeBase } from "@/app/admin/knowledgebase"
import { getVectorDataLogLocal } from "@/app/admin/actions"
import { Separator } from "@/components/ui/separator"
import { KnowledgeBaseTable } from "@/app/admin/knowledgebase-table"

export default async function AdminPage() {
  // const vector_data_log = await getVectorDataLogLocal()
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Knowledgebase Upload</h3>
        <p className="text-sm text-muted-foreground">
          Add data to your knowledgebase.
        </p>
      </div>
      <> </>
      <KnowledgeBase />
    </div>
  )
}
