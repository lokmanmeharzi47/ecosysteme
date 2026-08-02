import { createClient } from '@/utils/supabase/server';
import SitesClient from './SitesClient';
import { redirect } from 'next/navigation';

export default async function ClientSitesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: orgData } = await supabase
    .from('user_organizations')
    .select('organization_id')
    .eq('user_id', user.id);
  const orgIds = orgData?.map(o => o.organization_id) || [];

  let sitesQuery = supabase.from('sites').select('*');
  if (orgIds.length > 0) sitesQuery = sitesQuery.in('organization_id', orgIds);
  const { data: sites } = await sitesQuery;

  const siteIds = sites?.map(s => s.id) || [];

  let sensorsQuery = supabase.from('sensors').select('id, site_id');
  if (siteIds.length > 0) sensorsQuery = sensorsQuery.in('site_id', siteIds);
  const { data: sensors } = await sensorsQuery;

  let alertsQuery = supabase.from('alerts').select('id, site_id, severity, status');
  if (siteIds.length > 0) alertsQuery = alertsQuery.in('site_id', siteIds);
  const { data: alerts } = await alertsQuery;

  const mappedSites = sites?.map(site => {
    const siteSensors = sensors?.filter(s => s.site_id === site.id) || [];
    const siteAlerts = alerts?.filter(a => a.site_id === site.id && a.status === 'active') || [];
    
    let status = 'ACTIF';
    let risk = 'Risque Faible';
    let riskColor = 'text-emerald-600 bg-emerald-50 border-emerald-100';

    if (siteAlerts.some(a => a.severity === 'critical')) {
      status = 'ALERTE';
      risk = 'Risque Élevé';
      riskColor = 'text-red-600 bg-red-50 border-red-100';
    } else if (siteAlerts.length > 0) {
      status = 'ALERTE';
      risk = 'Risque Moyen';
      riskColor = 'text-amber-600 bg-amber-50 border-amber-100';
    }

    return {
      id: site.id,
      title: site.name,
      location: site.coordinates?.lat ? `Lat: ${site.coordinates.lat.toFixed(2)}, Lng: ${site.coordinates.lng.toFixed(2)}` : 'Algérie',
      status,
      statusType: status === 'ACTIF' ? 'success' : 'warning',
      risk,
      riskColor,
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
      metrics: [
        { label: "Capteurs", value: siteSensors.length.toString() },
        { label: "Risque incendie", value: risk === 'Risque Élevé' ? 'Élevé' : 'Normal' }
      ],
      lastActive: "il y a 5 min" // This would normally be computed from sensor_readings
    };
  }) || [];

  if (mappedSites.length === 0) {
    mappedSites.push(
      {
        id: 1,
        title: "Ferme intelligente de Mitidja",
        location: "Blida, Algérie",
        status: "ACTIF",
        statusType: "success",
        risk: "Risque Faible",
        riskColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
        metrics: [
          { label: "Capteurs", value: "18" },
          { label: "Humidité sol", value: "45%" }
        ],
        lastActive: "il y a 2 min"
      }
    );
  }

  return <SitesClient initialSites={mappedSites} />;
}
