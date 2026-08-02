import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { Database, MapPin, Radio, AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ClientMockDataPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  // Fetch the user's organization
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();
  const orgId = profile?.organization_id;

  // Fetch regions (sites)
  let regionsQuery = supabase.from('regions').select('*');
  if (orgId) regionsQuery = regionsQuery.eq('organization_id', orgId);
  const { data: regions } = await regionsQuery;
  const regionIds = regions?.map((r: any) => r.id) || [];

  // Fetch sensors
  let sensorsQuery = supabase.from('sensors').select('*');
  if (regionIds.length > 0) sensorsQuery = sensorsQuery.in('region_id', regionIds);
  const { data: sensors } = await sensorsQuery;

  // Fetch incidents
  let incidentsQuery = supabase.from('fire_incidents').select('*');
  if (regionIds.length > 0) incidentsQuery = incidentsQuery.in('region_id', regionIds);
  const { data: incidents } = await incidentsQuery;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Database className="w-6 h-6 text-emerald-600" />
          Débogueur de Données Client
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Cette page affiche les données réelles récupérées depuis la base Supabase pour l'utilisateur actuellement connecté.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Régions (Sites) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-800">Mes Sites (Régions)</h2>
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full">{regions?.length || 0}</span>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">ID Organisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {regions?.map((r: any) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{r.organization_id}</td>
                  </tr>
                ))}
                {(!regions || regions.length === 0) && (
                  <tr><td colSpan={2} className="px-4 py-4 text-center text-slate-400">Aucune donnée</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Capteurs */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800">Capteurs Déployés</h2>
            <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">{sensors?.length || 0}</span>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Nom / Type</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Batt.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {sensors?.map((s: any) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="block font-bold">{s.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{s.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'online' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{s.battery_level}%</td>
                  </tr>
                ))}
                {(!sensors || sensors.length === 0) && (
                  <tr><td colSpan={3} className="px-4 py-4 text-center text-slate-400">Aucune donnée</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertes (Incidents) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-slate-800">Alertes (Incidents)</h2>
            <span className="ml-auto bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">{incidents?.length || 0}</span>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">ID / Sévérité</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {incidents?.map((i: any) => (
                  <tr key={i.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="block font-mono text-[10px] text-slate-400">{i.id.split('-')[0]}</span>
                      <span className={`uppercase font-bold text-[10px] ${i.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}`}>{i.severity}</span>
                    </td>
                    <td className="px-4 py-3">{i.status}</td>
                    <td className="px-4 py-3">{new Date(i.created_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
                {(!incidents || incidents.length === 0) && (
                  <tr><td colSpan={3} className="px-4 py-4 text-center text-slate-400">Aucune donnée</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
