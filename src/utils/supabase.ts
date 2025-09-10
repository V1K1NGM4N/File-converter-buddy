import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if environment variables are missing
let supabase: any = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase environment variables not found. Using fallback mode.')
  // Create a mock client for development
  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ single: () => ({ data: null, error: { code: 'PGRST116' } }) }) }),
      insert: () => ({ select: () => ({ single: () => ({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      update: () => ({ eq: () => ({ data: null, error: { message: 'Supabase not configured' } }) })
    })
  }
}

export { supabase }

// Database types
export interface UserConversionStats {
  id: string
  user_id: string
  total_conversions: number
  monthly_conversions: number
  last_reset_date: string
  is_premium: boolean
  conversions_by_type: {
    images: number
    videos: number
    audio: number
    productFeeds: number
  }
  created_at: string
  updated_at: string
}

export interface GlobalConversionStats {
  id: string
  total_files_converted: number
  total_downloads: number
  last_conversion_date: string
  conversions_by_type: {
    images: number
    videos: number
    audio: number
    productFeeds: number
  }
  updated_at: string
}
