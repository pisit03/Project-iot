import React, { useEffect } from 'react';
import styles from '../styles/AboutPage.module.css'; 
import esp32Image from '../images/esp32_img.jpg';
import tdsSensorImage from '../images/TDS_img.webp';
import phSensorImage from '../images/ph_img.jpg';
import tempSensorImage from '../images/ds_img.jpg';
import normalIcon from '../images/normalIcon.png';
import warningIcon from '../images/warning_img.png';
import dangerIcon from '../images/danger_img.png';
import profile from '../images/profile_img.jpg';
import aboutImage from '../images/aboutlogo.jpg'; 

const AboutPage = ({ setHeaderTitle, setHeaderImage }) => {
  useEffect(() => {
    setHeaderTitle('เกี่ยวกับเรา'); 
    setHeaderImage(aboutImage); 
  }, [setHeaderTitle, setHeaderImage]);

  return (
    <div className={styles.container}>
      <h1>เกี่ยวกับเรา</h1>
      <p>
        เว็บไซต์นี้พัฒนาขึ้นเพื่อใช้ตรวจวัดคุณภาพน้ำเพื่อนำข้อมูลมาวิเคราะห์ 
        และใช้ในการเปลี่ยนน้ำในบ่อ รวมถึงเป็นส่วนหนึ่งของวิชาโครงงาน 
        คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยราชภัฏสวนสุนันทา 
        หากผิดพลาดประการใดผู้จัดทำขออภัยมา ณ ที่นี้ด้วย
      </p>

      <h2>อุปกรณ์ที่ใช้สำหรับสร้างสถานีตรวจวัดคุณภาพน้ำ</h2>
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <img src={esp32Image} alt="NodeMCU ESP32" />
          <p>NodeMCU ESP32</p>
        </div>
        <div className={styles.gridItem}>
          <img src={tdsSensorImage} alt="TDS Sensor" />
          <p>TDS Sensor</p>
        </div>
        <div className={styles.gridItem}>
          <img src={phSensorImage} alt="PH Sensor" />
          <p>PH Sensor</p>
        </div>
        <div className={styles.gridItem}>
          <img src={tempSensorImage} alt="DS Temperature Sensor" />
          <p>DS18B20 Temperature Sensor</p>
        </div>
      </div>

      <h2>คุณสมบัติของเว็บไซต์</h2>
      <p>
        เว็บไซต์จะแสดงค่าของเซนเซอร์ 3 ประเภท พร้อมสถานะดังนี้:
      </p>
      <div className={styles.statusSection}>
        <div className={styles.statusItem}>
          <img src={normalIcon} alt="สถานะปกติ" />
          <p>สถานะปกติ: แสดงขอบสีเขียว และมีไอคอนบ่งบอกถึงสถานะปกติ</p>
        </div>
        <div className={styles.statusItem}>
          <img src={warningIcon} alt="สถานะเฝ้าระวัง" />
          <p>
            สถานะเฝ้าระวัง: แสดงขอบสีเหลือง พร้อมไอคอนแจ้งเตือนให้ติดตามสถานะน้ำใกล้ชิด
          </p>
        </div>
        <div className={styles.statusItem}>
          <img src={dangerIcon} alt="สถานะอันตราย" />
          <p>
            สถานะอันตราย: แสดงขอบสีแดง พร้อมแนะนำให้ทำการเปลี่ยนน้ำโดยทันที
          </p>
        </div>
      </div>

      <p>
        ในหน้าเว็บไซต์จะมีกราฟและตารางแสดงค่าต่างๆ เพื่อให้ติดตามความผิดปกติ 
        และสามารถดาวน์โหลดไฟล์ CSV ได้
      </p>

      <h2><b>คณะผู้จัดทำ</b></h2>
      <div className={styles.teamSection}>
      <img src={profile} alt="สถานะอันตราย" />
        <p>นายพิสิษฐ์ คุณอนันต์กุล รหัส 64122250056</p>
        <p>คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์</p>
        <p>มหาวิทยาลัยราชภัฏสวนสุนันทา ปีการศึกษา 2567</p>
      </div>
    </div>
  );
};

export default AboutPage;
