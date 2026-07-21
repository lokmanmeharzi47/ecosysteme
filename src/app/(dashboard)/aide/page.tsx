import React from 'react';

export default function AidePage() {
 return (
  <div style={{ padding: 'var(--spacing-6)' }}>
   <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--spacing-4)' }}>Centre d'Aide</h1>
   <p style={{ color: 'var(--color-text-light)' }}>
    Bienvenue sur le centre d'aide. Comment pouvons-nous vous aider aujourd'hui ?
   </p>
   
   <div style={{ marginTop: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
    <div style={{ padding: 'var(--spacing-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'white' }}>
     <h3 style={{ fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>Documentation</h3>
     <p style={{ color: 'var(--color-text-light)' }}>Consultez nos guides et tutoriels pour utiliser au mieux votre tableau de bord.</p>
    </div>
    <div style={{ padding: 'var(--spacing-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'white' }}>
     <h3 style={{ fontWeight: 600, marginBottom: 'var(--spacing-2)' }}>Support Technique</h3>
     <p style={{ color: 'var(--color-text-light)' }}>Contactez notre équipe de support pour toute assistance technique ou question spécifique.</p>
    </div>
   </div>
  </div>
 );
}
