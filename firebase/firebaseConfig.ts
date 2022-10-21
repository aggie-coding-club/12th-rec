import { FIREBASEAPIKEY, FIREBASEAUTHDOMAIN , FIREBASEPROJECTID, FIREBASESTORAGEBUCKET, FIREBASEMESSAGINGSENDERID, FIREBASEAPID } from "@env";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: FIREBASEAPIKEY,

  authDomain: FIREBASEAUTHDOMAIN,

  projectId: FIREBASEPROJECTID,

  storageBucket: FIREBASESTORAGEBUCKET,

  messagingSenderId: FIREBASEMESSAGINGSENDERID,

  appId: FIREBASEAPID

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
