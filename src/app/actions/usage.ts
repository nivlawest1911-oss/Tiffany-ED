import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

export async function logUsage(userId: string, feature: string) {
  try {
    // 1. Record the interaction for ROI tracking
    await addDoc(collection(db, 'usage_logs'), {
      userId,
      feature,
      timestamp: serverTimestamp(),
    });

    // 2. Update weights for Morphic Bento reordering
    const weightRef = doc(db, 'user_weights', userId);
    await updateDoc(weightRef, {
      [`weights.${feature}`]: increment(1)
    });
  } catch (e) {
    console.error("Usage sync failed", e);
  }
}
