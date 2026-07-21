'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Cpu,
  Wifi,
  MapPin,
  ArrowRight,
  Play,
  CheckCircle,
  Database,
  Radio,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Tractor,
  Trees,
  Waves,
  Zap,
  PhoneCall,
  Clock,
  Search,
  Heart,
  Eye,
  ChevronDown,
  CheckCircle2,
  Star,
  X,
  Minus,
  Plus,
  ShoppingBag,
  Loader2
} from 'lucide-react';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [previewProduct, setPreviewProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wilaya: '',
    address: '',
    paymentMethod: 'delivery'
  });

  const closeModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      wilaya: '',
      address: '',
      paymentMethod: 'delivery'
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.wilaya || !formData.address) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-[#f8fafc] text-neutral-850 font-sans antialiased">

      {/* ─── HERO SECTION ─── */}
      <section
        className="relative overflow-hidden py-16 md:py-24 px-6 md:px-8 border-b border-neutral-200"
        style={{
          backgroundImage: "url('/herobackground.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text content */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eaf6ee] text-[#2d6a0f] text-[10px] font-bold rounded-lg border border-[#2d6a0f]/15">
              <Radio className="w-3.5 h-3.5 text-[#2d6a0f]" />
              Intelligence Environnementale 4.0
            </span>
            <h1 className="text-4xl md:text-[54px] font-black text-neutral-900 leading-[1.08] tracking-tight">
              Maîtrisez<br />
              l&apos;intelligence<br />
              <span className="text-[#2d6a0f]">environnementale</span><br />
              à l&apos;échelle<br />
              planétaire.
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 font-semibold leading-relaxed max-w-lg">
              Fusionnez la puissance de l&apos;IAoT, du réseau LoRaWAN et de l&apos;imagerie satellite pour une surveillance continue et prédictive de vos écosystèmes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/demander-demo"
                className="px-6 py-3.5 bg-[#2d6a0f] hover:bg-[#204c0a] text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Demander une démo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-[#e4eaeb] border border-neutral-350 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 transition-all shadow-sm flex items-center justify-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Glowing Digital Globe Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-square rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/50 bg-[#061208]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero.png"
                alt="Digital Earth Environmental Connection"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Overlapping Satellite widget at bottom-left */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md border border-neutral-200/60 p-3.5 rounded-2xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Radio className="w-5 h-5 text-emerald-700 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider">Flux Satellite</p>
                  <p className="text-[11px] text-[#2d6a0f] font-black">Temps Réel Actif</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Statistics Grid (Inside Hero wrapper) */}
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-neutral-200/80 pt-10">
          <div className="text-center md:text-left space-y-1">
            <div className="text-2xl md:text-3xl font-black text-neutral-900">1.2M</div>
            <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-widest">Hectares Protégés</p>
          </div>
          <div className="text-center md:text-left space-y-1">
            <div className="text-2xl md:text-3xl font-black text-neutral-900">45k+</div>
            <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-widest">Capteurs Actifs</p>
          </div>
          <div className="text-center md:text-left space-y-1">
            <div className="text-2xl md:text-3xl font-black text-neutral-900">15k</div>
            <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-widest">Alertes Évitées</p>
          </div>
          <div className="text-center md:text-left space-y-1">
            <div className="text-2xl md:text-3xl font-black text-[#2d6a0f]">-30%</div>
            <p className="text-[9px] text-neutral-450 font-bold uppercase tracking-widest">Coûts Opérationnels</p>
          </div>
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW SECTION ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Dashboard Preview Image */}
          <div className="bg-neutral-900 border border-neutral-250 rounded-3xl p-2.5 shadow-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/analyse.png"
              alt="Dashboard Preview Analysis"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Description & Core Features list */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-neutral-900 leading-snug">
              L&apos;intelligence environnementale à l&apos;état pur.
            </h2>
            <p className="text-neutral-500 font-semibold leading-relaxed">
              Visualisez, analysez et anticipez les risques écologiques grâce à une interface épurée conçue pour les équipes de terrain et scientifiques.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">Edge Computing IA</h4>
                  <p className="text-[10px] text-neutral-450 mt-0.5 font-semibold">Calcul local sur les capteurs pour une détection d&apos;incendie sous 10s.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Wifi className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">Réseau LoRaWAN Étendu</h4>
                  <p className="text-[10px] text-neutral-450 mt-0.5 font-semibold">Transmission cryptée basse consommation couvrant jusqu&apos;à 15km de rayon.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Activity className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">IA Prédictive TerraEngine v4.2</h4>
                  <p className="text-[10px] text-neutral-450 mt-0.5 font-semibold">Modélisation mathématique du stress hydrique de la flore locale.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── HARDWARE SECTION ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto space-y-8">

          {/* Filtering Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-4 py-2 bg-[#004e28] text-white text-[11px] font-bold rounded-full">Tous les équipements</button>
              <button className="px-4 py-2 bg-transparent text-neutral-600 text-[11px] font-bold hover:bg-neutral-100 rounded-full transition-colors">Capteurs sol</button>
              <button className="px-4 py-2 bg-transparent text-neutral-600 text-[11px] font-bold hover:bg-neutral-100 rounded-full transition-colors">Stations météo</button>
              <button className="px-4 py-2 bg-transparent text-neutral-600 text-[11px] font-bold hover:bg-neutral-100 rounded-full transition-colors">Qualité de l&apos;air</button>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher un équipement..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-100 border-none rounded-md text-[11px] font-semibold text-neutral-700 focus:ring-2 focus:ring-[#004e28]/20 outline-none placeholder:text-neutral-400"
                />
              </div>
              <button className="px-4 py-2 bg-neutral-100 text-neutral-700 text-[11px] font-bold rounded-md flex items-center gap-2 shrink-0">
                Les plus populaires
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Hardware Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[
              {
                title: "EcoSphere Weather Pro",
                badge1: { text: "BEST SELLER", color: "bg-[#00c99a] text-white" },
                badge2: "STATION MÉTÉO",
                desc: "Station météo autonome ultra-précise pour monitoring complet.",
                features: ["Énergie solaire intégrée", "Connectivité LoRaWAN 15km+", "Capteurs vent, pluie, UV, temp"],
                price: "89 000",
                status: "En stock",
                statusColor: "text-emerald-500",
                img: "/product-weather.png"
              },
              {
                title: "EcoSoil NPK Smart",
                badge1: { text: "COMPATIBLE ECOSPHERE", color: "bg-[#004e28] text-white" },
                badge2: "CAPTEURS SOL",
                desc: "Sonde haute performance pour l'analyse des nutriments et humidité.",
                features: ["Analyse N-P-K en temps réel", "Autonomie batterie 5 ans", "Sonde inox anti-corrosion"],
                price: "42 000",
                status: "En stock",
                statusColor: "text-emerald-500",
                img: "/product-soil.png"
              },
              {
                title: "AirGuard Pro AIoT",
                badge1: { text: "QUALITÉ DE L'AIR", color: "bg-white text-[#004e28] border border-neutral-200" },
                desc: "Monitoring avancé des gaz (CO2, NO2, SO2) et particules fines PM2.5/10.",
                features: ["Détection multi-gaz précise", "Affichage OLED local", "Boîtier IP67 industriel"],
                price: "76 000",
                status: "Sur commande",
                statusColor: "text-amber-500",
                img: "/product-air.png"
              },

              {
                title: "EcoGateway Industrial",
                badge1: { text: "RÉSEAUX LORAWAN", color: "bg-white text-[#004e28] border border-neutral-200" },
                desc: "Passerelle réseau robuste pour connecter des centaines de capteurs.",
                features: ["Supporte 1000+ terminaux", "Backhaul 4G/Ethernet/Wifi", "Protection foudre intégrée"],
                price: "68 000",
                status: "En stock",
                statusColor: "text-emerald-500",
                img: "/product-gateway.png"
              },
              {
                title: "Caméra Vision IA",
                badge1: { text: "INTELLIGENCE ARTIFICIELLE", color: "bg-white text-[#004e28] border border-neutral-200" },
                desc: "Caméra connectée IA pour l'identification de la faune et détection intrusion.",
                features: ["Reconnaissance d'espèces", "Vision nocturne Infrarouge", "Détection mouvement IA"],
                price: "125 000",
                status: "Rupture",
                statusColor: "text-red-500",
                img: "/product-box.png"
              },
              {
                title: "Soil Integrated Sensor",
                badge1: { text: "NOUVEAUTÉ", color: "bg-[#2d6a0f] text-white" },
                badge2: "CAPTEURS SOL",
                desc: "Capteur de sol intégré robuste mesurant la température, l'humidité, l'électroconductivité (EC) et le pH.",
                features: ["Sonde multi-fonctions 4-en-1", "Interface Modbus RS485", "Sonde inox étanche IP68"],
                price: "54 000",
                status: "En stock",
                statusColor: "text-emerald-500",
                img: "/product-soil-integrated.png"
              },
              {
                title: "Capacitive Soil Moisture Sensor v1.2",
                badge1: { text: "POPULAIRE", color: "bg-[#00c99a] text-white" },
                badge2: "CAPTEURS SOL",
                desc: "Capteur d'humidité du sol capacitif résistant à la corrosion pour mesures analogiques.",
                features: ["Mesure capacitive de l'humidité", "Résistance accrue à la corrosion", "Sortie analogique directe"],
                price: "12 000",
                status: "En stock",
                statusColor: "text-emerald-500",
                img: "/product-capacitive-soil.png"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-neutral-150 rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">

                {/* Image & Badges */}
                <div className="relative h-56 w-full bg-[#eef1f3] overflow-hidden p-4 flex items-center justify-center">
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-black tracking-wide uppercase ${item.badge1.color}`}>
                      {item.badge1.text}
                    </span>
                    {item.badge2 && (
                      <span className="px-2 py-1 rounded-full text-[8px] font-black tracking-wide uppercase bg-white text-neutral-800 shadow-sm">
                        {item.badge2}
                      </span>
                    )}
                  </div>

                  <button className="absolute top-4 right-4 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-neutral-400 hover:text-red-500 transition-colors z-10">
                    <Heart className="w-3.5 h-3.5" />
                  </button>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-sm font-black text-[#004e28] group-hover:text-[#00c99a] transition-colors">{item.title}</h3>
                    <div className="flex items-center gap-1 shrink-0 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.statusColor.replace('text-', 'bg-')}`} />
                      <span className={`text-[8px] font-bold ${item.statusColor}`}>{item.status}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mb-4 flex-1">
                    {item.desc}
                  </p>

                  <ul className="text-[9px] text-neutral-600 font-medium space-y-1.5 mb-6">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-xl font-black text-[#004e28]">{item.price} DZD</span>
                    <span className="text-[8px] text-neutral-400 font-bold uppercase">TTC</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      onClick={() => setSelectedProduct(item)}
                      className="flex-1 py-2.5 bg-[#004e28] hover:bg-[#003d1f] text-white text-[11px] font-bold rounded-lg transition-colors"
                    >
                      Acheter
                    </button>
                    <button 
                      onClick={() => setPreviewProduct(item)}
                      className="w-9 h-9 bg-neutral-100 hover:bg-neutral-200 rounded-lg flex items-center justify-center text-[#004e28] transition-colors shrink-0"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-neutral-100">
                    <input type="checkbox" id={`compare-${index}`} className="w-3 h-3 rounded border-neutral-300 text-[#004e28] focus:ring-[#004e28]" />
                    <label htmlFor={`compare-${index}`} className="text-[9px] text-neutral-500 font-medium cursor-pointer">Comparer cet équipement</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── VIDEO DEMO SECTION ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-[1280px] mx-auto space-y-12">

          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-neutral-900">Découvrez l&apos;expérience complète</h2>
            <p className="text-neutral-500 font-semibold">De l&apos;installation des capteurs à l&apos;analyse sur tableau de bord, une solution bout en bout.</p>
          </div>

          {/* YouTube Video Player */}
          <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl border border-neutral-200 bg-neutral-950 overflow-hidden shadow-2xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/EiVmu8-UFkQ?si=k4gKXmYDU1KWlKRa"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Quick stats items below player */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 max-w-3xl mx-auto text-center font-bold text-neutral-700">
            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Scalabilité</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
              <Shield className="w-5 h-5 text-emerald-650" />
              <span>Sécurité absolue</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
              <PhoneCall className="w-5 h-5 text-blue-650" />
              <span>Support 24/7</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-100">
              <Database className="w-5 h-5 text-purple-650" />
              <span>Intégration API</span>
            </div>
          </div>

        </div>
      </section>



      {/* ─── NATIONAL COVERAGE SECTION ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-[#161a1d]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <span className="inline-block px-3 py-1.5 bg-[#173021] text-[#7de2a8] font-semibold rounded-md text-[11px] border border-[#234b34]">Déploiement National</span>

            <h2 className="text-4xl md:text-[2.75rem] font-bold text-[#b4edcd] leading-[1.1] tracking-tight">
              Couverture totale du<br />territoire Algérien.
            </h2>

            <p className="text-[#9ca3af] font-medium leading-relaxed max-w-[450px]">
              Notre réseau LoRaWAN couvre déjà les zones stratégiques agricoles et forestières d'Algérie, du littoral jusqu'aux plateaux du Sud.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-8">
              <div className="pl-4 border-l-[3px] border-[#057a44]">
                <div className="text-3xl font-bold text-white mb-1">48+</div>
                <p className="text-[11px] text-[#6b7280] font-medium">Wilayas Monitorées</p>
              </div>
              <div className="pl-4 border-l-[3px] border-[#057a44]">
                <div className="text-3xl font-bold text-white mb-1">1500+</div>
                <p className="text-[11px] text-[#6b7280] font-medium">Stations Actives</p>
              </div>
            </div>
          </div>

          {/* Network Nodes map preview */}
          <div className="relative rounded-[2rem] overflow-hidden bg-[#090b0e] aspect-square lg:aspect-auto lg:h-[480px] shadow-2xl flex items-center justify-center border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/alger.png"
              alt="Algeria Network Nodes map"
              className="w-full h-full object-contain p-4 lg:p-8 opacity-80"
            />

            {/* Overlay Tag */}
            <div className="absolute top-[30%] right-[15%] md:right-[20%] bg-[#e2e8f0] px-3 py-1.5 rounded-md shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="text-[9px] font-bold text-[#1f2937]">Station Biskra: 42°C | 12% HR</span>
            </div>

            {/* Glowing dots */}
            <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-neutral-900">Des solutions adaptées à chaque secteur</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img src="/kh1.png" alt="Agriculture Intelligente" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-black text-neutral-900 mb-1">Agriculture Intelligente</h3>
                <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Optimisation de l&apos;irrigation et détection précoce des maladies pour un rendement durable.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img src="/kh3.png" alt="Services Forestiers" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-black text-neutral-900 mb-1">Services Forestiers</h3>
                <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Prévention des feux de forêt et suivi de la biodiversité par analyse acoustique IA.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <img src="/kh2.png" alt="Conformité Industrielle" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-black text-neutral-900 mb-1">Conformité Industrielle</h3>
                <p className="text-[11px] text-neutral-500 font-medium leading-relaxed">Contrôle des émissions et gestion des déchets en temps réel pour une industrie verte.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-8 bg-[#006633]/30"></div>
              <span className="text-[9px] font-bold text-[#006633] uppercase tracking-wider">Exemples de retours d&apos;expérience</span>
              <div className="h-[1px] w-8 bg-[#006633]/30"></div>
            </div>
            <h2 className="text-2xl font-black text-[#004e28]">Ils ont transformé leur gestion</h2>
            <p className="text-[13px] text-neutral-500 font-medium">L&apos;impact EcoSphere à travers les témoignages de nos utilisateurs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white border-l-[3px] border-l-[#006633] rounded-r-2xl border-y border-r border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div>
                <div className="flex gap-1 text-[#006633] mb-4">
                  <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-[11px] text-neutral-600 font-medium italic leading-relaxed">
                  &quot;Grâce à EcoSphere, nous avons pu intervenir sur trois départs de feu cet été avant même que les flammes ne soient visibles. Un investissement inestimable.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#eef1f3] text-[#004e28] flex items-center justify-center text-[10px] font-black shrink-0">AB</div>
                <div>
                  <h4 className="text-[11px] font-black text-neutral-900 leading-tight">Amine B.</h4>
                  <p className="text-[9px] text-neutral-500 font-medium">Directeur des Parcs Nationaux</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white border-l-[3px] border-l-[#006633] rounded-r-2xl border-y border-r border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div>
                <div className="flex gap-1 text-[#006633] mb-4">
                  <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-[11px] text-neutral-600 font-medium italic leading-relaxed">
                  &quot;La précision des capteurs LoRaWAN est bluffante. Nous pilotons désormais nos cultures au mètre carré près. Nos rendements ont augmenté de 12%.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#eef1f3] text-[#004e28] flex items-center justify-center text-[10px] font-black shrink-0">SK</div>
                <div>
                  <h4 className="text-[11px] font-black text-neutral-900 leading-tight">Sarah K.</h4>
                  <p className="text-[9px] text-neutral-500 font-medium">Agro-ingénieure Senior</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white border-l-[3px] border-l-[#006633] rounded-r-2xl border-y border-r border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div>
                <div className="flex gap-1 text-[#006633] mb-4">
                  <Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-[11px] text-neutral-600 font-medium italic leading-relaxed">
                  &quot;Une plateforme robuste et intuitive. L&apos;intégration de l&apos;IA prédictive nous permet d&apos;anticiper les pics de pollution avec une fiabilité rare.&quot;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-[#eef1f3] text-[#004e28] flex items-center justify-center text-[10px] font-black shrink-0">YM</div>
                <div>
                  <h4 className="text-[11px] font-black text-neutral-900 leading-tight">Yacine M.</h4>
                  <p className="text-[9px] text-neutral-500 font-medium">Resp. Environnement, Jilger</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto bg-[#147a3c] rounded-[3rem] py-16 md:py-24 px-6 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            Prêt à agir pour l&apos;avenir ?
          </h2>
          <p className="text-sm md:text-base text-emerald-50 font-medium max-w-2xl mx-auto leading-relaxed">
            Commencez dès aujourd&apos;hui à sécuriser vos actifs environnementaux avec la plateforme AIoT la plus avancée du marché.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demander-demo"
              className="px-8 py-3.5 bg-white text-[#147a3c] font-bold rounded-xl hover:bg-neutral-50 transition-all text-sm w-full sm:w-auto shadow-sm"
            >
              Demander une démo
            </Link>
            <Link
              href="/tarification"
              className="px-8 py-3.5 bg-[#0e8f46] border border-[#13a854] text-white font-bold rounded-xl hover:bg-[#13a854] transition-all text-sm w-full sm:w-auto shadow-sm"
            >
              Consulter les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MODAL D'ACHAT (PREMIUM CHECKOUT) ─── */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white/95 border border-neutral-200/80 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transition-all duration-300 relative flex flex-col my-8 animate-in zoom-in-95 duration-200">
            
            {/* Bouton fermer */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 flex flex-col space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-150">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#004e28] flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-neutral-900 leading-tight">Finaliser votre commande</h3>
                    <p className="text-[10px] text-neutral-450 font-semibold">EcoSphere Intelligence</p>
                  </div>
                </div>

                {/* Détails du produit */}
                <div className="flex gap-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-150 items-center">
                  <div className="w-16 h-16 bg-[#eef1f3] rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden border border-neutral-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={selectedProduct.img} 
                      alt={selectedProduct.title} 
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-[#004e28] truncate">{selectedProduct.title}</h4>
                    <p className="text-[10px] text-neutral-450 font-bold mt-0.5">{selectedProduct.price} DZD / unité</p>
                  </div>
                  
                  {/* Selecteur de quantité */}
                  <div className="flex items-center gap-2 bg-white border border-neutral-200 px-2 py-1 rounded-full shadow-sm">
                    <button 
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black text-neutral-800 w-4 text-center">{quantity}</span>
                    <button 
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Formulaire de facturation */}
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Nom complet *</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Amine Brahimi" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#004e28]/10 focus:border-[#004e28] transition-all font-semibold text-neutral-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Téléphone *</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="Ex: 0790 08 92 75" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#004e28]/10 focus:border-[#004e28] transition-all font-semibold text-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Email *</label>
                      <input 
                        required
                        type="email" 
                        placeholder="nom@entreprise.dz" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#004e28]/10 focus:border-[#004e28] transition-all font-semibold text-neutral-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Wilaya *</label>
                      <select 
                        required
                        value={formData.wilaya}
                        onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#004e28]/10 focus:border-[#004e28] transition-all font-semibold text-neutral-800"
                      >
                        <option value="">Sélectionner une wilaya</option>
                        <option value="01-Adrar">01 - Adrar</option>
                        <option value="02-Chlef">02 - Chlef</option>
                        <option value="09-Blida">09 - Blida</option>
                        <option value="16-Alger">16 - Alger</option>
                        <option value="19-Sétif">19 - Sétif</option>
                        <option value="31-Oran">31 - Oran</option>
                        <option value="07-Biskra">07 - Biskra</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Adresse de livraison *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Adresse complète" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#004e28]/10 focus:border-[#004e28] transition-all font-semibold text-neutral-800"
                    />
                  </div>
                </div>

                {/* Moyen de Paiement */}
                <div className="space-y-2 pt-2">
                  <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider block">Mode de paiement</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex flex-col p-3 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === 'delivery' ? 'border-[#004e28] bg-emerald-50/20 text-[#004e28]' : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="delivery" 
                        checked={formData.paymentMethod === 'delivery'}
                        onChange={() => setFormData({...formData, paymentMethod: 'delivery'})}
                        className="sr-only"
                      />
                      <span className="text-[10px] font-black">À la livraison</span>
                      <span className="text-[8px] text-neutral-450 mt-0.5 font-bold">Payer en espèces</span>
                    </label>
                    <label className={`flex flex-col p-3 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === 'transfer' ? 'border-[#004e28] bg-emerald-50/20 text-[#004e28]' : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'}`}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="transfer" 
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={() => setFormData({...formData, paymentMethod: 'transfer'})}
                        className="sr-only"
                      />
                      <span className="text-[10px] font-black">Virement bancaire</span>
                      <span className="text-[8px] text-neutral-450 mt-0.5 font-bold">RIB / CCP Algérie</span>
                    </label>
                  </div>
                </div>

                {/* Total et Validation */}
                <div className="pt-4 border-t border-neutral-150 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-neutral-400 font-bold uppercase">Total de la commande</p>
                    <p className="text-lg font-black text-[#004e28]">
                      {(parseFloat(selectedProduct.price.replace(/\s+/g, '')) * quantity).toLocaleString('fr-FR')} DZD
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#004e28] hover:bg-[#003d1f] disabled:bg-neutral-350 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      'Confirmer la commande'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-250 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#004e28]">Commande enregistrée !</h3>
                  <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-sm">
                    Merci pour votre commande, <strong className="text-neutral-800">{formData.name}</strong>. 
                    Un email récapitulatif a été envoyé à <strong className="text-neutral-800">{formData.email}</strong>. 
                  </p>
                  <p className="text-[11px] text-neutral-450 font-semibold leading-relaxed max-w-sm">
                    Notre équipe logistique vous contactera par téléphone au <strong className="text-neutral-800">{formData.phone}</strong> sous 24h ouvrées pour organiser la livraison à votre adresse à <strong className="text-neutral-800">{formData.wilaya}</strong>.
                  </p>
                </div>
                
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-[#004e28] hover:bg-[#003d1f] text-white font-bold rounded-xl transition-all shadow-md text-xs"
                >
                  Continuer ma visite
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ─── MODAL APERÇU RAPIDE (QUICK VIEW) ─── */}
      {previewProduct && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-neutral-200/80 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transition-all duration-300 relative flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            
            {/* Bouton fermer */}
            <button 
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors z-10"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Colonne Gauche (Image & Badges) */}
            <div className="w-full md:w-1/2 bg-[#eef1f3] flex items-center justify-center p-8 relative border-b md:border-b-0 md:border-r border-neutral-150 shrink-0 min-h-[300px]">
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                <span className={`px-2 py-1 rounded-full text-[8px] font-black tracking-wide uppercase ${previewProduct.badge1.color || 'bg-[#2d6a0f] text-white'}`}>
                  {previewProduct.badge1.text}
                </span>
                {previewProduct.badge2 && (
                  <span className="px-2 py-1 rounded-full text-[8px] font-black tracking-wide uppercase bg-white text-neutral-800 shadow-sm border border-neutral-100">
                    {previewProduct.badge2}
                  </span>
                )}
              </div>
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={previewProduct.img} 
                alt={previewProduct.title} 
                className="w-full max-w-[220px] aspect-square object-contain mix-blend-multiply"
              />
            </div>

            {/* Colonne Droite (Détails & Specs) */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] text-[#2d6a0f] font-black uppercase tracking-widest block mb-1">
                    {previewProduct.badge2 || "Équipement EcoSphere"}
                  </span>
                  <h3 className="text-xl font-black text-neutral-900 leading-tight">
                    {previewProduct.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-500 font-semibold leading-relaxed">
                  {previewProduct.desc}
                </p>

                {/* Caractéristiques */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-neutral-800 uppercase tracking-wider">Points forts</h4>
                  <ul className="text-[10px] text-neutral-600 font-medium space-y-1.5">
                    {previewProduct.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spécifications Techniques selon le produit */}
                <div className="space-y-2 pt-2 border-t border-neutral-150">
                  <h4 className="text-[10px] font-black text-neutral-800 uppercase tracking-wider">Spécifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-[9px] text-neutral-500 font-semibold">
                    <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-150/50">
                      <span className="text-[8px] text-neutral-400 block uppercase font-bold">Alimentation</span>
                      <span>
                        {previewProduct.title.includes("Weather") ? "Solaire + Batt. Li-ion" :
                         previewProduct.title.includes("NPK") ? "Pile Lithium (5 ans)" :
                         previewProduct.title.includes("AirGuard") ? "12-24V DC / USB-C" :
                         previewProduct.title.includes("Gateway") ? "PoE (Power over Ethernet)" :
                         previewProduct.title.includes("Vision") ? "Batterie Solaire" :
                         previewProduct.title.includes("Soil Integrated") ? "12-24V DC" :
                         previewProduct.title.includes("Capacitive") ? "3.3V - 5.5V DC" : "Batterie longue durée"}
                      </span>
                    </div>
                    <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-150/50">
                      <span className="text-[8px] text-neutral-400 block uppercase font-bold">Signal / Protocole</span>
                      <span>
                        {previewProduct.title.includes("Weather") ? "LoRaWAN / 4G" :
                         previewProduct.title.includes("NPK") ? "LoRaWAN 868 MHz" :
                         previewProduct.title.includes("AirGuard") ? "LoRaWAN + Modbus" :
                         previewProduct.title.includes("Gateway") ? "Backhaul 4G/PoE/WiFi" :
                         previewProduct.title.includes("Vision") ? "4G LTE / Wi-Fi" :
                         previewProduct.title.includes("Soil Integrated") ? "Modbus RS485 (RTU)" :
                         previewProduct.title.includes("Capacitive") ? "Sortie Analogique (0-3V)" : "LoRaWAN / RTU"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action & Prix */}
              <div className="pt-4 border-t border-neutral-150 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase">Prix unitaire</p>
                  <p className="text-base font-black text-[#004e28]">
                    {previewProduct.price} DZD <span className="text-[8px] text-neutral-400 font-bold">TTC</span>
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedProduct(previewProduct);
                    setPreviewProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#004e28] hover:bg-[#003d1f] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Acheter
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
