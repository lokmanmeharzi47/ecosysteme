'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/Button/Button';
import { Input, Checkbox } from '@/src/components/FormElements/FormElements';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Connexion() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setLoading(false);
      setError('Identifiants incorrects ou erreur réseau.');
      return;
    }

    // Fetch the user profile to get their role
    const { data: profile } = await supabase
      .from('profiles')
      .select('system_role')
      .eq('id', data.user.id)
      .single();

    const role = profile?.system_role || data.user.user_metadata?.system_role || 'viewer';

    setSuccess('Connexion réussie. Redirection en cours...');

    // Route to the appropriate dashboard based on role
    if (role === 'admin') {
      router.push('/dashboard');
    } else if (role === 'client') {
      router.push('/client/dashboard');
    } else {
      router.push('/');
    }

    router.refresh();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.splitLayout}>
        <div className={styles.heroSide}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <div className={styles.logo}>
              <span className={styles.logoLight}>Ecosystem</span>{' '}
              <span className={styles.logoDark}>Monitoring</span>
            </div>

            <h1 className={styles.heroTitle}>
              Maîtrisez votre impact environnemental.
            </h1>

            <p className={styles.heroSubtitle}>
              Accédez à votre tableau de bord haute précision et gérez vos réseaux de capteurs intelligents en temps réel.
            </p>

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

        <div className={styles.formSide}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Bon retour parmi nous</h2>
            </div>



            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              {success && <div className={styles.successMessage}>{success}</div>}

              <div className={styles.inputGroup}>
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="nom@entreprise.com"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 4l10 8 10-8" />
                    </svg>
                  }
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.passwordHeader}>
                  <label htmlFor="password" className={styles.label}>Mot de passe</label>
                  <Link href="/mot-de-passe-oublie" className={styles.forgotLink}>
                    Oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  }
                  required
                />
              </div>

              <div className={styles.optionsRow}>
                <Checkbox id="remember" label="Se souvenir de moi" />
              </div>

              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </form>

            <div className={styles.footer}>
              Nouveau sur Ecosystem ? <Link href="/inscription" className={styles.signupLink}>Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
