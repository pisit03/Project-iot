import React from 'react';
import styles from '../styles/BackButton.module.css';

const BackButton = () => (
  <button className={styles.backButton} onClick={() => window.history.back()}>
    Back
  </button>
);

export default BackButton;
