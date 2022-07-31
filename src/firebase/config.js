// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOXOW6YuAfSh7hwzHw4SUKQp8zj3GHUqc",
  authDomain: "journalreact-bd6d3.firebaseapp.com",
  projectId: "journalreact-bd6d3",
  storageBucket: "journalreact-bd6d3.appspot.com",
  messagingSenderId: "966751709896",
  appId: "1:966751709896:web:c664ceb90dc7b9eec313fd"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FireBaseDB = getFirestore(FirebaseApp);