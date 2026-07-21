import { createClient } from '@/utils/supabase/server';
import AlertsClient, { Incident } from './AlertsClient';


export default async function AlertesPage() {
 const supabase = await createClient();

 // Fetch active alerts
 const { data: alerts, count: activeCount } = await supabase
  .from('alerts')
  .select('*, organization_id(name)', { count: 'exact' })
  .neq('status', 'resolved')
  .order('created_at', { ascending: false });

 // Map to Incident interface
 const initialIncidents: Incident[] = alerts?.map((alert: any) => {
  
  // Determine UI attributes based on severity
  let level: 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE' = 'FAIBLE';
  let icon = 'AlertTriangle';
  let colorClass ="bg-slate-50 border-slate-200 text-slate-800";
  let iconColorClass ="bg-slate-100 text-slate-600";
  let btnLabel ="Consulter";
  let btnVariant: 'red' | 'gray' ="gray";

  const s = alert.severity?.toLowerCase();
  if (s === 'critical' || s === 'critique') {
   level = 'CRITIQUE';
   icon = 'Flame';
   colorClass ="bg-red-50/50 border-red-150 text-red-900";
   iconColorClass ="bg-red-100 text-red-600";
   btnLabel ="Intervenir";
   btnVariant ="red";
  } else if (s === 'high' || s === 'elevé' || s === 'élevé') {
   level = 'ÉLEVÉ';
   icon = 'Droplet'; // or Shield
   colorClass ="bg-orange-50/30 border-orange-150 text-orange-950";
   iconColorClass ="bg-orange-100 text-orange-600";
   btnLabel ="Assigner";
   btnVariant ="gray";
  } else if (s === 'medium' || s === 'modéré') {
   level = 'MODÉRÉ';
   icon = 'Leaf';
   colorClass ="bg-yellow-50/20 border-yellow-150 text-yellow-950";
   iconColorClass ="bg-yellow-100 text-yellow-700";
   btnLabel ="Ignorer";
   btnVariant ="gray";
  } else {
   level = 'FAIBLE';
   icon = 'Cloud';
   colorClass ="bg-emerald-50/20 border-emerald-150 text-emerald-950";
   iconColorClass ="bg-emerald-100 text-emerald-700";
   btnLabel ="Archiver";
   btnVariant ="gray";
  }

  return {
   id: `${alert.id.substring(0, 4).toUpperCase()}-A`,
   level,
   title: alert.title,
   description: alert.message,
   confidence:"Analyse confirmée",
   time: new Date(alert.created_at).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute:'2-digit'
   }),
   icon,
   colorClass,
   iconColorClass,
   btnLabel,
   btnVariant,
  };
 }) || [];

 return (
  <AlertsClient 
   initialIncidents={initialIncidents} 
   totalActiveCount={activeCount || 0}
  />
 );
}
