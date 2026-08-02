import { createClient } from '@/utils/supabase/server';
import SitesClient, { Site } from './SitesClient';

export default async function MesSitesPage() {
 const supabase = await createClient();

 //"Sites"correspond to"regions"in the DB schema
 const { data: regionsData } = await supabase
  .from('regions')
  .select(`
   id,
   name,
   created_at,
   sensors (count),
   fire_incidents (count)
  `)
  .order('created_at', { ascending: true });

 const sites: Site[] = regionsData?.map((region: any) => {
  
  // Check incidents to determine risk status
  const activeIncidents = region.fire_incidents?.[0]?.count || 0;
  const sensorsCount = region.sensors?.[0]?.count || 0;

  let status ="ACTIF";
  let statusType ="success";
  let risk ="Risque Faible";
  let riskColor ="#10b981";
  let icon ="🌲";
  let iconBg ="#bbf7d0";
  let image ="linear-gradient(135deg, #10b981, #047857)";
  let metricsLabel2 ="Risque incendie";
  let metricsValue2 ="Faible";

  if (activeIncidents > 0) {
   status ="ALERTE";
   statusType ="error";
   risk ="Risque Élevé";
   riskColor ="#ef4444";
   image ="linear-gradient(135deg, #ef4444, #b91c1c)";
   metricsValue2 ="Élevé";
   iconBg ="#fef2f2";
  }

  return {
   id: region.id,
   title: region.name,
   location:"Algérie", // Or derived from another table
   status,
   statusType,
   risk,
   riskColor,
   icon,
   iconBg,
   image,
   metrics: [
    { label:"Capteurs", value: sensorsCount.toString() },
    { label: metricsLabel2, value: metricsValue2 }
   ],
   lastActive:"En direct"
  };
 }) || [];

 return <SitesClient sites={sites} />;
}
