import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  icon?: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  icon,
  className = '',
  ...rest
}) => {
  return (
    <div className={`${styles.badge} ${styles[variant]} ${className}`.trim()} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </div>
  );
};
