import { createClient } from '@/utils/supabase/server'

export async function getLatestWeather() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('weather')
    .select('*')
    .order('observation_time', { ascending: false })
    .limit(1)
    .single()
    
  if (error && error.code !== 'PGRST116') throw new Error(error.message || JSON.stringify(error)) // PGRST116 is no rows returned
  return data
}
