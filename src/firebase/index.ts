import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBYet5BbXus3WojOitt0XZ5TtvzkP4JyE", // 
  authDomain: "studio-9997686479-ca258.firebaseapp.com",
  projectId: "studio-9997686479-ca258",
  storageBucket: "studio-9997686479-ca258.firebasestorage.app",
  messagingSenderId: "501461250259",
  appId: "1:501461250259:web:1ce6b3ebd6bcac3365e426"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
