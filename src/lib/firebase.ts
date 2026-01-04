import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

try {
    if (firebaseConfig.apiKey) {
        // Fix for "AppCheck: ReCAPTCHA error" in localhost
        if (typeof window !== 'undefined' && location.hostname === 'localhost') {
            // @ts-ignore - Enable debug token for local development
            self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        }

        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);



        if (typeof window !== 'undefined' && location.hostname !== 'localhost') {
            initializeAppCheck(app, {
                provider: new ReCaptchaEnterpriseProvider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
                isTokenAutoRefreshEnabled: true
            });
        }
    } else {
        // console.warn('Firebase keys missing. Service will be disabled.');
    }
} catch (e) {
    console.error('Firebase initialization error:', e);
}

export { app, auth, db, storage };
