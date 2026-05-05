import { createClient } from '@supabase/supabase-js'

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompanyplaceholder.supabase.co'
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
}

function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'
}

export const supabase = createClient(
  getSupabaseUrl(),
  getSupabaseAnonKey()
)

export const supabaseAdmin = createClient(
  getSupabaseUrl(),
  getSupabaseServiceKey()
)
