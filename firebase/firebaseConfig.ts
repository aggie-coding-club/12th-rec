// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyChIiVoGozpH_X953GNWF44R0PJgAi38Tw",

  authDomain: "threc-e1518.firebaseapp.com",

  projectId: "threc-e1518",

  storageBucket: "threc-e1518.appspot.com",

  messagingSenderId: "958371623547",

  appId: "1:958371623547:web:d95fa2c421df7efc53a8de"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
