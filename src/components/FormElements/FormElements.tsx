import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './FormElements.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, id, className = '', ...props }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input id={id} className={`${styles.input} ${icon ? styles.hasIcon : ''}`} {...props} />
      </div>
    </div>
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, id, options, className = '', ...props }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <select id={id} className={styles.select} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <textarea id={id} className={styles.textarea} {...props} />
    </div>
  );
};

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className={`${styles.checkboxWrapper} ${className}`}>
      <input type="checkbox" id={id} className={styles.checkbox} {...props} />
      <label htmlFor={id} className={styles.checkboxLabel}>{label}</label>
    </div>
  );
};
