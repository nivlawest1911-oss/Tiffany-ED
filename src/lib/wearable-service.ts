export class WearableService {
    private device: BluetoothDevice | null = null;
    private server: BluetoothRemoteGATTServer | null = null;

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
            console.log("Connected to wearable:", this.device.name);
            return this.device;
        } catch (error) {
            console.error("Bluetooth connection failed:", error);
            throw error;
        }
    }

    async getHeartRate() {
        if (!this.server) return null;
        const service = await this.server.getPrimaryService('heart_rate');
        const characteristic = await service.getCharacteristic('heart_rate_measurement');

        // In a real implementation, we would start notifications
        // characteristic.startNotifications();
        return characteristic;
    }

    disconnect() {
        if (this.device?.gatt?.connected) {
            this.device.gatt.disconnect();
        }
        this.device = null;
        this.server = null;
    }
}

export const wearableService = new WearableService();
