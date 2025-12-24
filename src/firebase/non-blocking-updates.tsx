'use client';
import { db } from './index';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export async function logStrategicActivity(executiveId: string, activityType: string) {
  try {
    const ref = doc(db, 'executiveLogs', executiveId);
    await updateDoc(ref, {
      lastActive: serverTimestamp(),
      lastActivityType: activityType
    });
  } catch (e) {
    console.warn("Background sync paused: District firewall or missing profile.");
  }
}

export async function saveCognitiveScore(id: string, score: number) { return; }
