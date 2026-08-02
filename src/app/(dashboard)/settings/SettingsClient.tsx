'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
 Settings as SettingsIcon,
 Building2,
 Mail,
 Shield,
 Radio,
 Brain,
 CheckCircle,
 Eye,
 EyeOff
} from 'lucide-react';

export default function SettingsClient({ initialGeneral, initialLora, initialAi }: any) {
 const [activeTab, setActiveTab] = useState('general');
 const [saveSuccess, setSaveSuccess] = useState(false);
 const [apiKeyVisible, setApiKeyVisible] = useState(false);

 const [general, setGeneral] = useState(initialGeneral);
 const [lora, setLora] = useState(initialLora);
 const [ai, setAi] = useState(initialAi);

 const supabase = createClient();

 const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const payload = {
   org_name: general.orgName,
   admin_email: general.adminEmail,
   notif_email: general.notifEmail,
   notif_sms: general.notifSMS,
   lora_band: lora.frequencyBand,
   lora_ping: lora.pingInterval,
   lora_appeui: lora.appEUI,
   lora_appkey: lora.appKey,
   ai_thermal: ai.thermalThreshold,
   ai_smoke: ai.smokeThreshold,
   ai_framerate: ai.frameRate,
   ai_confidence: ai.confidenceAlert
  };

  // Note: Assuming a single row exists or replacing all (simplification for mock)
  // Usually we'd specify an ID or use upsert. Here we update where org_name is not null just to update the only row.
  await supabase.from('system_settings').update(payload).neq('org_name', '');

  setSaveSuccess(true);
  setTimeout(() => {
   setSaveSuccess(false);
  }, 3000);
 };

 return (
  <div className="p-5 md:p-8 space-y-8 max-w-[1600px] mx-auto text-xs">
   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
    <div>
     <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
      <SettingsIcon className="w-6 h-6 text-emerald-600"/>
      Paramètres Système
     </h1>
     <p className="text-xs font-bold text-neutral-400 mt-1">
      Configurez les seuils d'alertes de l'IA, les configurations réseau LoRaWAN, et les clés d'intégration API.
     </p>
    </div>
    {saveSuccess && (
     <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl shadow-sm">
      <CheckCircle className="w-4 h-4 text-emerald-600"/>
      Modifications enregistrées !
     </span>
    )}
   </div>

   <div className="flex flex-col md:flex-row gap-6">
    <div className="w-full md:w-64 shrink-0 flex flex-col gap-1.5">
     {[
      { id: 'general', name: 'Général & Profil', icon: Building2 },
      { id: 'security', name: 'Sécurité & API', icon: Shield },
      { id: 'lorawan', name: 'Réseau LoRaWAN', icon: Radio },
      { id: 'ai', name: 'Configuration IA', icon: Brain },
     ].map(tab => {
      const Icon = tab.icon;
      return (
       <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl font-bold text-left transition-colors border ${activeTab === tab.id
         ? 'bg-emerald-50/70 text-emerald-700 border-emerald-500/10 shadow-sm'
         : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 border-transparent'
         }`}
       >
        <Icon className="w-4 h-4"/>
        {tab.name}
       </button>
      );
     })}
    </div>

    <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
     <form onSubmit={handleSave} className="space-y-6">

      {activeTab === 'general' && (
       <div className="space-y-5">
        <h3 className="font-bold text-sm text-slate-800 border-b border-neutral-100 pb-3 flex items-center gap-1.5">
         <Building2 className="w-4 h-4 text-emerald-600"/>
         Profil de l'Organisation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Nom de l'Administration</label>
          <input
           type="text"
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-semibold text-slate-800 focus:border-emerald-500 focus:bg-white"
           value={general.orgName}
           onChange={(e) => setGeneral({ ...general, orgName: e.target.value })}
          />
         </div>
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Email Admin Principal</label>
          <input
           type="email"
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-semibold text-slate-800 focus:border-emerald-500 focus:bg-white"
           value={general.adminEmail}
           onChange={(e) => setGeneral({ ...general, adminEmail: e.target.value })}
          />
         </div>
        </div>
        <div className="h-px bg-neutral-100 my-4"/>
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
         <Mail className="w-4 h-4 text-emerald-600"/>
         Canaux de Notifications (Alertes)
        </h3>
        <div className="space-y-3">
         <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-neutral-200 cursor-pointer hover:bg-slate-100/50">
          <div>
           <span className="font-bold text-slate-900">Alertes Email Instantanées</span>
           <p className="text-[10px] text-neutral-400 mt-0.5 font-semibold">Envoi des rapports détaillés en PDF aux Wilayas impactées.</p>
          </div>
          <input
           type="checkbox"
           checked={general.notifEmail}
           onChange={() => setGeneral({ ...general, notifEmail: !general.notifEmail })}
           className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer"
          />
         </label>
         <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-neutral-200 cursor-pointer hover:bg-slate-100/50">
          <div>
           <span className="font-bold text-slate-900">Notifications SMS Protection Civile</span>
           <p className="text-[10px] text-neutral-400 mt-0.5 font-semibold">Alertes SMS instantanées sur les téléphones des patrouilleurs du DGSN.</p>
          </div>
          <input
           type="checkbox"
           checked={general.notifSMS}
           onChange={() => setGeneral({ ...general, notifSMS: !general.notifSMS })}
           className="w-5 h-5 accent-emerald-600 rounded-lg cursor-pointer"
          />
         </label>
        </div>
       </div>
      )}

      {activeTab === 'security' && (
       <div className="space-y-5">
        <h3 className="font-bold text-sm text-slate-800 border-b border-neutral-100 pb-3 flex items-center gap-1.5">
         <Shield className="w-4 h-4 text-blue-600"/>
         Clés d'API & Sécurité Développeurs
        </h3>
        <div className="bg-slate-50 border border-neutral-200 p-5 rounded-2xl space-y-3.5">
         <div className="flex justify-between items-center">
          <div>
           <span className="font-bold text-slate-900 text-xs">Clé d'API en production</span>
           <p className="text-[10px] text-neutral-400 mt-0.5 font-semibold">Utilisée pour intégrer le flux de détection dans les serveurs de la Protection Civile.</p>
          </div>
          <button
           type="button"
           onClick={() => setApiKeyVisible(!apiKeyVisible)}
           className="p-1 rounded text-neutral-400 hover:text-neutral-700 hover:bg-slate-200"
          >
           {apiKeyVisible ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
          </button>
         </div>
         <div className="flex gap-2">
          <input
           type={apiKeyVisible ? "text" : "password"}
           readOnly
           value="ev_live_9a224bf199c0ddb8552efc0d9a244ac52f20a9a4b882da"
           className="flex-1 bg-white border border-neutral-200 rounded-xl p-2.5 font-mono text-[10px] text-slate-600 outline-none font-bold"
          />
          <button
           type="button"
           onClick={() => alert("Clé d'API copiée dans le presse-papier.")}
           className="bg-white hover:bg-slate-100 border border-neutral-200 font-bold px-4 rounded-xl shadow-sm text-neutral-700"
          >
           Copier
          </button>
         </div>
        </div>
       </div>
      )}

      {activeTab === 'lorawan' && (
       <div className="space-y-5">
        <h3 className="font-bold text-sm text-slate-800 border-b border-neutral-100 pb-3 flex items-center gap-1.5">
         <Radio className="w-4 h-4 text-emerald-600"/>
         Configuration de la Couverture Réseau (LoRaWAN)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Bande Fréquence Régionale</label>
          <select
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-bold text-neutral-700 focus:border-emerald-500"
           value={lora.frequencyBand}
           onChange={(e) => setLora({ ...lora, frequencyBand: e.target.value })}
          >
           <option value="EU868 (Algérie)">EU868 (Algérie / Tunisie)</option>
           <option value="US915">US915 (Amérique)</option>
           <option value="AS923">AS923 (Asie)</option>
          </select>
         </div>
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Intervalle de Keep-alive</label>
          <select
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-bold text-neutral-700 focus:border-emerald-500"
           value={lora.pingInterval}
           onChange={(e) => setLora({ ...lora, pingInterval: e.target.value })}
          >
           <option value="60s">60 secondes</option>
           <option value="120s">120 secondes (Recommandé)</option>
           <option value="300s">5 minutes</option>
          </select>
         </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Identifiant Application (AppEUI)</label>
          <input
           type="text"
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-mono text-slate-800 font-bold focus:border-emerald-500"
           value={lora.appEUI}
           onChange={(e) => setLora({ ...lora, appEUI: e.target.value })}
          />
         </div>
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Clé Application (AppKey)</label>
          <input
           type="password"
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-mono text-slate-800 font-bold focus:border-emerald-500"
           value={lora.appKey}
           onChange={(e) => setLora({ ...lora, appKey: e.target.value })}
          />
         </div>
        </div>
       </div>
      )}

      {activeTab === 'ai' && (
       <div className="space-y-5">
        <h3 className="font-bold text-sm text-slate-800 border-b border-neutral-100 pb-3 flex items-center gap-1.5">
         <Brain className="w-4 h-4 text-indigo-500"/>
         Configuration de détection de TerraEngine
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Seuil Thermique d'Incendie</label>
          <select
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-bold text-neutral-700 focus:border-emerald-500"
           value={ai.thermalThreshold}
           onChange={(e) => setAi({ ...ai, thermalThreshold: e.target.value })}
          >
           <option value="35°C">35°C (Haut Risque)</option>
           <option value="38°C">38°C (Normal)</option>
           <option value="42°C">42°C (Faible Sensibilité)</option>
          </select>
         </div>
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Seuil Concentration Fumée</label>
          <select
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-bold text-neutral-700 focus:border-emerald-500"
           value={ai.smokeThreshold}
           onChange={(e) => setAi({ ...ai, smokeThreshold: e.target.value })}
          >
           <option value="40 ppm">40 ppm (Très sensible)</option>
           <option value="60 ppm">60 ppm (Standard)</option>
           <option value="100 ppm">100 ppm</option>
          </select>
         </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Échantillonnage Caméra IA</label>
          <select
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-bold text-neutral-700 focus:border-emerald-500"
           value={ai.frameRate}
           onChange={(e) => setAi({ ...ai, frameRate: e.target.value })}
          >
           <option value="2 fps">2 images / sec (Économe)</option>
           <option value="5 fps">5 images / sec (Normal)</option>
           <option value="10 fps">10 images / sec</option>
          </select>
         </div>
         <div className="space-y-1.5">
          <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Seuil d'Alerte Précose</label>
          <select
           className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 outline-none font-bold text-neutral-700 focus:border-emerald-500"
           value={ai.confidenceAlert}
           onChange={(e) => setAi({ ...ai, confidenceAlert: e.target.value })}
          >
           <option value="75%">75% (Plus d'alertes)</option>
           <option value="80%">80% (Recommandé)</option>
           <option value="90%">90% (Alertes critiques uniquement)</option>
          </select>
         </div>
        </div>
       </div>
      )}

      <div className="pt-5 border-t border-neutral-100 flex justify-end">
       <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/10 text-xs"
       >
        Enregistrer les Modifications
       </button>
      </div>

     </form>
    </div>
   </div>
  </div>
 );
}
