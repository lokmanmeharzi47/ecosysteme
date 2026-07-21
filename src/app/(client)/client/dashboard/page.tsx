import { createClient } from '@/utils/supabase/server';
import DashboardClient from './DashboardClient';
import { MapPin, Radio, AlertTriangle, FileText } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  // 1. Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/connexion');
  }

  // 2. Get user's organization from profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  const orgId = profile?.organization_id;

  // 3. Fetch Regions (Sites) for the user's org
  let regionsQuery = supabase.from('regions').select('id, name');
  if (orgId) {
    regionsQuery = regionsQuery.eq('organization_id', orgId);
  }
  const { data: sites } = await regionsQuery;
  const siteIds = sites?.map((s: any) => s.id) || [];

  // 4. Fetch sensors for these regions
  let sensorsQuery = supabase.from('sensors').select('id, region_id, status', { count: 'exact' });
  if (siteIds.length > 0) {
    sensorsQuery = sensorsQuery.in('region_id', siteIds);
  }
  const { data: sensors, count: sensorsCount } = await sensorsQuery;

  // 5. Fetch fire incidents for these regions as alerts
  let incidentsQuery = supabase.from('fire_incidents').select('id, region_id, severity, status, created_at');
  if (siteIds.length > 0) {
    incidentsQuery = incidentsQuery.in('region_id', siteIds);
  }
  incidentsQuery = incidentsQuery.order('created_at', { ascending: false }).limit(5);
  const { data: recentAlerts } = await incidentsQuery;

  // Compute active alerts (using fire incidents)
  const activeAlertsCount = recentAlerts?.filter((a: any) => ['detected', 'investigating', 'fighting'].includes(a.status)).length || 0;
  const criticalAlertsCount = recentAlerts?.filter((a: any) => ['detected', 'investigating', 'fighting'].includes(a.status) && a.severity === 'critical').length || 0;

  // Generate Stats
  const statsClient = [
    { label: 'Mes Sites Actifs', value: sites?.length.toString() || '0', subtext: 'Forêts surveillées', icon: "MapPin", color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Capteurs en ligne', value: sensorsCount?.toString() || '0', subtext: `Sur ${sensorsCount || 0} déployés`, icon: "Radio", color: 'text-blue-600 bg-blue-50' },
    { label: 'Alertes en cours', value: activeAlertsCount.toString(), subtext: `${criticalAlertsCount} critique`, icon: "AlertTriangle", color: 'text-amber-600 bg-amber-50' },
    { label: 'Rapports générés', value: '0', subtext: 'Ce mois-ci', icon: "FileText", color: 'text-purple-600 bg-purple-50' },
  ];

  // Map Alerts
  const severityMap: Record<string, string> = {
    'critical': 'critique',
    'high': 'attention',
    'medium': 'attention',
    'low': 'info'
  };

  const myAlerts = recentAlerts?.map((a: any) => {
    const siteName = sites?.find((s: any) => s.id === a.region_id)?.name || 'Inconnu';
    const date = new Date(a.created_at);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const timeStr = diffHours > 0 ? `il y a ${diffHours}h` : 'à l\'instant';

    return {
      id: a.id,
      site: siteName,
      type: 'Incendie',
      severity: severityMap[a.severity] || 'info',
      time: timeStr,
      resolved: a.status === 'contained' || a.status === 'extinguished' || a.status === 'false_alarm'
    };
  }) || [];

  // Map Sites Summary
  const mySites = sites?.map((site: any) => {
    const siteSensors = sensors?.filter((s: any) => s.region_id === site.id) || [];
    const activeSensors = siteSensors.length;
    
    // Check if site has active incidents
    const siteAlerts = recentAlerts?.filter((a: any) => a.region_id === site.id && ['detected', 'investigating', 'fighting'].includes(a.status)) || [];
    let status = 'normal';
    if (siteAlerts.some((a: any) => a.severity === 'critical')) status = 'alerte';
    else if (siteAlerts.length > 0) status = 'attention';

    return {
      name: site.name,
      sensors: activeSensors,
      status: status,
      temp: 0, // No mock data
      hum: 0,
      wind: 0
    };
  }) || [];

  // Empty activity data for now since we removed the mock
  const activityData: any[] = [];

  return (
    <DashboardClient 
      statsClient={statsClient}
      activityData={activityData}
      myAlerts={myAlerts}
      mySites={mySites}
    />
  );
}
