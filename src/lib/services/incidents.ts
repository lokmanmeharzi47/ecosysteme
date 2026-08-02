import { createClient } from '@/utils/supabase/server'

export async function getActiveIncidents() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('fire_incidents')
    .select('*')
    .in('status', ['detected', 'investigating', 'fighting'])
    .order('detection_time', { ascending: false })
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}

export async function getIncidentById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('fire_incidents').select('*').eq('id', id).single()
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}
