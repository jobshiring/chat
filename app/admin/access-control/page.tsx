import { UserRoles } from "@/app/admin/access-control/access-control"
import { auth } from '@/auth'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const TextDirection = process.env.TEXT_DIRECTION

export default async function SettingsAccountPage() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium" dir={TextDirection}>
          {TextDirection == 'RTL' ? " مدیریت کاربرها و نقش‌ها " : "Manage User Roles"}
          </h3>
        <p className="text-sm text-muted-foreground" dir={TextDirection}>
        {TextDirection == 'RTL' ? " از طریق این پنل می‌توانید کاربرها و نقش‌ها را مدیریت کنید." : "Assign roles to users using the table below."}  
        </p>
        <></>
        <p className="text-sm text-muted-foreground" dir={TextDirection}> 
        {TextDirection == 'RTL' ? " * لطفا پس از اعمال تغییرات چند لحظه صبر کنید تا سیستم بروزرسانی گردد. " : "* Please wait for a few seconds for the changes you have made to take effect."}
        
         </p>
      </div>
      <UserRoles user_email={session?.user?.email} />
    </div>
  )
}

