
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2NtILPT5dIaXmOra-zvZ8xOCwKWkppVE",
  authDomain: "petswipe-95c0e.firebaseapp.com",
  projectId: "petswipe-95c0e",
  storageBucket: "petswipe-95c0e.appspot.com",
  messagingSenderId: "819400705359",
  appId: "1:819400705359:web:153f2ff578fedb8a5df13a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
