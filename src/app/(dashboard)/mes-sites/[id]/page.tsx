'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/src/components/Card/Card';
import { Badge } from '@/src/components/Badge/Badge';
import { Button } from '@/src/components/Button/Button';
import styles from './page.module.css';

export default function SiteDetails({ params }: { params: { id: string } }) {
 // In a real app, use the `params.id` to fetch the site data.
 // For the UI, we'll hardcode the"Ferme intelligente de Mitidja"info.

 const kpis = [
  { label:"Capteurs actifs", value:"17", max:"/18", icon:"((•))", color:"var(--color-primary)"},
  { label:"Température", value:"26,4 °C", icon:"🌡", color:"var(--color-error)"},
  { label:"Humidité sol", value:"42%", icon:"💧", color:"var(--color-primary)"},
  { label:"Niveau d'eau", value:"78%", icon:"🛢", color:"var(--color-primary)"},
  { label:"Alertes ouvertes", value:"2", icon:"⚠", color:"var(--color-error)"}
 ];

 const envParams = [
  { label:"NPK (Azote/Phosph/Potas)", value:"72 / 38 / 180", icon:"🌱"},
  { label:"Vitesse du vent", value:"12 km/h", icon:"💨"},
  { label:"Niveau réservoir", value:"78%", icon:"🛢"}
 ];

 const recentAlerts = [
  { type:"error", title:"Humidité faible B", desc:"Parcelle B - Il y a 10 min", icon:"⚠"},
  { type:"success", title:"Batterie faible SOL-B-04", desc:"18% restant - Il y a 45 min", icon:"🔋"},
  { type:"primary", title:"Irrigation recommandée D", desc:"Suggéré par AI - Il y a 2h", icon:"ℹ"}
 ];

 const criticalSensors = [
  { id:"TEMP-A-01", type:"Température", parcel:"Parcelle A", value:"26.4°C", battery:"94%", status:"OK"},
  { id:"HUM-A-02", type:"Humidité Air", parcel:"Parcelle A", value:"58%", battery:"82%", status:"OK"},
  { id:"SOL-B-04", type:"Humidité Sol", parcel:"Parcelle B", value:"42%", battery:"18%", status:"ALERTE"},
  { id:"PH-C-03", type:"pH Sol", parcel:"Parcelle C", value:"6.8", battery:"91%", status:"OK"},
  { id:"WATER-01", type:"Niveau d'eau", parcel:"Global", value:"78%", battery:"99%", status:"OK"}
 ];

 return (
  <div className={styles.pageContainer}>
   <div className={styles.breadcrumb}>
    <Link href="/mes-sites"className={styles.breadcrumbLink}>Mes sites</Link>
    <span className={styles.breadcrumbSeparator}>›</span>
    <span className={styles.breadcrumbCurrent}>Ferme intelligente de Mitidja</span>
   </div>

   <div className={styles.header}>
    <div>
     <div className={styles.titleRow}>
      <h1 className={styles.pageTitle}>Ferme intelligente de Mitidja</h1>
      <Badge variant="success">Actif</Badge>
      <Badge variant="neutral">Risque faible</Badge>
     </div>
     <div className={styles.subtitleRow}>
      <span>📍 Mitidja, Blida, Algérie</span>
      <span>⏱ Dernière synchronisation il y a 2 min</span>
     </div>
    </div>
    <div className={styles.headerActions}>
     <Button variant="outline"icon="✏">Modifier le site</Button>
     <Button icon="📄">Générer un rapport</Button>
    </div>
   </div>

   <div className={styles.kpiGrid}>
    {kpis.map((kpi, idx) => (
     <Card key={idx} className={styles.kpiCard}>
      <div className={styles.kpiHeader}>
       <span className={styles.kpiLabel}>{kpi.label}</span>
      </div>
      <div className={styles.kpiBody}>
       <div className={styles.kpiValueWrap}>
        <span className={styles.kpiValue} style={{ color: kpi.label === 'Alertes ouvertes' ? kpi.color : 'var(--color-text-main)' }}>
         {kpi.value}
        </span>
        {kpi.max && <span className={styles.kpiMax}>{kpi.max}</span>}
       </div>
       <span className={styles.kpiIcon} style={{ color: kpi.color }}>{kpi.icon}</span>
      </div>
     </Card>
    ))}
   </div>

   <div className={styles.mainLayout}>
    <div className={styles.leftCol}>
     <Card padding="none"className={styles.mapCard}>
      <div className={styles.mapArea}>
       {/* Map background placeholder */}
       <div className={styles.mapControls}>
        <button className={styles.mapBtn}>+</button>
        <button className={styles.mapBtn}>-</button>
        <button className={styles.mapBtn}>◎</button>
       </div>
       <div className={styles.mapTopBadge}>
        <Badge variant="neutral"style={{ backgroundColor: 'white', color: 'black' }}>120 hectares surveillés</Badge>
       </div>

       {/* Simulated Parcels */}
       <div className={styles.parcelA}>Parcelle A</div>
       <div className={styles.parcelB}>Parcelle B</div>

       <div className={styles.mapLegend}>
        <div className={styles.legendTitle}>LÉGENDE</div>
        <div className={styles.legendItem}><span className={styles.dotOptimal}></span> Optimal</div>
        <div className={styles.legendItem}><span className={styles.dotAlert}></span> Stress hydrique</div>
        <div className={styles.legendItem}><span className={styles.dotSensor}></span> Capteur LoRaWAN</div>
       </div>
      </div>
     </Card>

     <div className={styles.miniStatsGrid}>
      <Card className={styles.miniStatCard}>
       <span className={styles.miniStatIcon} style={{ color: 'var(--color-primary)' }}>🌡</span>
       <span className={styles.miniStatLabel}>Température</span>
       <span className={styles.miniStatValue}>26,4°C</span>
      </Card>
      <Card className={styles.miniStatCard}>
       <span className={styles.miniStatIcon} style={{ color: 'var(--color-primary)' }}>💧</span>
       <span className={styles.miniStatLabel}>Humidité air</span>
       <span className={styles.miniStatValue}>58%</span>
      </Card>
      <Card className={`${styles.miniStatCard} ${styles.miniStatAlert}`}>
       <span className={styles.miniStatIcon} style={{ color: 'var(--color-error)' }}>⚗</span>
       <span className={styles.miniStatLabel}>Humidité sol</span>
       <span className={styles.miniStatValueError}>42%</span>
       <span className={styles.miniStatSubtext}>À SURVEILLER</span>
      </Card>
      <Card className={styles.miniStatCard}>
       <span className={styles.miniStatIcon} style={{ color: 'var(--color-primary)' }}>🧪</span>
       <span className={styles.miniStatLabel}>pH sol</span>
       <span className={styles.miniStatValue}>6,8</span>
      </Card>
     </div>

     <Card className={styles.chartCard} padding="lg">
      <div className={styles.chartHeader}>
       <h3 className={styles.chartTitle}>Évolution sur 24h</h3>
       <Badge variant="neutral">Dernières 24 heures</Badge>
      </div>
      <div className={styles.chartArea}>
       <div className={styles.chartBars}>
        {/* CSS Art representation */}
        {Array.from({ length: 12 }).map((_, i) => (
         <div key={i} className={styles.chartBar} style={{ height: `${30 + Math.random() * 60}%` }}></div>
        ))}

        {/* Simulated line chart over bars */}
        <svg viewBox="0 0 100 100"preserveAspectRatio="none"className={styles.chartLine}>
         <path d="M0,50 L10,60 L20,40 L30,55 L40,30 L50,45 L60,20 L70,35 L80,25 L90,40 L100,20"fill="none"stroke="#d1d5db"strokeWidth="2"/>
        </svg>
       </div>
       <div className={styles.chartXAxis}>
        <span>00:00</span>
        <span>04:00</span>
        <span>08:00</span>
        <span>12:00</span>
        <span>16:00</span>
        <span>20:00</span>
        <span>23:59</span>
       </div>
      </div>
     </Card>
    </div>

    <div className={styles.rightCol}>
     <Card className={styles.aiPanel} padding="lg">
      <div className={styles.aiPanelHeader}>
       <span className={styles.aiPanelIcon}>✨ ANALYSE IA</span>
      </div>
      <h2 className={styles.aiPanelTitle}>Risque modéré de stress hydrique</h2>
      <div className={styles.aiPanelScore}>
       <span className={styles.aiPanelScoreValue}>68%</span>
       <span className={styles.aiPanelScoreText}>Probabilité calculée pour les 24h</span>
      </div>
      <p className={styles.aiPanelDesc}>
       Les zones Parcelle B et <strong>Parcelle D</strong> montrent des signes précoces de sécheresse. Une irrigation ciblée de 15 min est recommandée entre 22h et 04h.
      </p>
      <div className={styles.aiPanelActions}>
       <Button fullWidth style={{ backgroundColor: 'white', color: 'var(--color-primary)', marginBottom: '8px' }}>
        Planifier l'irrigation
       </Button>
       <Button fullWidth variant="outline"style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
        Voir les détails
       </Button>
      </div>
     </Card>

     <Card padding="lg"className={styles.paramsCard}>
      <h3 className={styles.sidebarSectionTitle}>PARAMÈTRES ENVIRONNEMENTAUX</h3>
      <div className={styles.paramsList}>
       {envParams.map((param, idx) => (
        <div key={idx} className={styles.paramItem}>
         <div className={styles.paramLabelWrap}>
          <span className={styles.paramIcon}>{param.icon}</span>
          <span className={styles.paramLabel}>{param.label}</span>
         </div>
         <span className={styles.paramValue}>{param.value}</span>
        </div>
       ))}
      </div>
     </Card>

     <Card padding="lg"className={styles.alertsCard}>
      <div className={styles.alertsHeader}>
       <h3 className={styles.sidebarSectionTitle}>ALERTES RÉCENTES</h3>
       <Badge variant="error"style={{ fontSize: '0.65rem' }}>3 NOUVELLES</Badge>
      </div>
      <div className={styles.alertsList}>
       {recentAlerts.map((alert, idx) => (
        <div key={idx} className={`${styles.alertItem} ${styles[`alert_${alert.type}`]}`}>
         <div className={styles.alertIconWrapper}>
          <span className={styles.alertIcon}>{alert.icon}</span>
         </div>
         <div className={styles.alertContent}>
          <div className={styles.alertTitle}>{alert.title}</div>
          <div className={styles.alertDesc}>{alert.desc}</div>
         </div>
        </div>
       ))}
      </div>
      <div className={styles.viewAllAlerts}>
       Voir toutes les alertes
      </div>
     </Card>
    </div>
   </div>

   <Card padding="none"className={styles.tableCard}>
    <div className={styles.tableHeader}>
     <h3 className={styles.tableTitle}>Top 5 Capteurs Critiques</h3>
     <a href="#"className={styles.viewAllLink}>Voir tous les capteurs ➔</a>
    </div>
    <div className={styles.tableWrapper}>
     <table className={styles.dataTable}>
      <thead>
       <tr>
        <th>Identifiant</th>
        <th>Type</th>
        <th>Parcelle</th>
        <th>Valeur</th>
        <th>Batterie</th>
        <th>Statut</th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {criticalSensors.map((sensor, idx) => (
        <tr key={idx}>
         <td className={styles.idCell}>{sensor.id}</td>
         <td>{sensor.type}</td>
         <td>{sensor.parcel}</td>
         <td className={styles.valCell}>{sensor.value}</td>
         <td>
          <span className={styles.batteryIcon} style={{ color: sensor.status === 'ALERTE' ? 'var(--color-error)' : 'var(--color-primary)' }}>
           {sensor.battery === '18%' ? '🪫' : '🔋'}
          </span> {sensor.battery}
         </td>
         <td>
          <Badge variant={sensor.status === 'OK' ? 'success' : 'error'}>{sensor.status}</Badge>
         </td>
         <td className={styles.actionCell}>⋮</td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   </Card>
  </div>
 );
}
