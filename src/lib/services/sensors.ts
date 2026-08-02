import { createClient } from '@/utils/supabase/server'

export async function getSensors() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('sensors').select('*')
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}

export async function getSensorById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('sensors').select('*').eq('id', id).single()
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}

export async function getSensorReadings(sensorId: string, limit = 100) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('sensor_readings')
    .select('*')
    .eq('sensor_id', sensorId)
    .order('reading_time', { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}
