import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { ResetPasswordForm } from '@/components/reset-password-form'
import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ResetPassword() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm action="reset-password-init" />
      </div>
    </div>
  )
}
