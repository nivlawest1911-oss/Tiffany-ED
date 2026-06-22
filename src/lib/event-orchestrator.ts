/**
 * EdIntel Cross-System Event Orchestrator
 * 
 * Provides event-driven reactive workflows across screener diagnostics, 
 * adaptive content leveling, district-level deficient tracking, 
 * and VIGIApp facility security monitoring.
 */

import { 
  OrchestratorEvent, 
  OrchestratorEventType 
} from '@/types/differentiation';
import { screenerService } from './screener-service';
import { districtListeningService } from './DistrictListeningService';
import { vigiAppService } from './VIGIAppService';
import { prisma } from './prisma';

export class EventOrchestrator {
  private static listeners: Record<OrchestratorEventType, ((event: OrchestratorEvent) => Promise<void>)[]> = {
    SCREENER_IMPORTED: [],
    DEFICIT_DETECTED: [],
    DIFFERENTIATION_GENERATED: [],
    READING_PLAN_CREATED: [],
    DISTRICT_DEFICIT_DETECTED: [],
    INFRA_ALERT_TRIGGERED: [],
    INFRA_ALERT_RESOLVED: []
  };

  /**
   * Registers a callback listener to process specific core events.
   */
  static registerListener(type: OrchestratorEventType, callback: (event: OrchestratorEvent) => Promise<void>) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(callback);
  }

  /**
   * Publishes a system event to trigger reactive closed-loop workflows.
   */
  static async emit(type: OrchestratorEventType, userId: string, payload: Record<string, any>) {
    const event: OrchestratorEvent = {
      type,
      timestamp: new Date().toISOString(),
      userId,
      payload
    };

    console.info(`[EventOrchestrator] Dispatching Event: ${type} by user: ${userId}`);

    // Trigger registered subscribers
    const callbacks = this.listeners[type] || [];
    for (const callback of callbacks) {
      try {
        await callback(event);
      } catch (err) {
        console.error(`[EventOrchestrator] Listener failure for event ${type}:`, err);
      }
    }

    // Direct closed-loop pipeline integrations
    try {
      await this.routeClosedLoopInterventions(event);
    } catch (err) {
      console.error('[EventOrchestrator] Closed-loop pipeline routing error:', err);
    }
  }

  /**
   * Internal closed-loop logic handler mapping diagnostic triggers.
   */
  private static async routeClosedLoopInterventions(event: OrchestratorEvent) {
    switch (event.type) {
      
      case 'SCREENER_IMPORTED': {
        const { result } = event.payload;
        if (result?.studentsAtRisk > 0) {
          console.info(`[Orchestrator closed-loop] At-risk students flagged. Launching auto-intervention pipelines.`);
          await screenerService.triggerCohortAutoIntervention(event.userId);
        }
        break;
      }

      case 'DISTRICT_DEFICIT_DETECTED': {
        const { districtId } = event.payload;
        console.info(`[Orchestrator closed-loop] Systemic deficit gaps detected for district: ${districtId}. Batch-leveling cohort materials.`);
        await districtListeningService.detectCohortDeficits(districtId);
        break;
      }

      case 'INFRA_ALERT_TRIGGERED': {
        const { alertId, monitorId, severity } = event.payload;
        console.warn(`[Orchestrator closed-loop] Hardware breach logged: ${alertId} (Severity: ${severity}). Dispatching tech alerts.`);
        
        // Asynchronously check health and flag the target school database status
        const monitor = await prisma.infra_monitors.findUnique({
          where: { id: monitorId },
          select: { school_id: true }
        });
        if (monitor) {
          const healthScore = await vigiAppService.getSchoolHealthScore(monitor.school_id);
          console.info(`[Orchestrator closed-loop] Adjusted School Infrastructure Health Index: ${healthScore.overallHealth}%`);
        }
        break;
      }

      case 'DIFFERENTIATION_GENERATED': {
        const { studentId, tokensUsed } = event.payload;
        console.info(`[Orchestrator closed-loop] Student ${studentId} adapted. Ledger logged: ${tokensUsed} tokens.`);
        break;
      }

      default:
        break;
    }
  }
}

export const eventOrchestrator = EventOrchestrator;
