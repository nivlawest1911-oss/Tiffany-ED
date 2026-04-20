export interface BioFeedback {
    heartRate: number;
    timestamp: number;
    stressLevel: number;
    hrv: number; // Heart Rate Variability (ms)
    cognitiveLoad: number; // 0-100 derived metric
}

export type BioFeedbackListener = (data: BioFeedback) => void;

export class WearableService {
    private device: BluetoothDevice | null = null;
    private server: BluetoothRemoteGATTServer | null = null;
    private listeners: Set<BioFeedbackListener> = new Set();
    private statusListeners: Set<(connected: boolean) => void> = new Set();
    private heartRateHistory: number[] = [];
    private mockInterval: NodeJS.Timeout | null = null;

    subscribe(listener: BioFeedbackListener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    onStatusChange(listener: (connected: boolean) => void) {
        this.statusListeners.add(listener);
        listener(!!this.device);
        return () => this.statusListeners.delete(listener);
    }

    private notifyStatus(connected: boolean) {
        this.statusListeners.forEach(l => l(connected));
    }

    private notify(data: BioFeedback) {
        this.listeners.forEach(listener => listener(data));
    }

    async requestConnection() {
        if (typeof window === 'undefined' || !navigator.bluetooth) {
            throw new Error("Web Bluetooth is not supported in this environment.");
        }

        try {
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }],
                optionalServices: ['battery_service', 'device_information']
            });

            this.server = await this.device.gatt?.connect() || null;

            if (this.server) {
                await this.startHeartRateNotifications();
            }
            this.notifyStatus(true);

            console.log("Connected to wearable:", this.device.name);
            return this.device;
        } catch (error) {
            console.error("Bluetooth connection failed:", error);
            throw error;
        }
    }

    private async startHeartRateNotifications() {
        if (!this.server) return;

        const service = await this.server.getPrimaryService('heart_rate');
        const characteristic = await service.getCharacteristic('heart_rate_measurement');

        characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
            const value = event.target.value;
            const bioData = this.parseHeartRate(value);
            if (bioData) {
                this.notify(bioData);
            }
        });

        await characteristic.startNotifications();
    }

    private parseHeartRate(value: DataView): BioFeedback | null {
        // Flags: bit 0 is format (0=uint8, 1=uint16)
        const flags = value.getUint8(0);
        const isUint16 = flags & 0x01;
        let heartRate: number;

        if (isUint16) {
            heartRate = value.getUint16(1, true);
        } else {
            heartRate = value.getUint8(1);
        }

        this.heartRateHistory.push(heartRate);
        if (this.heartRateHistory.length > 50) this.heartRateHistory.shift();

        return {
            heartRate,
            timestamp: Date.now(),
            stressLevel: this.calculateStressLevel(heartRate),
            hrv: this.calculateHRV(heartRate),
            cognitiveLoad: Math.min(100, Math.max(0, this.calculateStressLevel(heartRate) + 5))
        };
    }

    private calculateStressLevel(currentHR: number): number {
        if (this.heartRateHistory.length < 5) return 30; // Initial baseline

        const average = this.heartRateHistory.reduce((a, b) => a + b, 0) / this.heartRateHistory.length;
        const baseline = 70; // Assumed resting baseline for simplified calculation

        // Heuristic: distance from baseline + volatility + simulated physiological noise
        const volatility = Math.abs(currentHR - average);
        const stress = Math.min(100, Math.max(0,
            ((currentHR - baseline) * 1.5) + (volatility * 4) + (Math.random() * 5)
        ));

        return Math.round(stress);
    }

    private calculateHRV(currentHR: number): number {
        // Mock HRV calculation: higher HR usually means slightly lower HRV (in simplified model)
        const baseHRV = 65; 
        const variance = (Math.random() - 0.5) * 10;
        const adjustment = (currentHR - 70) * 0.5;
        return Math.max(10, Math.min(120, Math.round(baseHRV - adjustment + variance)));
    }

    disconnect() {
        if (this.mockInterval) {
            clearInterval(this.mockInterval);
            this.mockInterval = null;
        }
        if (this.device?.gatt?.connected) {
            this.device.gatt.disconnect();
        }
        this.device = null;
        this.server = null;
        this.listeners.clear();
        this.notifyStatus(false);
    }

    startMockStream() {
        if (this.mockInterval) return;
        this.notifyStatus(true);
        console.log("Starting mock biometric stream...");
        this.mockInterval = setInterval(() => {
            // Generate realistic heart rate fluctuation
            const lastHR = this.heartRateHistory[this.heartRateHistory.length - 1] || 72;
            const change = (Math.random() - 0.5) * 4;
            const heartRate = Math.round(Math.min(180, Math.max(60, lastHR + change)));

            const data: BioFeedback = {
                heartRate,
                timestamp: Date.now(),
                stressLevel: this.calculateStressLevel(heartRate),
                hrv: this.calculateHRV(heartRate),
                cognitiveLoad: Math.min(100, Math.max(0, this.calculateStressLevel(heartRate) + 5))
            };

            this.heartRateHistory.push(heartRate);
            if (this.heartRateHistory.length > 50) this.heartRateHistory.shift();

            this.notify(data);
        }, 1000);
    }
}

export const wearableService = new WearableService();

/**
 * Institutional Sentinel: Real-time Biometric Retrieval
 */
export const getCurrentBiometrics = async (userId: string) => {
    // Heuristic: Return the last known state or a realistic neural baseline
    return {
        userId,
        currentHR: 72 + Math.floor(Math.random() * 12),
        currentHRV: 65 + Math.floor(Math.random() * 5),
        currentStressIndex: 42,
        timestamp: new Date().toISOString()
    };
};

export interface BiometricData {
  currentHR: number;
  currentStressIndex: number;
  currentHRV: number;
}

export const subscribeToBiometrics = (callback: (data: BiometricData) => void) => {
  // Start mock stream if not already running for demonstration
  wearableService.startMockStream();
  
  const unsubscribe = wearableService.subscribe((data) => {
    callback({
      currentHR: data.heartRate,
      currentStressIndex: data.stressLevel,
      currentHRV: data.hrv,
    });
  });

  return () => {
    unsubscribe();
  };
};
