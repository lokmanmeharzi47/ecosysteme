'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/src/components/Card/Card';
import { Input } from '@/src/components/FormElements/FormElements';
import { Button } from '@/src/components/Button/Button';
import styles from './page.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Veuillez saisir votre adresse e-mail.');
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.logo}>
        Ecosystem Monitoring
      </div>

      <Card padding="lg" className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mot de passe oublié ?</h1>
          <p className={styles.subtitle}>
            Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {isSuccess ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3>Email envoyé</h3>
            <p>Si un compte existe avec cette adresse, vous recevrez un lien de réinitialisation dans quelques instants.</p>
            <Link href="/" className={styles.backLink}>
              ← Retour à la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <Input
                id="email"
                label="Adresse e-mail"
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Note: In a real app we'd add an icon inside the input, but this suffices for the MVP matching the design */}
            </div>

            {error && <div className={styles.errorText}>{error}</div>}

            <Button
              type="submit"
              fullWidth
              size="lg"
              style={{ backgroundColor: '#10b981', marginTop: '16px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien'}
            </Button>

            <div className={styles.footer}>
              <Link href="/" className={styles.backLink}>
                ← Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
