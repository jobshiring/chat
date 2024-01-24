// @ts-nocheck
import { KnowledgeBaseTable } from "@/app/admin/knowledgebase-details/knowledgebase-table"

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import { GetTranslation } from "@/components/translation-helper/ClientTranslations"

const TextDirection = process.env.TEXT_DIRECTION
import GlobalConfig from '@/app/app.config.js'

export default async function KnowledgeBaseOverView() {

  // Language and Translation
  var TranslationData = require(`@/translation/${GlobalConfig.LANG}.json`);

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium" dir={TextDirection}>
        <GetTranslation text="Knowledgebase Details"/>
          </h3>
        <p className="text-sm text-muted-foreground" dir={TextDirection}>
        <GetTranslation text="Examine the data you have inserted so far"/>
          
        </p>
      </div>
      <> </>
      <KnowledgeBaseTable />
    </div>
  )
}
