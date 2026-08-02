'use client';

import React, { useState } from 'react';
import { 
 Layers, 
 Filter, 
 MapPin, 
 Wind,
 Info,
 Search,
 Check,
 Compass
} from 'lucide-react';
import { MapContainer } from '@/components/map/MapContainer';

interface CartographieClientProps {
 sensors: any[];
 incidents: any[];
 alerts: any[];
 riskZones: any[];
}

export default function CartographieClient({ sensors, incidents, alerts, riskZones }: CartographieClientProps) {
 const [selectedSensor, setSelectedSensor] = useState<any | null>(null);
 
 // Layers state
 const [showSensors, setShowSensors] = useState(true);
 const [showHotspots, setShowHotspots] = useState(true);
 const [showRisks, setShowRisks] = useState(true);
 
 // Filters state
 const [selectedWilaya, setSelectedWilaya] = useState("all");
 const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
 const [searchQuery, setSearchQuery] = useState("");

 const filteredSensors = sensors.filter(s => {
  const regionName = s.region?.name || '';
  
  const matchWilaya = selectedWilaya ==="all"|| 
   (selectedWilaya ==="Blida"&& regionName.includes("Blida")) ||
   (selectedWilaya ==="Béjaïa"&& regionName.includes("Béjaïa")) ||
   (selectedWilaya ==="Skikda"&& regionName.includes("Skikda")) ||
   (selectedWilaya ==="Tizi Ouzou"&& regionName.includes("Tizi Ouzou")) ||
   (selectedWilaya ==="Alger"&& regionName.includes("Alger"));

  const statusMap: Record<string, string> = {
   'error': 'Critique',
   'maintenance': 'Alerte',
   'offline': 'Alerte',
   'online': 'Normal'
  };
  const sStatus = statusMap[s.status] || 'Normal';

  const matchRisk = selectedRiskLevel ==="all"|| 
   (selectedRiskLevel ==="Critique"&& sStatus ==="Critique") ||
   (selectedRiskLevel ==="Alerte"&& sStatus ==="Alerte") ||
   (selectedRiskLevel ==="Normal"&& sStatus ==="Normal");

  const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.id.toLowerCase().includes(searchQuery.toLowerCase());

  return matchWilaya && matchRisk && matchSearch;
 });

 return (
  <div className="relative h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-slate-100 text-xs">
   
   {/* Real Interactive Map in Background */}
   <div className="absolute inset-0 z-0 [&>div]:h-full [&>div]:w-full [&>div]:rounded-none [&>div]:border-none">
     <MapContainer 
       sensors={showSensors ? filteredSensors : []}
       incidents={showHotspots ? incidents : []}
       riskZones={showRisks ? riskZones : []}
       onSensorClick={(sensor) => setSelectedSensor(sensor)}
       selectedSensorId={selectedSensor?.id}
     />
   </div>

   {/* Floating Left: Filter Panel - Glassmorphism */}
   <div className="md:absolute top-5 left-5 z-20 w-full md:w-80 p-5 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col gap-5 m-4 md:m-0 shrink-0 transition-all duration-300">
    <div className="flex items-center justify-between pb-3 border-b border-white/50">
     <span className="font-black text-sm text-slate-800 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
       <Filter className="w-4 h-4 text-emerald-600"/>
      </div>
      Filtres de Surveillance
     </span>
    </div>

    {/* Global Search */}
    <div className="relative">
     <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-slate-400"/>
     </span>
     <input
      type="text"
      placeholder="Rechercher par nom..."
      className="w-full bg-white/60 border border-white/50 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:bg-white/90 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold shadow-inner"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
     />
    </div>

    {/* Wilaya Filter */}
    <div className="space-y-2">
     <label className="font-bold text-slate-500 uppercase tracking-widest text-[9px] ml-1">Wilaya ciblée</label>
     <select
      value={selectedWilaya}
      onChange={(e) => setSelectedWilaya(e.target.value)}
      className="w-full bg-white/60 border border-white/50 rounded-2xl p-3 font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white/90 transition-all shadow-sm"
     >
      <option value="all">Toutes Wilayas (Nord)</option>
      <option value="Alger">Alger</option>
      <option value="Blida">Blida</option>
      <option value="Béjaïa">Béjaïa</option>
      <option value="Tizi Ouzou">Tizi Ouzou</option>
      <option value="Skikda">Skikda</option>
     </select>
    </div>

    {/* Risk Level Filter */}
    <div className="space-y-2">
     <label className="font-bold text-slate-500 uppercase tracking-widest text-[9px] ml-1">Statut Capteur</label>
     <select
      value={selectedRiskLevel}
      onChange={(e) => setSelectedRiskLevel(e.target.value)}
      className="w-full bg-white/60 border border-white/50 rounded-2xl p-3 font-bold text-slate-700 outline-none focus:border-emerald-500 focus:bg-white/90 transition-all shadow-sm"
     >
      <option value="all">Tous statuts</option>
      <option value="Normal">Normal</option>
      <option value="Alerte">Alerte / Hors Ligne</option>
      <option value="Critique">Critique / Erreur</option>
     </select>
    </div>

    {/* Layer Switcher */}
    <div className="space-y-3 pt-4 border-t border-white/50">
     <label className="font-bold text-slate-500 uppercase tracking-widest text-[9px] flex items-center gap-1.5 ml-1">
      <Layers className="w-3.5 h-3.5"/>
      Couches Cartographiques
     </label>
     
     <div className="space-y-2 font-bold text-slate-700">
      <button 
       onClick={() => setShowSensors(!showSensors)}
       className="flex items-center justify-between w-full p-3 bg-white/40 hover:bg-white/70 border border-white/30 rounded-2xl text-left transition-all shadow-sm group"
      >
       <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        Balises Capteurs IoT
       </span>
       <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${showSensors ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-110' : 'border-slate-300 bg-white/50 text-transparent'}`}>
        <Check className="w-3.5 h-3.5"/>
       </span>
      </button>

      <button 
       onClick={() => setShowHotspots(!showHotspots)}
       className="flex items-center justify-between w-full p-3 bg-white/40 hover:bg-white/70 border border-white/30 rounded-2xl text-left transition-all shadow-sm group"
      >
       <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
        Foyers d'Incendies Actifs
       </span>
       <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${showHotspots ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20 scale-110' : 'border-slate-300 bg-white/50 text-transparent'}`}>
        <Check className="w-3.5 h-3.5"/>
       </span>
      </button>

      <button 
       onClick={() => setShowRisks(!showRisks)}
       className="flex items-center justify-between w-full p-3 bg-white/40 hover:bg-white/70 border border-white/30 rounded-2xl text-left transition-all shadow-sm group"
      >
       <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        Zones Risque Sécheresse
       </span>
       <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${showRisks ? 'bg-red-500 border-red-500 text-white shadow-md shadow-red-500/20 scale-110' : 'border-slate-300 bg-white/50 text-transparent'}`}>
        <Check className="w-3.5 h-3.5"/>
       </span>
      </button>
     </div>
    </div>
   </div>

   {/* Floating Legend - Glassmorphism */}
   <div className="absolute bottom-5 left-5 z-20 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] space-y-3 font-bold text-slate-700 w-full max-w-[280px]">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block border-b border-slate-200/50 pb-2">Légende</span>
    <div className="space-y-2.5 pt-1 text-[11px]">
     <div className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"/>
      <span>Capteur Normal (Stable)</span>
     </div>
     <div className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm"/>
      <span>Alerte (Hors Ligne)</span>
     </div>
     <div className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm animate-pulse"/>
      <span>Critique (Erreur matérielle)</span>
     </div>
     {showRisks && (
      <div className="flex items-center gap-3">
       <span className="w-6 h-3 rounded-md bg-red-500/20 border border-red-500/40"/>
       <span>Zone à Risque (Supabase)</span>
      </div>
     )}
    </div>
   </div>

   {/* Dynamic map title indicator */}
   <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-white/50 px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] font-bold text-slate-800 transition-all hover:bg-white hover:scale-105 cursor-default">
    <Compass className="w-5 h-5 text-emerald-600 animate-[spin_4s_linear_infinite]" />
    <span className="tracking-wide">VUE D'ENSEMBLE GÉO-TOPOGRAPHIQUE</span>
   </div>

   {/* Floating Right: Inspector Panel - Glassmorphism */}
   <div className={`md:absolute top-5 right-5 z-20 w-full md:w-[340px] p-5 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col gap-5 m-4 md:m-0 shrink-0 transition-all duration-500 transform ${selectedSensor ? 'translate-x-0 opacity-100' : 'md:translate-x-10 md:opacity-0 pointer-events-none'}`}>
    
    <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
     <span className="font-black text-sm text-slate-800 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
       <Info className="w-4 h-4 text-indigo-600"/>
      </div>
      Inspecteur Capteur
     </span>
     {selectedSensor && (
       <button onClick={() => setSelectedSensor(null)} className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors pointer-events-auto">
         ×
       </button>
     )}
    </div>

    {selectedSensor ? (
     <div className="space-y-5">
      
      <div className={`p-4 rounded-2xl border-2 flex justify-between items-center transition-colors ${
       selectedSensor.status === 'error' 
        ? 'bg-red-50/80 border-red-200 text-red-700 font-bold' 
        : (selectedSensor.status === 'offline' || selectedSensor.status === 'maintenance')
         ? 'bg-amber-50/80 border-amber-200 text-amber-700 font-bold' 
         : 'bg-emerald-50/80 border-emerald-200 text-emerald-700 font-bold'
      }`}>
       <div className="flex flex-col">
        <span className="text-[13px] font-black">{selectedSensor.id.split('-')[0]}</span>
        <span className="text-[11px] font-semibold mt-0.5 opacity-80">{selectedSensor.name}</span>
       </div>
       <div className={`px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest ${
          selectedSensor.status === 'error' ? 'bg-red-100' : 
          (selectedSensor.status === 'offline' || selectedSensor.status === 'maintenance') ? 'bg-amber-100' : 'bg-emerald-100'
       }`}>
         {selectedSensor.status}
       </div>
      </div>

      <div className="space-y-3">
       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Télémétrie & Capteurs</span>
       
       <div className="grid grid-cols-2 gap-3 font-semibold text-slate-700">
        <div className="bg-white/60 border border-white/50 rounded-2xl p-3 flex items-center gap-3 col-span-2 shadow-sm hover:bg-white transition-colors">
         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <Wind className="w-4 h-4 text-slate-500"/>
         </div>
         <div>
          <span className="text-[10px] text-slate-400 block font-bold">Type de sonde</span>
          <span className="text-sm font-black block mt-0.5 text-slate-800 capitalize">{selectedSensor.type.replace('_', ' ')}</span>
         </div>
        </div>
       </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-4 text-white shadow-inner flex justify-between items-center">
       <span className="text-slate-300 font-bold text-xs">Niveau batterie</span>
       <div className="flex items-center gap-2">
         <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
           <div 
             className={`h-full rounded-full ${selectedSensor.battery_level > 20 ? 'bg-emerald-400' : 'bg-red-400'}`}
             style={{ width: `${selectedSensor.battery_level}%` }}
           />
         </div>
         <span className="font-black text-sm">{selectedSensor.battery_level}%</span>
       </div>
      </div>
      
     </div>
    ) : (
     <div className="text-center p-8 text-slate-400 font-medium flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
       <MapPin className="w-8 h-8 text-slate-300"/>
      </div>
      <p className="text-xs">Sélectionnez un capteur sur la carte de gauche pour inspecter ses mesures climatiques en temps réel.</p>
     </div>
    )}
   </div>

  </div>
 );
}
