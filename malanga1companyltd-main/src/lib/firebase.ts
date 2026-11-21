import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase configuration for the Malanga 1 web app.
 *
 * Values can be overridden with VITE_FIREBASE_* environment variables, but the
 * defaults point at the production `malanga1company` project so the site works
 * without extra build configuration.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyCdOFGqMXCSIag49MpVEig5JuqrwTCZ_Bk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "malanga1company.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "malanga1company",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "malanga1company.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "794598735766",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:794598735766:web:660a15423921f5dd35a7b7",
};

export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app, "default");
