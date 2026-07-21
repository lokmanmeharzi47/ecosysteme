import React, { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false,
  padding = 'md' 
}) => {
  const hoverClass = hoverable ? styles.hoverable : '';
  const paddingClass = styles[`padding-${padding}`];
  
  return (
    <div className={`${styles.card} ${hoverClass} ${paddingClass} ${className}`.trim()}>
      {children}
    </div>
  );
};
