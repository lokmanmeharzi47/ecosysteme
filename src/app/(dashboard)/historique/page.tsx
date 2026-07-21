import { createClient } from '@/utils/supabase/server';
import HistoriqueClient from './HistoriqueClient';

export default async function HistoriquePage() {
  const supabase = await createClient();

  // Fetch readings with sensor info
  const { data: readings } = await supabase
    .from('sensor_readings')
    .select(`
      id,
      reading_time,
      reading_value,
      sensors (
        id,
        name,
        type,
        status,
        battery_level,
        signal_quality,
        forest
      )
    `)
    .order('reading_time', { ascending: false })
    .limit(100);

  // Map to tableData format
  const tableData = readings?.map((r: any) => {
    let subtitle = 'Autre';
    let valueStr = r.reading_value.toString();
    
    if (r.sensors?.type === 'soil_moisture') { subtitle = 'Humidité sol'; valueStr += '%'; }
    else if (r.sensors?.type === 'temperature') { subtitle = 'Température air'; valueStr += '°C'; }
    else if (r.sensors?.type === 'ph') { subtitle = 'Acidité (pH)'; }

    // Mock battery/network from percentages to icons
    const bat = r.sensors?.battery_level > 20 ? 1 : 0;
    const net = r.sensors?.signal_quality > 70 ? 3 : r.sensors?.signal_quality > 30 ? 2 : 1;
    
    // Status Logic
    let status = 'Optimal';
    if (r.sensors?.status === 'error' || r.sensors?.battery_level < 15) {
      status = 'Alerte Seuil';
    } else if (r.sensors?.status === 'warning') {
      status = 'Neutre';
    }

    return {
      date: new Date(r.reading_time).toLocaleString('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
      sensor: r.sensors?.name || r.sensors?.id.substring(0,8),
      subtitle,
      site: r.sensors?.forest || 'Site Inconnu',
      value: valueStr,
      network: net,
      battery: bat,
      status: status
    };
  }) || [];

  return <HistoriqueClient initialData={tableData} />;
}
