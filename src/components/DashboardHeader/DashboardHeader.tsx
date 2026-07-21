'use client';

import React from 'react';
import styles from './DashboardHeader.module.css';

export const DashboardHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Rechercher un capteur, un rapport ou une zone..." 
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.rightSection}>
        <button className={styles.notificationBtn}>
          <span className={styles.bellIcon}>🔔</span>
          <span className={styles.badge}></span>
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Dr. Claire Durand</span>
            <span className={styles.userRole}>Expert Scientifique</span>
          </div>
          <div className={styles.avatar}>
            <div className={styles.avatarPlaceholder}></div>
          </div>
        </div>
      </div>
    </header>
  );
};
