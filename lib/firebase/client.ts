import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD8W5XeiQZWflhT-zxWXTT-MazJ9Tc1LCQ",
  authDomain: "vishnu--portfolio.firebaseapp.com",
  projectId: "vishnu--portfolio",
  storageBucket: "vishnu--portfolio.firebasestorage.app",
  messagingSenderId: "364145578554",
  appId: "1:364145578554:web:963b77ae29e754b51a9b03",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
