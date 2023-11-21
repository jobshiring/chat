import { Separator } from "@/components/ui/separator"
import { KnowledgeBase } from "@/app/admin/knowledgebase"

export default function AdminPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Knowledge-base</h3>
        <p className="text-sm text-muted-foreground">
          Add data to your knowledge-base.
        </p>
      </div>
      <> </>
      <KnowledgeBase />
    </div>
  )
}
