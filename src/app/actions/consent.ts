import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const submitConsent = async (formData: { 
  studentName: string; 
  parentName: string;
  feederPattern: string; // e.g., Williamson, Baker, MGM, Murphy
}) => {
  try {
    await addDoc(collection(db, 'parental_consents'), {
      ...formData,
      district: 'Mobile County',
      node: 'MCPSS_Sovereign_01',
      timestamp: serverTimestamp(),
      status: 'verified'
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
