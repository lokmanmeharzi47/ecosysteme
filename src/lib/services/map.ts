import { createClient } from '@/utils/supabase/server'

export async function getMapData() {
  const supabase = await createClient()
  
  const [sensors, incidents, alerts, riskZones] = await Promise.all([
    supabase.from('sensors').select('id, name, type, status, geom'),
    supabase.from('fire_incidents').select('id, severity, status, geom').in('status', ['detected', 'investigating', 'fighting']),
    supabase.from('alerts').select('id, title, severity, geom').eq('status', 'active'),
    supabase.from('risk_zones').select('id, name, risk_level, geom')
  ])

  return {
    sensors: sensors.data || [],
    incidents: incidents.data || [],
    alerts: alerts.data || [],
    riskZones: riskZones.data || []
  }
}
