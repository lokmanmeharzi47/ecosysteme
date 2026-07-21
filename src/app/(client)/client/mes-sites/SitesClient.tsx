'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Plus, 
  Grid, 
  List, 
  MapPin, 
  Edit3, 
  Trash2, 
  ArrowRight,
  Tractor,
  Trees,
  Waves,
  Filter
} from 'lucide-react';

export default function SitesClient({ initialSites }: { initialSites: any[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [techFilter, setTechFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sites, setSites] = useState(initialSites);

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'actif' && site.status === 'ACTIF') ||
                          (statusFilter === 'alerte' && site.status === 'ALERTE');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto text-xs">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900">Gestion des Sites</h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Surveillez et gérez vos déploiements environnementaux en temps réel.
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#047857] text-white font-bold rounded-xl hover:bg-[#035f43] transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Ajouter un site
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </span>
            <input
              type="text"
              placeholder="Rechercher un site, une région..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#047857] focus:bg-white transition-all font-semibold text-neutral-800 placeholder-neutral-400"
            />
          </div>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#047857] font-bold text-neutral-600 cursor-pointer"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="alerte">Alerte</option>
          </select>

          {/* Tech Filter */}
          <select 
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-[#047857] font-bold text-neutral-600 cursor-pointer"
          >
            <option value="all">Technologie</option>
            <option value="lorawan">LoRaWAN</option>
            <option value="cellular">Cellulaire</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200 shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sites Container */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => {
            const Icon = site.icon || Trees;
            return (
              <div 
                key={site.id} 
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image header */}
                <div className="h-44 relative w-full overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={site.image} 
                    alt={site.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${site.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                          site.status === 'ACTIF' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1 ${site.status === 'ACTIF' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {site.status}
                        </span>
                        
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${site.riskColor}`}>
                          {site.risk}
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-sm font-black text-neutral-900 mb-1 group-hover:text-[#047857] transition-colors">
                      {site.title}
                    </h3>
                    <p className="text-neutral-500 font-semibold flex items-center gap-1 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {site.location}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {site.metrics.map((metric: any, idx: number) => (
                        <div key={idx} className="bg-neutral-50 border border-neutral-150 rounded-xl p-3 flex flex-col justify-center">
                          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-0.5">{metric.label}</span>
                          <span className="text-sm font-black text-neutral-800">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 font-semibold">
                      Dernière activité: {site.lastActive}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button 
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-neutral-50 transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-neutral-50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link 
                        href={`/client/mes-sites/${site.id}`}
                        className="p-1.5 rounded-lg text-[#047857] hover:text-[#035f43] hover:bg-emerald-50 transition-colors"
                        title="Détails"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                <th className="p-4">Site</th>
                <th className="p-4">Région</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Risque</th>
                <th className="p-4">Dernière activité</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map((site) => (
                <tr key={site.id} className="border-b border-neutral-150 last:border-0 hover:bg-neutral-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={site.image} alt={site.title} className="w-12 h-8 rounded-lg object-cover" />
                      <div>
                        <Link href={`/client/mes-sites/${site.id}`} className="font-bold text-neutral-900 hover:text-[#047857]">
                          {site.title}
                        </Link>
                        <p className="text-[10px] text-neutral-400 font-semibold">
                          {site.metrics[0].value} Capteurs
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-neutral-700">{site.location}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                      site.status === 'ACTIF' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${site.status === 'ACTIF' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {site.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${site.riskColor}`}>
                      {site.risk}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-neutral-400">{site.lastActive}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-neutral-100 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-neutral-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link href={`/client/mes-sites/${site.id}`} className="p-1.5 rounded-lg text-[#047857] hover:bg-emerald-50 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
