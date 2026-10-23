'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio, Battery, Thermometer, Droplets, Leaf, FlaskConical, Zap } from 'lucide-react';
import type { LiveCapteurReading } from '@/lib/services/live-capteur';

const REFRESH_INTERVAL_MS = 10_000;

export default function LiveCapteurCard({ initialReading }: { initialReading: LiveCapteurReading | null }) {
  const [live, setLive] = useState<LiveCapteurReading | null>(initialReading);
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const res = await fetch('/api/live-capteur', { cache: 'no-store' });
        const data = await res.json();
        if (data.reading) {
          setLive(data.reading);
          setPulsing(true);
          setTimeout(() => setPulsing(false), 600);
        }
      } catch {
        // Silencieux : on garde simplement le dernier affichage valide
      }
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  if (!live) return null;

  return (
    <Link href="/capteurs/parcelle-nord" className="block h-full">
    <Card className={`h-full bg-white border-slate-200 shadow-sm hover:border-emerald-500/50 transition-colors cursor-pointer text-slate-900 ${pulsing ? 'ring-2 ring-emerald-400' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm font-medium text-slate-700">
          Capteur Sol — Parcelle Nord
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="flex items-center gap-1"><Radio className="w-3 h-3" /> Sonde NPK</span>
          {live.measuredAt && (
            <span className="text-[10px]">{new Date(live.measuredAt).toLocaleString('fr-FR')}</span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Thermometer className="w-3 h-3 text-orange-500" /> Temp.</span>
            <span className="text-sm font-bold">{live.temperature ?? '—'}°C</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-500" /> Hum.</span>
            <span className="text-sm font-bold">{live.humidity ?? '—'}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><FlaskConical className="w-3 h-3 text-purple-500" /> pH</span>
            <span className="text-sm font-bold">{live.ph ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> EC</span>
            <span className="text-sm font-bold">{live.ec ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Leaf className="w-3 h-3 text-emerald-600" /> Azote</span>
            <span className="text-sm font-bold">{live.azote ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Leaf className="w-3 h-3 text-emerald-600" /> Phosph.</span>
            <span className="text-sm font-bold">{live.phosphore ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Leaf className="w-3 h-3 text-emerald-600" /> Potass.</span>
            <span className="text-sm font-bold">{live.potassium ?? '—'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1"><Battery className="w-3 h-3 text-emerald-600" /> Batterie</span>
            <span className="text-sm font-bold">{live.batterie ?? '—'}%</span>
          </div>
        </div>
        <p className="text-[10px] text-emerald-600 pt-1">Cliquer pour voir l'historique et les graphiques →</p>
      </CardContent>
    </Card>
    </Link>
  );
}