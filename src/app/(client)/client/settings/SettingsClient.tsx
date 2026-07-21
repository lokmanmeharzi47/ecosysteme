'use client';

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Shield,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsClient({ initialProfile }: { initialProfile: any }) {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Settings state
  const [profile, setProfile] = useState(initialProfile || {
    name: "Karim Benali",
    email: "karim.benali@organisation.dz",
    phone: "+213 (0) 661 23 45 67",
    organisation: "Direction des Forêts de Béjaïa",
    notifEmail: true,
    notifSMS: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto text-xs">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-neutral-900 font-sans flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-emerald-600" />
            Paramètres
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-0.5">
            Configurez vos informations de profil, vos préférences de notification et vos accès de sécurité.
          </p>
        </div>

        {saveSuccess && (
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-xl shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Modifications enregistrées !
          </span>
        )}
      </div>

      {/* Settings Grid Panel */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1.5">
          {[
            { id: 'general', name: 'Mon Profil & Organisation', icon: User },
            { id: 'security', name: 'Sécurité & Accès', icon: Shield },
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
                <Icon className="w-4.5 h-4.5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">

            {activeTab === 'general' && (
              <div className="space-y-5">
                <h3 className="font-bold text-sm text-neutral-850 border-b border-neutral-100 pb-3 flex items-center gap-1.5">
                  Profil Personnel
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Nom complet</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold text-neutral-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Email principal</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold text-neutral-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Téléphone mobile</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold text-neutral-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Organisation / Wilaya rattachée</label>
                    <input
                      type="text"
                      value={profile.organisation}
                      onChange={(e) => setProfile({ ...profile, organisation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold text-neutral-800"
                    />
                  </div>
                </div>

                {/* Notifications setup */}
                <div className="space-y-3 pt-3">
                  <h3 className="font-bold text-sm text-neutral-850 border-b border-neutral-100 pb-3">Canaux d&apos;Alerte</h3>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-150 hover:bg-neutral-50/50 transition-colors">
                    <div className="max-w-[80%]">
                      <span className="font-bold text-neutral-800">Alertes Email Instantanées</span>
                      <p className="text-[10px] text-neutral-400 mt-0.5 font-semibold">Envoi des notifications d&apos;anomalies de vos sites en temps réel.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.notifEmail}
                      onChange={() => setProfile({ ...profile, notifEmail: !profile.notifEmail })}
                      className="w-4 h-4 accent-emerald-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-150 hover:bg-neutral-50/50 transition-colors">
                    <div className="max-w-[80%]">
                      <span className="font-bold text-neutral-800">Alertes SMS</span>
                      <p className="text-[10px] text-neutral-400 mt-0.5 font-semibold">Réception d&apos;un code SMS critique en cas de détection de fumée.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.notifSMS}
                      onChange={() => setProfile({ ...profile, notifSMS: !profile.notifSMS })}
                      className="w-4 h-4 accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-5">
                <h3 className="font-bold text-sm text-neutral-850 border-b border-neutral-100 pb-3 flex items-center gap-1.5">
                  Sécurité & Authentification
                </h3>

                <div className="max-w-md space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Mot de passe actuel</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Nouveau mot de passe</label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Min. 8 caractères"
                        className="w-full pl-3.5 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-450 hover:text-neutral-700"
                      >
                        {passwordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons Row */}
            <div className="border-t border-neutral-100 pt-5 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#047857] text-white font-bold rounded-xl hover:bg-[#035f43] transition-colors"
              >
                Enregistrer les paramètres
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
