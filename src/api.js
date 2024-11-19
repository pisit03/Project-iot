const esp32Ip = "http://192.168.159.28";

export const fetchSensorData = async () => {
  try {
    const response = await fetch(`${esp32Ip}/sensor`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    return { tds: 0, ph: 0, temperature: 0 };
  }
};
