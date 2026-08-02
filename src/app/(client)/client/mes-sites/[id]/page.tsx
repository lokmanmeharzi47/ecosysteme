'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  Sliders, 
  FileText, 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  ArrowLeft,
  Sparkles,
  Database
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const hourlyData = [
  { time: "00:00", humidite: 48, temp: 22 },
  { time: "04:00", humidite: 46, temp: 21 },
  { time: "08:00", humidite: 44, temp: 24 },
  { time: "12:00", humidite: 42, temp: 28 },
  { time: "16:00", humidite: 41, temp: 31 },
  { time: "20:00", humidite: 43, temp: 26 },
  { time: "23:59", humidite: 45, temp: 23 },
];

export default function ClientSiteDetails({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15+, dynamic route params are asynchronous
  const resolvedParams = React.use(params);
  const siteId = resolvedParams.id;
  
  const siteDetails = {
    1: {
      title: "Ferme intelligente de Mitidja",
      location: "Blida, Algérie",
      status: "ACTIF",
      statusVariant: "bg-emerald-50 text-emerald-600 border-emerald-250",
      risk: "Risque Faible",
      riskVariant: "bg-emerald-50 text-emerald-600 border-emerald-250",
      sensors: "18",
      humidity: "45%",
      primaryColor: "emerald"
    },
    2: {
      title: "Forêt pilote de Chréa",
      location: "Blida, Algérie",
      status: "ALERTE",
      statusVariant: "bg-red-50 text-red-600 border-red-250 animate-pulse",
      risk: "Risque Moyen",
      riskVariant: "bg-amber-50 text-amber-600 border-amber-250",
      sensors: "24",
      humidity: "18%",
      primaryColor: "amber"
    },
    3: {
      title: "Zone humide de Réghaïa",
      location: "Alger, Algérie",
      status: "ACTIF",
      statusVariant: "bg-emerald-50 text-emerald-600 border-emerald-250",
      risk: "Risque Faible",
      riskVariant: "bg-emerald-50 text-emerald-600 border-emerald-250",
      sensors: "15",
      humidity: "Optimale",
      primaryColor: "blue"
    }
  }[siteId as '1' | '2' | '3'] || {
    title: "Ferme intelligente de Mitidja",
    location: "Blida, Algérie",
    status: "ACTIF",
    statusVariant: "bg-emerald-50 text-emerald-600 border-emerald-250",
    risk: "Risque Faible",
    riskVariant: "bg-emerald-50 text-emerald-600 border-emerald-250",
    sensors: "18",
    humidity: "45%",
    primaryColor: "emerald"
  };

  const kpis = [
    { label: "Capteurs actifs", value: `${siteDetails.sensors}/18`, icon: Database, color: "text-emerald-600 bg-emerald-50" },
    { label: "Température", value: "26,4 °C", icon: Thermometer, color: "text-orange-600 bg-orange-50" },
    { label: "Humidité sol", value: siteDetails.humidity, icon: Droplets, color: "text-blue-600 bg-blue-50" },
    { label: "Alertes ouvertes", value: siteId === "2" ? "2" : "0", icon: AlertTriangle, color: siteId === "2" ? "text-red-600 bg-red-50 animate-pulse" : "text-neutral-400 bg-neutral-50" }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto text-xs">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-neutral-400 font-semibold mb-4">
        <Link href="/client/mes-sites" className="hover:text-neutral-900 transition-colors">
          Mes sites
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-700 font-bold">{siteDetails.title}</span>
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Link 
              href="/client/mes-sites"
              className="mr-1 p-1.5 rounded-xl hover:bg-neutral-100 border border-neutral-200 text-neutral-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-lg font-black text-neutral-900">{siteDetails.title}</h1>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${siteDetails.statusVariant}`}>
              {siteDetails.status}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${siteDetails.riskVariant}`}>
              {siteDetails.risk}
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 font-semibold mt-2 pl-8">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {siteDetails.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              Dernière synchronisation il y a 2 min
            </span>
          </div>
        </div>
        <div className="flex gap-2 self-stretch md:self-auto pl-8 md:pl-0">
          <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-sm">
            <Sliders className="w-3.5 h-3.5" />
            Paramètres
          </button>
          <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-[#047857] text-white font-bold rounded-xl hover:bg-[#035f43] transition-colors shadow-sm">
            <FileText className="w-3.5 h-3.5" />
            Générer un rapport
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xl font-black text-neutral-800">{kpi.value}</span>
            </div>
          );
        })}
      </div>

      {/* Grid Layout Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Simulated Map / GIS */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-neutral-800 text-sm mb-4">Vue GIS des Capteurs</h3>
            <div className="h-64 rounded-xl border border-neutral-200 bg-neutral-50 relative overflow-hidden flex items-center justify-center">
              {/* Decorative topographical layout */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Simulated Map Pins */}
              <div className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center animate-bounce">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              </div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              </div>
              <div className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              </div>
              {siteId === "2" ? (
                <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-red-500/25 border border-red-500 flex items-center justify-center animate-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                </div>
              ) : (
                <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
              )}

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-xl p-3 shadow-sm space-y-1.5 font-bold">
                <div className="text-[9px] text-neutral-400 uppercase tracking-widest mb-1">Légende</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Statut Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Alerte / Anomalie</span>
                </div>
              </div>

              <span className="font-bold text-neutral-400">Fond cartographique GIS</span>
            </div>
          </div>

          {/* Environmental Chart Section */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-neutral-800 text-sm mb-4">Historique des 24 dernières heures</h3>
            <div className="w-full">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '10px', fontWeight: 600 }} />
                  <Bar dataKey="humidite" name="Humidité sol (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="temp" name="Température (°C)" fill="#f97316" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column details */}
        <div className="space-y-6">
          
          {/* AI Advisor Card */}
          <div className="bg-gradient-to-br from-[#047857] to-[#065f46] text-white border-0 rounded-2xl p-5 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-100 font-bold mb-3">
                <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
                <span>ANALYSE IA TERRAENGINE</span>
              </div>
              <h2 className="text-sm font-black mb-1">
                {siteId === "2" ? "Risque élevé de propagation" : "Stabilité hydrique optimale"}
              </h2>
              <div className="my-4">
                <div className="text-3xl font-black">{siteId === "2" ? "82%" : "94%"}</div>
                <div className="text-[10px] text-emerald-200 font-semibold mt-0.5">Indice de confiance environnementale</div>
              </div>
              <p className="text-emerald-100/90 leading-relaxed font-semibold mb-4">
                {siteId === "2" 
                  ? "La baisse d'humidité au sol combinée à un vent de 32km/h crée un foyer à haut risque. Une inspection sur site est conseillée." 
                  : "Le taux d'humidité des parcelles est maintenu stable. Les prévisions météo n'indiquent aucun danger pour les prochaines 48h."
                }
              </p>
            </div>
            <button className="w-full py-2.5 bg-white text-emerald-800 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
              Planifier une action
            </button>
          </div>

          {/* Wind / Compass details */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-800 text-sm border-b border-neutral-100 pb-2">Paramètres Climat</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-neutral-800">Vitesse du vent</div>
                  <div className="text-[10px] text-neutral-400 font-semibold">Moyenne journalière</div>
                </div>
              </div>
              <span className="font-black text-neutral-850 text-sm">{siteId === "2" ? "32 km/h" : "12 km/h"}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-neutral-800">Direction</div>
                  <div className="text-[10px] text-neutral-400 font-semibold">Rose des vents</div>
                </div>
              </div>
              <span className="font-black text-neutral-850 text-sm">Nord-Ouest</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-neutral-800">NPK Sol</div>
                  <div className="text-[10px] text-neutral-400 font-semibold">Azote/Phosphore/Potassium</div>
                </div>
              </div>
              <span className="font-black text-neutral-850 text-sm">72 / 38 / 180</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
