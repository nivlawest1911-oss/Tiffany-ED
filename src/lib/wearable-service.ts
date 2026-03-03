export interface BioFeedback {
    heartRate: number;
    timestamp: number;
    stressLevel: number;
}

export type BioFeedbackListener = (data: BioFeedback) => void;

export class WearableService {
    private device: BluetoothDevice | null = null;
    private server: BluetoothRemoteGATTServer | null = null;
    private listeners: Set<BioFeedbackListener> = new Set();
    private heartRateHistory: number[] = [];

    subscribe(listener: BioFeedbackListener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
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
            stressLevel: this.calculateStressLevel(heartRate)
        };
    }

    private calculateStressLevel(currentHR: number): number {
        if (this.heartRateHistory.length < 5) return 30; // Default baseline

        const average = this.heartRateHistory.reduce((a, b) => a + b, 0) / this.heartRateHistory.length;
        const baseline = 70; // Assumed resting baseline for simplified calculation

        // Simple heuristic: distance from baseline + volatility
        const stress = Math.min(100, Math.max(0,
            ((currentHR - baseline) * 2) + Math.abs(currentHR - average) * 3
        ));

        return Math.round(stress);
    }

    disconnect() {
        if (this.device?.gatt?.connected) {
            this.device.gatt.disconnect();
        }
        this.device = null;
        this.server = null;
        this.listeners.clear();
    }
}

export const wearableService = new WearableService();
