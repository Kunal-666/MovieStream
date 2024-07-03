// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9HrUMwgNyyiFZbfLSA8uoi-CBarRt5Gw",
  authDomain: "moviestream-554fa.firebaseapp.com",
  databaseURL: "https://moviestream-554fa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moviestream-554fa",
  storageBucket: "moviestream-554fa.appspot.com",
  messagingSenderId: "1048433492567",
  appId: "1:1048433492567:web:6e446866faf4172b16d912",
  measurementId: "G-SDJ1YZ7LZT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
