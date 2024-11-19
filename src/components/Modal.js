import React from 'react';
import styles from '../styles/Modal.module.css'; 

const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
