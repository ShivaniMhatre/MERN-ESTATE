// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-1e140.firebaseapp.com",
  projectId: "mern-estate-1e140",
  storageBucket: "mern-estate-1e140.appspot.com",
  messagingSenderId: "817760908261",
  appId: "1:817760908261:web:b58b34da439e4cd732350c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);