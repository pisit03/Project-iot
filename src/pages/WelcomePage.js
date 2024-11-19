import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/WelcomePage.module.css';
import welcomeImage from '../images/welcome.png'; 
import logo from '../images/water-logo1.png';
import welcomeh from '../images/welcomeh.png';

const WelcomePage = ({ setHeaderTitle, setHeaderImage }) => {
  const navigate = useNavigate();
  setHeaderTitle('Water QA'); 
  setHeaderImage(welcomeh); 
  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <img src={welcomeImage} alt="Welcome to Water QA" className={styles.welcomeImage} />
      <button className={styles.enterButton} onClick={goToHome}>
        เข้าสู่หน้าหลัก
      </button>
    </div>
  );
};

export default WelcomePage;
