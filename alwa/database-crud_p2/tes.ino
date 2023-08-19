#include <Arduino.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <math.h>

const char* ssid = "Soilit";
const char* password = "123454321";

WiFiServer server(80);

const int BUZZER = 3;
const int REPORTING_PERIOD_MS = 1000;
const int HRV_CALCULATION_PERIOD_MS = 10000;
uint32_t tsLastReport = 0;
uint32_t tsLastHRVCalculation = 0;
uint8_t c;
int numRRIntervals = 0;
long sumRRIntervals = 0;
long sumRRIntervalsSquared = 0;
bool hrvCalculationStarted = false;
int threshold = 0;
int sensorValue;
const int GSR = A0;  // Define the GSR pin

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, LOW);
  delay(1000);

  long sum = 0;
  for (int i = 0; i < 500; i++) {
    sensorValue = analogRead(GSR);
    sum += sensorValue;
    delay(1);  // Delay 1 ms between sensor readings
  }
  threshold = sum / 500;
  Serial.print("threshold = ");
  Serial.println(threshold);

  Wire.begin();

  // Mencoba untuk terhubung ke jaringan WiFi
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Menghubungkan ke jaringan WiFi...");
    WiFi.begin(ssid, password);
    delay(5000);
  }

  Serial.println("Terhubung ke jaringan WiFi");

  server.begin();
  Serial.print("Server telah dimulai. IP Server: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    Serial.println("Client baru terhubung");

    String request = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        request += c;

        if (c == '\n') {
          break;
        }
      }
    }

    Serial.println("Permintaan HTTP dari client:");
    Serial.println(request);

    // Mengambil data HR, HRV, dan EDA/GSR
    int hr = getHeartRate();
    int hrv = getHeartRateVariability();
    int eda = getEDA();

    // Membuat respon HTTP dengan data HR, HRV, dan EDA/GSR
    String response = "HTTP/1.1 200 OK\n";
    response += "Content-Type: text/plain\n\n";
    response += "Heart Rate: " + String(hr) + "\n";
    response += "Heart Rate Variability (HRV): " + String(hrv) + "\n";
    response += "EDA: " + String(eda) + "\n";

    client.print(response);
    delay(1000);
    client.stop();

    Serial.println("Respon HTTP dikirim ke client");
  }

  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
    Wire.requestFrom(0xA0 >> 1, 1);
    while (Wire.available()) {
      c = Wire.read();
    }
    Serial.print("Heart Rate: ");
    Serial.print(c);
    Serial.println(" BPM");
    if (c > 50) {
      hrvCalculationStarted = true;
    }
    if (hrvCalculationStarted && c > 60) {
      long rrInterval = 60000 / c;
      numRRIntervals++;
      sumRRIntervals += rrInterval;
      sumRRIntervalsSquared += rrInterval * rrInterval;
    }
    tsLastReport = millis();
  }

  if (millis() - tsLastHRVCalculation > HRV_CALCULATION_PERIOD_MS && numRRIntervals > 0) {
    double meanRRInterval = (double)sumRRIntervals / numRRIntervals;
    double variance = (double)sumRRIntervalsSquared / numRRIntervals - meanRRInterval * meanRRInterval;
    double hrv = sqrt(variance);
    Serial.print("Heart Rate Variability (HRV): ");
    Serial.print(hrv, 2); // Menampilkan HRV dengan 2 angka di belakang koma
    Serial.println(" ms");
    numRRIntervals = 0;
    sumRRIntervals = 0;
    sumRRIntervalsSquared = 0;
    tsLastHRVCalculation = millis();
  }

  sensorValue = analogRead(GSR);
  Serial.print("EDA: ");
  Serial.println(sensorValue);
  delay(1000);  // Delay 1 second between sensor readings
}

int getHeartRate() {
  // Implementasikan kode untuk membaca data Heart Rate (HR) dari sensor
  // Pengukuran HR dapat dilakukan di sini
  // Misalnya, menggunakan variabel c dari kode sebelumnya
  return c;
}

double previousHRV = 0; // Inisialisasi nilai HRV sebelumnya

int getHeartRateVariability() {
  // Implementasikan kode untuk menghitung Heart Rate Variability (HRV)
  // HRV dapat dihitung berdasarkan RR Intervals yang diukur dari sensor
  // Misalnya, menggunakan variabel sumRRIntervalsSquared dan numRRIntervals dari kode sebelumnya

  if (numRRIntervals > 0) {
    double meanRRInterval = (double)sumRRIntervals / numRRIntervals;
    double variance = (double)sumRRIntervalsSquared / numRRIntervals - meanRRInterval * meanRRInterval;
    double hrv = sqrt(variance);
    previousHRV = round(hrv * 100) / 100.0; // Mengupdate nilai HRV sebelumnya dengan 2 angka di belakang koma
    return previousHRV;
  } else {
    return previousHRV;
  }
}



int getEDA() {
  // Implementasikan kode untuk membaca data EDA/GSR dari sensor
  // Pengukuran EDA/GSR dapat dilakukan di sini
  // Misalnya, menggunakan variabel sensorValue dari kode sebelumnya
  return sensorValue;
}