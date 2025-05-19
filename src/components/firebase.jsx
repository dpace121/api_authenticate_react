// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqSUgdk0VYLwuVPBTUJ7fm6B5gTCsAKp8",
  authDomain: "apiauthenticate-ccfe1.firebaseapp.com",
  projectId: "apiauthenticate-ccfe1",
  storageBucket: "apiauthenticate-ccfe1.firebasestorage.app",
  messagingSenderId: "171178692483",
  appId: "1:171178692483:web:4811c6bf58d7bd1b8df0b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db = getFirestore(app);
export default app;