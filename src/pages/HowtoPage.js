import React from 'react';
import styles from '../styles/HowtoPage.module.css'; 
import fishImage from '../images/fish.jpg'; 
import pondImage from '../images/pond.jpg'; 
import environmentImage from '../images/environment.jpg'; 
import foodImage from '../images/food.jpg'; 
import recordImage from '../images/record.jpg'; 
import checkWeightImage from '../images/checkWeight.jpg'; 

const HowTo = () => {
  return (
    <div className={styles.container}>
      <h1>การเลี้ยงปลาสลิด</h1>
      <div className={styles.howtoIntro}>
        <img src={fishImage} alt="ปลาสลิด" className={styles.introImage} />
        <p>
          ปลาสลิด หรือ ปลาใบไม้ เป็นปลาพื้นบ้านของประเทศไทย มีแหล่งกำเนิดอยู่ในที่ลุ่มภาคกลาง
          เป็นปลาที่นิยมบริโภค เนื่องจากมีรสชาติดี เนื้ออร่อย เป็นผลผลิตที่ตลาดต้องการสูง
          สามารถนำมาประกอบอาหารทั้งในรูปสดและทำเก็บตากแห้ง
          นอกจากนี้ ดินเปรี้ยวยังสามารถใช้เป็นที่เลี้ยงปลาสลิดได้ เพราะปลาสลิดเลี้ยงง่าย
          ทนต่อความเป็นกรดและน้ำที่มีปริมาณออกซิเจนน้อยได้ดี กินแพลงก์ตอนเป็นอาหาร
          ต้นทุนการผลิตต่ำ โดยจะเลี้ยงอยู่ในนา เรียกแปลงนาปลาสลิด
        </p>
      </div>

      <h2>การเพาะพันธุ์ปลาสลิด</h2>
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <img src={pondImage} alt="เตรียมบ่อเลี้ยง" />
          <h3>1. เตรียมบ่อเลี้ยง</h3>
          <p>ตากบ่อประมาณ 45 วันเพื่อฆ่าเชื้อโรค บ่อมีขนาดกว้าง 1.5-2 เมตร ลึก 1-1.2 เมตร ระดับน้ำในบ่อสูง 30-50 เซนติเมตร</p>
        </div>

        <div className={styles.gridItem}>
          <img src={environmentImage} alt="จัดการสภาพแวดล้อม" />
          <h3>2. จัดการสภาพแวดล้อม</h3>
          <p>ปล่อยให้หญ้าขึ้นตามขอบบ่อ เพื่อเป็นที่ก่อหวอด วางไข่ และหลบภัยของลูกปลา</p>
        </div>

        <div className={styles.gridItem}>
          <img src={foodImage} alt="การให้อาหาร" />
          <h3>3. การให้อาหาร</h3>
          <p>เมื่อลูกปลาอายุ 20 วัน ใช้หญ้าอ่อนเป็นอาหาร และให้หญ้าทุกๆ 15 วันจนปลาอายุ 4 เดือน</p>
        </div>

        <div className={styles.gridItem}>
          <img src={recordImage} alt="บันทึกและปรับปริมาณอาหาร" />
          <h3>4. บันทึกและปรับปริมาณอาหาร</h3>
          <p>จดบันทึกปริมาณอาหารและสังเกตพฤติกรรมการกิน ถ้าปลากินหมดช้าแสดงว่าอาหารพอ ถ้าหมดเร็วต้องเพิ่มปริมาณ</p>
        </div>

        <div className={styles.gridItem}>
          <img src={checkWeightImage} alt="ตรวจสอบน้ำหนักและจำนวนปลา" />
          <h3>5. การตรวจสอบน้ำหนักและจำนวนปลา</h3>
          <p>ใช้ยอยกปลาทุก 15-20 วันเพื่อตรวจสอบจำนวนปลาและน้ำหนัก</p>
        </div>
      </div>
    </div>
  );
};

export default HowTo;
