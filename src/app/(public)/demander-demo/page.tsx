'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  AlertTriangle, 
  Bell, 
  Brain, 
  Check, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Mail, 
  MapPin, 
  Phone, 
  Radio, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/src/components/Button/Button';

// Collapsible FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-neutral-200 bg-white rounded-2xl overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-neutral-800 hover:text-emerald-700 transition-colors"
      >
        <span className="text-xs md:text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 border-t border-neutral-100' : 'max-h-0'}`}>
        <p className="p-5 text-xs text-neutral-500 font-semibold leading-relaxed bg-slate-50/50">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function DemanderDemoPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    siteType: 'Forêt',
    siteSize: '',
    wilaya: 'Alger',
    sector: 'Agriculture',
    needs: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.company || !formData.email || !formData.phone || !formData.consent) {
      alert('Veuillez remplir tous les champs obligatoires et accepter les conditions.');
      return;
    }
    setLoading(true);
    // Simulate API Submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('demo-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f8fafc] text-neutral-800 font-sans antialiased">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 md:px-8 border-b border-neutral-200 bg-white">
        {/* Abstract background blobs for modern premium touch */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Text content */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-[#2d6a0f] text-[10px] font-bold rounded-lg border border-[#2d6a0f]/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2d6a0f]" />
              Demander une démo
            </span>
            <h1 className="text-3xl md:text-[46px] font-black text-neutral-900 leading-[1.1] tracking-tight">
              Découvrez comment<br />
              protéger vos sites grâce à<br />
              <span className="text-[#2d6a0f]">l&apos;intelligence artificielle</span>.
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 font-semibold leading-relaxed max-w-lg">
              Prenez rendez-vous avec un de nos experts pour une démonstration personnalisée et découvrez comment notre plateforme peut vous aider à sécuriser vos sites.
            </p>
            <div className="pt-2">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="px-8 py-4 bg-[#2d6a0f] hover:bg-[#204c0a] text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-700/10 flex items-center justify-center gap-2 text-xs md:text-sm"
              >
                Demander une démonstration
              </Button>
            </div>
          </div>

          {/* Right Algeria Map Graphic with premium overlays */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/50 bg-[#061208]">
              <img
                src="/algeria-map-dashboard.jpg"
                alt="Algeria Environmental Map Dashboard"
                className="w-full h-full object-cover"
              />

              {/* Floating Alert Widget (Top-Left) */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md border border-red-500/20 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-650 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-650 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-red-550 font-bold uppercase tracking-wider">Alerte Critique</p>
                  <p className="text-[11px] text-neutral-800 font-black">Feu détecté - Béjaïa</p>
                </div>
              </div>

              {/* Floating Status Widget (Bottom-Right) */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md border border-emerald-500/20 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#2d6a0f] flex items-center justify-center shrink-0">
                  <Radio className="w-4.5 h-4.5 text-[#2d6a0f] animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-[#2d6a0f] font-bold uppercase tracking-wider">Réseau LoRaWAN</p>
                  <p className="text-[11px] text-neutral-800 font-black">99.98% connecté</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. FEATURES GRID SECTION ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-slate-50 border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900">
              Ce que vous découvrirez pendant la démonstration
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-semibold max-w-xl mx-auto">
              Nos experts vous guideront à travers les fonctionnalités phares adaptées à vos besoins spécifiques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d6a0f] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-800 text-sm">Surveillance en temps réel</h3>
              <p className="text-[11px] text-neutral-500 font-semibold leading-relaxed">
                Suivez vos capteurs LoRaWAN et accédez à vos tableaux de bord à tout moment avec une latence minimale.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d6a0f] flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-800 text-sm">Alertes intelligentes</h3>
              <p className="text-[11px] text-neutral-500 font-semibold leading-relaxed">
                Recevez des notifications immédiates (SMS, Email, Push) en cas d&apos;anomalie ou de danger détecté sur site.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d6a0f] flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-800 text-sm">Prédictions par IA</h3>
              <p className="text-[11px] text-neutral-500 font-semibold leading-relaxed">
                Anticipez les risques d&apos;incendie et de sécheresse grâce à nos modèles prédictifs mathématiques TerraEngine.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d6a0f] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-neutral-800 text-sm">Cartographie GIS</h3>
              <p className="text-[11px] text-neutral-500 font-semibold leading-relaxed">
                Visualisez l&apos;état global de vos zones géographiques et la localisation précise de vos infrastructures.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. FORM & INFORMATION SECTION ─── */}
      <section id="demo-form" className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-neutral-200 scroll-mt-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Text & Contact Infos */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-neutral-900 leading-tight">
                Prêt à transformer votre gestion de sites ?
              </h2>
              <p className="text-xs md:text-sm text-neutral-500 font-semibold leading-relaxed">
                Découvrez notre plateforme et nos solutions en prenant rendez-vous avec l&apos;un de nos experts techniques.
              </p>
            </div>

            {/* Check list */}
            <div className="space-y-3.5 text-xs font-bold text-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#2d6a0f] flex items-center justify-center shrink-0 border border-emerald-500/10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Analyse globale de vos besoins et objectifs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#2d6a0f] flex items-center justify-center shrink-0 border border-emerald-500/10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Démonstration en direct de la plateforme</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#2d6a0f] flex items-center justify-center shrink-0 border border-emerald-500/10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Questions / réponses avec un spécialiste technique</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#2d6a0f] flex items-center justify-center shrink-0 border border-emerald-500/10">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Estimation budgétaire personnalisée</span>
              </div>
            </div>

            {/* Contact details card */}
            <div className="bg-slate-50 border border-neutral-200/80 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-[#2d6a0f] flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-450 font-bold uppercase tracking-wider">Téléphone</p>
                  <p className="text-[11px] text-neutral-800 font-bold">+213 (0) 790 08 92 75</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-[#2d6a0f] flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-450 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-[11px] text-neutral-800 font-bold">ecosystems.monitoring.dz@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-[#2d6a0f] flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-450 font-bold uppercase tracking-wider">Disponibilité</p>
                  <p className="text-[11px] text-neutral-800 font-bold">Dimanche - Jeudi, 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-[#2d6a0f]" />
                  </div>
                  <h3 className="text-xl font-black text-neutral-900">Demande envoyée avec succès !</h3>
                  <p className="text-xs text-neutral-500 font-semibold max-w-sm mx-auto leading-relaxed">
                    Merci pour votre intérêt. Un expert d&apos;Ecosystem vous contactera dans les plus brefs délais pour convenir d&apos;un créneau.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#2d6a0f] hover:underline"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom Complet */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Nom complet *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: Mourad Belkacem" 
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>
                    {/* Nom Entreprise */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Nom de l&apos;entreprise *</label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: AgriSmart Dz" 
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Adresse email *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="contact@agrismart.dz" 
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>
                    {/* Téléphone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Téléphone *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Ex: +213 555 12 34 56" 
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type de site */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Type de site</label>
                      <select 
                        name="siteType"
                        value={formData.siteType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 transition-colors font-semibold"
                      >
                        <option>Forêt</option>
                        <option>Exploitation Agricole</option>
                        <option>Site Industriel</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    {/* Taille site */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Taille du site (hectares)</label>
                      <input 
                        type="number" 
                        name="siteSize"
                        value={formData.siteSize}
                        onChange={handleInputChange}
                        placeholder="Ex: 150" 
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Wilaya */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Wilaya</label>
                      <select 
                        name="wilaya"
                        value={formData.wilaya}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 transition-colors font-semibold"
                      >
                        <option>Alger</option>
                        <option>Blida</option>
                        <option>Béjaïa</option>
                        <option>Tizi Ouzou</option>
                        <option>Skikda</option>
                        <option>Biskra</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    {/* Secteur */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Secteur d&apos;activité</label>
                      <select 
                        name="sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 transition-colors font-semibold"
                      >
                        <option>Agriculture</option>
                        <option>Forestier</option>
                        <option>Industriel</option>
                        <option>Gouvernemental</option>
                        <option>Autre</option>
                      </select>
                    </div>
                  </div>

                  {/* Besoins spécifiques */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-450 uppercase tracking-widest">Besoins spécifiques</label>
                    <textarea 
                      name="needs"
                      value={formData.needs}
                      onChange={handleInputChange}
                      rows={3} 
                      placeholder="Décrivez brièvement vos objectifs de surveillance..." 
                      className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-3 text-xs outline-none focus:border-emerald-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input 
                      type="checkbox" 
                      name="consent"
                      id="consent"
                      checked={formData.consent}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-0.5 w-4 h-4 text-emerald-600 border-neutral-300 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="consent" className="text-[10px] text-neutral-500 font-semibold leading-relaxed">
                      J&apos;accepte d&apos;être recontacté par l&apos;équipe d&apos;Ecosystem dans le cadre de ma demande. *
                    </label>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <Button 
                      type="submit"
                      disabled={loading}
                      fullWidth
                      className="py-3.5 bg-[#2d6a0f] hover:bg-[#204c0a] text-white font-bold rounded-xl transition-all shadow-md text-xs"
                    >
                      {loading ? 'Traitement en cours...' : 'Envoyer ma demande de démonstration'}
                    </Button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. FAQ SECTION ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-slate-50 border-b border-neutral-200">
        <div className="max-w-[800px] mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="La démonstration est-elle gratuite ?" 
              answer="Oui, la démonstration est entièrement gratuite et sans aucun engagement de votre part." 
            />
            <FAQItem 
              question="Combien de temps dure la démonstration ?" 
              answer="Une démonstration dure généralement entre 30 et 45 minutes, incluant une présentation personnalisée et une session de questions/réponses." 
            />
            <FAQItem 
              question="Puis-je inviter d'autres membres de mon équipe ?" 
              answer="Tout à fait. Lors de la confirmation du rendez-vous, vous recevrez un lien de réunion que vous pourrez partager avec vos collègues." 
            />
            <FAQItem 
              question="De quels équipements ai-je besoin pour la démo ?" 
              answer="Une simple connexion internet et un navigateur moderne suffisent. Aucun logiciel n&apos;est requis." 
            />
          </div>

        </div>
      </section>

      {/* ─── 5. BOTTOM BANNER CTA SECTION ─── */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto bg-[#147a3c] rounded-[3rem] py-16 md:py-20 px-6 text-center space-y-6 shadow-xl relative overflow-hidden">
          {/* Abstract green circle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -ml-16 -mb-16" />

          <h2 className="text-2xl md:text-3xl font-black leading-tight text-white max-w-xl mx-auto">
            Prêt à rendre vos sites plus intelligents et plus sûrs ?
          </h2>
          <p className="text-xs md:text-sm text-emerald-50 font-medium max-w-xl mx-auto leading-relaxed">
            Rejoignez Ecosystem et commencez à surveiller vos sites en temps réel.
          </p>
          <div className="pt-4 flex justify-center">
            <Button
              onClick={scrollToForm}
              className="px-8 py-3.5 bg-white text-[#147a3c] font-bold rounded-xl hover:bg-neutral-50 transition-all text-xs shadow-md"
            >
              Réserver ma démonstration gratuite
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
