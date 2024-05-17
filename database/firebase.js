// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2NtILPT5dIaXmOra-zvZ8xOCwKWkppVE",
  authDomain: "petswipe-95c0e.firebaseapp.com",
  projectId: "petswipe-95c0e",
  storageBucket: "petswipe-95c0e.appspot.com",
  messagingSenderId: "819400705359",
  appId: "1:819400705359:web:153f2ff578fedb8a5df13a"
};

// Initialize Firebase and Firebase Auth with persistence
let FIREBASE_APP;
let FIREBASE_AUTH;

if (!getApps().length) {
  FIREBASE_APP = initializeApp(firebaseConfig);
  FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  FIREBASE_APP = getApp();
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
}

export { FIREBASE_APP, FIREBASE_AUTH };

