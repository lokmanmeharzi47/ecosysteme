import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/Button/Button';
import styles from './page.module.css';


export default function APropos() {
  const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  );

  const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  );
  
  const LeafIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
  );
  
  const ZapIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
  );
  
  const RefreshIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
  );

  const BrainIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.01 3.01 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.01 3.01 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="8" cy="12" r="1" />
      <circle cx="16" cy="12" r="1" />
    </svg>
  );

  const SatelliteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );

  const EnergyLeafIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M13 10h-3l2-4" />
    </svg>
  );

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section Combined */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroText}>
            <div className={styles.heroSubtitle}>NOTRE HISTOIRE</div>
            <h1 className={styles.heroTitle}>Pionniers de l&apos;intelligence environnementale.</h1>
            <p className={styles.heroDesc}>Fondée à l&apos;intersection de la data-science et de l&apos;écologie, EcoVigil AIoT est née d&apos;un constat simple : on ne peut protéger que ce que l&apos;on mesure avec précision. Depuis 2018, nous déployons des systèmes neuronaux à l&apos;échelle planétaire pour écouter le pouls de la Terre.</p>
            
            <div className={styles.heroButtonWrapper}>
              <Link href="/contact">
                <Button size="lg" style={{ backgroundColor: '#006633', color: 'white' }}>Découvrir l&apos;Impact</Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className={styles.visionMissionSection}>
        <div className="container">
          <div className={styles.visionMissionGrid}>
            <div className={styles.visionMissionText}>
              <div className={styles.visionCard}>
                <h3 className={styles.visionCardTitle}>
                  <span className={styles.visionCardIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  Notre Vision
                </h3>
                <p className={styles.visionCardDesc}>Devenir le système nerveux numérique de la biosphère, permettant une coexistence harmonieuse et data-driven entre l&apos;industrie humaine et les écosystèmes naturels.</p>
              </div>

              <div className={styles.missionCard}>
                <h3 className={styles.missionCardTitle}>
                  <span className={styles.missionCardIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L17.5 5.5l-3-3L4.5 16.5Z" />
                      <path d="m13 4 3 3" />
                    </svg>
                  </span>
                  Notre Mission
                </h3>
                <p className={styles.missionCardDesc}>Démocratiser l&apos;accès aux données environnementales haute fidélité grâce à l&apos;IA et l&apos;IoT, pour accélérer la transition vers une économie régénérative.</p>
              </div>
            </div>

            <div className={styles.visionMissionImageContainer}>
              <img
                src="/control-room.png"
                alt="Ecosystem Command Center"
                className={styles.visionMissionImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Vanguard Bento Box */}
      <section className={styles.techSection}>
        <div className="container">
          <div className={styles.techHeader}>
            <h2 className={styles.techTitle}>L&apos;Avant-garde Technologique</h2>
            <p className={styles.techDesc}>Nos outils fusionnent les technologies les plus avancées pour une surveillance sans compromis.</p>
          </div>

          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoCard} ${styles.bentoCard1}`}>
              <div className={styles.bentoIcon}><BrainIcon /></div>
              <h3 className={styles.bentoTitle}>AI &amp; Predictive Analytics</h3>
              <p className={styles.bentoDesc}>Nos modèles de Deep Learning anticipent les risques environnementaux (feux, fuites, pollution) avant qu&apos;ils ne surviennent.</p>
              
              {/* Decorative SVG network graphic */}
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.12, pointerEvents: 'none', color: 'white' }}>
                <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="50" cy="30" r="4" fill="currentColor"/>
                  <circle cx="20" cy="70" r="4" fill="currentColor"/>
                  <circle cx="80" cy="70" r="4" fill="currentColor"/>
                  <circle cx="50" cy="70" r="4" fill="currentColor"/>
                  <circle cx="35" cy="50" r="3" fill="currentColor"/>
                  <circle cx="65" cy="50" r="3" fill="currentColor"/>
                  <line x1="50" y1="30" x2="35" y2="50" />
                  <line x1="50" y1="30" x2="65" y2="50" />
                  <line x1="35" y1="50" x2="20" y2="70" />
                  <line x1="35" y1="50" x2="50" y2="70" />
                  <line x1="65" y1="50" x2="50" y2="70" />
                  <line x1="65" y1="50" x2="80" y2="70" />
                </svg>
              </div>
            </div>

            <div className={`${styles.bentoCard} ${styles.bentoCard2}`}>
              <div className={styles.bentoIcon}><SatelliteIcon /></div>
              <h3 className={styles.bentoTitle}>Hybride Satellite &amp; LoRa</h3>
              <p className={styles.bentoDesc}>Une connectivité totale, même dans les zones les plus reculées du globe.</p>
              
              {/* Green circular badges */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1b7c3d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8H5v-8Z"/><path d="M12 9.5V3"/></svg>
                </span>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1b7c3d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h.01"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M5 13a10 10 0 0 1 14 0"/><path d="M1.5 9.5a15 15 0 0 1 21 0"/></svg>
                </span>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#1b7c3d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 10h16M4 14h16M12 4v16"/></svg>
                </span>
              </div>
            </div>

            <div className={`${styles.bentoCard} ${styles.bentoCard3}`}>
              <div className={styles.bentoIcon}><EnergyLeafIcon /></div>
              <h3 className={styles.bentoTitle}>Zéro Consommation</h3>
              <p className={styles.bentoDesc}>Nos capteurs fonctionnent à l&apos;énergie solaire et ont une durée de vie de 10 ans.</p>
            </div>

            <div className={`${styles.bentoCard} ${styles.bentoCard4}`}>
              <div className={styles.bentoCard4Content}>
                <h3 className={styles.bentoTitle}>Sécurité de Données Critique</h3>
                <p className={styles.bentoDesc}>Chiffrement de bout en bout et stockage souverain pour protéger vos actifs environnementaux.</p>
              </div>
              <div className={styles.bentoCard4Image}>
                 <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                  alt="Server security"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <h2 className={styles.timelineTitle}>Notre Trajectoire</h2>
          <p className={styles.timelineDesc}>De l&apos;idée à l&apos;expansion internationale.</p>

          <div className={styles.timelineWrapper}>
            <div className={styles.timelineLine}></div>
            
            <div className={`${styles.timelineItem} ${styles.timelineItemLeft}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2020</div>
                <h3>Fondation &amp; R&amp;D</h3>
                <p>Lancement de la recherche fondamentale sur les capteurs de stress hydrique et les modèles de propagation de feu.</p>
              </div>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent} style={{ visibility: 'hidden' }}></div>
            </div>

            <div className={`${styles.timelineItem}`}>
              <div className={styles.timelineContent} style={{ visibility: 'hidden' }}></div>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2021</div>
                <h3>Premier Prototype</h3>
                <p>Test réussi en conditions réelles. Premier brevet déposé pour l&apos;architecture Mesh éco-énergétique.</p>
              </div>
            </div>

            <div className={`${styles.timelineItem} ${styles.timelineItemLeft}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2022</div>
                <h3>Déploiement en Algérie</h3>
                <p>Équipement des premiers parcs nationaux. Réduction significative des délais d&apos;alerte incendie.</p>
              </div>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent} style={{ visibility: 'hidden' }}></div>
            </div>

            <div className={`${styles.timelineItem}`}>
              <div className={styles.timelineContent} style={{ visibility: 'hidden' }}></div>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2024</div>
                <h3>Expansion Globale</h3>
                <p>EcoVigil AIoT s&apos;exporte pour protéger les forêts méditerranéennes et d&apos;Amazonie.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className={styles.sustainabilitySection}>
        <div className="container">
          <div className={styles.susGrid}>
            <div className={styles.susText}>
              <h2 className={styles.susTitle}>Engagement & Durabilité</h2>
              <p className={styles.susDesc}>Nous croyons que la technologie ne doit pas polluer pour protéger. Notre modèle est bâti sur une empreinte nette positive dès l'année 1.</p>

              <div className={styles.susFeatures}>
                <div className={styles.susFeature}>
                  <div className={styles.susIcon}><LeafIcon /></div>
                  <div>
                    <h4>Neutralité Carbone Opérationnelle</h4>
                    <p>Nos serveurs et opérations sont alimentés par des énergies renouvelables et éco-conçus.</p>
                  </div>
                </div>
                <div className={styles.susFeature}>
                  <div className={styles.susIcon}><RefreshIcon /></div>
                  <div>
                    <h4>Économie Circulaire</h4>
                    <p>100% de nos capteurs sont conçus pour être recyclés et reconditionnés de façon responsable.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.susStatsGrid}>
              <div className={styles.susStatBox}>
                <div className={styles.susStatValue}>92%</div>
                <div className={styles.susStatLabel}>Recyclabilité</div>
              </div>
              <div className={styles.susStatBox}>
                <div className={styles.susStatValue}>-40%</div>
                <div className={styles.susStatLabel}>Impact Carbone</div>
              </div>
              <div className={styles.susStatBox}>
                <div className={styles.susStatValue}>15k</div>
                <div className={styles.susStatLabel}>Alertes évités</div>
              </div>
              <div className={styles.susStatBox}>
                <div className={styles.susStatValue}>24/7</div>
                <div className={styles.susStatLabel}>Surveillance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Prêt à agir pour l'avenir ?</h2>
            <p className={styles.ctaDesc}>Rejoignez les leaders du changement environnemental positif avec Ecosystem. Prenez de meilleures décisions et protégez notre planète.</p>
            <div className={styles.ctaButtons}>
              <Link href="/demander-demo">
                <Button size="lg" style={{ backgroundColor: 'white', color: '#006633', fontWeight: 600 }}>Demander une démo</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" style={{ borderColor: 'white', color: 'white', fontWeight: 600 }}>Nous contacter</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
