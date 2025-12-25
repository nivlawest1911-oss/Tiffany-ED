import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTOhPhJlfUBAJjVhQjHKdXHiBLf2jl2As",
  authDomain: "studio-9997686479-ca258.firebaseapp.com",
  projectId: "studio-9997686479-ca258",
  storageBucket: "studio-9997686479-ca258.firebasestorage.app",
  messagingSenderId: "501461250259",
  appId: "1:501461250259:web:db256926f7321b4d65e426"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
