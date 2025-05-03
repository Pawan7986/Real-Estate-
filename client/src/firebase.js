// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"AIzaSyBsO680Oau2-fcDlVqav1XU_b_h9S7cJRo",
  authDomain: "mern-estate-a9aaa.firebaseapp.com",
  projectId: "mern-estate-a9aaa",
  storageBucket: "mern-estate-a9aaa.firebasestorage.app",
  messagingSenderId: "582936715002",
  appId: "1:582936715002:web:ad681319cef5c529ce7343"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);