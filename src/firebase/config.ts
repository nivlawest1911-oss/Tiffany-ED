// src/firebase/config.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDTOhPhJlfUBAJjVhQjHKdXHiBLf2jl2As",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-9997686479-ca258.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-9997686479-ca258",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-9997686479-ca258.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "501461250259",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:501461250259:web:1ce6b3ebd6bcac3365e426"
};

export { firebaseConfig };
