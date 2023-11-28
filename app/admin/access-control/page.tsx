import { Separator } from "@/components/ui/separator"
import { UserRoles } from "@/app/admin/access-control/access-control"
import { AddUser } from "@/app/admin/access-control/add-user"
import { getUserRoleTable } from "@/app/admin/actions"
import { auth } from '@/auth'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function SettingsAccountPage() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Manage User Roles</h3>
        <p className="text-sm text-muted-foreground">
          Assign roles to users using the table below.
        </p>
        <></>
        <p className="text-sm text-muted-foreground"> * Please wait for a few seconds for the changes you have made to take effect. </p>
      </div>
      <AddUser />
      <UserRoles user_email={session?.user?.email} />
    </div>
  )
}

