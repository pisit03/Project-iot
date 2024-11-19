import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import logo from '../images/water-logo.png';

const Header = ({ headerImage }) => {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && event.target.closest(`.${styles.nav}`) === null) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <img src={headerImage} alt="Header Text" className={styles.headerImage} />
      <button className={styles.menuToggle} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      {menuOpen && (
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink} onClick={closeMenu}>
            หน้าหลัก
          </Link>
          <Link to="/about" className={styles.navLink} onClick={closeMenu}>
            เกี่ยวกับเรา
          </Link>
          <Link to="/howto" className={styles.navLink} onClick={closeMenu}>
            วิธีการเลี้ยง
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
