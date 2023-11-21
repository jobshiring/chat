import { Separator } from "@/components/ui/separator"
import { DataTableDemo } from "@/app/admin/access-control/access-control"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Access Control</h3>
        <p className="text-sm text-muted-foreground">
          Assign roles to users using the table below.
        </p>
      </div>
      <Separator />
      <DataTableDemo />
    </div>
  )
}
