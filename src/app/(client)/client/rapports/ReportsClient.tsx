'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Send,
  Plus, 
  Download,
  Leaf,
  Wifi,
  AlertTriangle,
  Droplet,
  Wrench,
  Brain,
  CheckCircle,
  Clock3,
  ExternalLink,
  Sliders,
  Sparkles
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  title: string;
  desc: string;
  icon: any;
  iconBg: string;
  iconColor: string;
  premium?: boolean;
  highlighted?: boolean;
}

const templates: ReportTemplate[] = [
  {
    id: "env",
    title: "Environnemental",
    desc: "Analyse complète des empreintes carbone, biodiversité et impacts écologiques locaux.",
    icon: Leaf,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    premium: true
  },
  {
    id: "sensors",
    title: "Capteurs",
    desc: "Données brutes et agrégées de télémétrie. Humidité, température et pression atmosphérique.",
    icon: Wifi,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: "alerts",
    title: "Alertes",
    desc: "Journal des incidents critiques et temps de réponse moyen par site surveillé.",
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500"
  },
  {
    id: "water",
    title: "Consommation d'eau",
    desc: "Suivi précis des volumes d'irrigation et détection de fuites potentielles en temps réel.",
    icon: Droplet,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600"
  },
  {
    id: "maintenance",
    title: "Maintenance",
    desc: "État du parc matériel, cycles de remplacement et journal des interventions techniques.",
    icon: Wrench,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600"
  },
  {
    id: "ai",
    title: "IA et prédictions",
    desc: "Modèles prédictifs climatiques à 30 jours basés sur l'apprentissage automatique profond.",
    icon: Brain,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    highlighted: true
  }
];

export default function ReportsClient({
  stats,
  recentReports,
  scheduledReports
}: {
  stats: any;
  recentReports: any[];
  scheduledReports: any[];
}) {
  const [activeSends, setActiveSends] = useState({
    hebdo: scheduledReports[0]?.active || true,
    mensuel: scheduledReports[1]?.active || true,
    quotidien: scheduledReports[2]?.active || false
  });

  const handleDownload = (filename: string) => {
    alert(`Téléchargement de ${filename} lancé.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto text-xs">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900 font-sans">Rapports</h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Générez, consultez et exportez vos rapports environnementaux.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#047857] text-white font-bold rounded-xl hover:bg-[#035f43] transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Créer un rapport
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-neutral-250 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors shadow-sm">
            <Clock className="w-3.5 h-3.5" />
            Planifier
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-neutral-250 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Exporter l&apos;historique
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Rapports ce mois-ci</span>
            <div className="text-2xl font-black text-neutral-850">{stats.thisMonth}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileText className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Rapports planifiés</span>
            <div className="text-2xl font-black text-neutral-850">{stats.scheduled}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Calendar className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Dernier rapport</span>
            <div className="text-sm font-black text-neutral-850">{stats.lastReport}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
            <Clock className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Taux d&apos;envoi</span>
            <div className="text-2xl font-black text-neutral-850">{stats.sendRate}%</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Send className="w-4.5 h-4.5" />
          </div>
        </div>

      </div>

      {/* Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-neutral-900">Modèles de rapports</h2>
          <button className="text-[10px] text-neutral-400 hover:text-neutral-600 font-bold">Voir tout</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div 
                key={template.id} 
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:shadow-sm ${
                  template.highlighted 
                    ? 'bg-emerald-50/20 border-emerald-500/20 shadow-emerald-500/5' 
                    : 'bg-white border-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${template.iconBg} ${template.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {template.premium && (
                      <span className="text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-black text-neutral-900 mb-1">{template.title}</h3>
                  <p className="text-[10px] text-neutral-455 leading-relaxed font-semibold mb-6">
                    {template.desc}
                  </p>
                </div>

                {template.highlighted ? (
                  <button className="w-full py-2.5 bg-[#047857] hover:bg-[#035f43] text-white font-bold rounded-xl transition-all shadow-sm">
                    Créer →
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold rounded-xl transition-all">
                    Créer →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section - Recent Reports & Scheduled Sends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Reports Table (2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-neutral-850 text-sm">Rapports récents</h3>
            <button className="text-[10px] text-[#047857] hover:underline font-bold">Tout voir</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/50 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  <th className="p-3 pl-4">Nom</th>
                  <th className="p-3">Site</th>
                  <th className="p-3">Période</th>
                  <th className="p-3">Format</th>
                  <th className="p-3 text-right pr-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-neutral-150 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="p-3 pl-4 font-bold text-neutral-900 flex items-center gap-2 cursor-pointer hover:text-[#047857]" onClick={() => handleDownload(report.name)}>
                      <FileText className="w-4 h-4 text-neutral-400" />
                      {report.name}
                    </td>
                    <td className="p-3 font-semibold text-neutral-650">{report.site}</td>
                    <td className="p-3 font-semibold text-neutral-400">{report.period}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {report.format.includes('PDF') && <span className="text-[8px] font-black bg-red-50 text-red-600 border border-red-200 px-1 rounded">PDF</span>}
                        {report.format.includes('XLS') && <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 border border-emerald-200 px-1 rounded">XLS</span>}
                      </div>
                    </td>
                    <td className="p-3 text-right pr-4">
                      {report.status === 'Terminé' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Terminé
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          Généré
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scheduled Sends (1/3 width) */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-neutral-850 text-sm">Envois automatiques</h3>
            <span className="text-[9px] font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
              6 actifs
            </span>
          </div>

          <div className="space-y-3">
            {/* Template 1 */}
            <div className="p-3 border border-neutral-150 rounded-xl flex items-center justify-between gap-3 bg-neutral-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-850">Hebdo - Environnement</h4>
                  <p className="text-[9px] text-neutral-400 font-semibold mt-0.5">Chaque Lundi, 08h00</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={activeSends.hebdo}
                onChange={() => setActiveSends({...activeSends, hebdo: !activeSends.hebdo})}
                className="w-4 h-4 accent-[#047857] cursor-pointer"
              />
            </div>

            {/* Template 2 */}
            <div className="p-3 border border-neutral-150 rounded-xl flex items-center justify-between gap-3 bg-neutral-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-850">Mensuel - Consommation</h4>
                  <p className="text-[9px] text-neutral-400 font-semibold mt-0.5">Le 1er du mois</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={activeSends.mensuel}
                onChange={() => setActiveSends({...activeSends, mensuel: !activeSends.mensuel})}
                className="w-4 h-4 accent-[#047857] cursor-pointer"
              />
            </div>

            {/* Template 3 */}
            <div className="p-3 border border-neutral-150 rounded-xl flex items-center justify-between gap-3 bg-neutral-50/30">
              <div className="flex items-center gap-2.5 opacity-60">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-550 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-850">Quotidien - Alertes</h4>
                  <p className="text-[9px] text-neutral-400 font-semibold mt-0.5">Désactivé temporairement</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={activeSends.quotidien}
                onChange={() => setActiveSends({...activeSends, quotidien: !activeSends.quotidien})}
                className="w-4 h-4 accent-[#047857] cursor-pointer"
              />
            </div>

            {/* New Schedule trigger */}
            <button className="w-full py-2.5 bg-white border border-dashed border-neutral-250 hover:bg-neutral-50 text-neutral-500 hover:text-neutral-800 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
              <Plus className="w-4 h-4" />
              Nouvelle planification
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
