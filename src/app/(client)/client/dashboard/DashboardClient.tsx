'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  AlertTriangle,
  Radio,
  FileText,
  TrendingUp,
  MapPin,
  Bell,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Thermometer,
  Droplets,
  Wind,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function ClientDashboard({
  statsClient,
  activityData,
  myAlerts,
  mySites
}: {
  statsClient: any[];
  activityData: any[];
  myAlerts: any[];
  mySites: any[];
}) {
  const severityConfig: Record<string, any> = {
    critique: { label: 'Critique', cls: 'bg-red-50 text-red-600 border-red-200' },
    attention: { label: 'Attention', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
    info: { label: 'Info', cls: 'bg-blue-50 text-blue-600 border-blue-200' },
  };

  const statusConfig: Record<string, any> = {
    alerte: { label: 'Alerte', bg: 'bg-red-50 border-red-100', dot: 'bg-red-500' },
    attention: { label: 'Attention', bg: 'bg-amber-50 border-amber-100', dot: 'bg-amber-500' },
    normal: { label: 'Normal', bg: 'bg-emerald-50 border-emerald-100', dot: 'bg-emerald-500' },
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900">Tableau de bord</h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Vue d&apos;ensemble de vos sites forestiers en temps réel — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link
          href="/client/rapports"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
        >
          <FileText className="w-3.5 h-3.5" />
          Générer un rapport
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsClient.map((stat) => {
          const ICONS: Record<string, React.ElementType> = {
            MapPin, Radio, AlertTriangle, FileText
          };
          const Icon = typeof stat.icon === 'string' ? (ICONS[stat.icon] || Radio) : (stat.icon || Radio);
          return (
            <div key={stat.label} className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-neutral-900">{stat.value}</p>
              <p className="text-[11px] text-neutral-400 font-semibold mt-1">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area chart */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-black text-neutral-900">Évolution hebdomadaire — Béjaïa</h2>
              <p className="text-[11px] text-neutral-400 font-semibold mt-0.5">Température · Humidité · Indice de risque</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="risqueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#f97316" strokeWidth={2} fill="url(#tempGrad)" />
              <Area type="monotone" dataKey="humidite" name="Humidité (%)" stroke="#3b82f6" strokeWidth={2} fill="url(#humGrad)" />
              <Area type="monotone" dataKey="risque" name="Risque (%)" stroke="#ef4444" strokeWidth={2} fill="url(#risqueGrad)" />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alert summary */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-neutral-900">Mes alertes récentes</h2>
            <Link href="/client/alertes" className="text-[10px] text-emerald-600 font-bold hover:underline flex items-center gap-0.5">
              Tout voir <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 flex-1">
            {myAlerts.map((alert) => {
              const sev = severityConfig[alert.severity] || severityConfig.info;
              return (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="mt-0.5">
                    {alert.resolved
                      ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                      : <Bell className="w-4 h-4 text-red-500 animate-pulse" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-neutral-800 truncate">{alert.type}</p>
                    <p className="text-[10px] text-neutral-400 font-semibold truncate">{alert.site}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${sev.cls}`}>{sev.label}</span>
                    <span className="text-[9px] text-neutral-400 font-semibold flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />{alert.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* My sites */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-black text-neutral-900">Mes sites forestiers</h2>
          <Link href="/client/mes-sites" className="text-[10px] text-emerald-600 font-bold hover:underline flex items-center gap-0.5">
            Gérer <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mySites.map((site) => {
            const st = statusConfig[site.status] || statusConfig.normal;
            return (
              <div key={site.name} className={`rounded-xl border p-4 ${st.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black text-neutral-900">{site.name}</p>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${st.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {st.label}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 font-semibold mb-3">{site.sensors} capteurs actifs</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center bg-white/60 rounded-lg p-2">
                    <Thermometer className="w-3.5 h-3.5 text-orange-500 mb-1" />
                    <span className="text-[11px] font-black text-neutral-800">{site.temp}°C</span>
                    <span className="text-[9px] text-neutral-400 font-semibold">Temp.</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/60 rounded-lg p-2">
                    <Droplets className="w-3.5 h-3.5 text-blue-500 mb-1" />
                    <span className="text-[11px] font-black text-neutral-800">{site.hum}%</span>
                    <span className="text-[9px] text-neutral-400 font-semibold">Hum.</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/60 rounded-lg p-2">
                    <Wind className="w-3.5 h-3.5 text-slate-500 mb-1" />
                    <span className="text-[11px] font-black text-neutral-800">{site.wind}km/h</span>
                    <span className="text-[9px] text-neutral-400 font-semibold">Vent</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
