import { createClient } from '@/utils/supabase/server'

export async function getActiveAlerts() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('alerts')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}
