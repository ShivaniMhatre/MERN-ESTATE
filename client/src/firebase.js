// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-ae233.firebaseapp.com",
  projectId: "estate-ae233",
  storageBucket: "estate-ae233.appspot.com",
  messagingSenderId: "835485337838",
  appId: "1:835485337838:web:cd2044a88b22dc09c70bff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);