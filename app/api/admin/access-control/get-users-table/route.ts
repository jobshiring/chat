//@ts-nocheck
import 'server-only'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { PostgrestError } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { getUserIdByEmail, getUserRoleTable } from '@/app/admin/actions'

export const runtime = 'edge'

export async function GET() {
  const role_data = await getUserRoleTable()
  return NextResponse.json(role_data)
}
