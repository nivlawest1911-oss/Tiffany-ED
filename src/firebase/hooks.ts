// src/firebase/hooks.ts
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './index';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { user };
}

export function useUser(uid: string | undefined) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (uid) {
      const docRef = doc(firestore, 'users', uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      });
    }
  }, [uid]);

  return { userData };
}
