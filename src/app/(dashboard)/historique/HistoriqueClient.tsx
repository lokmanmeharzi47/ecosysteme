'use client';

import React, { useState } from 'react';
import { Card } from '@/src/components/Card/Card';
import { Button } from '@/src/components/Button/Button';
import { Badge } from '@/src/components/Badge/Badge';
import { Select } from '@/src/components/FormElements/FormElements';
import styles from './page.module.css';

interface TableRow {
  date: string;
  sensor: string;
  subtitle: string;
  site: string;
  value: string;
  network: number;
  battery: number;
  status: string;
}

export default function HistoriqueClient({ initialData }: { initialData: TableRow[] }) {
 const [activeTab, setActiveTab] = useState('Lectures des capteurs');

 const tabs = [
  'Lectures des capteurs',
  'Alertes',
  'Maintenance',
  'Activités utilisateur',
  'Rapports générés'
 ];

 return (
  <div className={styles.pageContainer}>
   <div className={styles.header}>
    <div>
     <h1 className={styles.pageTitle}>Historique</h1>
     <p className={styles.pageSubtitle}>Consultez les données archivées, événements et activités de vos sites</p>
    </div>
    <div className={styles.headerActions}>
     <Button variant="outline" icon="🔖" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
      Enregistrer cette vue
     </Button>
     <Button icon="📥">Exporter les données</Button>
    </div>
   </div>

   <div className={styles.tabsContainer}>
    {tabs.map((tab) => (
     <button
      key={tab}
      className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
      onClick={() => setActiveTab(tab)}
     >
      {tab}
     </button>
    ))}
   </div>

   <Card className={styles.filterCard} padding="lg">
    <div className={styles.filtersGrid}>
     <div className={styles.filterItem}>
      <label className={styles.filterLabel}>PÉRIODE</label>
      <Select id="periode" options={[{ value: '24h', label: 'Dernières 24 heures' }]} />
     </div>
     <div className={styles.filterItem}>
      <label className={styles.filterLabel}>SITE</label>
      <Select id="site" options={[{ value: 'tous', label: 'Tous les sites' }]} />
     </div>
     <div className={styles.filterItem}>
      <label className={styles.filterLabel}>CAPTEUR / TYPE</label>
      <Select id="capteur" options={[{ value: 'tous', label: 'Tous les types' }]} />
     </div>
     <div className={styles.filterItem}>
      <label className={styles.filterLabel}>RISQUE / STATUT</label>
      <Select id="statut" options={[{ value: 'tous', label: 'Tous les statuts' }]} />
     </div>
    </div>
    <div className={styles.filterActions}>
     <button className={styles.resetBtn}>Réinitialiser</button>
     <Button>Appliquer</Button>
    </div>
   </Card>

   <div className={styles.mainContent}>
    <Card className={styles.tableCard} padding="none">
     <div className={styles.tableHeader}>
      <h2 className={styles.tableTitle}>Dernières lectures enregistrées</h2>
      <div className={styles.realtimeToggle}>
       <span className={styles.statusDotActive}></span> Temps réel activé
      </div>
     </div>

     <div className={styles.tableWrapper}>
      <table className={styles.dataTable}>
       <thead>
        <tr>
         <th>Date et heure</th>
         <th>Capteur</th>
         <th>Site</th>
         <th>Valeur</th>
         <th>Réseau</th>
         <th>Statut</th>
        </tr>
       </thead>
       <tbody>
        {initialData.map((row, idx) => (
         <tr key={idx}>
          <td className={styles.dateCell}>{row.date}</td>
          <td>
           <div className={styles.sensorName}>{row.sensor}</div>
           <div className={styles.sensorType}>{row.subtitle}</div>
          </td>
          <td className={styles.siteCell}>{row.site}</td>
          <td className={styles.valueCell} style={{ color: row.status === 'Alerte Seuil' ? 'var(--color-error)' : row.status === 'Optimal' ? 'var(--color-primary)' : 'var(--color-text-main)' }}>
           {row.value}
          </td>
          <td>
           <div className={styles.networkIcons}>
            <span className={styles.signalIcon}>
             {row.network === 3 ? '📶' : row.network === 2 ? '📶' : '📶'}
            </span>
            <span className={styles.batteryIcon} style={{ color: row.battery === 0 ? 'var(--color-error)' : 'var(--color-primary)' }}>
             {row.battery === 1 ? '🔋' : '🪫'}
            </span>
           </div>
          </td>
          <td>
           <Badge variant={row.status === 'Optimal' ? 'success' : row.status === 'Neutre' ? 'neutral' : 'error'}>
            {row.status}
           </Badge>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>

     <div className={styles.pagination}>
      <div className={styles.pageInfo}>Affichage de 1-{Math.min(4, initialData.length)} sur {initialData.length} entrées</div>
      <div className={styles.pageControls}>
       <button className={styles.pageBtn}>‹</button>
       <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
       <button className={styles.pageBtn}>›</button>
      </div>
     </div>
    </Card>

    <div className={styles.sideContent}>
     <Card className={styles.evolutionCard} padding="lg">
      <div className={styles.evolutionHeader}>
       <div>
        <h3 className={styles.evolutionTitle}>Évolution</h3>
        <p className={styles.evolutionSubtitle}>Dernières 24h - Site Mitidja</p>
       </div>
       <Badge variant="neutral" className={styles.typeBadge}>TEMP/HUM</Badge>
      </div>

      <div className={styles.chartLegend}>
       <div className={styles.legendBadge}><span className={styles.dotTemp}></span> Temp: 26.4°C</div>
       <div className={styles.legendBadge}><span className={styles.dotHum}></span> Hum: 39%</div>
      </div>

      <div className={styles.chartArea}>
       <svg viewBox="0 0 100 50" className={styles.chartSvg}>
        <path d="M0,40 Q10,35 20,38 T40,30 T60,10 T80,40 T100,20" fill="none" stroke="#047857" strokeWidth="1.5"/>
        <path d="M0,35 Q10,40 20,45 T40,40 T60,35 T80,25 T100,15" fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="2 2"/>
       </svg>
      </div>

      <div className={styles.evolutionStats}>
       <div>
        <div className={styles.evoStatLabel}>PIC TEMPÉRATURE</div>
        <div className={styles.evoStatValueTemp}>28.1°C</div>
       </div>
       <div style={{ textAlign: 'right' }}>
        <div className={styles.evoStatLabel}>MOYENNE HUM.</div>
        <div className={styles.evoStatValueHum}>41.5%</div>
       </div>
      </div>
     </Card>
    </div>
   </div>

   <div className={styles.aiBanner}>
    <div className={styles.aiBannerIcon}>
     <span>⚙</span>
    </div>
    <div className={styles.aiBannerContent}>
     <h3 className={styles.aiBannerTitle}>Analyse prédictive de l'historique</h3>
     <p className={styles.aiBannerText}>
      L'IA TerraMonitor a analysé les 30 derniers jours. Tendance : Hausse d'acidité de 0.2 pH observée en zone B. <span className={styles.aiBannerHighlight}>Recommandation : Vérifier le système d'irrigation avant lundi.</span>
     </p>
    </div>
    <Button style={{ backgroundColor: '#047857', color: 'white' }}>Générer Rapport IA</Button>
   </div>
  </div>
 );
}
