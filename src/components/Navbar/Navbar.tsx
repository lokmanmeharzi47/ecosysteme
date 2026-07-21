'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return `${styles.link} ${pathname === path ? styles.activeLink : ''}`.trim();
  };

  if (pathname === '/demander-demo') {
    return (
      <header className={styles.header}>
        <div className={`container ${styles.navContainer}`} style={{ justifyContent: 'flex-start', height: '60px' }}>
          <Link 
            href="/" 
            className="flex items-center gap-2.5 text-[#475569] hover:text-[#2d6a0f] font-semibold transition-colors text-[13px]"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo-new.png"
            alt="Ecosystem Monitoring Logo"
            width={45}
            height={45}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <nav className={styles.navLinks}>
          <Link href="/" className={getLinkClass('/')}>Accueil</Link>
          <Link href="/solutions" className={getLinkClass('/solutions')}>Solution</Link>
          <Link href="/secteurs" className={getLinkClass('/secteurs')}>Secteurs</Link>
          <Link href="/tarification" className={getLinkClass('/tarification')}>Tarification</Link>
          <Link href="/a-propos" className={getLinkClass('/a-propos')}>À propos</Link>
          <Link href="/contact" className={getLinkClass('/contact')}>Contact</Link>
          <Link href="/connexion" className={`${styles.loginLink} ${pathname === '/connexion' ? styles.activeLink : ''}`} style={{ color: '#2d6a0f' }}>Connexion</Link>
        </nav>

        <div className={styles.actions}>
          <Link
            href="/demander-demo"
            className="px-4 py-2 bg-[#2d6a0f] hover:bg-[#204c0a] text-white text-[10.5px] font-bold rounded-full transition-colors inline-block text-center"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </header>
  );
};

