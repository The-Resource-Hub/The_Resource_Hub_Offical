import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "the-resource-hub-92ec9.firebaseapp.com",
  projectId: "the-resource-hub-92ec9",
  storageBucket: "the-resource-hub-92ec9.firebasestorage.app",
  messagingSenderId: "319250544902",
  appId: "1:319250544902:web:3ef4835a73bc7e2601c687",
  measurementId: "G-MKH7HVT4YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
