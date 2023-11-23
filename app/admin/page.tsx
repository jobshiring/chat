// @ts-nocheck
import { KnowledgeBase } from "@/app/admin/knowledgebase"

import { getVectorDataLogLocal } from "@/app/admin/actions"

export default async function AdminPage() {
  const vector_data_log = await getVectorDataLogLocal()
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Knowledge-base</h3>
        <p className="text-sm text-muted-foreground">
          Add data to your knowledge-base.
        </p>
      </div>
      <> </>
      <KnowledgeBase vector_data_log={vector_data_log?.vector_data}/>
    </div>
  )
}
