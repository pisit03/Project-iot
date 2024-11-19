import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';
import homeImage from '../images/waterqlogo.jpg'; 

const HomePage = ({ setHeaderTitle, setHeaderImage }) => {
  const [isVisible, setIsVisible] = useState(false); 

  useEffect(() => {
    setHeaderTitle('Water QA'); 
    setHeaderImage(homeImage); 

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); 

    return () => clearTimeout(timer); 
  }, [setHeaderTitle, setHeaderImage]);

  const stations = [
    { id: 1, name: 'Station 1', image: require('../images/station1.jpg') },
    { id: 2, name: 'Station 2', image: require('../images/station2.jpg') },
    { id: 3, name: 'Station 3', image: require('../images/station3.jpg') },
    { id: 4, name: 'Station 4', image: require('../images/station4.jpg') },
  ];

  return (
    <div className={styles.container} style={{ opacity: isVisible ? 1 : 0 }}>
      {stations.map((station) => (
        <Link key={station.id} to={`/station/${station.id}`} className={styles.stationCard}>
          <img src={station.image} alt={station.name} className={styles.stationImage} />
          <h2>{station.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
