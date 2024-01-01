import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { LoginForm } from '@/components/login-form'
import { LoginFormSearchParams } from '@/components/login-form-searchparams'
import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function SignInPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  let session = await auth({ cookieStore })

  // legacy code
  // // //  const user_id = searchParams?.user_id

  // if query_params is passed
  const token = searchParams?.token
  const url = `${process.env.IFRAME_AUTH_API_BASE_URL}/${process.env.IFRAME_AUTH_API_PATH_URL}`
  const iframe_auth_response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  const iframe_auth_response_json = await iframe_auth_response.json()
  const user_id = iframe_auth_response_json.Success == true ? iframe_auth_response_json?.Family[0]?.DetailsID : undefined
  const BIZGPT_IFRAME_MODE = process.env.BIZGPT_IFRAME_MODE

  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }

  if (user_id && BIZGPT_IFRAME_MODE == 'true') {
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
