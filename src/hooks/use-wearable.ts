"use client"

import { useState, useEffect, useCallback } from 'react';
import { wearableService, BioFeedback } from '@/lib/wearable-service';

export function useWearable() {
    const [isConnected, setIsConnected] = useState(false);
    const [lastData, setLastData] = useState<BioFeedback | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deviceName, setDeviceName] = useState<string | null>(null);

    const connect = useCallback(async () => {
        setIsConnecting(true);
        setError(null);
        try {
            const device = await wearableService.requestConnection();
            setIsConnected(true);
            setDeviceName(device.name || 'Unknown Device');
        } catch (err: any) {
            setError(err.message || 'Failed to connect');
            setIsConnected(false);
        } finally {
            setIsConnecting(false);
        }
    }, []);

    const disconnect = useCallback(() => {
        wearableService.disconnect();
        setIsConnected(false);
        setLastData(null);
        setDeviceName(null);
    }, []);

    useEffect(() => {
        if (isConnected) {
            const unsubscribe = wearableService.subscribe((data) => {
                setLastData(data);
            });
            return () => {
                unsubscribe();
            };
        }
    }, [isConnected]);

    return {
        isConnected,
        isConnecting,
        lastData,
        error,
        deviceName,
        connect,
        disconnect
    };
}
