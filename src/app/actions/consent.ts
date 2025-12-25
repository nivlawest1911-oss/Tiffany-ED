import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const submitConsent = async (formData: { 
  studentName: string; 
  parentName: string;
  district: string; // New: To specify which Mobile County district
}) => {
  try {
    await addDoc(collection(db, 'parental_consents'), {
      ...formData,
      county: 'Mobile County',
      state: 'Alabama',
      timestamp: serverTimestamp(),
      status: 'verified'
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
