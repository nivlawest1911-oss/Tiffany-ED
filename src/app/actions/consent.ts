'use client';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const submitConsent = async (formData: { studentName: string; parentName: string }) => {
  try {
    await addDoc(collection(db, 'parental_consents'), {
      ...formData,
      timestamp: serverTimestamp(), // Use Google's server time, not local time
      status: 'verified',
      node: 'prichard_al_01'
    });
    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false };
  }
};
