// @ts-nocheck
import { KnowledgeBase } from "@/app/admin/knowledgebase"
import { getVectorDataLogLocal } from "@/app/admin/actions"
import { Separator } from "@/components/ui/separator"
import { KnowledgeBaseTable } from "@/app/admin/knowledgebase-table"
import { GetTranslation } from "@/components/translation-helper/ClientTranslations"

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';

const TextDirection = process.env.TEXT_DIRECTION

export default async function AdminPage() {
  // const vector_data_log = await getVectorDataLogLocal()

  // Language and Translation
  // var TranslationData = require(`@/translation/${process.env.BIZGPT_FRONTEND_LANGUAGE}.json`);

  return (
    <div className="space-y-6 w-full" dir={TextDirection}>
      <div>
        <h3 className="text-lg font-medium" dir={TextDirection}>
          <GetTranslation text={"Knowledgebase Upload"} />
        </h3>
        <p className="text-sm text-muted-foreground" dir={TextDirection}>
          <GetTranslation text={"Add data to your knowledgebase"} />
        </p>
      </div>
      <> </>
      <KnowledgeBase />
    </div>
  )
}
