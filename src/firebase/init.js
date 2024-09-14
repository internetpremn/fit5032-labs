// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5jvzp1rk4L-Cft5aY-fDxK0j1r5acpd8',
  authDomain: 'week7-prem.firebaseapp.com',
  projectId: 'week7-prem',
  storageBucket: 'week7-prem.appspot.com',
  messagingSenderId: '808557753616',
  appId: '1:808557753616:web:f8a11c17c14ac88e0a6195'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()
export default db
