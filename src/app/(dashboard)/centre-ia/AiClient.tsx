'use client';

import React, { useState, useEffect } from 'react';
import { 
 ResponsiveContainer, 
 LineChart, 
 Line, 
 XAxis, 
 YAxis, 
 Tooltip, 
 CartesianGrid, 
 Legend, 
 RadarChart, 
 PolarGrid, 
 PolarAngleAxis, 
 PolarRadiusAxis, 
 Radar,
 AreaChart,
 Area
} from 'recharts';
import { 
 Brain, 
 Cpu, 
 ShieldAlert, 
 Target, 
 Gauge, 
 Eye, 
 Camera, 
 TrendingUp, 
 AlertCircle,
 HelpCircle,
 Play
} from 'lucide-react';

export default function AiClient({
 confusionMatrix,
 modelMatrix,
 cameraStreams,
 falseAlarmsRatio,
 recentAIActivities
}: {
 confusionMatrix: any[];
 modelMatrix: any[];
 cameraStreams: any[];
 falseAlarmsRatio: any[];
 recentAIActivities: any[];
}) {
 const [mounted, setMounted] = useState(false);
 const [selectedStream, setSelectedStream] = useState(cameraStreams[0]);
 const [scanning, setScanning] = useState(true);

 useEffect(() => {
  setMounted(true);
  // Loop simulation of scanning effect
  const interval = setInterval(() => {
   setScanning(prev => !prev);
  }, 4000);
  return () => clearInterval(interval);
 }, []);

 return (
  <div className="p-5 md:p-8 space-y-8 max-w-[1600px] mx-auto text-xs">
   
   {/* Page Header */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
      <Brain className="w-6 h-6 text-emerald-600"/>
      Centre d'Analyse IA (TerraEngine)
     </h1>
     <p className="text-xs font-bold text-neutral-450 mt-1">
      Supervisez le modèle d'inférence en temps réel pour le traitement de la fumée et des anomalies de chaleur.
     </p>
    </div>
   </div>

   {/* Grid of Gauges and KPI */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
    {[
     { label:"Précision Globale", value:"98.7%", desc:"Taux de détection correcte", color:"text-emerald-600 bg-emerald-50"},
     { label:"Rappel IA (Recall)", value:"94.2%", desc:"Sensibilité d'interception", color:"text-blue-600 bg-blue-50"},
     { label:"Faux Positifs", value:"0.8%", desc:"Erreurs de classification", color:"text-neutral-500 bg-slate-50"},
     { label:"Images par seconde", value:"12 fps / cam", desc:"Vitesse d'inférence brute", color:"text-teal-600 bg-teal-50"},
    ].map((item, idx) => (
     <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest block">{item.label}</span>
      <div className="flex items-baseline justify-between mt-3">
       <span className="text-3xl font-black text-slate-900">{item.value}</span>
       <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold border ${item.color.includes('emerald') ? 'border-emerald-100' : 'border-neutral-200'}`}>{item.desc}</span>
      </div>
     </div>
    ))}
   </div>

   {/* Main Grid split */}
   <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    
    {/* Left/Center: Camera Streams and AI overlay */}
    <div className="xl:col-span-2 space-y-6">
     
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
       <div>
        <h3 className="font-bold text-sm text-slate-850 flex items-center gap-1.5">
         <Camera className="w-4 h-4 text-emerald-600"/>
         Flux de Vision par Ordinateur (IA Overlay)
        </h3>
        <p className="text-[11px] text-neutral-450 font-medium">Flux vidéo avec trame de ciblage automatique des anomalies thermiques</p>
       </div>
       <div className="flex gap-1.5">
        {cameraStreams.map(cam => (
         <button
          key={cam.id}
          onClick={() => setSelectedStream(cam)}
          className={`px-3 py-1.5 rounded-xl font-bold border transition-colors ${
           selectedStream.id === cam.id
            ? 'bg-emerald-50 text-emerald-700 border-emerald-500/10'
            : 'bg-white border-neutral-200 hover:bg-slate-50'
          }`}
         >
          {cam.name}
         </button>
        ))}
       </div>
      </div>

      {/* Video preview container with overlay */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 group">
       <img 
        src={selectedStream.streamUrl} 
        alt="Camera Stream"
        className="w-full h-full object-cover opacity-90"
       />
       
       {/* Scanline grid effect */}
       <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_50%)] bg-[length:100%_4px] pointer-events-none"/>

       {/* Holographic scanner active overlay */}
       {selectedStream.risk === 'Critique' && (
        <div className="absolute top-[30%] left-[40%] w-[120px] h-[80px] border-2 border-red-500 rounded flex flex-col justify-between p-1.5 animate-pulse">
         <div className="flex justify-between text-[8px] font-bold text-red-500 bg-red-950/70 p-0.5 rounded leading-none">
          <span>SEUIL CRITIQUE</span>
          <span>94.2%</span>
         </div>
         <span className="text-[8px] text-red-500 font-mono font-bold text-right">FEU CONFIRMÉ</span>
        </div>
       )}

       {selectedStream.risk === 'Alerte' && (
        <div className="absolute top-[20%] left-[25%] w-[100px] h-[70px] border-2 border-amber-500 rounded flex flex-col justify-between p-1.5 animate-pulse">
         <div className="flex justify-between text-[8px] font-bold text-amber-500 bg-amber-950/70 p-0.5 rounded leading-none">
          <span>ANOMALIE CHALEUR</span>
          <span>89.8%</span>
         </div>
         <span className="text-[8px] text-amber-500 font-mono font-bold text-right">EN COURS</span>
        </div>
       )}

       {/* Status bar bottom overlay */}
       <div className="absolute bottom-4 left-4 right-4 bg-white/85 backdrop-blur rounded-xl p-3 border border-slate-200 flex items-center justify-between text-slate-900 font-semibold">
        <div className="flex items-center gap-2">
         <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"/>
         <span>FLUX EN DIRECT • {selectedStream.id} ({selectedStream.name})</span>
        </div>
        <span>FPS: {selectedStream.fps} • LATENCE: 120ms</span>
       </div>
      </div>

      {/* AI Predictions/Timelog log */}
      <div className="mt-4 p-4.5 bg-slate-50 border border-neutral-200 rounded-xl space-y-2">
       <span className="text-[9px] font-black text-neutral-450 uppercase tracking-widest block">Dernières Activités d'Inférence</span>
       <div className="space-y-1.5 font-mono text-[10px] text-neutral-600">
        {recentAIActivities.map((act, i) => (
         <p key={i} className="flex justify-between">
          <span>{act.message}</span>
          <span className={`${act.color} font-bold`}>{act.tag}</span>
         </p>
        ))}
       </div>
      </div>

     </div>

    </div>

    {/* Right Side: Recharts Graphs and stats matrices */}
    <div className="space-y-6">
     
     {/* confusion Matrix Graph */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-xs text-slate-850 mb-3 flex items-center gap-1.5">
       <TrendingUp className="w-4 h-4 text-emerald-600"/>
       Évolution Précision vs Rappel (Entraînement)
      </h3>
      
      <div className="h-[200px] w-full">
       {mounted && (
        <ResponsiveContainer width="100%"height="100%">
         <LineChart data={confusionMatrix}>
          <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
          <XAxis dataKey="epoch"stroke="#64748b"fontSize={9} tickLine={false} axisLine={false} />
          <YAxis domain={[70, 100]} stroke="#64748b"fontSize={9} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
          <Line type="monotone"dataKey="precision"name="Précision"stroke="#16a34a"strokeWidth={2} dot={{ r: 2 }} />
          <Line type="monotone"dataKey="recall"name="Rappel (Recall)"stroke="#2563eb"strokeWidth={2} dot={{ r: 2 }} />
         </LineChart>
        </ResponsiveContainer>
       )}
      </div>
     </div>

     {/* Radar chart of atmospheric tolerances */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-xs text-slate-850 mb-2 flex items-center gap-1.5">
       <Target className="w-4 h-4 text-blue-600"/>
       Tolérance aux Obstructions (%)
      </h3>
      <p className="text-[10px] text-neutral-400 mb-3 font-medium">Sensibilité opérationnelle en fonction des conditions atmosphériques</p>
      
      <div className="h-[200px] w-full flex items-center justify-center">
       {mounted && (
        <ResponsiveContainer width="100%"height="100%">
         <RadarChart cx="50%"cy="50%"outerRadius="80%"data={modelMatrix}>
          <PolarGrid stroke="#e2e8f0"/>
          <PolarAngleAxis dataKey="subject"stroke="#64748b"fontSize={9} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b"fontSize={8} />
          <Radar name="Modèle Actuel"dataKey="modelA"stroke="#16a34a"fill="#16a34a"fillOpacity={0.25} />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
         </RadarChart>
        </ResponsiveContainer>
       )}
      </div>
     </div>

     {/* False Alarms Ratio Area chart */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-xs text-slate-850 mb-3 flex items-center gap-1.5">
       <Gauge className="w-4.5 h-4.5 text-neutral-500"/>
       Ratio mensuel d'interceptions de chaleur
      </h3>
      
      <div className="h-[180px] w-full">
       {mounted && (
        <ResponsiveContainer width="100%"height="100%">
         <AreaChart data={falseAlarmsRatio}>
          <CartesianGrid strokeDasharray="3 3"stroke="#f1f5f9"vertical={false} />
          <XAxis dataKey="name"stroke="#64748b"fontSize={9} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b"fontSize={9} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '11px' }} />
          <defs>
           <linearGradient id="colorFeux"x1="0"y1="0"x2="0"y2="1">
            <stop offset="5%"stopColor="#16a34a"stopOpacity={0.25}/>
            <stop offset="95%"stopColor="#16a34a"stopOpacity={0}/>
           </linearGradient>
           <linearGradient id="colorFaus"x1="0"y1="0"x2="0"y2="1">
            <stop offset="5%"stopColor="#2563eb"stopOpacity={0.25}/>
            <stop offset="95%"stopColor="#2563eb"stopOpacity={0}/>
           </linearGradient>
          </defs>
          <Area type="monotone"dataKey="feuxReels"name="Feux Réels"stroke="#16a34a"fillOpacity={1} fill="url(#colorFeux)"strokeWidth={1.5} />
          <Area type="monotone"dataKey="faussesAlertes"name="Fausses Alertes filtrées"stroke="#2563eb"fillOpacity={1} fill="url(#colorFaus)"strokeWidth={1.5} />
         </AreaChart>
        </ResponsiveContainer>
       )}
      </div>
     </div>

    </div>

   </div>

  </div>
 );
}
