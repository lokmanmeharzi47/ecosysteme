import { createClient } from '@/utils/supabase/server'

export async function getRecentReports(limit = 10) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}
