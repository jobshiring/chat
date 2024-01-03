// @ts-nocheck
import { KnowledgeBaseTable } from "@/app/admin/knowledgebase-details/knowledgebase-table"

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const TextDirection = process.env.TEXT_DIRECTION

export default async function KnowledgeBaseOverView() {

  // Language and Translation
  var TranslationData = require(`@/translation/${process.env.BIZGPT_FRONTEND_LANGUAGE}.json`);

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium" dir={TextDirection}>
          {TranslationData["Knowledgebase Details"]}
          </h3>
        <p className="text-sm text-muted-foreground" dir={TextDirection}>
        {TranslationData["Examine the data you have inserted so far"]}
          
        </p>
      </div>
      <> </>
      <KnowledgeBaseTable />
    </div>
  )
}
