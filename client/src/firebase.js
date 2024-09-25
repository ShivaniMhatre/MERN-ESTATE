// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d5a5f.firebaseapp.com",
  projectId: "mern-estate-d5a5f",
  storageBucket: "mern-estate-d5a5f.appspot.com",
  messagingSenderId: "428772053922",
  appId: "1:428772053922:web:4a3bfdb768a74582acd8fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);