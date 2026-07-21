'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
 ResponsiveContainer, 
 AreaChart, 
 Area, 
 XAxis, 
 YAxis, 
 Tooltip, 
 LineChart, 
 Line, 
 BarChart, 
 Bar,
 Legend,
 CartesianGrid
} from 'recharts';
import { 
 Activity, 
 AlertOctagon, 
 CheckCircle, 
 Brain,
 Cpu, 
 Flame, 
 Percent, 
 Radio, 
 TrendingUp, 
 Wifi, 
 Clock,
 Eye,
 RefreshCw,
 BellRing,
 Droplets,
 Thermometer,
 Wind,
 ArrowUpRight
} from 'lucide-react';
export default function DashboardClient({
 statsData,
 fireDetectionsOverTime,
 hourlySensorsData,
 recentAlerts,
 aiDetections,
 connectedSensors
}: {
 statsData: any[];
 fireDetectionsOverTime: any[];
 hourlySensorsData: any[];
 recentAlerts: any[];
 aiDetections: any[];
 connectedSensors: any[];
}) {
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 return (
  <div className="p-5 md:p-8 space-y-8 max-w-[1600px] mx-auto text-xs">
   
   {/* Page Header */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-black tracking-tight text-slate-900">
      Tableau de Bord National
     </h1>
     <p className="text-xs font-bold text-neutral-450 mt-1 leading-normal">
      Surveillance et détection précoce des incendies de forêt par intelligence artificielle en Algérie.
     </p>
    </div>
    
    <div className="flex items-center gap-2.5">
     <span className="text-[11px] font-bold text-neutral-500 bg-white border border-neutral-200 px-3 py-2 rounded-xl flex items-center gap-1.5 font-mono shadow-sm">
      <Clock className="w-3.5 h-3.5 text-neutral-400"/>
      SYNCHRO: 2S
     </span>
     <button className="flex items-center gap-1.5 px-4 py-2 font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md shadow-emerald-500/10 text-xs">
      <RefreshCw className="w-3.5 h-3.5"/>
      Forcer Synchro
     </button>
    </div>
   </div>

   {/* Grid of Global Stats */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
    {statsData.map((stat, idx) => {
     const ICONS: Record<string, React.ElementType> = {
      Radio, Wifi, Flame, Percent, AlertOctagon, Activity
     };
     const Icon = typeof stat.icon === 'string' ? (ICONS[stat.icon] || Radio) : (stat.icon || Radio);
     return (
      <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
       <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</span>
        <div className={`p-2.5 rounded-xl ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
         <Icon className="w-4.5 h-4.5"/>
        </div>
       </div>
       <div className="mt-4">
        <span className="text-3xl font-black tracking-tight text-slate-900">{stat.value}</span>
        <div className="flex items-center justify-between text-[11px] text-neutral-450 mt-1.5 font-semibold">
         <span className="truncate">{stat.subtext}</span>
         <span className={`font-bold ml-1 shrink-0 ${stat.trend.includes('Actif') || stat.trend.includes('99.5%') || stat.trend.includes('+1.2%') || stat.trend.includes('contrôle') ? 'text-emerald-600' : 'text-amber-500'}`}>{stat.trend}</span>
        </div>
       </div>
      </div>
     );
    })}
   </div>

   {/* Main Layout Columns */}
   <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    
    {/* Left Side: Graphs */}
    <div className="xl:col-span-2 space-y-6">
     
     {/* Fire Detections Chart */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
       <div>
        <h3 className="font-bold text-sm text-slate-850 flex items-center gap-1.5">
         <Flame className="w-4 h-4 text-orange-500"/>
         Historique des Détéctions de Feux (2026)
        </h3>
        <p className="text-[11px] text-neutral-400 font-medium">Total des foyers détectés par l'IA et fausses alertes filtrées</p>
       </div>
       <span className="text-xs bg-slate-50 px-2.5 py-1 rounded-lg border border-neutral-200 font-bold text-neutral-600">Mensuel</span>
      </div>

      <div className="h-[250px] w-full">
       {mounted && (
        <ResponsiveContainer width="100%"height="100%">
         <BarChart data={fireDetectionsOverTime}>
          <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
          <XAxis dataKey="name"stroke="#64748b"fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b"fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Bar dataKey="detections"name="Incendies Confirmés"fill="#16a34a"radius={[4, 4, 0, 0]} />
          <Bar dataKey="faussesAlertes"name="Fausses Alertes"fill="#2563eb"radius={[4, 4, 0, 0]} />
         </BarChart>
        </ResponsiveContainer>
       )}
      </div>
     </div>

     {/* Meteorological metrics charts: Temp / Hum / Smoke / Wind */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Temp & Hum Graph */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
       <div className="pb-3 border-b border-neutral-100 mb-3">
        <h3 className="font-bold text-xs text-slate-850 flex items-center gap-1.5">
         <Thermometer className="w-4 h-4 text-red-500"/>
         Météo Direct: Température (°C) & Humidité (%)
        </h3>
       </div>
       <div className="h-[180px] w-full">
        {mounted && (
         <ResponsiveContainer width="100%"height="100%">
          <LineChart data={hourlySensorsData}>
           <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
           <XAxis dataKey="time"stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
           <YAxis stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
           <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
           <Line type="monotone"dataKey="temp"name="T° Air"stroke="#dc2626"strokeWidth={2.5} dot={{ r: 3 }} />
           <Line type="monotone"dataKey="hum"name="H% Sol"stroke="#2563eb"strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
         </ResponsiveContainer>
        )}
       </div>
      </div>

      {/* Smoke & Wind Graph */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
       <div className="pb-3 border-b border-neutral-100 mb-3">
        <h3 className="font-bold text-xs text-slate-850 flex items-center gap-1.5">
         <Wind className="w-4 h-4 text-emerald-600"/>
         Fumée (ppm) & Vitesse du Vent (km/h)
        </h3>
       </div>
       <div className="h-[180px] w-full">
        {mounted && (
         <ResponsiveContainer width="100%"height="100%">
          <AreaChart data={hourlySensorsData}>
           <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
           <XAxis dataKey="time"stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
           <YAxis stroke="#64748b"fontSize={10} tickLine={false} axisLine={false} />
           <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
           <defs>
            <linearGradient id="colorSmoke"x1="0"y1="0"x2="0"y2="1">
             <stop offset="5%"stopColor="#16a34a"stopOpacity={0.2}/>
             <stop offset="95%"stopColor="#16a34a"stopOpacity={0}/>
            </linearGradient>
           </defs>
           <Area type="monotone"dataKey="smoke"name="Fumée"stroke="#16a34a"fillOpacity={1} fill="url(#colorSmoke)"strokeWidth={2} />
           <Line type="monotone"dataKey="wind"name="Vent"stroke="#2563eb"strokeWidth={2} dot={{ r: 2 }} />
          </AreaChart>
         </ResponsiveContainer>
        )}
       </div>
      </div>

     </div>

     {/* Recent Alerts Table */}
     <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
       <div>
        <h3 className="font-bold text-sm text-slate-850">Alertes Récents Générées</h3>
        <p className="text-[11px] text-neutral-450 font-medium">Rapport des derniers incidents transmis par le réseau de capteurs LoRaWAN</p>
       </div>
       <Link href="/alertes"className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5">
        Consulter tout le flux <ArrowUpRight className="w-3.5 h-3.5"/>
       </Link>
      </div>
      
      <div className="overflow-x-auto">
       <table className="w-full text-left border-collapse text-xs">
        <thead>
         <tr className="bg-slate-50/70 text-neutral-500 font-bold border-b border-neutral-200">
          <th className="p-4">Identifiant</th>
          <th className="p-4">Date et Heure</th>
          <th className="p-4">Zone Forestière</th>
          <th className="p-4">Capteur IoT</th>
          <th className="p-4">Gravité</th>
          <th className="p-4">Statut</th>
          <th className="p-4">Action</th>
         </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-neutral-700">
         {recentAlerts.map((alert) => (
          <tr key={alert.id} className="hover:bg-slate-50/50 transition-colors">
           <td className="p-4 font-mono font-bold text-slate-900">{alert.id}</td>
           <td className="p-4 font-medium">{alert.date}</td>
           <td className="p-4 font-semibold">{alert.zone}</td>
           <td className="p-4 font-mono font-medium text-neutral-500">{alert.sensor}</td>
           <td className="p-4">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
             alert.severity === 'CRITIQUE' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }`}>
             {alert.severity}
            </span>
           </td>
           <td className="p-4">
            <span className="flex items-center gap-1.5 font-semibold">
             <span className={`w-1.5 h-1.5 rounded-full ${alert.status === 'Résolu' ? 'bg-emerald-500' : alert.status === 'Assigné' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`} />
             {alert.status}
            </span>
           </td>
           <td className="p-4">
            <Link href="/alertes"className="px-3 py-1.5 font-bold rounded-lg bg-neutral-100 text-neutral-600 hover:bg-emerald-600 hover:text-white transition-colors">
             Gérer
            </Link>
           </td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>
     </div>

    </div>

    {/* Right Side: AI panels, sensor lists & status */}
    <div className="space-y-6">
     
     {/* Recent AI Detections Widget */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-sm text-slate-850 mb-4 flex items-center gap-2">
       <Brain className="w-4.5 h-4.5 text-indigo-500"/>
       Dernières Détections Caméras (IA)
      </h3>
      
      <div className="space-y-3">
       {aiDetections.map((det) => (
        <div key={det.id} className="group relative border border-neutral-200 bg-neutral-50/50 rounded-xl overflow-hidden flex gap-3.5 p-3 hover:shadow transition-shadow">
         <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
          <img src={det.img} alt="Camera view"className="object-cover w-full h-full"/>
          <span className="absolute bottom-0 right-0 bg-red-600 text-white text-[8px] font-bold px-1 rounded-tl">IA</span>
         </div>
         <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
           <span className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{det.type}</span>
           <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded">{det.confidence}</span>
          </div>
          <p className="text-xs text-slate-800 font-bold mt-1 truncate">{det.location}</p>
          <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1 mt-1">
           <Clock className="w-3 h-3 text-neutral-400"/>
           {det.time}
          </span>
         </div>
         <Link href="/centre-ia"className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-neutral-900/10 backdrop-blur-[1px] flex items-center justify-center transition-all duration-200">
          <span className="bg-white text-slate-850 font-bold text-[10px] px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1">
           <Eye className="w-3.5 h-3.5"/> Analyser
          </span>
         </Link>
        </div>
       ))}
      </div>
     </div>

     {/* Latest connected sensors */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-sm text-slate-850 mb-4 flex items-center gap-2">
       <Radio className="w-4.5 h-4.5 text-emerald-600"/>
       Derniers Capteurs Connectés (LoRaWAN)
      </h3>
      
      <div className="space-y-3">
       {connectedSensors.map((sensor) => (
        <div key={sensor.id} className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-150 bg-neutral-50/20">
         <div>
          <div className="flex items-center gap-1.5">
           <span className="text-xs font-bold text-slate-900 font-mono">{sensor.id}</span>
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
          </div>
          <p className="text-[10px] text-neutral-400 font-medium mt-0.5">{sensor.name} • {sensor.forest}</p>
         </div>
         <div className="text-right">
          <span className={`text-[10px] font-bold ${sensor.battery.includes('15%') ? 'text-red-500 bg-red-50' : 'text-neutral-500 bg-neutral-100'} px-2 py-0.5 rounded-lg`}>
           🔋 {sensor.battery}
          </span>
          <span className="text-[9px] text-neutral-400 font-medium block mt-1">{sensor.time}</span>
         </div>
        </div>
       ))}
      </div>
      
      <Link href="/capteurs"className="text-xs font-bold text-neutral-500 hover:text-neutral-800 block text-center mt-4 pt-3.5 border-t border-neutral-100">
       Gérer tout le parc capteurs ➔
      </Link>
     </div>

     {/* System & Network Health widget */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-sm text-slate-850 mb-4 flex items-center gap-2">
       <Cpu className="w-4.5 h-4.5 text-neutral-500"/>
       Santé Système & Réseau
      </h3>
      
      <div className="space-y-3.5 text-xs font-medium text-neutral-600">
       <div className="flex justify-between items-center">
        <span>Passerelles LoRaWAN (Algérie)</span>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
         100% OK <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        </span>
       </div>
       <div className="flex justify-between items-center">
        <span>Serveur API (Alger-Est)</span>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
         24ms <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        </span>
       </div>
       <div className="flex justify-between items-center">
        <span>Base de données GIS</span>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
         Stable <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        </span>
       </div>
       <div className="flex justify-between items-center">
        <span>Pipeline de calcul TerraEngine</span>
        <span className="text-emerald-600 font-bold flex items-center gap-1">
         Uptime 99.98% <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        </span>
       </div>
       
       <div className="pt-2 border-t border-neutral-100 flex items-center gap-2.5 p-3.5 bg-slate-50/50 rounded-xl">
        <BellRing className="w-4.5 h-4.5 text-emerald-600 shrink-0"/>
        <div>
         <div className="font-bold text-[11px] text-slate-800">Réseau Protection Civile connecté</div>
         <div className="text-[10px] text-neutral-400 font-semibold mt-0.5">Liaison API active pour transmission instantanée</div>
        </div>
       </div>
      </div>
     </div>

    </div>

   </div>

  </div>
 );
}
