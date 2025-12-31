import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKwJh961MosH9NOpbMPjSKY-lSLzDn2sM",
  authDomain: "skaylo-2f75c.firebaseapp.com",
  projectId: "skaylo-2f75c",
  storageBucket: "skaylo-2f75c.firebasestorage.app",
  messagingSenderId: "915247409576",
  appId: "1:915247409576:web:65ac61060567072699559d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
