#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <PubSubClient.h>

// กำหนดข้อมูลการเชื่อมต่อ Wi-Fi
const char* ssid = "Pisit's Galaxy S10+";
const char* password = "boong12334";

// กำหนดข้อมูลการเชื่อมต่อ NETPIE
const char* mqtt_username = "AW38SBbYMDkHbZaG3Xqiv3gmovSGknLY";  
const char* mqtt_password = "SYqksbf6ZQxbw3KJdQqq9ARgMygZ2XSB";  
const char* mqtt_Client = "24cadad5-aad2-4ee0-9067-ee4037f6af0c"; 
const char* netpieEndpoint = "mqtt.netpie.io";

// สร้าง WebServer บนพอร์ต 80
WebServer server(80);
WiFiClient wifiClient;  
PubSubClient client(wifiClient);  
char msg[100];

float tdsValue, phValue, tempValue;

unsigned long previousMillis = 0;
const long interval = 2000; 

// ฟังก์ชันอ่านค่าจากเซ็นเซอร์
void readSensors() {
  int tdsRaw = analogRead(34); 
  int phRaw = analogRead(32);  
  int tempRaw = analogRead(4);
  
  // ปรับค่าการคำนวณให้เหมาะสม
  tdsValue = (tdsRaw / 4095.0) * 1000; // ค่าที่เหมาะสมอาจจะต้องปรับตามเซนเซอร์
  phValue = ((phRaw / 4095.0) * 14)+4; // ปรับค่านี้ให้เหมาะสมตามสเกล pH
  tempValue = 26; // ตัวอย่างสำหรับ Temp: ปรับให้เป็นองศาเซลเซียส
}

// ฟังก์ชันส่งข้อมูล JSON เมื่อมีการเรียกใช้งาน HTTP GET
String getSensorData() {
  readSensors();
  String json = "{\"temperature\":" + String(tempValue) +
                 ",\"tds\":" + String(tdsValue) +
                 ",\"ph\":" + String(phValue) + "}";

  client.publish("sensor/data", json.c_str(), false); 
  return json;
}

// ฟังก์ชันจัดการคำร้องขอ HTTP สำหรับ root (index.html)
void handleRoot() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", "<html><body><h1>Welcome to ESP32 Web Server</h1></body></html>");
}

// ฟังก์ชันจัดการคำร้องขอ HTTP สำหรับข้อมูลเซ็นเซอร์
void handleSensorData() {
  String json = getSensorData();
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);

  // แสดงค่าที่ส่งไปใน API
  Serial.println("Data sent to API:");
  Serial.print("Temperature: "); Serial.println(tempValue);
  Serial.print("TDS: "); Serial.println(tdsValue);
  Serial.print("pH: "); Serial.println(phValue);
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived on topic: ");
    Serial.println(topic);
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Sensor MQTT connection…");
    if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
      Serial.println("Connected to NETPIE");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  if (!SPIFFS.begin(true)) {
    Serial.println("Failed to mount file system");
    return;
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println(WiFi.localIP());

  // ตั้งค่า MQTT
  client.setServer(netpieEndpoint, 1883);
  client.setCallback(mqttCallback);
  reconnect();

  server.on("/", handleRoot);
  server.on("/sensor", handleSensorData);
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  client.setKeepAlive(60); 

  readSensors();
  String data = "{\"data\": {\"tds\": " + String(tdsValue) +
                  ", \"ph\": " + String(phValue) +
                  ", \"temperature\": " + String(tempValue) + "}}";
  data.toCharArray(msg, data.length() + 1);

  if (client.publish("@shadow/data/update", msg)) {
      Serial.println("Data published to Shadow successfully");
  } else {
      Serial.println("Failed to publish data to Shadow");
  }

  delay(1000); 
}
