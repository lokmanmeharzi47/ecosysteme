'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

import { createClient } from '@/utils/supabase/client';

export default function Inscription() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    organisation: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!form.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.prenom,
          last_name: form.nom,
          organization_name: form.organisation,
          system_role: 'admin', // Changed to admin for testing
        }
      }
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    setSuccess('Compte créé avec succès. Veuillez vérifier votre email (si requis). Redirection...');
    setTimeout(() => {
      router.push('/client/dashboard');
      router.refresh();
    }, 2000);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.splitLayout}>
        {/* Left hero panel */}
        <div className={styles.heroSide}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <div className={styles.logo}>
              <span className={styles.logoGreen}>Ecosystem</span>{' '}
              <span className={styles.logoBlue}>Monitoring</span>
            </div>

            <h1 className={styles.heroTitle}>
              Rejoignez l'intelligence environnementale.
            </h1>

            <p className={styles.heroSubtitle}>
              Créez votre compte et accédez à la plateforme de surveillance forestière la plus avancée d'Algérie.
            </p>

            <div className={styles.heroFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌲</span>
                <span>Surveillance en temps réel de 24 massifs forestiers</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🤖</span>
                <span>IA de détection avec 98.7% de précision</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📡</span>
                <span>Réseau LoRaWAN de 142 capteurs actifs</span>
              </div>
            </div>

            <div className={styles.heroBottom}>
              <div className={styles.decorativeCircles}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
              <p className={styles.heroTrust}>
                Rejoignez plus de 500 entreprises engagées dans la durabilité technologique.
              </p>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Créer un compte</h2>
            </div>

            

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              {success && <div className={styles.successMessage}>{success}</div>}

              <div className={styles.twoColumns}>
                <div className={styles.inputGroup}>
                  <label htmlFor="prenom" className={styles.label}>Prénom</label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    placeholder="ex : Karim"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="nom" className={styles.label}>Nom</label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    placeholder="ex : Benali"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="organisation" className={styles.label}>Organisation / Wilaya</label>
                <input
                  id="organisation"
                  name="organisation"
                  type="text"
                  placeholder="ex : Direction des Forêts de Béjaïa"
                  value={form.organisation}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email professionnel</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@organisation.dz"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirmer le mot de passe</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.checkboxRow}>
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
                  J&apos;accepte les{' '}
                  <Link href="/contact" className={styles.signupLink}>conditions d&apos;utilisation</Link>
                  {' '}et la{' '}
                  <Link href="/contact" className={styles.signupLink}>politique de confidentialité</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? 'Création en cours...' : 'Créer mon compte'}
              </button>
            </form>

            <div className={styles.footer}>
              Vous avez déjà un compte ?{' '}
              <Link href="/connexion" className={styles.signupLink}>Se connecter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
