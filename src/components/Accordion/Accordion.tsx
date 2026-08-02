'use client';

import React, { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen: initialIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.header} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      
      <div className={styles.contentWrapper} style={{ height: isOpen ? 'auto' : 0 }}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
