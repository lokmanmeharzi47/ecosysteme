'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowLeft, Thermometer, Droplets, FlaskConical, Zap, Leaf, Battery,
  Pencil, X, Plus, Settings2,
} from 'lucide-react';
import type { LiveCapteurReading, LiveCapteurHistoryPoint } from '@/lib/services/live-capteur';

const READING_REFRESH_MS = 10_000;
const CHART_REFRESH_MS = 20_000; // un peu plus espacé : chaque graphique fait sa propre requête
const STORAGE_KEY = 'capteur-parcelle-nord-config-v3';

type MetricKey = keyof Omit<LiveCapteurHistoryPoint, 'time'>;
type WidgetType = 'line' | 'gauge' | 'number';
type AggMethod = 'none' | 'average' | 'median' | 'sum';

interface MetricDef {
  key: MetricKey;
  label: string;
  unit: string;
  color: string;
  icon: React.ElementType;
  defaultMin: number;
  defaultMax: number;
}

interface MetricConfig {
  label: string;
  visible: boolean;
  type: WidgetType;
  color: string;
  background: string;
  xAxisLabel: string;
  yAxisLabel: string;
  yMin: number;
  yMax: number;
  dataMin: string;
  dataMax: string;
  round: string;
  results: number;
  aggMethod: AggMethod;
  aggMinutes: number;
}

const METRICS: MetricDef[] = [
  { key: 'temperature', label: 'Température', unit: '°C', color: '#f97316', icon: Thermometer, defaultMin: 0, defaultMax: 50 },
  { key: 'humidity', label: 'Humidité', unit: '%', color: '#3b82f6', icon: Droplets, defaultMin: 0, defaultMax: 100 },
  { key: 'ph', label: 'pH', unit: '', color: '#a855f7', icon: FlaskConical, defaultMin: 0, defaultMax: 14 },
  { key: 'ec', label: 'Conductivité (EC)', unit: 'µS/cm', color: '#eab308', icon: Zap, defaultMin: 0, defaultMax: 2000 },
  { key: 'azote', label: 'Azote (N)', unit: 'mg/kg', color: '#16a34a', icon: Leaf, defaultMin: 0, defaultMax: 100 },
  { key: 'phosphore', label: 'Phosphore (P)', unit: 'mg/kg', color: '#059669', icon: Leaf, defaultMin: 0, defaultMax: 100 },
  { key: 'potassium', label: 'Potassium (K)', unit: 'mg/kg', color: '#0d9488', icon: Leaf, defaultMin: 0, defaultMax: 100 },
  { key: 'batterie', label: 'Batterie', unit: '%', color: '#10b981', icon: Battery, defaultMin: 0, defaultMax: 100 },
];

function defaultMetricConfig(m: MetricDef): MetricConfig {
  return {
    label: m.label,
    visible: true,
    type: 'line',
    color: m.color,
    background: '#ffffff',
    xAxisLabel: 'Date',
    yAxisLabel: m.label,
    yMin: m.defaultMin,
    yMax: m.defaultMax,
    dataMin: '',
    dataMax: '',
    round: '',
    results: 100,
    aggMethod: 'none',
    aggMinutes: 60,
  };
}

function defaultConfig(): Record<MetricKey, MetricConfig> {
  const cfg = {} as Record<MetricKey, MetricConfig>;
  METRICS.forEach((m) => { cfg[m.key] = defaultMetricConfig(m); });
  return cfg;
}

function loadConfig(): Record<MetricKey, MetricConfig> {
  if (typeof window === 'undefined') return defaultConfig();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConfig();
    const parsed = JSON.parse(raw);
    const merged = defaultConfig();
    for (const key in merged) {
      if (parsed[key]) merged[key as MetricKey] = { ...merged[key as MetricKey], ...parsed[key] };
    }
    return merged;
  } catch {
    return defaultConfig();
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function GaugeWidget({ value, min, max, color, unit }: { value: number | null; min: number; max: number; color: string; unit: string }) {
  const v = value ?? min;
  const pct = Math.max(0, Math.min(100, ((v - min) / (max - min || 1)) * 100));
  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <ResponsiveContainer width="100%" height={160}>
        <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: pct, fill: color }]} startAngle={180} endAngle={0}>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#e2e8f0' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="-mt-10 text-center">
        <span className="text-2xl font-bold" style={{ color }}>{value ?? '—'}</span>
        <span className="text-xs text-slate-400 ml-1">{unit}</span>
      </div>
    </div>
  );
}

function NumberWidget({ value, color, unit }: { value: number | null; color: string; unit: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <span className="text-5xl font-black" style={{ color }}>{value ?? '—'}</span>
      <span className="text-sm text-slate-400 mt-2">{unit}</span>
    </div>
  );
}

function applyRound(value: number | null, round: string): number | null {
  if (value === null) return null;
  const n = Number(round);
  if (!round || Number.isNaN(n)) return value;
  const factor = Math.pow(10, n);
  return Math.round(value * factor) / factor;
}

function applyClip(value: number | null, min: string, max: string): number | null {
  if (value === null) return null;
  let v = value;
  if (min !== '' && !Number.isNaN(Number(min))) v = Math.max(v, Number(min));
  if (max !== '' && !Number.isNaN(Number(max))) v = Math.min(v, Number(max));
  return v;
}

// Un graphique = ses propres données, avec ses propres réglages d'agrégation.
// Chaque widget gère sa requête indépendamment, avec ses propres réglages (comme si chaque
// "Field Chart" a ses propres Results/Timescale/Average).
function MetricChart({
  metricKey, unit, config, reading,
}: {
  metricKey: MetricKey;
  unit: string;
  config: MetricConfig;
  reading: LiveCapteurReading | null;
}) {
  const [history, setHistory] = useState<LiveCapteurHistoryPoint[]>([]);

  useEffect(() => {
    let cancelled = false;
    const fetchHistory = async () => {
      const params = new URLSearchParams({
        results: String(config.results),
        method: config.aggMethod,
        minutes: String(config.aggMinutes),
      });
      if (config.round !== '') params.set('round', config.round);
      try {
        const res = await fetch(`/api/live-capteur/history?${params.toString()}`, { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled && data.history) setHistory(data.history);
      } catch {
        // silencieux : on garde la dernière série valide
      }
    };
    fetchHistory();
    const timer = setInterval(fetchHistory, CHART_REFRESH_MS);
    return () => { cancelled = true; clearInterval(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.results, config.aggMethod, config.aggMinutes, config.round]);

  const chartData = history.map((h) => ({
    timeLabel: formatTime(h.time),
    [metricKey]: applyClip(applyRound(h[metricKey], config.round), config.dataMin, config.dataMax),
  }));

  const liveValue = reading ? applyClip(applyRound(reading[metricKey], config.round), config.dataMin, config.dataMax) : null;

  if (config.type === 'gauge') {
    return <GaugeWidget value={liveValue} min={config.yMin} max={config.yMax} color={config.color} unit={unit} />;
  }
  if (config.type === 'number') {
    return <NumberWidget value={liveValue} color={config.color} unit={unit} />;
  }
  return (
    <div style={{ width: '100%', height: 220, background: config.background }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="timeLabel" tick={{ fontSize: 10 }} minTickGap={30}>
            <Label value={config.xAxisLabel} offset={-10} position="insideBottom" style={{ fontSize: 10, fill: '#94a3b8' }} />
          </XAxis>
          <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']}>
            <Label value={config.yAxisLabel} angle={-90} position="insideLeft" style={{ fontSize: 10, fill: '#94a3b8', textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey={metricKey} stroke={config.color} strokeWidth={2} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Fenêtre d'options d'un graphique (titre, couleur, agrégation, échelle...)
function ChartOptionsModal({
  metricKey, current, onSave, onClose,
}: {
  metricKey: MetricKey;
  current: MetricConfig;
  onSave: (key: MetricKey, next: MetricConfig) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<MetricConfig>({ ...current });
  const set = <K extends keyof MetricConfig>(field: K, value: MetricConfig[K]) => setDraft((d) => ({ ...d, [field]: value }));

  const handleSave = () => {
    onSave(metricKey, draft);
    onClose();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const modal = (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 my-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-bold text-slate-800">Options du graphique</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-500">
            Titre
            <input value={draft.label} onChange={(e) => set('label', e.target.value)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-500">
              Titre axe X
              <input value={draft.xAxisLabel} onChange={(e) => set('xAxisLabel', e.target.value)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              Titre axe Y
              <input value={draft.yAxisLabel} onChange={(e) => set('yAxisLabel', e.target.value)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="block text-xs font-bold text-slate-500">
              Couleur
              <input type="color" value={draft.color} onChange={(e) => set('color', e.target.value)} className="mt-1 w-full h-9 border-2 border-slate-300 rounded-lg" />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              Fond
              <input type="color" value={draft.background} onChange={(e) => set('background', e.target.value)} className="mt-1 w-full h-9 border-2 border-slate-300 rounded-lg" />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              Type
              <select value={draft.type} onChange={(e) => set('type', e.target.value as WidgetType)} className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-900">
                <option value="line">Courbe</option>
                <option value="gauge">Jauge</option>
                <option value="number">Valeur</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="block text-xs font-bold text-slate-500">
              Nb de points (Results)
              <input type="number" value={draft.results} onChange={(e) => set('results', Number(e.target.value) || 100)} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              Arrondi (décimales)
              <input type="number" value={draft.round} onChange={(e) => set('round', e.target.value)} placeholder="aucun" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
            </label>
            {draft.type !== 'line' && (<div />)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-500">
              Data Min
              <input value={draft.dataMin} onChange={(e) => set('dataMin', e.target.value)} placeholder="aucun" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              Data Max
              <input value={draft.dataMax} onChange={(e) => set('dataMax', e.target.value)} placeholder="aucun" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
            </label>
          </div>

          {draft.type !== 'line' && (
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-500">
                Échelle min (jauge)
                <input type="number" value={draft.yMin} onChange={(e) => set('yMin', Number(e.target.value))} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
              </label>
              <label className="block text-xs font-bold text-slate-500">
                Échelle max (jauge)
                <input type="number" value={draft.yMax} onChange={(e) => set('yMax', Number(e.target.value))} className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900" />
              </label>
            </div>
          )}

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 mb-2">Agrégation des données (moyenne, médiane ou somme par période)</p>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-xs font-bold text-slate-500">
                Méthode
                <select value={draft.aggMethod} onChange={(e) => set('aggMethod', e.target.value as AggMethod)} className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-900">
                  <option value="none">Aucune (données brutes)</option>
                  <option value="average">Moyenne</option>
                  <option value="median">Médiane</option>
                  <option value="sum">Somme</option>
                </select>
              </label>
              <label className="block text-xs font-bold text-slate-500">
                Par tranche de (minutes)
                <input
                  type="number"
                  disabled={draft.aggMethod === 'none'}
                  value={draft.aggMinutes}
                  onChange={(e) => set('aggMinutes', Number(e.target.value) || 60)}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 disabled:bg-slate-50 disabled:text-slate-400"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-xs font-bold text-slate-500 px-4 py-2.5 rounded-lg hover:bg-slate-100">Annuler</button>
          <button onClick={handleSave} className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-lg">Enregistrer</button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}

export default function CapteurDetailClient({
  initialReading,
}: {
  initialReading: LiveCapteurReading | null;
  initialHistory: LiveCapteurHistoryPoint[];
}) {
  const [reading, setReading] = useState(initialReading);
  const [config, setConfig] = useState<Record<MetricKey, MetricConfig>>(defaultConfig());
  const [editMode, setEditMode] = useState(false);
  const [optionsFor, setOptionsFor] = useState<MetricKey | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const saveConfig = (next: Record<MetricKey, MetricConfig>) => {
    setConfig(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible (navigation privée, etc.) : on continue sans persister
    }
  };

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch('/api/live-capteur', { cache: 'no-store' });
        const data = await res.json();
        if (data.reading) setReading(data.reading);
      } catch {
        // silencieux
      }
    }, READING_REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  const hideMetric = (key: MetricKey) => saveConfig({ ...config, [key]: { ...config[key], visible: false } });
  const showMetric = (key: MetricKey) => {
    saveConfig({ ...config, [key]: { ...config[key], visible: true } });
    setShowAddPanel(false);
  };
  const updateMetric = (key: MetricKey, next: MetricConfig) => saveConfig({ ...config, [key]: next });

  const visibleMetrics = METRICS.filter((m) => config[m.key]?.visible !== false);
  const hiddenMetrics = METRICS.filter((m) => config[m.key]?.visible === false);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/capteurs" className="text-xs text-slate-400 hover:text-emerald-600 flex items-center gap-1 mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Retour aux capteurs
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-500">Capteur Sol — Parcelle Nord</h1>
          <p className="text-sm text-slate-400 mt-1">
            Sonde NPK · historique et mesures en direct
            {reading?.measuredAt && ` · dernière mesure : ${formatTime(reading.measuredAt)}`}
          </p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg border transition-colors ${
            editMode ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" /> {editMode ? 'Terminer' : 'Modifier'}
        </button>
      </div>

      {/* Valeurs actuelles */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-8">
        {reading && visibleMetrics.map(({ key, unit, icon: Icon }) => (
          <Card key={key} className="bg-white border-slate-200 shadow-sm text-slate-900">
            <CardContent className="p-4">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mb-1">
                <Icon className="w-3 h-3" style={{ color: config[key].color }} /> {config[key].label}
              </span>
              <span className="text-lg font-bold">
                {applyRound(applyClip(reading[key], config[key].dataMin, config[key].dataMax), config[key].round) ?? '—'}
                <span className="text-[10px] text-slate-400 ml-0.5">{unit}</span>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Un widget par mesure, chacun avec ses propres réglages */}
      <div className="grid gap-4 md:grid-cols-2">
        {visibleMetrics.map(({ key, unit }) => {
          const c = config[key];
          return (
            <Card key={key} className="bg-white border-slate-200 shadow-sm text-slate-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{c.label} {unit && <span className="text-slate-400 font-normal">({unit})</span>}</span>
                  {editMode && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => setOptionsFor(key)} className="text-slate-400 hover:text-emerald-600">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => hideMetric(key)} className="text-slate-400 hover:text-red-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MetricChart metricKey={key} unit={unit} config={c} reading={reading} />
              </CardContent>
            </Card>
          );
        })}

        {editMode && (
          <Card className="border-2 border-dashed border-slate-300 bg-transparent shadow-none">
            <CardContent className="h-full flex items-center justify-center p-6 min-h-[240px]">
              {!showAddPanel ? (
                <button onClick={() => setShowAddPanel(true)} className="flex items-center gap-2 text-emerald-600 font-bold text-sm hover:text-emerald-700">
                  <Plus className="w-4 h-4" /> Ajouter une visualisation
                </button>
              ) : hiddenMetrics.length === 0 ? (
                <p className="text-xs text-slate-400 text-center">Toutes les mesures disponibles sont déjà affichées.</p>
              ) : (
                <div className="w-full space-y-2">
                  <p className="text-xs font-bold text-slate-500 mb-3">Choisis une mesure à réafficher :</p>
                  {hiddenMetrics.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => showMetric(m.key)}
                      className="w-full flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 hover:border-emerald-400 hover:bg-emerald-50"
                    >
                      <span className="text-xs font-medium">{config[m.key].label}</span>
                      <Plus className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {optionsFor && (
        <ChartOptionsModal
          metricKey={optionsFor}
          current={config[optionsFor]}
          onSave={updateMetric}
          onClose={() => setOptionsFor(null)}
        />
      )}
    </div>
  );
}
