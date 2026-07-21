'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Leaf } from 'lucide-react';
import { AccordionItem } from '@/src/components/Accordion/Accordion';
import styles from './page.module.css';

export default function Contact() {
  const faqs = [
    { question: "Comment demander une démonstration en direct ?", answer: "Vous pouvez demander une démonstration en remplissant le formulaire ci-dessus." },
    { question: "Quel est le délai de réponse du support technique ?", answer: "Notre équipe répond généralement sous 24 heures ouvrées." },
    { question: "Proposez-vous des installations sur site en dehors d'Alger ?", answer: "Oui, nous proposons des installations sur tout le territoire national." }
  ];

  return (
    <div className={styles.contactPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroLogoContainer}>
            <Image
              src="/logo-new.png"
              alt="Ecosystem Logo"
              width={54}
              height={54}
              className={styles.heroLogo}
              priority
            />
          </div>
          <div className={styles.heroTitle}>ECOSYSTEM</div>
          <p className={styles.heroSubtitle}>INTELLIGENCE ENVIRONNEMENTALE</p>

          <h1 className={styles.heroHeading}>Contactez l&apos;Intelligence Environnementale</h1>
          <p className={styles.heroDescription}>
            Nos experts AIoT sont prêts à vous accompagner dans vos projets de surveillance et de durabilité.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🌿</span>
              <span className={styles.featureText}>Smart Monitoring</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📡</span>
              <span className={styles.featureText}>Real-Time Data</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🧠</span>
              <span className={styles.featureText}>AI Predictions</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🛡️</span>
              <span className={styles.featureText}>Sustainable Decisions</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={styles.splitLayout}>
          {/* Form Column */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Nom complet</label>
                    <input type="text" placeholder="Mohamed Mokrani" className={styles.inputField} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Entreprise</label>
                    <input type="text" placeholder="Ex: EcoSystems" className={styles.inputField} />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Adresse email</label>
                  <input type="email" placeholder="contact@entreprise.com" className={styles.inputField} />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Sujet</label>
                  <input type="text" placeholder="Demande de démonstration" className={styles.inputField} />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Votre message</label>
                  <textarea rows={4} placeholder="Comment pouvons-nous vous aider ?" className={styles.inputField}></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

          {/* Info Column */}
          <div className={styles.infoCol}>
            <h2 className={styles.infoTitle}>Informations de contact</h2>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}><Mail size={24} /></div>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue}>ecosystems.monitoring.dz@gmail.com</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}><Phone size={24} /></div>
                <div>
                  <div className={styles.infoLabel}>Téléphone</div>
                  <div className={styles.infoValue}>0790 08 92 75</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}><MapPin size={24} /></div>
                <div>
                  <div className={styles.infoLabel}>Adresse</div>
                  <div className={styles.infoValue}>USTHB, Bab Ezzouar, Alger 16111, Algérie</div>
                </div>
              </div>
            </div>

            <div className={styles.socialsSection}>
              <h3 className={styles.socialsLabel}>Suivez-nous</h3>
              <div className={styles.socialsList}>
                <a href="https://www.facebook.com/profile.php?id=61591699850139" className={styles.socialIcon} aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.instagram.com/eco18261?igsh=Z2hsczRlZ2sxYmgx" className={styles.socialIcon} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

            <div className={styles.quoteCard}>
              L'intelligence environnementale au service d'un avenir durable. Notre équipe répond sous 24 heures ouvrées.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <h2 className={styles.sectionTitleCenter}>Où nous trouver</h2>
        <div className={styles.mapVisualContainer}>
          <div className={styles.mapPin}>
            <div className={styles.pinIcon}><Leaf size={24} /></div>
            <div className={styles.pinLabel}>Ecosystem HQ Algiers</div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitleCenter}>Questions fréquentes</h2>
        <div className={styles.faqContainer}>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} title={faq.question}>
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </section>
    </div>
  );
}
