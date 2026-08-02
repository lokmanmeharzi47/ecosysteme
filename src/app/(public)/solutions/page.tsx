import React from 'react';
import Link from 'next/link';
import { Badge } from '@/src/components/Badge/Badge';
import { Button } from '@/src/components/Button/Button';
import styles from './page.module.css';

export default function Solutions() {
  const solutions = [
    {
      badge: "DIGITAL TWIN",
      title: "Plateforme IoT : Le Hub de Données",
      desc: "Centralisez vos données, analysez en temps réel, et prenez des décisions éclairées grâce à nos tableaux de bord intuitifs conçus pour un suivi complet de vos écosystèmes.",
      features: ["Évolutif", "Temps Réel", "Sécurisé"],
      imageFirst: false,
      img: "/solution/1.jpg"
    },
    {
      badge: "HARDWARE ROBUSTE",
      title: "Capteurs Intelligents de Précision",
      desc: "Des capteurs conçus pour les environnements difficiles (IP68). Connectez-les à la plateforme pour des relevés de haute précision (Air, Eau, Sol, Bruit) avec une autonomie sur batterie de plusieurs années.",
      features: ["Haute Précision", "Robuste", "Autonomie 5 ans"],
      imageFirst: true,
      img: "/solution/3.jpg"
    },
    {
      badge: "EDGE COMPUTING",
      title: "Moteur AIoT : Fusion IA & IoT",
      desc: "L'IA analyse en permanence les flux de données IoT pour détecter des anomalies, comprendre les corrélations et optimiser les ressources de vos sites industriels ou naturels.",
      features: ["Machine Learning", "Détection Anomalies", "Edge Computing"],
      imageFirst: false,
      img: "/solution/4.jpg"
    },
    {
      badge: "DEEP LEARNING",
      title: "IA Prédictive : Anticiper le Futur",
      desc: "Grâce à des modèles d'IA avancés (Deep Learning), nous anticipons les risques (incendies, inondations, pollutions) avant qu'ils ne surviennent. Protégez votre écosystème avec l'analyse prédictive.",
      features: ["Modèles Prédictifs", "Alertes Précoces", "Réduction des Risques"],
      imageFirst: true,
      img: "/solution/2.jpg"
    },
    {
      badge: "RÉSEAU SÉCURISÉ",
      title: "Connectivité LoRaWAN Sécurisée",
      desc: "Déployez un réseau maillé privé (LoRaWAN) couvrant jusqu'à 15km par antenne, assurant une transmission d'alerte cryptée, continue, même dans les zones reculées.",
      features: ["Longue Portée", "Basse Consommation", "Réseau Privé"],
      imageFirst: false,
      img: "/solution/5.jpg"
    },
    {
      badge: "ANALYSE SPATIALE",
      title: "Système de Cartographie GIS 3D",
      desc: "Visualisez vos zones sous tous les angles avec notre plateforme GIS 3D. Intégrez vos capteurs sur une carte topographique détaillée pour des analyses environnementales complexes.",
      features: ["Modélisation 3D", "Données Spatiales", "Intégration Capteurs"],
      imageFirst: true,
      img: "/solution/6.jpg"
    },
    {
      badge: "SPACE TECH",
      title: "Surveillance Satellite Hyperspectrale",
      desc: "En partenariat avec des agences spatiales, nous couplons les données IoT au sol avec l'imagerie satellite en temps réel pour détecter les anomalies invisibles à l'œil nu sur de vastes superficies.",
      features: ["Imagerie Satellite", "Couverture Globale", "Temps Réel"],
      imageFirst: false,
      img: "/solution/7.jpg"
    }
  ];

  return (
    <div className={styles.solutionsPage}>
      <div className="container">
        <div className={styles.header}>
          <Badge variant="success">Écologique & Sécurisé</Badge>
          <h1 className={styles.title}>Solutions <span className={styles.highlight}>Technologiques</span></h1>
          <p className={styles.subtitle}>Découvrez comment nos technologies IoT et IA transforment la gestion environnementale avec précision et fiabilité.</p>

          <div className={styles.featuresRow}>
            <span>✓ Analyse Temps Réel</span>
            <span>✓ Capteurs Ultra-Précis</span>
            <span>✓ IA Prédictive</span>
          </div>
        </div>

        <div className={styles.solutionsList}>
          {solutions.map((sol, idx) => (
            <div key={idx} className={`${styles.solutionRow} ${sol.imageFirst ? styles.reverse : ''}`}>
              <div className={styles.textContent}>
                {sol.badge && <div style={{ marginBottom: '8px' }}><Badge variant="success" style={{ backgroundColor: '#10b981', color: 'white', fontSize: '0.75rem', padding: '4px 8px' }}>{sol.badge}</Badge></div>}
                <h2 className={styles.solTitle}>{sol.title}</h2>
                <p className={styles.solDesc}>{sol.desc}</p>
                <div className={styles.solFeatures}>
                  {sol.features.map(f => (
                    <div key={f} className={styles.featureBox}>
                      <span className={styles.featureIcon}>✦</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.imageContent}>
                <div className={styles.imagePlaceholder} style={{ background: `url(${sol.img}) center / cover no-repeat` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Prêt à transformer votre impact environnemental ?</h2>
            <p className={styles.ctaDesc}>Contactez nos experts pour une démonstration personnalisée de notre écosystème de solutions.</p>
            <div className={styles.ctaButtons}>
              <Link href="/demander-demo">
                <Button size="lg" style={{ backgroundColor: 'var(--color-primary-hover)', color: 'white' }}>Demander une démo</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" style={{ borderColor: 'white', color: 'white' }}>Nous contacter</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
