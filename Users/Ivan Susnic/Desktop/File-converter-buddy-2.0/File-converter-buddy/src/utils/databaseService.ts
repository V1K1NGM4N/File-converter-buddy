import { supabase, UserConversionStats, GlobalConversionStats } from './supabase'

// User stats functions
export const getUserStats = async (userId: string): Promise<UserConversionStats | null> => {
  try {
    const { data, error } = await supabase
      .from('user_conversion_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error fetching user stats:', error)
      return null
    }

    return data
  } catch (error) {
    console.warn('Supabase not available, using fallback mode')
    return null
  }
}

export const createUserStats = async (userId: string): Promise<UserConversionStats | null> => {
  try {
    const { data, error } = await supabase
      .from('user_conversion_stats')
      .insert({
        user_id: userId,
        total_conversions: 0,
        monthly_conversions: 0,
        last_reset_date: new Date().toISOString(),
        is_premium: false,
        conversions_by_type: {
          images: 0,
          videos: 0,
          audio: 0,
          productFeeds: 0
        }
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user stats:', error)
      return null
    }

    return data
  } catch (error) {
    console.warn('Supabase not available, using fallback mode')
    return null
  }
}

export const updateUserStats = async (
  userId: string, 
  type: 'images' | 'videos' | 'audio' | 'productFeeds', 
  fileCount: number = 1
): Promise<boolean> => {
  try {
    // Get current stats
    let stats = await getUserStats(userId)
    
    // Create if doesn't exist
    if (!stats) {
      stats = await createUserStats(userId)
      if (!stats) return false
    }

    // Check if new month and reset monthly stats
    const now = new Date()
    const lastReset = new Date(stats.last_reset_date)
    
    if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
      stats.monthly_conversions = 0
      stats.last_reset_date = now.toISOString()
    }

    // Update stats
    const updatedStats = {
      total_conversions: stats.total_conversions + fileCount,
      monthly_conversions: stats.monthly_conversions + fileCount,
      last_reset_date: stats.last_reset_date,
      conversions_by_type: {
        ...stats.conversions_by_type,
        [type]: stats.conversions_by_type[type] + fileCount
      },
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('user_conversion_stats')
      .update(updatedStats)
      .eq('user_id', userId)

    if (error) {
      console.error('Error updating user stats:', error)
      return false
    }

    return true
  } catch (error) {
    console.warn('Supabase not available, using fallback mode')
    return false
  }
}

// Global stats functions
export const getGlobalStats = async (): Promise<GlobalConversionStats | null> => {
  try {
    const { data, error } = await supabase
      .from('global_conversion_stats')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching global stats:', error)
      return null
    }

    return data
  } catch (error) {
    console.warn('Supabase not available, using fallback mode')
    return null
  }
}

export const updateGlobalStats = async (
  type: 'images' | 'videos' | 'audio' | 'productFeeds', 
  fileCount: number = 1
): Promise<boolean> => {
  try {
    // Get current stats
    const stats = await getGlobalStats()
    if (!stats) return false

    // Update stats
    const updatedStats = {
      total_files_converted: stats.total_files_converted + fileCount,
      total_downloads: stats.total_downloads + fileCount,
      last_conversion_date: new Date().toISOString(),
      conversions_by_type: {
        ...stats.conversions_by_type,
        [type]: stats.conversions_by_type[type] + fileCount
      },
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('global_conversion_stats')
      .update(updatedStats)
      .eq('id', stats.id)

    if (error) {
      console.error('Error updating global stats:', error)
      return false
    }

    return true
  } catch (error) {
    console.warn('Supabase not available, using fallback mode')
    return false
  }
}
