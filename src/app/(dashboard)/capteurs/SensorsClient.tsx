'use client';

import React, { useState } from 'react';
import {
 Search,
 Plus,
 Download,
 RefreshCw,
 ToggleLeft,
 ToggleRight,
 Trash2,
 Edit3,
 Eye,
 Battery,
 Signal,
 AlertTriangle,
 X,
 MapPin,
 CheckCircle,
 Clock
} from 'lucide-react';

export interface Sensor {
 id: string;
 name: string;
 forest: string;
 wilaya: string;
 gps: string;
 temp: number;
 hum: number;
 smoke: number;
 battery: number;
 signal: number; // dBm
 lastComm: string;
 status: 'Optimal' | 'Alerte' | 'Critique' | 'Hors-ligne';
}

export default function SensorsClient({ initialSensors }: { initialSensors: Sensor[] }) {
 const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
 const [search, setSearch] = useState("");
 const [selectedWilaya, setSelectedWilaya] = useState("all");
 const [selectedStatus, setSelectedStatus] = useState("all");
 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [isViewModalOpen, setIsViewModalOpen] = useState(false);
 const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

 // New Sensor form state
 const [newSensor, setNewSensor] = useState({
  id:"",
  name:"",
  forest:"Parc National de Chréa",
  wilaya:"Blida",
  gps:"36.420, 2.870",
  temp: 25,
  hum: 50,
  smoke: 8,
  battery: 100,
  signal: -65,
  status:"Optimal"as Sensor['status']
 });

 // Filters
 const filteredSensors = sensors.filter(sensor => {
  const matchesSearch = sensor.id.toLowerCase().includes(search.toLowerCase()) ||
   sensor.name.toLowerCase().includes(search.toLowerCase()) ||
   sensor.forest.toLowerCase().includes(search.toLowerCase());
  const matchesWilaya = selectedWilaya ==="all"|| sensor.wilaya === selectedWilaya;
  const matchesStatus = selectedStatus ==="all"|| sensor.status === selectedStatus;
  return matchesSearch && matchesWilaya && matchesStatus;
 });

 const handleDelete = (id: string) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le capteur ${id} ?`)) {
   setSensors(sensors.filter(s => s.id !== id));
  }
 };

 const handleRestart = (id: string) => {
  alert(`Commande de redémarrage envoyée avec succès au capteur ${id} via la passerelle LoRaWAN.`);
 };

 const handleToggleStatus = (id: string) => {
  setSensors(sensors.map(s => {
   if (s.id === id) {
    const newStatus: Sensor['status'] = s.status === 'Hors-ligne' ? 'Optimal' : 'Hors-ligne';
    return { ...s, status: newStatus, lastComm: newStatus === 'Optimal' ?"En direct": s.lastComm };
   }
   return s;
  }));
 };

 const handleAddSensor = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newSensor.id || !newSensor.name) {
   alert("Veuillez remplir l'identifiant et le nom.");
   return;
  }
  const sensorToAdd: Sensor = {
   ...newSensor,
   lastComm:"En direct"
  };
  setSensors([sensorToAdd, ...sensors]);
  setIsAddModalOpen(false);
  // Reset form
  setNewSensor({
   id:"",
   name:"",
   forest:"Parc National de Chréa",
   wilaya:"Blida",
   gps:"36.420, 2.870",
   temp: 25,
   hum: 50,
   smoke: 8,
   battery: 100,
   signal: -65,
   status:"Optimal"
  });
 };

 const handleExportCSV = () => {
  const headers ="ID,Nom,Forêt,Wilaya,GPS,Température,Humidité,Fumée,Batterie,Signal,DernièreCommunication,Statut\n";
  const rows = filteredSensors.map(s =>
   `${s.id},${s.name},${s.forest},${s.wilaya},"${s.gps}",${s.temp},${s.hum},${s.smoke},${s.battery},${s.signal},${s.lastComm},${s.status}`
  ).join("\n");

  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Ecosystem Monitoring_Capteurs_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
 };

 return (
  <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">

   {/* Header section */}
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Gestion du Parc Capteurs</h1>
     <p className="text-sm text-neutral-500 mt-1">
      Gérez et configurez l'ensemble des {initialSensors.length} modules de détection précoce (température, humidité du sol, ppm de fumée) connectés via LoRaWAN.
     </p>
    </div>

    <div className="flex flex-wrap gap-2">
     <button
      onClick={handleExportCSV}
      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 :bg-neutral-800 transition-colors shadow-sm"
     >
      <Download className="w-3.5 h-3.5"/>
      Exporter CSV
     </button>
     <button
      onClick={() => setIsAddModalOpen(true)}
      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 :bg-emerald-400 transition-colors shadow-sm"
     >
      <Plus className="w-3.5 h-3.5"/>
      Ajouter un Capteur
     </button>
    </div>
   </div>

   {/* Toolbar / Filters */}
   <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">

    <div className="flex-1 relative max-w-md">
     <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-4 w-4 text-neutral-400"/>
     </span>
     <input
      type="text"
      placeholder="Rechercher par identifiant, nom, forêt..."
      className="w-full bg-neutral-50 border border-neutral-200 focus:border-emerald-500 :border-emerald-500 focus:bg-white rounded-lg pl-9 pr-4 py-2 text-xs outline-none text-neutral-900 transition-all"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     />
    </div>

    <div className="flex flex-wrap items-center gap-3">
     <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-400">Wilaya :</span>
      <select
       value={selectedWilaya}
       onChange={(e) => setSelectedWilaya(e.target.value)}
       className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 outline-none"
      >
       <option value="all">Toutes</option>
       <option value="Blida">Blida</option>
       <option value="Béjaïa">Béjaïa</option>
       <option value="Tizi Ouzou">Tizi Ouzou</option>
       <option value="Skikda">Skikda</option>
       <option value="Alger">Alger</option>
      </select>
     </div>

     <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-400">Statut :</span>
      <select
       value={selectedStatus}
       onChange={(e) => setSelectedStatus(e.target.value)}
       className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 outline-none"
      >
       <option value="all">Tous</option>
       <option value="Optimal">Optimal</option>
       <option value="Alerte">Alerte</option>
       <option value="Critique">Critique</option>
       <option value="Hors-ligne">Hors-ligne</option>
      </select>
     </div>
    </div>

   </div>

   {/* Main Sensors Grid / Table */}
   <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
     <table className="w-full text-left border-collapse text-xs">
      <thead>
       <tr className="bg-neutral-50 text-neutral-400 font-semibold border-b border-neutral-200">
        <th className="p-4">ID / Nom</th>
        <th className="p-4">Forêt & Wilaya</th>
        <th className="p-4">Coordonnées GPS</th>
        <th className="p-4 text-center">Température</th>
        <th className="p-4 text-center">Humidité</th>
        <th className="p-4 text-center">Fumée (ppm)</th>
        <th className="p-4">Batterie</th>
        <th className="p-4">Signal LoRa</th>
        <th className="p-4">Dernière Comm</th>
        <th className="p-4">Statut</th>
        <th className="p-4 text-right">Actions</th>
       </tr>
      </thead>
      <tbody className="divide-y divide-neutral-100 text-neutral-700">
       {filteredSensors.map((s) => (
        <tr key={s.id} className="hover:bg-neutral-50/50 :bg-neutral-800/20 transition-colors">
         <td className="p-4">
          <div className="font-bold text-neutral-900 font-mono">{s.id}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">{s.name}</div>
         </td>
         <td className="p-4">
          <div className="font-semibold text-neutral-800">{s.forest}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">{s.wilaya}</div>
         </td>
         <td className="p-4 font-mono text-[10px] text-neutral-500">{s.gps}</td>
         <td className="p-4 text-center font-bold text-neutral-850">{s.temp}°C</td>
         <td className="p-4 text-center font-semibold text-neutral-850">{s.hum}%</td>
         <td className="p-4 text-center font-bold">
          <span className={s.smoke > 50 ? 'text-red-500 font-black' : 'text-neutral-800 '}>
           {s.smoke} ppm
          </span>
         </td>
         <td className="p-4">
          <div className="flex items-center gap-1.5">
           <Battery className={`w-4 h-4 shrink-0 ${s.battery <= 20 ? 'text-red-500' : 'text-neutral-400'}`} />
           <span className={s.battery <= 20 ? 'text-red-500 font-bold' : ''}>{s.battery}%</span>
          </div>
         </td>
         <td className="p-4">
          <div className="flex items-center gap-1">
           <Signal className="w-3.5 h-3.5 text-emerald-500"/>
           <span className="font-mono">{s.signal} dBm</span>
          </div>
         </td>
         <td className="p-4 text-neutral-500">{s.lastComm}</td>
         <td className="p-4">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${s.status === 'Optimal'
            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            : s.status === 'Critique'
             ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse'
             : s.status === 'Alerte'
              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              : 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20'
           }`}>
           <span className={`w-1 h-1 rounded-full ${s.status === 'Optimal' ? 'bg-emerald-500' : s.status === 'Critique' ? 'bg-red-500' : s.status === 'Alerte' ? 'bg-amber-500' : 'bg-neutral-500'
            }`} />
           {s.status}
          </span>
         </td>
         <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-1.5">
           <button
            onClick={() => {
             setSelectedSensor(s);
             setIsViewModalOpen(true);
            }}
            className="p-1.5 rounded-md hover:bg-neutral-100 :bg-neutral-800 text-neutral-400 hover:text-neutral-800 :text-neutral-100"
            title="Détails"
           >
            <Eye className="w-4 h-4"/>
           </button>
           <button
            onClick={() => handleRestart(s.id)}
            className="p-1.5 rounded-md hover:bg-neutral-100 :bg-neutral-800 text-neutral-400 hover:text-neutral-800 :text-neutral-100"
            title="Redémarrer"
           >
            <RefreshCw className="w-4 h-4"/>
           </button>
           <button
            onClick={() => handleToggleStatus(s.id)}
            className="p-1.5 rounded-md hover:bg-neutral-100 :bg-neutral-800 text-neutral-400 hover:text-neutral-800 :text-neutral-100"
            title={s.status === 'Hors-ligne' ? 'Activer' : 'Désactiver'}
           >
            {s.status === 'Hors-ligne' ? (
             <ToggleLeft className="w-4 h-4"/>
            ) : (
             <ToggleRight className="w-4 h-4 text-emerald-500"/>
            )}
           </button>
           <button
            onClick={() => handleDelete(s.id)}
            className="p-1.5 rounded-md hover:bg-red-50 :bg-red-950/20 text-neutral-400 hover:text-red-600"
            title="Supprimer"
           >
            <Trash2 className="w-4 h-4"/>
           </button>
          </div>
         </td>
        </tr>
       ))}
       {filteredSensors.length === 0 && (
        <tr>
         <td colSpan={11} className="p-8 text-center text-neutral-400">
          Aucun capteur trouvé correspondant aux critères de recherche.
         </td>
        </tr>
       )}
      </tbody>
     </table>
    </div>

    {/* Pagination footer */}
    <div className="flex items-center justify-between p-4 border-t border-neutral-200 bg-neutral-50/50">
     <span className="text-[11px] text-neutral-400">Affichage {filteredSensors.length} de {sensors.length} capteurs</span>
     <div className="flex gap-1.5">
      <button className="px-3 py-1.5 rounded-md border border-neutral-250 text-[11px] font-semibold hover:bg-neutral-100 :bg-neutral-800 text-neutral-400"disabled>Précédent</button>
      <button className="px-3 py-1.5 rounded-md border border-neutral-250 text-[11px] font-semibold hover:bg-neutral-100 :bg-neutral-800 text-neutral-700">Suivant</button>
     </div>
    </div>

   </div>

   {/* Modal: Add Sensor */}
   {isAddModalOpen && (
    <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center p-4">
     <div className="bg-white border border-neutral-200 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">

      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
       <h3 className="font-bold text-sm text-neutral-900">Ajouter un Nouveau Capteur</h3>
       <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
        <X className="w-5 h-5"/>
       </button>
      </div>

      <form onSubmit={handleAddSensor} className="p-4 space-y-4">
       <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
         <label className="font-semibold text-neutral-600">Identifiant Unique</label>
         <input
          type="text"
          required
          placeholder="ex. SENS-BAI-021"
          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 outline-none text-neutral-850"
          value={newSensor.id}
          onChange={(e) => setNewSensor({ ...newSensor, id: e.target.value })}
         />
        </div>
        <div className="space-y-1">
         <label className="font-semibold text-neutral-600">Nom du Capteur</label>
         <input
          type="text"
          required
          placeholder="ex. Baïnem Est-4"
          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 outline-none text-neutral-850"
          value={newSensor.name}
          onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
         />
        </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
         <label className="font-semibold text-neutral-600">Forêt</label>
         <select
          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 outline-none text-neutral-850"
          value={newSensor.forest}
          onChange={(e) => {
           const forest = e.target.value;
           let wilaya ="Blida";
           if (forest ==="Forêt d'Akfadou") wilaya ="Béjaïa";
           else if (forest ==="Forêt de Yakouren") wilaya ="Tizi Ouzou";
           else if (forest ==="Massif de Collo") wilaya ="Skikda";
           else if (forest ==="Forêt de Baïnem") wilaya ="Alger";
           setNewSensor({ ...newSensor, forest, wilaya });
          }}
         >
          <option value="Parc National de Chréa">Parc National de Chréa</option>
          <option value="Forêt d'Akfadou">Forêt d'Akfadou</option>
          <option value="Forêt de Yakouren">Forêt de Yakouren</option>
          <option value="Massif de Collo">Massif de Collo</option>
          <option value="Forêt de Baïnem">Forêt de Baïnem</option>
         </select>
        </div>
        <div className="space-y-1">
         <label className="font-semibold text-neutral-600">Wilaya</label>
         <input
          type="text"
          disabled
          className="w-full bg-neutral-100 border border-neutral-200 rounded-lg p-2 outline-none text-neutral-400 cursor-not-allowed"
          value={newSensor.wilaya}
         />
        </div>
       </div>

       <div className="space-y-1">
        <label className="font-semibold text-neutral-600">Coordonnées GPS</label>
        <input
         type="text"
         required
         placeholder="ex. 36.802, 2.975"
         className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2 outline-none text-neutral-850 font-mono"
         value={newSensor.gps}
         onChange={(e) => setNewSensor({ ...newSensor, gps: e.target.value })}
        />
       </div>

       <div className="flex justify-end gap-2 pt-4 border-t border-neutral-200">
        <button
         type="button"
         onClick={() => setIsAddModalOpen(false)}
         className="px-4 py-2 border border-neutral-250 rounded-lg hover:bg-neutral-50 :bg-neutral-800 font-semibold"
        >
         Annuler
        </button>
        <button
         type="submit"
         className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 :bg-emerald-400 font-semibold shadow"
        >
         Ajouter
        </button>
       </div>
      </form>

     </div>
    </div>
   )}

   {/* Modal: View Sensor Details */}
   {isViewModalOpen && selectedSensor && (
    <div className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center p-4">
     <div className="bg-white border border-neutral-200 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">

      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
       <div className="flex items-center gap-2">
        <span className="font-bold text-sm text-neutral-850 font-mono bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
         {selectedSensor.id}
        </span>
        <span className={`w-2 h-2 rounded-full ${selectedSensor.status === 'Optimal' ? 'bg-emerald-500' : selectedSensor.status === 'Critique' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
         }`} />
       </div>
       <button onClick={() => setIsViewModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
        <X className="w-5 h-5"/>
       </button>
      </div>

      <div className="p-4 space-y-4">
       <div>
        <h4 className="font-bold text-base text-neutral-900">{selectedSensor.name}</h4>
        <p className="text-neutral-400 mt-0.5">{selectedSensor.forest} • Wilaya de {selectedSensor.wilaya}</p>
       </div>

       <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
         <span className="text-[10px] text-neutral-400 block font-bold">TEMPÉRATURE</span>
         <span className="text-sm font-black text-neutral-800">{selectedSensor.temp}°C</span>
        </div>
        <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
         <span className="text-[10px] text-neutral-400 block font-bold">HUMIDITÉ DU SOL</span>
         <span className="text-sm font-black text-neutral-800">{selectedSensor.hum}%</span>
        </div>
        <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
         <span className="text-[10px] text-neutral-400 block font-bold">PPM FUMÉE</span>
         <span className="text-sm font-black text-neutral-800">{selectedSensor.smoke} ppm</span>
        </div>
        <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-150">
         <span className="text-[10px] text-neutral-400 block font-bold">NIVEAU BATTERIE</span>
         <span className="text-sm font-black text-neutral-800">{selectedSensor.battery}%</span>
        </div>
       </div>

       <div className="space-y-2 border-t border-neutral-100 pt-3 text-[11px]">
        <div className="flex justify-between">
         <span className="text-neutral-400">Coordonnées GPS:</span>
         <span className="font-mono text-neutral-700">{selectedSensor.gps}</span>
        </div>
        <div className="flex justify-between">
         <span className="text-neutral-400">Qualité Signal:</span>
         <span className="text-neutral-700">{selectedSensor.signal} dBm (RSSI)</span>
        </div>
        <div className="flex justify-between">
         <span className="text-neutral-400">Dernier Ping:</span>
         <span className="text-neutral-700">{selectedSensor.lastComm}</span>
        </div>
       </div>

       <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-lg flex items-center gap-2 mt-4">
        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0"/>
        <span className="text-[10px] text-emerald-700 font-semibold">Télémétrie valide. Aucune anomalie détectée sur ce module.</span>
       </div>
      </div>

     </div>
    </div>
   )}

  </div>
 );
}
