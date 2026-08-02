import { createClient } from '@/utils/supabase/server';
import AnalyticsClient from './AnalyticsClient';

export default async function AnalyticsPage() {
 const supabase = await createClient();

 const { count: sensorsCount } = await supabase
  .from('sensors')
  .select('*', { count: 'exact', head: true });

 const { count: regionsCount } = await supabase
  .from('regions')
  .select('*', { count: 'exact', head: true });

 const { count: incidentsCount } = await supabase
  .from('fire_incidents')
  .select('*', { count: 'exact', head: true });

 // Mocks removed: returning empty arrays for charts to reflect true empty DB state
 const monthlyIncidentsData: any[] = [];
 const uptimeHistory: any[] = [];
 const batteryDegradationCurve: any[] = [];
 const pieData: any[] = [];

 return (
  <AnalyticsClient 
   incidentsCount={incidentsCount || 0}
   sensorsCount={sensorsCount || 0}
   regionsCount={regionsCount || 0}
   monthlyIncidentsData={monthlyIncidentsData}
   uptimeHistory={uptimeHistory}
   batteryDegradationCurve={batteryDegradationCurve}
   pieData={pieData}
  />
 );
}
