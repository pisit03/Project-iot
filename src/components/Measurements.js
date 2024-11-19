import React from 'react';
import styles from '../styles/Measurements.module.css'; 

const Measurements = ({ data }) => {
  // ฟังก์ชันเพื่อกำหนดสีของขอบและไอคอนสำหรับ TDS
  const getTdsStyle = () => {
    if (data.tds >= 0 && data.tds <= 150) {
      return { borderColor: 'green', icon: '👍', status: 'ปลอดภัย' };
    } else if (data.tds >= 151 && data.tds <= 300) {
      return { borderColor: 'yellow', icon: '⚠️', status: 'ระวัง' };
    } else {
      return { borderColor: 'red', icon: '🚫', status: 'อันตราย' };
    }
  };

  // ฟังก์ชันเพื่อกำหนดสีของขอบและไอคอนสำหรับ pH
  const getPhStyle = () => {
    if (data.ph >= 6.0 && data.ph <= 7.5) {
      return { borderColor: 'green', icon: '👍', status: 'ปลอดภัย' };
    } else if (data.ph >= 7.51 && data.ph <= 8.5) {
      return { borderColor: 'yellow', icon: '⚠️', status: 'ระวัง' };
    } else {
      return { borderColor: 'red', icon: '🚫', status: 'อันตราย' };
    }
  };

  // ฟังก์ชันเพื่อกำหนดสีของขอบและไอคอนสำหรับ Temperature
  const getTemperatureStyle = () => {
    if (data.temperature >= 25 && data.temperature <= 26.5) {
      return { borderColor: 'green', icon: '👍', status: 'ปลอดภัย' };
    } else if (data.temperature >= 26.6 && data.temperature <= 28) {
      return { borderColor: 'yellow', icon: '⚠️', status: 'ระวัง' };
    } else {
      return { borderColor: 'red', icon: '🚫', status: 'อันตราย' };
    }
  };

  // ตรวจสอบค่าที่ได้จากเซนเซอร์
  const tdsValue = (data.tds !== undefined && data.tds !== null) ? data.tds.toFixed(2) : 'Loading...';
  const phValue = (data.ph !== undefined && data.ph !== null) ? data.ph.toFixed(2) : 'Loading...';
  const temperatureValue = (data.temperature !== undefined && data.temperature !== null) ? data.temperature.toFixed(2) : 'Loading...';

  return (
    <div className={styles.measurementsContainer}>
      <h2 className={styles.measurementTitle}>ข้อมูลเซนเซอร์</h2>
      <div className={styles.measurements}>
        <div className={styles.measurement} style={{ borderColor: getTdsStyle().borderColor }}>
          <div className={styles.sensorText}>TDS:</div>
          <div className={styles.sensorValue}>
            {tdsValue}
          </div>
          <div className={styles.sensorUnit}>mg/L</div>
          <span className={styles.statusIcon}>
            {getTdsStyle().icon}
          </span>
        </div>

        <div className={styles.measurement} style={{ borderColor: getPhStyle().borderColor }}>
          <div className={styles.sensorText}>pH:</div>
          <div className={styles.sensorValue}>
            {phValue}
          </div>
          <div className={styles.sensorUnit}>pH</div>
          <span className={styles.statusIcon}>
            {getPhStyle().icon}
          </span>
        </div>

        <div className={styles.measurement} style={{ borderColor: getTemperatureStyle().borderColor }}>
          <div className={styles.sensorText}>Temperature:</div>
          <div className={styles.sensorValue}>
            {temperatureValue}
          </div>
          <div className={styles.sensorUnit}>°C</div>
          <span className={styles.statusIcon}>
            {getTemperatureStyle().icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Measurements;
