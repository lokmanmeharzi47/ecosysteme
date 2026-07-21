import { createClient } from '@/utils/supabase/server'

export async function getAIPredictions() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('ai_predictions')
    .select('*')
    .order('prediction_date', { ascending: false })
    .limit(10)
  if (error) throw new Error(error.message || JSON.stringify(error))
  return data
}
