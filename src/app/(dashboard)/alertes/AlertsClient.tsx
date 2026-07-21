'use client';

import React, { useState } from 'react';
import { 
 AlertTriangle, 
 Shield, 
 Clock, 
 Layers, 
 Flame, 
 Droplet, 
 Leaf, 
 Cloud,
 CheckCircle,
 MessageSquare,
 Mail,
 Network,
 Send,
 RefreshCw,
 Search,
 ExternalLink,
 ChevronRight,
 MapPin
} from 'lucide-react';

export interface Incident {
 id: string;
 level: 'CRITIQUE' | 'ÉLEVÉ' | 'MODÉRÉ' | 'FAIBLE';
 title: string;
 description: string;
 confidence: string;
 time: string;
 icon: string;
 colorClass: string;
 iconColorClass: string;
 btnLabel: string;
 btnVariant: 'red' | 'gray';
}

export default function AlertsClient({ initialIncidents, totalActiveCount }: { initialIncidents: Incident[], totalActiveCount: number }) {
 const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
 const [search, setSearch] = useState('');
 const [isRefreshing, setIsRefreshing] = useState(false);

 const handleRefresh = () => {
  setIsRefreshing(true);
  setTimeout(() => {
   setIsRefreshing(false);
  }, 1000);
 };

 return (
  <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto text-xs">
   
   {/* Top Header */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-xl font-black text-neutral-900 font-sans">Centre d&apos;Alertes Intelligent</h1>
     <p className="text-xs text-neutral-500 font-semibold mt-0.5">
      Surveillance en temps réel des menaces environnementales critiques.
     </p>
    </div>
    <button 
     onClick={handleRefresh}
     className="flex items-center gap-1.5 px-4 py-2.5 bg-[#047857] text-white font-bold rounded-xl hover:bg-[#035f43] transition-colors shadow-sm"
    >
     <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
     Actualiser le Flux
    </button>
   </div>

   {/* KPI Cards Grid */}
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    
    {/* Card 1: Alertes Actives */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
     <div className="space-y-1">
      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Alertes Actives</span>
      <div className="text-2xl font-black text-neutral-800">{totalActiveCount}</div>
      <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">📈 +3 depuis 1h</span>
     </div>
     <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
      <AlertTriangle className="w-4.5 h-4.5"/>
     </div>
    </div>

    {/* Card 2: Niveau de Risque Global */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
     <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Niveau de Risque Global</span>
      <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
       <Shield className="w-4.5 h-4.5"/>
      </div>
     </div>
     <div className="text-2xl font-black text-neutral-850">Élevé</div>
     <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-2">
      <div className="bg-[#047857] h-1.5 rounded-full"style={{ width: '70%' }} />
     </div>
    </div>

    {/* Card 3: Temps de Réponse Moyen */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
     <div className="space-y-1">
      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Temps de Réponse Moyen</span>
      <div className="text-2xl font-black text-neutral-850">4m 12s</div>
      <span className="text-[10px] text-emerald-600 font-bold">📉 -15% vs hier</span>
     </div>
     <div className="w-8 h-8 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-600">
      <Clock className="w-4.5 h-4.5"/>
     </div>
    </div>

    {/* Card 4: Sites Impactés */}
    <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
     <div className="space-y-1">
      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Sites Impactés</span>
      <div className="text-2xl font-black text-neutral-850">07</div>
      <span className="text-[10px] text-neutral-400 font-bold">Sur 24 sites actifs</span>
     </div>
     <div className="w-8 h-8 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-600">
      <Layers className="w-4.5 h-4.5"/>
     </div>
    </div>

   </div>

   {/* Main Content Layout */}
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    
    {/* Left Column - Active Alerts Feed (2/3 width) */}
    <div className="lg:col-span-2 space-y-4">
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
       <h2 className="text-sm font-black text-neutral-800">Flux des Alertes Actives</h2>
       <div className="flex gap-2">
        <button className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 font-bold text-neutral-600 rounded-lg">Filtres</button>
        <button className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 font-bold text-neutral-600 rounded-lg">Exporter</button>
       </div>
      </div>

      {/* List of active alerts */}
      <div className="space-y-3.5">
       {incidents.map((incident) => {
        const IconMap: Record<string, any> = { AlertTriangle, Shield, Clock, Layers, Flame, Droplet, Leaf, Cloud };
        const Icon = IconMap[incident.icon] || AlertTriangle;
        return (
         <div 
          key={incident.id} 
          className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-sm ${incident.colorClass}`}
         >
          <div className="flex items-start gap-4">
           {/* Round colored icon container */}
           <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${incident.iconColorClass}`}>
            <Icon className="w-5 h-5"/>
           </div>
           
           <div>
            <div className="flex items-center gap-2">
             <span className="font-bold text-[10px] tracking-wider uppercase">{incident.level}</span>
             <span className="text-[10px] text-neutral-400 font-semibold">• ID: {incident.id}</span>
            </div>
            <h3 className="text-sm font-bold text-neutral-900 mt-1">{incident.title}</h3>
            <p className="text-[11px] text-neutral-500 font-semibold mt-0.5">{incident.description}</p>
           </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-0 border-neutral-100/50">
           <div className="flex flex-col md:items-end gap-0.5">
            <span className="text-[10px] font-bold text-[#047857]">{incident.confidence}</span>
            <span className="text-[10px] text-neutral-400 font-semibold">{incident.time}</span>
           </div>

           <div className="flex gap-2">
            {incident.btnVariant === 'red' ? (
             <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-sm">
              {incident.btnLabel}
             </button>
            ) : (
             <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold rounded-xl transition-all">
              {incident.btnLabel}
             </button>
            )}
            <button className="px-3.5 py-2 bg-white/70 hover:bg-white border border-neutral-250 text-neutral-700 font-bold rounded-xl transition-all">
             Détails
            </button>
           </div>
          </div>
         </div>
        );
       })}
      </div>
     </div>
    </div>

    {/* Right Column - Status Maps & Feeds (1/3 width) */}
    <div className="space-y-6">
     
     {/* Card 1: Critical Impact Map */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
       <h3 className="font-bold text-neutral-800 text-sm flex items-center gap-1.5">
        <Layers className="w-4 h-4 text-emerald-600"/>
        Carte d&apos;Impact Critique
       </h3>
       <span className="text-[9px] font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full animate-pulse">
        EN DIRECT
       </span>
      </div>

      {/* Simulated Satellite Map with Circles */}
      <div 
       className="h-44 rounded-xl border border-neutral-200 bg-neutral-150 relative overflow-hidden bg-cover bg-center flex items-center justify-center"
       style={{ backgroundImage:"url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')"}}
      >
       {/* Overlay shadow */}
       <div className="absolute inset-0 bg-black/10"/>

       {/* Ripple Circles */}
       <div className="absolute w-24 h-24 rounded-full border border-red-500 bg-red-500/10 animate-ping opacity-75"/>
       <div className="absolute w-16 h-16 rounded-full border-2 border-red-500/60 bg-red-500/15 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-red-600 shadow-md ring-4 ring-white"/>
       </div>
      </div>

      <div className="space-y-1 pl-1">
       <h4 className="font-black text-neutral-850">Camargue : Zone Sud-Est</h4>
       <p className="text-[10px] text-neutral-400 font-semibold">Rayon d&apos;impact estimé : 2.5 km</p>
      </div>

      <button className="w-full py-2.5 bg-white border border-[#047857] hover:bg-emerald-50 text-[#047857] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
       Ouvrir la carte interactive
       <ExternalLink className="w-3.5 h-3.5"/>
      </button>
     </div>

     {/* Card 2: Journal des Événements */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2.5">
       Journal des Événements
      </h3>
      
      <div className="space-y-4 relative pl-3 border-l-2 border-neutral-100">
       
       {/* Event 1 */}
       <div className="relative space-y-0.5">
        <div className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm"/>
        <div className="flex items-center gap-1 font-bold text-neutral-800">
         <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0"/>
         <span>Autorités Notifiées</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-semibold">SDIS 13 a reçu le rapport critique.</p>
        <span className="text-[9px] text-neutral-400 font-semibold block pt-0.5">il y a 4 min</span>
       </div>

       {/* Event 2 */}
       <div className="relative space-y-0.5">
        <div className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center shadow-sm"/>
        <div className="flex items-center gap-1 font-bold text-neutral-800">
         <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0"/>
         <span>SMS d&apos;Alerte Envoyés</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-semibold">14 techniciens de terrain notifiés.</p>
        <span className="text-[9px] text-neutral-400 font-semibold block pt-0.5">il y a 8 min</span>
       </div>

       {/* Event 3 */}
       <div className="relative space-y-0.5">
        <div className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white flex items-center justify-center shadow-sm"/>
        <div className="flex items-center gap-1 font-bold text-neutral-800">
         <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0"/>
         <span>Alerte Critique Générée</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-semibold">Incident #4892-A créé par le noyau AI.</p>
        <span className="text-[9px] text-neutral-400 font-semibold block pt-0.5">il y a 9 min</span>
       </div>

       {/* Event 4 */}
       <div className="relative space-y-0.5">
        <div className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-neutral-400 border-2 border-white flex items-center justify-center shadow-sm"/>
        <div className="flex items-center gap-1 font-bold text-neutral-800">
         <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0"/>
         <span>Rapport de Synthèse Email</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-semibold">Envoyé à la direction régionale.</p>
        <span className="text-[9px] text-neutral-400 font-semibold block pt-0.5">il y a 15 min</span>
       </div>

      </div>

      <div className="border-t border-neutral-100 pt-3 text-center">
       <button className="text-[10px] text-[#047857] hover:underline font-bold">
        Voir tout l&apos;historique
       </button>
      </div>
     </div>

     {/* Card 3: État des Canaux */}
     <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2.5">
       État des Canaux
      </h3>

      <div className="space-y-3 font-semibold text-neutral-700">
       
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
         <Network className="w-4 h-4 text-neutral-400"/>
         <span>Réseau IoT LoRaWAN</span>
        </div>
        <span className="text-[#047857] font-bold flex items-center gap-1.5">
         <span className="w-2 h-2 rounded-full bg-emerald-500"/>
         100%
        </span>
       </div>

       <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
         <Mail className="w-4 h-4 text-neutral-400"/>
         <span>Passerelle SMTP</span>
        </div>
        <span className="text-[#047857] font-bold flex items-center gap-1.5">
         <span className="w-2 h-2 rounded-full bg-emerald-500"/>
         OK
        </span>
       </div>

       <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
         <Send className="w-4 h-4 text-neutral-400"/>
         <span>Service SMS API</span>
        </div>
        <span className="text-[#047857] font-bold flex items-center gap-1.5">
         <span className="w-2 h-2 rounded-full bg-emerald-500"/>
         OK
        </span>
       </div>

      </div>
     </div>

    </div>

   </div>

  </div>
 );
}
