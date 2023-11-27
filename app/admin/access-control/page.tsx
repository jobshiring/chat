import { Separator } from "@/components/ui/separator"
import { DataTableDemo, DialogDemo } from "@/app/admin/access-control/access-control"
import { getUserRoleTable } from "@/app/admin/actions"
import { auth } from '@/auth'
import { cookies } from 'next/headers'

export default async function SettingsAccountPage() {
  const userRoleTable = await getUserRoleTable()
  const cookieStore = cookies()
  const session = await auth({ cookieStore })


  for (const user of userRoleTable)
    if( user.email == session?.user?.email )
      user.isUser= true
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Access Control</h3>
        <p className="text-sm text-muted-foreground">
          Assign roles to users using the table below.
        </p>
      </div>
      <Separator />
      <DialogDemo />
      <DataTableDemo userRoleTable={userRoleTable} />
    </div>
  )
}

