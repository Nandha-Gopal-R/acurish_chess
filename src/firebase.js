import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyAx1u2wZD7h9xRC9PMvbvRw6Siko3j4TCI",
    authDomain: "checkmate-studio.firebaseapp.com",
    projectId: "checkmate-studio",
    storageBucket: "checkmate-studio.firebasestorage.app",
    messagingSenderId: "270478328384",
    appId: "1:270478328384:web:bd55ba85e2e2d20a8095a5"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);