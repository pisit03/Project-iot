import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/SensorDataTable.module.css';

const SensorDataTable = ({ data: sensorData }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const addSensorData = useCallback(() => {
    const now = new Date();

    // ตรวจสอบว่ามีข้อมูลเซนเซอร์หรือไม่
    if (!sensorData) {
      return;
    }

    const tds = sensorData.tds || 0;
    const ph = sensorData.ph || 0;
    const temperature = sensorData.temperature || 0;

    const formattedDate = now.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const newData = {
      date: formattedDate,
      time: now.toLocaleTimeString('th-TH'),
      tds,
      ph,
      temperature,
    };

    setData((prevData) => [newData, ...prevData]);
    setCurrentPage(1); // รีเซ็ตไปที่หน้าแรก
  }, [sensorData]);

  useEffect(() => {
    const interval = setInterval(addSensorData, 5000);
    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูกทำลาย
  }, [addSensorData]);

  useEffect(() => {
    if (sensorData) {
      addSensorData(); // เพิ่มข้อมูลเซนเซอร์เมื่อได้รับข้อมูลใหม่
    }
  }, [sensorData, addSensorData]);

  const downloadCSV = () => {
    const csvContent = [
      ['Date', 'Time', 'TDS (mg/L)', 'pH', 'Temperature (°C)'],
      ...data.map((row) => [
        row.date,
        row.time,
        row.tds.toFixed(2),
        row.ph,
        row.temperature,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sensor_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = data.slice(startIndex, startIndex + rowsPerPage); // แสดงข้อมูลเฉพาะหน้าปัจจุบัน

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Sensor Data Table</h2>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>TDS (mg/L)</th>
            <th>pH</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td>{row.tds.toFixed(2)}</td>
              <td>{row.ph}</td>
              <td>{row.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.paginationButtons}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <button className={styles.downloadButton} onClick={downloadCSV}>
        Download CSV
      </button>
    </div>
  );
};

export default SensorDataTable;
