'use client';

import React, { useState, useEffect } from 'react';
import { 
 ResponsiveContainer, 
 RadarChart, 
 PolarGrid, 
 PolarAngleAxis, 
 PolarRadiusAxis, 
 Radar,
 Tooltip
} from 'recharts';
import { 
 Flame, 
 AlertTriangle, 
 TrendingUp, 
 CheckCircle
} from 'lucide-react';

interface ForestFWI {
 name: string;
 wilaya: string;
 temp: number;
 humidity: number;
 windSpeed: number;
 fwiScore: number; // Fire Weather Index score
 status: 'Faible' | 'Modéré' | 'Élevé' | 'Très Élevé' | 'Extrême';
 activeFires: number;
}

export default function FireClient({ forestsFWI }: { forestsFWI: ForestFWI[] }) {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 const getFWIBadgeColor = (status: ForestFWI['status']) => {
  switch (status) {
   case 'Extrême': return 'bg-red-600/10 text-red-650 border-red-500/20';
   case 'Très Élevé': return 'bg-red-500/10 text-red-500 border-red-400/20';
   case 'Élevé': return 'bg-orange-500/10 text-orange-600 border-orange-400/20';
   case 'Modéré': return 'bg-amber-500/10 text-amber-600 border-amber-400/20';
   default: return 'bg-emerald-500/10 text-emerald-600 border-emerald-400/20';
  }
 };

 const activeFiresTotal = forestsFWI.reduce((acc, f) => acc + f.activeFires, 0);

 return (
  <div className="p-5 md:p-8 space-y-8 max-w-[1600px] mx-auto text-xs">
   
   {/* Page Header */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
      <Flame className="w-6 h-6 text-orange-500"/>
      Suivi en Direct & Calcul FWI (Fire Weather Index)
     </h1>
     <p className="text-xs font-bold text-neutral-450 mt-1">
      Calcul en temps réel de l'indice de danger météo forêt (FWI) basé sur les relevés d'humidité, de vent et de température.
     </p>
    </div>
   </div>

   {/* Overview Cards */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
     <div className="p-3 rounded-xl bg-red-50 text-red-500 border border-red-100">
      <Flame className="w-6 h-6"/>
     </div>
     <div>
      <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest block">Foyers d'Incendie Actifs</span>
      <span className="text-xl font-black text-red-655 mt-0.5 block">{activeFiresTotal} alertes confirmées</span>
     </div>
    </div>

    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
     <div className="p-3 rounded-xl bg-red-50 text-red-500 border border-red-100">
      <AlertTriangle className="w-6 h-6"/>
     </div>
     <div>
      <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest block">Wilayas en Risque Extrême</span>
      <span className="text-xl font-black text-red-655 mt-0.5 block">02 Wilayas (Béjaïa, Skikda)</span>
     </div>
    </div>

    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
     <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
      <CheckCircle className="w-6 h-6"/>
     </div>
     <div>
      <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest block">Zones Sécurisées</span>
      <span className="text-xl font-black text-emerald-600 mt-0.5 block">03 Forêts Sous Surveillance</span>
     </div>
    </div>
   </div>

   {/* Main Data Section */}
   <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    
    {/* Tabular data of monitored forests */}
    <div className="xl:col-span-2 bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
     <div className="p-5 border-b border-neutral-200">
      <h3 className="font-bold text-sm text-slate-850">Relevés FWI par Régions Forestières</h3>
     </div>
     
     <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
       <thead>
        <tr className="bg-slate-50/70 text-neutral-500 font-bold border-b border-neutral-200">
         <th className="p-4">Forêt & Wilaya</th>
         <th className="p-4 text-center">Température</th>
         <th className="p-4 text-center">Humidité relative</th>
         <th className="p-4 text-center">Vitesse du Vent</th>
         <th className="p-4 text-center">Score FWI</th>
         <th className="p-4 text-center">Niveau de Danger</th>
         <th className="p-4 text-right">Feux en cours</th>
        </tr>
       </thead>
       <tbody className="divide-y divide-neutral-100 text-neutral-700 font-semibold">
        {forestsFWI.map((f, idx) => (
         <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
          <td className="p-4">
           <div className="font-bold text-slate-900 text-xs">{f.name}</div>
           <div className="text-[10px] text-neutral-400 font-semibold mt-0.5">Wilaya de {f.wilaya}</div>
          </td>
          <td className="p-4 text-center font-bold">{f.temp}°C</td>
          <td className="p-4 text-center font-bold text-blue-600">{f.humidity}%</td>
          <td className="p-4 text-center font-bold">{f.windSpeed} km/h</td>
          <td className="p-4 text-center font-black text-slate-900">{f.fwiScore}</td>
          <td className="p-4 text-center">
           <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${getFWIBadgeColor(f.status)}`}>
            {f.status}
           </span>
          </td>
          <td className="p-4 text-right font-bold text-red-500">
           {f.activeFires > 0 ? (
            <span className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-700 px-2 py-0.5 rounded-lg">
             🔥 {f.activeFires} foyer
            </span>
           ) : (
            <span className="text-neutral-400 font-normal">Aucun</span>
           )}
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    </div>

    {/* Right Side: Radar Chart comparing regional dangers */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[340px]">
     <div>
      <h3 className="font-bold text-xs text-slate-850 border-b border-neutral-100 pb-3 mb-2 flex items-center gap-1.5">
       <TrendingUp className="w-4 h-4 text-emerald-600"/>
       Comparaison Graphique des indices FWI
      </h3>
      <p className="text-[10px] text-neutral-400 font-medium">
       Visualisation comparée de la sensibilité globale par forêt. Les scores supérieurs à 30 indiquent un danger sévère.
      </p>
     </div>
     
     <div className="h-[210px] w-full flex items-center justify-center">
      {mounted && (
       <ResponsiveContainer width="100%"height="100%">
        <RadarChart cx="50%"cy="50%"outerRadius="75%"data={forestsFWI.map(f => ({ name: f.name.replace("Forêt d'","").replace("Parc National de",""), FWI: f.fwiScore, fullMark: 50 }))}>
         <PolarGrid stroke="#e2e8f0"/>
         <PolarAngleAxis dataKey="name"stroke="#64748b"fontSize={9} />
         <PolarRadiusAxis angle={30} domain={[0, 50]} stroke="#64748b"fontSize={8} />
         <Radar name="FWI Score"dataKey="FWI"stroke="#f97316"fill="#f97316"fillOpacity={0.25} />
         <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
        </RadarChart>
       </ResponsiveContainer>
      )}
     </div>
    </div>

   </div>

  </div>
 );
}
