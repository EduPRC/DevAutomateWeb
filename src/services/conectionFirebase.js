import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX0n78tYa3Uerr3yZ96cCSt9DhKWDjPZU",
  authDomain: "devautomateweb.firebaseapp.com",
  projectId: "devautomateweb",
  storageBucket: "devautomateweb.firebasestorage.app",
  messagingSenderId: "489941274080",
  appId: "1:489941274080:web:bbe91f2f6afabc88216f85"
};

// Inicialização única do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };