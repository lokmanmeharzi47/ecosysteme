'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/src/components/Card/Card';
import { Badge } from '@/src/components/Badge/Badge';
import { Button } from '@/src/components/Button/Button';
import { AccordionItem } from '@/src/components/Accordion/Accordion';
import { X, Check, Loader2, Sparkles, Building, CreditCard } from 'lucide-react';
import styles from './page.module.css';

export default function Tarification() {
  const [annual, setAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    managerName: '',
    email: '',
    phone: '',
    paymentMethod: 'transfer', // transfer or card
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    estimatedSensors: '10-50',
    message: ''
  });

  const closeModal = () => {
    setSelectedPlan(null);
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({
      orgName: '',
      managerName: '',
      email: '',
      phone: '',
      paymentMethod: 'transfer',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      estimatedSensors: '10-50',
      message: ''
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName || !formData.managerName || !formData.email || !formData.phone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const plans = [
    {
      name: "Starter",
      desc: "Pour les petits sites et pilotes",
      price: annual ? "2 900 DA" : "290 DA",
      period: annual ? "/an" : "/mois",
      features: [
        "Jusqu'à 10 capteurs",
        "SIG Basique",
        "Alertes Standard",
        "Support Email"
      ],
      button: "Choisir Starter",
      variant: "light"
    },
    {
      name: "Professional",
      desc: "Pour les entreprises en croissance",
      price: annual ? "5 000 DA" : "500 DA",
      period: annual ? "/an" : "/mois",
      features: [
        "Jusqu'à 50 capteurs",
        "Analyse IA Avancées",
        "SIG 3D & Cartographie",
        "Intégration Drones",
        "Support 24/7"
      ],
      button: "Commencer l'essai gratuit",
      variant: "dark",
    },
    {
      name: "Enterprise",
      desc: "Pour les organisations globales",
      price: "Sur mesure",
      period: "",
      features: [
        "Capteurs illimités",
        "Surveillance Satellite",
        "Accès API complet",
        "Manager de compte dédié",
        "SLA personnalisé"
      ],
      button: "Contacter l'équipe",
      variant: "light"
    }
  ];

  const comparisonData = [
    { feature: "Rétention de données", starter: "3 mois", pro: "12 mois", ent: "Illimité" },
    { feature: "Nombre d'utilisateurs", starter: "5 utilisateurs", pro: "15 utilisateurs", ent: "Illimité" },
    { feature: "Fréquence des rapports", starter: "Hebdomadaire", pro: "Quotidien", ent: "Temps Réel" },
    { feature: "Analyse IA prédictive", starter: "—", pro: "✓", ent: "✓" },
    { feature: "Données Drone & Satellite", starter: "—", pro: "Partiel (Drone)", ent: "Complet" },
    { feature: "Tableaux de bord personnalisés", starter: "Standard", pro: "Jusqu'à 5", ent: "Illimité" },
  ];

  const faqs = [
    { question: "Quels types de capteurs sont compatibles ?", answer: "Nous supportons la majorité des capteurs IoT via MQTT et LoraWAN." },
    { question: "Comment mes données sont-elles sécurisées (RGPD) ?", answer: "Toutes nos données sont chiffrées de bout en bout et hébergées sur des serveurs certifiés." },
    { question: "Proposez-vous des services d'installation sur site ?", answer: "Oui, nos équipes techniques peuvent se déplacer selon votre plan." }
  ];

  const checkSvg = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <div className={styles.topBadgeWrap}>
          <div className={styles.topBadge}>Tarification Transparente</div>
        </div>
        <h1 className={styles.heroTitle}>Une intelligence des données accessible à tous.</h1>
        <p className={styles.heroSubtitle}>
          Choisissez le plan adapté à vos ambitions environnementales. De l'expérimentation locale à la surveillance satellitaire globale.
        </p>

        <div className={styles.toggleContainer}>
          <span className={`${styles.toggleLabel} ${!annual ? styles.activeLabel : ''}`}>Facturation mensuelle</span>
          <div
            className={`${styles.toggleSwitch} ${annual ? styles.toggleOn : styles.toggleOff}`}
            onClick={() => setAnnual(!annual)}
          >
            <div className={styles.toggleKnob}></div>
          </div>
          <span className={`${styles.toggleLabel} ${annual ? styles.activeLabel : ''}`}>Facturation annuelle</span>
          <div className={styles.savingBadge}>-20% d'économie</div>
        </div>

        <div className={styles.pricingGrid}>
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              padding="lg"
              className={`${styles.pricingCard} ${plan.variant === 'dark' ? styles.cardDark : styles.cardLight}`}
            >

              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.desc}</p>
                <div className={styles.planPriceWrap}>
                  <span className={styles.planPrice}>{plan.price}</span>
                  {plan.period && <span className={styles.planPeriod}>{plan.period}</span>}
                </div>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className={styles.featureItem}>
                    <span className={styles.checkIcon}>{checkSvg}</span> 
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.btnWrapper}>
                {plan.name === 'Enterprise' ? (
                  <Link href="/contact" className="w-full">
                    <Button 
                      variant="outline" 
                      fullWidth 
                      style={{ borderColor: '#006633', color: '#006633', fontWeight: 600 }}
                    >
                      {plan.button}
                    </Button>
                  </Link>
                ) : plan.variant === 'dark' ? (
                  <Button 
                    onClick={() => setSelectedPlan(plan)}
                    fullWidth 
                    style={{ backgroundColor: 'white', color: '#006633', fontWeight: 600 }}
                  >
                    {plan.button}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setSelectedPlan(plan)}
                    variant="outline" 
                    fullWidth 
                    style={{ borderColor: '#006633', color: '#006633', fontWeight: 600 }}
                  >
                    {plan.button}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitleCenter}>Comparaison détaillée</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th>Fonctionnalités</th>
                <th>Starter</th>
                <th>Professional</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx}>
                  <td className={styles.featureCell}>{row.feature}</td>
                  <td>{row.starter === '—' ? <span className={styles.dash}>—</span> : row.starter === '✓' ? <span className={styles.tableCheck}>{checkSvg}</span> : row.starter}</td>
                  <td className={styles.proCell}>{row.pro === '—' ? <span className={styles.dash}>—</span> : row.pro === '✓' ? <span className={styles.tableCheck}>{checkSvg}</span> : row.pro}</td>
                  <td className={styles.entCell}>{row.ent === '—' ? <span className={styles.dash}>—</span> : row.ent === '✓' ? <span className={styles.tableCheck}>{checkSvg}</span> : row.ent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitleCenter}>Questions Fréquentes</h2>
        <div className={styles.accordionWrapper}>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} title={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Prêt à commencer ?</h2>
          <p className={styles.ctaDesc}>Rejoignez les leaders du changement environnemental positif.</p>
          <div className={styles.ctaActions}>
            <Link href="/demander-demo">
              <Button style={{ backgroundColor: '#86efac', color: '#006633', fontWeight: 600, border: 'none', padding: '12px 24px' }}>Demander une démo</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" style={{ borderColor: 'white', color: 'white', fontWeight: 600, padding: '12px 24px' }}>Nous contacter</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MODAL DE SOUSCRIPTION / DEVIS (PREMIUM CHECKOUT) ─── */}
      {selectedPlan && (
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
              <form onSubmit={handleSubscribe} className="p-6 md:p-8 flex flex-col space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-150">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#006633] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-neutral-900 leading-tight">
                      {selectedPlan.name === 'Enterprise' ? 'Demande de devis Enterprise' : 'Souscription au plan ' + selectedPlan.name}
                    </h3>
                    <p className="text-[10px] text-neutral-450 font-semibold">EcoSphere Intelligence Environnementale</p>
                  </div>
                </div>

                {/* Résumé du Plan */}
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-2xl border border-neutral-150">
                  <div>
                    <h4 className="text-xs font-black text-[#006633]">{selectedPlan.name}</h4>
                    <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">{selectedPlan.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-neutral-900">{selectedPlan.price}</p>
                    <p className="text-[8px] text-neutral-400 font-bold uppercase">{selectedPlan.period ? (annual ? 'Facturé annuellement' : 'Facturé mensuellement') : 'Sur mesure'}</p>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Organisation / Entreprise *</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                        <input 
                          required
                          type="text" 
                          placeholder="Ex: AgriSmart Dz" 
                          value={formData.orgName}
                          onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                          className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 focus:border-[#006633] transition-all font-semibold text-neutral-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Nom du Gestionnaire *</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Yacine Ben" 
                        value={formData.managerName}
                        onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 focus:border-[#006633] transition-all font-semibold text-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Adresse email *</label>
                      <input 
                        required
                        type="email" 
                        placeholder="contact@agrismart.dz" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 focus:border-[#006633] transition-all font-semibold text-neutral-800"
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
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 focus:border-[#006633] transition-all font-semibold text-neutral-800"
                      />
                    </div>
                  </div>

                  {selectedPlan.name === 'Enterprise' ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Nombre estimé de capteurs</label>
                        <select 
                          value={formData.estimatedSensors}
                          onChange={(e) => setFormData({...formData, estimatedSensors: e.target.value})}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 focus:border-[#006633] transition-all font-semibold text-neutral-800"
                        >
                          <option value="10-50">10 à 50 capteurs</option>
                          <option value="50-200">50 à 200 capteurs</option>
                          <option value="200-1000">200 à 1000 capteurs</option>
                          <option value="1000+">Plus de 1000 capteurs</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider">Besoins spécifiques</label>
                        <textarea 
                          rows={3}
                          placeholder="Décrivez brièvement vos besoins d'intégration (satellite, drones, wilayas...)"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 focus:border-[#006633] transition-all font-semibold text-neutral-800"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Moyen de Paiement pour Starter et Pro */}
                      <div className="space-y-2 pt-1">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-wider block">Mode de paiement</label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className={`flex flex-col p-2.5 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === 'transfer' ? 'border-[#006633] bg-emerald-50/20 text-[#006633]' : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'}`}>
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
                          <label className={`flex flex-col p-2.5 rounded-xl border text-center cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-[#006633] bg-emerald-50/20 text-[#006633]' : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'}`}>
                            <input 
                              type="radio" 
                              name="payment" 
                              value="card" 
                              checked={formData.paymentMethod === 'card'}
                              onChange={() => setFormData({...formData, paymentMethod: 'card'})}
                              className="sr-only"
                            />
                            <span className="text-[10px] font-black">Carte CIB / Dahabia</span>
                            <span className="text-[8px] text-neutral-450 mt-0.5 font-bold">Paiement en ligne</span>
                          </label>
                        </div>
                      </div>

                      {formData.paymentMethod === 'card' && (
                        <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="space-y-1">
                            <label className="text-[8px] font-bold text-neutral-400 uppercase">Numéro de carte CIB / Dahabia</label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <input 
                                type="text"
                                placeholder="xxxx xxxx xxxx xxxx"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                                className="w-full pl-9 pr-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 text-neutral-800"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[8px] font-bold text-neutral-400 uppercase">Expiration</label>
                              <input 
                                type="text"
                                placeholder="MM/AA"
                                value={formData.cardExpiry}
                                onChange={(e) => setFormData({...formData, cardExpiry: e.target.value})}
                                className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 text-neutral-800"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-bold text-neutral-400 uppercase">Code CVV</label>
                              <input 
                                type="text"
                                placeholder="xxx"
                                value={formData.cardCvv}
                                onChange={(e) => setFormData({...formData, cardCvv: e.target.value})}
                                className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#006633]/10 text-neutral-800"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Validation */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 bg-[#006633] hover:bg-[#004e28] disabled:bg-neutral-350 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    selectedPlan.name === 'Enterprise' ? 'Envoyer la demande de devis' : 'Confirmer la souscription'
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-250 flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                
                {selectedPlan.name === 'Enterprise' ? (
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-[#006633]">Demande reçue !</h3>
                    <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-sm">
                      Merci <strong className="text-neutral-800">{formData.managerName}</strong>. Votre demande de devis pour le plan <strong className="text-[#006633]">Enterprise</strong> a bien été enregistrée pour l'entreprise <strong className="text-neutral-800">{formData.orgName}</strong>.
                    </p>
                    <p className="text-[11px] text-neutral-450 font-semibold leading-relaxed max-w-sm">
                      Un conseiller commercial va étudier votre dossier et vous contactera sous 24 heures ouvrées à l'adresse <strong className="text-neutral-800">{formData.email}</strong> ou par téléphone.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-[#006633]">Souscription réussie !</h3>
                    <p className="text-xs text-neutral-500 font-semibold leading-relaxed max-w-sm">
                      Félicitations ! L'organisation <strong className="text-neutral-800">{formData.orgName}</strong> est désormais abonnée au plan <strong className="text-[#006633]">{selectedPlan.name}</strong>.
                    </p>
                    <p className="text-[11px] text-neutral-450 font-semibold leading-relaxed max-w-sm">
                      Un e-mail d'activation avec vos accès administrateur a été envoyé à <strong className="text-neutral-800">{formData.email}</strong>. Notre équipe support prendra contact avec vous pour orchestrer la calibration de vos {selectedPlan.name === 'Starter' ? '10' : '50'} capteurs.
                    </p>
                  </div>
                )}
                
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-[#006633] hover:bg-[#004e28] text-white font-bold rounded-xl transition-all shadow-md text-xs"
                >
                  Fermer
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
