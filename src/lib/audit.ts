import { nanoid } from 'nanoid';

/**
 * Sovereign Audit Service
 * 
 * Provides an immutable ledger for high-stakes institutional operations.
 * Logs to the 'analytics_events' table.
 */

export enum AuditCategory {
  AUTHENTICATION = 'AUTH',
  FLEET_COMMAND = 'FLEET',
  WELLNESS = 'WELLNESS',
  DOCUMENT_VAULT = 'VAULT',
  SYSTEM = 'SYSTEM'
}

export enum AuditAction {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  FLEET_ACCESS = 'FLEET_ACCESS',
  WELLNESS_READ = 'WELLNESS_READ',
  DIRECTIVE_PUBLISH = 'DIRECTIVE_PUBLISH',
  VAULT_DECRYPT = 'VAULT_DECRYPT',
  ADMIN_ACTION = 'ADMIN_ACTION'
}

interface AuditConfig {
  userId?: string;
  category: AuditCategory;
  action: AuditAction;
  label?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAuditEvent(config: AuditConfig) {
  try {
    // Ensure we have a prisma instance
    const { prisma: db } = await import('@/lib/prisma');
    
    await db.analytics_events.create({
      data: {
        id: `audit_${nanoid()}`,
        userId: config.userId,
        eventCategory: config.category,
        eventAction: config.action,
        eventType: 'AUDIT_LOG',
        eventLabel: config.label,
        metadata: config.metadata || {},
        ipAddress: config.ipAddress,
        userAgent: config.userAgent,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('[AUDIT_LOG_FAILURE]', error);
    // Fail silently to prevent disrupting user experience, 
    // but log locally for system monitoring.
  }
}
