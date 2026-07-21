'use client';

import React from 'react';
import { Card } from '@/src/components/Card/Card';
import { Badge } from '@/src/components/Badge/Badge';
import { Button } from '@/src/components/Button/Button';
import styles from './page.module.css';

export interface Site {
 id: string | number;
 title: string;
 location: string;
 status: string;
 statusType: string;
 risk: string;
 riskColor: string;
 icon: string;
 iconBg: string;
 image: string;
 metrics: { label: string; value: string }[];
 lastActive: string;
}

export default function SitesClient({ sites }: { sites: Site[] }) {
 return (
  <div className={styles.pageContainer}>
   <div className={styles.header}>
    <div>
     <h1 className={styles.pageTitle}>Gestion des Sites</h1>
     <p className={styles.pageSubtitle}>Surveillez et gérez vos déploiements environnementaux en temps réel.</p>
    </div>
    <Button style={{ backgroundColor: '#047857', color: 'white' }}>+ Ajouter un site</Button>
   </div>

   <div className={styles.filtersBar}>
    <div className={styles.filters}>
     <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>🔍</span>
      <input
       type="text"
       placeholder="Rechercher un site, une région..."
       className={styles.searchInput}
      />
     </div>
     <select className={styles.filterSelect}>
      <option>Tous les statuts</option>
     </select>
     <select className={styles.filterSelect}>
      <option>Technologie</option>
     </select>
    </div>
    <div className={styles.viewToggle}>
     <button className={styles.toggleBtnActive}>⊞</button>
     <button className={styles.toggleBtn}>≡</button>
    </div>
   </div>

   <div className={styles.sitesGrid}>
    {sites.map(site => (
     <Card key={site.id} padding="none"className={styles.siteCard}>
      <div
       className={styles.siteImage}
       style={{ background: site.image }}
      >
       {/* Optional: Add gradient overlay or small tags on image if needed */}
      </div>

      <div className={styles.siteContent}>
       <div className={styles.siteTopRow}>
        <div
         className={styles.siteIcon}
         style={{ backgroundColor: site.iconBg }}
        >
         {site.icon}
        </div>
        <div className={styles.statusCol}>
         <Badge variant={site.statusType as any}>{site.status}</Badge>
         <span className={styles.riskLabel} style={{ color: site.riskColor }}>{site.risk}</span>
        </div>
       </div>

       <h3 className={styles.siteTitle}>{site.title}</h3>
       <p className={styles.siteLocation}>
        <span className={styles.locIcon}>📍</span> {site.location}
       </p>

       <div className={styles.metricsGrid}>
        {site.metrics.map((metric, idx) => (
         <div key={idx} className={styles.metricCard}>
          <span className={styles.metricLabel}>{metric.label}</span>
          <span className={styles.metricValue}>{metric.value}</span>
         </div>
        ))}
       </div>

       <div className={styles.siteFooter}>
        <span className={styles.lastActive}>Dernière activité: {site.lastActive}</span>
        <div className={styles.actionIcons}>
         <button className={styles.iconBtn} style={{ color: '#10b981' }}>✎</button>
         <button className={styles.iconBtn} style={{ color: '#ef4444' }}>🗑</button>
         <button className={styles.iconBtn} style={{ color: '#10b981' }}>→</button>
        </div>
       </div>
      </div>
     </Card>
    ))}
   </div>
  </div>
 );
}
