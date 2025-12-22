// src/firebase/non-blocking-updates.tsx
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './index';

export const saveCognitiveScore = async (moduleName: string, score: number, userId: string | null) => {
  // Fire-and-forget mechanism
  if (!userId) return; // Optional: Handle anonymous scores if needed

  try {
    await addDoc(collection(firestore, 'cognitive_scores'), {
      userId,
      module: moduleName,
      score,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving score (non-blocking):", error);
    // Silent fail to ensure UI smoothness
  }
};
