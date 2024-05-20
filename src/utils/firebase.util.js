// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyARfjhoh3Ni4jvbmwaqmY8-lmmr0JIpv_A",
  authDomain: "codeviva-1a3d2.firebaseapp.com",
  projectId: "codeviva-1a3d2",
  storageBucket: "codeviva-1a3d2.appspot.com",
  messagingSenderId: "858169756207",
  appId: "1:858169756207:web:f44aa364a109a28dd0d4da",
  measurementId: "G-BB8JSZRL95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);


export default app;
// const analytics = getAnalytics(app);