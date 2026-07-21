import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats() {
  const supabase = await createClient()
  
  const [activeFires, onlineSensors, criticalAlerts] = await Promise.all([
    supabase.from('fire_incidents').select('id', { count: 'exact', head: true }).in('status', ['detected', 'investigating', 'fighting']),
    supabase.from('sensors').select('id', { count: 'exact', head: true }).eq('status', 'online'),
    supabase.from('alerts').select('id', { count: 'exact', head: true }).eq('severity', 'critical').eq('status', 'active'),
  ])

  return {
    activeFires: activeFires.count || 0,
    onlineSensors: onlineSensors.count || 0,
    criticalAlerts: criticalAlerts.count || 0,
  }
}
