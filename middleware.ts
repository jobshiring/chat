import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const {
    data: { session }
  } = await supabase.auth.getSession()

  // OPTIONAL: this forces users to be logged in to use the chatbot.
  // If you want to allow anonymous users, simply remove the check below.
  const user_id = req.nextUrl.searchParams.get('user_id')
  if (
    !session &&
    !req.url.includes('/sign-in') &&
    !req.url.includes('/sign-up') &&
    !req.url.includes('/reset-password')
  ) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/sign-in'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    user_id ? redirectUrl.searchParams.set(`user_id`, user_id) : undefined
    return NextResponse.redirect(redirectUrl)
  }
  else if (session && req.url.includes('/reset-password') && req.url.includes('/sign-up') && req.url.includes('/sign-in')){
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/'
    user_id ? redirectUrl.searchParams.set(`user_id`, user_id) : undefined
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - share (publicly shared chats)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!share|api|_next/static|_next/image|favicon.ico).*)'
  ]
}
