// lib/supabase/server.ts
import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js"

let supabase: SupabaseClient | null = null

export function createServerClient() {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anonKey) {
      throw new Error("Supabase の環境変数が設定されていません")
    }

    // Supabase公式の createClient は別名で呼ぶ
    supabase = createSupabaseClient(url, anonKey)
  }

  return supabase
}

// v0 のコード互換用エイリアス
export const createClient = createServerClient
