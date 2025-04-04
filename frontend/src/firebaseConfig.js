// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDzwLKtLZ9DtVQIAXvRe61KRBh5lXsPgFo",
  authDomain: "fap-assignment.firebaseapp.com",
  projectId: "fap-assignment",
  storageBucket: "fap-assignment.firebasestorage.app",
  messagingSenderId: "989766493420",
  appId: "1:989766493420:web:96e5af589d8e937c6731c9",
  measurementId: "G-72GGQKVHS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);