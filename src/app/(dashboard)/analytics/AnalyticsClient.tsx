'use client';

import React, { useState, useEffect } from 'react';
import { 
 ResponsiveContainer, 
 BarChart, 
 Bar, 
 LineChart, 
 Line, 
 XAxis, 
 YAxis, 
 Tooltip, 
 Legend, 
 AreaChart, 
 Area, 
 PieChart, 
 Pie, 
 Cell,
 CartesianGrid
} from 'recharts';
import { 
 BarChart3, 
 TrendingUp, 
 Calendar, 
 ShieldAlert, 
 Battery, 
 Radio, 
 Layers
} from 'lucide-react';

export default function AnalyticsClient({
 incidentsCount,
 sensorsCount,
 regionsCount,
 monthlyIncidentsData,
 uptimeHistory,
 batteryDegradationCurve,
 pieData
}: {
 incidentsCount: number;
 sensorsCount: number;
 regionsCount: number;
 monthlyIncidentsData: any[];
 uptimeHistory: any[];
 batteryDegradationCurve: any[];
 pieData: any[];
}) {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 const statsOverview = [
  { label:"Uptime Moyen LoRaWAN", value:"N/A", description:"En attente de données réelles", icon: Radio, color:"text-emerald-600 bg-emerald-50"},
  { label:"Incendies Détectés", value: `${incidentsCount || 0} foyers`, description:"Détections totales", icon: ShieldAlert, color:"text-red-655 bg-red-50"},
  { label:"Capteurs Déployés", value: `${sensorsCount || 0} modules`, description:"En cours d'activité", icon: Battery, color:"text-amber-600 bg-amber-50"},
  { label:"Sites Couverts", value: `${regionsCount || 0} sites`, description:"Algérie du Nord surveillée", icon: Layers, color:"text-blue-600 bg-blue-50"},
 ];

 return (
  <div className="p-5 md:p-8 space-y-8 max-w-[1600px] mx-auto text-xs">
   
   {/* Page Header */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
      <BarChart3 className="w-6 h-6 text-emerald-600"/>
      Analyses & Statistiques Historiques
     </h1>
     <p className="text-xs font-bold text-neutral-450 mt-1">
      Rapports de performance du réseau IoT, dégradation matérielle et métriques d'efficience opérationnelle.
     </p>
    </div>
    
    <div className="flex items-center gap-2">
     <span className="font-bold bg-white border border-neutral-200 px-3.5 py-2 rounded-xl text-neutral-600 flex items-center gap-1.5 shadow-sm">
      <Calendar className="w-3.5 h-3.5 text-neutral-400"/>
      PÉRIODE: JANVIER - JUIN 2026
     </span>
    </div>
   </div>

   {/* Stats Cards */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {statsOverview.map((s, idx) => {
     const Icon = s.icon;
     return (
      <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
       <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">{s.label}</span>
        <div className={`p-2.5 rounded-xl ${s.color}`}>
         <Icon className="w-4.5 h-4.5"/>
        </div>
       </div>
       <div className="mt-4">
        <span className="text-3xl font-black tracking-tight text-slate-900">{s.value}</span>
        <span className="text-[10px] text-neutral-450 font-semibold block mt-1.5">{s.description}</span>
       </div>
      </div>
     );
    })}
   </div>

   {/* Recharts Grid */}
   <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
    
    {/* Fire outbreaks vs false alarms monthly */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
     <div className="pb-3 border-b border-neutral-100 mb-4">
      <h3 className="font-bold text-xs text-slate-850 flex items-center gap-1.5">
       <TrendingUp className="w-4 h-4 text-emerald-600"/>
       Incendies Confirmés vs Fausses Alertes (Cumulé)
      </h3>
     </div>
     <div className="h-[250px] w-full">
      {mounted && (
       <ResponsiveContainer width="100%"height="100%">
        <BarChart data={monthlyIncidentsData}>
         <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
         <XAxis dataKey="name"stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
         <YAxis stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
         <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
         <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
         <Bar dataKey="incendies"name="Incendies réels"fill="#dc2626"radius={[4, 4, 0, 0]} />
         <Bar dataKey="faussesAlertes"name="Fausses alertes filtrées par IA"fill="#2563eb"radius={[4, 4, 0, 0]} />
        </BarChart>
       </ResponsiveContainer>
      )}
     </div>
    </div>

    {/* Network Uptime History */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
     <div className="pb-3 border-b border-neutral-100 mb-4">
      <h3 className="font-bold text-xs text-slate-850 flex items-center gap-1.5">
       <Radio className="w-4 h-4 text-emerald-600"/>
       Historique de Disponibilité LoRaWAN (Uptime %)
      </h3>
     </div>
     <div className="h-[250px] w-full">
      {mounted && (
       <ResponsiveContainer width="100%"height="100%">
        <LineChart data={uptimeHistory}>
         <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
         <XAxis dataKey="day"stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
         <YAxis domain={[99.5, 100]} stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
         <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
         <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
         <Line type="monotone"dataKey="collo"name="Massif de Collo"stroke="#16a34a"strokeWidth={2.5} dot={{ r: 2 }} />
         <Line type="monotone"dataKey="chrea"name="Parc de Chréa"stroke="#2563eb"strokeWidth={2.5} dot={{ r: 2 }} />
         <Line type="monotone"dataKey="akfadou"name="Forêt d'Akfadou"stroke="#a855f7"strokeWidth={2.5} dot={{ r: 2 }} />
        </LineChart>
       </ResponsiveContainer>
      )}
     </div>
    </div>

    {/* Battery Degradation curves */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
     <div className="pb-3 border-b border-neutral-100 mb-4">
      <h3 className="font-bold text-xs text-slate-850 flex items-center gap-1.5">
       <Battery className="w-4 h-4 text-amber-500"/>
       Courbe d'Autonomie & Usure des Batteries (5 ans)
      </h3>
     </div>
     <div className="h-[250px] w-full">
      {mounted && (
       <ResponsiveContainer width="100%"height="100%">
        <AreaChart data={batteryDegradationCurve}>
         <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
         <XAxis dataKey="year"stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
         <YAxis stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
         <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
         <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
         <defs>
          <linearGradient id="colorAkf"x1="0"y1="0"x2="0"y2="1">
           <stop offset="5%"stopColor="#16a34a"stopOpacity={0.2}/>
           <stop offset="95%"stopColor="#16a34a"stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorChr"x1="0"y1="0"x2="0"y2="1">
           <stop offset="5%"stopColor="#2563eb"stopOpacity={0.2}/>
           <stop offset="95%"stopColor="#2563eb"stopOpacity={0}/>
          </linearGradient>
         </defs>
         <Area type="monotone"dataKey="Akfadou"name="Akfadou (Li-SoCl2)"stroke="#16a34a"fillOpacity={1} fill="url(#colorAkf)"strokeWidth={2} />
         <Area type="monotone"dataKey="Chrea"name="Chréa (Solaire + LiFePO4)"stroke="#2563eb"fillOpacity={1} fill="url(#colorChr)"strokeWidth={2} />
        </AreaChart>
       </ResponsiveContainer>
      )}
     </div>
    </div>

    {/* Forest Coverage Pie Chart */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
     <div className="flex-1">
      <h3 className="font-bold text-xs text-slate-850 flex items-center gap-1.5 border-b border-neutral-100 pb-3 mb-3">
       <Layers className="w-4 h-4 text-blue-600"/>
       Répartition de la Végétation Surveillée (%)
      </h3>
      <p className="text-[11px] text-neutral-450 font-medium leading-relaxed">
       L'essence du bois influence grandement la propagation thermique. Les forêts de pins d'Alep représentent le plus grand risque de feu rapide.
      </p>
      
      <div className="mt-4 space-y-2 text-xs font-bold text-neutral-700">
       {pieData.map((d, i) => (
        <div key={i} className="flex items-center justify-between">
         <span className="flex items-center gap-2 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full"style={{ backgroundColor: d.color }} />
          {d.name}
         </span>
         <span>{d.value}%</span>
        </div>
       ))}
      </div>
     </div>
     
     <div className="h-[200px] w-[200px] shrink-0 relative flex items-center justify-center bg-slate-50/50 rounded-full border border-neutral-100">
      {mounted && (
       <ResponsiveContainer width="100%"height="100%">
        <PieChart>
         <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={75}
          paddingAngle={3}
          dataKey="value"
         >
          {pieData.map((entry, index) => (
           <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
         </Pie>
         <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
        </PieChart>
       </ResponsiveContainer>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
       <span className="text-[9px] text-neutral-450 font-black uppercase tracking-widest">Total</span>
       <span className="text-base font-black text-slate-850">420k Ha</span>
      </div>
     </div>
    </div>

   </div>

  </div>
 );
}
