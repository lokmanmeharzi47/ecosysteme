import { createClient } from '@/utils/supabase/server';
import AlertsClient from './AlertsClient';
import { Flame, Droplet, Leaf, Cloud } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ClientAlertesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();
  const orgId = profile?.organization_id;

  let regionsQuery = supabase.from('regions').select('id, name');
  if (orgId) regionsQuery = regionsQuery.eq('organization_id', orgId);
  const { data: sites } = await regionsQuery;
  const siteIds = sites?.map((s: any) => s.id) || [];

  let incidentsQuery = supabase.from('fire_incidents').select('*');
  if (siteIds.length > 0) incidentsQuery = incidentsQuery.in('region_id', siteIds);
  incidentsQuery = incidentsQuery.order('created_at', { ascending: false }).limit(20);
  const { data: rawIncidents } = await incidentsQuery;

  const incidents = rawIncidents?.map((a: any) => {
    const siteName = sites?.find((s: any) => s.id === a.region_id)?.name || 'Inconnu';
    const date = new Date(a.created_at);
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    let timeStr = `il y a ${diffMins} min`;
    if (diffMins > 60) timeStr = `il y a ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;

    let level: 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE' = 'FAIBLE';
    let icon = 'cloud';
    let colorClass = "bg-emerald-50/20 border-emerald-150 text-emerald-950";
    let iconColorClass = "bg-emerald-100 text-emerald-700";
    let btnVariant: 'red' | 'gray' = 'gray';

    if (a.severity === 'critical') {
      level = 'CRITIQUE';
      icon = 'flame';
      colorClass = "bg-red-50/50 border-red-150 text-red-900";
      iconColorClass = "bg-red-100 text-red-600";
      btnVariant = 'red';
    } else if (a.severity === 'high') {
      level = 'ÉLEVÉ';
      icon = 'droplet';
      colorClass = "bg-orange-50/30 border-orange-150 text-orange-950";
      iconColorClass = "bg-orange-100 text-orange-600";
    } else if (a.severity === 'medium') {
      level = 'MODÉRÉ';
      icon = 'leaf';
      colorClass = "bg-yellow-50/20 border-yellow-150 text-yellow-950";
      iconColorClass = "bg-yellow-100 text-yellow-700";
    }

    return {
      id: a.id.split('-')[0].toUpperCase(),
      level,
      title: "Détection d'Incendie (IA)",
      description: siteName,
      confidence: `${a.ai_confidence}% Probabilité AI`,
      time: timeStr,
      icon,
      colorClass,
      iconColorClass,
      btnLabel: a.status === 'contained' || a.status === 'extinguished' || a.status === 'false_alarm' ? "Archiver" : "Intervenir",
      btnVariant
    };
  }) || [];

  const activeCount = incidents.filter((i: any) => i.level === 'CRITIQUE' || i.level === 'ÉLEVÉ').length;
  const stats = {
    activeCount,
    recentCount: 0, 
    globalRisk: activeCount > 0 ? 'Critique' : 'Modéré',
    avgResponseTime: 'N/A',
    impactedSites: new Set(incidents.map((i: any) => i.description)).size,
    totalSites: sites?.length || 0
  };

  return <AlertsClient initialIncidents={incidents} stats={stats} />;
}
