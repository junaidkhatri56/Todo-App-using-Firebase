import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJ0Umd-eIAiDpH6stKrqmicXtRpKsBbjg",
  authDomain: "todo-app-using-firestore.firebaseapp.com",
  projectId: "todo-app-using-firestore",
  storageBucket: "todo-app-using-firestore.firebasestorage.app",
  messagingSenderId: "683794668586",
  appId: "1:683794668586:web:935e6ccc834bbbf2bd3753"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);