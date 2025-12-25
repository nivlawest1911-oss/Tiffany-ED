import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const logAdminAccess = async (adminEmail: string, action: string) => {
  await addDoc(collection(db, 'security_audit_logs'), {
    admin: adminEmail,
    action: action,
    timestamp: serverTimestamp(),
    tier: 'FEDERAL_COMPLIANCE_FERPA'
  });
};
