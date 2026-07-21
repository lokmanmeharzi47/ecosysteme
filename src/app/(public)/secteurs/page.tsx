import React from 'react';
import { Badge } from '@/src/components/Badge/Badge';
import { Card } from '@/src/components/Card/Card';
import styles from './page.module.css';

export default function Secteurs() {
  const secteurs = [
    {
      tag: "AGRICULTURE",
      title: "Précision Agricole",
      defis: "Rareté de l'eau, appauvrissement des sols.",
      solutions: "Irrigation de précision, monitoring des sols IoT.",
      resultats: "+30% d'augmentation de rendement.",
      cas: "Oliveraies de la région d'Oran.",
      img: "/secteur/1.jpg"
    },
    {
      tag: "SYLVICULTURE",
      title: "Gestion Forestière",
      defis: "Feux de forêt, exploitation illégale du bois.",
      solutions: "Capteurs acoustiques, détection satellitaire.",
      resultats: "Temps de réponse réduit à 150 secondes.",
      cas: "Protection des massifs forestiers de Kabylie.",
      img: "/secteur/3.jpg"
    },
    {
      tag: "ZONES HUMIDES",
      title: "Zones Humides",
      defis: "Perte de biodiversité, pollution des eaux.",
      solutions: "IoT qualité de l'eau, suivi aviaire en temps réel.",
      resultats: "Restauration visible des espèces locales.",
      cas: "Surveillance du lac de Réghaïa.",
      img: "/secteur/4.jpg"
    },
    {
      tag: "GOUVERNEMENT",
      badge: "NOUVEAU",
      title: "Gouvernement & Agriculture",
      defis: "Sécurité alimentaire, gestion durable des ressources agricoles et résilience climatique.",
      solutions: "Plateforme nationale de données agricoles, prévisions météo, capteurs connectés, cartographie des cultures et alertes précoces.",
      resultats: "Politiques agricoles mieux informées, production durable, gestion optimisée des ressources et autonomie alimentaire renforcée.",
      cas: "Suivi agricole national et stratégie de sécurité alimentaire.",
      img: "/secteur/6.png"
    },
    {
      tag: "INDUSTRIE",
      title: "Complexe Industriel",
      defis: "Pollution de l'air, fuites d'effluents.",
      solutions: "Qualité de l'air temps réel, capteurs chimiques.",
      resultats: "Conformité réglementaire garantie à 100%.",
      cas: "Complexe industriel de Hassi Messaoud.",
      img: "/secteur/2.jpg"
    },
    {
      tag: "COLLECTIVITÉS",
      title: "Villes Intelligentes",
      defis: "Îlots de chaleur urbains, risques d'inondation.",
      solutions: "Stations météo Smart City, SIG d'alerte crue.",
      resultats: "Atténuation majeure des risques de catastrophes.",
      cas: "Surveillance urbaine de la ville d'Alger.",
      img: "/secteur/5.jpg"
    }
  ];

  return (
    <div className={styles.secteursPage}>
      <div className="container">
        <div className={styles.header}>
          <Badge variant="success">L'intelligence au service de l'environnement</Badge>
          <h1 className={styles.title}>Secteurs d'Activité</h1>
          <p className={styles.subtitle}>Découvrez comment Ecosystem adapte ses technologies avancées pour répondre aux défis environnementaux et industriels les plus critiques de notre époque.</p>
        </div>

        <div className={styles.grid}>
          {secteurs.map((s, idx) => (
            <Card key={idx} hoverable padding="none" className={styles.card}>
              <div className={styles.cardImage} style={{ background: `url(${s.img}) center / cover no-repeat` }}>
                <div className={styles.cardTags}>
                  <Badge variant="primary" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>{s.tag}</Badge>
                  {s.badge && <Badge variant="success" style={{ backgroundColor: '#10b981', color: 'white' }}>{s.badge}</Badge>}
                </div>
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{s.title}</h2>

                <div className={styles.infoSection}>
                  <div className={styles.infoTitle}>
                    <span className={styles.infoIcon}>△</span> Défis
                  </div>
                  <p className={styles.infoText}>{s.defis}</p>
                </div>

                <div className={styles.infoSection}>
                  <div className={styles.infoTitle}>
                    <span className={styles.infoIcon}>⚡</span> Solutions
                  </div>
                  <p className={styles.infoText}>{s.solutions}</p>
                </div>

                <div className={styles.infoSection}>
                  <div className={styles.infoTitle}>
                    <span className={styles.infoIcon}>☆</span> Résultats
                  </div>
                  <p className={styles.infoText}>{s.resultats}</p>
                </div>

                <div className={styles.casUsage}>
                  <div className={styles.casLabel}>CAS D'USAGE RÉEL</div>
                  <div className={styles.casText}>{s.cas}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.ngoSection}>
          <div className={styles.ngoContent}>
            <div className={styles.ngoText}>
              <div className={styles.ngoLabel}>ONG & ORGANISATIONS</div>
              <h2 className={styles.ngoTitle}>Plaidoyer basé sur les données</h2>

              <div className={styles.ngoFeatures}>
                <div className={styles.ngoFeature}>
                  <div className={styles.ngoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  </div>
                  <div>
                    <div className={styles.ngoFeatureTitle}>Défis & Lacunes</div>
                    <div className={styles.ngoFeatureText}>Manque de données terrain, rapports d'impact difficiles à quantifier.</div>
                  </div>
                </div>
                <div className={styles.ngoFeature}>
                  <div className={styles.ngoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  </div>
                  <div>
                    <div className={styles.ngoFeatureTitle}>Analytique Avancée</div>
                    <div className={styles.ngoFeatureText}>Tableaux de bord SIG, analyses d'impact prédictives par IA.</div>
                  </div>
                </div>
              </div>

              <div className={styles.ngoResult}>
                <div className={styles.ngoResultTitle}><span>Résultat :</span> <strong>Plaidoyer factuel</strong></div>
                <div className={styles.ngoResultContext}>Cas d'usage : Projet de biodiversité Saharienne.</div>
              </div>
            </div>
            <div className={styles.ngoImageContainer}>
              <div className={styles.ngoImage}>
                <div className={styles.ngoImagePlaceholder} style={{ background: "url('/sahara.png') center / cover no-repeat" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
