/**
 * EdIntel VIGIApp Infrastructure Monitoring Service
 * 
 * Provides network operations center (NOC) style monitoring across school sites.
 * Manages device heartbeats, evaluates thresholds to log alerts, and aggregates
 * composite School Health Scores.
 */

import { prisma } from './prisma';
import { 
  InfraDeviceConfig, 
  InfraMetrics, 
  InfraStatus, 
  AlertSeverity 
} from '@/types/differentiation';

export class VIGIAppService {
  /**
   * Registers a new infrastructure device linked to a school site.
   */
  static async registerDevice(config: InfraDeviceConfig) {
    const defaultThresholds = {
      temperatureMax: 35, // Celsius max
      loadPctMax: 85,     // 85% load capacity max
      batteryPctMin: 30,  // 30% battery backup min
      fuelLevelPctMin: 25 // 25% generator fuel min
    };

    return await prisma.infra_monitors.create({
      data: {
        school_id: config.schoolId,
        device_type: config.deviceType,
        device_name: config.deviceName,
        location: config.location || 'Server Room A',
        alert_threshold: JSON.parse(JSON.stringify(config.alertThresholds || defaultThresholds)),
        status: 'normal',
        metrics: {}
      }
    });
  }

  /**
   * Processes a telemetry heartbeat from a device.
   */
  static async ingestHeartbeat(monitorId: string, metrics: InfraMetrics) {
    const monitor = await prisma.infra_monitors.findUnique({
      where: { id: monitorId }
    });

    if (!monitor) throw new Error(`Infrastructure device ${monitorId} not registered.`);

    // Determine status from threshold analysis
    const threshold: any = monitor.alert_threshold || {};
    let status: InfraStatus = 'normal';
    let alertMessage = '';
    let severity: AlertSeverity = 'info';

    if (metrics.temperature !== undefined && threshold.temperatureMax !== undefined) {
      if (metrics.temperature > threshold.temperatureMax + 10) {
        status = 'critical';
        severity = 'critical';
        alertMessage = `Critical overheating detected: ${metrics.temperature}°C (Limit: ${threshold.temperatureMax}°C)`;
      } else if (metrics.temperature > threshold.temperatureMax) {
        status = 'warning';
        severity = 'warning';
        alertMessage = `High temperature threshold warning: ${metrics.temperature}°C`;
      }
    }

    if (metrics.batteryPct !== undefined && threshold.batteryPctMin !== undefined && status !== 'critical') {
      if (metrics.batteryPct < threshold.batteryPctMin - 15) {
        status = 'critical';
        severity = 'critical';
        alertMessage = `Critical UPS Battery depletion: ${metrics.batteryPct}%`;
      } else if (metrics.batteryPct < threshold.batteryPctMin) {
        status = 'warning';
        severity = 'warning';
        alertMessage = `Low UPS battery warning: ${metrics.batteryPct}%`;
      }
    }

    if (metrics.loadPct !== undefined && threshold.loadPctMax !== undefined && status !== 'critical') {
      if (metrics.loadPct > threshold.loadPctMax + 10) {
        status = 'critical';
        severity = 'critical';
        alertMessage = `Critical power overload: ${metrics.loadPct}% capacity`;
      } else if (metrics.loadPct > threshold.loadPctMax) {
        status = 'warning';
        severity = 'warning';
        alertMessage = `High load capacity warning: ${metrics.loadPct}%`;
      }
    }

    // Update state in database
    await prisma.infra_monitors.update({
      where: { id: monitorId },
      data: {
        status,
        metrics: JSON.parse(JSON.stringify(metrics)),
        last_heartbeat: new Date()
      }
    });

    // Create an alert record if flagged
    if (status !== 'normal') {
      await prisma.infra_alerts.create({
        data: {
          monitor_id: monitorId,
          severity,
          message: alertMessage,
          metric_snapshot: JSON.parse(JSON.stringify(metrics))
        }
      });
    }

    return { status, alertTriggered: status !== 'normal' };
  }

  /**
   * Aggregates a composite 0-100 overall School Health Score.
   */
  static async getSchoolHealthScore(schoolId: string) {
    const monitors = await prisma.infra_monitors.findMany({
      where: { school_id: schoolId }
    });

    if (!monitors.length) {
      return {
        schoolId,
        overallHealth: 100,
        deviceCount: 0,
        activeAlerts: 0,
        criticalAlerts: 0,
        lastUpdate: new Date().toISOString()
      };
    }

    let penaltyPoints = 0;
    let activeAlerts = 0;
    let criticalAlerts = 0;

    monitors.forEach(monitor => {
      if (monitor.status === 'warning') {
        penaltyPoints += 15;
        activeAlerts++;
      } else if (monitor.status === 'critical') {
        penaltyPoints += 40;
        activeAlerts++;
        criticalAlerts++;
      } else if (monitor.status === 'offline') {
        penaltyPoints += 50;
        activeAlerts++;
        criticalAlerts++;
      }
    });

    const overallHealth = Math.max(0, 100 - penaltyPoints);

    return {
      schoolId,
      overallHealth,
      deviceCount: monitors.length,
      activeAlerts,
      criticalAlerts,
      lastUpdate: new Date().toISOString()
    };
  }

  /**
   * Marks a system warning alert as officially acknowledged.
   */
  static async acknowledgeAlert(alertId: string, userId: string) {
    return await prisma.infra_alerts.update({
      where: { id: alertId },
      data: {
        acknowledged: true,
        acknowledged_by: userId,
        resolved_at: new Date()
      }
    });
  }

  /**
   * Fetches active, unacknowledged alerts.
   */
  static async getActiveAlerts(schoolId?: string) {
    return await prisma.infra_alerts.findMany({
      where: {
        acknowledged: false,
        ...(schoolId ? {
          infra_monitors: { school_id: schoolId }
        } : {})
      },
      include: {
        infra_monitors: {
          include: { schools: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });
  }
}
export const vigiAppService = VIGIAppService;
