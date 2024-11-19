import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Measurements from '../components/Measurements';
import SensorChart from '../components/SensorChart';
import BackButton from '../components/BackButton';
import SensorDataTable from '../components/SensorDataTable';
import { fetchSensorData } from '../api';
import Modal from '../components/Modal';
import stationImage1 from '../images/station1.jpg';
import stationImage2 from '../images/station2.jpg';
import stationImage3 from '../images/station3.jpg';
import stationImage4 from '../images/station4.jpg';
import headerImage1 from '../images/STATION1logo.jpg';
import headerImage2 from '../images/STATION2logo.jpg';
import headerImage3 from '../images/STATION3logo.jpg';
import headerImage4 from '../images/STATION4logo.jpg';
import styles from '../styles/StationDetail.module.css';

const StationDetail = ({ setHeaderTitle, setHeaderImage }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedSensor, setSelectedSensor] = useState('tds');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const stationImages = [stationImage1, stationImage2, stationImage3, stationImage4];
  const headerImages = [headerImage1, headerImage2, headerImage3, headerImage4];

  const stationImage = stationImages[id - 1] || stationImage1;
  const headerImage = headerImages[id - 1] || headerImage1;

  // สร้างอาเรย์ข้อความสำหรับแต่ละสถานี
  const stationMessages = [
    'รายละเอียดของสถานี 1: ข้อมูลที่สำคัญเกี่ยวกับสถานี 1...',
    'รายละเอียดของสถานี 2: ข้อมูลที่สำคัญเกี่ยวกับสถานี 2...',
    'รายละเอียดของสถานี 3: ข้อมูลที่สำคัญเกี่ยวกับสถานี 3...',
    'รายละเอียดของสถานี 4: ข้อมูลที่สำคัญเกี่ยวกับสถานี 4...',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await fetchSensorData(id); 
        if (newData) {
          setData(newData); 
        } else {
          setData({}); 
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    setHeaderTitle(`Station ${id} Detail`);
    setHeaderImage(headerImage);

    return () => clearInterval(interval);
  }, [id, setHeaderTitle, setHeaderImage, headerImage]);

  const handleImageClick = () => {
    // ดึงข้อความเฉพาะสำหรับสถานีปัจจุบัน
    const message = stationMessages[id - 1];
    setModalContent(<div>{message}</div>); // ใช้ข้อความที่ได้จากอาเรย์
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.imageContainer} onClick={handleImageClick}>
        <img src={stationImage} alt={`Station ${id}`} className={styles.stationImage} />
      </div>
      <Measurements data={data} />
      <SensorChart
        data={data}
        selectedSensor={selectedSensor}
        setSelectedSensor={setSelectedSensor}
      />
      <SensorDataTable data={data} />
      
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default StationDetail;
