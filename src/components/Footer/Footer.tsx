import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brandColumn}>
          <div className={styles.logo}>
            <span className={styles.logoText}>
              <span className={styles.logoBold}>Ecosystem</span> <span style={{ color: '#173665' }}>Monitoring</span>
            </span>
          </div>
          <p className={styles.description}>
            Expertise technologique au service de la biodiversité et de la transition écologique en Afrique du Nord.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/profile.php?id=61591699850139" className={styles.socialIcon} aria-label="instagram">
              <div className={styles.iconCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
            </a>
            <a href="https://www.instagram.com/eco18261?igsh=Z2hsczRlZ2sxYmgx" className={styles.socialIcon} aria-label="Facebook">
              <div className={styles.iconCircle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </a>
          </div>

        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.columnTitle}>Plateforme</h4>
          <Link href="/solutions" className={styles.link}>Surveillance IoT</Link>
          <Link href="/solutions" className={styles.link}>Analyse IA</Link>
          <Link href="/solutions" className={styles.link}>Alerte Précoce</Link>
          <Link href="/solutions" className={styles.link}>Intégration API</Link>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.columnTitle}>Secteurs</h4>
          <Link href="/secteurs#agriculture" className={styles.link}>Agriculture</Link>
          <Link href="/secteurs#foresterie" className={styles.link}>Foresterie</Link>
          <Link href="/secteurs#industrie" className={styles.link}>Industrie</Link>
          <Link href="/secteurs#villes-vertes" className={styles.link}>Villes Vertes</Link>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.columnTitle}>Contact</h4>
          <div className={styles.contactItem}>
            <span>✉</span> ecosystems.monitoring.dz@gmail.com
          </div>
          <div className={styles.contactItem}>
            <span>⚲</span> USTHB, Bab Ezzouar, Alger 16111, Algérie
          </div>
          <div className={styles.contactItem}>
            <span>☎</span> 0790 08 92 75
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContent}`}>
          <p>© 2024 Ecosystem Monitoring AI&T. Tous droits réservés.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/support">Support</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
