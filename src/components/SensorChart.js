import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import styles from '../styles/SensorChart.module.css';

const SensorChart = ({ data, selectedSensor, setSelectedSensor }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const sensors = ['tds', 'ph', 'temperature']; 

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // ลบ Chart เดิมก่อนสร้างใหม่ (ถ้ามี)
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // สร้าง Chart 
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: selectedSensor.toUpperCase(),
            data: [],
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 18, 
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
              font: {
                size: 20, 
              },
            },
            ticks: {
              font: {
                size: 16, 
              },
            },
          },
          y: {
            title: {
              display: true,
              text: 'Value',
              font: {
                size: 20, 
              },
            },
            ticks: {
              font: {
                size: 16, 
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedSensor]);

  useEffect(() => {
    const now = new Date().toLocaleTimeString(); 

    // เพิ่มเวลาและข้อมูลลงในกราฟ
    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.labels.push(now); 
      chartInstanceRef.current.data.datasets[0].data.push(data[selectedSensor] || 0); 
      chartInstanceRef.current.update(); 
    }
  }, [data]);

  return (
    <div className={styles.sensorChartContainer}>
      <div className={styles.buttonContainer}>
        {sensors.map((sensor) => (
          <button
            key={sensor}
            onClick={() => setSelectedSensor(sensor)}
            className={selectedSensor === sensor ? styles.activeButton : ''}
          >
            {sensor.toUpperCase()}
          </button>
        ))}
      </div>
      <canvas ref={chartRef} className={styles.chart}></canvas>
    </div>
  );
};

export default SensorChart;
