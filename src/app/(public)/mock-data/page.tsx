import React from 'react';
import { Database, MapPin, AlertTriangle, Shield, Thermometer } from 'lucide-react';

export default function MockDataPage() {
  // MOCK DATA BASED ON SUPABASE DATABASE SCHEMA

  // Table: public.sensors
  const sensors = [
    { id: 'uuid-1', name: 'Capteur Chréa Nord', type: 'multi', status: 'online', battery_level: 95, signal_quality: 88, region_name: 'Blida' },
    { id: 'uuid-2', name: 'Camera Thermique Akfadou', type: 'camera', status: 'offline', battery_level: 12, signal_quality: 0, region_name: 'Béjaïa' },
    { id: 'uuid-3', name: 'Sonde Fumée Collo', type: 'smoke', status: 'maintenance', battery_level: 45, signal_quality: 65, region_name: 'Skikda' },
  ];

  // Table: public.fire_incidents & alerts
  const incidents = [
    { id: 'inc-1', severity: 'high', status: 'investigating', detection_time: '2026-07-21T10:15:00Z', ai_confidence: 94.2, assigned_team: 'Pompiers - Unité 4' },
    { id: 'inc-2', severity: 'critical', status: 'fighting', detection_time: '2026-07-21T09:30:00Z', ai_confidence: 99.9, assigned_team: 'Protection Civile - Alpha' },
  ];

  // Table: public.risk_zones
  const riskZones = [
    { id: 'rz-1', name: 'Forêt de Baïnem', risk_level: 'medium', vegetation_type: 'Pins d\'Alep', population_density: 4500 },
    { id: 'rz-2', name: 'Parc National de Chréa', risk_level: 'high', vegetation_type: 'Cèdres', population_density: 1200 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Database className="w-8 h-8 text-emerald-600" />
            Static Database Mock Data Overview
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Aperçu des données statiques représentant le schéma relationnel de la base de données Supabase.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Sensors Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Thermometer className="w-5 h-5 text-blue-500" />
              Capteurs & Télémétrie
            </h2>
            <div className="space-y-4">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-slate-700">{sensor.name}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      sensor.status === 'online' ? 'bg-emerald-100 text-emerald-700' :
                      sensor.status === 'offline' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {sensor.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Type: {sensor.type} | Batterie: {sensor.battery_level}% | Signal: {sensor.signal_quality}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incidents Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Incidents & Alertes
            </h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-slate-700">Incident {incident.id}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      incident.severity === 'critical' ? 'bg-red-100 text-red-700 border-red-200 border' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium space-y-1 mt-2">
                    <p>Statut: <span className="text-slate-700">{incident.status}</span></p>
                    <p>IA Confiance: <span className="font-bold">{incident.ai_confidence}%</span></p>
                    <p>Équipe assignée: {incident.assigned_team}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Zones Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber-500" />
              Zones de Risque
            </h2>
            <div className="space-y-4">
              {riskZones.map((zone) => (
                <div key={zone.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-slate-700">{zone.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium space-y-1 mt-2">
                    <p>Niveau de risque: <span className="font-bold uppercase text-slate-700">{zone.risk_level}</span></p>
                    <p>Végétation: {zone.vegetation_type}</p>
                    <p>Densité population: {zone.population_density} hab/km²</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-blue-800">
          <Shield className="w-5 h-5 shrink-0" />
          <p className="text-xs font-medium">
            Note de sécurité (MCP Report): La table `spatial_ref_sys` a actuellement le RLS désactivé, ce qui permet des accès de lecture/écriture publics via Supabase. Il est conseillé de configurer des policies strictes pour cette table géographique.
          </p>
        </div>
      </div>
    </div>
  );
}
