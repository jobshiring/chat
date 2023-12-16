import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { LoginForm } from '@/components/login-form'
import { LoginFormSearchParams } from '@/components/login-form-searchparams'
import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const runtime = 'nodejs'

export default async function SignInPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  let session = await auth({ cookieStore })
  // if query_params is passed
  const user_id = searchParams?.user_id
  const BIZGPT_IFRAME_MODE = process.env.BIZGPT_IFRAME_MODE

  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  if (user_id && BIZGPT_IFRAME_MODE == 'true'){
    return (
      <LoginFormSearchParams user_id={user_id} />
    )

  }
  

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center py-10">
      <div className="w-full max-w-sm">
        <LoginForm action="sign-in" />
        {/* <div className="flex flex-row justify-center">
          <LoginButton />
        </div> */}
      </div>
    </div>
  )
}
