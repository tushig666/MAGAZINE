// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "studio-5254611276-a3f63",
  appId: "1:885920180281:web:b92f276c58e7761cb7c5e8",
  storageBucket: "studio-5254611276-a3f63.firebasestorage.app",
  apiKey: "AIzaSyAddnZ7mvstNLssPXr70wOA8J94eAyZt6w",
  authDomain: "studio-5254611276-a3f63.firebaseapp.com",
  messagingSenderId: "885920180281",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
