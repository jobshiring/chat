// @ts-nocheck
import { KnowledgeBase } from "@/app/admin/knowledgebase"
import { getVectorDataLogLocal } from "@/app/admin/actions"
import { Separator } from "@/components/ui/separator"
import { KnowledgeBaseTable } from "@/app/admin/knowledgebase-table"

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';

const TextDirection = process.env.TEXT_DIRECTION

export default async function AdminPage() {
  // const vector_data_log = await getVectorDataLogLocal()
  return (
    <div className="space-y-6 w-full" dir={TextDirection}>
      <div>
        <h3 className="text-lg font-medium" dir={TextDirection}>
          {TextDirection == 'RTL' ? "بارگذاری داده به مخزن دانش" : "Knowledgebase Upload"}
          </h3>
        <p className="text-sm text-muted-foreground" dir={TextDirection}>
        {TextDirection == 'RTL' ? "با استفاده از ابزارهای این پنل به مخزن دانش خود داده اضافه کنید." : "Add data to your knowledgebase."}
        </p>
      </div>
      <> </>
      <KnowledgeBase />
    </div>
  )
}
