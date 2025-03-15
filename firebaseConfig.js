
// Firebase Configuration for PiProspects
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiLeN7VaVP08Kat1xob_fQgu1Ro-KCgic",
  authDomain: "pihire-455dd.firebaseapp.com",
  projectId: "pihire-455dd",
  storageBucket: "pihire-455dd.firebasestorage.app",
  messagingSenderId: "826289475257",
  appId: "1:826289475257:web:4f579a42c4eb6c481fd568",
  measurementId: "G-9JCM04YVQD"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
