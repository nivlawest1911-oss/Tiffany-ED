// src/firebase/index.ts - Optimized for App Check & Next.js 15
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { firebaseConfig } from "./config";

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Re-ordering: App Check MUST be configured before services are called
  if (typeof window !== "undefined") {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider('6LcV8BwqAAAAAG3cKz2L52r5gF5o4e_0plb_5O2F'),
      isTokenAutoRefreshEnabled: true
    });
  }
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export { useAuth, useUser } from './hooks';