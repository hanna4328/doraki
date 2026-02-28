

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFAZ-jJpjaXnaLQbw7RwDHtTsT9fx29m8",
  authDomain: "hackathon-form-backend.firebaseapp.com",
  databaseURL: "https://hackathon-form-backend-default-rtdb.firebaseio.com",
  projectId: "hackathon-form-backend",
  storageBucket: "hackathon-form-backend.firebasestorage.app",
  messagingSenderId: "357709926855",
  appId: "1:357709926855:web:1fba1d0c62b998382cc9e2",
  measurementId: "G-ERSY5RR8PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);