'use server'
import 'server-only'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { type Chat } from '@/lib/types'

export async function getBookmarkedMessagesSupabase(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('bookmarked_messages')
    .select('payload')
    .eq('id', id)
    .maybeSingle()

  return (data?.payload) ?? null
}

export async function getBookmarksSupabase(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('bookmarks')
    .select('payload')
    .eq('id', id)
    .maybeSingle()

  return (data?.payload) ?? null
}

export async function getFeedbacksSupabase(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('feedbacks')
    .select('payload')
    .eq('id', id)
    .maybeSingle()

  return (data?.payload) ?? null
}

export async function getBookmarksLocal(): Promise<JSON> {
  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_BOOKMARK_RETRIEVE_PATH}`
  const payload = {
    data: { "index": Math.round(2 / 2), 'bookmark_state': false, 'username': 'user1' }
  };
  let output;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch/retrieve bookmark data - The main component')
  }
  output = await res.json();
  return output
}

export async function getFeedbacksLocal(): Promise<JSON> {
  const url = `${process.env.BizGPT_CLIENT_API_BASE_ADDRESS_SCHEME}://${process.env.BizGPT_CLIENT_API_BASE_ADDRESS}:${process.env.BizGPT_CLIENT_API_PORT}/${process.env.BizGT_CLIENT_API_FEEDBACK_RETRIEVE_PATH}`
  const payload = {
    data: { "index": Math.round(2 / 2), 'bookmark_state': false, 'username': 'user1' }
  };
  let output;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.BizGPT_CLIENT_API_TOKEN_FRONTEND}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch/retrieve feedback data - The main component')
  }
  output = await res.json();
  return output
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    const { data } = await supabase
      .from('chats')
      .select('payload')
      .order('payload->createdAt', { ascending: false })
      .eq('user_id', userId)
      .throwOnError()

    return (data?.map(entry => entry.payload) as Chat[]) ?? []
  } catch (error) {
    return []
  }
}

export async function getChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('chats')
    .select('payload')
    .eq('id', id)
    .maybeSingle()

  return (data?.payload as Chat) ?? null
}


export async function removeChat({ id, path }: { id: string; path: string }) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    await supabase.from('chats').delete().eq('id', id).throwOnError()

    revalidatePath('/')
    return revalidatePath(path)
  } catch (error) {
    return {
      error: 'Unauthorized'
    }
  }
}

export async function clearChats() {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    await supabase.from('chats').delete().throwOnError()
    revalidatePath('/')
    return redirect('/')
  } catch (error) {
    console.log('clear chats error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function getSharedChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('chats')
    .select('payload')
    .eq('id', id)
    .not('payload->sharePath', 'is', null)
    .maybeSingle()

  return (data?.payload as Chat) ?? null
}

export async function shareChat(chat: Chat) {
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  await supabase
    .from('chats')
    .update({ payload: payload as any })
    .eq('id', chat.id)
    .throwOnError()

  return payload
}
