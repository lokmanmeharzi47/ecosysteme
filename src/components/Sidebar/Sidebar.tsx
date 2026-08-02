'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { name: "Vue d'ensemble", path: "/dashboard", icon: "⊞" },
  { name: "Mes sites", path: "/mes-sites", icon: "📍" },
  { name: "Capteurs", path: "/capteurs", icon: "((•))" },
  { name: "Cartographie", path: "/cartographie", icon: "🗺" },
  { name: "Centre IA", path: "/centre-ia", icon: "🧠" },
  { name: "Alertes", path: "/alertes", icon: "⚠" },
  { name: "Rapports", path: "/rapports", icon: "📄" },
  { name: "Historique", path: "/historique", icon: "↺" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer} style={{ display: 'flex', justifyContent: 'center' }}>
        <Link href="/dashboard" className={styles.logo}>
          <Image 
            src="/logo-new.png" 
            alt="Ecosystem Monitoring Logo" 
            width={160} 
            height={160} 
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>
      
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.path} 
                className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.bottomNav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/aide" className={styles.navItem}>
              <span className={styles.icon}>❓</span>
              Aide
            </Link>
          </li>
          <li>
            <Link href="/" className={styles.navItem}>
              <span className={styles.icon}>↪</span>
              Déconnexion
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
