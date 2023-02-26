// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import API_KEY from './apiKey';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "hands-on-5fefa.firebaseapp.com",
  projectId: "hands-on-5fefa",
  storageBucket: "hands-on-5fefa.appspot.com",
  messagingSenderId: "533440128894",
  appId: "1:533440128894:web:61866aa81142915caf752f",
  measurementId: "G-DZY4RVKFNS",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);